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
    public class GiayPhepLDController : Controller
    {
        // GET: QuanLy/GiayPhepLD
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
                    new SqlParameter("@QuocTichID", DungChung.NormalizationGuid(data[7])),
                    new SqlParameter("@lblKhongThuocCapGPLD_TimKiem_us", DungChung.NormalizationBoolean(data[8])),
                    new SqlParameter("@TrangThai_TimKiem_us", DungChung.NormalizationNumber(data[9])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllGiayPhepLD", para).Tables[0];
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
        public string LuuDinhKem_HinhAnh(string ID, string bangDk, string cotDk, string cotDinhKem, string pathFile)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para = {
                    new SqlParameter("@TenBang", bangDk), //tên bảng cần update
                    new SqlParameter("@TenCot", cotDinhKem),//tên cột đính kèm
                    new SqlParameter("@Value", pathFile),//path cần lưu
                    new SqlParameter("@TenCotDK",  cotDk),//tên cột khóa chính
                    new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),//khóa chính
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }
        [HttpPost]
        public string LuuThongTinCapMoi(object[] data)
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
                    new SqlParameter("@GiayPhepLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@SoGPLD", data[2].ToString()),
                    new SqlParameter("@CanCu", data[3].ToString()),
                    new SqlParameter("@NgayCap",DungChung.NormalizationDateTime( data[4].ToString())),
                    new SqlParameter("@NguoiKy_us", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@CoQuanCap_US", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@SelectDoiTuongNN_US", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@SelectToChuc_US", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@DiaChiNoiLV_us", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@selViTriCongViec_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@selHinhThucLV_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@selChucDanhCV_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@MucLuong_US", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@NgayLamViec_us_TC", DungChung.NormalizationDateTime(data[14].ToString())),
                    new SqlParameter("@NgayKetThuc_us_TC", DungChung.NormalizationDateTime(data[15].ToString())),
                    new SqlParameter("@txtDuongDanFileHinhAnh", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@txtDinhKem_VanBan_US", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCapMoiGiayPhepLaoDong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "GiayPhepLD";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "GiayPhepLD";
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
        public string LuuThongTinCapLai(object[] data)
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
                    new SqlParameter("@GiayPhepLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@SoGPLD", data[2].ToString()),
                    new SqlParameter("@CanCu", data[3].ToString()),
                    new SqlParameter("@NgayCap",DungChung.NormalizationDateTime( data[4].ToString())),
                    new SqlParameter("@NguoiKy_us", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@CoQuanCap_US", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@SelectDoiTuongNN_US", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@SelectToChuc_US", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@DiaChiNoiLV_us", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@selViTriCongViec_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@selHinhThucLV_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@selChucDanhCV_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@MucLuong_US", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@NgayLamViec_us_TC", DungChung.NormalizationDateTime(data[14].ToString())),
                    new SqlParameter("@NgayKetThuc_us_TC", DungChung.NormalizationDateTime(data[15].ToString())),
                    new SqlParameter("@txtDuongDanFileHinhAnh", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@txtDinhKem_VanBan_US", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@LyDoCapLai", DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinCapLaiGiayPhepLaoDong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "GiayPhepLD";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "GiayPhepLD";
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
        public string LuuThongTinGiaHan(object[] data)
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
                    new SqlParameter("@GiayPhepLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@SoGPLD", data[2].ToString()),
                    new SqlParameter("@CanCu", data[3].ToString()),
                    new SqlParameter("@NgayCap",DungChung.NormalizationDateTime( data[4].ToString())),
                    new SqlParameter("@NguoiKy_us", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@CoQuanCap_US", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@SelectDoiTuongNN_US", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@SelectToChuc_US", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@DiaChiNoiLV_us", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@selViTriCongViec_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@selHinhThucLV_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@selChucDanhCV_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@MucLuong_US", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@NgayLamViec_us_TC", DungChung.NormalizationDateTime(data[14].ToString())),
                    new SqlParameter("@NgayKetThuc_us_TC", DungChung.NormalizationDateTime(data[15].ToString())),
                    new SqlParameter("@txtDuongDanFileHinhAnh", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@txtDinhKem_VanBan_US", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinGiaHanGiayPhepLaoDong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "GiayPhepLD";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "GiayPhepLD";
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
        public string LuuThongThuHoi(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para = {
                    new SqlParameter("@GiayPhepLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@SoQuyetDinh_ThuHoi", data[2].ToString()),
                    new SqlParameter("@NgayKyThuHoi_ThuHoi",DungChung.NormalizationDateTime(  data[3].ToString())),
                    new SqlParameter("@NguoiKy_ThuHoi",DungChung.NormalizationString( data[4].ToString())),
                    new SqlParameter("@CoQuanBanHanh_ThuHoi", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@NoiDung_ThuHoi", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@txtDinhKemThuHoi_VanBan_US", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinThuHoiGiayPLD", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "GiayPhepLD";
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
        public string XoaDinhKemGiayPhepLD(string ID, string duongDan, string bangDk, string cotDk, string loai)
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
        public string XoaDinhKemThuHoiGiayPhepLD(string ID, string duongDan, string bangDk, string cotDk, string loai)
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
                string pathAnhDaiDien1 = DungChung.LayDuongDanDinhKem("GiayPhepLD", "HinhAnh", "GiayPhepLDID", id);
                string pathAnhDaiDien2 = DungChung.LayDuongDanDinhKem("GiayPhepLD", "TaiLieu", "GiayPhepLDID", id);
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_GiayPhepLD", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    // xóa các đính kèm trong folder khi xóa dữ liệu chính
                    //DungChung.XoaDinhKemTrongFolder(pathAnhDaiDien1);
                    //DungChung.XoaDinhKemTrongFolder(pathAnhDaiDien2);
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

                    duLieu.Tables[0].TableName = "GiayPhepLD";
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCapGiayPhepLDByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuHoSoDeNghi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNoiDungHoSoDeNghi", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSuaXacNhan(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCapGiayPhepLDByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string BoThuHoi(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinBoThuHoiGiayPLD", para).Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllGiayPhepLDXem", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XuatMau12PLI(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mau12" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/GiayPhepLD/Mau12.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/GiayPhepLD/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/GiayPhepLD/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable tabDuLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GiayPhepD_MauSo_12PLI", para).Tables[0];
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
                            if (text.Text.Contains("CANCU"))
                            {
                                text.Text = text.Text.Replace("CANCU", tabDuLieu.Rows[0]["CanCu"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_SOHOSO"))
                            {
                                text.Text = text.Text.Replace("_SOHOSO", tabDuLieu.Rows[0]["SoHoSo"].ToString().ToUpper());
                            }
                          
                            if (text.Text.Contains("_HOVATEN"))
                            {
                                text.Text = text.Text.Replace("_HOVATEN", tabDuLieu.Rows[0]["HoVaTen"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_GTNAM"))
                            {
                                if (tabDuLieu.Rows[0]["GioiTinh"].ToString().ToUpper() == "NAM")
                                {
                                    text.Text = text.Text.Replace("_GTNAM", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_GTNAM", "");
                                }
                            }
                            if (text.Text.Contains("_GTNU"))
                            {
                                if (tabDuLieu.Rows[0]["GioiTinh"].ToString().ToUpper() == "NỮ")
                                {
                                    text.Text = text.Text.Replace("_GTNU", "X");

                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_GTNU", "");
                                }
                            }
                            if (text.Text.Contains("_NGAYSINH"))
                            {
                                text.Text = text.Text.Replace("_NGAYSINH", tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_QUOCTICH"))
                            {
                                text.Text = text.Text.Replace("_QUOCTICH", tabDuLieu.Rows[0]["QuocTich"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_HOCHIEU"))
                            {
                                text.Text = text.Text.Replace("_HOCHIEU", tabDuLieu.Rows[0]["SoHoChieu"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_CQLV"))
                            {
                                text.Text = text.Text.Replace("_CQLV", tabDuLieu.Rows[0]["TenToChuc"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_DDLV"))
                            {
                                text.Text = text.Text.Replace("_DDLV", tabDuLieu.Rows[0]["DiaDiemCQLV"].ToString());
                            }
                            if (text.Text.Contains("_HINHTHUCLV"))
                            {
                                text.Text = text.Text.Replace("_HINHTHUCLV", tabDuLieu.Rows[0]["TenHinhThucLamViec"].ToString());
                            }
                            if (text.Text.Contains("_CHUCDANHLV"))
                            {
                                text.Text = text.Text.Replace("_CHUCDANHLV", tabDuLieu.Rows[0]["ChucDanhVL"].ToString());
                            }
                            if (text.Text.Contains("_N1"))
                            {
                                if (tabDuLieu.Rows[0]["TuNgayLV"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_N1", tabDuLieu.Rows[0]["TuNgayLV"].ToString().Split('/')[0]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_N1", "...");
                                }
                            }
                            if (text.Text.Contains("_T1"))
                            {
                                if (tabDuLieu.Rows[0]["TuNgayLV"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_T1", tabDuLieu.Rows[0]["TuNgayLV"].ToString().Split('/')[1]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_T1", "...");
                                }
                            }
                            if (text.Text.Contains("_Y1"))
                            {
                                if (tabDuLieu.Rows[0]["TuNgayLV"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_Y1", tabDuLieu.Rows[0]["TuNgayLV"].ToString().Split('/')[2]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_Y1", "....");
                                }
                            }

                            if (text.Text.Contains("_N2"))
                            {
                                if (tabDuLieu.Rows[0]["DenNgayLV"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_N2", tabDuLieu.Rows[0]["DenNgayLV"].ToString().Split('/')[0]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_N2", "...");
                                }
                            }
                            if (text.Text.Contains("_T2"))
                            {
                                if (tabDuLieu.Rows[0]["DenNgayLV"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_T2", tabDuLieu.Rows[0]["DenNgayLV"].ToString().Split('/')[1]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_T2", "...");
                                }
                            }
                            if (text.Text.Contains("_Y2"))
                            {
                                if (tabDuLieu.Rows[0]["DenNgayLV"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_Y2", tabDuLieu.Rows[0]["DenNgayLV"].ToString().Split('/')[2]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_Y2", "...");
                                }
                            }

                            if (text.Text.Contains("_N3"))
                            {
                                if (tabDuLieu.Rows[0]["NgayGhiSo"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_N3", tabDuLieu.Rows[0]["NgayGhiSo"].ToString().Split('/')[0]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_N3", "...");
                                }
                            }
                            if (text.Text.Contains("_T3"))
                            {
                                if (tabDuLieu.Rows[0]["NgayGhiSo"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_T3", tabDuLieu.Rows[0]["NgayGhiSo"].ToString().Split('/')[1]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_T3", "...");
                                }
                            }
                            if (text.Text.Contains("_Y3"))
                            {
                                if (tabDuLieu.Rows[0]["NgayGhiSo"].ToString().Trim().Length == 10)
                                {
                                    text.Text = text.Text.Replace("_Y3", tabDuLieu.Rows[0]["NgayGhiSo"].ToString().Split('/')[2]);
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_Y3", "....");
                                }
                            }
                            if (text.Text.Contains("_71")) // 
                            {
                                if (tabDuLieu.Rows[0]["ViTriCongViec"].ToString().ToUpper() == "03")
                                {
                                    text.Text = text.Text.Replace("_71", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_71", "");
                                }
                            }
                            if (text.Text.Contains("_72")) // 
                            {
                                if (tabDuLieu.Rows[0]["ViTriCongViec"].ToString().ToUpper() == "04")
                                {
                                    text.Text = text.Text.Replace("_72", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_72", "");
                                }
                            }
                            if (text.Text.Contains("_73")) // 
                            {
                                if (tabDuLieu.Rows[0]["ViTriCongViec"].ToString().ToUpper() == "CG")
                                {
                                    text.Text = text.Text.Replace("_73", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_73", "");
                                }
                            }
                            if (text.Text.Contains("_74")) // 
                            {
                                if (tabDuLieu.Rows[0]["ViTriCongViec"].ToString().ToUpper() == "LDKT")
                                {
                                    text.Text = text.Text.Replace("_74", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("_74", "");
                                }
                            }

                            if (text.Text.Contains("_101")) // 
                            {
                                text.Text = text.Text.Replace("_101", tabDuLieu.Rows[0]["CapMoi"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_102")) // 
                            {
                                text.Text = text.Text.Replace("_102", tabDuLieu.Rows[0]["CapLai"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("_103")) // 
                            {
                                text.Text = text.Text.Replace("_103", tabDuLieu.Rows[0]["GiaHan"].ToString().ToUpper());
                            }
                        }
                    }
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/GiayPhepLD/" + fileName;
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
        public string XuatExcel_DSGiayPhepLD(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachCapGiayPhepLaoDong" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/NghiepVu/DanhSachCapGiayPhepLaoDong.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachCapGiayPhepLaoDong/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/NghiepVu/DanhSachCapGiayPhepLaoDong/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@TuNgay", DungChung.NormalizationDateTime(data[5])),
                    new SqlParameter("@DenNgay", DungChung.NormalizationDateTime(data[6])),
                    new SqlParameter("@QuocTichID", DungChung.NormalizationGuid(data[7])),
                    new SqlParameter("@lblKhongThuocCapGPLD_TimKiem_us", DungChung.NormalizationBoolean(data[8])),
                    new SqlParameter("@TrangThai_TimKiem_us", DungChung.NormalizationNumber(data[9])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllGiayPhepLDExcel", para).Tables[0];

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
                        ws.Range("A" + vDongXuat + ":M" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["NgayCapGPLD"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["SoGPLD"].ToString();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["HoVaTen"].ToString().ToUpper();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["NgaySinh"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["TenQuocTich"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["SoHoChieu"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["NgayCapSHC"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["DiaDiemLV"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["ThoiGianLV"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["TinhTrang"].ToString();
                        if(dr["TrangThai"].ToString() == "40")
                        {
                            ws.Cell("M" + vDongXuat).Value = "Giấy xác nhận";
                        }
                        else
                        {
                            ws.Cell("M" + vDongXuat).Value = "Giấy phép lao động";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":M" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/NghiepVu/DanhSachCapGiayPhepLaoDong/" + fileName;
                sqlFun.XlsxToPDF(KetQua);
                sqlFun.XlsxToHtml(KetQua);

                return JSonHelper.ToJson(KetQua);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTinXacNhan(object[] data)
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
                    new SqlParameter("@GiayPhepLDID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@SoGPLD", data[2].ToString()),
                    new SqlParameter("@CanCu", data[3].ToString()),
                    new SqlParameter("@NgayCap",DungChung.NormalizationDateTime( data[4].ToString())),
                    new SqlParameter("@NguoiKy_us", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@CoQuanCap_US", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@SelectDoiTuongNN_US", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@SelectToChuc_US", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@DiaChiNoiLV_us", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@selViTriCongViec_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@selHinhThucLV_us", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@selChucDanhCV_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@MucLuong_US", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@NgayLamViec_us_TC", DungChung.NormalizationDateTime(data[14].ToString())),
                    new SqlParameter("@NgayKetThuc_us_TC", DungChung.NormalizationDateTime(data[15].ToString())),
                    new SqlParameter("@LyDoKhongThuocDienCap", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@txtDinhKem_VanBan_US", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinXacNhanGiayPhepLaoDong", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "GiayPhepLD";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count > 0)
                    {
                        duLieu.Tables[0].TableName = "GiayPhepLD";
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
    }
}