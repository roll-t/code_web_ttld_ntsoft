using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using TTLD2024.Class;

namespace TTLD2024.Areas.CamNangNgheNghiep
{
    public class TongQuanCamNangController : Controller
    {
        // GET: CamNangNgheNghiep/TongQuanCamNang
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
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetMenuChucNang_CamNang", null).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";
            }
        }
        [HttpPost]
        public string getTinTucCamNangNoiBat()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinTucNoiBat_CamNang", null).Tables[0];
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
        public string getCamNang_TheoMa(string MaLoaiCamNang)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaLoaiCamNang", DungChung.NormalizationString(MaLoaiCamNang)),
                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetCamNang_TheoMa", para).Tables[0];
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
        public string getTitleCamNang(string MaLoaiCamNang)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaLoaiCamNang", DungChung.NormalizationString(MaLoaiCamNang)),
                };
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTitleCamNang_TheoMa", para).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex.ToString());
            }
        }
        [HttpPost]
        public string getCamNangMoiNhat_Top10()
        {
            try
            {
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_Get_Top10_CamNangNgheNghiep_MoiNhat", null).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public string getTuKhoaTimKiem()
        {
            try
            {
                DataTable datatable = SqlHelper.ExecuteDataset(
                        DungChung.GetConnectionStrings(), "Proc_GetTuKhoaTimKiem_NhieuNhat", null).Tables[0];
                return JSonHelper.ToJson(datatable);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public string getFooterCamNang()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetFooter_CamNang", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string getFooterChuDeDangXem()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetChuDeDangXem", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getFooterBaoVietNoiBat()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetBaVietNoiBat", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}