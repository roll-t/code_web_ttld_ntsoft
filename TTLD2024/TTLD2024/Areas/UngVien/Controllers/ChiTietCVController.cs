using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.UngVien.Controllers
{
    public class ChiTietCVController : Controller
    {
        // GET: UngVien/ChiTietCV
        public ActionResult Index()
        {
            if (NTSSession.GetUserUngVien() == null)
            {
                return Redirect("dang-nhap-ung-vien.html");
            }
            return View();
        }
        [HttpPost]
        public string LoadDuLieuCV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_CreateNewCV", para); // Tạo CV trống nếu chưa có
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCV_ByUngVienID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTinCV(object[] data)
        {

            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TieuDe" ,DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@HovaTen" ,DungChung.NormalizationString(data[1].ToString())),
                    new SqlParameter("@NgayThangNamSinh",  DungChung.NormalizationDateTime(data[2].ToString())),
                    new SqlParameter("@GioiTinh", DungChung.NormalizationNumber(data[3].ToString())),
                    new SqlParameter("@SoDienThoai",  DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@DiaChi", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@MucTieuCongViec", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@SoThich", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@CVID", DungChung.NormalizationGuid(data[9].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCV", para).Tables[0];
                //Returning Json Data                
                duLieu.TableName = "CV";
                NTSSecurity.ghiLogs(duLieu, "Sua");
                return NTSThongBao.CapNhatThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Học vấn
        [HttpPost]
        public string getHocVanBangCap()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {

                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHocVanBangCapCV", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin_HocVanBangCap(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@HocVanID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ChuyenNganh" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@TenTruong",  DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@BangCapID", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@DenNgay",  DungChung.NormalizationDateTime(data[6].ToString())),
                    new SqlParameter("@ThanhTuu", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_HocVanCV", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "Them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSuaHocVanBangCap(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetHocVanBangCapCV_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaHocVanBangCap(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_HocVanBangCapCV", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Kinh Nghiệm làm việc
        [HttpPost]
        public string getKinhNghiemLV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllKinhNghiemLamViecCV", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin_KinhNghiemLVUngVien(object[] data)
        {
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@KinhNghiemLVUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ChucDanh" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@TenCongTy",  DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@BangCapID", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@TuThang", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@DenThang",  DungChung.NormalizationDateTime(data[6].ToString())),
                    new SqlParameter("@MoTaKinhNghiemLV", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_KinhNghiemCV", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "Them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDuLieuSuaKinhNghiemLV(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetKinhNghiemCV_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaKinhNghiemLV(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_KinhNghiemCV", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Kỹ năng chuyên môn
        [HttpPost]
        public string getKyNangUngVien()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllKyNangCV", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin_KyNang(object[] data)
        {
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@KyNangUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@TenKyNang" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@MoTaKyNangCM", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_KyNangCV", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "Them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDuLieuSuaKyNangUngVien(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetKyNangCV_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaKyNangUngVien(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_KyNangCV", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Tin học - Ngoại ngữ
        [HttpPost]
        public string getTinHocNgoaiNgu()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllTinHocNgoaiNguCV", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin_TinHocNgoaiNgu(object[] data)
        {
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@TinHocNgoaiNguUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@TenTinHoc_NgoaiNgu" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@MoTaTinHocNgoaiNgu", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_TinHocNgoaiNguCV", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "Them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDuLieuSuaTinHocNgoaiNgu(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTinHocNgoaiNguCV_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaTinHocNgoaiNguUngVien(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_TinHocNgoaiNguCV", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Người liên hệ
        [HttpPost]
        public string getNguoiLienHe()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllNguoiLienHe", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin_NguoiLienHe(object[] data)
        {
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@NguoiLienHeID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@TenNguoiLienHe" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@TenCongTy", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@ChucVu", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_NguoiLienHe", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "Them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDuLieuSuaNguoiLienHe(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetNguoiLienHe_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaNguoiLienHe(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_NguoiLienHe", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Học vấn
        [HttpPost]
        public string getHoatDong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {

            new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
        };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoatDong", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin_HoatDong(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {

                SqlParameter[] para = {
            new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
            new SqlParameter("@HoatDongID", DungChung.NormalizationGuid(data[1].ToString())),
            new SqlParameter("@VaiTro",  DungChung.NormalizationString(data[2].ToString())),
            new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[3].ToString())),
            new SqlParameter("@DenNgay",  DungChung.NormalizationDateTime(data[4].ToString())),
            new SqlParameter("@MoTa", DungChung.NormalizationString(data[5].ToString())),
            new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),

        };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_HoatDong", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "Them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSuaHoatDong(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
            new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
        };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetHoatDong_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaHoatDong(string ID)
        {
            try
            {
                SqlParameter[] para = {
            new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
        };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_HoatDong", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}