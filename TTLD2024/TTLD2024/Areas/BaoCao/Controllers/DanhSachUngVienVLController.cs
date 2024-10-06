using ClosedXML.Excel;
using Cong.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.BaoCao.Controllers
{
    public class DanhSachUngVienVLController : Controller
    {
        // GET: BaoCao/DanhSachUngVienVL
        private static string BaoCaoID;
        public ActionResult Index(string id, int? p)
        {
            BaoCaoID = id;
            return View();
        }
        [HttpPost]
        public string XuatExcel()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachUngVien" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/BaoCao/DanhSachUngVien.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/BaoCao/DanhSachUngVien/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/BaoCao/DanhSachUngVien/";
                string KetQua = "";
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllTrinhDoDaoTao", null).Tables[0];
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
                int vDongXuat = 4;
                if (duLieu.Rows.Count > 0)
                {
                    int stt = 0;
                    foreach (DataRow dr in duLieu.Rows)
                    {
                        stt += 1;
                        ws.Range("A" + vDongXuat + ":E" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["MaTrinhDoDaoTao"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["TenTrinhDoDaoTao"].ToString();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["DienGiai"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("E" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("E" + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":E" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/BaoCao/DanhSachUngVien/" + fileName;
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
        public string XemBaoCao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "DanhSachUngVien" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/BaoCao/DanhSachUngVien.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/BaoCao/DanhSachUngVien/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/BaoCao/DanhSachUngVien/";
                string KetQua = "";
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllTrinhDoDaoTao", null).Tables[0];
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
                int vDongXuat = 4;
                if (duLieu.Rows.Count > 0)
                {
                    int stt = 0;
                    foreach (DataRow dr in duLieu.Rows)
                    {
                        stt += 1;
                        ws.Range("A" + vDongXuat + ":E" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["MaTrinhDoDaoTao"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["TenTrinhDoDaoTao"].ToString();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["DienGiai"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("E" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("E" + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":E" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/BaoCao/DanhSachUngVien/" + fileName;
                sqlFun.XlsxToPDF(KetQua);
                sqlFun.XlsxToHtml(KetQua);

                return JSonHelper.ToJson(sqlFun.XlsxToHtml(KetQua));
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}