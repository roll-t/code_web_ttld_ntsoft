using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;
using TTLD2024.DataConnect;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class DangNhapUngVienController : Controller
    {
        // GET: CongThongTinViecLam/DangNhapUngVien
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() != null || NTSSession.GetUserUngVien() != null) {
                return Redirect("trang-chu.html");
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
            if (ketqua == "DangNhapThanhCong")
            {
                ketquatrave = "1";// Đăng nhập thành công
            }
            else if (ketqua == "ThongTinDangNhapKhongHopLe")
            {
                ketquatrave = "2";// Đăng nhập thất bại
            }
            else if (ketqua == "ketNoiKhongThanhCong")
            {
                ketquatrave = "3";// Đăng nhập thất bại
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
                UsersDataContext db = new UsersDataContext();
                //Kiểm tra đăng nhập
                IQueryable<TTLD2024.DataConnect.UngVien> fam = from u in db.UngViens
                                       where (u.Email == data[0].ToString().Trim()) && (u.MatMa == WEB_DLL.ntsSecurity._mEncrypt(data[0].ToString() + ";" + data[1].ToString(), PageInfo.KeyMaHoaMatKhau, true)) && (u.TrangThaiKichHoat == true)
                                       select u;
                TTLD2024.DataConnect.UngVien _vuser = fam.FirstOrDefault();
                if (_vuser != null)
                {
                    ////Kiểm tra có đang online không
                    string KeyUser = NTSSecurity.NewToken();
                    //Xử lý kiểm tra tên CSDL
                    string _vConnectstring = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                    string _dataName = _vConnectstring.Split(';')[1].Replace("Initial Catalog=", "");
                    _vConnectstring = _vConnectstring.Replace(_vConnectstring.Split(';')[1], "Initial Catalog=master");
                    SqlFunction _vSql = new SqlFunction(_vConnectstring);
                    Guid _defaultGuid = DungChung.NormalizationGuid("");
                    db.Insert_Log(_vuser.UngVienID, _defaultGuid, System.Web.HttpContext.Current.Request.UserHostName, System.Web.HttpContext.Current.Request.UserHostAddress, KeyUser);
                    IQueryable<Log> Log = from log in db.Logs
                                          where log.DonViID == _defaultGuid
                                          orderby log.NgayDangNhap descending
                                          select log;
                    Log _vlog = Log.FirstOrDefault();
                    //Kiểm tra thông tin đơn vị của người dùng để thiết lập báo cáo
                    System.Web.HttpContext.Current.Session.Remove("lanDangNhap");
                    //_vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());// + namlamviec);//_dataName.ToLower() + _txtNamLamviec.Value);
                    ketqua = "DangNhapThanhCong";
                    NTSSession.SetUserUngVien(_vuser);
                    NTSSession.SetKeyUser(KeyUser);
                    NTSSession.SetKeyMaHoa("");
                    return ketqua;
                    /*
                    _vSql = new SqlFunction(_vConnectstring);
                    DataTable _vdt = _vSql.GetData("SELECT * FROM DonVi WHERE DonViID=N'" + _defaultGuid.ToString() + "'");
                    if (_vdt.Rows.Count <= 0)
                    {
                        ketqua = "DangNhapKhongCoDonVi";
                        NTSSession.SetUserUngVien(_vuser);
                        NTSSession.SetKeyUser(KeyUser);
                        NTSSession.SetKeyMaHoa("");
                        return ketqua;
                    }
                    //Quan he ngan sach
                    IQueryable<TTLD2024.DataConnect.DonVi> DonVi = from tdbDvi in db.DonVis
                                                                   where tdbDvi.DonViID == _defaultGuid
                                                                   select tdbDvi;
                    TTLD2024.DataConnect.DonVi _vdbDonVi = DonVi.FirstOrDefault();

                    //Tạo NTSSession thong tin don vi
                    //NTSSession.SetNamSudung(data[3].ToString());
                    NTSSession.SetDonVi(_vdbDonVi);
                    NTSSession.SetUserUngVien(_vuser);
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

                    string url = sqlFuncUer.GetOneStringField("SELECT duongDan = (SELECT Menu.DuongDan FROM dbo.Menu WHERE Menu.MenuID =Users.MenuID) FROM dbo.Users WHERE UserID=N'" + _vuser.UngVienID.ToString() + "'");
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
                    */
                }
                else
                {
                    ketqua = "ThongTinDangNhapKhongHopLe";
                    return ketqua;
                }

            }
            catch (Exception ex)
            {
                return "Đăng nhập không thành công! " + ex.Message;
            }
        }
    }
}