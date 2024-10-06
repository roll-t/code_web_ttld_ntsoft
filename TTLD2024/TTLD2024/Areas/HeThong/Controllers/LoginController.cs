using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;
using TTLD2024.DataConnect;
using WEB_DLL;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class LoginController : Controller
    {
        // GET: HeThong/Login
        public ActionResult Index()
        {
            try
            {
                if (NTSSession.GetUser() != null)
                {
                    RedirectToAction("quanly", "tongquan");
                }
            }
            catch (Exception)
            {
                RedirectToAction("hethong", "login");
            }
            DataTable tabDuLieu = GetCauHinhWebSite();
            if (tabDuLieu.Rows.Count > 0)
            {
                ViewBag.TenPhanMem = tabDuLieu.Rows[0]["TenPhanMem"].ToString();
                ViewBag.PhienBanPM = tabDuLieu.Rows[0]["PhienBanPM"].ToString();
                ViewBag.TenPMVietTatPM = tabDuLieu.Rows[0]["TenPMVietTatPM"].ToString();
                ViewBag.SoDT = tabDuLieu.Rows[0]["SoDT"].ToString();
                ViewBag.Email = tabDuLieu.Rows[0]["Email"].ToString();
                ViewBag.Web = tabDuLieu.Rows[0]["Web"].ToString();
                ViewBag.PhienBan = tabDuLieu.Rows[0]["PhienBanPM"].ToString();
                if (tabDuLieu.Rows[0]["Banner"].ToString() != "")
                {
                    string[] Path = tabDuLieu.Rows[0]["Banner"].ToString().Split('*');
                    int kiemtra = 0;
                    Random rand = new Random();
                    int stt = Path.Length;
                    for (int i = 0; i < Path.Length; i++)
                    {
                        kiemtra = rand.Next(0, Path.Length-1);
                        break;
                    }
                    ViewBag.Banner = Path[kiemtra].ToString().Replace("*", "").Replace("~","");
                }
                else
                {
                    ViewBag.Banner = tabDuLieu.Rows[0]["Banner"].ToString();
                }
                
            }
            return View();
        }
        [HttpPost]
        public string DangNhap(object[] data)
        {
            string ketquatrave = "";
            decimal _vCountLogin = 0;
            _vCountLogin = (Session["lanDangNhap"] == null ? 0 : Convert.ToInt32(Session["lanDangNhap"].ToString()));
            Session["lanDangNhap"] = _vCountLogin + 1;
            if (_vCountLogin > 10)
            {
                ketquatrave = "7";
                return ketquatrave;
            }
            string ketqua = XuLyDangNhap(data);
            if (ketqua == "KhongDungMaXacNhan")
            {
                ketquatrave = "1";//Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu
            }
            else if (ketqua == "UserDangOnline")
            {
                ketquatrave = "2";// Yêu cầu xác nhận đăng nhập
            }
            else if (ketqua == "DangNhapThanhCong")
            {
                ketquatrave = "3";// Đăng nhập thành công
            }
            else if (ketqua == "KhongTonTaiNienDo")
            {
                ketquatrave = "4";// Đăng nhập thành công
            }
            else if (ketqua == "ThongTinDangNhapKhongHopLe")
            {
                ketquatrave = "5";// Đăng nhập thành công
            }
            else if (ketqua == "DangNhapKhongCoDonVi")
            {
                ketquatrave = "8";// Đăng nhập thành công
            }
            else if (ketqua == "DangNhapThatBai")
            {
                ketquatrave = "6";//  Đăng nhập thất bại
            }
            else if (ketqua == "")
            {
                ketquatrave = "6";// Đăng nhập thất bại
            }
            else if (ketqua == "ketNoiKhongThanhCong")
            {
                ketquatrave = "9";// Đăng nhập thất bại
            }
            else if (ketqua.Contains("DangNhapThanhCong*"))
            {
                ketquatrave = "00*" + ketqua.Split('*')[1];// Đăng nhập thất bại
            }
            else
            {
                ketquatrave = ketqua;
            }
            return JSonHelper.ToJson(ketquatrave);
        }
        [HttpPost]
        public string XuLyDangNhap(object[] data)
        {
            string ketqua = "";
            try
            {
                //if (!ntsSqlFunctions._IsRegis)
                //{
                //    ketqua = "Hệ thống chưa đăng ký sử dụng " + SqlFunction._err;
                //    return ketqua;
                //}
                UsersDataContext db = new UsersDataContext();
                //Kiểm tra đăng nhập
                IQueryable<User> fam = from u in db.Users
                                       where (u.TenDangNhap == data[0].ToString().Trim()) && (u.MatMa == WEB_DLL.ntsSecurity._mEncrypt(data[0].ToString() + ";" + data[1].ToString(), PageInfo.KeyMaHoaMatKhau, true)) && (u.DangSD == true)
                                       select u;
                User _vuser = fam.FirstOrDefault();
                if (_vuser != null)
                {
                    ////Kiểm tra có đang online không
                    //if (_vuser.Online.Value)
                    //{
                    //    if (data[2].ToString() != "")
                    //    {
                    //        if (WEB_DLL.ntsSecurity._mEncrypt(data[0].ToString() + ";" + data[2].ToString().Trim(), PageInfo.KeyMaHoaXacNhan, true) != _vuser.MaXacNhan)
                    //        {
                    //            ketqua = "KhongDungMaXacNhan";
                    //            return ketqua;
                    //        }
                    //    }
                    //    else
                    //    {
                    //        ketqua = "UserDangOnline";
                    //        return ketqua;
                    //    }
                    //}
                    string KeyUser = NTSSecurity.NewToken();
                    //Xử lý kiểm tra tên CSDL
                    string _vConnectstring = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                    string _dataName = _vConnectstring.Split(';')[1].Replace("Initial Catalog=", "");
                    //_dataName = _dataName.Substring(0, _dataName.Length - 4);
                    _vConnectstring = _vConnectstring.Replace(_vConnectstring.Split(';')[1], "Initial Catalog=master");
                    //IQueryable<tblDB> tblDB = from tdb in db.tblDBs
                    //                          where tdb.dbName.ToLower() == _dataName.ToLower()// + namlamviec//_txtNamLamviec.Value
                    //                          select tdb;
                    //tblDB _vdb = tblDB.FirstOrDefault();

                    SqlFunction _vSql = new SqlFunction(_vConnectstring);
                    //if (_vdb != null)
                    //{
                    //db.Pro_SetOnline(_vuser.UserID, System.Web.HttpContext.Current.Request.UserHostAddress);
                    db.Insert_Log(_vuser.UserID, _vuser.DonViID, System.Web.HttpContext.Current.Request.UserHostName, System.Web.HttpContext.Current.Request.UserHostAddress, KeyUser);
                    IQueryable<Log> Log = from log in db.Logs
                                          where log.DonViID == _vuser.DonViID
                                          orderby log.NgayDangNhap descending
                                          select log;
                    Log _vlog = Log.FirstOrDefault();
                    //Kiểm tra thông tin đơn vị của người dùng để thiết lập báo cáo
                    System.Web.HttpContext.Current.Session.Remove("lanDangNhap");
                    _vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());// + namlamviec);//_dataName.ToLower() + _txtNamLamviec.Value);
                    _vSql = new SqlFunction(_vConnectstring);
                    DataTable _vdt = _vSql.GetData("SELECT * FROM DonVi WHERE DonViID=N'" + _vuser.DonViID.ToString() + "'");
                    if (_vdt.Rows.Count <= 0)
                    {
                        ketqua = "DangNhapKhongCoDonVi";
                        return ketqua;
                    }
                    //Quan he ngan sach
                    IQueryable<TTLD2024.DataConnect.DonVi> DonVi = from tdbDvi in db.DonVis
                                                          where tdbDvi.DonViID == _vuser.DonViID
                                                          select tdbDvi;
                    TTLD2024.DataConnect.DonVi _vdbDonVi = DonVi.FirstOrDefault();

                    //Tạo NTSSession thong tin don vi
                    NTSSession.SetNamSudung(data[3].ToString());
                    NTSSession.SetDonVi(_vdbDonVi);
                    NTSSession.SetUser(_vuser);
                    NTSSession.SetKeyUser(KeyUser);
                    NTSSession.SetKyBaoCao("13");
                    NTSSession.SetKeyMaHoa("");

                   
                    string DonViXetDuyet = "";
                    DataTable tabDonViXDQT = new DataTable();
                    //try { 
                    //tabDonViXDQT = JSonHelper.ToTable(_vuser.DonViXetDuyet);
                    //    if (tabDonViXDQT.Rows.Count > 0)
                    //    {
                    //        for (int i = 0; i < tabDonViXDQT.Rows.Count; i++)
                    //        {
                    //            if (DonViXetDuyet == "")
                    //            {
                    //                DonViXetDuyet = "" + tabDonViXDQT.Rows[i]["id"] + "";
                    //            }
                    //            else
                    //            {
                    //                DonViXetDuyet = DonViXetDuyet + ";" + tabDonViXDQT.Rows[i]["id"] + "";
                    //            }
                    //        }
                    //    }
                    //}
                    //catch
                    //{
                    //    DonViXetDuyet = "";
                    //}
                    NTSSession.SetDonViXetDuyet(DonViXetDuyet);
                    //if (_vlog != null)
                    //{
                    //    NTSSession.SetConnectionString1(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
                    //}
                    NTSSession.SetConnectionString1(_vConnectstring);
                    NTSSession.SetConnectionString2(_vConnectstring);
                    SqlFunction sqlFuncUer = new SqlFunction(NTSSession.GetConnectionString1());

                    //Theme
                    DataTable ISExist = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ISExist_ThietLapHeThong", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)).Tables[0];
                    if (ISExist.Rows[0][0].ToString() == "1")
                    {
                        try
                        {
                            SqlParameter[] param = {
                        new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                       };
                            DataTable ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetthietlapHeThong", param).Tables[0];
                            NTSSession.SetColor(JSonHelper.ToJson(ds.Rows[0]["MauSacJson"].ToString()));
                        }
                        catch (Exception ex)
                        {
                            return null;
                        }
                    }
                    else
                    {
                        NTSSession.SetColor("");
                    }

                    string url = sqlFuncUer.GetOneStringField("SELECT duongDan = (SELECT Menu.DuongDan FROM dbo.Menu WHERE Menu.MenuID =Users.MenuID) FROM dbo.Users WHERE UserID=N'" + _vuser.UserID.ToString() + "'");
                    if (string.IsNullOrEmpty(url))
                    {
                        ketqua = "DangNhapThanhCong";
                        return ketqua;
                    }
                    else
                    {
                        ketqua = "DangNhapThanhCong*" + url;
                        return ketqua;
                    }
                    //}
                    //else
                    //{
                    //    ketqua = "KhongTonTaiNienDo;";
                    //    return ketqua;// _lbCanhbao.InnerHtml = "Không tồn tại niên độ " + _txtNamLamviec.Value + " hoặc Hệ thống chưa được đăng ký sử dụng!";
                    //}
                }
                else
                {
                    ketqua = "ThongTinDangNhapKhongHopLe";
                    return ketqua;
                }

            }
            catch (Exception ex)
            {
                return "Đăng nhập không thành công!" + ex.Message;
            }
        }
        public static DataTable GetCauHinhWebSite()
        {
            try
            {
                string _vConnectstring = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                string _dataName = _vConnectstring.Split(';')[1].Replace("Initial Catalog=", "");
                _vConnectstring = _vConnectstring.Replace(_vConnectstring.Split(';')[1], "Initial Catalog=master");
                SqlFunction _vSql = new SqlFunction(_vConnectstring);
                _vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());
                _vSql = new SqlFunction(_vConnectstring);
                DataTable _vdt = _vSql.GetData(@"select TenDonVi=ISNULL(TenDonVi,''),DiaChi=ISNULL(DiaChi,''),
                SoDT=ISNULL(SoDT,''),Fax=ISNULL(Fax,''),Email=ISNULL(Email,''),Web=ISNULL(Web,''),TenPMVietTat=ISNULL(TenPMVietTat,''),
                TenPhanMem = (select TenDonVi=ISNULL(TenDonVi,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                TenPMVietTatPM = (select TenPMVietTat=ISNULL(TenPMVietTat,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                PhienBanPM = (select PhienBan=ISNULL(PhienBan,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                Banner = (select Banner=ISNULL(Banner,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1)    
                from CauHinhWebsite where MaCauHinh='02' and ISNULL(DangSD,0)=1");
                var customerData = _vdt.AsEnumerable();
                return _vdt;
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        [HttpPost]
        public string GetCauHinhWebSite3()
        {
            try
            {
                string _vConnectstring = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                string _dataName = _vConnectstring.Split(';')[1].Replace("Initial Catalog=", "");
                _vConnectstring = _vConnectstring.Replace(_vConnectstring.Split(';')[1], "Initial Catalog=master");
                SqlFunction _vSql = new SqlFunction(_vConnectstring);
                _vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());
                _vSql = new SqlFunction(_vConnectstring);
                DataTable _vdt = _vSql.GetData(@"select TenDonVi=ISNULL(TenDonVi,''),DiaChi=ISNULL(DiaChi,''),
                SoDT=ISNULL(SoDT,''),Fax=ISNULL(Fax,''),Email=ISNULL(Email,''),Web=ISNULL(Web,''),TenPMVietTat=ISNULL(TenPMVietTat,''),
                TenPhanMem = (select TenDonVi=ISNULL(TenDonVi,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                TenPMVietTatPM = (select TenPMVietTat=ISNULL(TenPMVietTat,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                PhienBanPM = (select PhienBan=ISNULL(PhienBan,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                Banner = (select Banner=ISNULL(Banner,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1)    
                from CauHinhWebsite where MaCauHinh='02' and ISNULL(DangSD,0)=1");
                var customerData = _vdt.AsEnumerable();
                if (_vdt.Rows.Count > 0)
                {

                    if (_vdt.Rows[0]["Banner"].ToString() != "")
                    {
                        string[] Path = _vdt.Rows[0]["Banner"].ToString().Split('*');
                        int kiemtra = 0;
                        Random rand = new Random();
                        int stt = Path.Length;
                        for (int i = 0; i < Path.Length; i++)
                        {
                            kiemtra = rand.Next(0, Path.Length - 1);
                            break;
                        }
                        _vdt.Rows[0]["Banner"] = Path[kiemtra].ToString().Replace("*", "").Replace("~", "");
                    }
                    else
                    {
                        _vdt.Rows[0]["Banner"] = _vdt.Rows[0]["Banner"].ToString();
                    }
                    _vdt.AcceptChanges();

                }
                return JSonHelper.ToJson(_vdt);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

    }
}