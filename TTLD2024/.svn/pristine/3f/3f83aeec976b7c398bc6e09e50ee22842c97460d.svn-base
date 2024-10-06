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

namespace TTLD2024.Areas.NhaTuyenDung
{
    public class HoSoLuuTruController : Controller
    {
        // GET: NhaTuyenDung/HoSoLuuTru
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() == null)
            {
                return Redirect("dang-nhap-nha-tuyen-dung.html");
            }
            return View();
        }

        [HttpPost]
        public  string getALLHoSoLuuTru(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                    new SqlParameter("@MucLuong_TimKiem_us" , DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@KinhNghiem_TimKiem_us" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@HocVan_TimKiem_us" , DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@timKiem" , DungChung.NormalizationString(data[3].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoSoLuuTru_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string getHoSoLuuTruTheoID(string ID)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoSoLuuTruByID_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaHoSoLuuTru(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_UngVienDaLuu_CTT", para).Tables[0];
                return NTSThongBao.XoaThanhCong();
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XuatExcel_DSHoSoLuuTru(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DateTime.Now.Year.ToString();
                string fileName = "DanhSachHoSoLuuTru" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/CongThongTin/DanhSachHoSoLuuTru.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/CongThongTin/DanhSachHoSoLuuTru/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/CongThongTin/DanhSachHoSoLuuTru/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID.ToString())),
                    new SqlParameter("@MucLuong_TimKiem_us" , DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@KinhNghiem_TimKiem_us" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@HocVan_TimKiem_us" , DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@timKiem" , DungChung.NormalizationString(data[3].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetHoSoLuuTruByID_CTTExcel", para).Tables[0];

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
                if (duLieu.Rows.Count > 0)
                {
                    int stt = 0;
                    foreach (DataRow dr in duLieu.Rows)
                    {
                        stt += 1;
                        ws.Range("A" + vDongXuat + ":N" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["NgayUngTuyen"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["TenUngVien"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["ViTriUngTuyen"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["NgaySinh"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["GioiTinh"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["DienThoai"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["MucLuong"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["TenNganhNghe"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenDiaDiem"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["CongViecMongMuon"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["GioiThieu"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["MucTieuCongViec"].ToString();
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":N" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/CongThongTin/DanhSachHoSoLuuTru/" + fileName;
                sqlFun.XlsxToPDF(KetQua);
                sqlFun.XlsxToHtml(KetQua);

                return JSonHelper.ToJson(KetQua);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
    }
}