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
using System.Web.Services;

namespace TTLD2024.Areas.NhaTuyenDung.Controllers
{
    public class HoSoUngTuyenController : Controller
    {
        // GET: NhaTuyenDung/HoSoUngTuyen
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() == null)
            {
                return Redirect("dang-nhap-nha-tuyen-dung.html");
            }
            return View();
        }
        [HttpPost]
        public string GetALLHoSoUngTuyen(string[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                DataTable NhaTuyenDung = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text, @"Select NhaTuyenDungID
                            from NhaTuyenDung 
                            WHERE NhaTuyenDungID = '" + NTSSession.GetUserNTD().NhaTuyenDungID.ToString() + "'").Tables[0];
                SqlParameter[] para = {
                    new SqlParameter("@NhaTuyenDungID" , DungChung.NormalizationGuid(NhaTuyenDung.Rows[0][0].ToString())),
                    new SqlParameter("@TrangThai_TimKiem_us" , DungChung.NormalizationNumber(data[0].ToString())),
                    new SqlParameter("@MucLuong_TimKiem_us" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@KinhNghiem_TimKiem_us" , DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@timKiem" , DungChung.NormalizationString(data[3].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoSoUngTuyen_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XemHoSoUngTuyen(string ID)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetHoSoUngTuyenViecLamByID_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string DuyetHoSoUngTuyen(string[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@NgayDuyet" , DungChung.NormalizationDateTime(data[1].ToString())),
                    new SqlParameter("@NoiDungDuyet" , DungChung.NormalizationString(data[2].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_UpdateTrangThaiHoSoUngTuyen_CTT", para).Tables[0];
                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Duyệt hồ sơ thành công!"
                };
                return JSonHelper.ToJson(ep);               
            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss
                {
                    Err = true,
                    Msg = "Duyệt hồ sơ không thành công!"
                };
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string LoaiHoSoUngTuyen(string[] data)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@NgayLoai" , DungChung.NormalizationDateTime(data[1].ToString())),
                    new SqlParameter("@NoiDungLoai" , DungChung.NormalizationString(data[2].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_UpdateTrangThaiLoaiHoSoUngTuyen_CTT", para).Tables[0];
                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Loại hồ sơ thành công!"
                };
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                ExecPermiss ep = new ExecPermiss
                {
                    Err = false,
                    Msg = "Loại hồ sơ không thành công!"
                };
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string XuatExcel(string[] data)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
            string fileName = "HoSoUngTuyen" + NTSSession.GetDonVi().MaDonVi + "-" + (DateTime.Now.ToString("ddMMyyyyHHmmss")) + ".xlsx";
            string fileMau = Server.MapPath("~/ExcelMau/HoSoUngTuyen.xlsx");
            string fileKQ = Server.MapPath("~/xuatexcel" + "/" + NTSSession.GetDonVi().MaDonVi + "/HoSoUngTuyen/" + fileName);
            string url = Server.MapPath("~/xuatexcel" + "/" + NTSSession.GetDonVi().MaDonVi + "/HoSoUngTuyen/");
            string KetQua = "/xuatexcel/" + NTSSession.GetDonVi().MaDonVi + "/HoSoUngTuyen/" + fileName;
            if (!System.IO.Directory.Exists(url))
            {
                System.IO.Directory.CreateDirectory(url);
            }
            DirectoryInfo di = new DirectoryInfo(url);
            FileInfo[] rgFiles = di.GetFiles();
            foreach (FileInfo fi in rgFiles)
            {
                fi.Delete();
            }
            System.IO.File.Copy(fileMau, fileKQ, true);
            var wb = new XLWorkbook(fileKQ);
            var ws = wb.Worksheet(1);
            try
            {
                int vDongXuat = 5;
                int stt = 1;
                DataTable NhaTuyenDung = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text, @"Select NhaTuyenDungCTTID
                            from NhaTuyenDungCTT 
                            WHERE UserID = '" + NTSSession.GetUser().UserID.ToString() + "'").Tables[0];
                SqlParameter[] para = {
                    new SqlParameter("@TrangThai" , DungChung.NormalizationNumber(data[0].ToString())),
                    new SqlParameter("@NhaTuyenDungCTTID" , DungChung.NormalizationGuid(NhaTuyenDung.Rows[0][0].ToString())),
                };
                DataTable table = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetAllHoSoUngTuyen_CTT_Excel", para).Tables[0];
                ws.Cell("A2").Value = "Ngày xuất " + DateTime.Now.ToString("dd/MM/yyyy");
                foreach (DataRow dr in table.Rows)
                {
                    ws.Cell("A" + vDongXuat).Value = stt;
                    ws.Cell("B" + vDongXuat).Value = "'" + dr["TenUngVien"].ToString();
                    ws.Cell("C" + vDongXuat).Value = "'" + dr["ViTriUngTuyen"].ToString();
                    ws.Cell("D" + vDongXuat).Value = "'" + dr["NgayUngTuyen"].ToString();
                    ws.Cell("E" + vDongXuat).Value = "'" + dr["KinhNghiemLamViec"].ToString();
                    ws.Cell("F" + vDongXuat).Value = "'" + dr["KhuVuc"].ToString();
                    ws.Cell("G" + vDongXuat).Value = "'" + dr["NgaySinh"].ToString();
                    ws.Cell("H" + vDongXuat).Value = "'" + dr["GioiTinh"].ToString();
                    ws.Cell("I" + vDongXuat).Value = "'" + dr["Email"].ToString();
                    ws.Cell("J" + vDongXuat).Value = "'" + dr["DienThoai"].ToString();
                    ws.Cell("K" + vDongXuat).Value = "'" + dr["DiaChi"].ToString();
                    ws.Cell("L" + vDongXuat).Value = "'" + dr["TenNganhNghe"].ToString();
                    ws.Cell("M" + vDongXuat).Value = "'" + dr["TenDiaDiem"].ToString();
                    ws.Cell("N" + vDongXuat).Value = "'" + dr["GioiThieu"].ToString();
                    ws.Cell("O" + vDongXuat).Value = "'" + dr["CongViecMongMuon"].ToString();
                    ws.Cell("P" + vDongXuat).Value = "'" + dr["MucTieuCongViec"].ToString();
                    ws.Cell("Q" + vDongXuat).Value = "'" + dr["TrangThai"].ToString();

                    ws.Range("A" + vDongXuat + ":Q" + vDongXuat).Style.Alignment.SetWrapText(true);
                    ws.Range("A" + vDongXuat + ":Q" + vDongXuat).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range("A" + vDongXuat + ":Q" + vDongXuat).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    vDongXuat += 1;
                    stt += 1;
                }
                wb.Save();
                return JSonHelper.ToJson("1_" + KetQua);
            }
            catch (Exception ex)
            {
                wb.Save();
                return KetQua;
            }
        }
        [HttpPost]
        public string XuatExcel_DSHoSoUngTuyen(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DateTime.Now.Year.ToString();
                string fileName = "DanhSachHoSoUngTuyen" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/CongThongTin/DanhSachHoSoUngTuyen.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/CongThongTin/DanhSachHoSoUngTuyen/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/CongThongTin/DanhSachHoSoUngTuyen/";
                string KetQua = "";
                DataTable NhaTuyenDung = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text, @"Select NhaTuyenDungID
                            from NhaTuyenDung 
                            WHERE NhaTuyenDungID = '" + NTSSession.GetUserNTD().NhaTuyenDungID.ToString() + "'").Tables[0];
                SqlParameter[] para = {
                    new SqlParameter("@NhaTuyenDungID" , DungChung.NormalizationGuid(NhaTuyenDung.Rows[0][0].ToString())),
                    new SqlParameter("@TrangThai_TimKiem_us" , DungChung.NormalizationNumber(data[0].ToString())),
                    new SqlParameter("@MucLuong_TimKiem_us" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@KinhNghiem_TimKiem_us" , DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@timKiem" , DungChung.NormalizationString(data[3].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoSoUngTuyen_CTTExcel", para).Tables[0];

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
                        ws.Range("A" + vDongXuat + ":M" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["TenUngVien"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["ViTriUngTuyen"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["TenNganhNghe"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["NgayUngTuyen"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["KinhNghiemLamViec"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["NgaySinh"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["GioiTinh"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["DienThoai"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenDiaDiem"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["CongViecMongMuon"].ToString();
                        if (dr["TrangThai"].ToString() == "1")
                        {
                            ws.Cell("M" + vDongXuat).Value = "Chờ duyệt";
                        }
                        else if (dr["TrangThai"].ToString() == "2")
                        {
                            ws.Cell("M" + vDongXuat).Value = "Đã duyệt";
                        }
                        else if (dr["TrangThai"].ToString() == "3")
                        {
                            ws.Cell("M" + vDongXuat).Value = "Từ chối";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":M" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/CongThongTin/DanhSachHoSoUngTuyen/" + fileName;
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