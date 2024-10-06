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


namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class HoGiaDinhController : Controller
    {
        // GET: QuanLy/HoGiaDinh
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
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoGiaDinh", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //[HttpPost]
        //public string LayMaTuTang()
        //{
        //    ExecPermiss ep = new ExecPermiss();
        //    try
        //    {
        //        if (!NTSSecurity.Validate())
        //        {
        //            return NTSThongBao.KhongCoQuyenTruyCap();
        //        }
        //        string maTuTang = DungChung.taoMaTuTangTheoDM("HGD", "HoGiaDinh", "MaHoGiaDinh", "", "");
        //        ep.Result = maTuTang;
        //        return JSonHelper.ToJson(ep);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NTSThongBao.CoLoiXayRa(ex);
        //    }
        //}

        public static string KiemTraTonTaiSoCCCD(string Loai, string SoCCCD) // Kiểm tra tồn tại số CMND/CCCD/số định danh khi them mới hộ gia đình và thêm/sửa thành viên
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] sqlParams = {
                            new SqlParameter("@Loai", Loai),
                            new SqlParameter("@SoCCCD", SoCCCD),
                        };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSoCCCD", sqlParams);
                string result;
                if (duLieu.Tables[0].Rows.Count > 0) // nếu trùng số CMND
                {
                    if (duLieu.Tables[0].Rows[0]["HoGiaDinhID"].ToString() == "00000000-0000-0000-0000-000000000000") // HoGiaDinhID = rỗng -> trùng sô cmnd với thành viên chưa thuộc hộ gia đình
                    {
                        result = "0";
                    }
                    else
                    {
                        result = "1"; // trung số cmnd với chủ hộ và thành viên thuộc hộ gia đình
                    }
                    ep.Result = duLieu;
                    ep.Msg = result;
                    return JSonHelper.ToJson(ep);
                }
                ep.Result = duLieu;
                ep.Msg = "2";
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // Kiểm tra tồn tại số CMND/CCCD/số định danh khi sửa hộ gia đình
        public static string KiemTraTonTaiSuaSoCCCD(string HoGiaDinhID, string ThanhVienHoGDID, string SoCCCD, string SoCCCDHienTai)
        {
            try
            {
                SqlParameter[] sqlParams = {
                        new SqlParameter("@HoGiaDinhID",DungChung.NormalizationGuid( HoGiaDinhID)),
                        new SqlParameter("@ThanhVienHoGDID",DungChung.NormalizationGuid( ThanhVienHoGDID)),
                        new SqlParameter("@SoCCCD", SoCCCD),
                        new SqlParameter("@SoCCCDHienTai", SoCCCDHienTai),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSuaCCCD", sqlParams);
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
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
                if (data[0].ToString() == "them" && DungChung.KiemTraTonTai(data[2].ToString(), "MaHoGiaDinh", "HoGiaDinh"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                string Loai = data[0].ToString();
                if (Loai == "them")
                {
                    string tonTai = KiemTraTonTaiSoCCCD("HoGiaDinh", data[4].ToString());

                    // Chuyển đổi chuỗi tonTai thành đối tượng JSON
                    JObject toTaiJson = JObject.Parse(tonTai);

                    JArray toTaiTable = (JArray)toTaiJson["Result"]["Table"];
                    string tonTaiMsg = toTaiJson["Msg"].ToString();
                    DataTable dataTable = JsonConvert.DeserializeObject<DataTable>(toTaiTable.ToString());

                    // Truy cập và lấy giá trị của trường "Msg" từ đối tượng JSON
                    if (tonTaiMsg == "1") // tonTaiMsg = 1 trường hợp thêm thì trung số CMND/CCCD với chủ hộ hoặc thành viện thuộc HGD khác 
                    {
                        string tenBien = "@SoCCCD_@HoVaTenChuHo_@MaHoGiaDinh_@DiaChiCuTheTT_@HoVaTenThanhVien";
                        string giaTri = data[4].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTenChuHo"].ToString()
                            + "_" + dataTable.Rows[0]["MaHoGiaDinh"].ToString()
                            + "_" + dataTable.Rows[0]["DiaChiCuTheTT"].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTen"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("001", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD

                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                    else if (tonTaiMsg == "0")
                    {
                        string tenBien = "@SoCCCD_@HoVaTenThanhVien_@DiaChiCuTheTT";
                        string giaTri = data[4].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTen"].ToString()
                            + "_" + dataTable.Rows[0]["DiaChiCuTheTT"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("002", tenBien, giaTri); // 002 la loi thong bao trung so CMND/CCCD của thành viên, thành viên này chưa thuộc hộ gia đình
                        ep.Logs = "0";
                        ep.Result = dataTable.Rows[0]["ThanhVienHoGDID"].ToString();
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }
                if (Loai == "sua")
                {
                    string tonTai = KiemTraTonTaiSuaSoCCCD(data[1].ToString(), data[25].ToString(), data[4].ToString(), data[26].ToString());
                    // Chuyển đổi chuỗi tonTai thành đối tượng JSON
                    JObject toTaiJson = JObject.Parse(tonTai);
                    JArray toTaiTable = (JArray)toTaiJson["Table"];
                    DataTable dataTable = JsonConvert.DeserializeObject<DataTable>(toTaiTable.ToString());
                    if (dataTable.Rows.Count > 0)
                    {
                        string tenBien = "@SoCCCD_@HoVaTenChuHo_@MaHoGiaDinh_@DiaChiCuTheTT_@HoVaTenThanhVien";
                        string giaTri = data[4].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTenChuHo"].ToString()
                            + "_" + dataTable.Rows[0]["MaHoGiaDinh"].ToString()
                            + "_" + dataTable.Rows[0]["DiaChiCuTheTT"].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTen"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("001", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD

                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                if (data[0].ToString() == "sua" && DungChung.KiemTraTonTaiSua(data[2].ToString(), "MaHoGiaDinh", "HoGiaDinh", "HoGiaDinhID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaHoGiaDinh", data[2].ToString()),
                    new SqlParameter("@HoVaTenChuHo", data[3].ToString()),
                    new SqlParameter("@SoCCCD", data[4].ToString()),
                    new SqlParameter("@NgayCap", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@NoiCapID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@GioiTinhID", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@NgayThangNamSinh", DungChung.NormalizationDateTime(data[8].ToString())),
                    new SqlParameter("@QuocTichID", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@DanTocID", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@TonGiaoID", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@PhanLoaiHoGDID", DungChung.NormalizationGuid(data[14].ToString())),
                    new SqlParameter("@LoaiHoGD", DungChung.NormalizationNumber(data[15].ToString())),
                    new SqlParameter("@SoGiayTo", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@SoNhaTT", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonTT", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@DiaBanHCID_XaTT", DungChung.NormalizationGuid(data[19].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenTT", DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhTT", DungChung.NormalizationGuid(data[21].ToString())),
                    new SqlParameter("@DiaChiCuTheTT", DungChung.NormalizationString(data[22].ToString())),
                    new SqlParameter("@TrangThai", DungChung.NormalizationBoolean(data[24].ToString())),
                    new SqlParameter("@GhiChu", DungChung.NormalizationString(data[23].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinHoGiaDinh", para);
                string ID;
                if (Loai == "them")
                {
                    ID = duLieu.Tables[0].Rows[0]["HoGiaDinhID"].ToString();
                }
                else
                {
                    ID = data[1].ToString();
                }
                SqlParameter[] para2 = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("@MaHoGiaDinh", data[2].ToString()),
                    new SqlParameter("@HoVaTenChuHo", data[3].ToString()),
                    new SqlParameter("@SoCCCD", data[4].ToString()),
                    new SqlParameter("@NgayCap", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@NoiCapID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@GioiTinhID", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@NgayThangNamSinh", DungChung.NormalizationDateTime(data[8].ToString())),
                    new SqlParameter("@QuocTichID", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@DanTocID", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@TonGiaoID", DungChung.NormalizationGuid(data[11].ToString())),
                    new SqlParameter("@SoDienThoai", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[13].ToString())),
                     new SqlParameter("@SoNhaTT", DungChung.NormalizationString(data[17].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonTT", DungChung.NormalizationGuid(data[18].ToString())),
                    new SqlParameter("@DiaBanHCID_XaTT", DungChung.NormalizationGuid(data[19].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenTT", DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhTT", DungChung.NormalizationGuid(data[21].ToString())),
                    new SqlParameter("@DiaChiCuTheTT", DungChung.NormalizationString(data[22].ToString())),
                    new SqlParameter("@TrangThai", DungChung.NormalizationBoolean(data[24].ToString())),
                    new SqlParameter("@GhiChu", DungChung.NormalizationString(data[23].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieuThanhVien = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinHoGiaDinhQuaThanhVien", para2);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "HoGiaDinh";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Result = duLieu.Tables[0].Rows[0]["HoGiaDinhID"];
                    ep.Msg = "Thêm mới dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "HoGiaDinh";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        ep.Result = duLieu.Tables[0].Rows[0]["HoGiaDinhID"];
                        ep.Msg = "Cập nhật dữ liệu thành công!";
                        return JSonHelper.ToJson(ep);
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
        public string CapNhatThongTinDTQuaHGD(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@MaHo", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@SoGiayTo", DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@LoaiHo", DungChung.NormalizationNumber(data[1].ToString())),
                    new SqlParameter("@PhanLoaiHo", DungChung.NormalizationGuid(data[4].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateThanhVienHoGDQuaHoGiaDinh", para);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    duLieu.Tables[0].TableName = "HoGiaDinh";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Result = duLieu;
                    ep.Msg = "Thêm mới dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_HoGiaDinh", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "HoGiaDinh";
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllHoGiaDinhByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XuatExcel_HoGiaDinh(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "HoGiaDinh" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/DanhMuc/HoGiaDinh.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/DanhMuc/HoGiaDinh/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/DanhMuc/HoGiaDinh/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllHoGiaDinh_Excel", para).Tables[0];
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
                        ws.Range("A" + vDongXuat + ":S" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["MaHoGiaDinh"].ToString();
                        if (dr["LoaiHoGD"].ToString() == "1")
                        {
                            ws.Cell("C" + vDongXuat).Value = "Sổ hộ khẩu";
                        }
                        else
                        {
                            ws.Cell("C" + vDongXuat).Value = "Sổ tạm trú";
                        }
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["SoGiayTo"].ToString().ToUpper();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["HoVaTenChuHo"].ToString().ToUpper();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["NgayThangNamSinh"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["SoCCCD"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["NgayCap"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["TenNoiCap"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["TenLoaiHo"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["TenDanToc"].ToString();
                        ws.Cell("O" + vDongXuat).Value = "'" + dr["TenQuocTich"].ToString();
                        ws.Cell("P" + vDongXuat).Value = "'" + dr["TenTonGiao"].ToString();
                        ws.Cell("Q" + vDongXuat).Value = "'" + dr["DiaChiCuTheTT"].ToString();
                        ws.Cell("R" + vDongXuat).Value = "'" + dr["GhiChu"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("S" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("S" + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":T" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/DanhMuc/HoGiaDinh/" + fileName;
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
        public string XuatExcel_ThanhVienHoGD(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string nameExcel = DungChung.RemoveDiacritics(NTSSession.GetDonVi().TenDonVi + NTSSession.GetDonVi().MaDonVi);
                string fileName = "ThanhVienHoGiaDinh" + nameExcel + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/DanhMuc/ThanhVienHoGiaDinh.xlsx");
                string fileKQ = Server.MapPath("~/xuatexcel" + "/" + nameExcel + "/DanhMuc/ThanhVienHoGiaDinh/" + fileName);
                string url = "~/xuatexcel" + "/" + nameExcel + "/DanhMuc/ThanhVienHoGiaDinh/";
                string KetQua = "";
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThanhVienHoGD_Excel", para).Tables[0];
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
                        ws.Range("A" + vDongXuat + ":P" + vDongXuat).Style.Alignment.SetWrapText(true).Border.SetTopBorder(XLBorderStyleValues.Dashed).Border.SetBottomBorder(XLBorderStyleValues.Dashed).Border.SetLeftBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin);
                        ws.Cell("A" + vDongXuat).Value = stt;
                        ws.Cell("B" + vDongXuat).Value = "'" + dr["HoVaTen"].ToString().ToUpper();
                        if (dr["TenMoiQuanHe"].ToString() == "")
                        {
                            ws.Cell("C" + vDongXuat).Value = "Chủ hộ";
                        }
                        else
                        {
                            ws.Cell("C" + vDongXuat).Value = "'" + dr["TenMoiQuanHe"].ToString();
                        }
                        ws.Cell("D" + vDongXuat).Value = "'" + dr["TenGioiTinh"].ToString();
                        ws.Cell("E" + vDongXuat).Value = "'" + dr["NgayThangNamSinh"].ToString();
                        ws.Cell("F" + vDongXuat).Value = "'" + dr["SoCCCD"].ToString();
                        ws.Cell("G" + vDongXuat).Value = "'" + dr["NgayCap"].ToString();
                        ws.Cell("H" + vDongXuat).Value = "'" + dr["TenNoiCap"].ToString();
                        ws.Cell("I" + vDongXuat).Value = "'" + dr["DiaChiCuTheTT"].ToString();
                        ws.Cell("J" + vDongXuat).Value = "'" + dr["Email"].ToString();
                        ws.Cell("K" + vDongXuat).Value = "'" + dr["SoDienThoai"].ToString();
                        ws.Cell("L" + vDongXuat).Value = "'" + dr["TenDanToc"].ToString();
                        ws.Cell("M" + vDongXuat).Value = "'" + dr["TenQuocTich"].ToString();
                        ws.Cell("N" + vDongXuat).Value = "'" + dr["TenTonGiao"].ToString();
                        ws.Cell("P" + vDongXuat).Value = "'" + dr["GhiChu"].ToString();
                        if (dr["TrangThai"].ToString() == "True")
                        {
                            ws.Cell("P" + vDongXuat).Value = "";
                        }
                        else
                        {
                            ws.Cell("P" + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        vDongXuat += 1;

                    }
                    ws.Range("A" + vDongXuat + ":P" + vDongXuat).Style.Font.SetBold(true).Border.SetTopBorder(XLBorderStyleValues.Thin);


                }
                string ngayInBaoCao = DateTime.Now.ToString("dd/MM/yyyy");
                ws.Cell("A4").Value = "Ngày xuất " + ngayInBaoCao;

                wb.Save();
                KetQua = "/xuatexcel/" + nameExcel + "/DanhMuc/ThanhVienHoGiaDinh/" + fileName;
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
                    new SqlParameter("@HoGiaDInhID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetGhiChuCT", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson("Tải dữ liệu thất bại");
            }
        }

        // Thành viên hộ gia đình

        [HttpPost]
        public string GetAllThanhVienHoGD()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllThanhVienHoGD", null).Tables[0];
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
        public string LuuThongTin_ThanhVien(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string Loai = data[0].ToString();
                if(Loai == "them")
                {
                    string tonTai = KiemTraTonTaiSoCCCD("ThanhVienHoGD", data[10].ToString());

                    // Chuyển đổi chuỗi tonTai thành đối tượng JSON
                    JObject toTaiJson = JObject.Parse(tonTai);

                    JArray toTaiTable = (JArray)toTaiJson["Result"]["Table"];   
                    string tonTaiMsg = toTaiJson["Msg"].ToString();
                    DataTable dataTable = JsonConvert.DeserializeObject<DataTable>(toTaiTable.ToString());

                    if(tonTaiMsg == "1")
                    {
                        string tenBien = "@SoCCCD_@HoVaTenChuHo_@MaHoGiaDinh_@DiaChiCuTheTT_@HoVaTenThanhVien";
                        string giaTri = data[10].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTenChuHo"].ToString()
                            + "_" + dataTable.Rows[0]["MaHoGiaDinh"].ToString()
                            + "_" + dataTable.Rows[0]["DiaChiCuTheTT"].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTen"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("001", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD

                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }else if(tonTaiMsg == "0")
                    {
                        string tenBien = "@SoCCCD_@HoVaTenThanhVien_@DiaChiCuTheTT";
                        string giaTri = data[10].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTen"].ToString()
                            + "_" + dataTable.Rows[0]["DiaChiCuTheTT"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("003", tenBien, giaTri); // 003 la loi thong bao trung so CMND/CCCD với thành viên, thành viên này chưa thuộc hộ gia đình

                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }
                if (Loai == "sua")
                {
                    string tonTai = KiemTraTonTaiSuaSoCCCD(data[1].ToString(), data[15].ToString(), data[10].ToString(), data[30].ToString());
                    // Chuyển đổi chuỗi tonTai thành đối tượng JSON
                    JObject toTaiJson = JObject.Parse(tonTai);
                    JArray toTaiTable = (JArray)toTaiJson["Table"];
                    DataTable dataTable = JsonConvert.DeserializeObject<DataTable>(toTaiTable.ToString());
                    if (dataTable.Rows.Count > 0)
                    {
                        string tenBien = "@SoCCCD_@HoVaTenChuHo_@MaHoGiaDinh_@DiaChiCuTheTT_@HoVaTenThanhVien";
                        string giaTri = data[10].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTenChuHo"].ToString()
                            + "_" + dataTable.Rows[0]["MaHoGiaDinh"].ToString()
                            + "_" + dataTable.Rows[0]["DiaChiCuTheTT"].ToString()
                            + "_" + dataTable.Rows[0]["HoVaTen"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("001", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD

                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ThanhVienHoGDID", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MoiQuanHeIDDT",DungChung.NormalizationGuid( data[2].ToString())),
                    new SqlParameter("@HoVaTenDT", data[3].ToString()),
                    new SqlParameter("@GioiTinhDT", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@NgaySinhDT", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@TinhID_NS", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@DanTocIDDT", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@TonGiaoIDDT", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@QuocGiaIDDT", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@SoCMND_DoiTuong", DungChung.NormalizationString(data[10].ToString())),
                    new SqlParameter("@NgayCapDT", DungChung.NormalizationDateTime(data[11].ToString())),
                    new SqlParameter("@NoiCapDT", DungChung.NormalizationGuid(data[12].ToString())),
                    new SqlParameter("@SoDienThoaiDT", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@EmailDT", DungChung.NormalizationString(data[14].ToString())),
                    new SqlParameter("@GhiChuDT", DungChung.NormalizationString(data[16].ToString())),
                    new SqlParameter("@TrangThaiDT", DungChung.NormalizationBoolean(data[17].ToString())),
                    new SqlParameter("@SoNhaTT", DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonTT", DungChung.NormalizationGuid(data[19].ToString())),
                    new SqlParameter("@DiaBanHCID_XaTT", DungChung.NormalizationGuid(data[20].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenTT", DungChung.NormalizationGuid(data[21].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhTT", DungChung.NormalizationGuid(data[22].ToString())),
                    new SqlParameter("@DiaChiCuTheTT", DungChung.NormalizationString(data[23].ToString())),
                    new SqlParameter("@DiaBanHCID_ThonHT", DungChung.NormalizationGuid(data[24].ToString())),
                    new SqlParameter("@DiaBanHCID_XaHT", DungChung.NormalizationGuid(data[25].ToString())),
                    new SqlParameter("@DiaBanHCID_HuyenHT", DungChung.NormalizationGuid(data[26].ToString())),
                    new SqlParameter("@DiaBanHCID_TinhHT", DungChung.NormalizationGuid(data[27].ToString())),
                    new SqlParameter("@SoNhaHT", DungChung.NormalizationString(data[28].ToString())),
                    new SqlParameter("@DiaChiCuTheHT", DungChung.NormalizationString(data[29].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinThanhVienHoGD", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "HoGiaDinh";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "HoGiaDinh";
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
        public string LoadDuLieuSua_ThanhVienHoGD(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThanhVienHoGDByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string ThanhVienHoGD_ThuocHoGD(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThanhVienHoGD_ThuocHoGD", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaDuLieu_ThanhVienHoGD(string id)
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ThanhVienHoGD", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "ThanhVienHoGD";
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
        public string KiemTraXoa(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetKiemTraXoaHoGiaDinh", DungChung.NormalizationGuid(ID)).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        // Tai lieu

        [HttpPost]
        public string GetAll_TL(string id)
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllTaiLieuLuuGiu_HoGiaDinh", para).Tables[0];
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
        public string LayDuLieuSua_TL(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTaiLieuLuuGiuByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string XoaDuLieu_TL(string id)
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
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_TaiLieuLuuGiu", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "TaiLieuLuuGiu";
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
        public string GhiChuDT_CT(string id)
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetGhiChuDT_CT", para).Tables[0];
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
