﻿using System;
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

namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class ToChucController : Controller
    {
        // GET: DanhMuc/ToChuc
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
                    new SqlParameter("@LoaiHinhDN_TimKiem_us", DungChung.NormalizationGuid(data[5])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllToChuc", para).Tables[0];
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
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllToChucByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuThuThapCauLaoDong(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllToChucByID_QuaTrinhThuThap", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string XemThongTinToChuc(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_XemThongTinTocChuc", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XemThongTinToChuc_TabView(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_XemThongTinTocChuc_TabView", para).Tables[0];
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
                if (data[0].ToString() == "them" && DungChungController.KiemTraTonTai(data[2].ToString(), "MaToChuc", "ToChuc"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }



                if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[2].ToString(), "MaToChuc", "ToChuc", "ToChucID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }

                // Kiểm tra tồn tại mã số thuế doanh nghiệp khi thêm mới
                if (data[0].ToString() == "them")
                {
                    DataSet duLieuKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiMaSoThue", data[5].ToString());
                    if(duLieuKT.Tables[0].Rows.Count > 0)
                    {
                        string tenBien = "@MaSoThue_@TenToChuc_@DiaChiCuThe";
                        string giaTri = duLieuKT.Tables[0].Rows[0]["MaSoThue"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["TenToChuc"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["DiaChiCuThe"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("004", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD
                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                // Kiểm tra tồn tại mã số thuế doanh nghiệp khi Cập nhật
                if (data[0].ToString() == "sua")
                {
                    SqlParameter[] para2 = {
                        new SqlParameter("@ToChucID", DungChung.NormalizationGuid(data[1].ToString())),
                        new SqlParameter("@MaSoThue", data[5].ToString()),
                    };
                    DataSet duLieuKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSuaMaSoThue", para2);
                    if (duLieuKT.Tables[0].Rows.Count > 0)
                    {
                        string tenBien = "@MaSoThue_@TenToChuc_@DiaChiCuThe";
                        string giaTri = duLieuKT.Tables[0].Rows[0]["MaSoThue"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["TenToChuc"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["DiaChiCuThe"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("004", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD
                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ToChucID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaToChuc_us", data[2].ToString()),
                    new SqlParameter("@NamTrongKCN",DungChung.NormalizationBoolean(data[3].ToString())),
                    new SqlParameter("@TenKCN_us", data[4].ToString()),
                    new SqlParameter("@MaSoThue_us", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@TenToChuc_us", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@TenNguoiSDLD_us", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@SoCCCD_us", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@LoaiHinhDNID_us_TC", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@TinhTrangHDID_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@NgayHoatDong_us_TC", DungChung.NormalizationDateTime(data[11].ToString())),
                    new SqlParameter("@SoDienThoai_us", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@Email_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@TinhID_us_TC", DungChung.NormalizationGuid(data[14].ToString())),
                    new SqlParameter("@HuyenID_us_TC", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@XaID_us_TC", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@ThonID_us_TC", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@SoNha_us_TC", DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@DiaChi_us_TC", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@GhiChuTC_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@TrangThaiToChuc_us", DungChung.NormalizationBoolean(data[21].ToString())),
                    new SqlParameter("@NganhNgheID_us_TC", DungChung.NormalizationString(data[22].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinToChuc", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "ToChuc";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "ToChuc";
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
        public string GhiChuCT(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                SqlParameter[] para = {
                    new SqlParameter("@ToChucID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetGhiChuCTToChuc", para).Tables[0];
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
        public string NganhNgheKinhDoanhCT(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                SqlParameter[] para = {
                    new SqlParameter("@ToChucID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetNganhNgheCTToChuc", para).Tables[0];
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ToChuc", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "ToChuc";
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
        public string NamTrongKCN(string ID, string strCotID, string strBang, string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para =
                {
                    new SqlParameter("TenBang", strBang),
                    new SqlParameter("TenCot", strCotID),
                    new SqlParameter("ID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("NgungSD", DungChung.NormalizationBoolean(value))
                };

                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_NamTrongKCN", para).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThaoTacThatBai();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XuatExcel_ToChuc(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachToChuc" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/DanhMuc/DanhSachToChuc.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/DanhMuc/DanhSachToChuc/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/DanhMuc/DanhSachToChuc/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@LoaiHinhDN_TimKiem_us", DungChung.NormalizationGuid(data[5])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllToChuc_Excel", para).Tables[0];
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
                        ws.Range("A" + vDongXuat + ":R" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["MaToChuc"].ToString().ToUpper();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["TenToChuc"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["TenNguoiSuDungLD"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["SoCCCD"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["TenLoaiHinhDoanhNghiep"].ToString();
                        if (dr["TenNganhNgheKD"].ToString() == ";")
                        {
                            ws.Cell("I" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("I" + vDongXuat).Value = "'" + dr["TenNganhNgheKD"].ToString();
                        }
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["NgayHoatDong"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenTinhTrangHDKinhTe"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["TenTinh"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["TenHuyen"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["TenXa"].ToString();
                        ws.Cell("O" + vDongXuat).Value = "'" + dr["TenThon"].ToString();
                        ws.Cell("P" + vDongXuat).Value = "'" + dr["DiaChiCuThe"].ToString();
                        ws.Cell("Q" + vDongXuat).Value = "'" + dr["GhiChu"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("R" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("R" + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":R" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/DanhMuc/DanhSachToChuc/" + fileName;
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
        public string XuatMau02(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "Mau02_TT01_2022_" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/TT01_2022_TT_BLDTBXH/Mau02.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/CauLaoDong/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/CauLaoDong/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataSet dsData = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_CauLaoDong_Mau02_01_TT01_2022", para);
                DataTable tabDuLieu = dsData.Tables[0];
                DataTable tabNganhNghe = dsData.Tables[1];
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

                            if (text.Text.Contains("_Tinh"))
                            {
                                text.Text = text.Text.Replace("_Tinh", tabDuLieu.Rows[0]["TenTinh"].ToString());
                            }
                            if (text.Text.Contains("_Huyen"))
                            {
                                text.Text = text.Text.Replace("_Huyen", tabDuLieu.Rows[0]["TenHuyen"].ToString());
                            }
                            if (text.Text.Contains("_Xa"))
                            {
                                text.Text = text.Text.Replace("_Xa", tabDuLieu.Rows[0]["TenXa"].ToString());
                            }


                            if (text.Text.Contains("_tcTenToChuc"))
                            {
                                text.Text = text.Text.Replace("_tcTenToChuc", tabDuLieu.Rows[0]["TenToChuc"].ToString());
                            }
                            if (text.Text.Contains("_tcSoDangKy"))
                            {
                                text.Text = text.Text.Replace("_tcSoDangKy", tabDuLieu.Rows[0]["SoDangKy"].ToString());
                            }

                            if (text.Text.Contains("_tcTinh"))
                            {
                                text.Text = text.Text.Replace("_tcTinh", tabDuLieu.Rows[0]["TenTinh"].ToString());
                            }
                            if (text.Text.Contains("_tcHuyen"))
                            {
                                text.Text = text.Text.Replace("_tcHuyen", tabDuLieu.Rows[0]["TenHuyen"].ToString());
                            }
                            if (text.Text.Contains("_tcXa"))
                            {
                                text.Text = text.Text.Replace("_tcXa", tabDuLieu.Rows[0]["TenXa"].ToString());
                            }
                            if (text.Text.Contains("_tcDiaChi"))
                            {
                                text.Text = text.Text.Replace("_tcDiaChi", tabDuLieu.Rows[0]["DiaChi"].ToString());
                            }
                            if (text.Text.Contains("_tcKhuCNKhuKT"))
                            {
                                text.Text = text.Text.Replace("_tcKhuCNKhuKT", tabDuLieu.Rows[0]["TenKhuCNKhuKT"].ToString());
                            }
                            if (text.Text.Contains("[namTrongKCN]"))
                            {
                                if (tabDuLieu.Rows[0]["TenKCN"].ToString().Trim().Length > 1)
                                {
                                    text.Text = text.Text.Replace("[namTrongKCN]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[namTrongKCN]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("_tcSDT"))
                            {
                                text.Text = text.Text.Replace("_tcSDT", tabDuLieu.Rows[0]["SoDienThoai"].ToString());
                            }
                            if (text.Text.Contains("_tcEmail"))
                            {
                                text.Text = text.Text.Replace("_tcEmail", tabDuLieu.Rows[0]["Email"].ToString());
                            }

                            if (text.Text.Contains("_tcSoLaoDongTD"))
                            {
                                text.Text = text.Text.Replace("_tcSoLaoDongTD", decimal.Parse(DungChung.NormalizationNumber(tabDuLieu.Rows[0]["SoLaoDongTD"].ToString()).ToString()).ToString("N0"));
                            }
                            if (text.Text.Contains("_tcMatHangSPChinh"))
                            {
                                text.Text = text.Text.Replace("_tcMatHangSPChinh", tabDuLieu.Rows[0]["MatHangSPChinh"].ToString());
                            }

                            if (text.Text.Contains("[qm1]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "01")
                                {
                                    text.Text = text.Text.Replace("[qm1]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm1]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm2]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "02")
                                {
                                    text.Text = text.Text.Replace("[qm2]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm2]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm3]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "03")
                                {
                                    text.Text = text.Text.Replace("[qm3]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm3]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm4]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "04")
                                {
                                    text.Text = text.Text.Replace("[qm4]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm4]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm5]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "05")
                                {
                                    text.Text = text.Text.Replace("[qm5]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm5]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm6]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "06")
                                {
                                    text.Text = text.Text.Replace("[qm6]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm6]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm7]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "07")
                                {
                                    text.Text = text.Text.Replace("[qm7]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm7]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm8]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "08")
                                {
                                    text.Text = text.Text.Replace("[qm8]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm8]", "[  ]");
                                }
                            }
                            if (text.Text.Contains("[qm9]"))
                            {
                                if (tabDuLieu.Rows[0]["QuyMo"].ToString() == "09")
                                {
                                    text.Text = text.Text.Replace("[qm9]", "[X]");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("[qm9]", "[  ]");
                                }
                            }

                            if (text.Text.Contains("[dnNhaNuoc]"))
                            {
                                text.Text = text.Text.Replace("[dnNhaNuoc]", tabDuLieu.Rows[0]["dnNhaNuoc"].ToString());
                            }
                            if (text.Text.Contains("[dnNgoaiNhaNuoc]"))
                            {
                                text.Text = text.Text.Replace("[dnNgoaiNhaNuoc]", tabDuLieu.Rows[0]["dnNgoaiNhaNuoc"].ToString());
                            }
                            if (text.Text.Contains("[dnFDI]"))
                            {
                                text.Text = text.Text.Replace("[dnFDI]", tabDuLieu.Rows[0]["dnFDI"].ToString());
                            }
                            if (text.Text.Contains("[cqNhaNuoc]"))
                            {
                                text.Text = text.Text.Replace("[cqNhaNuoc]", tabDuLieu.Rows[0]["cqNhaNuoc"].ToString());
                            }
                            if (text.Text.Contains("[hoKinhDoanh]"))
                            {
                                text.Text = text.Text.Replace("[hoKinhDoanh]", tabDuLieu.Rows[0]["hoKinhDoanh"].ToString());
                            }
                            if (text.Text.Contains("[caNhan]"))
                            {
                                text.Text = text.Text.Replace("[caNhan]", tabDuLieu.Rows[0]["caNhan"].ToString());
                            }

                            if (text.Text.Contains("[TT_DHD]"))
                            {
                                text.Text = text.Text.Replace("[TT_DHD]", tabDuLieu.Rows[0]["TT_DangHoatDong"].ToString());
                            }
                            if (text.Text.Contains("[TT_NHD]"))
                            {
                                text.Text = text.Text.Replace("[TT_NHD]", tabDuLieu.Rows[0]["TT_NgungHoatDong"].ToString());
                            }
                            if (text.Text.Contains("[TT_KTT]"))
                            {
                                text.Text = text.Text.Replace("[TT_KTT]", tabDuLieu.Rows[0]["TT_KhongTimThay"].ToString());
                            }
                        }
                        //Danh sách bảng
                        var tables = mainPart.Document.Descendants<DocumentFormat.OpenXml.Wordprocessing.Table>().ToList();
                        //Xử lý ngành nghề của tổ chức
                        try
                        {
                            if (tabNganhNghe.Rows.Count > 0)
                            {
                                for (int i = 0; i < tabNganhNghe.Rows.Count; i += 2)
                                {
                                    var tr1 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                                    var td1 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                    var td2 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();

                                    try
                                    {
                                        td1.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                                new DocumentFormat.OpenXml.Wordprocessing.Text(tabNganhNghe.Rows[i]["TenNganhNghe"].ToString())
                                                )
                                            )
                                        );
                                    }
                                    catch (Exception)
                                    {
                                        td1.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                                new DocumentFormat.OpenXml.Wordprocessing.Text("")
                                                )
                                            )
                                        );
                                    }
                                    try
                                    {
                                        td2.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                                new DocumentFormat.OpenXml.Wordprocessing.Text(tabNganhNghe.Rows[i + 1]["TenNganhNghe"].ToString())
                                                )
                                            )
                                        );
                                    }
                                    catch (Exception)
                                    {
                                        td2.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Left }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                                new DocumentFormat.OpenXml.Wordprocessing.Text("")
                                                )
                                            )
                                        );
                                    }
                                    tr1.Append(td1, td2);
                                    tables[2].Append(tr1);
                                }
                            }
                        }
                        catch (Exception)
                        {

                        }
                        //Xử lý bảng tuyển dụng lao động
                        try
                        {

                            SqlParameter[] para1 = {
                                new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                            };
                            DataSet duLieu2 = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_Report_TuyenDung_Word02_2022", para1);
                            DataTable tabTuyenDung = duLieu2.Tables[0];
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

                                    td1.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                               new DocumentFormat.OpenXml.Wordprocessing.Text(tabTuyenDung.Rows[i]["NgheNghiepCLDCode"].ToString())

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
                                                new DocumentFormat.OpenXml.Wordprocessing.Text(tabTuyenDung.Rows[i]["TenNgheNghiepCLD"].ToString())
                                            )
                                        )
                                    );
                                    td3.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Right }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                                new DocumentFormat.OpenXml.Wordprocessing.Text(decimal.Parse(DungChung.NormalizationNumber(tabTuyenDung.Rows[i]["TongSo"].ToString()).ToString()).ToString("N0"))
                                            )
                                        )
                                    );
                                    td4.Append(new TableCellProperties(
                                        new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                        new Paragraph(
                                            new ParagraphProperties(new Justification() { Val = JustificationValues.Right }),
                                            new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Run(
                                                new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                                new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                                new DocumentFormat.OpenXml.Wordprocessing.Text(decimal.Parse(DungChung.NormalizationNumber(tabTuyenDung.Rows[i]["SoLuongNu"].ToString()).ToString()).ToString("N0"))
                                            )
                                        )
                                    );
                                    tr1.Append(td1, td2, td3, td4);
                                    tables[3].Append(tr1);
                                }
                                var tr31 = new DocumentFormat.OpenXml.Wordprocessing.TableRow();
                                var td31 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td32 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td33 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();
                                var td34 = new DocumentFormat.OpenXml.Wordprocessing.TableCell();

                                td31.Append(new TableCellProperties(

                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text("")

                                            )
                                    )
                                    );
                                td32.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Center }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text("TỔNG")
                                        )
                                    )
                                );
                                td33.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Right }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text(decimal.Parse(tabTuyenDung.Compute("SUM(TongSo)", "").ToString()).ToString("N0"))
                                        )
                                    )
                                );
                                td34.Append(new TableCellProperties(
                                    new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center }),
                                    new Paragraph(
                                        new ParagraphProperties(new Justification() { Val = JustificationValues.Right }),
                                        new ParagraphProperties(new SpacingBetweenLines { Before = "120", After = "120" }),
                                        new DocumentFormat.OpenXml.Wordprocessing.Run(
                                            new RunFonts { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.FontSize { Val = "24" }),
                                            new RunProperties(new DocumentFormat.OpenXml.Wordprocessing.Bold { Val = true }),
                                            new DocumentFormat.OpenXml.Wordprocessing.Text(decimal.Parse(tabTuyenDung.Compute("SUM(SoLuongNu)", "").ToString()).ToString("N0"))
                                        )
                                    )
                                );
                                tr31.Append(td31, td32, td33, td34);
                                tables[3].Append(tr31);
                            }
                        }
                        catch (Exception er)
                        {

                        }
                        wordDoc.MainDocumentPart.Document.Save();
                        wordDoc.Close();
                    }
                }
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/CauLaoDong/" + fileName;
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
        public string XoaDuLieu_CauLaoDong(string id)
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
                string pathAnhDaiDien1 = DungChung.LayDuongDanDinhKem("CauLaoDong", "ChuKy", "CauLaoDongID", id);
                string pathAnhDaiDien2 = DungChung.LayDuongDanDinhKem("CauLaoDong", "DinhKem", "CauLaoDongID", id);
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_CauLaoDongBanDau", para);
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

                    duLieu.Tables[0].TableName = "CauLaoDong";
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

    }
}