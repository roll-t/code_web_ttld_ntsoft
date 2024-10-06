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

namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class DoiTuongNNController : Controller
    {
        // GET: DanhMuc/DoiTuongNN
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
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuongNN", para).Tables[0];
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
        public string LuuThongTin(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChungController.KiemTraTonTai(data[2].ToString(), "MaDoiTuongNN", "DoiTuongNN"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }



                if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[2].ToString(), "MaDoiTuongNN", "DoiTuongNN", "DoiTuongNNID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }

                // Kiểm tra tồn tại mã số thuế doanh nghiệp khi thêm mới
                if (data[0].ToString() == "them")
                {
                    DataSet duLieuKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSoHoChieu", data[9].ToString());
                    if (duLieuKT.Tables[0].Rows.Count > 0)
                    {
                        string tenBien = "@SoHoChieu_@HoVaTen";
                        string giaTri = duLieuKT.Tables[0].Rows[0]["SoHoChieu"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["HoVaTen"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("005", tenBien, giaTri); // 005 la loi thong bao trung số hộ chiếu
                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                // Kiểm tra tồn tại mã số thuế doanh nghiệp khi Cập nhật
                if (data[0].ToString() == "sua")
                {
                    SqlParameter[] para2 = {
                        new SqlParameter("@TDoiTuongNNID", DungChung.NormalizationGuid(data[1].ToString())),
                        new SqlParameter("@SoHoChieu", data[9].ToString()),
                    };
                    DataSet duLieuKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSuaSoHoChieu", para2);
                    if (duLieuKT.Tables[0].Rows.Count > 0)
                    {
                        string tenBien = "@SoHoChieu_@HoVaTen";
                        string giaTri = duLieuKT.Tables[0].Rows[0]["SoHoChieu"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["HoVaTen"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("005", tenBien, giaTri); // 005 la loi thong bao trung số hộ chiếu
                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@DoiTuongNNID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaDoiTuongNN_us", data[2].ToString()),
                    new SqlParameter("@HoVaTenDoiTuongNN_us",DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@GioiTinhDoiTuongNN_us",DungChung.NormalizationGuid( data[4].ToString())),
                    new SqlParameter("@QuocTichDoiTuongNN_us", DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@NgaySinhDoiTuongNN_us", DungChung.NormalizationDateTime(data[6].ToString())),
                    new SqlParameter("@MaSoDoiTuongNN_us", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@drop_MaoSo", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@SoHoChieuDoiTuongNN_us", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@NgayCapDoiTuongNN_us", DungChung.NormalizationDateTime(data[10].ToString())),
                    new SqlParameter("@CoGiaTriDenDoiTuongNN_us", DungChung.NormalizationDateTime(data[11].ToString())),
                    new SqlParameter("@NoiCapDoiTuongNN_us", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@SoDienThoaiDoiTuongNN_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@EmailDoiTuongNN_us", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@TinhIDDoiTuongNN_us", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@HuyenIDDoiTuongNN_us", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@XaIDDoiTuongNN_us", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@ThonIDDoiTuongNN_us", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@SoNhaDoiTuongNN_us", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@DiaChiDoiTuongNN_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@GhiChuDoiTuongNN_us", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@TrangThaiDoiTuongNN_us", DungChung.NormalizationBoolean(data[22].ToString())),
                    new SqlParameter("@CoQuanCapDoiTuongNN_us", DungChung.NormalizationString(data[23].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDoiTuongNN", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "DoiTuongNN";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "DoiTuongNN";
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
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuongNNByID", para).Tables[0];
                ep.Result = duLieu;
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_DoiTuongNN", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "DoiTuongNN";
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
                    new SqlParameter("@DoiTuongNNID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetGhiChuCTDoiTuongNN", para).Tables[0];
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
        public string XuatExcel_DoiTuongNN(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachDoiTuongNguoiNuocNgoai" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/DanhMuc/DanhSachDoiTuongNguoiNuocNgoai.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/DanhMuc/DanhSachDoiTuongNguoiNuocNgoai/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/DanhMuc/DanhSachDoiTuongNguoiNuocNgoai/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuongNN_Excel", para).Tables[0];
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
                        ws.Range("A" + vDongXuat + ":Q" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["MaDoiTuongNN"].ToString().ToUpper();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["HoVaTen"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["NgayThangNamSinh"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["TenQuocTich"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["SoHoChieu"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["NgayCap"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["Tinh"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["Huyen"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["Xa"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["Thon"].ToString();
                        ws.Cell("O" + vDongXuat).Value = "'" + dr["DiaChiCuThe"].ToString();
                        ws.Cell("P" + vDongXuat).Value = "'" + dr["GhiChu"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("Q" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("Q" + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":Q" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/DanhMuc/DanhSachDoiTuongNguoiNuocNgoai/" + fileName;
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
        public string XemThongTinDoiTuongNN_TabView(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_XemThongTinDoiTuongNN_TabView", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XemThongTinDoiTuongNN_mdXemThongTin(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_XemThongTinDoiTuongNN_MDXemThongTin", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetQuaTrinhThuThap(string id)
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetNguoiNNLVN_TheoDoiTuong", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
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
                string fileName = "Mau03_TT01_2022_" + nameExcel + ".docx";
                string fileMau = Server.MapPath("~/WordMau/TT01_2022_TT_BLDTBXH/Mau03.docx");
                string fileKQ = Server.MapPath("~/xuatword" + "/" + nameExcel + "/NghiepVu/NguoiLaoDongNuocNgoai/" + fileName);
                string url = "~/xuatword" + "/" + nameExcel + "/NghiepVu/NguoiLaoDongNuocNgoai/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable tabDuLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_Mau03_TT01_2022", para).Tables[0];
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
                            if (text.Text.Contains("HOVATEN"))
                            {
                                text.Text = text.Text.Replace("HOVATEN", tabDuLieu.Rows[0]["HoVaTen"].ToString().ToUpper());
                            }
                            if (text.Text.Contains("tenTinh"))
                            {
                                text.Text = text.Text.Replace("tenTinh", tabDuLieu.Rows[0]["Tinh"].ToString().ToUpper());
                            }

                            if (text.Text.Contains("QuocTich"))
                            {
                                text.Text = text.Text.Replace("QuocTich", tabDuLieu.Rows[0]["QuocTich"].ToString());
                            }

                            if (text.Text.Contains("SoHoChieu"))
                            {
                                text.Text = text.Text.Replace("SoHoChieu", tabDuLieu.Rows[0]["SoHoChieu"].ToString());
                            }
                            if (text.Text.Contains("NgayCapHoChieu"))
                            {
                                text.Text = text.Text.Replace("NgayCapHoChieu", tabDuLieu.Rows[0]["NgayCapHoChieu"].ToString());
                            }

                            if (text.Text.Contains("SoGPLD"))
                            {
                                text.Text = text.Text.Replace("SoGPLD", tabDuLieu.Rows[0]["SoGPLD"].ToString());
                            }
                            if (text.Text.Contains("NgayCapGPLD"))
                            {
                                text.Text = text.Text.Replace("NgayCapGPLD", tabDuLieu.Rows[0]["NgayCapGPLD"].ToString());
                            }
                            if (text.Text.Contains("TenDoanhNghiep"))
                            {
                                text.Text = text.Text.Replace("TenDoanhNghiep", tabDuLieu.Rows[0]["TenDoanhNghiep"].ToString());
                            }
                            if (text.Text.Contains("MaDoanhNghiep"))
                            {
                                text.Text = text.Text.Replace("MaDoanhNghiep", tabDuLieu.Rows[0]["MaDoanhNghiep"].ToString());
                            }
                            if (text.Text.Contains("DCDoanhNghiep"))
                            {
                                text.Text = text.Text.Replace("DCDoanhNghiep", tabDuLieu.Rows[0]["DCDoanhNghiep"].ToString());
                            }

                            if (text.Text.Contains("LoaiHinhDN"))
                            {
                                text.Text = text.Text.Replace("LoaiHinhDN", tabDuLieu.Rows[0]["LoaiHinhDN"].ToString());
                            }

                            if (text.Text.Contains("LamTuNgay"))
                            {
                                text.Text = text.Text.Replace("LamTuNgay", tabDuLieu.Rows[0]["LamTuNgay"].ToString());
                            }
                            if (text.Text.Contains("LamDenNgay"))
                            {
                                text.Text = text.Text.Replace("LamDenNgay", tabDuLieu.Rows[0]["LamDenNgay"].ToString());
                            }

                            if (text.Text.Contains("gtnam"))
                            {
                                if (tabDuLieu.Rows[0]["GT"].ToString().ToUpper() == "NAM")
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
                                if (tabDuLieu.Rows[0]["GT"].ToString().ToUpper() == "NỮ")
                                {
                                    text.Text = text.Text.Replace("gtnu", "X");
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("gtnu", "");
                                }
                            }

                            #region xử lý ngày tháng năm sinh
                            if (text.Text.Contains("ns1"))
                            {
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
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
                                string ngaySinh = tabDuLieu.Rows[0]["NgaySinh"].ToString().ToUpper();
                                if (ngaySinh.Length == 10)
                                {
                                    text.Text = text.Text.Replace("ns8", ngaySinh[9].ToString());
                                }
                                else
                                {
                                    text.Text = text.Text.Replace("ns8", "");
                                }
                            }
                            #endregion
                            if (text.Text.Contains("CCDaoTao"))
                            {
                                text.Text = text.Text.Replace("CCDaoTao", tabDuLieu.Rows[0]["CCDaoTao"].ToString());
                            }
                            if (text.Text.Contains("DaiHoc"))
                            {
                                text.Text = text.Text.Replace("DaiHoc", tabDuLieu.Rows[0]["DaiHoc"].ToString());
                            }
                            if (text.Text.Contains("CaoHoc"))
                            {
                                text.Text = text.Text.Replace("CaoHoc", tabDuLieu.Rows[0]["CaoHoc"].ToString());
                            }
                            if (text.Text.Contains("TienSi"))
                            {
                                text.Text = text.Text.Replace("TienSi", tabDuLieu.Rows[0]["TienSi"].ToString());
                            }
                            if (text.Text.Contains("CCHanhNghe"))
                            {
                                text.Text = text.Text.Replace("CCHanhNghe", tabDuLieu.Rows[0]["CCHanhNghe"].ToString());
                            }

                            if (text.Text.Contains("QuanLy"))
                            {
                                text.Text = text.Text.Replace("QuanLy", tabDuLieu.Rows[0]["QuanLy"].ToString());
                            }
                            if (text.Text.Contains("GiamDoc"))
                            {
                                text.Text = text.Text.Replace("GiamDoc", tabDuLieu.Rows[0]["GiamDoc"].ToString());
                            }
                            if (text.Text.Contains("ChuyenGia"))
                            {
                                text.Text = text.Text.Replace("ChuyenGia", tabDuLieu.Rows[0]["ChuyenGia"].ToString());
                            }
                            if (text.Text.Contains("LDKyThuat"))
                            {
                                text.Text = text.Text.Replace("LDKyThuat", tabDuLieu.Rows[0]["LDKyThuat"].ToString());
                            }

                            //nghề công việc
                            if (text.Text.Contains("KhoaHocKyThuat"))
                            {
                                text.Text = text.Text.Replace("KhoaHocKyThuat", tabDuLieu.Rows[0]["KhoaHocKyThuat"].ToString());
                            }
                            if (text.Text.Contains("NhanVienTongHop"))
                            {
                                text.Text = text.Text.Replace("NhanVienTongHop", tabDuLieu.Rows[0]["NhanVienTongHop"].ToString());
                            }
                            if (text.Text.Contains("SucKhoe"))
                            {
                                text.Text = text.Text.Replace("SucKhoe", tabDuLieu.Rows[0]["SucKhoe"].ToString());
                            }
                            if (text.Text.Contains("NongLamThuySan"))
                            {
                                text.Text = text.Text.Replace("NongLamThuySan", tabDuLieu.Rows[0]["NongLamThuySan"].ToString());
                            }
                            if (text.Text.Contains("GiangVienGiangDay"))
                            {
                                text.Text = text.Text.Replace("GiangVienGiangDay", tabDuLieu.Rows[0]["GiangVienGiangDay"].ToString());
                            }
                            if (text.Text.Contains("CoKhi"))
                            {
                                text.Text = text.Text.Replace("CoKhi", tabDuLieu.Rows[0]["CoKhi"].ToString());
                            }
                            if (text.Text.Contains("NgheQL"))
                            {
                                text.Text = text.Text.Replace("NgheQL", tabDuLieu.Rows[0]["NgheQL"].ToString());
                            }
                            if (text.Text.Contains("DienDienTu"))
                            {
                                text.Text = text.Text.Replace("DienDienTu", tabDuLieu.Rows[0]["DienDienTu"].ToString());
                            }
                            if (text.Text.Contains("CongNgheThongTin"))
                            {
                                text.Text = text.Text.Replace("CongNgheThongTin", tabDuLieu.Rows[0]["CongNgheThongTin"].ToString());
                            }
                            if (text.Text.Contains("MayMocThietBi"))
                            {
                                text.Text = text.Text.Replace("MayMocThietBi", tabDuLieu.Rows[0]["MayMocThietBi"].ToString());
                            }
                            if (text.Text.Contains("VanHoaXaHoi"))
                            {
                                text.Text = text.Text.Replace("VanHoaXaHoi", tabDuLieu.Rows[0]["VanHoaXaHoi"].ToString());
                            }
                            if (text.Text.Contains("GiaoThongVanTai"))
                            {
                                text.Text = text.Text.Replace("GiaoThongVanTai", tabDuLieu.Rows[0]["GiaoThongVanTai"].ToString());
                            }
                            // hình thức làm việc
                            if (text.Text.Contains("HTHopDongLaoDong"))
                            {
                                text.Text = text.Text.Replace("HTHopDongLaoDong", tabDuLieu.Rows[0]["HTHopDongLaoDong"].ToString());
                            }
                            if (text.Text.Contains("HTLanhDao"))
                            {
                                text.Text = text.Text.Replace("HTLanhDao", tabDuLieu.Rows[0]["HTLanhDao"].ToString());
                            }
                            if (text.Text.Contains("HTNoiBo"))
                            {
                                text.Text = text.Text.Replace("HTNoiBo", tabDuLieu.Rows[0]["HTNoiBo"].ToString());
                            }
                            if (text.Text.Contains("HTDuAn"))
                            {
                                text.Text = text.Text.Replace("HTDuAn", tabDuLieu.Rows[0]["HTDuAn"].ToString());
                            }
                            if (text.Text.Contains("HTThoaThuan"))
                            {
                                text.Text = text.Text.Replace("HTThoaThuan", tabDuLieu.Rows[0]["HTThoaThuan"].ToString());
                            }
                            if (text.Text.Contains("HTPhiChinh"))
                            {
                                text.Text = text.Text.Replace("HTPhiChinh", tabDuLieu.Rows[0]["HTPhiChinh"].ToString());
                            }
                            if (text.Text.Contains("HTKhac"))
                            {
                                text.Text = text.Text.Replace("HTKhac", tabDuLieu.Rows[0]["HTKhac"].ToString());
                            }
                            // chuyên ngành đào tạo
                            if (text.Text.Contains("CMKhoaHocGDDT"))
                            {
                                text.Text = text.Text.Replace("CMKhoaHocGDDT", tabDuLieu.Rows[0]["CMKhoaHocGDDT"].ToString());
                            }
                            if (text.Text.Contains("CMNhanVan"))
                            {
                                text.Text = text.Text.Replace("CMNhanVan", tabDuLieu.Rows[0]["CMNhanVan"].ToString());
                            }
                            if (text.Text.Contains("CMKinhDoanhQL"))
                            {
                                text.Text = text.Text.Replace("CMKinhDoanhQL", tabDuLieu.Rows[0]["CMKinhDoanhQL"].ToString());
                            }
                            if (text.Text.Contains("CMAnNinhQP"))
                            {
                                text.Text = text.Text.Replace("CMAnNinhQP", tabDuLieu.Rows[0]["CMAnNinhQP"].ToString());
                            }
                            if (text.Text.Contains("CMDichVuVanTai"))
                            {
                                text.Text = text.Text.Replace("CMDichVuVanTai", tabDuLieu.Rows[0]["CMDichVuVanTai"].ToString());
                            }
                            if (text.Text.Contains("CMDichVuXH"))
                            {
                                text.Text = text.Text.Replace("CMDichVuXH", tabDuLieu.Rows[0]["CMDichVuXH"].ToString());
                            }
                            if (text.Text.Contains("CMThuY"))
                            {
                                text.Text = text.Text.Replace("CMThuY", tabDuLieu.Rows[0]["CMThuY"].ToString());
                            }
                            if (text.Text.Contains("CMXayDung"))
                            {
                                text.Text = text.Text.Replace("CMXayDung", tabDuLieu.Rows[0]["CMXayDung"].ToString());
                            }
                            if (text.Text.Contains("CMSanXuatCheBien"))
                            {
                                text.Text = text.Text.Replace("CMSanXuatCheBien", tabDuLieu.Rows[0]["CMSanXuatCheBien"].ToString());
                            }
                            if (text.Text.Contains("CMCongNgheKT"))
                            {
                                text.Text = text.Text.Replace("CMCongNgheKT", tabDuLieu.Rows[0]["CMCongNgheKT"].ToString());
                            }
                            if (text.Text.Contains("CMToanThongKe"))
                            {
                                text.Text = text.Text.Replace("CMToanThongKe", tabDuLieu.Rows[0]["CMToanThongKe"].ToString());
                            }
                            if (text.Text.Contains("CMNgheThuat"))
                            {
                                text.Text = text.Text.Replace("CMNgheThuat", tabDuLieu.Rows[0]["CMNgheThuat"].ToString());
                            }
                            if (text.Text.Contains("CMBaoChiTT"))
                            {
                                text.Text = text.Text.Replace("CMBaoChiTT", tabDuLieu.Rows[0]["CMBaoChiTT"].ToString());
                            }
                            if (text.Text.Contains("CMPhapLuat"))
                            {
                                text.Text = text.Text.Replace("CMPhapLuat", tabDuLieu.Rows[0]["CMPhapLuat"].ToString());
                            }
                            if (text.Text.Contains("CMKhoaHocTuNhien"))
                            {
                                text.Text = text.Text.Replace("CMKhoaHocTuNhien", tabDuLieu.Rows[0]["CMKhoaHocTuNhien"].ToString());
                            }
                            if (text.Text.Contains("CMMayTinCNTT"))
                            {
                                text.Text = text.Text.Replace("CMMayTinCNTT", tabDuLieu.Rows[0]["CMMayTinCNTT"].ToString());
                            }
                            if (text.Text.Contains("CMKyThuat"))
                            {
                                text.Text = text.Text.Replace("CMKyThuat", tabDuLieu.Rows[0]["CMKyThuat"].ToString());
                            }
                            if (text.Text.Contains("CMKienTrucXD"))
                            {
                                text.Text = text.Text.Replace("CMKienTrucXD", tabDuLieu.Rows[0]["CMKienTrucXD"].ToString());
                            }
                            if (text.Text.Contains("CMSucKH"))
                            {
                                text.Text = text.Text.Replace("CMSucKH", tabDuLieu.Rows[0]["CMSucKH"].ToString());
                            }
                            if (text.Text.Contains("CMNLTS"))
                            {
                                text.Text = text.Text.Replace("CMNLTS", tabDuLieu.Rows[0]["CMNLTS"].ToString());
                            }
                            if (text.Text.Contains("CMDuLichKS"))
                            {
                                text.Text = text.Text.Replace("CMDuLichKS", tabDuLieu.Rows[0]["CMDuLichKS"].ToString());
                            }
                            if (text.Text.Contains("CMMoiTruong"))
                            {
                                text.Text = text.Text.Replace("CMMoiTruong", tabDuLieu.Rows[0]["CMMoiTruong"].ToString());
                            }
                            if (text.Text.Contains("CMKhac"))
                            {
                                text.Text = text.Text.Replace("CMKhac", tabDuLieu.Rows[0]["CMKhac"].ToString());
                            }
                            ////thêm ngày thu thập và người ký
                            if (text.Text.Contains("NgayThuThap"))
                            {
                                text.Text = text.Text.Replace("NgayThuThap", tabDuLieu.Rows[0]["NgayThuThap"].ToString() == "0" ? "..." : tabDuLieu.Rows[0]["NgayThuThap"].ToString());
                            }
                            if (text.Text.Contains("ThangThuThap"))
                            {
                                text.Text = text.Text.Replace("ThangThuThap", tabDuLieu.Rows[0]["ThangThuThap"].ToString() == "0" ? "..." : tabDuLieu.Rows[0]["ThangThuThap"].ToString());
                            }
                            if (text.Text.Contains("NamThuThap"))
                            {
                                text.Text = text.Text.Replace("NamThuThap", tabDuLieu.Rows[0]["NamThuThap"].ToString() == "0" ? "..." : tabDuLieu.Rows[0]["NamThuThap"].ToString());
                            }

                            if (text.Text.Contains("NguoiKy"))
                            {
                                text.Text = text.Text.Replace("NguoiKy", tabDuLieu.Rows[0]["NguoiKy"].ToString().ToUpper());
                            }
                        }
                        var tables = mainPart.Document.Descendants<DocumentFormat.OpenXml.Wordprocessing.Table>().ToList();
                        int indexBangCuoi = tables.Count - 1;
                        string imageFile = Server.MapPath(tabDuLieu.Rows[0]["ChuKy"].ToString().Replace("*", ""));
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
                KetQua = "/xuatword/" + nameExcel + "/NghiepVu/NguoiLaoDongNuocNgoai/" + fileName;
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
        public string XoaDuLieu_NguoiNNLVVN(string id)
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
                string pathAnhDaiDien1 = DungChung.LayDuongDanDinhKem("NguoiNNLVVN", "ChuKy", "NguoiNNLVVNID", id);
                string pathAnhDaiDien2 = DungChung.LayDuongDanDinhKem("NguoiNNLVVN", "DinhKem", "NguoiNNLVVNID", id);
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_NguoiNNLVVN", para);
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

                    duLieu.Tables[0].TableName = "NguoiNNLVVN";
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
        public string LoadDuLieuXem(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllNguoiNNLVVNView", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string NoiDungThuThapCT(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                SqlParameter[] para = {
                    new SqlParameter("@NguoiNNLVVNID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetNoiDungThuThapNguoiNNLVVNCT", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson("Tải dữ liệu thất bại");
            }
        }

    }
}