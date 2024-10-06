using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using TTLD2024.Class;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class ChiTietUngVienController : Controller
    {
        // GET: CongThongTinViecLam/ChiTietUngVien
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetHoSoLienQuan()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTuyenDung_MoiNhat", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetHoSoUngVien_ByHoSoID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetHoSoUngVien_ByHoSoID", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string LoadSoDienThoai(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };
                if (CongThongTinViecLam.Controllers.FunctionController.GetUsertGroupCode_DangDangNhap_Server() == "UngVien")
                {
                    return JSonHelper.ToJson(new DataTable());
                }
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetSDT_HoSoUngVien_ByHoSoID", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetHocVanBangCap(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetHocVan_HoSoUngVien_ByHoSoID", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetKinhNghiemLamViec(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetKinhNghiem_HoSoUngVien_ByHoSoID", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetUngVienLienQuan(object[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@NganhNghe", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@HoSoUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDanhSachUngVien_LienQuan", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string getKyNangUngVienByID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetKyNang_HoSoUngVien", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string getTinHocUngVienByID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinHoc_HoSoUngVien", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string getNgoaiNguUngVienByID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNgoaiNgu_HoSoUngVien", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string getNguoiThamKhaoUngVienByID(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaUngVien", DungChung.NormalizationString(ma)),
                };

                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNguoiThamKhao_HoSoUngVien", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
    }
}