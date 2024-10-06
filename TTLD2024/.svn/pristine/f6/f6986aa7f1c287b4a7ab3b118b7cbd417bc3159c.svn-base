using ClosedXML.Excel;
using Cong.Class;
using Newtonsoft.Json;
using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Text.RegularExpressions;

namespace TTLD2024.Areas.UngVien.Controllers
{
    public class HoSoUngVienController : Controller
    {
        // GET: UngVien/HoSoCuaToi
        public ActionResult Index()
        {
            if (NTSSession.GetUserUngVien() == null)
            {
                return Redirect("dang-nhap-ung-vien.html");
            }
            return View();
        }

        [HttpPost]
        public string LoadDuLieuSua()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {                
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHoSoUngVien_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTinCaNhan(object[] data)
        {
            
            try
            {                
                SqlParameter[] para = {
                    new SqlParameter("@TenUngVien" ,DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@NgaySinh",  DungChung.NormalizationDateTime(data[1].ToString())),
                    new SqlParameter("@GioiTinh", DungChung.NormalizationNumber(data[2].ToString())),
                    new SqlParameter("@TinhTrangHonNhan", DungChung.NormalizationNumber(data[3].ToString())),
                    new SqlParameter("@DienThoai",  DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@DiaChi", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),                   
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinHoSoUngVienCTT", para).Tables[0];
                //Returning Json Data                
                duLieu.TableName = "UngVien";
                NTSSecurity.ghiLogs(duLieu, "Sua");
                return NTSThongBao.CapNhatThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDuLieuHoSoViecLam()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHoSoViecLam_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTinHoSo(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {                
                SqlParameter[] para = {
                    new SqlParameter("@CongViecMongMuon", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@MucLuongID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@CapBacID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@NganhNgheID", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@DiaDiemLamViecID", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@HinhThucLamViecID", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@GioiThieu", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@MucTieuCongViec", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@KinhNghiemLamViecID", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    new SqlParameter("@TrinhDoHocVanID", DungChung.NormalizationGuid(data[9].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_HoSoUngVienCTT_HoSo", para).Tables[1];
                //Returning Json Data
                if (duLieu.Rows[0][0].ToString() == "0")
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
        public string LuuThongTin_HocVanBangCap(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                
                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@HocVanBangCapUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ChuyenNganh" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@TenTruong",  DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@BangCapID", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@DenNgay",  DungChung.NormalizationDateTime(data[6].ToString())),
                    new SqlParameter("@ThanhTuu", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    new SqlParameter("@NguoiTimViecID", DungChung.NormalizationGuid(data[8].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTin_HocVanBangCapUngVien_CTT", para).Tables[0];
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
        public  string getHocVanBangCap()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {

                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHocVanBangCapUngVien", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public  string LoadDuLieuSuaHocVanBangCap(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetHocVanBangCap_ByID", para).Tables[0];
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_HocVanBangCapUngVien", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string getKinhNghiemLV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllKinhNghiemLVUngVien", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Kinh Nghiệm làm việc
        [HttpPost]
        public  string LuuThongTin_KinhNghiemLVUngVien(object[] data)
        {
            try
            {
               
                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@KinhNghiemLVUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ChucDanh" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@TenCongTy",  DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@BangCapID2", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@TuThang", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@DenThang",  DungChung.NormalizationDateTime(data[6].ToString())),
                    new SqlParameter("@CVHientai",  DungChung.NormalizationBoolean(data[7].ToString())),
                    new SqlParameter("@MoTaKinhNghiemLV", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@UngVienID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    new SqlParameter("@NguoiTimViecID", DungChung.NormalizationGuid(data[9].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_KinhNghiemLVUngVien_CTT", para).Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetKinhNghiemLVUngVien_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string XoaKinhNghiemLV(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_KinhNghiemLVUngVien", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string getKyNangUngVien()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllKyNangUngVien", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Kỹ năng chuyên môn
        [HttpPost]
        public  string LuuThongTin_KyNang(object[] data)
        {
            try
            {
               
                SqlParameter[] para = {
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@KyNangUngVienID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@TenKyNang" ,DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@MoTaKyNangCM", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                    new SqlParameter("@HoSoUngVienID", DungChung.NormalizationGuid(data[4].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_KyNangUngVien_CTT", para).Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetKyNangUngVien_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string XoaKyNangUngVien(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_KyNangUngVien", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public  string getTinHocNgoaiNgu()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllTinHocNgoaiNghuUngVien", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Tin học - Ngoại ngữ
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
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                    new SqlParameter("@HoSoUngVienID", DungChung.NormalizationGuid(data[4].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_TinHocNgoaiNguUngVien_CTT", para).Tables[0];
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
        public  string LoadDuLieuSuaTinHocNgoaiNgu(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTinHocNgoaiNguUngVien_ByID", para).Tables[0];
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_TinHocNgoaiNguUngVien", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string ThongTinHoSo()
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_KiemTraThongTinHoSoUngVien_CTT", para).Tables[0];
                //Returning Json Data
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string Update_TrangThai()
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_Update_TrangThaiTTCaNhan_GuiXacThuc", para);
                //Returning Json Data

                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Gửi phê duyệt thành công!"
                };
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss
                {
                    Err = true,
                    Msg = "Gửi xét duyệt không thành công!_" + ex
                };
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string Update_TrangThaiHSViecLam(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_Update_TrangThaiTTCaNhan_GuiXetDuyet", para);
                //Returning Json Data

                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Gửi phê duyệt thành công!"
                };
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss
                {
                    Err = true,
                    Msg = "Gửi xét duyệt không thành công!_" + ex
                };
                return JSonHelper.ToJson(ep);
            }
        }
    }
}