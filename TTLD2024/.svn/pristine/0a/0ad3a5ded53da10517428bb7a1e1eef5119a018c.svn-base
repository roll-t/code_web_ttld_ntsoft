using ClosedXML.Excel;
using Cong.Class;
using System;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using TTLD2024.Class;
using TTLD2024.DataConnect;
using WEB_DLL;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class UsersController : Controller
    {
        // GET: HeThong/Users
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string GetAll()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllUser", null).Tables[0];
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
        public string layDSDonViXetDuyet(string DonViID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonViXetDuyet", new SqlParameter("@DonViID", DungChung.NormalizationGuid(DonViID.ToString()))).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(null);
            }
        }

        [HttpPost]
        public string GetAllNhomNguoiDung()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllNhomNguoiDung", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);

            }
        }


        [HttpPost]
        public string TaiFileExcelKiemTra()
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());

            try
            {
                //Workbook workbook = new Workbook();
                DataTable dt = (DataTable)Session["DataTableNhanExcel" + NTSSession.GetUser().UserID];
                _LOfficeExcel _vLOfficeExcel = new _LOfficeExcel();
                string fileMau = Server.MapPath("~/ExcelMau/HeThong/NguoiDung_Loi.xlsx");
                string url = Server.MapPath("~/Excel/NguoiDung_Loi.xlsx");
                DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/ExcelMau/HeThong/NguoiDung_Loi.xlsx"));
                try
                {
                    FileInfo[] rgFiles = di.GetFiles();
                    foreach (FileInfo fi in rgFiles)
                    {
                        fi.Delete();
                    }
                }
                catch
                {
                }
                System.IO.File.Copy(fileMau, url, true);
                var wb = new XLWorkbook(url);
                var ws = wb.Worksheet(1);
                int vDongXuat = 4;
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ws.Cell("A" + vDongXuat).Value = "'" + i;
                    ws.Cell("B" + vDongXuat).Value = "'" + dt.Rows[i][1].ToString();
                    ws.Cell("C" + vDongXuat).Value = dt.Rows[i][2].ToString();
                    ws.Cell("D" + vDongXuat).Value = dt.Rows[i][3].ToString();
                    ws.Cell("E" + vDongXuat).Value = dt.Rows[i][4].ToString();
                    ws.Cell("F" + vDongXuat).Value = "'" + dt.Rows[i][5].ToString();
                    ws.Cell("G" + vDongXuat).Value = dt.Rows[i][6].ToString();
                    ws.Cell("H" + vDongXuat).Value = dt.Rows[i][7].ToString();
                    ws.Cell("I" + vDongXuat).Value = dt.Rows[i][8].ToString();
                    ws.Cell("J" + vDongXuat).Value = dt.Rows[i][9].ToString();
                    ws.Cell("K" + vDongXuat).Value = dt.Rows[i][10].ToString();
                    ws.Column("K").Unhide();
                    for (char col = 'A'; col <= 'J'; col++)
                    {
                        var cell = ws.Cell(col.ToString() + vDongXuat);
                        cell.Style.Border.TopBorder = XLBorderStyleValues.Thin;
                        cell.Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                        cell.Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                        cell.Style.Border.RightBorder = XLBorderStyleValues.Thin;
                    }
                    vDongXuat++;
                }
                wb.Save();
                return JSonHelper.ToJson("/Excel/NguoiDung_Loi.xlsx");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("Có lỗi xãy ra!");
            }
        }




        [HttpGet]
        public string LoadDataExcelSauNhan()
        {
            return JSonHelper.ToJson((DataTable)Session["DataTableNhanExcel" + NTSSession.GetUser().UserID]);
        }


        [HttpPost]
        public string NhapDuLieuFileExcel(object[] Data)
        {
            try
            {
                bool TrangThai = true;
                string sqlInsert_ = "", maTinh = "", maHuyen = "", maXa = "", maChucVu = "", noiCongTac = "", maDonVi = "", nhapExcel = "1", maDonViCode = "", STTLoi = "", laNamSinh = "0", LoaiDoiTuong = "", DanhXung = "";
                string sqlInsert = "", TenDangNhap = "", MatKhau = "", MaXacNhan = "", TenNhom = "", TenDonVi = "", Email = "", SoDienThoai = "", HoVaTen = "", MaNhom = "", MaDonVi;
                int sodongthemloi = 0, sodongthemthanhcong = 0, soLuongGhiDe = 0;
                DataTable dt = (DataTable)Session["DataTableNhanExcel" + NTSSession.GetUser().UserID];
                SqlConnection sqlConn = new SqlConnection(NTSSession.GetConnectionString2());
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                sqlConn.Open();
                if (dt.Columns.Count > 1)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (Data.Contains(dt.Rows[i]["TenDangNhap"].ToString()))//Chỉ nhập những dòng có check
                        {
                            if (dt.Rows[i]["TinhTrangCode"].ToString() == "CN" || dt.Rows[i]["TinhTrangCode"].ToString() == "GD")//tình trạng khác rỗng
                            {
                                if (dt.Rows[i]["TinhTrangCode"].ToString() == "CN")
                                {
                                    TrangThai = true;
                                }
                                else if (dt.Rows[i]["TinhTrangCode"].ToString() == "GD")
                                {
                                    TrangThai = false;
                                }
                                string maDV = NTSSession.GetDonVi().DonViID.ToString();
                                MaNhom = sqlFun.GetOneStringField("SELECT top 1 CONVERT(nvarchar(36),UserGroupID) FROM UserGroup WHERE UserGroupName like N'" + dt.Rows[i]["Nhom"].ToString().Trim() + "'").ToString();
                                MaDonVi = sqlFun.GetOneStringField("SELECT top 1 CONVERT(nvarchar(36),DonViID) FROM DonVi WHERE TenDonVi like N'" + dt.Rows[i]["TenDonVi"].ToString().Trim() + "'").ToString();

                                SqlParameter[] para = {
                                    new SqlParameter("@TenDangNhap", dt.Rows[i]["TenDangNhap"].ToString().Trim()),
                                    new SqlParameter("@MatMa", WEB_DLL.ntsSecurity._mEncrypt( dt.Rows[i]["MatKhau"].ToString().Trim(), PageInfo.KeyMaHoaMatKhau, true)),
                                    new SqlParameter("@MaXacNhan", dt.Rows[i]["MaXacNhan"].ToString()),
                                    new SqlParameter("@UserGroupID", DungChung.NormalizationGuid(MaNhom)),
                                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(MaDonVi)),
                                    new SqlParameter("@Email", dt.Rows[i]["Email"].ToString()),
                                    new SqlParameter("@SoDienThoai", dt.Rows[i]["SoDienThoai"].ToString()),
                                    new SqlParameter("@GhiDe", DungChung.NormalizationBoolean(TrangThai))
                                };

                                DataTable data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Insert_UserExcel", para).Tables[0];


                                if (data.Rows.Count < 1)
                                {
                                    sodongthemloi += 1;
                                    STTLoi = STTLoi + "- STT " + dt.Rows[i]["STT"].ToString();
                                    dt.Rows[i]["TinhTrang"] = "Nhận không thành công";
                                    dt.Rows[i]["TinhTrangCode"] = "";
                                    dt.AcceptChanges();
                                    continue;
                                }
                                else
                                {
                                    if (dt.Rows[i]["TinhTrangCode"].ToString() == "GD")
                                    {
                                        soLuongGhiDe++;
                                        dt.Rows[i]["TinhTrang"] = "Đã ghi đè";
                                        dt.Rows[i]["TinhTrangCode"] = "";
                                        dt.AcceptChanges();
                                    }
                                    else
                                    {
                                        sodongthemthanhcong += 1;
                                        dt.Rows[i]["TinhTrang"] = "Đã nhận thành công";
                                        dt.Rows[i]["TinhTrangCode"] = "";
                                        dt.AcceptChanges();
                                    }
                                }

                            }
                            else
                            {
                                if (dt.Rows[i]["TinhTrang"].ToString() != "Đã ghi đè" && dt.Rows[i]["TinhTrang"].ToString() != "Đã nhận thành công")
                                {
                                    sodongthemloi += 1;
                                    STTLoi = STTLoi + "- STT " + dt.Rows[i]["STT"].ToString();
                                    dt.Rows[i]["TinhTrang"] = "Từ chối nhận do lỗi trong file.";
                                    dt.Rows[i]["TinhTrangCode"] = "";
                                    dt.AcceptChanges();
                                }
                            }
                        }
                    }
                    Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = dt;
                    if (sodongthemloi > 0 && soLuongGhiDe == 0)
                    {
                        sqlConn.Close();
                        return JSonHelper.ToJson("<p>- Đã nhập vào hệ thống thành công " + sodongthemthanhcong + " dòng dữ liệu.<p><br/><p style=\"color:red;\">- Số dòng thất bại: " + sodongthemloi + "</p><p style=\"color:red;\">Bao gồm: " + STTLoi + "</p>");
                    }
                    else if (sodongthemloi > 0 && soLuongGhiDe > 0)
                    {
                        sqlConn.Close();
                        return JSonHelper.ToJson("<p>- Đã nhập vào hệ thống thành công " + sodongthemthanhcong + " dòng dữ liệu. Ghi đè " + soLuongGhiDe + " dòng dữ liệu.<p><br/><p style=\"color:red;\">- Số dòng thất bại: " + sodongthemloi + "</p><p style=\"color:red;\">Bao gồm: " + STTLoi + "</p>");
                    }
                    else if (soLuongGhiDe > 0)
                    {
                        sqlConn.Close();
                        return JSonHelper.ToJson("<p>- Đã nhập vào hệ thống thành công " + sodongthemthanhcong + " dòng dữ liệu. Ghi đè " + soLuongGhiDe + " dòng dữ liệu.<p>");
                    }
                    else
                    {
                        sqlConn.Close();
                        return JSonHelper.ToJson("<p>- Đã nhập vào hệ thống thành công " + sodongthemthanhcong + " dòng dữ liệu.<p>");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("Không tìm thấy dữ liệu file Excel");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("Có lỗi xãy ra!" + NTSSecurity.Insert_MaCodeLoi(ex));
            }
        }





        [HttpPost]
        public string LoadDataExcel()
        {
            decimal sodongthemloi = 0;

            Session["ssloidmdoituong"] = "";
            Session["ssDoiTuongCode"] = "";

            string ssloidmdoituong = "";
            string LoaiKiemTra = (string)Session["LoaiKiemTra"];
            try
            {
                //Workbook workbook = new Workbook();

                DataTable dt = (DataTable)Session["DataTableNhanExcel" + NTSSession.GetUser().UserID];
                string soCot = dt.Columns.Count.ToString();
                string sqlInsert = "", TenDangNhap = "", MatKhau = "", MaXacNhan = "", TenNhom = "", TenDonVi = "", Email = "", SoDienThoai = "", HoVaTen = "";
                string MaNhom = "", MaDonVi = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                dt.Columns.Add("TinhTrang");
                dt.Columns.Add("TinhTrangCode");
                if (dt.Columns.Count > 1)
                {
                    string[] ktraTonTai = new string[dt.Rows.Count];
                    string[] ktraTonTai2 = new string[dt.Rows.Count];
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (dt.Rows[i]["TenDangNhap"].ToString() != "")
                        {
                            if (ssloidmdoituong != "Chờ nhận." && ssloidmdoituong != "Ghi đè" && ssloidmdoituong != "")
                            {
                                dt.Rows[i - 1]["TinhTrang"] = ssloidmdoituong;
                                ssloidmdoituong = "";
                            }
                            else if (ssloidmdoituong == "Chờ nhận.")
                            {
                                dt.Rows[i - 1]["TinhTrang"] = ssloidmdoituong;
                                dt.Rows[i - 1]["TinhTrangCode"] = "CN";
                                ssloidmdoituong = "";
                            }
                            else if (ssloidmdoituong == "Ghi đè")
                            {
                                dt.Rows[i - 1]["TinhTrang"] = ssloidmdoituong;
                                dt.Rows[i - 1]["TinhTrangCode"] = "GD";
                                ssloidmdoituong = "";
                            }
                        }
                        if (dt.Rows[i]["TenDangNhap"].ToString() != "")
                        {
                            TenDangNhap = sqlFun.GetOneStringField("SELECT top 1 CONVERT(nvarchar(36),TenDangNhap) FROM Users WHERE TenDangNhap like N'" + dt.Rows[i]["TenDangNhap"].ToString().Trim() + "'").ToString();
                            if (TenDangNhap.Length > 0 && LoaiKiemTra == "2")
                            {
                                ssloidmdoituong = "Ghi đè";
                                dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "GD";
                            }
                            else if (TenDangNhap.Length > 0 && LoaiKiemTra == "1")
                            {
                                ssloidmdoituong = ssloidmdoituong + " - Tên đăng nhập : " + dt.Rows[i]["TenDangNhap"].ToString() + " đã tồn tại trong hệ thống.";
                                sodongthemloi += 1;
                            }
                            else if (TenDangNhap.Length == 0 && LoaiKiemTra == "2")
                            {
                                dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "CN";
                                ssloidmdoituong = "Chờ nhận.";
                            }
                            else if (TenDangNhap.Length == 0 && LoaiKiemTra == "2")
                            {
                                ssloidmdoituong = "STT " + (i + 1).ToString() + " - Không đủ điều kiện Ghi đè";
                                sodongthemloi += 1;
                                continue;
                            }
                        }
                        MatKhau = dt.Rows[i]["MatKhau"].ToString();
                        MaXacNhan = dt.Rows[i]["MaXacNhan"].ToString();
                        if (dt.Rows[i]["Nhom"].ToString() != "")
                        {
                            MaNhom = sqlFun.GetOneStringField("SELECT top 1 CONVERT(nvarchar(36),UserGroupID) FROM UserGroup WHERE UserGroupName like N'" + dt.Rows[i]["Nhom"].ToString().Trim() + "'").ToString();
                            if (MaNhom.Length == 0)
                            {
                                ssloidmdoituong = ssloidmdoituong + " - Nhóm người dùng : " + dt.Rows[i]["Nhom"].ToString() + " không tồn tại trong hệ thống.";
                                sodongthemloi += 1;
                            }
                        }
                        if (dt.Rows[i]["TenDonVi"].ToString() != "")
                        {
                            MaDonVi = sqlFun.GetOneStringField("SELECT top 1 CONVERT(nvarchar(36),DonViID) FROM DonVi WHERE TenDonVi like N'" + dt.Rows[i]["TenDonVi"].ToString().Trim() + "'").ToString();
                            if (MaDonVi.Length == 0)
                            {
                                ssloidmdoituong = ssloidmdoituong + " - Tên đơn vị : " + dt.Rows[i]["TenDonVi"].ToString() + " không tồn tại trong hệ thống.";
                                sodongthemloi += 1;
                            }
                        }
                        Email = dt.Rows[i]["Email"].ToString();
                        if (!IsValidEmail(Email))
                        {
                            ssloidmdoituong += " - Email : " + Email + " không đúng định dạng.";
                            sodongthemloi += 1;
                        }
                        SoDienThoai = dt.Rows[i]["SoDienThoai"].ToString();
                        HoVaTen = dt.Rows[i]["HoVaTen"].ToString();
                        DataView dw = dt.DefaultView;
                        string a = string.Format(
                           (dt.Rows[i]["TenDangNhap"].ToString() == "" ? "1=1" : " TenDangNhap = '" + dt.Rows[i]["TenDangNhap"].ToString() + "'") +
                           (MatKhau == "" ? "" : " and MatKhau = '" + MatKhau + "'") +
                           (MaXacNhan == "" ? "" : " and MaXacNhan = '" + MaXacNhan + "'") +
                           (MaNhom == "" ? "" : " and Nhom = '" + MaNhom + "'") +
                           (MaDonVi == "" ? "" : " and TenDonVi = '" + MaDonVi + "'") +
                           (Email == "" ? "" : " and Email = '" + Email + "'") +
                           (SoDienThoai == "" ? "" : " and SoDienThoai = '" + SoDienThoai + "'") +
                           (HoVaTen == "" ? "" : " and HoVaTen = '" + HoVaTen + "'")
                       );

                        if (ssloidmdoituong == "")
                        {
                            dt.Rows[i]["TinhTrang"] = "Chờ nhận.";
                            dt.Rows[i]["TinhTrangCode"] = "CN";
                        }
                        else if (ssloidmdoituong == "Ghi đè")
                        {

                            dt.Rows[i]["TinhTrang"] = ssloidmdoituong;
                            dt.Rows[i]["TinhTrangCode"] = "GD";
                        }
                        else
                        {
                            dt.Rows[i]["TinhTrang"] = ssloidmdoituong;
                        }
                    }
                    if (ssloidmdoituong == "")
                    {
                        dt.Rows[dt.Rows.Count - 1]["TinhTrang"] = "Chờ nhận.";
                        dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "CN";
                    }
                    else if (ssloidmdoituong == "Ghi đè")
                    {
                        dt.Rows[dt.Rows.Count - 1]["TinhTrang"] = ssloidmdoituong;
                        dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "GD";
                    }
                    else
                    {
                        dt.Rows[dt.Rows.Count - 1]["TinhTrang"] = ssloidmdoituong;
                    }

                }
                if (Session["ssSoCot"] == null)
                {
                    Session.Add("ssSoCot", soCot);
                }
                else
                {
                    Session["ssSoCot"] = "";
                    Session["ssSoCot"] = soCot;
                }
                Session["ssloidmdoituong"] = ssloidmdoituong;
                Session["sodongthemloi"] = sodongthemloi;
                Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = dt;
                Session["sodongthem"] = dt.Rows.Count.ToString();
                Session["sodongthemhople"] = (dt.Rows.Count - sodongthemloi).ToString();
                string st = (string)Session["sodongthem"];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception ex)
            {
                sodongthemloi = -1;
                ssloidmdoituong = "Lỗi nhập excel";
                Session["ssloidmdoituong"] = ssloidmdoituong;
                Session["sodongthemloi"] = sodongthemloi;
                return JSonHelper.ToJson("Lỗi nhập excel");
            }
        }


        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Use IdnMapping class to convert Unicode domain names.
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper, RegexOptions.None, TimeSpan.FromMilliseconds(200));
                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    var idn = new System.Globalization.IdnMapping();
                    string domainName = idn.GetAscii(match.Groups[2].Value);
                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }



        [HttpPost]
        public string GetAllPhongBan()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllPhongBan", null).Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(NTSSecurity.Insert_MaCodeLoi(ex));

            }
        }

        [HttpPost]
        public string GetAllChucNang(string UserID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(UserID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllChucNang_User", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string ThemChucNang(string[] saveData)
        {
            object pXem = Convert.ToBoolean(((object[])(saveData))[0].ToString());
            object pThem = Convert.ToBoolean(((object[])(saveData))[1].ToString());
            object pXoa = Convert.ToBoolean(((object[])(saveData))[2].ToString());
            object pSua = Convert.ToBoolean(((object[])(saveData))[3].ToString());
            object pNap = Convert.ToBoolean(((object[])(saveData))[4].ToString());
            object pIn = Convert.ToBoolean(((object[])(saveData))[5].ToString());
            object pP1 = Convert.ToBoolean(((object[])(saveData))[6].ToString());
            object pP2 = Convert.ToBoolean(((object[])(saveData))[7].ToString());
            object pP3 = Convert.ToBoolean(((object[])(saveData))[8].ToString());
            string listID = ((object[])(saveData))[9].ToString();
            string userName = ((object[])(saveData))[10].ToString();
            string UserGroupID = ((object[])(saveData))[11].ToString();
            try
            {
                string[] _vFunctions = listID.Split(',');
                for (int i = 0; i < _vFunctions.Length; i++)
                {
                    SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                    string permissstring = sqlFun.GetOneStringField("SELECT Permission FROM dbo.GroupPermiss WHERE MenuID=" + (_vFunctions[i] != "" ? "'" + _vFunctions[i] + "'" : "0") + " AND UserGroupID=N'" + UserGroupID + "'");
                    int permiss = 0;
                    string GroupPermiss = XemQuyenChucnang(permissstring);
                    string[] arrValue = new string[9];
                    arrValue = GroupPermiss.Split(';');
                    if (arrValue[0] == "true")//xem
                        permiss += 8;
                    else
                        permiss += 0;
                    if (arrValue[1] == "true")//them
                        permiss += 1;
                    else
                        permiss += 0;
                    if (arrValue[2] == "true")//xoa
                        permiss += 4;
                    else
                        permiss += 0;
                    if (arrValue[3] == "true")//sua
                        permiss += 2;
                    else
                        permiss += 0;
                    if (arrValue[4] == "true")//load
                        permiss += 32;
                    else
                        permiss += 0;
                    if (arrValue[5] == "true")//print
                        permiss += 16;
                    else
                        permiss += 0;
                    if (arrValue[6] == "true")//P1
                        permiss += 64;
                    else
                        permiss += 0;
                    if (arrValue[7] == "true")//P2
                        permiss += 128;
                    else
                        permiss += 0;
                    if (arrValue[8] == "true")//P3
                        permiss += 256;
                    else
                        permiss += 0;
                    string sqlInsert = "INSERT INTO UserPermiss ( MenuID , UserID , Permission ) " +
                            " VALUES ( N'" + _vFunctions[i] + "',N'" + userName + "',N'" + WEB_DLL.ntsSecurity._mEncrypt(userName + ";" + _vFunctions[i] + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "')";
                    sqlFun.ExeCuteNonQuery(sqlInsert);
                }
                return NTSThongBao.ThemThanhCong();
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuThongTin(object[] data)
        {
            string fun = "", nhomCu = "", maNguoisd = "", insertQuyen = "";

            if (data[0].ToString() == "them")
            {
                fun = "Insert_Users";
                if (new SqlFunction(NTSSession.GetConnectionString1()).CheckHasRecord("select TenDangNhap from Users where TenDangNhap = N'" + data[1].ToString() + "'") == true)
                {
                    return JSonHelper.ToJson("0_Tên đăng nhập đã tồn tại. Bạn không được phép tạo tên đăng nhập này!");
                }
            }
            else
            {
                fun = "Update_Users";
                if (new SqlFunction(NTSSession.GetConnectionString1()).CheckHasRecord("select TenDangNhap from Users where TenDangNhap = N'" + data[1].ToString() + "' and UserID not in (select u.UserID from Users u where u.UserID = N'" + data[8].ToString() + "')") == true)
                {
                    return JSonHelper.ToJson("0_Tên đăng nhập đã tồn tại. Bạn không được phép tạo tên đăng nhập này!");
                }
                nhomCu = new SqlFunction(NTSSession.GetConnectionString1()).GetOneStringField("SELECT convert(nvarchar(250),UserGroupID) FROM Users WHERE UserID=N'" + data[8].ToString() + "'");
            }
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@TenDangNhap",data[1].ToString()),
                    new SqlParameter("@MatMa", WEB_DLL.ntsSecurity._mEncrypt( data[1].ToString() + ";" +  data[3].ToString(), PageInfo.KeyMaHoaMatKhau, true)),
                    new SqlParameter("@MaXacNhan", WEB_DLL.ntsSecurity._mEncrypt( data[1].ToString() + ";" +  data[4].ToString(), PageInfo.KeyMaHoaXacNhan, true)),
                    new SqlParameter("@UserGroupID",  DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@DonViID",  DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@Email", data[5].ToString()),
                    new SqlParameter("@DangSD", DungChung.NormalizationBoolean(data[2].ToString())),
                    new SqlParameter("@UserID_ThaoTac", DungChung.NormalizationGuid(NTSSession.GetUser().UserID.ToString())),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@DonViXetDuyet", DungChung.NormalizationString(data[10].ToString())),
                    new SqlParameter("@TrangChu", DungChung.NormalizationGuid(data[11].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), fun, para).Tables[0];
                //Returning Json Data
                if (data[0].ToString() == "them" && duLieu.Rows.Count > 0)
                {
                    DataTable _vdt = new SqlFunction(NTSSession.GetConnectionString1()).GetData("SELECT * FROM GroupPermiss WHERE UserGroupID='" + data[6].ToString() + "'");
                    maNguoisd = new SqlFunction(NTSSession.GetConnectionString1()).GetData("SELECT convert(nvarchar(250),UserID) FROM Users WHERE TenDangNhap=N'" + data[1].ToString() + "'").Rows[0][0].ToString();
                    for (int i = 0; i < _vdt.Rows.Count; i++)
                    {
                        //lay chuoi phan quyen su dung
                        int permiss = 0;
                        string GroupPermiss = XemQuyenChucnang(_vdt.Rows[i]["Permission"].ToString());
                        string[] arrValue = new string[9];
                        arrValue = GroupPermiss.Split(';');
                        if (arrValue[0] == "true")//xem
                            permiss += 8;
                        else
                            permiss += 0;
                        if (arrValue[1] == "true")//them
                            permiss += 1;
                        else
                            permiss += 0;
                        if (arrValue[2] == "true")//xoa
                            permiss += 4;
                        else
                            permiss += 0;
                        if (arrValue[3] == "true")//sua
                            permiss += 2;
                        else
                            permiss += 0;
                        if (arrValue[4] == "true")//load
                            permiss += 32;
                        else
                            permiss += 0;
                        if (arrValue[5] == "true")//print
                            permiss += 16;
                        else
                            permiss += 0;
                        if (arrValue[6] == "true")//P1
                            permiss += 64;
                        else
                            permiss += 0;
                        if (arrValue[7] == "true")//P2
                            permiss += 128;
                        else
                            permiss += 0;
                        if (arrValue[8] == "true")//P3
                            permiss += 256;
                        else
                            permiss += 0;
                        insertQuyen = "INSERT INTO UserPermiss (MenuID,UserID,Permission) VALUES(N'" +
                            _vdt.Rows[i]["MenuID"].ToString() +
                            "','" + maNguoisd.ToString() + "'" +
                            ",N'" + WEB_DLL.ntsSecurity._mEncrypt(maNguoisd.ToString() + ";" + _vdt.Rows[i]["MenuID"].ToString() + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "'" +
                            ")";
                        bool kq = new SqlFunction(NTSSession.GetConnectionString1()).ExeCuteNonQuery(insertQuyen);
                    }
                    return JSonHelper.ToJson("1_" + duLieu.Rows[0]["UserID"] + "_Thêm mới thành công!");
                }
                if (data[0].ToString() != "them" && duLieu.Rows.Count > 0)
                {
                    if (nhomCu != data[6].ToString())
                    {
                        new SqlFunction(NTSSession.GetConnectionString1()).ExeCuteNonQuery("delete UserPermiss where UserID = N'" + data[8].ToString() + "'");
                        DataTable _vdt = new SqlFunction(NTSSession.GetConnectionString1()).GetData("SELECT * FROM GroupPermiss WHERE UserGroupID='" + data[6].ToString() + "'");
                        maNguoisd = data[8].ToString();
                        for (int i = 0; i < _vdt.Rows.Count; i++)
                        {
                            //lay chuoi phan quyen su dung
                            int permiss = 0;
                            string GroupPermiss = XemQuyenChucnang(_vdt.Rows[i]["Permission"].ToString());
                            string[] arrValue = new string[9];
                            arrValue = GroupPermiss.Split(';');
                            if (arrValue[0] == "true")//xem
                                permiss += 8;
                            else
                                permiss += 0;
                            if (arrValue[1] == "true")//them
                                permiss += 1;
                            else
                                permiss += 0;
                            if (arrValue[2] == "true")//xoa
                                permiss += 4;
                            else
                                permiss += 0;
                            if (arrValue[3] == "true")//sua
                                permiss += 2;
                            else
                                permiss += 0;
                            if (arrValue[4] == "true")//load
                                permiss += 32;
                            else
                                permiss += 0;
                            if (arrValue[5] == "true")//print
                                permiss += 16;
                            else
                                permiss += 0;
                            if (arrValue[6] == "true")//P1
                                permiss += 64;
                            else
                                permiss += 0;
                            if (arrValue[7] == "true")//P2
                                permiss += 128;
                            else
                                permiss += 0;
                            if (arrValue[8] == "true")//P3
                                permiss += 256;
                            else
                                permiss += 0;
                            insertQuyen = "INSERT INTO UserPermiss (MenuID,UserID,Permission) VALUES(N'" +
                                _vdt.Rows[i]["MenuID"].ToString() +
                                "','" + maNguoisd.ToString() + "'" +
                                ",N'" + WEB_DLL.ntsSecurity._mEncrypt(maNguoisd.ToString() + ";" + _vdt.Rows[i]["MenuID"].ToString() + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "'" +
                                ")";
                            new SqlFunction(NTSSession.GetConnectionString1()).ExeCuteNonQuery(insertQuyen);
                        }
                    }
                    return JSonHelper.ToJson("1_" + duLieu.Rows[0]["UserID"] + "_Chỉnh sửa thông tin thành công!");
                }
                return JSonHelper.ToJson("0_Không thực hiện được thao tác!");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Thêm mới không thành công!" + NTSSecurity.Insert_MaCodeLoi(ex));
            }
        }
        [HttpPost]
        public static string XemQuyenChucnang(string Permission)
        {
            if (Permission.ToString() == "")
                return "";
            string _vPermiss = Permission.ToString();
            _vPermiss = NTSSecurity._mDecrypt(_vPermiss, PageInfo.KeyMaHoaMatKhau, true).Split(';')[2];
            string _vPermissValue = "";
            _vPermissValue += NTSSecurity.HasPermission(TypeAudit.View, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.AddNew, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.Delete, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.Edit, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.LoadData, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.Print, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.PlusP1, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.PlusP2, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            _vPermissValue += ";" + NTSSecurity.HasPermission(TypeAudit.PlusP3, Convert.ToInt32(_vPermiss)).ToString().ToLower();
            return _vPermissValue;
        }

        [HttpPost]
        public string LoadDuLieuSua(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllUserTheoID", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.Rows[0]["MatMa"] = NTSSecurity._mDecrypt(duLieu.Rows[0]["MatMa"].ToString(), PageInfo.KeyMaHoaMatKhau, true).ToString().Split(';')[1];
                    duLieu.Rows[0]["MaXacNhan"] = NTSSecurity._mDecrypt(duLieu.Rows[0]["MaXacNhan"].ToString(), PageInfo.KeyMaHoaXacNhan, true).ToString().Split(';')[1];
                    duLieu.AcceptChanges();
                }
                return JSonHelper.ToJson(duLieu);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(NTSSecurity.Insert_MaCodeLoi(ex));
            }
        }

        public string GetAllUserPermiss(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(ID)),
                };
                DataTable result = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDataUserPermiss", para).Tables[0];
                string Permission = "", PermissionEncrypt = "";
                string[] arrValue = new string[9];
                for (int i = 0; i < result.Rows.Count; i++)
                {
                    PermissionEncrypt = XemQuyenChucnang(result.Rows[i]["Permission"].ToString());
                    arrValue = PermissionEncrypt.Split(';');
                    if (arrValue[0] == "true")
                        Permission = "Xem";
                    else
                        Permission = "";
                    if (arrValue[1] == "true")
                        Permission += ";Thêm";
                    else
                        Permission += ";";
                    if (arrValue[2] == "true")
                        Permission += ";Xóa";
                    else
                        Permission += ";";
                    if (arrValue[3] == "true")
                        Permission += ";Sửa";
                    else
                        Permission += ";";
                    if (arrValue[4] == "true")
                        Permission += ";Nạp";
                    else
                        Permission += ";";
                    if (arrValue[5] == "true")
                        Permission += ";In";
                    else
                        Permission += ";";
                    if (arrValue[6] == "true")
                        Permission += ";Sửa/Xóa theo Users";
                    else
                        Permission += ";";
                    if (arrValue[7] == "true")
                        Permission += ";Nạp theo Users";
                    else
                        Permission += ";";
                    if (arrValue[8] == "true")
                        Permission += ";Plus3";
                    else
                        Permission += ";";
                    result.Rows[i]["Permission"] = Permission.Replace(";;;;;;;;", "").Replace(";;;;;;;", ";").Replace(";;;;;;", ";").Replace(";;;;;", ";").Replace(";;;;", ";").Replace(";;;", ";").Replace(";;", ";");
                }
                ep.Result = result;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string ShowDataPermission(string ID)
        {
            try
            {
                DataTable result = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select UserPerID,UserID,MenuID,Permission from UserPermiss where UserPerID='" + ID + "'").Tables[0];
                string Permission = "", PermissionEncrypt = "";
                string[] arrValue = new string[9];
                for (int i = 0; i < result.Rows.Count; i++)
                {
                    PermissionEncrypt = XemQuyenChucnang(result.Rows[i]["Permission"].ToString());
                    arrValue = PermissionEncrypt.Split(';');
                    if (arrValue[0] == "true")
                        Permission = "Xem";
                    else
                        Permission = "";
                    if (arrValue[1] == "true")
                        Permission += ";Thêm";
                    else
                        Permission += ";";
                    if (arrValue[2] == "true")
                        Permission += ";Xóa";
                    else
                        Permission += ";";
                    if (arrValue[3] == "true")
                        Permission += ";Sửa";
                    else
                        Permission += ";";
                    if (arrValue[4] == "true")
                        Permission += ";Nạp";
                    else
                        Permission += ";";
                    if (arrValue[5] == "true")
                        Permission += ";In";
                    else
                        Permission += ";";
                    if (arrValue[6] == "true")
                        Permission += ";Sửa/Xóa theo Users";
                    else
                        Permission += ";";
                    if (arrValue[7] == "true")
                        Permission += ";Nạp theo Users";
                    else
                        Permission += ";";
                    if (arrValue[8] == "true")
                        Permission += ";Plus3";
                    else
                        Permission += ";";
                    result.Rows[i]["Permission"] = Permission.Replace(";;;;;;;;", "").Replace(";;;;;;;", ";").Replace(";;;;;;", ";").Replace(";;;;;", ";").Replace(";;;;", ";").Replace(";;;", ";").Replace(";;", ";");
                }
                //var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(result);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(NTSSecurity.Insert_MaCodeLoi(ex));
            }
        }
        [HttpPost]
        public string XoaUserPremisss(string ma, string UserID)
        {
            try
            {
                if (ma != "")
                {
                    SqlParameter[] para = {
                    new SqlParameter("@UserPerID",DungChung.NormalizationGuid(ma)),
                    };
                    SqlHelper.ExecuteNonQuery(NTSSession.GetConnectionString1(), "Delete_UsersPremisss", para);
                }
                else
                {
                    SqlParameter[] para = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(UserID)),
                    };
                    SqlHelper.ExecuteNonQuery(NTSSession.GetConnectionString1(), "Delete_UsersPremisss_ALL", para);
                }
                return JSonHelper.ToJson("1_Xóa dữ liệu thành công");

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa dữ liệu không thành công" + (NTSSecurity.Insert_MaCodeLoi(ex)));
            }
        }

        [HttpPost]
        public string GetTinhTrangFileExcel()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("TongSo");
            dt.Columns.Add("TongSoLoi");
            dt.Columns.Add("TongSoHopLe");
            string st = (string)Session["sodongthem"];
            dt.Rows.Add((string)Session["sodongthem"]);
            dt.Rows[0][1] = Session["sodongthemloi"];
            dt.Rows[0][2] = Session["sodongthemhople"];
            return JSonHelper.ToJson(dt);
        }




        [HttpPost]
        public string XoaUser(string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(ma)),
                    };
                SqlHelper.ExecuteNonQuery(NTSSession.GetConnectionString1(), "Delete_Users", para);

                return JSonHelper.ToJson("1_Xóa dữ liệu thành công");

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa dữ liệu không thành công" + (NTSSecurity.Insert_MaCodeLoi(ex)));
            }
        }

        [HttpPost]
        public string SuaPermission(object[] data, string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Permission",data[0].ToString()),
                    new SqlParameter("@UserPerID",DungChung.NormalizationGuid(ma)),
                    };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_UserPermission", para).Tables[0];

                return JSonHelper.ToJson("1_Cập nhật thành công");

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Cập nhật không thành công" + (NTSSecurity.Insert_MaCodeLoi(ex)));
            }
        }

        [HttpPost]
        public string SuaAllPermission(object[] data, string ma)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Permission",data[0].ToString()),
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(ma)),
                    };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_UserPermissionAll", para).Tables[0];

                return JSonHelper.ToJson("1_Cập nhật thành công");

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Cập nhật không thành công" + (NTSSecurity.Insert_MaCodeLoi(ex)));
            }
        }
        public string CapNhatQuyen(string[] saveData)
        {

            object pXem = Convert.ToBoolean(((object[])(saveData))[0].ToString());
            object pThem = Convert.ToBoolean(((object[])(saveData))[1].ToString());
            object pXoa = Convert.ToBoolean(((object[])(saveData))[2].ToString());
            object pSua = Convert.ToBoolean(((object[])(saveData))[3].ToString());
            object pNap = Convert.ToBoolean(((object[])(saveData))[4].ToString());
            object pIn = Convert.ToBoolean(((object[])(saveData))[5].ToString());
            object pP1 = Convert.ToBoolean(((object[])(saveData))[6].ToString());
            object pP2 = Convert.ToBoolean(((object[])(saveData))[7].ToString());
            object pP3 = Convert.ToBoolean(((object[])(saveData))[8].ToString());
            object setAll = Convert.ToBoolean(((object[])(saveData))[9].ToString());
            object UserID = ((object[])(saveData))[10].ToString();
            object UserPerID = ((object[])(saveData))[11].ToString();
            int permiss = 0;
            permiss += ((bool)pXem ? (int)TypeAudit.View : 0);
            permiss += ((bool)pThem ? (int)TypeAudit.AddNew : 0);
            permiss += ((bool)pXoa ? (int)TypeAudit.Delete : 0);
            permiss += ((bool)pSua ? (int)TypeAudit.Edit : 0);
            permiss += ((bool)pNap ? (int)TypeAudit.LoadData : 0);
            permiss += ((bool)pIn ? (int)TypeAudit.Print : 0);
            permiss += ((bool)pP1 ? (int)TypeAudit.PlusP1 : 0);
            permiss += ((bool)pP2 ? (int)TypeAudit.PlusP2 : 0);
            permiss += ((bool)pP3 ? (int)TypeAudit.PlusP3 : 0);
            try
            {
                if ((bool)setAll)
                {
                    SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                    DataTable _vdt = sqlFun.GetData("Select * from UserPermiss Where UserID='" + UserID + "'");
                    for (int i = 0; i < _vdt.Rows.Count; i++)
                    {
                        try
                        {
                            string sqlUpdateQoN = "UPDATE UserPermiss SET Permission ='" + WEB_DLL.ntsSecurity._mEncrypt(UserID + ";" + _vdt.Rows[i]["MenuID"].ToString() + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "' WHERE UserPerID='" + _vdt.Rows[i]["UserPerID"].ToString() + "'";
                            sqlFun.ExeCuteNonQuery(sqlUpdateQoN);
                        }
                        catch { }
                    }
                }
                else
                {
                    SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                    DataTable _vdt = sqlFun.GetData("Select * from UserPermiss Where UserPerID='" + UserPerID + "'");
                    string sqlUpdateQoN = "UPDATE UserPermiss SET Permission ='" + WEB_DLL.ntsSecurity._mEncrypt(UserID + ";" + _vdt.Rows[0]["MenuID"].ToString() + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "' WHERE UserPerID='" + _vdt.Rows[0]["UserPerID"].ToString() + "'";
                    sqlFun.ExeCuteNonQuery(sqlUpdateQoN);
                }
                return JSonHelper.ToJson("");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(NTSSecurity.Insert_MaCodeLoi(ex));
            }
        }

        [HttpPost]
        public string GetAllDSTrang(string data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserGroupID", DungChung.NormalizationGuid(data)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDSTrang", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string DoiMatKhau(string[] param)
        {
            try
            {
                UsersDataContext db = new UsersDataContext();
                SqlParameter[] para2 = {
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(param[0].ToString())),
                };
                DataTable duLieu2 = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllUserTheoID", para2).Tables[0];
                SqlParameter[] para = {
                    new SqlParameter("@MKMoi",WEB_DLL.ntsSecurity._mEncrypt(duLieu2.Rows[0]["TenDangNhap"].ToString() + ";" + param[1].ToString(), PageInfo.KeyMaHoaMatKhau, true)),
                    new SqlParameter("@MXN",WEB_DLL.ntsSecurity._mEncrypt(duLieu2.Rows[0]["TenDangNhap"].ToString() + ";" + "654321", PageInfo.KeyMaHoaXacNhan, true)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(param[0].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_ThongTinUser_MK", para).Tables[0];
                //Returning Json Data
                return JSonHelper.ToJson("1_Đổi mật khẩu thành công!");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Thao tác thất bại!");
            }
        }

        [HttpPost]
        public string TaiFileMau()
        {
            try
            {
                string sourceFilePath = Server.MapPath("~/ExcelMau/HeThong/NguoiDung.xlsx");
                string destinationFilePath = Server.MapPath("~/Excel/NguoiDung.xlsx");
                System.IO.File.Copy(sourceFilePath, destinationFilePath, true);
                return JSonHelper.ToJson("/ExcelMau/HeThong/NguoiDung.xlsx");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new { error = ex.Message });
            }
        }


        [HttpPost]
        public string ResetExcel()
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            try
            {
                Session["sodongthem"] = null;
                Session["sodongthemloi"] = null;
                Session["sodongthemhople"] = null;
                Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = null;
                Session["LoaiKiemTra"] = null;
                return JSonHelper.ToJson("");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("Có lỗi xãy ra!");
            }
        }

        [HttpPost]
        public string KiemTraFile(object[] Data)
        {
            Session["LoaiKiemTra"] = null;
            Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = null;
            Session["sodongthem"] = "0";
            Session["sodongthemloi"] = "0";
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string ExcelConnectionString = "";
            try
            {
                //Workbook workbook = new Workbook();
                string path2 = Data[0].ToString();

                DataTable dt = new DataTable();
                //XLWorkbook workBook = new XLWorkbook("F:\\NTS\\TDKT2021\\TDKT2021" + path2.Replace("/", "\\"));
                ExcelConnectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 8.0;HDR=Yes;IMEX=1'", Server.MapPath(path2));
                OleDbConnection connection = new OleDbConnection(ExcelConnectionString);
                connection.Open();
                string sqlSelect = "select * from [" + Data[1].ToString() + "$A3:I10000]";
                OleDbCommand conmand = new OleDbCommand(sqlSelect, connection);
                OleDbDataAdapter oleDA = new OleDbDataAdapter(conmand);
                oleDA.Fill(dt);
                connection.Close();
                string[] CauTruc = { "Stt", "TenDangNhap", "MatKhau", "MaXacNhan", "Nhom", "TenDonVi", "Email", "SoDienThoai", "HoVaTen" };
                string ChuoiLoi = "File không đúng cấu trúc! Không tìm thấy cột: ";
                bool loi = false;
                for (int i = 0; i < CauTruc.Length; i++)
                {
                    if (dt.Columns[i].ColumnName != CauTruc[i])
                    {
                        ChuoiLoi = ChuoiLoi + ", " + CauTruc[i];
                        loi = true;
                    }
                }
                if (loi == true)
                {
                    return JSonHelper.ToJson(ChuoiLoi);
                }
                else
                {
                    DataView dv1 = dt.DefaultView;
                    //  dv1.RowFilter = "TenDoiTuong<> ''";
                    DataTable dtNew = dv1.ToTable();
                    Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = dtNew;
                    Session["LoaiKiemTra"] = Data[2].ToString();
                    Session["ssGetUrlFile"] = Server.MapPath(path2);
                    return JSonHelper.ToJson("");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex.Message);
            }
        }

        [HttpPost]
        public string LoadTenSheet(string Data)
        {
            ExecPermiss ep = new ExecPermiss();
            if (!NTSSecurity.Validate())
            {
                return NTSThongBao.KhongCoQuyenTruyCap();
            }
            if (Data == "")
            {
                return JSonHelper.ToJson(new DataTable());
            }


            //path = Session["ssGetUrlFile"].ToString();

            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
            string ExcelConnectionString = "";
            try
            {
                Data = Data.Replace("*", "").Replace("~", "");
                //Workbook workbook = new Workbook();
                string path2 = OfficeConvert.XlsToXlsx(Data);

                //DataTable dt = DungChung.GetDataFromExcel(path2, "DSCaNhan", "TenDoiTuong <> ''");
                XLWorkbook workBook = new XLWorkbook(path2.Replace("/", "\\"));
                DataTable dt = new DataTable();
                dt.Columns.Add("TenSheet");
                //IXLWorksheet worksheet = workBook.Worksheet(workSheet.Name);
                foreach (IXLWorksheet workSheet in workBook.Worksheets)
                {
                    dt.Rows.Add(workSheet.Name);
                }
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}