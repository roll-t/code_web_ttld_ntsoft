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
    public class DangTinTuyenDungController : Controller
    {
        // GET: NhaTuyenDung/DangTinTuyenDung
        public ActionResult Index()
        {
            if (NTSSession.GetUserNTD() == null)
            {
                return Redirect("dang-nhap-nha-tuyen-dung.html");
            }
            return View();
        }

        [HttpPost]
        public string GetALL(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                
                SqlParameter[] para = {
                    new SqlParameter("@UserID" , DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                    new SqlParameter("@TrangThai_TimKiem_us" , DungChung.NormalizationNumber(data[0].ToString())),
                    new SqlParameter("@ViTriCongViec_TimKiem_us" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MucLuong_TimKiem_us" , DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@KinhNghiem_TimKiem_us" , DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@HocVan_TimKiem_us" , DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@timKiem" , DungChung.NormalizationString(data[5].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTinTuyenDung_ByNhaTuyenDungID", para).Tables[0];
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
                SqlParameter[] para = {
                    new SqlParameter("@Loai" ,data[0].ToString()),
                    new SqlParameter("@TinTuyenDungID" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@NgayDangTuyen",  DungChung.NormalizationDateTime( data[2].ToString())),
                    new SqlParameter("@HanNop", DungChung.NormalizationDateTime(data[3].ToString())),
                    new SqlParameter("@ViTriTuyenDung",DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@CapBac",  DungChung.NormalizationGuid(data[5].ToString())),
                    new SqlParameter("@NganhNghe", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@DiaDiem", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@SoLuong", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@GioiTinh",  DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@HinhThucLamViec", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@TrinhDoHocVan", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@KinhNghiem", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@MucLuong", DungChung.NormalizationGuid(data[13].ToString())),
                    new SqlParameter("@MoTaCongViec", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@YeuCauCongViec", DungChung.NormalizationString(data[15].ToString())),
                    new SqlParameter("@CheDoPhucLoi", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@YeuCauHoSo", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@HinhThucNopHoSo", DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@NguoiLienHe", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@ChucVu", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[21].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[22].ToString())),
                    new SqlParameter("@DiaChi", DungChung.NormalizationString(data[23].ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                    new SqlParameter("@DangSD",DungChung.NormalizationBoolean(data[24].ToString())),
                    new SqlParameter("@DoiTuongUuTienID",DungChung.NormalizationString(data[25].ToString())),
                    new SqlParameter("@MaViecTimNguoi",DungChung.NormalizationString(data[26].ToString())),
                    new SqlParameter("@TenViecLam",DungChung.NormalizationString(data[27].ToString()))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuThongTin_ViecTimNguoi", para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "them")
                {
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuSua(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {             
                
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetViecTimNguoi_ByID", para).Tables[0];
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
        public string XoaTinTuyenDung(string ID)
        {
            try
            {
               
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_ViecTimNguoi", para);
                //Returning Json Data

                return NTSThongBao.XoaThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GuiDuyetTinTuyenDung(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GuiDuyetViecTimNguoi_CTT", para);
                //Returning Json Data

                return NTSThongBao.CapNhatThanhCong();

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XemNoiDungTuChoi(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNoiDUngTuChoi_TinTuyenDung_CTT", para).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }
        [HttpPost]
        public string XuatExcel_DSTinTuyenDung(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DateTime.Now.Year.ToString();
                string fileName = "DanhSachTinTuyenDung" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/CongThongTin/DanhSachTinTuyenDung.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/CongThongTin/DanhSachTinTuyenDung/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/CongThongTin/DanhSachTinTuyenDung/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@UserID" , DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                    new SqlParameter("@TrangThai_TimKiem_us" , DungChung.NormalizationNumber(data[0].ToString())),
                    new SqlParameter("@ViTriCongViec_TimKiem_us" , DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MucLuong_TimKiem_us" , DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@KinhNghiem_TimKiem_us" , DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@HocVan_TimKiem_us" , DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@timKiem" , DungChung.NormalizationString(data[5].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetTinTuyenDung_Excel", para).Tables[0];

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
                        ws.Range("A" + vDongXuat + ":O" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["NgayDang"].ToString();
                        ws.Cell("C" + vDongXuat).Value = "'" + dr["TenCongViec"].ToString().ToUpper();
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["SoLuongTuyen"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["HanNop"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["TenMucLuong"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["TenYeuCauKinhNghiem"].ToString();
                        if (dr["MaGioiTinh"].ToString() == "0")
                        {
                            ws.Cell("H" + vDongXuat).Value = "Không yêu cầu";
                        }
                        else if (dr["MaGioiTinh"].ToString() == "1")
                        {
                            ws.Cell("H" + vDongXuat).Value = "Nam";
                        }
                        else if (dr["MaGioiTinh"].ToString() == "2")
                        {
                            ws.Cell("H" + vDongXuat).Value = "Nữ";
                        }
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["TenTrinhDoHV"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["TenNganhNghe"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenDiaDiemLamViec"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["HoTen_NguoiLienHe"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["SoDT_NguoiLienHe"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["Email_NguoiLienhe"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("O" + vDongXuat).Value = "Đang hiển thị";
                        }
                        else
                        {
                            ws.Cell("O" + vDongXuat).Value = "Đang ẩn hiển thị";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":O" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/CongThongTin/DanhSachTinTuyenDung/" + fileName;
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