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
    public class TrangChuCTTController : Controller
    {
        // GET: CongThongTinViecLam/TrangChu
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetTinTuyenDung_MoiNhat()
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
        public string GetNgheNghiep_top10()
        {
            try
            {
                DataSet duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetAllDanhSachNganhKinhTe", null);
                DataTable ngheNghieptop10 = duLieu.Tables[0];
                return JSonHelper.ToJson(ngheNghieptop10);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
        [HttpPost]
        public string GetNgheNghiep()
        {
            try
            {
                DataSet duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetAllDanhSachNganhKinhTe", null);
                DataTable ngheNghiep = duLieu.Tables[1];
                return JSonHelper.ToJson(ngheNghiep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
        [HttpPost]
        public string GetBenner_CTT()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetBenner_CTT", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetTinTuyenDung_LuongCao()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTuyenDung_LuongCao", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetRand_NhaTuyenDung()
        {
            try
            {

                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetRanD_NhaTuyenDung", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetTinTuc_TrangChuCTT()
        {
            try
            {

                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTuc_TrangChuCTT", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetWebSite_TrangChu()
        {
            try
            {

                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetWebsiteLienKet_TrangChuCTT", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string GetNhaTuyenDungNoiBat()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {

                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNhaTuyenDungNoiBat_TrangChuCTT", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
        [HttpPost]
        public string GetNhaTuyenDungMoiNhat()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {

                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNhaTuyenDungMoi_TrangChuCTT", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
        [HttpPost]
        public string GetMenu_TrangChuCTT()
        {
            try
            {

                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetMenu_TrangChuCTT", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        public string GetThongBao_CTT()
        {
            try
            {
                if (NTSSession.GetUserNTD() == null && NTSSession.GetUserUngVien() == null)
                {
                    return "2"; // chưa đăng nhập
                }
                else
                {
                    string id = null;

                    if (NTSSession.GetUserNTD() != null)
                    {
                        id = NTSSession.GetUserNTD().NhaTuyenDungID.ToString();
                    }
                    else if (NTSSession.GetUserUngVien() != null)
                    {
                        id = NTSSession.GetUserUngVien().UngVienID.ToString();
                    }

                    // Ensure id is assigned before usage
                    if (id != null)
                    {
                        SqlParameter[] para = {
                            new SqlParameter("@UserID", DungChung.NormalizationGuid(id)),
                        };
                        DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetThongBao_CTT", para).Tables[0];
                        return JSonHelper.ToJson(duLieu);
                    }

                    return "2"; // fallback in case no valid id is found
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string XemThongBao(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetThongBaoByID_CTT", para).Tables[0];
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string XoaThongBao(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_DeleteThongBao_CTT", para).Tables[0];
                return JSonHelper.ToJson("1_Xóa thông báo thành công!");

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa thông báo không thành công!");
            }
        }

        [HttpPost]
        public string XoaToanBoThongBao(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_DeleteAllThongBao_CTT", para).Tables[0];
                return JSonHelper.ToJson("1_Xóa thông báo thành công!");

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa thông báo không thành công!");
            }
        }

        [HttpPost]
        public string KiemTraDangNhap()
        {
            try
            {
                SqlFunction sqlFun_user = new SqlFunction(DungChung.GetConnectionStrings());
                if (NTSSession.GetUserNTD() != null)
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text, @"Select TenToChuc
                            from dbo.NhaTuyenDung
                            WHERE NhaTuyenDungID = '" + NTSSession.GetUserNTD().NhaTuyenDungID.ToString() + "'").Tables[0];
                    duLieu.Columns.Add("NhomNguoiDung", typeof(string));
                    duLieu.Rows[0]["NhomNguoiDung"] = "NhaTuyenDung";
                    return JSonHelper.ToJson(duLieu);
                }
                else if (NTSSession.GetUserUngVien() != null)
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text, @"Select HoVaTen 
                        from dbo.UngVien 
                        WHERE UngVienID = '" + NTSSession.GetUserUngVien().UngVienID.ToString() + "'").Tables[0];
                    duLieu.Columns.Add("NhomNguoiDung", typeof(string));
                    duLieu.Rows[0]["NhomNguoiDung"] = "UngVien";
                    return JSonHelper.ToJson(duLieu);
                }
                else
                {
                    return "2";
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }

        [HttpPost]
        public string getMenu()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetMenuChucNang", null).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";
            }
        }
        [HttpPost]
        public string getTinTucChiTiet()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTucNoiBat", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string getBanner()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetBanner", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string getTinTuc_TrangChu()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTuc_TrangChu", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string getWebsiteLienKet()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetWebsiteLienKet", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string getFooterDiaChi()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDiaChiFooter_CTT", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string getFooterDiaChi_CTy()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDiaChiCTy_CTT", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetCamNangNewTop3(string noidung)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCamNangNgheNghiep_Top3", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetSoLuongViecLam_NgheNghiep(string ma)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] sqlParams = {
                    new SqlParameter("@Ma", DungChung.NormalizationString(ma))
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_GetSoLuongNgheNghiep", sqlParams);
                ep.Result = duLieu.ToString();
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDanhSachUngVien_TranhChu()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetDanhSachUngVien_TrangChu", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

    }
}