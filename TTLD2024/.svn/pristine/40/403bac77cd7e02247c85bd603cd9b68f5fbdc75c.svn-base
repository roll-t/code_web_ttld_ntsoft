using TTLD2024.Class;
using TTLD2024.DataConnect;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class DoiMatKhauController : Controller
    {
        // GET: HeThong/DoiMatKhau
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string LuuThongTin(string[] param)
        {
            try
            {
                UsersDataContext db = new UsersDataContext();
                //Kiểm tra đăng nhập
                IQueryable<User> fam = from u in db.Users
                                       where (u.TenDangNhap == NTSSession.GetUser().TenDangNhap) && (u.MatMa == WEB_DLL.ntsSecurity._mEncrypt(NTSSession.GetUser().TenDangNhap + ";" + param[2].ToString(), PageInfo.KeyMaHoaMatKhau, true)) && (u.DangSD == true)
                                       select u;
                User _vuser = fam.FirstOrDefault();
                if (_vuser == null)
                {
                    return JSonHelper.ToJson("0_Thông tin mật khẩu cũ không đúng!");
                }
                SqlParameter[] para = {
                    new SqlParameter("@MKMoi",WEB_DLL.ntsSecurity._mEncrypt(NTSSession.GetUser().TenDangNhap + ";" + param[0].ToString(), PageInfo.KeyMaHoaMatKhau, true)),
                    new SqlParameter("@MXN",WEB_DLL.ntsSecurity._mEncrypt(NTSSession.GetUser().TenDangNhap + ";" + param[1].ToString(), PageInfo.KeyMaHoaXacNhan, true)),
                    new SqlParameter("@UserID", NTSSession.GetUser().UserID),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_ThongTinUser_MK", para).Tables[0];
                //Returning Json Data
                return JSonHelper.ToJson("1_Đổi mật khẩu thành công!");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Thao tác thất bại!");
            }
        }
        [HttpPost]
        public string GetThongTinUser()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"SELECT TOP 1 UserID
      ,TenDangNhap
      ,MatMa
      ,MaXacNhan
      ,UserGroupCode
      ,UserGroupID = (select UserGroupName from UserGroup where UserGroup.UserGroupID = Users.UserGroupID)
      ,DonVi = (select TenDonVi from DonVi where DonVi.DonViID = Users.DonViID)
       ,DonViID
      ,NgayDangNhap
      ,Email
      ,NgayThaoTac
      ,DangSD
      ,Online
      ,IpNet
      ,UserID_ThaoTac
      ,PermissC1
      ,PhongBanID
      ,NhanVienID
      ,MenuID,HoTen=ISNULL(HoVaTen,''),HinhAnh=ISNULL(Avatar,'')
  FROM Users WHERE UserID = '" + NTSSession.GetUser().UserID + "'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception e)
            {
                return JSonHelper.ToJson("Error");
            }
        }
    }
}