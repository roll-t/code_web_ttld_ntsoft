using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Syncfusion.DocIO.DLS;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml;
using A = DocumentFormat.OpenXml.Drawing;
using DW = DocumentFormat.OpenXml.Drawing.Wordprocessing;
using PIC = DocumentFormat.OpenXml.Drawing.Pictures;


namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class DoiTuongCaNhanController : Controller
    {
        // GET: DanhMuc/DoiTuongCaNhan
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
                    new SqlParameter("@HoGiaDinhID_TimKiem_us", DungChung.NormalizationGuid(data[5]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuongCaNhan", para).Tables[0];
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
                    new SqlParameter("@ID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetGhiChuCT_ThanhVienHoGD", para).Tables[0];
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
        public string XuatExcel_DoiTuong(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DoiTuongCaNhan" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/DanhMuc/DoiTuongCaNhan.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/DanhMuc/DoiTuongCaNhan/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/DanhMuc/DoiTuongCaNhan/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@HoGiaDinhID_TimKiem_us", DungChung.NormalizationGuid(data[5]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuong_Excel", para).Tables[0];
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
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["HoVaTen"].ToString().ToUpper();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["HoVaTenChuHo"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["TenMoiQuanHe"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["SoCCCD"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["NgayCap"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["TenNoiCap"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["NgayThangNamSinh"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["TenNoiSinh"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["DiaChiCuTheTT"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["TenDanToc"].ToString();
                        ws.Cell("O" + vDongXuat).Value = "'" + dr["TenQuocTich"].ToString();
                        ws.Cell("P" + vDongXuat).Value = "'" + dr["TenTonGiao"].ToString();
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
                KetQua = "/xuatexcel/" + nameExcel + "/DanhMuc/DoiTuongCaNhan/" + fileName;
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
        public string LoadDulieuCungLD(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCungLaoDongByID_DoiTuong", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaDuLieuCungLD(string id)
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_CungLaoDong", para);
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

        [HttpPost]
        public string LoadDuLieuThanhVienByID(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ThanhVienHoGDID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThanhVienTheoHGDByID_CLD", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieu_CungLaoDongBanDauTheoDT_DT(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@SoCCCD", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllCUngLaoDongBanDauTheoDTByID_DT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

    }
}