using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class LoaiCTController : Controller
    {
        // GET: HeThong/LoaiChungTu
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string LoadGrid1()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_LoaiCT").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.Message.ToString();
                ep.Msg = "Thao tác thất bại!";
                return JSonHelper.ToJson(ep);
            }
        }

        //get all cho chức năng Loại chứng từ cho admin
        [HttpPost]
        public string LoadGridCauHinh(string LoaiCTID, string LoaiCauHinh)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                SqlParameter[] para = {
                    new SqlParameter("@LoaiCTID",DungChung.NormalizationGuid(LoaiCTID)),
                    new SqlParameter("@LoaiCauHinh",DungChung.NormalizationString(LoaiCauHinh)),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid("")),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid("")),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_LoaiCT_CauHinh", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.Message.ToString();
                ep.Msg = "Thao tác thất bại!";
                return JSonHelper.ToJson(ep);
            }
        }

        //get all cho chức năng Loại chứng từ cho user
        [HttpPost]
        public string LoadGridCauHinh_User(string LoaiCTID, string LoaiCauHinh)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                SqlParameter[] para = {
                    new SqlParameter("@LoaiCTID",DungChung.NormalizationGuid(LoaiCTID.ToString())),
                    new SqlParameter("@LoaiCauHinh",DungChung.NormalizationString(LoaiCauHinh.ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_LoaiCT_CauHinh", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.Message.ToString();
                ep.Msg = "Thao tác thất bại!";
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string kiemTraTonTai(string ma, string tenCot, string tenBang)
        {
            string stSQL = "select ketQua=(case when count(" + tenCot + ") > 0 then 'true' else 'false' end) from " + tenBang + " where " + tenCot + " = " + ma;
            DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, stSQL).Tables[0];
            return duLieu.Rows[0][0].ToString();
        }

        [HttpPost]
        public string kiemTraTonTaiSua(string ma, string tenCot, string tenBang, string tenCotxet, string maID)
        {
            string stSQL = "select ketQua=(case when count(" + tenCot + ") > 0 then 'true' else 'false' end) from " + tenBang + " where " + tenCot + " = " + ma + " and " + tenCotxet + " not in (select tmp." + tenCotxet + " from " + tenBang + " tmp where tmp." + tenCotxet + " = " + maID + ")";
            DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, stSQL).Tables[0];
            return duLieu.Rows[0][0].ToString();
        }

        [HttpPost]
        public string LuuThongTinLoaiChungTu(object[] data, string thaoTacThem)
        {
            string PhanQuyen = NTSSession.GetUser().UserGroupCode;
            //if (ThaoTacThem.ToLower() == "them")
            //{
            //    if (!PhanQuyen.ToLower().Contains("admin"))
            //    {
            //        return JSonHelper.ToJson("0_Bạn không có quyền thao tác chức năng này!");
            //    }
            //}
            ExecPermiss result = new ExecPermiss();
            try
            {
                if (kiemTraTonTai("'" + data[1].ToString() + "'", "LoaiCTCode", "LoaiCT") == "true" && thaoTacThem == "them")
                {
                    return JSonHelper.ToJson("2_Đã tồn tại mã trong hệ thống!");
                }
                else if (kiemTraTonTai("'" + data[6].ToString() + "'", "URLChuyenTrang", "LoaiCT") == "true" && thaoTacThem == "them")
                {
                    return JSonHelper.ToJson("2_Đã tồn tại URL trong hệ thống!");
                }

                if (kiemTraTonTaiSua("'" + data[1].ToString() + "'", "LoaiCTCode", "LoaiCT", "LoaiCTID", "'" + data[0].ToString() + "'") == "true" && thaoTacThem == "sua")
                {
                    return JSonHelper.ToJson("2_Đã tồn tại mã trong hệ thống!");
                }else if (kiemTraTonTaiSua("'" + data[6].ToString() + "'", "URLChuyenTrang", "LoaiCT", "LoaiCTID", "'" + data[0].ToString() + "'") == "true" && thaoTacThem == "sua")
                {
                    return JSonHelper.ToJson("2_Đã tồn tại URL trong hệ thống!");
                }
                SqlParameter[] para = {
                   new SqlParameter("@thaoTacThem",  thaoTacThem),
                   new SqlParameter("@LoaiCTID",  DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@LoaiCTCode",  DungChung.NormalizationString(data[1].ToString())),
                    new SqlParameter("@TenLoaiCT",  DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@TaiKhoanID_No", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TaiKhoanID_Co", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@MauSoCT", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@kiHieuCT", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@kyHieuPhiatruoc", DungChung.NormalizationString(data[11].ToString())),
                    new SqlParameter("@kyHieuPhiasau", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@SoKyTu", DungChung.NormalizationNumber(data[10].ToString())),
                    new SqlParameter("@tangTheoThang", DungChung.NormalizationBoolean(data[14].ToString())),
                    new SqlParameter("@tuTang",DungChung.NormalizationBoolean(data[13].ToString())),
                    new SqlParameter("@hienKyHieu", DungChung.NormalizationBoolean(data[15].ToString())),
                    new SqlParameter("@hienDauGach", DungChung.NormalizationBoolean(data[16].ToString())),
                    new SqlParameter("@dienGiai", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@NgungSD", DungChung.NormalizationBoolean(data[8].ToString())),
                    new SqlParameter("@URL", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@TaiKhoanID_DTCo", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@TaiKhoanID_DTNo", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid("")),
                    new SqlParameter("@UserID",  DungChung.NormalizationGuid(""))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinLoaiCT", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiCT";
                    if (thaoTacThem.ToLower() == "them")
                    {
                        NTSSecurity.ghiLogs(duLieu, "Them");
                        return JSonHelper.ToJson("1_Thêm mới dữ liệu thành công!_" + duLieu.Rows[0][0]);
                    }
                    else
                    {
                        NTSSecurity.ghiLogs(duLieu, "Sua");
                        return JSonHelper.ToJson("1_Cập nhật dữ liệu thành công!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("0_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Thao tác thất bại!");
            }
        }

        //lưu thông tin cấu hình trong chức năng Loại chứng từ dành cho admin
        [HttpPost]
        public string LuuThongTin_CauHinh(object[] data, string ThaoTacThem)
        {
            string PhanQuyen = NTSSession.GetUser().UserGroupCode;
            try
            {
                //if (ThaoTacThem.ToLower() == "them")
                //{
                //    if (!PhanQuyen.ToLower().Contains("admin"))
                //    {
                //        return JSonHelper.ToJson("0_Bạn không có quyền thao tác chức năng này!");
                //    }
                //}

                SqlParameter[] para = {
                    new SqlParameter("@Loai",  DungChung.NormalizationString(ThaoTacThem.ToLower())),
                    new SqlParameter("@LoaiCT_CauHinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@STT",DungChung.NormalizationNumber( data[1].NTS_ToNumber())),
                    new SqlParameter("@TenCot",  DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@MoTa",  DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@ChieuDaiCot",  DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@KieuDuLieu", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@KhoaViTri",  DungChung.NormalizationBoolean(data[6])),
                    new SqlParameter("@HienThi",  DungChung.NormalizationBoolean(data[7])),
                    new SqlParameter("@TimKiem",  DungChung.NormalizationBoolean(data[8])),
                    new SqlParameter("@CanhLe",  DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@LoaiCauHinh",  DungChung.NormalizationString(data[10].ToString())),
                    new SqlParameter("@LoaiCTID", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid("")),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid("")),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinLoaiCT_CauHinh", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiCT_CauHinh";
                    if (ThaoTacThem.ToLower() == "them")
                    {
                        NTSSecurity.ghiLogs(duLieu, "Them");
                        return JSonHelper.ToJson("1_Thêm mới dữ liệu thành công!_" + duLieu.Rows[0][0]);
                    }
                    else
                    {
                        NTSSecurity.ghiLogs(duLieu, "Sua");
                        return JSonHelper.ToJson("1_Cập nhật dữ liệu thành công!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("-1_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_Thao tác thất bại!");
            }
        }

        //lưu thông tin cấu hình khi user theo thiết lập của user đăng nhập
        [HttpPost]
        public string LuuThongTin_CauHinh_TheoUser(object[] data, string ThaoTacThem)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Loai",  DungChung.NormalizationString(ThaoTacThem.ToLower())),
                    new SqlParameter("@LoaiCT_CauHinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@STT",DungChung.NormalizationNumber( data[1].ToString())),
                    new SqlParameter("@TenCot",  DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@MoTa",  DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@ChieuDaiCot",  DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@KieuDuLieu", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@KhoaViTri",  DungChung.NormalizationBoolean(data[6])),
                    new SqlParameter("@HienThi",  DungChung.NormalizationBoolean(data[7])),
                    new SqlParameter("@TimKiem",  DungChung.NormalizationBoolean(data[8])),
                    new SqlParameter("@CanhLe",  DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@LoaiCauHinh",  DungChung.NormalizationString(data[10].ToString())),
                    new SqlParameter("@LoaiCTID", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinLoaiCT_CauHinh", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiCT_CauHinh";
                    if (ThaoTacThem.ToLower() == "them")
                    {
                        NTSSecurity.ghiLogs(duLieu, "Them");
                        return JSonHelper.ToJson("1_Thêm mới dữ liệu thành công!_" + duLieu.Rows[0][0]);
                    }
                    else
                    {
                        NTSSecurity.ghiLogs(duLieu, "Sua");
                        return JSonHelper.ToJson("1_Cập nhật dữ liệu thành công!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("-1_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_Thao tác thất bại!");
            }
        }

        [HttpPost]
        public string GetLoaiChungTuByID(string data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@LoaiCTID",DungChung.NormalizationGuid(data)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiCTTheoID", para).Tables[0];
                //Returning Json Data

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetLoaiCT_CauHinhByID(string data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@LoaiCT_CauHinhID",DungChung.NormalizationGuid(data)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiCT_CauHinhTheoID", para).Tables[0];
                //Returning Json Data

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string XoaLoaiCT(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@LoaiCTID",DungChung.NormalizationGuid(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_LoaiCT", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiCT";
                    NTSSecurity.ghiLogs(duLieu, "Xoa");
                    return JSonHelper.ToJson("1_Xóa dữ liệu thành công!");
                }
                else
                {
                    return JSonHelper.ToJson("0_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa dữ liệu không thành công!");
            }
        }

        [HttpPost]
        public string XoaLoaiCT_CauHinh(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@LoaiCT_CauHinhID",DungChung.NormalizationGuid(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_LoaiCT_CauHinh", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiCT_CauHinh";
                    NTSSecurity.ghiLogs(duLieu, "Xoa");
                    return JSonHelper.ToJson("1_Xóa dữ liệu thành công!");
                }
                else
                {
                    return JSonHelper.ToJson("0_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa dữ liệu không thành công!");
            }
        }

        [HttpPost]
        public string LuuSaoChep(object[] data)
        {
            ExecPermiss result = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                   new SqlParameter("@LoaiCTID_Tu",  DungChung.NormalizationGuid(data[0].ToString())),
                   new SqlParameter("@LoaiCTID_Den",  DungChung.NormalizationGuid(data[1].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuSaoChepLoaiCT", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiCT_CauHinh";
                    NTSSecurity.ghiLogs(duLieu, "Them");
                    return JSonHelper.ToJson("1_Sao chép dữ liệu thành công!");
                }
                else
                {
                    return JSonHelper.ToJson("-1_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_Thao tác thất bại!");
            }
        }
    }
}