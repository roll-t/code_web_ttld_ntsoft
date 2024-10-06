using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using A = DocumentFormat.OpenXml.Drawing;
using DW = DocumentFormat.OpenXml.Drawing.Wordprocessing;
using PIC = DocumentFormat.OpenXml.Drawing.Pictures;
using ClosedXML.Excel;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using TTLD2024.Areas.DanhMuc.Controllers;
using TTLD2024.Class;

namespace TTLD2024.Areas.QuanLy.Controllers
{
    public class PhieuDangKyCungUngLaoDongController : Controller
    {
        // GET: QuanLy/PhieuDangKyCungUngLaoDong
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetAll(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5])),
                    new SqlParameter("@DenNgay", DungChung.NormalizationDateTime(data[6])),
                    new SqlParameter("@TenToChuc_TimKiem_US", DungChung.NormalizationString(data[7])),
                    new SqlParameter("@MaSoThue_TimKiem_US", DungChung.NormalizationString(data[8])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllPhieuDKGTVL", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string LoadDuLieuToChucTheoMaSoThue(string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@MaSoThue", DungChung.NormalizationString(value)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllToChucByMaSoThue_ViecTimNguoi", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChung.KiemTraTonTai(data[2].ToString(), "MaSo", "PhieuDKGTVL"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[2].ToString(), "MaSo", "PhieuDKGTVL", "PhieuDKGTVLID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@PhieuDKGTVLID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaSo", data[2].ToString()),
                    new SqlParameter("@NgayDangKy", DungChung.NormalizationDateTime(data[3].ToString())),
                    new SqlParameter("@NamTronKCN", DungChung.NormalizationBoolean(data[4].ToString())),
                    new SqlParameter("@LaCaNhanTuyenDung", DungChung.NormalizationBoolean(data[5].ToString())),
                    new SqlParameter("@LoaiHinhDNID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@TenKCN", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@TenNguoiSuDungLaoDong", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[13].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[14].ToString())),
                    new SqlParameter("@SoNha", DungChung.NormalizationString(data[15].ToString())),
                    new SqlParameter("@DiaChiDoanhNghiep", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@NganhNgheKinhDoanhChinh", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@QuyMoLaoDong", DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@SanPhamChinh", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@HanNop", DungChung.NormalizationDateTime(data[22].ToString())),
                    new SqlParameter("@HoVaTen_NguoiDaiDien", DungChung.NormalizationString(data[23].ToString())),
                    new SqlParameter("@ChuVu_NguoiDaiDien", DungChung.NormalizationString(data[24].ToString())),
                    new SqlParameter("@SoDienThoai_NguoiDaiDien", DungChung.NormalizationString(data[25].ToString())),
                    new SqlParameter("@HinhThucLienHe_NguoiDaiDien", DungChung.NormalizationString(data[26].ToString())),
                    new SqlParameter("@DangKyDichVuID", DungChung.NormalizationString(data[27].ToString())),
                    new SqlParameter("@DangKyDichVuKhac", DungChung.NormalizationString(data[28].ToString())),
                    new SqlParameter("@SelectToChuc_US", DungChung.NormalizationGuid(data[29].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinPhieuDKGTVL", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        SqlParameter[] paraTC = {
                            new SqlParameter("@NamTronKCN", DungChung.NormalizationBoolean(data[4].ToString())),
                            new SqlParameter("@LoaiHinhDNID", DungChung.NormalizationGuid(data[6].ToString())),
                            new SqlParameter("@TenKCN", DungChung.NormalizationString(data[8].ToString())),
                            new SqlParameter("@TenNguoiSuDungLaoDong", DungChung.NormalizationString(data[9].ToString())),
                            new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[11].ToString())),
                            new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[12].ToString())),
                            new SqlParameter("@XaID", DungChung.NormalizationGuid(data[13].ToString())),
                            new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[14].ToString())),
                            new SqlParameter("@SoNha", DungChung.NormalizationString(data[15].ToString())),
                            new SqlParameter("@DiaChiDoanhNghiep", DungChung.NormalizationString(data[16].ToString())),
                            new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[17].ToString())),
                            new SqlParameter("@Email", DungChung.NormalizationString(data[18].ToString())),
                            new SqlParameter("@NganhNgheKinhDoanhChinh", DungChung.NormalizationString(data[19].ToString())),
                            new SqlParameter("@SelectToChuc_US", DungChung.NormalizationGuid(data[29].ToString())),
                            new SqlParameter("@SoCCCD", DungChung.NormalizationString(data[10].ToString())),
                            new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                            new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                        };
                        DataSet duLieuTC = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateTinToChuc_ViecTimNguoi", paraTC);
                    }
                    catch (Exception ex)
                    {
                        return JSonHelper.ToJson(ex);
                    }
                }
                    if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "PhieuDKGTVL";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Result = duLieu.Tables[0];
                    ep.Msg = "Thêm mới dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "PhieuDKGTVL";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        ep.Result = duLieu.Tables[0];
                        ep.Msg = "Cập nhật dữ liệu thành công!";
                        return JSonHelper.ToJson(ep);
                    }
                    else
                    {
                        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public class DanhGiaModel
        {
            public string DanhGiaTVDVID { get; set; }
            public string STT { get; set; }
            public string DanhGia { get; set; }
            public string NhanXet { get; set; }
            public string ThamChieuID { get; set; }
            public string DichVuDKID { get; set; }
            public string NoiDung { get; set; }
            public string TenDanhGia { get; set; }
        }

        [HttpPost]
        public string LuuThongTinDanhGia(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                // Extract the JSON string from saveData[1]
                string jsonData = data[1].ToString();
                List<DanhGiaModel> danhGiaList = JsonConvert.DeserializeObject<List<DanhGiaModel>>(jsonData);

                // Loop through each item and save to the database
                foreach (var danhGia in danhGiaList)
                {
                    SqlParameter[] para = {
                        new SqlParameter("@Loai", data[0].ToString()),
                        new SqlParameter("@DanhGiaTVDVID", DungChung.NormalizationGuid(danhGia.DanhGiaTVDVID)),
                        new SqlParameter("@ThamChieuID", DungChung.NormalizationGuid(data[2].ToString())),
                        new SqlParameter("@STT", DungChung.NormalizationNumber(danhGia.STT)),
                        new SqlParameter("@DanhGia", DungChung.NormalizationNumber(danhGia.DanhGia)),
                        new SqlParameter("@NhanXet", DungChung.NormalizationString(danhGia.NhanXet)),
                        new SqlParameter("@DichVuDKID", DungChung.NormalizationGuid(danhGia.DichVuDKID)),
                        new SqlParameter("@NoiDung", DungChung.NormalizationString(danhGia.NoiDung)),
                    };

                    // Execute SQL procedure for each item
                    SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDanhGiaTVDV", para);
                }
                //DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinPhieuDKGTVL", para);
                //if (Loai == "them")
                //{
                //    duLieu.Tables[0].TableName = "DanhGiaTVDV";
                //    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                //    ep.Result = duLieu.Tables[0];
                //    ep.Msg = "Thêm mới dữ liệu thành công!";
                //    return JSonHelper.ToJson(ep);
                //}
                //else
                //{
                //    if (duLieu.Tables[0].Rows.Count > 0)
                //    {
                //        duLieu.Tables[0].TableName = "DanhGiaTVDV";
                //        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                //        ep.Result = duLieu.Tables[0];
                //        ep.Msg = "Cập nhật dữ liệu thành công!";
                //        return JSonHelper.ToJson(ep);
                //    }
                //    else
                //    {
                //        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                //    }
                //}
                ep.Msg = "Thêm mới dữ liệu thành công!";
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAllDanhGia(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                        new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDanhGiaByID_ViecLam", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSuaDanhGia(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDanhGiaByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaDuLieuDanhGia(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_DanhGiaTVDV", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "DanhGiaTVDV";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
                    return NTSThongBao.XoaThanhCong();
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.XOA, duLieu.Tables[0].Rows.Count);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTinDanhGia_TrenLuoi(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                // Loop through each item and save to the database
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", data[0].ToString()),
                    new SqlParameter("@DanhGiaTVDVID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ThamChieuID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@STT", DungChung.NormalizationNumber(data[3].ToString())),
                    new SqlParameter("@DanhGia", DungChung.NormalizationNumber(data[4].ToString())),
                    new SqlParameter("@NhanXet", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@DichVuDKID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@NoiDung", DungChung.NormalizationString(data[7].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDanhGiaTVDV", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "DanhGiaTVDV";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Result = duLieu.Tables[0];
                    ep.Msg = "Thêm mới dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "DanhGiaTVDV";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        ep.Result = duLieu.Tables[0];
                        ep.Msg = "Cập nhật dữ liệu thành công!";
                        return JSonHelper.ToJson(ep);
                    }
                    else
                    {
                        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTinViecTimNguoi(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChung.KiemTraTonTai(data[2].ToString(), "MaSo", "ViecTimNguoi"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[2].ToString(), "MaSo", "ViecTimNguoi", "ViecTimNguoiID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                     new SqlParameter("@Loai", Loai),
                     new SqlParameter("@MaSoDangKVL",       DungChung.NormalizationString(data[1].ToString())),
                     new SqlParameter("@NgayDangKyViecLam", DungChung.NormalizationDateTime(data[2].ToString())),
                     new SqlParameter("@TenCongViec",       DungChung.NormalizationString(data[3].ToString())),
                     new SqlParameter("@SoLuongTuyen",      DungChung.NormalizationString(data[4].ToString())),
                     new SqlParameter("@MoTaCongViec",      DungChung.NormalizationString(data[5].ToString())),
                     new SqlParameter("@ChucVuID",          DungChung.NormalizationGuid(data[6].ToString())),
                     new SqlParameter("@ChucVuKhac",        DungChung.NormalizationString(data[7].ToString())),
                     new SqlParameter("@MaNgheCap1",        DungChung.NormalizationGuid(data[8].ToString())),
                     new SqlParameter("@MaNgheCap2",        DungChung.NormalizationGuid(data[9].ToString())),
                     new SqlParameter("@MaNgheCap3",        DungChung.NormalizationGuid(data[10].ToString())),
                     new SqlParameter("@MaNgheCap4",        DungChung.NormalizationGuid(data[11].ToString())),
                     new SqlParameter("@TrinhDoHVID",       DungChung.NormalizationGuid(data[12].ToString())),
                     new SqlParameter("@TrinhDoCMKTID_Khac",DungChung.NormalizationGuid(data[13].ToString())),
                     new SqlParameter("@TrinhDoCMKTID",     DungChung.NormalizationGuid(data[14].ToString())),
                     new SqlParameter("@TrinhDoKyNangNgheID",   DungChung.NormalizationGuid(data[15].ToString())),
                     new SqlParameter("@ChuyenNganhDTID",   DungChung.NormalizationGuid(data[16].ToString())),
                     new SqlParameter("@BacID",             DungChung.NormalizationGuid(data[17].ToString())),
                     new SqlParameter("@TrinhDoNgoaiNguID1",DungChung.NormalizationGuid(data[18].ToString())),
                     new SqlParameter("@ChungChiNgoaiNgu1", DungChung.NormalizationString(data[19].ToString())),
                     new SqlParameter("@DanhGiaNgoaiNgu1",  DungChung.NormalizationNumber(data[20].ToString())),
                     new SqlParameter("@TinHocVP",          DungChung.NormalizationGuid(data[21].ToString())),
                     new SqlParameter("@DanhGiaTinHoc1",    DungChung.NormalizationNumber(data[22].ToString())),
                     new SqlParameter("@TrinhDoNgoaiNguID2",DungChung.NormalizationGuid(data[23].ToString())),
                     new SqlParameter("@ChungChiNgoaiNgu2", DungChung.NormalizationString(data[24].ToString())),
                     new SqlParameter("@DanhGiaNgoaiNgu2",  DungChung.NormalizationNumber(data[25].ToString())),
                     new SqlParameter("@TinHocKhac",        DungChung.NormalizationGuid(data[26].ToString())),
                     new SqlParameter("@DanhGiaTinHoc2",    DungChung.NormalizationNumber(data[27].ToString())),
                     new SqlParameter("@KyNangMemID",       DungChung.NormalizationString(data[28].ToString())),
                     new SqlParameter("@YeuCauKinhNghiemID",DungChung.NormalizationGuid(data[29].ToString())),
                     new SqlParameter("@TinhID_NoiLamViecDuKien", DungChung.NormalizationGuid(data[30].ToString())),
                     new SqlParameter("@HuyenID_NoiLamViecDuKien", DungChung.NormalizationString(data[31].ToString())),
                     new SqlParameter("@TenKCN_NoiLamViecDuKien",   DungChung.NormalizationString(data[32].ToString())),
                     new SqlParameter("@LoaiHopDongID",             DungChung.NormalizationGuid(data[33].ToString())),
                     new SqlParameter("@YeuCauLamThemID",           DungChung.NormalizationGuid(data[34].ToString())),
                     new SqlParameter("@HinhThucLamViecID",         DungChung.NormalizationGuid(data[35].ToString())),
                     new SqlParameter("@MucDichLamViecID",          DungChung.NormalizationGuid(data[36].ToString())),
                     new SqlParameter("@MucLuongID",                DungChung.NormalizationGuid(data[37].ToString())),
                     new SqlParameter("@LuongTheoNgay",             DungChung.NormalizationNumber(data[38].ToString())),
                     new SqlParameter("@LuongTheoGio",              DungChung.NormalizationNumber(data[39].ToString())),
                     new SqlParameter("@CheDoPhucLoiID",            DungChung.NormalizationString(data[40].ToString())),
                     new SqlParameter("@CheDoPhucLoiKhac",          DungChung.NormalizationString(data[41].ToString())),
                     new SqlParameter("@NoiLamViecID",              DungChung.NormalizationString(data[42].ToString())),
                     new SqlParameter("@TrongLuongNangID",          DungChung.NormalizationString(data[43].ToString())),
                     new SqlParameter("@DiDungID",                  DungChung.NormalizationString(data[44].ToString())),
                     new SqlParameter("@NgheNoiID",                 DungChung.NormalizationString(data[45].ToString())),
                     new SqlParameter("@ThiLucID",                  DungChung.NormalizationString(data[46].ToString())),
                     new SqlParameter("@ThaoTacTayID",              DungChung.NormalizationString(data[47].ToString())),
                     new SqlParameter("@Dung2TayID",                DungChung.NormalizationString(data[48].ToString())),
                     new SqlParameter("@DoiTuongUuTienID",          DungChung.NormalizationString(data[49].ToString())),
                     new SqlParameter("@DoiTuongUuTienKhac",        DungChung.NormalizationString(data[50].ToString())),
                     new SqlParameter("@HinhThucTuyenDungID",       DungChung.NormalizationString(data[51].ToString())),
                     new SqlParameter("@NgayHetHan",                DungChung.NormalizationDateTime(data[52].ToString())),
                     new SqlParameter("@MongMuonDN",                DungChung.NormalizationString(data[53].ToString())),
                     new SqlParameter("@HoVaTen_NguoiTuyenDung",    DungChung.NormalizationString(data[54].ToString())),
                     new SqlParameter("@ChucVu_NguoiTuyenDung",     DungChung.NormalizationString(data[55].ToString())),
                     new SqlParameter("@SoDienThoai_NguoiTuyenDung", DungChung.NormalizationString(data[56].ToString())),
                     new SqlParameter("@Email_NguoiTuyenDung",      DungChung.NormalizationString(data[57].ToString())),
                     new SqlParameter("@NhanThongBaoSMS",           DungChung.NormalizationBoolean(data[58].ToString())),
                     new SqlParameter("@NhanThongBaoEmail",         DungChung.NormalizationBoolean(data[59].ToString())),
                     new SqlParameter("@HinhThucLienHeKhac_NguoiTuyenDung", DungChung.NormalizationString(data[60].ToString())),
                     new SqlParameter("@txtDinhKem",                DungChung.NormalizationString(data[61].ToString())),
                     new SqlParameter("@PhieuDKGTVLID",                DungChung.NormalizationGuid(data[62].ToString())),
                     new SqlParameter("@ViecTimNguoiID",                DungChung.NormalizationGuid(data[63].ToString())),
                     new SqlParameter("@MaViecTimNguoi",                DungChung.NormalizationString(data[64].ToString())),
                     new SqlParameter("@TenDinhDanh",                DungChung.NormalizationString(data[65].ToString())),
                     new SqlParameter("@DonViID",                   DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                     new SqlParameter("@UserID",                    DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinViecTimNguoi", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "PhieuDKGTVL";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Result = duLieu.Tables[0];
                    ep.Msg = "Thêm mới dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "PhieuDKGTVL";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        ep.Result = duLieu.Tables[0];
                        ep.Msg = "Cập nhật dữ liệu thành công!";
                        return JSonHelper.ToJson(ep);
                    }
                    else
                    {
                        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaDuLieu(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID",DungChung.NormalizationGuid(id)),
                };

                //lấy đường dẫn đính kèm trong Tài liệu
                string pathAnhDaiDien1 = DungChung.LayDuongDanDinhKem("PhieuDKGTVL", "DinhKem", "PhieuDKGTVLID", id);
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_PhieuDKGTVL", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    // xóa các đính kèm trong folder khi xóa dữ liệu chính
                    //DungChung.XoaDinhKemTrongFolder(pathAnhDaiDien1);
                    if (pathAnhDaiDien1.Trim() != "")
                    {
                        string[] arrDuongDan = pathAnhDaiDien1.Split('*');
                        foreach (string item in arrDuongDan)
                        {
                            if (System.IO.File.Exists(Server.MapPath(item)))
                            {
                                System.IO.File.Delete(Server.MapPath(item));
                            }
                        }
                    }
                    duLieu.Tables[0].TableName = "PhieuDKGTVL";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
                    return NTSThongBao.XoaThanhCong();
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.XOA, duLieu.Tables[0].Rows.Count);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string DangKyDichVuCT(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetDangKyDVCTPhieuDKGTVL", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson("Tải dữ liệu thất bại");
            }
        }
        [HttpPost]
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetPhieuDKGTVLByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XuatExcel_PhieuViecLam(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachPhieuDangKyGioiThieuViecLam" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/NghiepVu/DanhSachPhieuDangKyGioiThieuViecLam.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachPhieuDangKyGioiThieuViecLam/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachPhieuDangKyGioiThieuViecLam/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5])),
                    new SqlParameter("@DenNgay", DungChung.NormalizationDateTime(data[6])),
                    new SqlParameter("@TenToChuc_TimKiem_US", DungChung.NormalizationString(data[7])),
                    new SqlParameter("@MaSoThue_TimKiem_US", DungChung.NormalizationString(data[8])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllPhieuDKGTVL_Excel", para).Tables[0];

                if (!System.IO.Directory.Exists(Server.MapPath(url)))
                {
                    System.IO.Directory.CreateDirectory(Server.MapPath(url));
                }
                DirectoryInfo di = new DirectoryInfo(Server.MapPath(url));
                FileInfo[] rgFiles = di.GetFiles();
                try
                {
                    foreach (FileInfo fi in rgFiles)
                    {
                        fi.Delete();
                    }
                }
                catch (Exception ex)
                {
                    return NTSThongBao.CoLoiXayRa(ex);
                }

                System.IO.File.Copy(fileMau, fileKQ, true);
                var wb = new XLWorkbook(fileKQ);
                var ws = wb.Worksheet(1);
                int vDongXuat = 7;
                ws.Cell("A1").Value = sqlFun.GetOneStringField("SELECT TenDonVi FROM DonVi WHERE DonViID=N'" + NTSSession.GetDonVi().DonViID_Cha + "'").ToUpper();
                ws.Cell("A2").Value = sqlFun.GetOneStringField("SELECT TenDonVi FROM DonVi WHERE DonViID=N'" + NTSSession.GetDonVi().DonViID + "'").ToUpper();
                if (duLieu.Rows.Count > 0)
                {
                    int stt = 0;
                    foreach (DataRow dr in duLieu.Rows)
                    {
                        stt += 1;
                        ws.Range("A" + vDongXuat + ":K" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["MaSo"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["NgayThuThap"].ToString();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["TenToChuc"].ToString().ToUpper();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["MaSoThue"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["TenLoaiHinhDN"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["DiaChiCuThe"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["ThoiHanTuyenDung"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenDKDVTuVan"].ToString();
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":K" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/NghiepVu/DanhSachPhieuDangKyGioiThieuViecLam/" + fileName;
                sqlFun.XlsxToPDF(KetQua);
                sqlFun.XlsxToHtml(KetQua);

                return JSonHelper.ToJson(KetQua);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        public static void AddImageToCell(TableCell cell, string relationshipId)
        {
            var element =
              new Drawing(
                new DW.Inline(
                  new DW.Extent() { Cx = 990000L, Cy = 792000L },
                  new DW.EffectExtent()
                  {
                      LeftEdge = 0L,
                      TopEdge = 0L,
                      RightEdge = 0L,
                      BottomEdge = 0L
                  },
                  new DW.DocProperties()
                  {
                      Id = (UInt32Value)1U,
                      Name = "Picture 1"
                  },
                  new DW.NonVisualGraphicFrameDrawingProperties(
                      new A.GraphicFrameLocks() { NoChangeAspect = true }),
                  new A.Graphic(
                    new A.GraphicData(
                      new PIC.Picture(
                        new PIC.NonVisualPictureProperties(
                          new PIC.NonVisualDrawingProperties()
                          {
                              Id = (UInt32Value)0U,
                              Name = "New Bitmap Image.jpg"
                          },
                          new PIC.NonVisualPictureDrawingProperties()),
                        new PIC.BlipFill(
                          new A.Blip(
                            new A.BlipExtensionList(
                              new A.BlipExtension()
                              {
                                  Uri = "{28A0092B-C50C-407E-A947-70E740481C1C}"
                              })
                           )
                          {
                              Embed = relationshipId,
                              CompressionState =
                              A.BlipCompressionValues.Print
                          },
                    new A.Stretch(
                            new A.FillRectangle())),
                          new PIC.ShapeProperties(
                            new A.Transform2D(
                              new A.Offset() { X = 0L, Y = 0L },
                              new A.Extents() { Cx = 990000L, Cy = 792000L }),
                            new A.PresetGeometry(
                              new A.AdjustValueList()
                            )
                            { Preset = A.ShapeTypeValues.Rectangle }))
                    )
                    { Uri = "http://schemas.openxmlformats.org/drawingml/2006/picture" })
                )
                {
                    DistanceFromTop = (UInt32Value)0U,
                    DistanceFromBottom = (UInt32Value)0U,
                    DistanceFromLeft = (UInt32Value)0U,
                    DistanceFromRight = (UInt32Value)0U
                });

            cell.Append(new Paragraph(new Run(element)));
        }
        [HttpPost]
        public string XuatMau03PLI(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mau03PLI" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/ND232021/Mau03PLI.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable tabDuLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_XuatMau03PLI", para).Tables[0];
                if (!System.IO.Directory.Exists(Server.MapPath(url)))
                {
                    System.IO.Directory.CreateDirectory(Server.MapPath(url));
                }
                DirectoryInfo di = new DirectoryInfo(Server.MapPath(url));
                FileInfo[] rgFiles = di.GetFiles();
                try
                {
                    foreach (FileInfo fi in rgFiles)
                    {
                        fi.Delete();
                    }
                }
                catch (Exception ex)
                {
                    return NTSThongBao.CoLoiXayRa(ex);
                }
                System.IO.File.Copy(fileMau, fileKQ, true);
                using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(Server.MapPath(url + fileName), true))
                {
                    MainDocumentPart mainPart = wordDoc.MainDocumentPart;
                    Body body = wordDoc.MainDocumentPart.Document.Body;
                    if (tabDuLieu.Rows.Count > 0)
                    {
                        foreach (var text in body.Descendants<Text>())
                        {
                            if (text.Text.Contains("[DangKyDichVuKhac]"))
                            {
                                text.Text = text.Text.Replace("[DangKyDichVuKhac]", tabDuLieu.Rows[0]["DKDV_Khac"].ToString());
                            }
                            string DiaDanh = sqlFun.GetOneStringField("SELECT TenDiaBan FROM DiaBanHC WHERE DiaBanHCID=N'" + NTSSession.GetDonVi().DiaBanHCID_Tinh + "'");
                            if (text.Text.Contains("DiaDanhInHoa"))
                            {
                                text.Text = text.Text.Replace("DiaDanhInHoa", DiaDanh.ToUpper());
                            }
                            if (text.Text.Contains("[NganhKD_NLTH]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_NLTH]", tabDuLieu.Rows[0]["KDNongLamThuySan"].ToString());
                            }
                            if (text.Text.Contains("[DN_BatBuocMSoThue]"))
                            {
                                text.Text = text.Text.Replace("[DN_BatBuocMSoThue]", tabDuLieu.Rows[0]["DN_BatBuocMaSoThue"].ToString());
                            }
                            if (text.Text.Contains("[LHNgoaiNhaNuoc]"))
                            {
                                text.Text = text.Text.Replace("[LHNgoaiNhaNuoc]", tabDuLieu.Rows[0]["LoaiHinhNgoaiNhaNuoc"].ToString());
                            }
                            if (text.Text.Contains("MaSo"))
                            {
                                text.Text = text.Text.Replace("MaSo", tabDuLieu.Rows[0]["MaSo"].ToString());
                            }
                            if (text.Text.Contains("TenNguoiDaiDien"))
                            {
                                text.Text = text.Text.Replace("TenNguoiDaiDien", tabDuLieu.Rows[0]["TenNguoiDaiDien"].ToString());
                            }
                            if (text.Text.Contains("[ChuTheLaCaNhan]"))
                            {
                                text.Text = text.Text.Replace("[ChuTheLaCaNhan]", tabDuLieu.Rows[0]["ChuTheLaCaNhan"].ToString());
                            }


                            if (text.Text.Contains("MSThue"))
                            {
                                text.Text = text.Text.Replace("MSThue", tabDuLieu.Rows[0]["MaSoThue"].ToString());
                            }

                            if (text.Text.Contains("[LHDN_NhaNuoc]"))
                            {
                                text.Text = text.Text.Replace("[LHDN_NhaNuoc]", tabDuLieu.Rows[0]["LHDN_NhaNuoc"].ToString());
                            }

                            if (text.Text.Contains("[LHDN_CoVonDauTuNuocNgoai]"))
                            {
                                text.Text = text.Text.Replace("[LHDN_CoVonDauTuNuocNgoai]", tabDuLieu.Rows[0]["LHDN_CoVonNuocNgoai"].ToString());
                            }
                            if (text.Text.Contains("XaID"))
                            {
                                text.Text = text.Text.Replace("XaID", tabDuLieu.Rows[0]["XaID"].ToString());
                            }
                            if (text.Text.Contains("HuyenID"))
                            {
                                text.Text = text.Text.Replace("HuyenID", tabDuLieu.Rows[0]["HuyenID"].ToString());
                            }
                            if (text.Text.Contains("TinhID"))
                            {
                                text.Text = text.Text.Replace("TinhID", tabDuLieu.Rows[0]["TinhID"].ToString());
                            }
                            if (text.Text.Contains("DiaChiCuThe"))
                            {
                                text.Text = text.Text.Replace("DiaChiCuThe", tabDuLieu.Rows[0]["DiaChiCuThe"].ToString());
                            }
                            if (text.Text.Contains("[NamKCH]"))
                            {
                                text.Text = text.Text.Replace("[NamKCH]", tabDuLieu.Rows[0]["NamKCN"].ToString());
                            }
                            if (text.Text.Contains("TenKCN"))
                            {
                                text.Text = text.Text.Replace("TenKCN", tabDuLieu.Rows[0]["TenKCN"].ToString());
                            }
                            if (text.Text.Contains("DienThoai"))
                            {
                                text.Text = text.Text.Replace("DienThoai", tabDuLieu.Rows[0]["DienThoai"].ToString());
                            }
                            if (text.Text.Contains("TenEmail"))
                            {
                                text.Text = text.Text.Replace("TenEmail", tabDuLieu.Rows[0]["TenEmail"].ToString());
                            }


                            if (text.Text.Contains("[NganhKD_CNCB]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_CNCB]", tabDuLieu.Rows[0]["NganhKD_CNCB"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_SXPhanPhoi]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_SXPhanPhoi]", tabDuLieu.Rows[0]["NganhKD_SXPhanPhoi"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_VanTai]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_VanTai]", tabDuLieu.Rows[0]["NganhKD_VanTai"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_ThongTinTruyenThong]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_ThongTinTruyenThong]", tabDuLieu.Rows[0]["NganhKD_ThongTinTruyenThon"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDBDS]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDBDS]", tabDuLieu.Rows[0]["NganhKD_HDKDBatDongSan"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDHC]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDHC]", tabDuLieu.Rows[0]["NganhKD_HDHanhChinh"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_Yte]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_Yte]", tabDuLieu.Rows[0]["NganhKD_YTe"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_BuonBan]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_BuonBan]", tabDuLieu.Rows[0]["NganhKD_BuonBan"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDLamThue]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDLamThue]", tabDuLieu.Rows[0]["NganhKD_HDLamThue"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_KhaiKhoang]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_KhaiKhoang]", tabDuLieu.Rows[0]["NganhKD_KhaiKhoang"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_XD]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_XD]", tabDuLieu.Rows[0]["NganhKD_XayDung"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_CungCapNuoc]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_CungCapNuoc]", tabDuLieu.Rows[0]["NganhKD_CungCapNuoc"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_DVLuuTru]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_DVLuuTru]", tabDuLieu.Rows[0]["NganhKD_DVLuuTru"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDTaiChinh]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDTaiChinh]", tabDuLieu.Rows[0]["NganhKD_HDTaiChinh"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDChuyenMon]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDChuyenMon]", tabDuLieu.Rows[0]["NganhKD_HDChuyenMon"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_GDDT]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_GDDT]", tabDuLieu.Rows[0]["NganhKD_GDDT"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_NgheThuat]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_NgheThuat]", tabDuLieu.Rows[0]["NganhKD_NgheThuat"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDDCS]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDDCS]", tabDuLieu.Rows[0]["NganhKD_HDCuaDCS"].ToString());
                            }
                            if (text.Text.Contains("[NganhKDHDDVKhac]"))
                            {
                                text.Text = text.Text.Replace("[NganhKDHDDVKhac]", tabDuLieu.Rows[0]["NganhKD_HDDVKhac"].ToString());
                            }
                            if (text.Text.Contains("[NganhKD_HDCuaTC]"))
                            {
                                text.Text = text.Text.Replace("[NganhKD_HDCuaTC]", tabDuLieu.Rows[0]["NganhKD_HDCuaToCHuc"].ToString());
                            }
                            if (text.Text.Contains("MatHangSPChinh"))
                            {
                                text.Text = text.Text.Replace("MatHangSPChinh", tabDuLieu.Rows[0]["MatHangSPChinh"].ToString());
                            }

                            if (text.Text.Contains("[QuyMoDuoi10]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoDuoi10]", tabDuLieu.Rows[0]["QuyMo_Duoi10"].ToString());
                            }
                            if (text.Text.Contains("[QuyMoTu10Den50]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoTu10Den50]", tabDuLieu.Rows[0]["QuyMo_Tu10Den50"].ToString());
                            }
                            if (text.Text.Contains("[QuyMoTu51Den100]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoTu51Den100]", tabDuLieu.Rows[0]["QuyMo_Tu51Den100"].ToString());
                            }
                            if (text.Text.Contains("[QuyMoTu101Den200]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoTu101Den200]", tabDuLieu.Rows[0]["QuyMo_Tu101Den200"].ToString());
                            }
                            if (text.Text.Contains("[QuyMoTu200Den500]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoTu200Den500]", tabDuLieu.Rows[0]["QuyMo_Tu201Den500"].ToString());
                            }
                            if (text.Text.Contains("[QuyMoTu500Den1000]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoTu500Den1000]", tabDuLieu.Rows[0]["QuyMo_Tu500Den1000"].ToString());
                            }
                            if (text.Text.Contains("[QuyMo1000Den3000]"))
                            {
                                text.Text = text.Text.Replace("[QuyMo1000Den3000]", tabDuLieu.Rows[0]["QuyMo_Tu1000Den3000"].ToString());
                            }
                            if (text.Text.Contains("[QuyMo3000Den10000]"))
                            {
                                text.Text = text.Text.Replace("[QuyMo3000Den10000]", tabDuLieu.Rows[0]["QuyMo_Tu3000Den10000"].ToString());
                            }
                            if (text.Text.Contains("[QuyMoTren10000]"))
                            {
                                text.Text = text.Text.Replace("[QuyMoTren10000]", tabDuLieu.Rows[0]["QuyMo_Tren100000"].ToString());
                            }
                            if (text.Text.Contains("SoLDTuyenDung"))
                            {
                                text.Text = text.Text.Replace("SoLDTuyenDung", tabDuLieu.Rows[0]["SoLDTuyenDung"].ToString());
                            }

                            if (text.Text.Contains("[DKTVChinhSach]"))
                            {
                                text.Text = text.Text.Replace("[DKTVChinhSach]", tabDuLieu.Rows[0]["DKDV_TuVanChinhSach"].ToString());
                            }
                            if (text.Text.Contains("[DKTVTuyenLD]"))
                            {
                                text.Text = text.Text.Replace("[DKTVTuyenLD]", tabDuLieu.Rows[0]["DKDV_TuVanTuyenLD"].ToString());
                            }
                            if (text.Text.Contains("[DKTVSDLD]"))
                            {
                                text.Text = text.Text.Replace("[DKTVSDLD]", tabDuLieu.Rows[0]["DKDV_TuVanSDLD"].ToString());
                            }
                            if (text.Text.Contains("[DKGioiThieu]"))
                            {
                                text.Text = text.Text.Replace("[DKGioiThieu]", tabDuLieu.Rows[0]["DKDV_DKGioiThieu"].ToString());
                            }
                          
                            if (text.Text.Contains("TenDKDVKhac"))
                            {
                                text.Text = text.Text.Replace("TenDKDVKhac", tabDuLieu.Rows[0]["TenDKDVKhac"].ToString());
                            }
                            //
                            if (text.Text.Contains("TenNguoiLH"))
                            {
                                text.Text = text.Text.Replace("TenNguoiLH", tabDuLieu.Rows[0]["TenNguoiLH"].ToString());
                            }
                            if (text.Text.Contains("SDTNguoiLH"))
                            {
                                text.Text = text.Text.Replace("SDTNguoiLH", tabDuLieu.Rows[0]["SoDienThoaiLH"].ToString());
                            }

                            if (text.Text.Contains("DiaChiLH"))
                            {
                                text.Text = text.Text.Replace("DiaChiLH", tabDuLieu.Rows[0]["DiaChiLH"].ToString());
                            }
                            if (text.Text.Contains("ChucVuNguoiTuyenDung"))
                            {
                                text.Text = text.Text.Replace("ChucVuNguoiTuyenDung", tabDuLieu.Rows[0]["ChucVuNguoiTuyenDung"].ToString());
                            }
                            if (text.Text.Contains("HinhThucLienHeKhac"))
                            {
                                text.Text = text.Text.Replace("HinhThucLienHeKhac", tabDuLieu.Rows[0]["HinhThucLienHeKhac"].ToString());
                            }
                            if (text.Text.Contains("NgayLap_Ngay"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Ngay", tabDuLieu.Rows[0]["NgayLap_Ngay"].ToString());
                            }
                            if (text.Text.Contains("NgayLap_Thang"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Thang", tabDuLieu.Rows[0]["NgayLap_Thang"].ToString());
                            }
                            if (text.Text.Contains("NgayLap_Nam"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Nam", tabDuLieu.Rows[0]["NgayLap_Nam"].ToString());
                            }
                            if (text.Text.Contains("HanNop_Ngay"))
                            {
                                text.Text = text.Text.Replace("HanNop_Ngay", tabDuLieu.Rows[0]["HanNop_Ngay"].ToString());
                            }
                            if (text.Text.Contains("HanNop_Thang"))
                            {
                                text.Text = text.Text.Replace("HanNop_Thang", tabDuLieu.Rows[0]["HanNop_Thang"].ToString());
                            }
                            if (text.Text.Contains("HanNop_Nam"))
                            {
                                text.Text = text.Text.Replace("HanNop_Nam", tabDuLieu.Rows[0]["HanNop_Nam"].ToString());
                            }
                            if (text.Text.Contains("TenNguoiSDLD"))
                            {
                                text.Text = text.Text.Replace("TenNguoiSDLD", tabDuLieu.Rows[0]["TenNguoiSDLD"].ToString());
                            }

                            if (text.Text.Contains("DiaDanh"))
                            {
                                text.Text = text.Text.Replace("DiaDanh", DiaDanh);
                            }
                        }
                    }
                    var tables = mainPart.Document.Descendants<DocumentFormat.OpenXml.Wordprocessing.Table>().ToList();

                    //Xử lý bảng đánh giá chất lượng
                    try
                    {
                        Guid PhieuDKGTVLID = DungChung.NormalizationGuid(id);
                        SqlParameter[] para2 = {
                            new SqlParameter("@PhieuDKGTVLID", PhieuDKGTVLID),
                        };
                        DataSet dsData2 = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDanhGiaChatLuongSDDVTV", para2);
                        DataTable tabTuyenDung = dsData2.Tables[0];
                        //tables[1].RemoveAllChildren(); // Xoá phần bảng tạm ứng

                        if (tabTuyenDung.Rows.Count > 0)
                        {
                            for (int i = 0; i < tabTuyenDung.Rows.Count; i++)
                            {
                                var tr1 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                                var td1 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td2 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td3 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td4 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td5 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();

                                td1.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                           new DocumentFormat.OpenXml.Wordprocessing.Text(tabTuyenDung.Rows[i]["STT"].ToString())

                                            )
                                    )
                                    );
                                td2.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text(tabTuyenDung.Rows[i]["NoiDung"].ToString())
                                        )
                                    )
                                );
                                td3.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text((tabTuyenDung.Rows[i]["DanhGia"].ToString() == "Đạt" ? "X" : ""))
                                        )
                                    )
                                );
                                td4.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text((tabTuyenDung.Rows[i]["DanhGia"].ToString() == "Không đạt" ? "X" : ""))
                                        )
                                    )
                                );
                                td5.Append(new TableCellProperties(
                                   new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                   new Paragraph(
                                       new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                       new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                       new DocumentFormat.OpenXml.Wordprocessing.Run(
                                           new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                           new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text(tabTuyenDung.Rows[i]["NhanXet"].ToString())
                                       )
                                   )
                               );
                                tr1.Append(td1, td2, td3, td4, td5);
                                tables[3].Append(tr1);
                            }
                        }
                    }
                    catch (Exception er)
                    {

                    }
                    wordDoc.MainDocumentPart.Document.Save();
                    wordDoc.Close();
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/ND232021/" + fileName;
                if (OfficeConvert.DocxToPDF(KetQua))
                {
                    KetQua.Replace("docx", "pdf");
                }
                return JSonHelper.ToJson(KetQua);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XuatMau03aPLI(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mau03aPLI" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/ND232021/Mau03aPLI.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable tabDuLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_XuatMau03aPLI", para).Tables[0];
                if (!System.IO.Directory.Exists(Server.MapPath(url)))
                {
                    System.IO.Directory.CreateDirectory(Server.MapPath(url));
                }
                DirectoryInfo di = new DirectoryInfo(Server.MapPath(url));
                FileInfo[] rgFiles = di.GetFiles();
                try
                {
                    foreach (FileInfo fi in rgFiles)
                    {
                        fi.Delete();
                    }
                }
                catch (Exception ex)
                {
                    return NTSThongBao.CoLoiXayRa(ex);
                }
                System.IO.File.Copy(fileMau, fileKQ, true);
                using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(Server.MapPath(url + fileName), true))
                {
                    MainDocumentPart mainPart = wordDoc.MainDocumentPart;
                    Body body = wordDoc.MainDocumentPart.Document.Body;
                    if (tabDuLieu.Rows.Count > 0)
                    {
                        foreach (var text in body.Descendants<Text>())
                        {
                            string DiaDanh = sqlFun.GetOneStringField("SELECT TenDiaBan FROM DiaBanHC WHERE DiaBanHCID=N'" + NTSSession.GetDonVi().DiaBanHCID_Tinh + "'");

                            if (text.Text.Contains("DiaDanhInHoa"))
                            {
                                text.Text = text.Text.Replace("DiaDanhInHoa", DiaDanh.ToUpper());
                            }
                            if (text.Text.Contains("MaSo"))
                            {
                                text.Text = text.Text.Replace("MaSo", tabDuLieu.Rows[0]["MaSo"].ToString());
                            }
                            if (text.Text.Contains("TenCongViec"))
                            {
                                text.Text = text.Text.Replace("TenCongViec", tabDuLieu.Rows[0]["TenCongViec"].ToString());
                            }
                            if (text.Text.Contains("SoLuongCanTuyen"))
                            {
                                text.Text = text.Text.Replace("SoLuongCanTuyen", tabDuLieu.Rows[0]["SoLuongCanTuyen"].ToString());
                            }
                            if (text.Text.Contains("GioiTinh"))
                            {
                                text.Text = text.Text.Replace("GioiTinh", tabDuLieu.Rows[0]["GioiTinh"].ToString());
                            }
                            if (text.Text.Contains("MoTa"))
                            {
                                text.Text = text.Text.Replace("MoTa", tabDuLieu.Rows[0]["MoTa"].ToString());
                            }
                            if (text.Text.Contains("DoTuoi"))
                            {
                                text.Text = text.Text.Replace("DoTuoi", tabDuLieu.Rows[0]["DoTuoi"].ToString());
                            }
                            if (text.Text.Contains("MaNgheCap1"))
                            {
                                text.Text = text.Text.Replace("MaNgheCap1", tabDuLieu.Rows[0]["MaNgheCap1"].ToString());
                            }
                            if (text.Text.Contains("MaNgheCap2"))
                            {
                                text.Text = text.Text.Replace("MaNgheCap2", tabDuLieu.Rows[0]["MaNgheCap2"].ToString());
                            }
                            if (text.Text.Contains("MaNgheCap3"))
                            {
                                text.Text = text.Text.Replace("MaNgheCap3", tabDuLieu.Rows[0]["MaNgheCap3"].ToString());
                            }
                            if (text.Text.Contains("MaNgheCap4"))
                            {
                                text.Text = text.Text.Replace("MaNgheCap4", tabDuLieu.Rows[0]["MaNgheCap4"].ToString());
                            }
                            if (text.Text.Contains("[ChucVu_NhanVien]"))
                            {
                                text.Text = text.Text.Replace("[ChucVu_NhanVien]", tabDuLieu.Rows[0]["ChucVu_NhanVien"].ToString());
                            }

                            if (text.Text.Contains("[ChucVu_QuanLy]"))
                            {
                                text.Text = text.Text.Replace("[ChucVu_QuanLy]", tabDuLieu.Rows[0]["ChucVu_QuanLy"].ToString());
                            }
                            if (text.Text.Contains("[ChucVu_LanhDao]"))
                            {
                                text.Text = text.Text.Replace("[ChucVu_LanhDao]", tabDuLieu.Rows[0]["ChucVu_LanhDao"].ToString());
                            }
                            if (text.Text.Contains("TenChucVuKhac"))
                            {
                                text.Text = text.Text.Replace("TenChucVuKhac", tabDuLieu.Rows[0]["TenChucVuKhac"].ToString());
                            }
                            if (text.Text.Contains("[ChucVuKhac]"))
                            {
                                text.Text = text.Text.Replace("[ChucVuKhac]", tabDuLieu.Rows[0]["ChucVuKhac"].ToString());
                            }

                            if (text.Text.Contains("[ChuaTotNghiepTH]"))
                            {
                                text.Text = text.Text.Replace("[ChuaTotNghiepTH]", tabDuLieu.Rows[0]["ChuaTotNghiepTH"].ToString());
                            }

                            if (text.Text.Contains("[TotNghiepTieuHoc]"))
                            {
                                text.Text = text.Text.Replace("[TotNghiepTieuHoc]", tabDuLieu.Rows[0]["TotNghiepTieuHoc"].ToString());
                            }

                            if (text.Text.Contains("[TotNghiepTHCS]"))
                            {
                                text.Text = text.Text.Replace("[TotNghiepTHCS]", tabDuLieu.Rows[0]["TotNghiepTHCS"].ToString());
                            }
                            if (text.Text.Contains("[TotNghiepTHPT]"))
                            {
                                text.Text = text.Text.Replace("[TotNghiepTHPT]", tabDuLieu.Rows[0]["TotNghiepTHPT"].ToString());
                            }

                            if (text.Text.Contains("[ChuaQuaDaoTao]"))
                            {
                                text.Text = text.Text.Replace("[ChuaQuaDaoTao]", tabDuLieu.Rows[0]["ChuaQuaDaoTao"].ToString());
                            }
                            if (text.Text.Contains("[CNKTKhongBang]"))
                            {
                                text.Text = text.Text.Replace("[CNKTKhongBang]", tabDuLieu.Rows[0]["CNKTKhongBang"].ToString());
                            }

                            if (text.Text.Contains("[SoCap]"))
                            {
                                text.Text = text.Text.Replace("[SoCap]", tabDuLieu.Rows[0]["SoCap"].ToString());
                            }
                            if (text.Text.Contains("[TrungCap]"))
                            {
                                text.Text = text.Text.Replace("[TrungCap]", tabDuLieu.Rows[0]["TrungCap"].ToString());
                            }
                            if (text.Text.Contains("[CaoDang]"))
                            {
                                text.Text = text.Text.Replace("[CaoDang]", tabDuLieu.Rows[0]["CaoDang"].ToString());
                            }
                            if (text.Text.Contains("[DaiHoc]"))
                            {
                                text.Text = text.Text.Replace("[DaiHoc]", tabDuLieu.Rows[0]["DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("[ThacSi]"))
                            {
                                text.Text = text.Text.Replace("[ThacSi]", tabDuLieu.Rows[0]["ThacSi"].ToString());
                            }
                            if (text.Text.Contains("[TienSi]"))
                            {
                                text.Text = text.Text.Replace("[TienSi]", tabDuLieu.Rows[0]["TienSi"].ToString());
                            }
                            if (text.Text.Contains("ChuyenNganhDaoTao"))
                            {
                                text.Text = text.Text.Replace("ChuyenNganhDaoTao", tabDuLieu.Rows[0]["ChuyenNganhDaoTao"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKhac1ID"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKhac1ID", tabDuLieu.Rows[0]["TrinhDoKhac1ID"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKhac2ID"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKhac2ID", tabDuLieu.Rows[0]["TrinhDoKhac2ID"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKNN"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKNN", tabDuLieu.Rows[0]["TrinhDoKNN"].ToString());
                            }
                            if (text.Text.Contains("Bac"))
                            {
                                text.Text = text.Text.Replace("Bac", tabDuLieu.Rows[0]["Bac"].ToString());
                            }

                            if (text.Text.Contains("ChungChiNgoaiNgu1"))
                            {
                                text.Text = text.Text.Replace("ChungChiNgoaiNgu1", tabDuLieu.Rows[0]["ChungChiNgoaiNgu1"].ToString());
                            }
                            if (text.Text.Contains("NgoaiNgu1"))
                            {
                                text.Text = text.Text.Replace("NgoaiNgu1", tabDuLieu.Rows[0]["NgoaiNgu1"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangTot1]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangTot1]", tabDuLieu.Rows[0]["KhaNangTot1"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangKha1]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangKha1]", tabDuLieu.Rows[0]["KhaNangKha1"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangTrungBinh1]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangTrungBinh1]", tabDuLieu.Rows[0]["KhaNangTrungBinh1"].ToString());
                            }

                            if (text.Text.Contains("ChungChiNgoaiNgu2"))
                            {
                                text.Text = text.Text.Replace("ChungChiNgoaiNgu2", tabDuLieu.Rows[0]["ChungChiNgoaiNgu2"].ToString());
                            }
                            if (text.Text.Contains("NgoaiNgu2"))
                            {
                                text.Text = text.Text.Replace("NgoaiNgu2", tabDuLieu.Rows[0]["NgoaiNgu2"].ToString());
                            }

                            if (text.Text.Contains("[KhaNangTot2]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangTot2]", tabDuLieu.Rows[0]["KhaNangTot2"].ToString());
                            }


                            if (text.Text.Contains("[KhaNangKha2]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangKha2]", tabDuLieu.Rows[0]["KhaNangKha2"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangTrungBinh2]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangTrungBinh2]", tabDuLieu.Rows[0]["KhaNangTrungBinh2"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("TenTinHocVP"))
                            {
                                text.Text = text.Text.Replace("TenTinHocVP", tabDuLieu.Rows[0]["TenTinHocVP"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("[TinHocVP]"))
                            {
                                text.Text = text.Text.Replace("[TinHocVP]", tabDuLieu.Rows[0]["TinHocVP"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("[KhaNangVPKhacTot]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangVPKhacTot]", tabDuLieu.Rows[0]["KhaNangVPKhacTot"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangVPKhacKha]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangVPKhacKha]", tabDuLieu.Rows[0]["KhaNangVPKhacKha"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangVPKhacTrungBinh]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangVPKhacTrungBinh]", tabDuLieu.Rows[0]["KhaNangVPKhacTrungBinh"].ToString());
                            }

                            if (text.Text.Contains("[KhaNangVPTot]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangVPTot]", tabDuLieu.Rows[0]["KhaNangVPTot"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangVPKha]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangVPKha]", tabDuLieu.Rows[0]["KhaNangVPKha"].ToString());
                            }
                            if (text.Text.Contains("[KhaNangVPTrungBinh]"))
                            {
                                text.Text = text.Text.Replace("[KhaNangVPTrungBinh]", tabDuLieu.Rows[0]["KhaNangVPTrungBinh"].ToString());
                            }
                            if (text.Text.Contains("TenTinHocKhac"))
                            {
                                text.Text = text.Text.Replace("TenTinHocKhac", tabDuLieu.Rows[0]["TenTinHocKhac"].ToString());
                            }
                            if (text.Text.Contains("[TinHocKhac]"))
                            {
                                text.Text = text.Text.Replace("[TinHocKhac]", tabDuLieu.Rows[0]["TinHocKhac"].ToString());
                            }


                            if (text.Text.Contains("[KyNangMem_GiaoTiep]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_GiaoTiep]", tabDuLieu.Rows[0]["KyNangMem_GiaoTiep"].ToString());
                            }

                            if (text.Text.Contains("[KyNangMem_ThuyetTrinh]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_ThuyetTrinh]", tabDuLieu.Rows[0]["KyNangMem_ThuyetTrinh"].ToString());
                            }

                            if (text.Text.Contains("[KyNangMem_QLThoiGian]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_QLThoiGian]", tabDuLieu.Rows[0]["KyNangMem_QLThoiGian"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_QLNhanSu]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_QLNhanSu]", tabDuLieu.Rows[0]["KyNangMem_QLNhanSu"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_TongHopBC]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_TongHopBC]", tabDuLieu.Rows[0]["KyNangMem_TongHopBC"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_ThichUng]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_ThichUng]", tabDuLieu.Rows[0]["KyNangMem_ThichUng"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_LamViecNhom]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_LamViecNhom]", tabDuLieu.Rows[0]["KyNangMem_LamViecNhom"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_LamViecDocLap]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_LamViecDocLap]", tabDuLieu.Rows[0]["KyNangMem_LamViecDocLap"].ToString());
                            }

                            if (text.Text.Contains("[KyNangMem_ChiuApLuc]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_ChiuApLuc]", tabDuLieu.Rows[0]["KyNangMem_ChiuApLuc"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_GiamSat]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_GiamSat]", tabDuLieu.Rows[0]["KyNangMem_GiamSat"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMem_PhanBien]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMem_PhanBien]", tabDuLieu.Rows[0]["KyNangMem_PhanBien"].ToString());
                            }


                            if (text.Text.Contains("TenKyNangMemKhac"))
                            {
                                text.Text = text.Text.Replace("TenKyNangMemKhac", tabDuLieu.Rows[0]["TenKyNangMemKhac"].ToString());
                            }
                            if (text.Text.Contains("[KyNangMemKhac]"))
                            {
                                text.Text = text.Text.Replace("[KyNangMemKhac]", tabDuLieu.Rows[0]["KyNangMemKhac"].ToString());
                            }
                            if (text.Text.Contains("[KN_KhongYeuCau]"))
                            {
                                text.Text = text.Text.Replace("[KN_KhongYeuCau]", tabDuLieu.Rows[0]["KN_KhongYeuCau"].ToString());
                            }
                            if (text.Text.Contains("[KN_Duoi1Nam]"))
                            {
                                text.Text = text.Text.Replace("[KN_Duoi1Nam]", tabDuLieu.Rows[0]["KN_Duoi1Nam"].ToString());
                            }
                            if (text.Text.Contains("[KN_Tu1Den2Nam]"))
                            {
                                text.Text = text.Text.Replace("[KN_Tu1Den2Nam]", tabDuLieu.Rows[0]["KN_Tu1Den2Nam"].ToString());
                            }
                            if (text.Text.Contains("[KN_Tu2Den5Nam]"))
                            {
                                text.Text = text.Text.Replace("[KN_Tu2Den5Nam]", tabDuLieu.Rows[0]["KN_Tu2Den5Nam"].ToString());
                            }
                            if (text.Text.Contains("[KN_Tren5Nam]"))
                            {
                                text.Text = text.Text.Replace("[KN_Tren5Nam]", tabDuLieu.Rows[0]["KN_Tren5Nam"].ToString());
                            }
                            if (text.Text.Contains("TinhID_LamViec"))
                            {
                                text.Text = text.Text.Replace("TinhID_LamViec", tabDuLieu.Rows[0]["TinhID_LamViec"].ToString());
                            }

                            if (text.Text.Contains("HuyenKCNID"))
                            {
                                text.Text = text.Text.Replace("HuyenKCNID", tabDuLieu.Rows[0]["HuyenKCNID"].ToString());
                            }
                            if (text.Text.Contains("[LoaiHopDong_KXacDinh]"))
                            {
                                text.Text = text.Text.Replace("[LoaiHopDong_KXacDinh]", tabDuLieu.Rows[0]["LoaiHopDong_KXacDinh"].ToString());
                            }
                            if (text.Text.Contains("[LoaiHopDong_Doi12Thang]"))
                            {
                                text.Text = text.Text.Replace("[LoaiHopDong_Doi12Thang]", tabDuLieu.Rows[0]["LoaiHopDong_Doi12Thang"].ToString());
                            }
                            if (text.Text.Contains("[LoaiHopDong_Tu12Den36Thang]"))
                            {
                                text.Text = text.Text.Replace("[LoaiHopDong_Tu12Den36Thang]", tabDuLieu.Rows[0]["LoaiHopDong_Tu12Den36Thang"].ToString());
                            }



                            if (text.Text.Contains("[YeuCauThem_LamCa]"))
                            {
                                text.Text = text.Text.Replace("[YeuCauThem_LamCa]", tabDuLieu.Rows[0]["YeuCauThem_LamCa"].ToString());
                            }
                            if (text.Text.Contains("[YeuCauThem_DiCongTac]"))
                            {
                                text.Text = text.Text.Replace("[YeuCauThem_DiCongTac]", tabDuLieu.Rows[0]["YeuCauThem_DiCongTac"].ToString());
                            }
                            if (text.Text.Contains("[YeuCauThem_BietPhai]"))
                            {
                                text.Text = text.Text.Replace("[YeuCauThem_BietPhai]", tabDuLieu.Rows[0]["YeuCauThem_BietPhai"].ToString());
                            }
                            if (text.Text.Contains("[MucDich_LVLauDai]"))
                            {
                                text.Text = text.Text.Replace("[MucDich_LVLauDai]", tabDuLieu.Rows[0]["MucDich_LVLauDai"].ToString());
                            }


                            if (text.Text.Contains("[MucDich_TamThoi]"))
                            {
                                text.Text = text.Text.Replace("[MucDich_TamThoi]", tabDuLieu.Rows[0]["MucDich_TamThoi"].ToString());
                            }
                            if (text.Text.Contains("[MucDich_LamThem]"))
                            {
                                text.Text = text.Text.Replace("[MucDich_LamThem]", tabDuLieu.Rows[0]["MucDich_LamThem"].ToString());
                            }



                            if (text.Text.Contains("[HinhThucLamViec_BanTG]"))
                            {
                                text.Text = text.Text.Replace("[HinhThucLamViec_BanTG]", tabDuLieu.Rows[0]["HinhThucLamViec_BanTG"].ToString());
                            }
                            if (text.Text.Contains("[HinhThucLamViec_ToanTG]"))
                            {
                                text.Text = text.Text.Replace("[HinhThucLamViec_ToanTG]", tabDuLieu.Rows[0]["HinhThucLamViec_ToanTG"].ToString());
                            }

                            if (text.Text.Contains("[MucLuong_Duoi5Trieu]"))
                            {
                                text.Text = text.Text.Replace("[MucLuong_Duoi5Trieu]", tabDuLieu.Rows[0]["MucLuong_Duoi5Trieu"].ToString());
                            }
                            if (text.Text.Contains("[MucLuong_5Den10Trieu]"))
                            {
                                text.Text = text.Text.Replace("[MucLuong_5Den10Trieu]", tabDuLieu.Rows[0]["MucLuong_5Den10Trieu"].ToString());
                            }
                            if (text.Text.Contains("[MucLuong_10Den20Trieu]"))
                            {
                                text.Text = text.Text.Replace("[MucLuong_10Den20Trieu]", tabDuLieu.Rows[0]["MucLuong_10Den20Trieu"].ToString());
                            }


                            if (text.Text.Contains("[MucLuong_20Den50Trieu]"))
                            {
                                text.Text = text.Text.Replace("[MucLuong_20Den50Trieu]", tabDuLieu.Rows[0]["MucLuong_20Den50Trieu"].ToString());
                            }
                            if (text.Text.Contains("[MucLuong_Tren50Trieu]"))
                            {
                                text.Text = text.Text.Replace("[MucLuong_Tren50Trieu]", tabDuLieu.Rows[0]["MucLuong_Tren50Trieu"].ToString());
                            }
                            if (text.Text.Contains("[LuongNgayCheck]"))
                            {
                                text.Text = text.Text.Replace("[LuongNgayCheck]", tabDuLieu.Rows[0]["LuongNgayCheck"].ToString());
                            }
                            if (text.Text.Contains("LuongNgay"))
                            {
                                text.Text = text.Text.Replace("LuongNgay", tabDuLieu.Rows[0]["LuongNgay"].ToString());
                            }
                            if (text.Text.Contains("[LuongGioCheck]"))
                            {
                                text.Text = text.Text.Replace("[LuongGioCheck]", tabDuLieu.Rows[0]["LuongGioCheck"].ToString());
                            }
                            if (text.Text.Contains("LuongGio"))
                            {
                                text.Text = text.Text.Replace("LuongGio", tabDuLieu.Rows[0]["LuongGio"].ToString());
                            }
                            if (text.Text.Contains("[ThoaThuanPhongVan]"))
                            {
                                text.Text = text.Text.Replace("[ThoaThuanPhongVan]", tabDuLieu.Rows[0]["ThoaThuanPhongVan"].ToString());
                            }
                            if (text.Text.Contains("[HoaHongTheoDoanhThu]"))
                            {
                                text.Text = text.Text.Replace("[HoaHongTheoDoanhThu]", tabDuLieu.Rows[0]["HoaHongTheoDoanhThu"].ToString());
                            }

                            if (text.Text.Contains("[HoTroAn1bua]"))
                            {
                                text.Text = text.Text.Replace("[HoTroAn1bua]", tabDuLieu.Rows[0]["HoTroAn1bua"].ToString());
                            }

                            if (text.Text.Contains("[HoTroAn2bua]"))
                            {
                                text.Text = text.Text.Replace("[HoTroAn2bua]", tabDuLieu.Rows[0]["HoTroAn2bua"].ToString());
                            }

                            if (text.Text.Contains("[HoTroAn3bua]"))
                            {
                                text.Text = text.Text.Replace("[HoTroAn3bua]", tabDuLieu.Rows[0]["HoTroAn3bua"].ToString());
                            }
                            if (text.Text.Contains("[KhongHoTroAn]"))
                            {
                                text.Text = text.Text.Replace("[KhongHoTroAn]", tabDuLieu.Rows[0]["KhongHoTroAn"].ToString());
                            }
                            if (text.Text.Contains("SoTien_HoTroAnBangTien"))
                            {
                                text.Text = text.Text.Replace("SoTien_HoTroAnBangTien", tabDuLieu.Rows[0]["SoTien_HoTroAnBangTien"].ToString());
                            }
                            if (text.Text.Contains("[HoTroAnBangTien]"))
                            {
                                text.Text = text.Text.Replace("[HoTroAnBangTien]", tabDuLieu.Rows[0]["HoTroAnBangTien"].ToString());
                            }

                            if (text.Text.Contains("[DongBaoHiemThuong]"))
                            {
                                text.Text = text.Text.Replace("[DongBaoHiemThuong]", tabDuLieu.Rows[0]["DongBaoHiemThuong"].ToString());
                            }
                            if (text.Text.Contains("[BaoHiemNhanTho]"))
                            {
                                text.Text = text.Text.Replace("[BaoHiemNhanTho]", tabDuLieu.Rows[0]["BaoHiemNhanTho"].ToString());
                            }

                            if (text.Text.Contains("[TroCapThoiViec]"))
                            {
                                text.Text = text.Text.Replace("[TroCapThoiViec]", tabDuLieu.Rows[0]["TroCapThoiViec"].ToString());
                            }
                            if (text.Text.Contains("[NhaTre]"))
                            {
                                text.Text = text.Text.Replace("[NhaTre]", tabDuLieu.Rows[0]["NhaTre"].ToString());
                            }
                            if (text.Text.Contains("[XeDuaDon]"))
                            {
                                text.Text = text.Text.Replace("[XeDuaDon]", tabDuLieu.Rows[0]["XeDuaDon"].ToString());
                            }


                            if (text.Text.Contains("[HoTroDiLai]"))
                            {
                                text.Text = text.Text.Replace("[HoTroDiLai]", tabDuLieu.Rows[0]["HoTroDiLai"].ToString());
                            }
                            if (text.Text.Contains("[KyTucXa]"))
                            {
                                text.Text = text.Text.Replace("[KyTucXa]", tabDuLieu.Rows[0]["KyTucXa"].ToString());
                            }
                            if (text.Text.Contains("[NhaO]"))
                            {
                                text.Text = text.Text.Replace("[NhaO]", tabDuLieu.Rows[0]["NhaO"].ToString());
                            }
                            if (text.Text.Contains("[DaoTao]"))
                            {
                                text.Text = text.Text.Replace("[DaoTao]", tabDuLieu.Rows[0]["DaoTao"].ToString());
                            }
                            if (text.Text.Contains("[HoTroNguoiKhuyetTat]"))
                            {
                                text.Text = text.Text.Replace("[HoTroNguoiKhuyetTat]", tabDuLieu.Rows[0]["HoTroNguoiKhuyetTat"].ToString());
                            }
                            if (text.Text.Contains("[ThangTien]"))
                            {
                                text.Text = text.Text.Replace("[ThangTien]", tabDuLieu.Rows[0]["ThangTien"].ToString());
                            }
                            if (text.Text.Contains("TenPhucLoiKhac"))
                            {
                                text.Text = text.Text.Replace("TenPhucLoiKhac", tabDuLieu.Rows[0]["TenPhucLoiKhac"].ToString());
                            }
                            if (text.Text.Contains("[PhucLoiKhac]"))
                            {
                                text.Text = text.Text.Replace("[PhucLoiKhac]", tabDuLieu.Rows[0]["PhucLoiKhac"].ToString());
                            }

                            if (text.Text.Contains("[DKNoiLV_TrongNha]"))
                            {
                                text.Text = text.Text.Replace("[DKNoiLV_TrongNha]", tabDuLieu.Rows[0]["DKNoiLV_TrongNha"].ToString());
                            }
                            if (text.Text.Contains("[DKNoiLV_NgoaiTroi]"))
                            {
                                text.Text = text.Text.Replace("[DKNoiLV_NgoaiTroi]", tabDuLieu.Rows[0]["DKNoiLV_NgoaiTroi"].ToString());
                            }
                            if (text.Text.Contains("[DKNoiLV_HonHop]"))
                            {
                                text.Text = text.Text.Replace("[DKNoiLV_HonHop]", tabDuLieu.Rows[0]["DKNoiLV_HonHop"].ToString());
                            }
                            if (text.Text.Contains("[DKTrongLuongNang_Duoi5KG]"))
                            {
                                text.Text = text.Text.Replace("[DKTrongLuongNang_Duoi5KG]", tabDuLieu.Rows[0]["DKTrongLuongNang_Duoi5KG"].ToString());
                            }



                            if (text.Text.Contains("[DKTrongLuongNang_5Den20KG]"))
                            {
                                text.Text = text.Text.Replace("[DKTrongLuongNang_5Den20KG]", tabDuLieu.Rows[0]["DKTrongLuongNang_5Den20KG"].ToString());
                            }
                            if (text.Text.Contains("[DKTrongLuongNang_Tren20KG]"))
                            {
                                text.Text = text.Text.Replace("[DKTrongLuongNang_Tren20KG]", tabDuLieu.Rows[0]["DKTrongLuongNang_Tren20KG"].ToString());
                            }
                            if (text.Text.Contains("[DKDungDiLai_Khong]"))
                            {
                                text.Text = text.Text.Replace("[DKDungDiLai_Khong]", tabDuLieu.Rows[0]["DKDungDiLai_Khong"].ToString());
                            }
                            if (text.Text.Contains("[DKDungDiLai_TrungBinh]"))
                            {
                                text.Text = text.Text.Replace("[DKDungDiLai_TrungBinh]", tabDuLieu.Rows[0]["DKDungDiLai_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("[DKDungDiLai_Nhieu]"))
                            {
                                text.Text = text.Text.Replace("[DKDungDiLai_Nhieu]", tabDuLieu.Rows[0]["DKDungDiLai_Nhieu"].ToString());
                            }
                            if (text.Text.Contains("[DKNgheNoi_Khong]"))
                            {
                                text.Text = text.Text.Replace("[DKNgheNoi_Khong]", tabDuLieu.Rows[0]["DKNgheNoi_Khong"].ToString());
                            }
                            if (text.Text.Contains("[DKNgheNoi_CoBan]"))
                            {
                                text.Text = text.Text.Replace("[DKNgheNoi_CoBan]", tabDuLieu.Rows[0]["DKNgheNoi_CoBan"].ToString());
                            }
                            if (text.Text.Contains("[DKNgheNoi_QuanTrong]"))
                            {
                                text.Text = text.Text.Replace("[DKNgheNoi_QuanTrong]", tabDuLieu.Rows[0]["DKNgheNoi_QuanTrong"].ToString());
                            }

                            if (text.Text.Contains("[DKThiLuc_BinhThuong]"))
                            {
                                text.Text = text.Text.Replace("[DKThiLuc_BinhThuong]", tabDuLieu.Rows[0]["DKThiLuc_BinhThuong"].ToString());
                            }

                            if (text.Text.Contains("[DKThiLuc_NhinDuocChiTiet]"))
                            {
                                text.Text = text.Text.Replace("[DKThiLuc_NhinDuocChiTiet]", tabDuLieu.Rows[0]["DKThiLuc_NhinDuocChiTiet"].ToString());
                            }

                            if (text.Text.Contains("[DKThaoTacTay_Lon]"))
                            {
                                text.Text = text.Text.Replace("[DKThaoTacTay_Lon]", tabDuLieu.Rows[0]["DKThaoTacTay_Lon"].ToString());
                            }
                            if (text.Text.Contains("[DKThaoTacTay_TrungBinh]"))
                            {
                                text.Text = text.Text.Replace("[DKThaoTacTay_TrungBinh]", tabDuLieu.Rows[0]["DKThaoTacTay_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("[DKThaoTacTay_Nho]"))
                            {
                                text.Text = text.Text.Replace("[DKThaoTacTay_Nho]", tabDuLieu.Rows[0]["DKThaoTacTay_Nho"].ToString());
                            }
                            if (text.Text.Contains("[DKHaiTay_Hai]"))
                            {
                                text.Text = text.Text.Replace("[DKHaiTay_Hai]", tabDuLieu.Rows[0]["DKHaiTay_Hai"].ToString());
                            }
                            if (text.Text.Contains("[DKHaiTay_DoiKhi]"))
                            {
                                text.Text = text.Text.Replace("[DKHaiTay_DoiKhi]", tabDuLieu.Rows[0]["DKHaiTay_DoiKhi"].ToString());
                            }
                            if (text.Text.Contains("[DKHaiTay_Mot]"))
                            {
                                text.Text = text.Text.Replace("[DKHaiTay_Mot]", tabDuLieu.Rows[0]["DKHaiTay_Mot"].ToString());
                            }

                            if (text.Text.Contains("[DKHaiTay_Trai]"))
                            {
                                text.Text = text.Text.Replace("[DKHaiTay_Trai]", tabDuLieu.Rows[0]["DKHaiTay_Trai"].ToString());
                            }
                            if (text.Text.Contains("[DKHaiTay_Phai]"))
                            {
                                text.Text = text.Text.Replace("[DKHaiTay_Phai]", tabDuLieu.Rows[0]["DKHaiTay_Phai"].ToString());
                            }
                            if (text.Text.Contains("[DoiTuongUuTien_KT]"))
                            {
                                text.Text = text.Text.Replace("[DoiTuongUuTien_KT]", tabDuLieu.Rows[0]["DoiTuongUuTien_KT"].ToString());
                            }


                            if (text.Text.Contains("[DoiTuongUuTien_BoDoi]"))
                            {
                                text.Text = text.Text.Replace("[DoiTuongUuTien_BoDoi]", tabDuLieu.Rows[0]["DoiTuongUuTien_BoDoi"].ToString());
                            }
                            if (text.Text.Contains("[DoiTuongUuTien_ThieuSo]"))
                            {
                                text.Text = text.Text.Replace("[DoiTuongUuTien_ThieuSo]", tabDuLieu.Rows[0]["DoiTuongUuTien_ThieuSo"].ToString());
                            }
                            if (text.Text.Contains("[DoiTuongUuTien_HoNgheo]"))
                            {
                                text.Text = text.Text.Replace("[DoiTuongUuTien_HoNgheo]", tabDuLieu.Rows[0]["DoiTuongUuTien_HoNgheo"].ToString());
                            }
                            if (text.Text.Contains("[DoiTuongUuTienKhac]"))
                            {
                                text.Text = text.Text.Replace("[DoiTuongUuTienKhac]", tabDuLieu.Rows[0]["DoiTuongUuTienKhac"].ToString());
                            }
                            if (text.Text.Contains("TenDoiTuongUuTienKhac"))
                            {
                                text.Text = text.Text.Replace("TenDoiTuongUuTienKhac", tabDuLieu.Rows[0]["TenDoiTuongUuTienKhac"].ToString());
                            }
                            if (text.Text.Contains("[HinhThucTuyenDung_TT]"))
                            {
                                text.Text = text.Text.Replace("[HinhThucTuyenDung_TT]", tabDuLieu.Rows[0]["HinhThucTuyenDung_TT"].ToString());
                            }
                            if (text.Text.Contains("[HinhThucTuyenDung_DT]"))
                            {
                                text.Text = text.Text.Replace("[HinhThucTuyenDung_DT]", tabDuLieu.Rows[0]["HinhThucTuyenDung_DT"].ToString());
                            }
                            if (text.Text.Contains("[HinhThucTuyenDung_PV]"))
                            {
                                text.Text = text.Text.Replace("[HinhThucTuyenDung_PV]", tabDuLieu.Rows[0]["HinhThucTuyenDung_PV"].ToString());
                            }

                            if (text.Text.Contains("[HinhThucTuyenDung_CV]"))
                            {
                                text.Text = text.Text.Replace("[HinhThucTuyenDung_CV]", tabDuLieu.Rows[0]["HinhThucTuyenDung_CV"].ToString());
                            }
                            if (text.Text.Contains("[MongMuonDoanhNghiep_TuVan]"))
                            {
                                text.Text = text.Text.Replace("[MongMuonDoanhNghiep_TuVan]", tabDuLieu.Rows[0]["MongMuonDoanhNghiep_TuVan"].ToString());
                            }
                            if (text.Text.Contains("[MongMuonDoanhNghiep_GioiThieu]"))
                            {
                                text.Text = text.Text.Replace("[MongMuonDoanhNghiep_GioiThieu]", tabDuLieu.Rows[0]["MongMuonDoanhNghiep_GioiThieu"].ToString());
                            }
                            if (text.Text.Contains("[MongMuonDoanhNghiep_CungUng]"))
                            {
                                text.Text = text.Text.Replace("[MongMuonDoanhNghiep_CungUng]", tabDuLieu.Rows[0]["MongMuonDoanhNghiep_CungUng"].ToString());
                            }



                            if (text.Text.Contains("[NhanSMSCo]"))
                            {
                                text.Text = text.Text.Replace("[NhanSMSCo]", tabDuLieu.Rows[0]["NhanSMSCo"].ToString());
                            }
                            if (text.Text.Contains("[NhanSMSKhong]"))
                            {
                                text.Text = text.Text.Replace("[NhanSMSKhong]", tabDuLieu.Rows[0]["NhanSMSKhong"].ToString());
                            }
                            if (text.Text.Contains("[NhanEmailCo]"))
                            {
                                text.Text = text.Text.Replace("[NhanEmailCo]", tabDuLieu.Rows[0]["NhanEmailCo"].ToString());
                            }
                            if (text.Text.Contains("[NhanEmailKhong]"))
                            {
                                text.Text = text.Text.Replace("[NhanEmailKhong]", tabDuLieu.Rows[0]["NhanEmailKhong"].ToString());
                            }

                            if (text.Text.Contains("TenNguoiLH"))
                            {
                                text.Text = text.Text.Replace("TenNguoiLH", tabDuLieu.Rows[0]["TenNguoiLH"].ToString());
                            }
                            if (text.Text.Contains("SoDienThoaiLH"))
                            {
                                text.Text = text.Text.Replace("SoDienThoaiLH", tabDuLieu.Rows[0]["SoDienThoaiLH"].ToString());
                            }
                            if (text.Text.Contains("EmailLH"))
                            {
                                text.Text = text.Text.Replace("EmailLH", tabDuLieu.Rows[0]["EmailLH"].ToString());
                            }


                            if (text.Text.Contains("DiaChiLH"))
                            {
                                text.Text = text.Text.Replace("DiaChiLH", tabDuLieu.Rows[0]["DiaChiLH"].ToString());
                            }
                            if (text.Text.Contains("ChucVuNguoiTuyenDung"))
                            {
                                text.Text = text.Text.Replace("ChucVuNguoiTuyenDung", tabDuLieu.Rows[0]["ChucVuNguoiTuyenDung"].ToString());
                            }
                            if (text.Text.Contains("HinhThucLienHeKhac"))
                            {
                                text.Text = text.Text.Replace("HinhThucLienHeKhac", tabDuLieu.Rows[0]["HinhThucLienHeKhac"].ToString());
                            }
                            if (text.Text.Contains("NgayLap_Ngay"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Ngay", tabDuLieu.Rows[0]["NgayLap_Ngay"].ToString());
                            }
                            if (text.Text.Contains("NgayLap_Thang"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Thang", tabDuLieu.Rows[0]["NgayLap_Thang"].ToString());
                            }
                            if (text.Text.Contains("NgayLap_Nam"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Nam", tabDuLieu.Rows[0]["NgayLap_Nam"].ToString());
                            }
                            if (text.Text.Contains("HanNop_Ngay"))
                            {
                                text.Text = text.Text.Replace("HanNop_Ngay", tabDuLieu.Rows[0]["HanNop_Ngay"].ToString());
                            }
                            if (text.Text.Contains("HanNop_Thang"))
                            {
                                text.Text = text.Text.Replace("HanNop_Thang", tabDuLieu.Rows[0]["HanNop_Thang"].ToString());
                            }
                            if (text.Text.Contains("HanNop_Nam"))
                            {
                                text.Text = text.Text.Replace("HanNop_Nam", tabDuLieu.Rows[0]["HanNop_Nam"].ToString());
                            }

                            if (text.Text.Contains("DiaDanh"))
                            {
                                text.Text = text.Text.Replace("DiaDanh", DiaDanh);
                            }

                        }
                    }
                    wordDoc.MainDocumentPart.Document.Save();
                    wordDoc.Close();
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/ND232021/" + fileName;
                if (OfficeConvert.DocxToPDF(KetQua))
                {
                    KetQua.Replace("docx", "pdf");
                }
                return JSonHelper.ToJson(KetQua);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaDinhKemViecTimNguoi(string ID, string duongDan, string bangDk, string cotDk, string loai)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                string strDuongDan = "";
                string bang = bangDk.ToString();
                string cotDK = cotDk.ToString();

                bang = bang.Replace("select", "");
                bang = bang.Replace("delete", "");
                bang = bang.Replace("drop", "");
                bang = bang.Replace("truncate", "");

                cotDK = cotDK.Replace("select", "");
                cotDK = cotDK.Replace("delete", "");
                cotDK = cotDK.Replace("drop", "");
                cotDK = cotDK.Replace("truncate", "");

                // lấy đính kèm
                SqlParameter[] paraDK = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["DinhKem"].ToString();
                }
                else
                {
                    //nếu không có dữ liệu trong sql trong trường hợp thêm mới thì chỉ xóa file mới đính kèm
                    if (System.IO.File.Exists(Server.MapPath(duongDan)))
                    {
                        System.IO.File.Delete(Server.MapPath(duongDan));
                    }
                    ep.Msg = "Xóa đính kèm thành công!";
                    return JSonHelper.ToJson(ep);
                }

                //Xóa đính kèm
                SqlParameter[] para = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@Value",  strDuongDan.Replace(duongDan+"*","")),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);

                if (duLieu.Tables[0].Rows.Count != 0)
                {
                    if (loai == "all")
                    {
                        SqlParameter[] parameters = {
                            new SqlParameter("@TenBang", bang),
                            new SqlParameter("@TenCot", "DinhKem"),
                            new SqlParameter("@Value",  ""),
                            new SqlParameter("@TenCotDK",  cotDK),
                            new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                        };
                        DataSet delete = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", parameters);

                        string[] arrDuongDan = strDuongDan.Split('*');
                        foreach (string item in arrDuongDan)
                        {
                            if (System.IO.File.Exists(Server.MapPath(item)))
                            {
                                System.IO.File.Delete(Server.MapPath(item));
                            }
                        }
                    }
                    else
                    {
                        if (System.IO.File.Exists(Server.MapPath(duongDan)))
                        {
                            System.IO.File.Delete(Server.MapPath(duongDan));
                        }
                    }
                }
                //ep.Result = delete.Tables[0].Rows.Count;
                ep.Msg = "Xóa đính kèm thành công!";
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

    }
}