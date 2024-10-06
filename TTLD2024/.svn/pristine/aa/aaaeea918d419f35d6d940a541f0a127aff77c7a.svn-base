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
using ClosedXML.Excel;
using A = DocumentFormat.OpenXml.Drawing;
using DW = DocumentFormat.OpenXml.Drawing.Wordprocessing;
using PIC = DocumentFormat.OpenXml.Drawing.Pictures;
using ClosedXML.Excel;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace TTLD2024.Areas.QuanLy.Controllers
{
    public class ThuThapCungLaoDongBienDongController : Controller
    {
        // GET: QuanLy/ThuThapCungLaoDongBienDong
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
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5])),
                    new SqlParameter("@DenNgay", DungChung.NormalizationDateTime(data[6])),
                    new SqlParameter("@HoGiaDinhID_TimKiem_us", DungChung.NormalizationGuid(data[7]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllCungLaoDongBienDong", para).Tables[0];
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
        public string LoadDuLieuThanhVienBySoCCCD(string soCCCD)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ThanhVienHoGDID", DungChung.NormalizationString(soCCCD)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThanhVienTheoHGD_CLD", para).Tables[0];
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
                // Kiểm tra tồn tại của phiếu thu thập
                int currentYear = DateTime.Now.Year;
                if (data[0].ToString() == "them")
                {
                    SqlParameter[] paraKT = {
                        new SqlParameter("@SoCCCD", DungChung.NormalizationString(data[50].ToString())),
                    };
                    DataTable KiemTraCLD = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiPhieuThuThapCungLaoDong", paraKT).Tables[0];
                    if (KiemTraCLD.Rows.Count > 0)
                    {
                        ep.Logs = "1";
                        ep.Msg = "Số CMND/CCCD/Số định danh đã được thu thập!";
                        return JSonHelper.ToJson(ep);
                    }
                }

                if (data[51].ToString() == "sua")
                {
                    ep.Logs = "2";
                    ep.Msg = "Bạn có thật sự muốn cập nhật thông tin đã thay đổi của đối tượng " + data[55].ToString() + " không?";
                    return JSonHelper.ToJson(ep);
                }

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ThuThapCungLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@NgayThuThap",DungChung.NormalizationDateTime( data[2].ToString())),
                    new SqlParameter("@DoiTuongUuTienID_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TenDanToc_us", data[4].ToString()),
                    new SqlParameter("@LoaiBHXH_us", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@chkBHYT_us", DungChung.NormalizationBoolean(data[6].ToString())),
                    new SqlParameter("@chkBHTN_us", DungChung.NormalizationBoolean(data[7].ToString())),
                    new SqlParameter("@MaSoBHXH_us", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@TinhID_TT_us", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@HuyenID_TT_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@XaID_TT_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@ThonID_TT_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@SoNha_TT_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@DiaChiThuongTruDT_us", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@TinhID_HN_us", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@HuyenID_HN_us", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@XaID_HN_us", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@ThonID_HN_us", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@SoNha_HN_us", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@DiaChiThuongTruHN_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@HoSoKemTheo_USDangKy", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@TrinhDoPTID_us", DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@TrinhDoCMKTID_us", DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@LinhVucDaoTaoID_us", DungChung.NormalizationGuid(data[24].ToString())),
                    new SqlParameter("@ChuyenNganhDTID_us", DungChung.NormalizationGuid(data[25].ToString())),
                    new SqlParameter("@ViTheViecLamID_us", DungChung.NormalizationGuid(data[26].ToString())),
                    new SqlParameter("@CongViecDangLamID_us", DungChung.NormalizationGuid(data[27].ToString())),
                    new SqlParameter("@ViTriViecLamID_us", DungChung.NormalizationGuid(data[28].ToString())),
                    new SqlParameter("@HopDongLaoDong", DungChung.NormalizationBoolean(data[29].ToString())),
                    new SqlParameter("@NgayKy", DungChung.NormalizationDateTime(data[30].ToString())),
                    new SqlParameter("@LoaiHopDongLaoDongID", DungChung.NormalizationGuid(data[31].ToString())),
                    new SqlParameter("@NoiLamViec", DungChung.NormalizationString(data[32].ToString())),
                    new SqlParameter("@NoiLVNuocNgoai", DungChung.NormalizationBoolean(data[33].ToString())),
                    new SqlParameter("@TinhID_NLV", DungChung.NormalizationGuid(data[34].ToString())),
                    new SqlParameter("@HuyenID_NLV", DungChung.NormalizationGuid(data[35].ToString())),
                    new SqlParameter("@XaID_NLV", DungChung.NormalizationGuid(data[36].ToString())),
                    new SqlParameter("@ThonID_NLV", DungChung.NormalizationGuid(data[37].ToString())),
                    new SqlParameter("@SoNha_NLV", DungChung.NormalizationString(data[38].ToString())),
                    new SqlParameter("@LoaiHinhNLVID", DungChung.NormalizationGuid(data[39].ToString())),
                    new SqlParameter("@QuocGiaID_us_NLV", DungChung.NormalizationGuid(data[40].ToString())),
                    new SqlParameter("@DiaChiNoiLamViec", DungChung.NormalizationString(data[41].ToString())),
                    new SqlParameter("@ThatNghiep", DungChung.NormalizationNumber(data[42].ToString())),
                    new SqlParameter("@ThoiGianThatnghiep", DungChung.NormalizationGuid(data[43].ToString())),
                    new SqlParameter("@CongViecTruocKhiThatNghiep", DungChung.NormalizationGuid(data[44].ToString())),
                    new SqlParameter("@NguyenNhanKTGHDKTID", DungChung.NormalizationGuid(data[45].ToString())),
                    new SqlParameter("@NhuCauDaoTaoViecLam", DungChung.NormalizationString(data[46].ToString())),
                    new SqlParameter("@NguoiCungCapThongTin", DungChung.NormalizationString(data[47].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[48].ToString())),
                    new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(data[49].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationString(NTSSession.GetNamSudung())),
                    new SqlParameter("@KinhDoCungLaoDong", DungChung.NormalizationString(data[56].ToString())),
                    new SqlParameter("@ViDoCungLaoDong", DungChung.NormalizationString(data[57].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCungLaoDongBanDau", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "CungLaoDong";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "CungLaoDong";
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
        public string LuuThongTinDoiTuong(object[] data)
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
                    new SqlParameter("@ThanhVienHoGDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@MoiQuanHeIDDT",DungChung.NormalizationGuid( data[3].ToString())),
                    new SqlParameter("@HoVaTenDT", data[4].ToString()),
                    new SqlParameter("@GioiTinhDT", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@NgaySinhDT", DungChung.NormalizationDateTime(data[6].ToString())),
                    new SqlParameter("@TinhID_NS", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@DanTocIDDT", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@TonGiaoIDDT", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@QuocGiaIDDT", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@SoCMND_DoiTuong", DungChung.NormalizationString(data[11].ToString())),
                    new SqlParameter("@NgayCapDT", DungChung.NormalizationDateTime(data[12].ToString())),
                    new SqlParameter("@NoiCapDT", DungChung.NormalizationGuid(data[13].ToString())),
                    new SqlParameter("@SoNhaTT", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonTT", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@DiaBanHCID_XaTT", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenTT", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhTT", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@DiaChiCuTheTT", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonHT", DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@DiaBanHCID_XaHT", DungChung.NormalizationGuid(data[21].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenHT", DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhHT", DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@SoNhaHT", DungChung.NormalizationString(data[24].ToString())),
                    new SqlParameter("@DiaChiCuTheHT", DungChung.NormalizationString(data[25].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDoiTuongCLD", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "ThanhVienHoGD";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "ThanhVienHoGD";
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
        public string ThemMoiDoiTuongCungLaoDong(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                // Kiểm tra tồn tại của phiếu thu thập
                int currentYear = DateTime.Now.Year;
                if (data[0].ToString() == "them")
                {
                    SqlParameter[] paraKT = {
                        new SqlParameter("@SoCCCD", DungChung.NormalizationString(data[50].ToString())),
                    };
                    DataTable KiemTraCLD = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiPhieuThuThapCungLaoDong", paraKT).Tables[0];
                    if (KiemTraCLD.Rows.Count > 0)
                    {
                        ep.Logs = "1";
                        ep.Msg = "Số CMND/CCCD/Số định danh đã được thu thập!";
                        return JSonHelper.ToJson(ep);
                    }
                }

                if (data[51].ToString() == "sua")
                {
                    ep.Logs = "2";
                    ep.Msg = "Bạn có thật sự muốn cập nhật thông tin đã thay đổi của đối tượng " + data[55].ToString() + " không?";
                    return JSonHelper.ToJson(ep);
                }
                SqlParameter[] paraDT = {
                    new SqlParameter("@Loai", data[56].ToString()),
                    new SqlParameter("@ThanhVienHoGDID", DungChung.NormalizationGuid(data[57].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[58].ToString())),
                    new SqlParameter("@MoiQuanHeIDDT",DungChung.NormalizationGuid( data[59].ToString())),
                    new SqlParameter("@HoVaTenDT", data[60].ToString()),
                    new SqlParameter("@GioiTinhDT", DungChung.NormalizationGuid(data[61].ToString())),
                    new SqlParameter("@NgaySinhDT", DungChung.NormalizationDateTime(data[62].ToString())),
                    new SqlParameter("@TinhID_NS", DungChung.NormalizationGuid(data[63].ToString())),
                    new SqlParameter("@DanTocIDDT", DungChung.NormalizationGuid(data[64].ToString())),
                    new SqlParameter("@TonGiaoIDDT", DungChung.NormalizationGuid(data[65].ToString())),
                    new SqlParameter("@QuocGiaIDDT", DungChung.NormalizationGuid(data[66].ToString())),
                    new SqlParameter("@SoCMND_DoiTuong", DungChung.NormalizationString(data[67].ToString())),
                    new SqlParameter("@NgayCapDT", DungChung.NormalizationDateTime(data[68].ToString())),
                    new SqlParameter("@NoiCapDT", DungChung.NormalizationGuid(data[69].ToString())),
                    new SqlParameter("@SoNhaTT", DungChung.NormalizationString(data[70].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonTT", DungChung.NormalizationGuid(data[71].ToString())),
                    new SqlParameter("@DiaBanHCID_XaTT", DungChung.NormalizationGuid(data[72].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenTT", DungChung.NormalizationGuid(data[73].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhTT", DungChung.NormalizationGuid(data[74].ToString())),
                    new SqlParameter("@DiaChiCuTheTT", DungChung.NormalizationString(data[75].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonHT", DungChung.NormalizationGuid(data[76].ToString())),
                    new SqlParameter("@DiaBanHCID_XaHT", DungChung.NormalizationGuid(data[77].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenHT", DungChung.NormalizationGuid(data[78].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhHT", DungChung.NormalizationGuid(data[79].ToString())),
                    new SqlParameter("@SoNhaHT", DungChung.NormalizationString(data[80].ToString())),
                    new SqlParameter("@DiaChiCuTheHT", DungChung.NormalizationString(data[81].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieuDT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDoiTuongCLD", paraDT);
                string DoiTuongID = duLieuDT.Tables[0].Rows[0]["ThanhVienHoGDID"].ToString();

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ThuThapCungLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@NgayThuThap",DungChung.NormalizationDateTime( data[2].ToString())),
                    new SqlParameter("@DoiTuongUuTienID_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TenDanToc_us", data[4].ToString()),
                    new SqlParameter("@LoaiBHXH_us", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@chkBHYT_us", DungChung.NormalizationBoolean(data[6].ToString())),
                    new SqlParameter("@chkBHTN_us", DungChung.NormalizationBoolean(data[7].ToString())),
                    new SqlParameter("@MaSoBHXH_us", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@TinhID_TT_us", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@HuyenID_TT_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@XaID_TT_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@ThonID_TT_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@SoNha_TT_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@DiaChiThuongTruDT_us", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@TinhID_HN_us", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@HuyenID_HN_us", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@XaID_HN_us", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@ThonID_HN_us", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@SoNha_HN_us", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@DiaChiThuongTruHN_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@HoSoKemTheo_USDangKy", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@TrinhDoPTID_us", DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@TrinhDoCMKTID_us", DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@LinhVucDaoTaoID_us", DungChung.NormalizationGuid(data[24].ToString())),
                    new SqlParameter("@ChuyenNganhDTID_us", DungChung.NormalizationGuid(data[25].ToString())),
                    new SqlParameter("@ViTheViecLamID_us", DungChung.NormalizationGuid(data[26].ToString())),
                    new SqlParameter("@CongViecDangLamID_us", DungChung.NormalizationGuid(data[27].ToString())),
                    new SqlParameter("@ViTriViecLamID_us", DungChung.NormalizationGuid(data[28].ToString())),
                    new SqlParameter("@HopDongLaoDong", DungChung.NormalizationBoolean(data[29].ToString())),
                    new SqlParameter("@NgayKy", DungChung.NormalizationDateTime(data[30].ToString())),
                    new SqlParameter("@LoaiHopDongLaoDongID", DungChung.NormalizationGuid(data[31].ToString())),
                    new SqlParameter("@NoiLamViec", DungChung.NormalizationString(data[32].ToString())),
                    new SqlParameter("@NoiLVNuocNgoai", DungChung.NormalizationBoolean(data[33].ToString())),
                    new SqlParameter("@TinhID_NLV", DungChung.NormalizationGuid(data[34].ToString())),
                    new SqlParameter("@HuyenID_NLV", DungChung.NormalizationGuid(data[35].ToString())),
                    new SqlParameter("@XaID_NLV", DungChung.NormalizationGuid(data[36].ToString())),
                    new SqlParameter("@ThonID_NLV", DungChung.NormalizationGuid(data[37].ToString())),
                    new SqlParameter("@SoNha_NLV", DungChung.NormalizationString(data[38].ToString())),
                    new SqlParameter("@LoaiHinhNLVID", DungChung.NormalizationGuid(data[39].ToString())),
                    new SqlParameter("@QuocGiaID_us_NLV", DungChung.NormalizationGuid(data[40].ToString())),
                    new SqlParameter("@DiaChiNoiLamViec", DungChung.NormalizationString(data[41].ToString())),
                    new SqlParameter("@ThatNghiep", DungChung.NormalizationNumber(data[42].ToString())),
                    new SqlParameter("@ThoiGianThatnghiep", DungChung.NormalizationGuid(data[43].ToString())),
                    new SqlParameter("@CongViecTruocKhiThatNghiep", DungChung.NormalizationGuid(data[44].ToString())),
                    new SqlParameter("@NguyenNhanKTGHDKTID", DungChung.NormalizationGuid(data[45].ToString())),
                    new SqlParameter("@NhuCauDaoTaoViecLam", DungChung.NormalizationString(data[46].ToString())),
                    new SqlParameter("@NguoiCungCapThongTin", DungChung.NormalizationString(data[47].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[48].ToString())),
                    new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(DoiTuongID)),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationString(NTSSession.GetNamSudung())),
                     new SqlParameter("@KinhDoCungLaoDong", DungChung.NormalizationString(data[83].ToString())),
                    new SqlParameter("@ViDoCungLaoDong", DungChung.NormalizationString(data[84].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCungLaoDongBanDau", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "CungLaoDong";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "CungLaoDong";
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
        public string XoaDuLieuCungLaoDong(string id)
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_CungLaoDongBanDau", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "CungLaoDong";
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCungLaoDongBienDongByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuXem(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCungLaoDongBanDauView", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XuatMau01(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mau01_TT01_2022_" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/TT01_2022_TT_BLDTBXH/Mau01.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/CungLaoDong/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/CungLaoDong/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_Mau01_TT01_2022", para).Tables[0];
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
                    if (duLieu.Rows.Count > 0)
                    {
                        foreach (var text in body.Descendants<Text>())
                        {

                            // Người thất nghiệp
                            if (duLieu.Rows[0]["CBGLV"].ToString() != "" || duLieu.Rows[0]["DaTungLV"].ToString() != ""
                                || duLieu.Rows[0]["Duoi3Thang"].ToString() != "" || duLieu.Rows[0]["Duoi1Nam"].ToString() != ""
                                || duLieu.Rows[0]["Tren1Nam"].ToString() != "")
                            {
                                text.Text = text.Text.Replace("TTThatNghiep", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("TTThatNghiep", "");
                            }

                            if (text.Text.Contains("HOVATEN"))
                            {
                                text.Text = text.Text.Replace("HOVATEN", duLieu.Rows[0]["HoVaTen"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("tenTinh"))
                            {
                                text.Text = text.Text.Replace("tenTinh", duLieu.Rows[0]["TinhTT"].ToString());
                            }
                            if (text.Text.Contains("tenHuyen"))
                            {
                                text.Text = text.Text.Replace("tenHuyen", duLieu.Rows[0]["HuyenTT"].ToString());
                            }
                            if (text.Text.Contains("tenXa"))
                            {
                                text.Text = text.Text.Replace("tenXa", duLieu.Rows[0]["XaTT"].ToString());
                            }
                            if (text.Text.Contains("noiDKThuongTru"))
                            {
                                text.Text = text.Text.Replace("noiDKThuongTru", duLieu.Rows[0]["DiaChiCuTheTT"].ToString());
                            }
                            if (text.Text.Contains("noiOHienTai"))
                            {
                                text.Text = text.Text.Replace("noiOHienTai", duLieu.Rows[0]["DiaChiCuTheHT"].ToString());
                            }
                            if (text.Text.Contains("congViecDangLam"))
                            {
                                text.Text = text.Text.Replace("congViecDangLam", duLieu.Rows[0]["TenCongViecCuTheDL"].ToString());
                            }
                            if (text.Text.Contains("noiLamViec"))
                            {
                                text.Text = text.Text.Replace("noiLamViec", duLieu.Rows[0]["TenDNNoiLV"].ToString());
                            }
                            if (text.Text.Contains("tenDanTocKhac"))
                            {
                                text.Text = text.Text.Replace("tenDanTocKhac", duLieu.Rows[0]["TenDanToc"].ToString());
                            }
                            if (text.Text.Contains("tenChuyenNganhDaoTao"))
                            {
                                text.Text = text.Text.Replace("tenChuyenNganhDaoTao", duLieu.Rows[0]["TenChuyenNganhDaoTao"].ToString());
                            }

                            if (text.Text.Contains("mamnon"))
                            {
                                text.Text = text.Text.Replace("mamnon", duLieu.Rows[0]["MamNon"].ToString());
                            }
                            if (text.Text.Contains("tieuhoc"))
                            {
                                text.Text = text.Text.Replace("tieuhoc", duLieu.Rows[0]["TieuHoc"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("trunghoccs"))
                            {
                                text.Text = text.Text.Replace("trunghoccs", duLieu.Rows[0]["TrungHocCS"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("trunghocpt"))
                            {
                                text.Text = text.Text.Replace("trunghocpt", duLieu.Rows[0]["TrungHocPT"].ToString().ToUpper());
                            }

                            // Nguyên nhân KTGHDKT
                            if (duLieu.Rows[0]["LD_DiHoc"].ToString() != "" || duLieu.Rows[0]["LD_NghiHuu"].ToString() != "" || duLieu.Rows[0]["LD_NoiTro"].ToString() != "" ||
                                duLieu.Rows[0]["LD_KhuyetTat"].ToString() != "" || duLieu.Rows[0]["LD_Chet"].ToString() != "" || duLieu.Rows[0]["LD_Khac"].ToString() != "")
                            {
                                text.Text = text.Text.Replace("TTKThamGia", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("TTKThamGia", "");
                            }
                            if (text.Text.Contains("LD_DiHoc"))
                            {
                                text.Text = text.Text.Replace("LD_DiHoc", duLieu.Rows[0]["LD_DiHoc"].ToString());
                            }
                            if (text.Text.Contains("LD_NghiHuu"))
                            {
                                text.Text = text.Text.Replace("LD_NghiHuu", duLieu.Rows[0]["LD_NghiHuu"].ToString());
                            }
                            if (text.Text.Contains("LD_NoiTro"))
                            {
                                text.Text = text.Text.Replace("LD_NoiTro", duLieu.Rows[0]["LD_NoiTro"].ToString());
                            }
                            if (text.Text.Contains("LD_KhuyetTat"))
                            {
                                text.Text = text.Text.Replace("LD_KhuyetTat", duLieu.Rows[0]["LD_KhuyetTat"].ToString());
                            }
                            if (text.Text.Contains("LD_Chet"))
                            {
                                text.Text = text.Text.Replace("LD_Chet", duLieu.Rows[0]["LD_Chet"].ToString());
                            }
                            if (text.Text.Contains("LD_Khac"))
                            {
                                text.Text = text.Text.Replace("LD_Khac", duLieu.Rows[0]["LD_Khac"].ToString());
                            }

                            if (text.Text.Contains("ns1"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns1", ngaySinh[0].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns1", "");
                                }
                            }
                            if (text.Text.Contains("ns2"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns2", ngaySinh[1].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns2", "");
                                }
                            }
                            if (text.Text.Contains("ns3"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns3", ngaySinh[3].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns3", "");
                                }
                            }
                            if (text.Text.Contains("ns4"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns4", ngaySinh[4].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns4", "");
                                }
                            }
                            if (text.Text.Contains("ns5"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns5", ngaySinh[6].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns5", "");
                                }
                            }
                            if (text.Text.Contains("ns6"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns6", ngaySinh[7].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns6", "");
                                }
                            }
                            if (text.Text.Contains("ns7"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns7", ngaySinh[8].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns7", "");
                                }
                            }
                            if (text.Text.Contains("ns8"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns8", ngaySinh[9].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns8", "");
                                }
                            }

                            #region xử lý đối tượng ưu tiên
                            if (text.Text.Contains("khuyettatt"))
                            {
                                text.Text = text.Text.Replace("khuyettatt", duLieu.Rows[0]["KhuyetTat"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("hongheo"))
                            {
                                text.Text = text.Text.Replace("hongheo", duLieu.Rows[0]["HoNgheo"].ToString());
                            }
                            if (text.Text.Contains("thieuso"))
                            {
                                text.Text = text.Text.Replace("thieuso", duLieu.Rows[0]["ThieuSo"].ToString());
                            }
                            #endregion

                            #region xử lý CMND, CCCD
                            if (text.Text.Contains("cm1"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm1", CMND[0].ToString());
                            }
                            if (text.Text.Contains("cm2"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm2", CMND[1].ToString());
                            }
                            if (text.Text.Contains("cm3"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm3", CMND[2].ToString());
                            }
                            if (text.Text.Contains("cm4"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm4", CMND[3].ToString());
                            }
                            if (text.Text.Contains("cm5"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm5", CMND[4].ToString());
                            }
                            if (text.Text.Contains("cm6"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm6", CMND[5].ToString());
                            }
                            if (text.Text.Contains("cm7"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm7", CMND[6].ToString());
                            }
                            if (text.Text.Contains("cm8"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm8", CMND[7].ToString());
                            }
                            if (text.Text.Contains("cm9"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("cm9", CMND[8].ToString());
                            }
                            if (text.Text.Contains("10cm"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("10cm", CMND[9].ToString());
                            }
                            if (text.Text.Contains("11cm"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("11cm", CMND[10].ToString());
                            }
                            if (text.Text.Contains("12cm"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("12cm", CMND[11].ToString());
                            }
                            #endregion

                            if (text.Text.Contains("TuLam"))
                            {
                                text.Text = text.Text.Replace("TuLam", duLieu.Rows[0]["TuLam"].ToString());
                            }
                            if (text.Text.Contains("LamCongAnLuong"))
                            {
                                text.Text = text.Text.Replace("LamCongAnLuong", duLieu.Rows[0]["LamCongAnLuong"].ToString());
                            }
                            if (text.Text.Contains("ChuCoSo"))
                            {
                                text.Text = text.Text.Replace("ChuCoSo", duLieu.Rows[0]["ChuCoSo"].ToString());
                            }
                            if (text.Text.Contains("LDGiaDinh"))
                            {
                                text.Text = text.Text.Replace("LDGiaDinh", duLieu.Rows[0]["LDGiaDinh"].ToString());
                            }

                            // Người có việc làm
                            if (duLieu.Rows[0]["TuLam"].ToString() != "" || duLieu.Rows[0]["LamCongAnLuong"].ToString() != ""
                                || duLieu.Rows[0]["ChuCoSo"].ToString() != "" || duLieu.Rows[0]["LDGiaDinh"].ToString() != ""
                                || duLieu.Rows[0]["TenCongViecCuTheDL"].ToString() != "" || duLieu.Rows[0]["TenDNNoiLV"].ToString() != ""
                                )
                            {
                                text.Text = text.Text.Replace("CoViecLam", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("CoViecLam", "");
                            }

                            if (text.Text.Contains("CBGLV"))
                            {
                                text.Text = text.Text.Replace("CBGLV", duLieu.Rows[0]["CBGLV"].ToString());
                            }
                            if (text.Text.Contains("DaTungLV"))
                            {
                                text.Text = text.Text.Replace("DaTungLV", duLieu.Rows[0]["DaTungLV"].ToString());
                            }

                            if (text.Text.Contains("Duoi3Thang"))
                            {
                                text.Text = text.Text.Replace("Duoi3Thang", duLieu.Rows[0]["Duoi3Thang"].ToString());
                            }
                            if (text.Text.Contains("Duoi1Nam"))
                            {
                                text.Text = text.Text.Replace("Duoi1Nam", duLieu.Rows[0]["Duoi1Nam"].ToString());
                            }
                            if (text.Text.Contains("Tren1Nam"))
                            {
                                text.Text = text.Text.Replace("Tren1Nam", duLieu.Rows[0]["Tren1Nam"].ToString());
                            }


                            if (text.Text.Contains("ChuaQuaDT"))
                            {
                                text.Text = text.Text.Replace("ChuaQuaDT", duLieu.Rows[0]["ChuaQuaDT"].ToString());
                            }
                            if (text.Text.Contains("CNKTKhongCoBang"))
                            {
                                text.Text = text.Text.Replace("CNKTKhongCoBang", duLieu.Rows[0]["CNKTKhongCoBang"].ToString());
                            }
                            if (text.Text.Contains("CCNgheD3Thang"))
                            {
                                text.Text = text.Text.Replace("CCNgheD3Thang", duLieu.Rows[0]["CCNgheDuoi3Thang"].ToString());
                            }
                            if (text.Text.Contains("SoCap"))
                            {
                                text.Text = text.Text.Replace("SoCap", duLieu.Rows[0]["SoCap"].ToString());
                            }
                            if (text.Text.Contains("TrungCap"))
                            {
                                text.Text = text.Text.Replace("TrungCap", duLieu.Rows[0]["TrungCap"].ToString());
                            }
                            if (text.Text.Contains("CaoDang"))
                            {
                                text.Text = text.Text.Replace("CaoDang", duLieu.Rows[0]["CaoDang"].ToString());
                            }
                            if (text.Text.Contains("DaiHoc"))
                            {
                                text.Text = text.Text.Replace("DaiHoc", duLieu.Rows[0]["DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("CaoHoc"))
                            {
                                text.Text = text.Text.Replace("CaoHoc", duLieu.Rows[0]["CaoHoc"].ToString());
                            }
                            if (text.Text.Contains("gtnam"))
                            {
                                if (duLieu.Rows[0]["TenGioiTinh"].ToString().ToUpper() == "NAM")
                                {
                                    text.Text = text.Text.Replace("gtnam", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("gtnam", "");
                                }
                            }
                            if (text.Text.Contains("gtnu"))
                            {
                                if (duLieu.Rows[0]["TenGioiTinh"].ToString().ToUpper() == "NỮ")
                                {
                                    text.Text = text.Text.Replace("gtnu", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("gtnu", "");
                                }
                            }
                            if (text.Text.Contains("BaoHiemXaHoi"))
                            {
                                text.Text = text.Text.Replace("BaoHiemXaHoi", duLieu.Rows[0]["BaoHiemXaHoi"].ToString());
                            }
                            if (text.Text.Contains("ThamGiaTuNguyen"))
                            {
                                text.Text = text.Text.Replace("ThamGiaTuNguyen", duLieu.Rows[0]["ThamGiaTuNguyen"].ToString());
                            }
                            if (text.Text.Contains("BaoHiemYTe"))
                            {
                                text.Text = text.Text.Replace("BaoHiemYTe", duLieu.Rows[0]["BaoHiemYTe"].ToString());
                            }
                            if (text.Text.Contains("BaoHiemTaiNan"))
                            {
                                text.Text = text.Text.Replace("BaoHiemTaiNan", duLieu.Rows[0]["BaoHiemTaiNan"].ToString());
                            }

                            ////thêm ngày thu thập và người ký
                            if (text.Text.Contains("NgayThuThap"))
                            {
                                text.Text = text.Text.Replace("NgayThuThap", duLieu.Rows[0]["NgayThuThap"].ToString() == "0" ? "..." : duLieu.Rows[0]["NgayThuThap"].ToString());
                            }
                            if (text.Text.Contains("ThangThuThap"))
                            {
                                text.Text = text.Text.Replace("ThangThuThap", duLieu.Rows[0]["ThangThuThap"].ToString() == "0" ? "..." : duLieu.Rows[0]["ThangThuThap"].ToString());
                            }
                            if (text.Text.Contains("NamThuThap"))
                            {
                                text.Text = text.Text.Replace("NamThuThap", duLieu.Rows[0]["NamThuThap"].ToString() == "0" ? "..." : duLieu.Rows[0]["NamThuThap"].ToString());
                            }

                            if (text.Text.Contains("NguoiKy"))
                            {
                                text.Text = text.Text.Replace("NguoiKy", duLieu.Rows[0]["NguoiKy"].ToString().ToUpper());
                            }
                        }
                        var tables = mainPart.Document.Descendants<DocumentFormat.OpenXml.Wordprocessing.Table>().ToList();
                        int indexBangCuoi = tables.Count - 1;
                        string imageFile = Server.MapPath(duLieu.Rows[0]["UrlChuKy"].ToString().Replace("*", ""));
                        if (System.IO.File.Exists(imageFile))
                        {
                            ImagePart imagePart = mainPart.AddImagePart(ImagePartType.Jpeg);
                            using (FileStream stream = new FileStream(imageFile, FileMode.Open))
                            {
                                imagePart.FeedData(stream);
                            }
                            var tr11 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                            var td11 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                            AddImageToCell(td11, mainPart.GetIdOfPart(imagePart));
                            tr11.Append(td11);
                            tables[indexBangCuoi].Append(tr11);
                        }
                        wordDoc.MainDocumentPart.Document.Save();
                        wordDoc.Close();
                    }
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/CungLaoDong/" + fileName;
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
        public string XuatMau03(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mau03_TT11_2022_" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/TT11_2022_TT_BLDTBXH/Mau03.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/CungLaoDong/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/CungLaoDong/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_Mau03_TT11_2022", para).Tables[0];
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
                    if (duLieu.Rows.Count > 0)
                    {
                        foreach (var text in body.Descendants<Text>())
                        {
                            // Người thất nghiệp
                            if (duLieu.Rows[0]["CBGLV"].ToString() != "" || duLieu.Rows[0]["DaTungLV"].ToString() != ""
                                || duLieu.Rows[0]["D3Thang"].ToString() != "" || duLieu.Rows[0]["D1Nam"].ToString() != ""
                                || duLieu.Rows[0]["T1Nam"].ToString() != "")
                            {
                                text.Text = text.Text.Replace("ThatNghiep", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("ThatNghiep", "");
                            }
                            if (text.Text.Contains("gtnam"))
                            {
                                if (duLieu.Rows[0]["TenGioiTinh"].ToString().ToUpper() == "NAM")
                                {
                                    text.Text = text.Text.Replace("gtnam", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("gtnam", "");
                                }
                            }
                            if (text.Text.Contains("gtnu"))
                            {
                                if (duLieu.Rows[0]["TenGioiTinh"].ToString().ToUpper() == "NỮ")
                                {
                                    text.Text = text.Text.Replace("gtnu", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("gtnu", "");
                                }
                            }
                            if (text.Text.Contains("ns1"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns1", ngaySinh[0].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns1", "");
                                }
                            }
                            if (text.Text.Contains("ns2"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns2", ngaySinh[1].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns2", "");
                                }
                            }
                            if (text.Text.Contains("ns3"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns3", ngaySinh[3].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns3", "");
                                }
                            }
                            if (text.Text.Contains("ns4"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns4", ngaySinh[4].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns4", "");
                                }
                            }
                            if (text.Text.Contains("ns5"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns5", ngaySinh[6].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns5", "");
                                }
                            }
                            if (text.Text.Contains("ns6"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns6", ngaySinh[7].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns6", "");
                                }
                            }
                            if (text.Text.Contains("ns7"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns7", ngaySinh[8].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns7", "");
                                }
                            }
                            if (text.Text.Contains("ns8"))
                            {
                                string ngaySinh = duLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns8", ngaySinh[9].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns8", "");
                                }
                            }

                            if (text.Text.Contains("HOVATEN"))
                            {
                                text.Text = text.Text.Replace("HOVATEN", duLieu.Rows[0]["HoVaTen"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("tenTinh"))
                            {
                                text.Text = text.Text.Replace("tenTinh", duLieu.Rows[0]["TinhTT"].ToString());
                            }
                            if (text.Text.Contains("tenHuyen"))
                            {
                                text.Text = text.Text.Replace("tenHuyen", duLieu.Rows[0]["HuyenTT"].ToString());
                            }
                            if (text.Text.Contains("tenXa"))
                            {
                                text.Text = text.Text.Replace("tenXa", duLieu.Rows[0]["XaTT"].ToString());
                            }
                            if (text.Text.Contains("noiDKThuongTru"))
                            {
                                text.Text = text.Text.Replace("noiDKThuongTru", duLieu.Rows[0]["DiaChiCuTheTT"].ToString());
                            }
                            if (text.Text.Contains("noiOHienTai"))
                            {
                                text.Text = text.Text.Replace("noiOHienTai", duLieu.Rows[0]["DiaChiCuTheHT"].ToString());
                            }

                            if (text.Text.Contains("SoCMND"))
                            {
                                string CMND = duLieu.Rows[0]["CMND"].ToString().ToUpper() + "              "; // Cộng thêm ký tực khoảng trắng
                                text.Text = text.Text.Replace("SoCMND", CMND);
                            }

                            if (text.Text.Contains("MaSoBHXH"))
                            {
                                text.Text = text.Text.Replace("MaSoBHXH", duLieu.Rows[0]["MaBHXH"].ToString().ToUpper());
                            }
                            #region xử lý đối tượng ưu tiên
                            if (text.Text.Contains("khuyettat"))
                            {
                                text.Text = text.Text.Replace("khuyettat", duLieu.Rows[0]["KhuyetTat"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("hongheo"))
                            {
                                text.Text = text.Text.Replace("hongheo", duLieu.Rows[0]["HoNgheo"].ToString());
                            }
                            if (text.Text.Contains("canngheo"))
                            {
                                text.Text = text.Text.Replace("canngheo", duLieu.Rows[0]["CanNgheo"].ToString());
                            }
                            if (text.Text.Contains("thieuso"))
                            {
                                text.Text = text.Text.Replace("thieuso", duLieu.Rows[0]["ThieuSo"].ToString());
                            }
                            if (text.Text.Contains("thuhoidat"))
                            {
                                text.Text = text.Text.Replace("thuhoidat", duLieu.Rows[0]["ThuHoiDat"].ToString());
                            }
                            if (text.Text.Contains("cocongcm"))
                            {
                                text.Text = text.Text.Replace("cocongcm", duLieu.Rows[0]["CoCongCM"].ToString());
                            }
                            #endregion
                            if (text.Text.Contains("mamnon"))
                            {
                                text.Text = text.Text.Replace("mamnon", duLieu.Rows[0]["MamNon"].ToString());
                            }
                            if (text.Text.Contains("tieuhoc"))
                            {
                                text.Text = text.Text.Replace("tieuhoc", duLieu.Rows[0]["TieuHoc"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("trunghoccs"))
                            {
                                text.Text = text.Text.Replace("trunghoccs", duLieu.Rows[0]["TrungHocCS"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("trunghocpt"))
                            {
                                text.Text = text.Text.Replace("trunghocpt", duLieu.Rows[0]["TrungHocPT"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("ChuaQuaDT"))
                            {
                                text.Text = text.Text.Replace("ChuaQuaDT", duLieu.Rows[0]["ChuaQuaDT"].ToString());
                            }
                            if (text.Text.Contains("CNKTKhongCoBang"))
                            {
                                text.Text = text.Text.Replace("CNKTKhongCoBang", duLieu.Rows[0]["CNKTKhongCoBang"].ToString());
                            }
                            if (text.Text.Contains("CCNgheD3Thang"))
                            {
                                text.Text = text.Text.Replace("CCNgheD3Thang", duLieu.Rows[0]["CCNgheDuoi3Thang"].ToString());
                            }
                            if (text.Text.Contains("SoCap"))
                            {
                                text.Text = text.Text.Replace("SoCap", duLieu.Rows[0]["SoCap"].ToString());
                            }
                            if (text.Text.Contains("TrungCap"))
                            {
                                text.Text = text.Text.Replace("TrungCap", duLieu.Rows[0]["TrungCap"].ToString());
                            }
                            if (text.Text.Contains("CaoDang"))
                            {
                                text.Text = text.Text.Replace("CaoDang", duLieu.Rows[0]["CaoDang"].ToString());
                            }
                            if (text.Text.Contains("DaiHoc"))
                            {
                                text.Text = text.Text.Replace("DaiHoc", duLieu.Rows[0]["DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("CaoHoc"))
                            {
                                text.Text = text.Text.Replace("CaoHoc", duLieu.Rows[0]["CaoHoc"].ToString());
                            }
                            if (text.Text.Contains("tenDanTocKhac"))
                            {
                                text.Text = text.Text.Replace("tenDanTocKhac", duLieu.Rows[0]["TenDanToc"].ToString());
                            }
                            if (text.Text.Contains("tenChuyenNganhDaoTao"))
                            {
                                text.Text = text.Text.Replace("tenChuyenNganhDaoTao", duLieu.Rows[0]["tenChuyenNganhDaoTao"].ToString());
                            }
                            // Nguyên nhân KTGHDKT
                            if (duLieu.Rows[0]["LD_DiHoc"].ToString() != "" || duLieu.Rows[0]["LD_NghiHuu"].ToString() != "" || duLieu.Rows[0]["LD_NoiTro"].ToString() != "" ||
                                duLieu.Rows[0]["LD_KhuyetTat"].ToString() != "" || duLieu.Rows[0]["LD_Chet"].ToString() != "" || duLieu.Rows[0]["LD_Khac"].ToString() != "")
                            {
                                text.Text = text.Text.Replace("KThamGia", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("KThamGia", "");
                            }
                            if (text.Text.Contains("LD_DiHoc"))
                            {
                                text.Text = text.Text.Replace("LD_DiHoc", duLieu.Rows[0]["LD_DiHoc"].ToString());
                            }
                            if (text.Text.Contains("LD_NghiHuu"))
                            {
                                text.Text = text.Text.Replace("LD_NghiHuu", duLieu.Rows[0]["LD_NghiHuu"].ToString());
                            }
                            if (text.Text.Contains("LD_NoiTro"))
                            {
                                text.Text = text.Text.Replace("LD_NoiTro", duLieu.Rows[0]["LD_NoiTro"].ToString());
                            }
                            if (text.Text.Contains("LD_KhuyetTat"))
                            {
                                text.Text = text.Text.Replace("LD_KhuyetTat", duLieu.Rows[0]["LD_KhuyetTat"].ToString());
                            }
                            if (text.Text.Contains("LD_Chet"))
                            {
                                text.Text = text.Text.Replace("LD_Chet", duLieu.Rows[0]["LD_Chet"].ToString());
                            }
                            if (text.Text.Contains("LD_Khac"))
                            {
                                text.Text = text.Text.Replace("LD_Khac", duLieu.Rows[0]["LD_Khac"].ToString());
                            }

                            // Người có việc làm
                            if (duLieu.Rows[0]["TuLam"].ToString() != "" || duLieu.Rows[0]["LamCongAnLuong"].ToString() != ""
                                || duLieu.Rows[0]["ChuCoSo"].ToString() != "" || duLieu.Rows[0]["LDGiaDinh"].ToString() != ""
                                || duLieu.Rows[0]["XaVienHTX"].ToString() != "" || duLieu.Rows[0]["TenCongViecCuTheDL"].ToString() != ""
                                )
                            {
                                text.Text = text.Text.Replace("CoViecLam", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("CoViecLam", "");
                            }

                            if (text.Text.Contains("congViecDangLam"))
                            {
                                text.Text = text.Text.Replace("congViecDangLam", duLieu.Rows[0]["TenCongViecCuTheDL"].ToString());
                            }

                            if (text.Text.Contains("TuLam"))
                            {
                                text.Text = text.Text.Replace("TuLam", duLieu.Rows[0]["TuLam"].ToString());
                            }

                            if (text.Text.Contains("LamCongAnLuong"))
                            {
                                text.Text = text.Text.Replace("LamCongAnLuong", duLieu.Rows[0]["LamCongAnLuong"].ToString());
                            }
                            if (text.Text.Contains("ChuCoSo"))
                            {
                                text.Text = text.Text.Replace("ChuCoSo", duLieu.Rows[0]["ChuCoSo"].ToString());
                            }
                            if (text.Text.Contains("LDGiaDinh"))
                            {
                                text.Text = text.Text.Replace("LDGiaDinh", duLieu.Rows[0]["LDGiaDinh"].ToString());
                            }
                            if (text.Text.Contains("XaVienHTX"))
                            {
                                text.Text = text.Text.Replace("XaVienHTX", duLieu.Rows[0]["XaVienHTX"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("ThamGiaBatBuoc"))
                            {
                                text.Text = text.Text.Replace("ThamGiaBatBuoc", duLieu.Rows[0]["ThamGiaBatBuoc"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("ThamGiaTuNguyen"))
                            {
                                text.Text = text.Text.Replace("ThamGiaTuNguyen", duLieu.Rows[0]["ThamGiaTuNguyen"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("KTGBHXH"))
                            {
                                text.Text = text.Text.Replace("KTGBHXH", duLieu.Rows[0]["KhongThamGiaBHXH"].ToString().ToUpper());
                            }
                            if (duLieu.Rows[0]["ThamGiaBatBuoc"].ToString() != "" || duLieu.Rows[0]["ThamGiaTuNguyen"].ToString() != "")
                            {
                                text.Text = text.Text.Replace("ThamGiaBHXH", "X");
                            }
                            else
                            {
                                text.Text = text.Text.Replace("ThamGiaBHXH", "");
                            }
                            if (text.Text.Contains("HopDongLD"))
                            {
                                text.Text = text.Text.Replace("HopDongLD", duLieu.Rows[0]["HopDongLD"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("KhongCoHopDong"))
                            {
                                text.Text = text.Text.Replace("KhongCoHopDong", duLieu.Rows[0]["KhongCoHopDong"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("HopDongXacDinhThoiHan"))
                            {
                                text.Text = text.Text.Replace("HopDongXacDinhThoiHan", duLieu.Rows[0]["HopDongXacDinhThoiHan"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("HopDongKhongXacDinhThoiHan"))
                            {
                                text.Text = text.Text.Replace("HopDongKhongXacDinhThoiHan", duLieu.Rows[0]["HopDongKhongXacDinhThoiHan"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("ThoiGianBĐHĐLD"))
                            {
                                text.Text = text.Text.Replace("ThoiGianBĐHĐLD", duLieu.Rows[0]["NgayKyHD"].ToString());
                            }
                            if (text.Text.Contains("noiLamViec"))
                            {
                                text.Text = text.Text.Replace("noiLamViec", duLieu.Rows[0]["TenDNNoiLV"].ToString());
                            }
                            if (text.Text.Contains("LHNongLam"))
                            {
                                text.Text = text.Text.Replace("LHNongLam", duLieu.Rows[0]["LHNongLam"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHCaNhan"))
                            {
                                text.Text = text.Text.Replace("LHCaNhan", duLieu.Rows[0]["LHCaNhan"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHCoSoKD"))
                            {
                                text.Text = text.Text.Replace("LHCoSoKD", duLieu.Rows[0]["LHCoSoKD"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHHTX"))
                            {
                                text.Text = text.Text.Replace("LHHTX", duLieu.Rows[0]["LHHTX"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHDoanhNghiep"))
                            {
                                if (duLieu.Rows[0]["LHDNNhaNuoc"].ToString().ToUpper() == "X" || duLieu.Rows[0]["LHDNNgoaiNhaNuoc"].ToString().ToUpper() == "X"
                                    || duLieu.Rows[0]["LHFDI"].ToString().ToUpper() == "X")
                                {
                                    text.Text = text.Text.Replace("LHDoanhNghiep", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("LHDoanhNghiep", "");
                                }
                            }
                            if (text.Text.Contains("LHDNNhaNuoc"))
                            {
                                text.Text = text.Text.Replace("LHDNNhaNuoc", duLieu.Rows[0]["LHDNNhaNuoc"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHDNNgoaiNhaNuoc"))
                            {
                                text.Text = text.Text.Replace("LHDNNgoaiNhaNuoc", duLieu.Rows[0]["LHDNNgoaiNhaNuoc"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHFDI"))
                            {
                                text.Text = text.Text.Replace("LHFDI", duLieu.Rows[0]["LHFDI"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHKVNN"))
                            {
                                text.Text = text.Text.Replace("LHKVNN", duLieu.Rows[0]["LHKVNN"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHDVSDNN"))
                            {
                                text.Text = text.Text.Replace("LHDVSDNN", duLieu.Rows[0]["LHDVSDNN"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHKVNuocNgoai"))
                            {
                                text.Text = text.Text.Replace("LHKVNuocNgoai", duLieu.Rows[0]["LHKVNNN"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("LHKhac"))
                            {
                                text.Text = text.Text.Replace("LHKhac", duLieu.Rows[0]["LHKhac"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("DiaChiNoiLamViec"))
                            {
                                text.Text = text.Text.Replace("DiaChiNoiLamViec", duLieu.Rows[0]["DiaChiNoiLamViec"].ToString());
                            }
                            if (text.Text.Contains("ChuaBaoGioLamViec"))
                            {
                                text.Text = text.Text.Replace("ChuaBaoGioLamViec", duLieu.Rows[0]["CBGLV"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("DaTungLV"))
                            {
                                text.Text = text.Text.Replace("DaTungLV", duLieu.Rows[0]["DaTungLV"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("Duoi3Thang"))
                            {
                                text.Text = text.Text.Replace("Duoi3Thang", duLieu.Rows[0]["D3Thang"].ToString());
                            }
                            if (text.Text.Contains("Duoi1Nam"))
                            {
                                text.Text = text.Text.Replace("Duoi1Nam", duLieu.Rows[0]["D1Nam"].ToString());
                            }
                            if (text.Text.Contains("Tren1Nam"))
                            {
                                text.Text = text.Text.Replace("Tren1Nam", duLieu.Rows[0]["T1Nam"].ToString());
                            }
                            ////thêm ngày thu thập và người ký
                            if (text.Text.Contains("NgayThuThap"))
                            {
                                text.Text = text.Text.Replace("NgayThuThap", duLieu.Rows[0]["NgayThuThap"].ToString() == "0" ? "..." : duLieu.Rows[0]["NgayThuThap"].ToString());
                            }
                            if (text.Text.Contains("ThangThuThap"))
                            {
                                text.Text = text.Text.Replace("ThangThuThap", duLieu.Rows[0]["ThangThuThap"].ToString() == "0" ? "..." : duLieu.Rows[0]["ThangThuThap"].ToString());
                            }
                            if (text.Text.Contains("NamThuThap"))
                            {
                                text.Text = text.Text.Replace("NamThuThap", duLieu.Rows[0]["NamThuThap"].ToString() == "0" ? "..." : duLieu.Rows[0]["NamThuThap"].ToString());
                            }

                            if (text.Text.Contains("NguoiKy"))
                            {
                                text.Text = text.Text.Replace("NguoiKy", duLieu.Rows[0]["NguoiKy"].ToString().ToUpper());
                            }
                        }
                        var tables = mainPart.Document.Descendants<DocumentFormat.OpenXml.Wordprocessing.Table>().ToList();
                        int indexBangCuoi = tables.Count - 1;
                        string imageFile = Server.MapPath(duLieu.Rows[0]["UrlChuKy"].ToString().Replace("*", ""));
                        if (System.IO.File.Exists(imageFile))
                        {
                            ImagePart imagePart = mainPart.AddImagePart(ImagePartType.Jpeg);
                            using (FileStream stream = new FileStream(imageFile, FileMode.Open))
                            {
                                imagePart.FeedData(stream);
                            }
                            var tr11 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                            var td11 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                            AddImageToCell(td11, mainPart.GetIdOfPart(imagePart));
                            tr11.Append(td11);
                            tables[indexBangCuoi].Append(tr11);
                        }
                        wordDoc.MainDocumentPart.Document.Save();
                        wordDoc.Close();
                    }
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/CungLaoDong/" + fileName;
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
        // CUng bien dong
        [HttpPost]
        public string LayDuLieuCungBanDauTheoHGD(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCUngLaoDongBanDauTheoHGD", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieu_CungLaoDongBanDauTheoDT(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@SoCCCD", DungChung.NormalizationString(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCUngLaoDongBanDauTheoDTByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTinCungLaoDongBienDong(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                // Kiểm tra tồn tại của phiếu thu thập
                int currentYear = DateTime.Now.Year;
                if (data[0].ToString() == "them")
                {
                    SqlParameter[] paraKT = {
                        new SqlParameter("@SoCCCD", DungChung.NormalizationString(data[50].ToString())),
                    };
                    DataTable KiemTraCLD = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiPhieuThuThapCungLaoDongBienDong", paraKT).Tables[0];
                    if (KiemTraCLD.Rows.Count > 0)
                    {
                        ep.Logs = "1";
                        ep.Msg = "Số CMND/CCCD/Số định danh đã được thu thập biến động!";
                        return JSonHelper.ToJson(ep);
                    }
                }

                if (data[51].ToString() == "sua")
                {
                    ep.Logs = "2";
                    ep.Msg = "Bạn có thật sự muốn cập nhật thông tin đã thay đổi của đối tượng " + data[56].ToString() + " không?";
                    return JSonHelper.ToJson(ep);
                }

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ThuThapCungLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@NgayThuThap",DungChung.NormalizationDateTime( data[2].ToString())),
                    new SqlParameter("@DoiTuongUuTienID_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TenDanToc_us", data[4].ToString()),
                    new SqlParameter("@LoaiBHXH_us", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@chkBHYT_us", DungChung.NormalizationBoolean(data[6].ToString())),
                    new SqlParameter("@chkBHTN_us", DungChung.NormalizationBoolean(data[7].ToString())),
                    new SqlParameter("@MaSoBHXH_us", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@TinhID_TT_us", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@HuyenID_TT_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@XaID_TT_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@ThonID_TT_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@SoNha_TT_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@DiaChiThuongTruDT_us", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@TinhID_HN_us", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@HuyenID_HN_us", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@XaID_HN_us", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@ThonID_HN_us", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@SoNha_HN_us", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@DiaChiThuongTruHN_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@HoSoKemTheo_USDangKy", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@TrinhDoPTID_us", DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@TrinhDoCMKTID_us", DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@LinhVucDaoTaoID_us", DungChung.NormalizationGuid(data[24].ToString())),
                    new SqlParameter("@ChuyenNganhDTID_us", DungChung.NormalizationGuid(data[25].ToString())),
                    new SqlParameter("@ViTheViecLamID_us", DungChung.NormalizationGuid(data[26].ToString())),
                    new SqlParameter("@CongViecDangLamID_us", DungChung.NormalizationGuid(data[27].ToString())),
                    new SqlParameter("@ViTriViecLamID_us", DungChung.NormalizationGuid(data[28].ToString())),
                    new SqlParameter("@HopDongLaoDong", DungChung.NormalizationBoolean(data[29].ToString())),
                    new SqlParameter("@NgayKy", DungChung.NormalizationDateTime(data[30].ToString())),
                    new SqlParameter("@LoaiHopDongLaoDongID", DungChung.NormalizationGuid(data[31].ToString())),
                    new SqlParameter("@NoiLamViec", DungChung.NormalizationString(data[32].ToString())),
                    new SqlParameter("@NoiLVNuocNgoai", DungChung.NormalizationBoolean(data[33].ToString())),
                    new SqlParameter("@TinhID_NLV", DungChung.NormalizationGuid(data[34].ToString())),
                    new SqlParameter("@HuyenID_NLV", DungChung.NormalizationGuid(data[35].ToString())),
                    new SqlParameter("@XaID_NLV", DungChung.NormalizationGuid(data[36].ToString())),
                    new SqlParameter("@ThonID_NLV", DungChung.NormalizationGuid(data[37].ToString())),
                    new SqlParameter("@SoNha_NLV", DungChung.NormalizationString(data[38].ToString())),
                    new SqlParameter("@LoaiHinhNLVID", DungChung.NormalizationGuid(data[39].ToString())),
                    new SqlParameter("@QuocGiaID_us_NLV", DungChung.NormalizationGuid(data[40].ToString())),
                    new SqlParameter("@DiaChiNoiLamViec", DungChung.NormalizationString(data[41].ToString())),
                    new SqlParameter("@ThatNghiep", DungChung.NormalizationNumber(data[42].ToString())),
                    new SqlParameter("@ThoiGianThatnghiep", DungChung.NormalizationGuid(data[43].ToString())),
                    new SqlParameter("@CongViecTruocKhiThatNghiep", DungChung.NormalizationGuid(data[44].ToString())),
                    new SqlParameter("@NguyenNhanKTGHDKTID", DungChung.NormalizationGuid(data[45].ToString())),
                    new SqlParameter("@NhuCauDaoTaoViecLam", DungChung.NormalizationString(data[46].ToString())),
                    new SqlParameter("@NguoiCungCapThongTin", DungChung.NormalizationString(data[47].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[48].ToString())),
                    new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(data[49].ToString())),
                    new SqlParameter("@LoaiBienDongID", DungChung.NormalizationGuid(data[55].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationString(NTSSession.GetNamSudung())),
                    new SqlParameter("@KinhDoCungLaoDong", DungChung.NormalizationString(data[57].ToString())),
                    new SqlParameter("@ViDoCungLaoDong", DungChung.NormalizationString(data[58].ToString())),
                    new SqlParameter("@ChuKy", DungChung.NormalizationString(data[59].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCungLaoDongBienDong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "CungLaoDong";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "CungLaoDong";
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
        public string ThemMoiDoiTuongCungLaoDongBienDong(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                // Kiểm tra tồn tại của phiếu thu thập
                int currentYear = DateTime.Now.Year;
                if (data[0].ToString() == "them")
                {
                    SqlParameter[] paraKT = {
                        new SqlParameter("@SoCCCD", DungChung.NormalizationString(data[50].ToString())),
                    };
                    DataTable KiemTraCLD = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiPhieuThuThapCungLaoDongBienDong", paraKT).Tables[0];
                    if (KiemTraCLD.Rows.Count > 0)
                    {
                        ep.Logs = "1";
                        ep.Msg = "Số CMND/CCCD/Số định danh đã được thu thập cung lao động biến động!";
                        return JSonHelper.ToJson(ep);
                    }
                }

                if (data[51].ToString() == "sua")
                {
                    ep.Logs = "2";
                    ep.Msg = "Bạn có thật sự muốn cập nhật thông tin đã thay đổi của đối tượng " + data[56].ToString() + " không?";
                    return JSonHelper.ToJson(ep);
                }

                SqlParameter[] paraDT = {
                    new SqlParameter("@Loai", data[56].ToString()),
                    new SqlParameter("@ThanhVienHoGDID", DungChung.NormalizationGuid(data[57].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[58].ToString())),
                    new SqlParameter("@MoiQuanHeIDDT",DungChung.NormalizationGuid( data[59].ToString())),
                    new SqlParameter("@HoVaTenDT", data[60].ToString()),
                    new SqlParameter("@GioiTinhDT", DungChung.NormalizationGuid(data[61].ToString())),
                    new SqlParameter("@NgaySinhDT", DungChung.NormalizationDateTime(data[62].ToString())),
                    new SqlParameter("@TinhID_NS", DungChung.NormalizationGuid(data[63].ToString())),
                    new SqlParameter("@DanTocIDDT", DungChung.NormalizationGuid(data[64].ToString())),
                    new SqlParameter("@TonGiaoIDDT", DungChung.NormalizationGuid(data[65].ToString())),
                    new SqlParameter("@QuocGiaIDDT", DungChung.NormalizationGuid(data[66].ToString())),
                    new SqlParameter("@SoCMND_DoiTuong", DungChung.NormalizationString(data[67].ToString())),
                    new SqlParameter("@NgayCapDT", DungChung.NormalizationDateTime(data[68].ToString())),
                    new SqlParameter("@NoiCapDT", DungChung.NormalizationGuid(data[69].ToString())),
                    new SqlParameter("@SoNhaTT", DungChung.NormalizationString(data[70].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonTT", DungChung.NormalizationGuid(data[71].ToString())),
                    new SqlParameter("@DiaBanHCID_XaTT", DungChung.NormalizationGuid(data[72].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenTT", DungChung.NormalizationGuid(data[73].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhTT", DungChung.NormalizationGuid(data[74].ToString())),
                    new SqlParameter("@DiaChiCuTheTT", DungChung.NormalizationString(data[75].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonHT", DungChung.NormalizationGuid(data[76].ToString())),
                    new SqlParameter("@DiaBanHCID_XaHT", DungChung.NormalizationGuid(data[77].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenHT", DungChung.NormalizationGuid(data[78].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhHT", DungChung.NormalizationGuid(data[79].ToString())),
                    new SqlParameter("@SoNhaHT", DungChung.NormalizationString(data[80].ToString())),
                    new SqlParameter("@DiaChiCuTheHT", DungChung.NormalizationString(data[81].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieuDT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDoiTuongCLD", paraDT);
                string DoiTuongID = duLieuDT.Tables[0].Rows[0]["ThanhVienHoGDID"].ToString();

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ThuThapCungLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@NgayThuThap",DungChung.NormalizationDateTime( data[2].ToString())),
                    new SqlParameter("@DoiTuongUuTienID_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TenDanToc_us", data[4].ToString()),
                    new SqlParameter("@LoaiBHXH_us", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@chkBHYT_us", DungChung.NormalizationBoolean(data[6].ToString())),
                    new SqlParameter("@chkBHTN_us", DungChung.NormalizationBoolean(data[7].ToString())),
                    new SqlParameter("@MaSoBHXH_us", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@TinhID_TT_us", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@HuyenID_TT_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@XaID_TT_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@ThonID_TT_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@SoNha_TT_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@DiaChiThuongTruDT_us", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@TinhID_HN_us", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@HuyenID_HN_us", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@XaID_HN_us", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@ThonID_HN_us", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@SoNha_HN_us", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@DiaChiThuongTruHN_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@HoSoKemTheo_USDangKy", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@TrinhDoPTID_us", DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@TrinhDoCMKTID_us", DungChung.NormalizationGuid(data[23].ToString())),
                    new SqlParameter("@LinhVucDaoTaoID_us", DungChung.NormalizationGuid(data[24].ToString())),
                    new SqlParameter("@ChuyenNganhDTID_us", DungChung.NormalizationGuid(data[25].ToString())),
                    new SqlParameter("@ViTheViecLamID_us", DungChung.NormalizationGuid(data[26].ToString())),
                    new SqlParameter("@CongViecDangLamID_us", DungChung.NormalizationGuid(data[27].ToString())),
                    new SqlParameter("@ViTriViecLamID_us", DungChung.NormalizationGuid(data[28].ToString())),
                    new SqlParameter("@HopDongLaoDong", DungChung.NormalizationBoolean(data[29].ToString())),
                    new SqlParameter("@NgayKy", DungChung.NormalizationDateTime(data[30].ToString())),
                    new SqlParameter("@LoaiHopDongLaoDongID", DungChung.NormalizationGuid(data[31].ToString())),
                    new SqlParameter("@NoiLamViec", DungChung.NormalizationString(data[32].ToString())),
                    new SqlParameter("@NoiLVNuocNgoai", DungChung.NormalizationBoolean(data[33].ToString())),
                    new SqlParameter("@TinhID_NLV", DungChung.NormalizationGuid(data[34].ToString())),
                    new SqlParameter("@HuyenID_NLV", DungChung.NormalizationGuid(data[35].ToString())),
                    new SqlParameter("@XaID_NLV", DungChung.NormalizationGuid(data[36].ToString())),
                    new SqlParameter("@ThonID_NLV", DungChung.NormalizationGuid(data[37].ToString())),
                    new SqlParameter("@SoNha_NLV", DungChung.NormalizationString(data[38].ToString())),
                    new SqlParameter("@LoaiHinhNLVID", DungChung.NormalizationGuid(data[39].ToString())),
                    new SqlParameter("@QuocGiaID_us_NLV", DungChung.NormalizationGuid(data[40].ToString())),
                    new SqlParameter("@DiaChiNoiLamViec", DungChung.NormalizationString(data[41].ToString())),
                    new SqlParameter("@ThatNghiep", DungChung.NormalizationNumber(data[42].ToString())),
                    new SqlParameter("@ThoiGianThatnghiep", DungChung.NormalizationGuid(data[43].ToString())),
                    new SqlParameter("@CongViecTruocKhiThatNghiep", DungChung.NormalizationGuid(data[44].ToString())),
                    new SqlParameter("@NguyenNhanKTGHDKTID", DungChung.NormalizationGuid(data[45].ToString())),
                    new SqlParameter("@NhuCauDaoTaoViecLam", DungChung.NormalizationString(data[46].ToString())),
                    new SqlParameter("@NguoiCungCapThongTin", DungChung.NormalizationString(data[47].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[48].ToString())),
                    new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(DoiTuongID)),
                    new SqlParameter("@LoaiBienDong", DungChung.NormalizationGuid(data[55].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationString(NTSSession.GetNamSudung())),
                    new SqlParameter("@KinhDoCungLaoDong", DungChung.NormalizationString(data[83].ToString())),
                    new SqlParameter("@ViDoCungLaoDong", DungChung.NormalizationString(data[84].ToString())),
                    new SqlParameter("@ChuKy", DungChung.NormalizationString(data[85].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCungLaoDongBienDong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "CungLaoDong";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "CungLaoDong";
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
        public string XuatExcel_DSThuThapCungLaoDong(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "ThuThapCungLaoDongBienDong" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/NghiepVu/DanhSachThuThapCungLaoDongBienDong.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachThuThapCungLaoDongBienDong/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachThuThapCungLaoDongBienDong/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5])),
                    new SqlParameter("@DenNgay", DungChung.NormalizationDateTime(data[6])),
                    new SqlParameter("@HoGiaDinhID_TimKiem_us", DungChung.NormalizationGuid(data[7]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllCungLaoDongBienDong_Excel", para).Tables[0];
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
                        ws.Range("A" + vDongXuat + ":W" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["NgayThuThap"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["HoVaTen"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["SoCCCD"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["NgayCap"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["NgayThangNamSinh"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["DiaChiCuTheTT"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenDanToc"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["TenTonGiao"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["TenQuocTich"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["DoiTuongUuTien"].ToString();
                        ws.Cell("O" + vDongXuat).Value = "'" + dr["TrinhDoPT"].ToString();
                        ws.Cell("P" + vDongXuat).Value = "'" + dr["TrinhDoCMKT"].ToString();
                        ws.Cell("Q" + vDongXuat).Value = "'" + dr["CongViecDangLam"].ToString();
                        ws.Cell("R" + vDongXuat).Value = "'" + dr["NoiLamViec"].ToString();
                        ws.Cell("S" + vDongXuat).Value = "'" + dr["DiaChiCuTheNLV"].ToString();
                        ws.Cell("T" + vDongXuat).Value = "'" + dr["ThoiGianThatNghiep"].ToString();
                        ws.Cell("U" + vDongXuat).Value = "'" + dr["NguyenNhanKTGHDKT"].ToString();
                        ws.Cell("V" + vDongXuat).Value = "'" + dr["NhuCauDaoTaoVL"].ToString();
                        ws.Cell("W" + vDongXuat).Value = "'" + dr["LoaiBienDong"].ToString();
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":W" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/NghiepVu/DanhSachThuThapCungLaoDongBienDong/" + fileName;
                sqlFun.XlsxToPDF(KetQua);
                sqlFun.XlsxToHtml(KetQua);

                return JSonHelper.ToJson(KetQua);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}