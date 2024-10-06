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
    public class DangNhapNTDController : Controller
    {
        // GET: CongThongTinViecLam/DangNhapNTD
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() != null || NTSSession.GetUserUngVien() != null)
            {
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
                IQueryable<TTLD2024.DataConnect.NhaTuyenDung> fam = from u in db.NhaTuyenDungs
                                          where (u.Email == data[0].ToString().Trim()) && (u.MatMa == WEB_DLL.ntsSecurity._mEncrypt(data[0].ToString() + ";" + data[1].ToString(), PageInfo.KeyMaHoaMatKhau, true)) && (u.TrangThaiKichHoat == true)
                                          select u;
                TTLD2024.DataConnect.NhaTuyenDung _vuser = fam.FirstOrDefault();
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
                    db.Insert_Log(_vuser.NhaTuyenDungID, _defaultGuid, System.Web.HttpContext.Current.Request.UserHostName, System.Web.HttpContext.Current.Request.UserHostAddress, KeyUser);
                    IQueryable<Log> Log = from log in db.Logs
                                          where log.DonViID == _defaultGuid
                                          orderby log.NgayDangNhap descending
                                          select log;
                    Log _vlog = Log.FirstOrDefault();
                    //Kiểm tra thông tin đơn vị của người dùng để thiết lập báo cáo
                    System.Web.HttpContext.Current.Session.Remove("lanDangNhap");
                    //_vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());// + namlamviec);//_dataName.ToLower() + _txtNamLamviec.Value);
                    ketqua = "DangNhapThanhCong";
                    NTSSession.SetUserNTD(_vuser);
                    NTSSession.SetKeyUser(KeyUser);
                    NTSSession.SetKeyMaHoa("");
                    return ketqua;  
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