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
    public class PhieuDangKyTimViecLamController : Controller
    {
        // GET: QuanLy/PhieuDangKyTimViecLam
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
                    new SqlParameter("@HoVaTen_TimKiem_US", DungChung.NormalizationString(data[7])),
                    new SqlParameter("@SoCCCD_TimKiem_US", DungChung.NormalizationString(data[8])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllPhieuDkTimViecLam", para).Tables[0];
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
        public string LuuThongTinBuocMot(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChung.KiemTraTonTai(data[2].ToString(), "MaSo", "PhieuDKTimViec"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                if (data[0].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[2].ToString(), "MaSo", "PhieuDKTimViec", "PhieuDKTimViecID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@PhieuDKTimViecID",       DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaSo",                   DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@NgayNopHoSo",            DungChung.NormalizationDateTime(data[3].ToString())),
                    new SqlParameter("@SelectDoiTuongNN_US",    DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@DoiTuongUuTienID",       DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@SoDiDong",               DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@Email",                  DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@TinhID_TT",              DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@HuyenID_TT",             DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@XaID_TT",                DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@ThonID_TT",              DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@SoNha_TT",               DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@DiaChiThuongTru",        DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@TinhID_HN",              DungChung.NormalizationGuid(data[14].ToString())),
                    new SqlParameter("@HuyenID_HN",             DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@XaID_HN",                DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@ThoID_HN",               DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@SoNha_HN",               DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@DiaChiThuongTruHN",      DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@TrinhDoPTID",            DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@TrinhDoCMKTID",          DungChung.NormalizationGuid(data[21].ToString())),
                    new SqlParameter("@ChuyenNganhDTID",        DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@TrinhDoCMKTID_Khac",     DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@ChuyenNganhDaoID_Khac",  DungChung.NormalizationGuid(data[24].ToString())),
                    new SqlParameter("@TrinhDoKyNangNgheID",    DungChung.NormalizationGuid(data[25].ToString())),
                    new SqlParameter("@BacKyNangNghe",          DungChung.NormalizationGuid(data[26].ToString())),
                    new SqlParameter("@NgoaiNgu1",              DungChung.NormalizationGuid(data[27].ToString())),
                    new SqlParameter("@DanhGiaNgoaiNgu1",       DungChung.NormalizationNumber(data[28].ToString())),
                    new SqlParameter("@NgoaiNgu2",              DungChung.NormalizationGuid(data[29].ToString())),
                    new SqlParameter("@DanhGiaNgoaiNgu2",       DungChung.NormalizationNumber(data[30].ToString())),
                    new SqlParameter("@TinHocVP",               DungChung.NormalizationGuid(data[31].ToString())),
                    new SqlParameter("@DanhGiaTinHoc",          DungChung.NormalizationNumber(data[32].ToString())),
                    new SqlParameter("@TinHocKhac",             DungChung.NormalizationGuid(data[33].ToString())),
                    new SqlParameter("@DanhGiaTinHocKhac",      DungChung.NormalizationNumber(data[34].ToString())),
                    new SqlParameter("@KyNangMem",              DungChung.NormalizationString(data[35].ToString())),
                    new SqlParameter("@KyNangMemKhac",          DungChung.NormalizationString(data[36].ToString())),
                    new SqlParameter("@ChungChiNgoaiNgu1",      DungChung.NormalizationString(data[37].ToString())),
                    new SqlParameter("@ChungChiNgoaiNgu2",      DungChung.NormalizationString(data[38].ToString())),
                    new SqlParameter("@DonViID",                DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID",                 DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinPhieuDKTimViec", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        SqlParameter[] paraTC = {
                            new SqlParameter("@SelectDoiTuongNN_US",    DungChung.NormalizationGuid(data[4].ToString())),
                            new SqlParameter("@SoDiDong",               DungChung.NormalizationString(data[6].ToString())),
                            new SqlParameter("@Email",                  DungChung.NormalizationString(data[7].ToString())),
                            new SqlParameter("@TinhID_TT",              DungChung.NormalizationGuid(data[8].ToString())),
                            new SqlParameter("@HuyenID_TT",             DungChung.NormalizationGuid(data[9].ToString())),
                            new SqlParameter("@XaID_TT",                DungChung.NormalizationGuid(data[10].ToString())),
                            new SqlParameter("@ThonID_TT",              DungChung.NormalizationGuid(data[11].ToString())),
                            new SqlParameter("@SoNha_TT",               DungChung.NormalizationString(data[12].ToString())),
                            new SqlParameter("@DiaChiThuongTru",        DungChung.NormalizationString(data[13].ToString())),
                            new SqlParameter("@TinhID_HN",              DungChung.NormalizationGuid(data[14].ToString())),
                            new SqlParameter("@HuyenID_HN",             DungChung.NormalizationGuid(data[15].ToString())),
                            new SqlParameter("@XaID_HN",                DungChung.NormalizationGuid(data[16].ToString())),
                            new SqlParameter("@ThoID_HN",               DungChung.NormalizationGuid(data[17].ToString())),
                            new SqlParameter("@SoNha_HN",               DungChung.NormalizationString(data[18].ToString())),
                            new SqlParameter("@DiaChiThuongTruHN",      DungChung.NormalizationString(data[19].ToString())),
                            new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                            new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                        };
                        DataSet duLieuTC = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateThanhVienHoGD_NguoiTimViec", paraTC);
                    }
                    catch (Exception ex)
                    {
                        return JSonHelper.ToJson(ex);
                    }
                }
                string NguoiTimViecID = "";
                if (Loai == "them")
                {
                    try
                    {
                        SqlParameter[] paraNTV = {
                            new SqlParameter("@PhieuDKTimViecID", DungChung.NormalizationGuid(duLieu.Tables[0].Rows[0]["PhieuDKTimViecID"].ToString())),
                        };
                        DataSet duLieuNTV = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_InsertNguoiTimViec", paraNTV);

                        // Lấy ra ID của bảng người tìm việc
                        NguoiTimViecID = duLieuNTV.Tables[0].Rows[0]["NguoiTimViecID"].ToString();
                    }
                    catch (Exception ex)
                    {
                        return JSonHelper.ToJson(ex);
                    }
                    duLieu.Tables[0].TableName = "PhieuDKTimViec";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Result = NguoiTimViecID + "_" + duLieu.Tables[0].Rows[0]["MaSo"].ToString();
                    ep.Msg = "Thêm mới dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
                }

                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "PhieuDKTimViec";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        return NTSThongBao.CapNhatThanhCong();
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
        public string LuuThongTinKinhNghiemLV(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@NguoiTimViecID",             DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@TuNgay_KinhNghiemLV",        DungChung.NormalizationDateTime(data[2].ToString())),
                    new SqlParameter("@DenNgay_KinhNghiemLV",       DungChung.NormalizationDateTime(data[3].ToString())),
                    new SqlParameter("@TenDonVi_USKNLV",            DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@ChucVuID_USChonViecLam",     DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@CongViecChinh_USChonViecLam",DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@KinhNghiemLVUngVienID",      DungChung.NormalizationGuid(data[7].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinKinhNghiemLamViec_NguoiTimViec", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "KinhNghiemLVUngVien";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }

                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "KinhNghiemLVUngVien";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        return NTSThongBao.CapNhatThanhCong();
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
        public string LoadDuLieuSuaKinhNghiemLV(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllKinhNghiemLVByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllKinhNghiemLV(string id)
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllKinhNghiemLV", para).Tables[0];
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
        public string XoaDuLieuKinhNghiemLV(string id)
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_KinhNghiemLVUngVien", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "KinhNghiemLVUngVien";
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
        public string LuuThongTinDanhGia(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
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
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "DanhGiaTVDV";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        return NTSThongBao.CapNhatThanhCong();
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
        public string LuuThongTinBuoc2(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", data[0].ToString()),
                    new SqlParameter("@QuocGiaID_LamViec", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@DangKyDichVuID", DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@NoiDungDichVuKhac", DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@txtHoSoKemTheo_USDangKy", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@txtDinhKem_VanBan", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@NguoiTimViecID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateNguoiTimViec_Buoc2", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "NguoiTimViec";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaDinhKemTaiLieu(string ID, string duongDan, string bangDk, string cotDk, string loai)
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
                        new SqlParameter("@TenCot", "Dinhkem"),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["Dinhkem"].ToString();
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
                        new SqlParameter("@TenCot", "Dinhkem"),
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
                            new SqlParameter("@TenCot", "Dinhkem"),
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
        [HttpPost]
        public string XoaDinhKemHoSo(string ID, string duongDan, string bangDk, string cotDk, string loai)
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
                        new SqlParameter("@TenCot", "TaiLieu"),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["TaiLieu"].ToString();
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
                        new SqlParameter("@TenCot", "TaiLieu"),
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
                            new SqlParameter("@TenCot", "TaiLieu"),
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
        [HttpPost]
        public string LuuThongTinBuoc3(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", data[0].ToString()),
                    new SqlParameter("@NguoiTimViecID",        DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaSoNguoiTimViec",      DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@LoaiHinDNID",           DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TenCongViec",           DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@MoTaCongViec",          DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@MaNgheCap1",            DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@MaNgheCap2",            DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@MaNgheCap3",            DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@MaNgheCap4",            DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@TinhID_UuTien1",        DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@HuyenID_UuTien1",       DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@Quan_UuTien1",          DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@TinhID_UuTien2",        DungChung.NormalizationGuid(data[13].ToString())),
                    new SqlParameter("@HuyenID_UuTien2",       DungChung.NormalizationGuid(data[14].ToString())),
                    new SqlParameter("@Quan_UuTien2",          DungChung.NormalizationString(data[15].ToString())),
                    new SqlParameter("@ChucVuID",              DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@ChucVuKhac",            DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@KinhNghiemLamViecID",   DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@LoaiHopDongLDID",       DungChung.NormalizationGuid(data[19].ToString())),
                    new SqlParameter("@KhaNangDapUngID",       DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@HinhThucLamViecID",     DungChung.NormalizationGuid(data[21].ToString())),
                    new SqlParameter("@MucDichLamViecID",      DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@MucLuongID",            DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@LuongTheoNgay",         DungChung.NormalizationNumber(data[24].ToString())),
                    new SqlParameter("@LuongTheoGio",          DungChung.NormalizationNumber(data[25].ToString())),
                    new SqlParameter("@CheDoPhucLoi",          DungChung.NormalizationString(data[26].ToString())),
                    new SqlParameter("@CheDoPhucLoiKhac",      DungChung.NormalizationString(data[27].ToString())),
                    new SqlParameter("@NoiLamViecID",          DungChung.NormalizationString(data[28].ToString())),
                    new SqlParameter("@TrongLuongNangID",      DungChung.NormalizationString(data[29].ToString())),
                    new SqlParameter("@DiDungID",              DungChung.NormalizationString(data[30].ToString())),
                    new SqlParameter("@NgheNoiID",             DungChung.NormalizationString(data[31].ToString())),
                    new SqlParameter("@ThiLucID",              DungChung.NormalizationString(data[32].ToString())),
                    new SqlParameter("@ThaoTacTayID",          DungChung.NormalizationString(data[33].ToString())),
                    new SqlParameter("@Dung2TayID",            DungChung.NormalizationString(data[34].ToString())),
                    new SqlParameter("@SanSangLamViecID",      DungChung.NormalizationString(data[35].ToString())),
                    new SqlParameter("@HinhThucTuyenDungID",   DungChung.NormalizationString(data[36].ToString())),
                    new SqlParameter("@SelectPhieuDKGTVL_US",  DungChung.NormalizationGuid(data[37].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateNguoiTimViec_Buoc3", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "NguoiTimViec";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_NguoiTimViec", para);
                string pathAnhDaiDien1 = DungChung.LayDuongDanDinhKem("NguoiTimViec", "Dinhkem", "NguoiTimViecID", duLieu.Tables[0].Rows[0]["PhieuDKTimViecID"].ToString());
                string pathAnhDaiDien2 = DungChung.LayDuongDanDinhKem("NguoiTimViec", "TaiLieu", "NguoiTimViecID", duLieu.Tables[0].Rows[0]["PhieuDKTimViecID"].ToString());
                if (duLieu.Tables[0].Rows.Count > 0)
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
                    if (pathAnhDaiDien2.Trim() != "")
                    {
                        string[] arrDuongDan = pathAnhDaiDien2.Split('*');
                        foreach (string item in arrDuongDan)
                        {
                            if (System.IO.File.Exists(Server.MapPath(item)))
                            {
                                System.IO.File.Delete(Server.MapPath(item));
                            }
                        }
                    }
                    duLieu.Tables[0].TableName = "NguoiTimViec";
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
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetPhieuDKTimViecByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetDangKyDVCTPhieuDKGTVL_NguoiTimViec", para).Tables[0];
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
        public string XuatExcel_PhieuDKTimViecLam(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachPhieuDangKyTimViecLam" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/NghiepVu/DanhSachPhieuDangKyTimViecLam.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachPhieuDangKyTimViecLam/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachPhieuDangKyTimViecLam/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5])),
                    new SqlParameter("@DenNgay", DungChung.NormalizationDateTime(data[6])),
                    new SqlParameter("@HoVaTen_TimKiem_US", DungChung.NormalizationString(data[7])),
                    new SqlParameter("@SoCCCD_TimKiem_US", DungChung.NormalizationString(data[8])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllPhieuDkTimViecLam_Excel", para).Tables[0];

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
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["HoVaTen"].ToString().ToUpper();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["SoCCCD"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["NgaySinh"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["TenDoiTuongUuTien"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["TrinhDoHV"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["TenCongViec"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenDichVuDK"].ToString();
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":K" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/NghiepVu/DanhSachPhieuDangKyTimViecLam/" + fileName;
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
        public string XuatMau01PLI(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mauso01PLI" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/ND232021/Mauso01PLI.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataSet dsData = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_XuatMau01PLI_ND23", para);
                DataTable tabDuLieu = dsData.Tables[0];
                DataTable tabDuLieuCT = dsData.Tables[1];
                DataTable tabDuLieuCTDonVi = dsData.Tables[2];
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
                            if (text.Text.Contains("DiaDanh"))
                            {
                                text.Text = text.Text.Replace("DiaDanh", DiaDanh);
                            }

                            if (text.Text.Contains("NK_Ngay"))
                            {
                                text.Text = text.Text.Replace("NK_Ngay", DateTime.Now.Day.ToString());
                            }

                            if (text.Text.Contains("NK_Thang"))
                            {
                                text.Text = text.Text.Replace("NK_Thang", DateTime.Now.Month.ToString());
                            }
                            if (text.Text.Contains("NK_Nam"))
                            {
                                text.Text = text.Text.Replace("NK_Nam", DateTime.Now.Year.ToString());
                            }



                            if (text.Text.Contains("MaSo"))
                            {
                                text.Text = text.Text.Replace("MaSo", tabDuLieu.Rows[0]["MaSo"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("CN_TenCaNhan"))
                            {
                                text.Text = text.Text.Replace("CN_TenCaNhan", tabDuLieu.Rows[0]["CN_TenCaNhan"].ToString());
                            }
                            if (text.Text.Contains("CN_CCCD"))
                            {
                                text.Text = text.Text.Replace("CN_CCCD", tabDuLieu.Rows[0]["CN_CCCD"].ToString());
                            }
                            if (text.Text.Contains("CN_NgaySinh"))
                            {
                                text.Text = text.Text.Replace("CN_NgaySinh", tabDuLieu.Rows[0]["CN_NgaySinh"].ToString());
                            }
                            if (text.Text.Contains("CN_GT_Nam"))
                            {
                                text.Text = text.Text.Replace("CN_GT_Nam", tabDuLieu.Rows[0]["CN_GT_Nam"].ToString());
                            }

                            if (text.Text.Contains("CN_GT_Nu"))
                            {
                                text.Text = text.Text.Replace("CN_GT_Nu", tabDuLieu.Rows[0]["CN_GT_Nu"].ToString());
                            }
                            if (text.Text.Contains("CN_DanToc"))
                            {
                                text.Text = text.Text.Replace("CN_DanToc", tabDuLieu.Rows[0]["CN_DanToc"].ToString());
                            }

                            if (text.Text.Contains("CN_TonGiao"))
                            {
                                text.Text = text.Text.Replace("CN_TonGiao", tabDuLieu.Rows[0]["CN_TonGiao"].ToString());
                            }

                            if (text.Text.Contains("CN_TT_Xa"))
                            {
                                text.Text = text.Text.Replace("CN_TT_Xa", tabDuLieu.Rows[0]["CN_TT_Xa"].ToString());
                            }
                            if (text.Text.Contains("CN_TT_Huyen"))
                            {
                                text.Text = text.Text.Replace("CN_TT_Huyen", tabDuLieu.Rows[0]["CN_TT_Huyen"].ToString());
                            }

                            if (text.Text.Contains("CN_TT_Tinh"))
                            {
                                text.Text = text.Text.Replace("CN_TT_Tinh", tabDuLieu.Rows[0]["CN_TT_Tinh"].ToString());
                            }
                            if (text.Text.Contains("CN_TT_DiaChi"))
                            {
                                text.Text = text.Text.Replace("CN_TT_DiaChi", tabDuLieu.Rows[0]["CN_TT_DiaChi"].ToString());
                            }
                            if (text.Text.Contains("CN_HN_Xa"))
                            {
                                text.Text = text.Text.Replace("CN_HN_Xa", tabDuLieu.Rows[0]["CN_HN_Xa"].ToString());
                            }
                            if (text.Text.Contains("CN_HN_Huyen"))
                            {
                                text.Text = text.Text.Replace("CN_HN_Huyen", tabDuLieu.Rows[0]["CN_HN_Huyen"].ToString());
                            }
                            if (text.Text.Contains("CN_HN_Tinh"))
                            {
                                text.Text = text.Text.Replace("CN_HN_Tinh", tabDuLieu.Rows[0]["CN_HN_Tinh"].ToString());
                            }
                            if (text.Text.Contains("CN_HN_DiaChi"))
                            {
                                text.Text = text.Text.Replace("CN_HN_DiaChi", tabDuLieu.Rows[0]["CN_HN_DiaChi"].ToString());
                            }
                            if (text.Text.Contains("CN_SDT"))
                            {
                                text.Text = text.Text.Replace("CN_SDT", tabDuLieu.Rows[0]["CN_SDT"].ToString());
                            }
                            if (text.Text.Contains("CN_Email"))
                            {
                                text.Text = text.Text.Replace("CN_Email", tabDuLieu.Rows[0]["CN_Email"].ToString());
                            }
                            if (text.Text.Contains("CN_LHKhac"))
                            {
                                text.Text = text.Text.Replace("CN_LHKhac", tabDuLieu.Rows[0]["CN_LHKhac"].ToString());
                            }
                            if (text.Text.Contains("UT_NKT"))
                            {
                                text.Text = text.Text.Replace("UT_NKT", tabDuLieu.Rows[0]["UT_NKT"].ToString());
                            }
                            if (text.Text.Contains("UT_NDTTS"))
                            {
                                text.Text = text.Text.Replace("UT_NDTTS", tabDuLieu.Rows[0]["UT_NDTTS"].ToString());
                            }
                            if (text.Text.Contains("UT_NTHN"))
                            {
                                text.Text = text.Text.Replace("UT_NTHN", tabDuLieu.Rows[0]["UT_NTHN"].ToString());
                            }
                            if (text.Text.Contains("UT_BDXN"))
                            {
                                text.Text = text.Text.Replace("UT_BDXN", tabDuLieu.Rows[0]["UT_BDXN"].ToString());
                            }
                            if (text.Text.Contains("UT_Khac"))
                            {
                                text.Text = text.Text.Replace("UT_Khac", tabDuLieu.Rows[0]["UT_Khac"].ToString());
                            }
                            if (text.Text.Contains("UT_GhiRo"))
                            {
                                text.Text = text.Text.Replace("UT_GhiRo", tabDuLieu.Rows[0]["UT_GhiRo"].ToString());
                            }
                            if (text.Text.Contains("TD_CTNTH"))
                            {
                                text.Text = text.Text.Replace("TD_CTNTH", tabDuLieu.Rows[0]["TD_CTNTH"].ToString());
                            }
                            if (text.Text.Contains("TD_TNTHoc"))
                            {
                                text.Text = text.Text.Replace("TD_TNTHoc", tabDuLieu.Rows[0]["TD_TNTH"].ToString());
                            }
                            if (text.Text.Contains("TD_TNTHCS"))
                            {
                                text.Text = text.Text.Replace("TD_TNTHCS", tabDuLieu.Rows[0]["TD_TNTHCS"].ToString());
                            }
                            if (text.Text.Contains("TD_TNTHPT"))
                            {
                                text.Text = text.Text.Replace("TD_TNTHPT", tabDuLieu.Rows[0]["TD_TNTHPT"].ToString());
                            }
                            if (text.Text.Contains("CM_CQDT"))
                            {
                                text.Text = text.Text.Replace("CM_CQDT", tabDuLieu.Rows[0]["CM_CQDT"].ToString());
                            }
                            if (text.Text.Contains("CM_SoCap"))
                            {
                                text.Text = text.Text.Replace("CM_SoCap", tabDuLieu.Rows[0]["CM_SoCap"].ToString());
                            }
                            if (text.Text.Contains("CM_CaoDang"))
                            {
                                text.Text = text.Text.Replace("CM_CaoDang", tabDuLieu.Rows[0]["CM_CaoDang"].ToString());
                            }
                            if (text.Text.Contains("CM_ThacSi"))
                            {
                                text.Text = text.Text.Replace("CM_ThacSi", tabDuLieu.Rows[0]["CM_ThacSi"].ToString());
                            }
                            if (text.Text.Contains("CM_KB"))
                            {
                                text.Text = text.Text.Replace("CM_KB", tabDuLieu.Rows[0]["CM_KB"].ToString());
                            }
                            if (text.Text.Contains("CM_TrungCap"))
                            {
                                text.Text = text.Text.Replace("CM_TrungCap", tabDuLieu.Rows[0]["CM_TrungCap"].ToString());
                            }
                            if (text.Text.Contains("CM_DaiHoc"))
                            {
                                text.Text = text.Text.Replace("CM_DaiHoc", tabDuLieu.Rows[0]["CM_DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("CM_TienSi"))
                            {
                                text.Text = text.Text.Replace("CM_TienSi", tabDuLieu.Rows[0]["CM_TienSi"].ToString());
                            }
                            if (text.Text.Contains("CM_CNDT"))
                            {
                                text.Text = text.Text.Replace("CM_CNDT", tabDuLieu.Rows[0]["CM_CNDT"].ToString());
                            }
                            if (text.Text.Contains("CMKTKhac"))
                            {
                                text.Text = text.Text.Replace("CMKTKhac", tabDuLieu.Rows[0]["CMK_CNDTKhac"].ToString());
                            }
                            if (text.Text.Contains("CM_DaiHoc"))
                            {
                                text.Text = text.Text.Replace("CM_DaiHoc", tabDuLieu.Rows[0]["CM_DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("CMK_CQDT"))
                            {
                                text.Text = text.Text.Replace("CMK_CQDT", tabDuLieu.Rows[0]["CMK_CQDT"].ToString());
                            }
                            if (text.Text.Contains("CMK_SoCap"))
                            {
                                text.Text = text.Text.Replace("CMK_SoCap", tabDuLieu.Rows[0]["CMK_SoCap"].ToString());
                            }
                            if (text.Text.Contains("CMK_CaoDang"))
                            {
                                text.Text = text.Text.Replace("CMK_CaoDang", tabDuLieu.Rows[0]["CMK_CaoDang"].ToString());
                            }
                            if (text.Text.Contains("CMK_ThacSi"))
                            {
                                text.Text = text.Text.Replace("CMK_ThacSi", tabDuLieu.Rows[0]["CMK_ThacSi"].ToString());
                            }
                            if (text.Text.Contains("CMK_KB"))
                            {
                                text.Text = text.Text.Replace("CMK_KB", tabDuLieu.Rows[0]["CMK_KB"].ToString());
                            }
                            if (text.Text.Contains("CMK_TrungCap"))
                            {
                                text.Text = text.Text.Replace("CMK_TrungCap", tabDuLieu.Rows[0]["CMK_TrungCap"].ToString());
                            }
                            if (text.Text.Contains("CMK_DaiHoc"))
                            {
                                text.Text = text.Text.Replace("CMK_DaiHoc", tabDuLieu.Rows[0]["CMK_DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("CMK_TienSi"))
                            {
                                text.Text = text.Text.Replace("CMK_TienSi", tabDuLieu.Rows[0]["CMK_TienSi"].ToString());
                            }
                            if (text.Text.Contains("CMK_CNDT"))
                            {
                                text.Text = text.Text.Replace("CMK_CNDT", tabDuLieu.Rows[0]["CMK_CNDT"].ToString());
                            }
                            if (text.Text.Contains("CMK_DaiHoc"))
                            {
                                text.Text = text.Text.Replace("CMK_DaiHoc", tabDuLieu.Rows[0]["CMK_DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKhac1"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKhac1", tabDuLieu.Rows[0]["TrinhDoKhac1"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKhac2"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKhac2", tabDuLieu.Rows[0]["TrinhDoKhac2"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKyNangNghe"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKyNangNghe", tabDuLieu.Rows[0]["TrinhDoKyNangNghe"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoKyNang_Bac"))
                            {
                                text.Text = text.Text.Replace("TrinhDoKyNang_Bac", tabDuLieu.Rows[0]["TrinhDoKyNang_Bac"].ToString());
                            }
                            if (text.Text.Contains("NgoaiNgu1"))
                            {
                                text.Text = text.Text.Replace("NgoaiNgu1", tabDuLieu.Rows[0]["NgoaiNgu1"].ToString());
                            }
                            if (text.Text.Contains("NN1_ChungChi"))
                            {
                                text.Text = text.Text.Replace("NN1_ChungChi", tabDuLieu.Rows[0]["NN1_ChungChi"].ToString());
                            }
                            if (text.Text.Contains("NN1_Tot"))
                            {
                                text.Text = text.Text.Replace("NN1_Tot", tabDuLieu.Rows[0]["NN1_Tot"].ToString());
                            }
                            if (text.Text.Contains("NN1_Kha"))
                            {
                                text.Text = text.Text.Replace("NN1_Kha", tabDuLieu.Rows[0]["NN1_Kha"].ToString());
                            }
                            if (text.Text.Contains("NN1_TrungBinh"))
                            {
                                text.Text = text.Text.Replace("NN1_TrungBinh", tabDuLieu.Rows[0]["NN1_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("NgoaiNgu2"))
                            {
                                text.Text = text.Text.Replace("NgoaiNgu2", tabDuLieu.Rows[0]["NgoaiNgu2"].ToString());
                            }
                            if (text.Text.Contains("NN2_ChungChi"))
                            {
                                text.Text = text.Text.Replace("NN2_ChungChi", tabDuLieu.Rows[0]["NN2_ChungChi"].ToString());
                            }

                            if (text.Text.Contains("NN2_Tot"))
                            {
                                text.Text = text.Text.Replace("NN2_Tot", tabDuLieu.Rows[0]["NN2_Tot"].ToString());
                            }
                            if (text.Text.Contains("NN2_Kha"))
                            {
                                text.Text = text.Text.Replace("NN2_Kha", tabDuLieu.Rows[0]["NN2_Kha"].ToString());
                            }
                            if (text.Text.Contains("NN2_TrungBinh"))
                            {
                                text.Text = text.Text.Replace("NN2_TrungBinh", tabDuLieu.Rows[0]["NN2_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("TH_THVP"))
                            {
                                text.Text = text.Text.Replace("TH_THVP", tabDuLieu.Rows[0]["TH_THVP"].ToString());
                            }
                            if (text.Text.Contains("TH_GhiRo"))
                            {
                                text.Text = text.Text.Replace("TH_GhiRo", tabDuLieu.Rows[0]["TH_GhiRo"].ToString());
                            }
                            if (text.Text.Contains("TH_Tot"))
                            {
                                text.Text = text.Text.Replace("TH_Tot", tabDuLieu.Rows[0]["TH_Tot"].ToString());
                            }
                            if (text.Text.Contains("TH_Kha"))
                            {
                                text.Text = text.Text.Replace("TH_Kha", tabDuLieu.Rows[0]["TH_Kha"].ToString());
                            }
                            if (text.Text.Contains("TH_TrungBinh"))
                            {
                                text.Text = text.Text.Replace("TH_TrungBinh", tabDuLieu.Rows[0]["TH_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("THK_THVP"))
                            {
                                text.Text = text.Text.Replace("THK_THVP", tabDuLieu.Rows[0]["THK_THVP"].ToString());
                            }
                            if (text.Text.Contains("THK_GhiRo"))
                            {
                                text.Text = text.Text.Replace("THK_GhiRo", tabDuLieu.Rows[0]["THK_GhiRo"].ToString());
                            }
                            if (text.Text.Contains("THK_Tot"))
                            {
                                text.Text = text.Text.Replace("THK_Tot", tabDuLieu.Rows[0]["THK_Tot"].ToString());
                            }
                            if (text.Text.Contains("THK_Khac"))
                            {
                                text.Text = text.Text.Replace("THK_Khac", tabDuLieu.Rows[0]["THK_Khac"].ToString());
                            }
                            if (text.Text.Contains("THK_Kha"))
                            {
                                text.Text = text.Text.Replace("THK_Kha", tabDuLieu.Rows[0]["THK_Kha"].ToString());
                            }
                            if (text.Text.Contains("THK_TrungBinh"))
                            {
                                text.Text = text.Text.Replace("THK_TrungBinh", tabDuLieu.Rows[0]["THK_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("KNM_GT"))
                            {
                                text.Text = text.Text.Replace("KNM_GT", tabDuLieu.Rows[0]["KNM_GT"].ToString());
                            }
                            if (text.Text.Contains("KNM_TTrinh"))
                            {
                                text.Text = text.Text.Replace("KNM_TTrinh", tabDuLieu.Rows[0]["KNM_TTrinh"].ToString());
                            }
                            if (text.Text.Contains("KNM_QLTG"))
                            {
                                text.Text = text.Text.Replace("KNM_QLTG", tabDuLieu.Rows[0]["KNM_QLTG"].ToString());
                            }
                            if (text.Text.Contains("KNM_QLNS"))
                            {
                                text.Text = text.Text.Replace("KNM_QLNS", tabDuLieu.Rows[0]["KNM_QLNS"].ToString());
                            }
                            if (text.Text.Contains("KNM_THBC"))
                            {
                                text.Text = text.Text.Replace("KNM_THBC", tabDuLieu.Rows[0]["KNM_THBC"].ToString());
                            }
                            if (text.Text.Contains("KNM_TUNS"))
                            {
                                text.Text = text.Text.Replace("KNM_TUNS", tabDuLieu.Rows[0]["KNM_TUNS"].ToString());
                            }
                            if (text.Text.Contains("KNM_LVN"))
                            {
                                text.Text = text.Text.Replace("KNM_LVN", tabDuLieu.Rows[0]["KNM_LVN"].ToString());
                            }
                            if (text.Text.Contains("KNM_LVDL"))
                            {
                                text.Text = text.Text.Replace("KNM_LVDL", tabDuLieu.Rows[0]["KNM_LVDL"].ToString());
                            }


                            if (text.Text.Contains("KNM_ALCV"))
                            {
                                text.Text = text.Text.Replace("KNM_ALCV", tabDuLieu.Rows[0]["KNM_ALCV"].ToString());
                            }
                            if (text.Text.Contains("KNM_TDGS"))
                            {
                                text.Text = text.Text.Replace("KNM_TDGS", tabDuLieu.Rows[0]["KNM_TDGS"].ToString());
                            }
                            if (text.Text.Contains("KNM_TDPB"))
                            {
                                text.Text = text.Text.Replace("KNM_TDPB", tabDuLieu.Rows[0]["KNM_TDPB"].ToString());
                            }
                            if (text.Text.Contains("KHM_Khac"))
                            {
                                text.Text = text.Text.Replace("KHM_Khac", tabDuLieu.Rows[0]["KHM_Khac"].ToString());
                            }
                            if (text.Text.Contains("KNM_GhiRo"))
                            {
                                text.Text = text.Text.Replace("KNM_GhiRo", tabDuLieu.Rows[0]["KNM_GhiRo"].ToString());
                            }
                            if (text.Text.Contains("KNLV_NuocNgoai"))
                            {
                                text.Text = text.Text.Replace("KNLV_NuocNgoai", tabDuLieu.Rows[0]["KNLV_NuocNgoai"].ToString());
                            }
                            if (text.Text.Contains("KNLV_GhiRo"))
                            {
                                text.Text = text.Text.Replace("KNLV_GhiRo", tabDuLieu.Rows[0]["KNLV_GhiRo"].ToString());
                            }
                            if (text.Text.Contains("DKDV_TVCSLD"))
                            {
                                text.Text = text.Text.Replace("DKDV_TVCSLD", tabDuLieu.Rows[0]["DKDV_TVCSLD"].ToString());
                            }
                            if (text.Text.Contains("DKDV_TVVL"))
                            {
                                text.Text = text.Text.Replace("DKDV_TVVL", tabDuLieu.Rows[0]["DKDV_TVVL"].ToString());
                            }
                            if (text.Text.Contains("DKDV_TVDTKNN"))
                            {
                                text.Text = text.Text.Replace("DKDV_TVDTKNN", tabDuLieu.Rows[0]["DKDV_TVDTKNN"].ToString());
                            }
                            if (text.Text.Contains("DKDV_01a"))
                            {
                                text.Text = text.Text.Replace("DKDV_01a", tabDuLieu.Rows[0]["DKDV_01a"].ToString());
                            }
                            if (text.Text.Contains("DangKyDichVuKhac"))
                            {
                                text.Text = text.Text.Replace("DangKyDichVuKhac", tabDuLieu.Rows[0]["DKDV_Khac"].ToString());
                            }
                            if (text.Text.Contains("DKDV_GhiRo"))
                            {
                                text.Text = text.Text.Replace("DKDV_GhiRo", tabDuLieu.Rows[0]["DKDV_GhiRo"].ToString());
                            }
                            if (text.Text.Contains("HoTenNguoiKy"))
                            {
                                text.Text = text.Text.Replace("HoTenNguoiKy", tabDuLieu.Rows[0]["CN_TenCaNhan"].ToString().ToUpper());
                            }
                        }
                    }

                    //Xử lý bảng đánh giá chất lượng
                    try
                    {
                        var tables = mainPart.Document.Descendants<DocumentFormat.OpenXml.Wordprocessing.Table>().ToList();
                        if (tabDuLieuCTDonVi.Rows.Count > 0)
                        {
                            for (int i = 0; i < tabDuLieuCTDonVi.Rows.Count; i++)
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
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                           new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCTDonVi.Rows[i]["TenCongTy"].ToString())
                                            )
                                    )
                                    );
                                td2.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                           new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCTDonVi.Rows[i]["ChucDanh"].ToString())
                                            )
                                    )
                                    );
                                td3.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                          new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCTDonVi.Rows[i]["TenCongViecChinh"].ToString())
                                            )
                                    )
                                    );
                                td4.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            //new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCTDonVi.Rows[i]["ThoiGianKNLV"].ToString())
                                            )
                                    )
                                    );
                                tr1.Append(td1, td2, td3, td4);
                                tables[1].Append(tr1);

                            }
                        }
                        if (tabDuLieuCT.Rows.Count > 0)
                        {
                            for (int i = 0; i < tabDuLieuCT.Rows.Count; i++)
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
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                           new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCT.Rows[i]["STT"].ToString())
                                            )
                                    )
                                    );
                                td2.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                           new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCT.Rows[i]["NoiDung"].ToString())
                                            )
                                    )
                                    );
                                td3.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                          new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCT.Rows[i]["DanhGiaTot"].ToString())
                                            )
                                    )
                                    );
                                td4.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            //new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCT.Rows[i]["DanhGiaKhongTot"].ToString())
                                            )
                                    )
                                    );
                                td5.Append(new TableCellProperties(
                                 new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                 new Paragraph(
                                     new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                     new DocumentFormat.OpenXml.Wordprocessing.Run(
                                         new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                         new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                         //new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                         new DocumentFormat.OpenXml.Wordprocessing.Text(tabDuLieuCT.Rows[i]["NhanXet"].ToString())
                                         )
                                 )
                                 );
                                tr1.Append(td1, td2, td3, td4, td5);
                                tables[2].Append(tr1);

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
        public string XuatMau01aPLI(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mauso01aPLI" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/ND232021/Mauso01aPLI.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/ND232021/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataSet dsData = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_XuatMau01aPLI_ND23", para);
                DataTable tabDuLieu = dsData.Tables[0];
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
                            if (text.Text.Contains("DiaDanh"))
                            {
                                text.Text = text.Text.Replace("DiaDanh", DiaDanh);
                            }
                            if (text.Text.Contains("NgayLap_Ngay"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Ngay", DateTime.Now.Day.ToString());
                            }

                            if (text.Text.Contains("NgayLap_Thang"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Thang", DateTime.Now.Month.ToString());
                            }
                            if (text.Text.Contains("NgayLap_Nam"))
                            {
                                text.Text = text.Text.Replace("NgayLap_Nam", DateTime.Now.Year.ToString());
                            }



                            if (text.Text.Contains("MaSo"))
                            {
                                text.Text = text.Text.Replace("MaSo", tabDuLieu.Rows[0]["MaSo"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("ViecLamMongMuon"))
                            {
                                text.Text = text.Text.Replace("ViecLamMongMuon", tabDuLieu.Rows[0]["ViecLamMongMuon"].ToString());
                            }
                            if (text.Text.Contains("DN_NhaNuoc"))
                            {
                                text.Text = text.Text.Replace("DN_NhaNuoc", tabDuLieu.Rows[0]["DN_NhaNuoc"].ToString());
                            }
                            if (text.Text.Contains("DN_NgoaiNhaNuoc"))
                            {
                                text.Text = text.Text.Replace("DN_NgoaiNhaNuoc", tabDuLieu.Rows[0]["DN_NgoaiNhaNuoc"].ToString());
                            }
                            if (text.Text.Contains("DN_CoVonNN"))
                            {
                                text.Text = text.Text.Replace("DN_CoVonNN", tabDuLieu.Rows[0]["DN_CoVonNN"].ToString());
                            }

                            if (text.Text.Contains("TenCongViec"))
                            {
                                text.Text = text.Text.Replace("TenCongViec", tabDuLieu.Rows[0]["TenCongViec"].ToString());
                            }
                            if (text.Text.Contains("MoTaCV"))
                            {
                                text.Text = text.Text.Replace("MoTaCV", tabDuLieu.Rows[0]["MoTaCV"].ToString());
                            }

                            if (text.Text.Contains("Cap1"))
                            {
                                text.Text = text.Text.Replace("Cap1", tabDuLieu.Rows[0]["Cap1"].ToString());
                            }

                            if (text.Text.Contains("Cap2"))
                            {
                                text.Text = text.Text.Replace("Cap2", tabDuLieu.Rows[0]["Cap2"].ToString());
                            }
                            if (text.Text.Contains("Cap3"))
                            {
                                text.Text = text.Text.Replace("Cap3", tabDuLieu.Rows[0]["Cap3"].ToString());
                            }

                            if (text.Text.Contains("Cap4"))
                            {
                                text.Text = text.Text.Replace("Cap4", tabDuLieu.Rows[0]["Cap4"].ToString());
                            }
                            if (text.Text.Contains("ChucVu_NhanVien"))
                            {
                                text.Text = text.Text.Replace("ChucVu_NhanVien", tabDuLieu.Rows[0]["ChucVu_NhanVien"].ToString());
                            }
                            if (text.Text.Contains("ChucVu_QuanLy"))
                            {
                                text.Text = text.Text.Replace("ChucVu_QuanLy", tabDuLieu.Rows[0]["ChucVu_QuanLy"].ToString());
                            }
                            if (text.Text.Contains("ChucVu_LanhDao"))
                            {
                                text.Text = text.Text.Replace("ChucVu_LanhDao", tabDuLieu.Rows[0]["ChucVu_LanhDao"].ToString());
                            }
                            if (text.Text.Contains("txtChucVu_Khac"))
                            {
                                text.Text = text.Text.Replace("txtChucVu_Khac", tabDuLieu.Rows[0]["txtChucVu_Khac"].ToString());
                            }
                            if (text.Text.Contains("ChucVu_Khac"))
                            {
                                text.Text = text.Text.Replace("ChucVu_Khac", tabDuLieu.Rows[0]["ChucVu_Khac"].ToString());
                            }

                            if (text.Text.Contains("KN_Khong"))
                            {
                                text.Text = text.Text.Replace("KN_Khong", tabDuLieu.Rows[0]["KN_Khong"].ToString());
                            }
                            if (text.Text.Contains("KN_DuoiMotNam"))
                            {
                                text.Text = text.Text.Replace("KN_DuoiMotNam", tabDuLieu.Rows[0]["KN_DuoiMotNam"].ToString());
                            }
                            if (text.Text.Contains("KN_TuMotDenHai"))
                            {
                                text.Text = text.Text.Replace("KN_TuMotDenHai", tabDuLieu.Rows[0]["KN_TuMotDenHai"].ToString());
                            }
                            if (text.Text.Contains("KN_TuHaiDenNam"))
                            {
                                text.Text = text.Text.Replace("KN_TuHaiDenNam", tabDuLieu.Rows[0]["KN_TuHaiDenNam"].ToString());
                            }
                            if (text.Text.Contains("KN_TrenNam"))
                            {
                                text.Text = text.Text.Replace("KN_TrenNam", tabDuLieu.Rows[0]["KN_TrenNam"].ToString());
                            }
                            if (text.Text.Contains("UTMot_Tinh"))
                            {
                                text.Text = text.Text.Replace("UTMot_Tinh", tabDuLieu.Rows[0]["UTMot_Tinh"].ToString());
                            }
                            if (text.Text.Contains("UTMot_KCN"))
                            {
                                text.Text = text.Text.Replace("UTMot_KCN", tabDuLieu.Rows[0]["UTMot_KCN"].ToString());
                            }
                            if (text.Text.Contains("UTHai_Tinh"))
                            {
                                text.Text = text.Text.Replace("UTHai_Tinh", tabDuLieu.Rows[0]["UTHai_Tinh"].ToString());
                            }
                            if (text.Text.Contains("UTHai_KCN"))
                            {
                                text.Text = text.Text.Replace("UTHai_KCN", tabDuLieu.Rows[0]["UTHai_KCN"].ToString());
                            }
                            if (text.Text.Contains("HD_KhongXD"))
                            {
                                text.Text = text.Text.Replace("HD_KhongXD", tabDuLieu.Rows[0]["HD_KhongXD"].ToString());
                            }
                            if (text.Text.Contains("HD_XacDinhDuoi12Thang"))
                            {
                                text.Text = text.Text.Replace("HD_XacDinhDuoi12Thang", tabDuLieu.Rows[0]["HD_XacDinhDuoi12Thang"].ToString());
                            }
                            if (text.Text.Contains("HD_XacDinhTu12Thang"))
                            {
                                text.Text = text.Text.Replace("HD_XacDinhTu12Thang", tabDuLieu.Rows[0]["HD_XacDinhTu12Thang"].ToString());
                            }
                            if (text.Text.Contains("KhaNang_LamCa"))
                            {
                                text.Text = text.Text.Replace("KhaNang_LamCa", tabDuLieu.Rows[0]["KhaNang_LamCa"].ToString());
                            }
                            if (text.Text.Contains("KhaNang_DiCT"))
                            {
                                text.Text = text.Text.Replace("KhaNang_DiCT", tabDuLieu.Rows[0]["KhaNang_DiCT"].ToString());
                            }
                            if (text.Text.Contains("KhaNang_DiBietPhai"))
                            {
                                text.Text = text.Text.Replace("KhaNang_DiBietPhai", tabDuLieu.Rows[0]["KhaNang_DiBietPhai"].ToString());
                            }
                            if (text.Text.Contains("HTLV_ToanTG"))
                            {
                                text.Text = text.Text.Replace("HTLV_ToanTG", tabDuLieu.Rows[0]["HTLV_ToanTG"].ToString());
                            }
                            if (text.Text.Contains("HTLV_BanTG"))
                            {
                                text.Text = text.Text.Replace("HTLV_BanTG", tabDuLieu.Rows[0]["HTLV_BanTG"].ToString());
                            }
                            if (text.Text.Contains("MDLV_LauDai"))
                            {
                                text.Text = text.Text.Replace("MDLV_LauDai", tabDuLieu.Rows[0]["MDLV_LauDai"].ToString());
                            }
                            if (text.Text.Contains("MDLV_TamThoi"))
                            {
                                text.Text = text.Text.Replace("MDLV_TamThoi", tabDuLieu.Rows[0]["MDLV_TamThoi"].ToString());
                            }
                            if (text.Text.Contains("MDLV_Them"))
                            {
                                text.Text = text.Text.Replace("MDLV_Them", tabDuLieu.Rows[0]["MDLV_Them"].ToString());
                            }
                            if (text.Text.Contains("ML_Duoi5"))
                            {
                                text.Text = text.Text.Replace("ML_Duoi5", tabDuLieu.Rows[0]["ML_Duoi5"].ToString());
                            }
                            if (text.Text.Contains("ML_Tu5den10"))
                            {
                                text.Text = text.Text.Replace("ML_Tu5den10", tabDuLieu.Rows[0]["ML_Tu5den10"].ToString());
                            }
                            if (text.Text.Contains("ML_Tu10den20"))
                            {
                                text.Text = text.Text.Replace("ML_Tu10den20", tabDuLieu.Rows[0]["ML_Tu10den20"].ToString());
                            }
                            if (text.Text.Contains("ML_Tu20den50"))
                            {
                                text.Text = text.Text.Replace("ML_Tu20den50", tabDuLieu.Rows[0]["ML_Tu20den50"].ToString());
                            }
                            if (text.Text.Contains("ML_Tren50"))
                            {
                                text.Text = text.Text.Replace("ML_Tren50", tabDuLieu.Rows[0]["ML_Tren50"].ToString());
                            }
                            if (text.Text.Contains("txtML_LuongNgay"))
                            {
                                text.Text = text.Text.Replace("txtML_LuongNgay", tabDuLieu.Rows[0]["txtML_LuongNgay"].ToString());
                            }
                            if (text.Text.Contains("ML_LuongNgay"))
                            {
                                text.Text = text.Text.Replace("ML_LuongNgay", tabDuLieu.Rows[0]["ML_LuongNgay"].ToString());
                            }

                            if (text.Text.Contains("txtML_LuongGio"))
                            {
                                text.Text = text.Text.Replace("txtML_LuongGio", tabDuLieu.Rows[0]["txtML_LuongGio"].ToString());
                            }
                            if (text.Text.Contains("ML_LuongGio"))
                            {
                                text.Text = text.Text.Replace("ML_LuongGio", tabDuLieu.Rows[0]["ML_LuongGio"].ToString());
                            }

                            if (text.Text.Contains("ML_ThoaThuan"))
                            {
                                text.Text = text.Text.Replace("ML_ThoaThuan", tabDuLieu.Rows[0]["ML_ThoaThuan"].ToString());
                            }
                            if (text.Text.Contains("ML_HoaHong"))
                            {
                                text.Text = text.Text.Replace("ML_HoaHong", tabDuLieu.Rows[0]["ML_HoaHong"].ToString());
                            }
                            if (text.Text.Contains("HoTro_Mot"))
                            {
                                text.Text = text.Text.Replace("HoTro_Mot", tabDuLieu.Rows[0]["HoTro_Mot"].ToString());
                            }
                            if (text.Text.Contains("HoTro_Hai"))
                            {
                                text.Text = text.Text.Replace("HoTro_Hai", tabDuLieu.Rows[0]["HoTro_Hai"].ToString());
                            }
                            if (text.Text.Contains("HoTro_ba"))
                            {
                                text.Text = text.Text.Replace("HoTro_ba", tabDuLieu.Rows[0]["HoTro_ba"].ToString());
                            }
                            if (text.Text.Contains("HoTro_Tien"))
                            {
                                text.Text = text.Text.Replace("HoTro_Tien", tabDuLieu.Rows[0]["HoTro_Tien"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_DongBH"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_DongBH", tabDuLieu.Rows[0]["PhucLoi_DongBH"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_BHNhanTho"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_BHNhanTho", tabDuLieu.Rows[0]["PhucLoi_BHNhanTho"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_TroCap"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_TroCap", tabDuLieu.Rows[0]["PhucLoi_TroCap"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_NhaTre"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_NhaTre", tabDuLieu.Rows[0]["PhucLoi_NhaTre"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_XeDuaDon"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_XeDuaDon", tabDuLieu.Rows[0]["PhucLoi_XeDuaDon"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_HoTroDiLai"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_HoTroDiLai", tabDuLieu.Rows[0]["PhucLoi_HoTroDiLai"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_KyTucXa"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_KyTucXa", tabDuLieu.Rows[0]["PhucLoi_KyTucXa"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_HoTroNhaO"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_HoTroNhaO", tabDuLieu.Rows[0]["PhucLoi_HoTroNhaO"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_DaoTao"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_DaoTao", tabDuLieu.Rows[0]["PhucLoi_DaoTao"].ToString());
                            }

                            if (text.Text.Contains("PhucLoi_LoiDi"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_LoiDi", tabDuLieu.Rows[0]["PhucLoi_LoiDi"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_CoHoiThangTien"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_CoHoiThangTien", tabDuLieu.Rows[0]["PhucLoi_CoHoiThangTien"].ToString());
                            }
                            if (text.Text.Contains("txtPhucLoi_Khac"))
                            {
                                text.Text = text.Text.Replace("txtPhucLoi_Khac", tabDuLieu.Rows[0]["txtPhucLoi_Khac"].ToString());
                            }
                            if (text.Text.Contains("PhucLoi_Khac"))
                            {
                                text.Text = text.Text.Replace("PhucLoi_Khac", tabDuLieu.Rows[0]["PhucLoi_Khac"].ToString());
                            }

                            if (text.Text.Contains("NoiLV_TrongNha"))
                            {
                                text.Text = text.Text.Replace("NoiLV_TrongNha", tabDuLieu.Rows[0]["NoiLV_TrongNha"].ToString());
                            }
                            if (text.Text.Contains("NoiLV_NgoaiTroi"))
                            {
                                text.Text = text.Text.Replace("NoiLV_NgoaiTroi", tabDuLieu.Rows[0]["NoiLV_NgoaiTroi"].ToString());
                            }
                            if (text.Text.Contains("NoiLV_HoHop"))
                            {
                                text.Text = text.Text.Replace("NoiLV_HoHop", tabDuLieu.Rows[0]["NoiLV_HoHop"].ToString());
                            }
                            if (text.Text.Contains("TrongLuongNang_Duoi5Ky"))
                            {
                                text.Text = text.Text.Replace("TrongLuongNang_Duoi5Ky", tabDuLieu.Rows[0]["TrongLuongNang_Duoi5Ky"].ToString());
                            }
                            if (text.Text.Contains("TrongLuongNang_Tu5Den20"))
                            {
                                text.Text = text.Text.Replace("TrongLuongNang_Tu5Den20", tabDuLieu.Rows[0]["TrongLuongNang_Tu5Den20"].ToString());
                            }
                            if (text.Text.Contains("TrongLuongNang_Tren20Ky"))
                            {
                                text.Text = text.Text.Replace("TrongLuongNang_Tren20Ky", tabDuLieu.Rows[0]["TrongLuongNang_Tren20Ky"].ToString());
                            }
                            if (text.Text.Contains("DungHoacDiLai_KhongCo"))
                            {
                                text.Text = text.Text.Replace("DungHoacDiLai_KhongCo", tabDuLieu.Rows[0]["DungHoacDiLai_KhongCo"].ToString());
                            }
                            if (text.Text.Contains("DungHoacDiLai_TrungBinh"))
                            {
                                text.Text = text.Text.Replace("DungHoacDiLai_TrungBinh", tabDuLieu.Rows[0]["DungHoacDiLai_TrungBinh"].ToString());
                            }
                            if (text.Text.Contains("DungHoacDiLai_CanDungDiLai"))
                            {
                                text.Text = text.Text.Replace("DungHoacDiLai_CanDungDiLai", tabDuLieu.Rows[0]["DungHoacDiLai_CanDungDiLai"].ToString());
                            }
                            if (text.Text.Contains("NgheNoi_KhongCanThiet"))
                            {
                                text.Text = text.Text.Replace("NgheNoi_KhongCanThiet", tabDuLieu.Rows[0]["NgheNoi_KhongCanThiet"].ToString());
                            }
                            if (text.Text.Contains("NgheNoi_CoBan"))
                            {
                                text.Text = text.Text.Replace("NgheNoi_CoBan", tabDuLieu.Rows[0]["NgheNoi_CoBan"].ToString());
                            }
                            if (text.Text.Contains("NgheNoi_QuanTrong"))
                            {
                                text.Text = text.Text.Replace("NgheNoi_QuanTrong", tabDuLieu.Rows[0]["NgheNoi_QuanTrong"].ToString());
                            }
                            if (text.Text.Contains("ThiLuc_BinhThuong"))
                            {
                                text.Text = text.Text.Replace("ThiLuc_BinhThuong", tabDuLieu.Rows[0]["ThiLuc_BinhThuong"].ToString());
                            }
                            if (text.Text.Contains("ThiLuc_NhinDuocVatNho"))
                            {
                                text.Text = text.Text.Replace("ThiLuc_NhinDuocVatNho", tabDuLieu.Rows[0]["ThiLuc_NhinDuocVatNho"].ToString());
                            }
                            if (text.Text.Contains("ThaoTacTay_LapRapDoVatLon"))
                            {
                                text.Text = text.Text.Replace("ThaoTacTay_LapRapDoVatLon", tabDuLieu.Rows[0]["ThaoTacTay_LapRapDoVatLon"].ToString());
                            }
                            if (text.Text.Contains("ThaoTacTay_LapRapDoVatNho"))
                            {
                                text.Text = text.Text.Replace("ThaoTacTay_LapRapDoVatNho", tabDuLieu.Rows[0]["ThaoTacTay_LapRapDoVatNho"].ToString());
                            }
                            if (text.Text.Contains("ThaoTacTay_LapRapDoVatRatNho"))
                            {
                                text.Text = text.Text.Replace("ThaoTacTay_LapRapDoVatRatNho", tabDuLieu.Rows[0]["ThaoTacTay_LapRapDoVatRatNho"].ToString());
                            }


                            if (text.Text.Contains("CanDung2tay"))
                            {
                                text.Text = text.Text.Replace("CanDung2tay", tabDuLieu.Rows[0]["CanDung2tay"].ToString());
                            }
                            if (text.Text.Contains("DoiKhiCan2tay"))
                            {
                                text.Text = text.Text.Replace("DoiKhiCan2tay", tabDuLieu.Rows[0]["DoiKhiCan2tay"].ToString());
                            }
                            if (text.Text.Contains("ChiCan1Tay"))
                            {
                                text.Text = text.Text.Replace("ChiCan1Tay", tabDuLieu.Rows[0]["ChiCan1Tay"].ToString());
                            }
                            if (text.Text.Contains("TayTrai"))
                            {
                                text.Text = text.Text.Replace("TayTrai", tabDuLieu.Rows[0]["TayTrai"].ToString());
                            }
                            if (text.Text.Contains("TayPhai"))
                            {
                                text.Text = text.Text.Replace("TayPhai", tabDuLieu.Rows[0]["TayPhai"].ToString());
                            }
                            if (text.Text.Contains("LVNgay"))
                            {
                                text.Text = text.Text.Replace("LVNgay", tabDuLieu.Rows[0]["LVNgay"].ToString());
                            }
                            if (text.Text.Contains("LVSau"))
                            {
                                text.Text = text.Text.Replace("LVSau", tabDuLieu.Rows[0]["LVSau"].ToString());
                            }
                            if (text.Text.Contains("ThangLV"))
                            {
                                text.Text = text.Text.Replace("ThangLV", tabDuLieu.Rows[0]["ThangLV"].ToString());
                            }
                            if (text.Text.Contains("TrucTiep"))
                            {
                                text.Text = text.Text.Replace("TrucTiep", tabDuLieu.Rows[0]["TrucTiep"].ToString());
                            }
                            if (text.Text.Contains("QuaDienThoai"))
                            {
                                text.Text = text.Text.Replace("QuaDienThoai", tabDuLieu.Rows[0]["QuaDienThoai"].ToString());
                            }
                            if (text.Text.Contains("PhongVanOnline"))
                            {
                                text.Text = text.Text.Replace("PhongVanOnline", tabDuLieu.Rows[0]["PhongVanOnline"].ToString());
                            }
                            if (text.Text.Contains("NopCV"))
                            {
                                text.Text = text.Text.Replace("NopCV", tabDuLieu.Rows[0]["NopCV"].ToString());
                            }
                            if (text.Text.Contains("HoTenNguoiKy"))
                            {
                                text.Text = text.Text.Replace("HoTenNguoiKy", tabDuLieu.Rows[0]["HoTenNguoiKy"].ToString().ToUpper());
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
        public string XuatPhieuGioiThieu(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "PhieuGioiThieu" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/PhieuGioiThieu.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataSet dsData = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_Report_PhieuGioiThieu", para);
                DataTable tabDuLieu = dsData.Tables[0];
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

                            if (text.Text.Contains("THANHPHO"))
                            {
                                text.Text = text.Text.Replace("THANHPHO", DiaDanh.ToUpper());
                            }

                            if (text.Text.Contains("DiaDanh"))
                            {
                                text.Text = text.Text.Replace("DiaDanh", DiaDanh);
                            }

                            if (text.Text.Contains("TenTrungTamVL"))
                            {
                                text.Text = text.Text.Replace("TenTrungTamVL", NTSSession.GetDonVi().TenDonVi);
                            }

                            if (text.Text.Contains("NgayLap"))
                            {
                                text.Text = text.Text.Replace("NgayLap", DateTime.Now.Day.ToString());
                            }

                            if (text.Text.Contains("ThangLap"))
                            {
                                text.Text = text.Text.Replace("ThangLap", DateTime.Now.Month.ToString());
                            }
                            if (text.Text.Contains("NamLap"))
                            {
                                text.Text = text.Text.Replace("NamLap", DateTime.Now.Year.ToString());
                            }



                            if (text.Text.Contains("TenCongTy"))
                            {
                                text.Text = text.Text.Replace("TenCongTy", tabDuLieu.Rows[0]["TenCongTy"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("HoTen"))
                            {
                                text.Text = text.Text.Replace("HoTen", tabDuLieu.Rows[0]["HoTen"].ToString());
                            }
                            if (text.Text.Contains("NgaySinh"))
                            {
                                text.Text = text.Text.Replace("NgaySinh", tabDuLieu.Rows[0]["NgaySinh"].ToString());
                            }
                            if (text.Text.Contains("ThangSinh"))
                            {
                                text.Text = text.Text.Replace("ThangSinh", tabDuLieu.Rows[0]["ThangSinh"].ToString());
                            }
                            if (text.Text.Contains("NamSinh"))
                            {
                                text.Text = text.Text.Replace("NamSinh", tabDuLieu.Rows[0]["NamSinh"].ToString());
                            }

                            if (text.Text.Contains("LaNam"))
                            {
                                text.Text = text.Text.Replace("LaNam", tabDuLieu.Rows[0]["LaNam"].ToString());
                            }
                            if (text.Text.Contains("LaNu"))
                            {
                                text.Text = text.Text.Replace("LaNu", tabDuLieu.Rows[0]["LaNu"].ToString());
                            }

                            if (text.Text.Contains("SoCCCD"))
                            {
                                text.Text = text.Text.Replace("SoCCCD", tabDuLieu.Rows[0]["SoCCCD"].ToString());
                            }

                            if (text.Text.Contains("NgayCap"))
                            {
                                text.Text = text.Text.Replace("NgayCap", tabDuLieu.Rows[0]["NgayCap"].ToString());
                            }
                            if (text.Text.Contains("ThangCap"))
                            {
                                text.Text = text.Text.Replace("ThangCap", tabDuLieu.Rows[0]["ThangCap"].ToString());
                            }

                            if (text.Text.Contains("NamCap"))
                            {
                                text.Text = text.Text.Replace("NamCap", tabDuLieu.Rows[0]["NamCap"].ToString());
                            }
                            if (text.Text.Contains("NoiCap"))
                            {
                                text.Text = text.Text.Replace("NoiCap", tabDuLieu.Rows[0]["NoiCap"].ToString());
                            }
                            if (text.Text.Contains("KT"))
                            {
                                text.Text = text.Text.Replace("KT", tabDuLieu.Rows[0]["KT"].ToString());
                            }
                            if (text.Text.Contains("TS"))
                            {
                                text.Text = text.Text.Replace("TS", tabDuLieu.Rows[0]["TS"].ToString());
                            }
                            if (text.Text.Contains("SoBHXH"))
                            {
                                text.Text = text.Text.Replace("SoBHXH", tabDuLieu.Rows[0]["SoBHXH"].ToString());
                            }
                            if (text.Text.Contains("SoDT"))
                            {
                                text.Text = text.Text.Replace("SoDT", tabDuLieu.Rows[0]["SoDT"].ToString());
                            }
                            if (text.Text.Contains("DiaChiEmail"))
                            {
                                text.Text = text.Text.Replace("DiaChiEmail", tabDuLieu.Rows[0]["DiaChiEmail"].ToString());
                            }
                            if (text.Text.Contains("DiaChiThuongTru"))
                            {
                                text.Text = text.Text.Replace("DiaChiThuongTru", tabDuLieu.Rows[0]["DiaChiThuongTru"].ToString());
                            }
                            if (text.Text.Contains("DiaChiHienNay"))
                            {
                                text.Text = text.Text.Replace("DiaChiHienNay", tabDuLieu.Rows[0]["DiaChiHienNay"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoGiaoDucPhoThong"))
                            {
                                text.Text = text.Text.Replace("TrinhDoGiaoDucPhoThong", tabDuLieu.Rows[0]["TrinhDoGiaoDucPhoThong"].ToString());
                            }
                            if (text.Text.Contains("TrinhDoChuyenMon"))
                            {
                                text.Text = text.Text.Replace("TrinhDoChuyenMon", tabDuLieu.Rows[0]["TrinhDoChuyenMon"].ToString());
                            }
                            if (text.Text.Contains("ChuyenNganh"))
                            {
                                text.Text = text.Text.Replace("ChuyenNganh", tabDuLieu.Rows[0]["ChuyenNganh"].ToString());
                            }
                            if (text.Text.Contains("KinhNghiemLamViec"))
                            {
                                text.Text = text.Text.Replace("KinhNghiemLamViec", tabDuLieu.Rows[0]["KinhNghiemLamViec"].ToString());
                            }
                            if (text.Text.Contains("ViTriDuTuyen"))
                            {
                                text.Text = text.Text.Replace("ViTriDuTuyen", tabDuLieu.Rows[0]["ViTriDuTuyen"].ToString());
                            }
                            if (text.Text.Contains("NgayHetHan"))
                            {
                                text.Text = text.Text.Replace("NgayHetHan", tabDuLieu.Rows[0]["NgayHetHan"].ToString());
                            }
                            if (text.Text.Contains("ThangHetHan"))
                            {
                                text.Text = text.Text.Replace("ThangHetHan", tabDuLieu.Rows[0]["ThangHetHan"].ToString());
                            }
                            if (text.Text.Contains("NamHetHan"))
                            {
                                text.Text = text.Text.Replace("NamHetHan", tabDuLieu.Rows[0]["NamHetHan"].ToString());
                            }
                            if (text.Text.Contains("ChuKyNLD"))
                            {
                                text.Text = text.Text.Replace("ChuKyNLD", tabDuLieu.Rows[0]["ChuKyNLD"].ToString());
                            }
                        }
                    }
                    wordDoc.MainDocumentPart.Document.Save();
                    wordDoc.Close();
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/" + fileName;
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
    }
}