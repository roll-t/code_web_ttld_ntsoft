using ClosedXML.Excel;
using Cong.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using TTLD2024.Class;
using DungChung = TTLD2024.Class.DungChung;

namespace TTLD2024.Areas.HeThong.Controllers
{
    //Author: Lê Nguyễn Chí Trung
    //Date: 03/03/2023
    //Sumary: Danh mục Đơn vị
    //Ngày 28/9/2023 Ngân bỏ bớt các trường không sử dụng, bổ sung lọc theo tỉnh huyện xã và bổ sung phân quyền
    public class DonVi
    {

        public void AddChild(DonVi _children)
        {
            this._children.Add(_children);
        }
        public string DonViID;
        public string DonViID_Cha;
        public string MaDonVi;
        public string TenDonVi;
        public string TenDonVi_Cha;
        public List<DonVi> _children = new List<DonVi>();

        public DonVi(string _DonViID, string _DonViID_Cha, string _MaDonVi, string _TenDonVi, string _TenDonVi_Cha, List<DonVi> _children)
        {
            this.DonViID = _DonViID;
            this.DonViID_Cha = _DonViID_Cha;
            this.MaDonVi = _MaDonVi;
            this.TenDonVi = _TenDonVi;
            this.TenDonVi_Cha = _TenDonVi_Cha;
            this._children = _children;
        }
    }
    public class DonViController : Controller
    {
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
                    new SqlParameter("@ID_Cha_Tim", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@MaDonVi_Session",NTSSession.GetDonVi().MaDonVi.ToString()),
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAll_DonVi", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        // GET: HeThong/DonVi
        public ActionResult Index()
        {
            return View();
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
        public string KiemTraTonTai(string ID)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            DataTable dt = sqlFun.GetData("SELECT * FROM dbo.DonVi WHERE MaDonVi=N'" + ID + "'");
            if (dt.Rows.Count > 0)
            {
                return JSonHelper.ToJson("1");
            }
            else
            {
                return JSonHelper.ToJson("0");
            }
        }

        [HttpPost]
        public static string GetDonViDangNhap()
        {
            return JSonHelper.ToJson(NTSSession.GetDonVi().DonViID.ToString());
        }


        //[HttpPost]
        //public string XoaDuLieu(string ID)
        //{
        //    try
        //    {
        //        ExecPermiss ep = new ExecPermiss();
        //        if (!NTSSecurity.Validate())
        //        {
        //            return NTSThongBao.KhongCoQuyenTruyCap();
        //        }
        //        SqlParameter[] para = {
        //            new SqlParameter("@DonViID",DungChung.NormalizationGuid(ID)),
        //        };
        //        DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_DonVi", para);
        //        if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
        //        {
        //            duLieu.Tables[0].TableName = "DonVi";
        //            NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
        //            return NTSThongBao.XoaThanhCong();
        //        }
        //        else
        //        {
        //            return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.XOA, duLieu.Tables[0].Rows.Count);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return NTSThongBao.CoLoiXayRa(ex);
        //    }
        //}

        [HttpPost]
        public string XoaDuLieu(string ID)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID",DungChung.NormalizationGuid(ID)),
                };
                DataTable getMa = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDonViByID_DonVi", para).Tables[0];
                string[] array = new string[0];
                ExecPermiss thongbao = DanhMuc.Controllers.DungChungController.KiemTraXoaDT_nvarchar("MaQHNS", "", getMa.Rows[0]["MaDonVi"].ToString(), "DonVi", array);
                if (int.Parse(thongbao.Msg) > 0)
                {
                    return JSonHelper.ToJson(thongbao);
                }
                else
                {
                    DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_DonVi", para);
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "DonVi";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
                        return NTSThongBao.XoaThanhCong();
                    }
                    else
                    {
                        return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.XOA, duLieu.Tables[0].Rows.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public static bool kiemTraDonVi(string DonViID)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            return sqlFun.CheckHasRecord("SELECT * FROM dbo.DonVi WHERE DonViID=N'" + DonViID + "'");
        }



        [HttpPost]
        public string GetAllChonDonVi(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
              @"select * from 
 ( SELECT MaDonVi ='',TenDonVi=N'',DonViID='00000000-0000-0000-0000-000000000000',Tinh='',Huyen='' union all SELECT MaDonVi
      ,TenDonVi,DonViID ,Tinh = ISNULL((select TenDiaBanHC from dbo.DiaBanHC where DiaBanHCID = DonVi.TinhID),N'Khác'),Huyen = ISNULL((select TenDiaBanHC from dbo.DiaBanHC where DiaBanHCID = DonVi.HuyenID),N'Khác' ) 
  FROM DonVi where DonViID not in ('" + DungChung.NormalizationGuid(ID) + "')) as a1 order by LEN(MaDonVi) asc").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDonViTheoID(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDonViByID_DonVi", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTin(string[] data, string ThaoTac)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string Loai = (DungChung.NormalizationGuid("") == DungChung.NormalizationGuid(data[0].ToString()) ? "them" : "sua");
                int capDonVi = 0;
                if (Loai == "them")
                {
                    SqlConnection sqlConn = new SqlConnection(NTSSession.GetConnectionString2());
                    SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                    sqlConn.Open();
                    string result = sqlFun.GetData("SELECT Cap FROM DonVi WHERE DonViID = '" + data[4] + "'").Rows[0][0].ToString();
                    if (result != null && result != "")
                    {
                        if (int.TryParse(result.ToString(), out capDonVi))
                        {
                            capDonVi += 1;
                        }
                    }
                }

                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@hdf_DonViID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@MaDonVi", data[1].ToString()),
                    new SqlParameter("@MaQHNS", data[2].ToString()),
                    new SqlParameter("@TenDonVi", data[3].ToString()),
                    new SqlParameter("@DonViID_Cha", DungChung.NormalizationGuid(data[4].ToString())),
                    new SqlParameter("@DiaChi", data[5].ToString()),
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[6].ToString())),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[7].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@MaSoThue", data[10].ToString()),
                    new SqlParameter("@DienThoai", data[11].ToString()),
                    new SqlParameter("@Fax", data[12].ToString()),
                    new SqlParameter("@Email", data[13].ToString()),
                    new SqlParameter("@DangSD", DungChung.NormalizationBoolean(data[14].ToString())),
                    new SqlParameter("@Cap", capDonVi),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinDonVi", para);
                ep.Result = duLieu;
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "DonVi";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong(ep);
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "DonVi";
                        NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                        return NTSThongBao.CapNhatThanhCong(ep);
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
        public string getDonViKey(string key)
        {
            try
            {
                key = key.Replace("select", "");
                key = key.Replace("delete", "");
                key = key.Replace("drop", "");
                key = key.Replace("truncate", "");
                return JSonHelper.ToJson(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                "SELECT DonViID,MaDonVi,TenDonVi FROM dbo.DonVi where TenDonVi like N'%" + key + "%' order by MaDonVi asc", null).Tables[0]);
            }
            catch (Exception ex)
            {
                return "[]";
            }
        }

        //Nhận excel

        [HttpPost]
        public string ResetExcel()
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());

            try
            {
                Session["sodongthem"] = null;
                Session["sodongthemloi"] = null;
                Session["sodongthemhople"] = null;
                Session["DataTableNhanExcel"] = null;
                Session["LoaiKiemTra"] = null;
                //SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text, "DELETE FROM NhapExcelDV");
                return JSonHelper.ToJson("");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("Có lỗi xãy ra!");
            }
        }


        [HttpPost]
        public string TaiFileMau()
        {
            try
            {
                string sourceFilePath = Server.MapPath("~/ExcelMau/HeThong/ExcelMauDonVi_Goc.xlsx");
                string destinationFilePath = Server.MapPath("~/Excel/ExcelMauDonVi.xlsx");
                System.IO.File.Copy(sourceFilePath, destinationFilePath, true);
                return JSonHelper.ToJson("/ExcelMau/HeThong/ExcelMauDonVi_Goc.xlsx");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new { error = ex.Message });
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
                string fileMau = Server.MapPath("~/ExcelMau/HeThong/ExcelDonVi_Loi.xlsx");
                string url = Server.MapPath("~/Excel/ExcelDonVi_Loi.xlsx");
                DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/ExcelMau/HeThong/ExcelDonVi_Loi.xlsx"));
                //try
                //{
                //    FileInfo[] rgFiles = di.GetFiles();
                //    foreach (FileInfo fi in rgFiles)
                //    {
                //        fi.Delete();
                //    }
                //}
                //catch
                //{
                //}
                System.IO.File.Copy(fileMau, url, true);
                var wb = new XLWorkbook(url);
                var ws = wb.Worksheet(1);
                int vDongXuat = 5;
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
                    ws.Cell("L" + vDongXuat).Value = dt.Rows[i][11].ToString();
                    ws.Cell("M" + vDongXuat).Value = dt.Rows[i][12].ToString();

                    ws.Column("M").Unhide();
                    for (char col = 'A'; col <= 'M'; col++)
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
                return JSonHelper.ToJson("/Excel/ExcelDonVi_Loi.xlsx");
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
            Session["LoaiUser"] = null;
            Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = null;
            Session["sodongthem"] = "0";
            Session["sodongthemloi"] = "0";
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
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
                string sqlSelect = "select * from [" + Data[1].ToString() + "$A4:N10000]";
                OleDbCommand conmand = new OleDbCommand(sqlSelect, connection);
                OleDbDataAdapter oleDA = new OleDbDataAdapter(conmand);
                oleDA.Fill(dt);
                connection.Close();
                string[] CauTruc = { "STT", "MaDonVi", "MaQHNS", "TenDonVi", "TenDonVi_Cha", "DiaChi", "Tinh", "Huyen", "Xa", "Thon", "MaSoThue", "DienThoai", "Email", "Fax" };
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
                    DataTable dtNew = dv1.ToTable();
                    if (Session["DataTableNhanExcel"] == null)
                    {
                        Session["DataTableNhanExcel"] = dtNew;

                    }
                    //Session["LoaiUser"] = Data[3].ToString();
                    //Session["LoaiKiemTra"] = Data[2].ToString();
                    //Session["ssGetUrlFile"] = Server.MapPath(path2);
                    Session["DataTableNhanExcel" + NTSSession.GetUser().UserID] = dtNew;
                    Session["LoaiKiemTra"] = Data[2].ToString();
                    Session["ssGetUrlFile"] = Server.MapPath(path2);
                    return JSonHelper.ToJson("");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("File không đúng cấu trúc!");
            }
        }
        private static readonly string[] VietNamChar = new string[]
   {
        "aAeEoOuUiIdDyY",
        "áàạảãâấầậẩẫăắằặẳẵ",
        "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
        "éèẹẻẽêếềệểễ",
        "ÉÈẸẺẼÊẾỀỆỂỄ",
        "óòọỏõôốồộổỗơớờợởỡ",
        "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
        "úùụủũưứừựửữ",
        "ÚÙỤỦŨƯỨỪỰỬỮ",
        "íìịỉĩ",
        "ÍÌỊỈĨ",
        "đ",
        "Đ",
        "ýỳỵỷỹ",
        "ÝỲỴỶỸ"
   };
        public static string LocDau(string str)
        {
            //Thay thế và lọc dấu từng char      
            for (int i = 1; i < VietNamChar.Length; i++)
            {
                for (int j = 0; j < VietNamChar[i].Length; j++)
                    str = str.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
            }
            return str.Replace(" ", "");
        }
        public static string LocDau_V2(string str)
        {
            //Thay thế và lọc dấu từng char      
            for (int i = 1; i < VietNamChar.Length; i++)
            {
                for (int j = 0; j < VietNamChar[i].Length; j++)
                    str = str.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
            }
            string[] str2 = str.Split(' ');
            str = "";
            for (int i = 0; i < str2.Length; i++)
            {
                if (i == 0)
                {
                    str += str2[i];
                }
                else
                {
                    str += str2[i][0].ToString().ToLower();
                }

            }
            return str;
        }

        [HttpPost]
        public string LoadDataExcel()
        {
            decimal sodongthemloi = 0;

            Session["ssloidmdonvi"] = "";
            Session["ssDonViCode"] = "";

            string ssloidmdonvi = "";
            string LoaiKiemTra = (string)Session["LoaiKiemTra"];
            try
            {
                DataTable dt = new DataTable();
                dt = (DataTable)Session["DataTableNhanExcel"];
                if (dt.Rows.Count == 0)
                {
                    dt = (DataTable)Session["DataTableNhanExcel"];
                }
                string soCot = dt.Columns.Count.ToString();
                string donViCha = "", maDonViCha = "", tenDonVi = "", maDonVi = "", diaChi = "", soDienThoai = "", email = "", fax = "", maSoThue = "", maQHNS = "";
                string sqlInsert = "", maTinh = "", maHuyen = "", maXa = "", maThon = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                SqlFunction sqlFun2 = new SqlFunction(NTSSession.GetConnectionString1());
                string maDV = NTSSession.GetDonVi().DonViID.ToString();
                string KtraDV = "", KtraUs = "", KtraQLCV = "";

                try
                {
                    dt.Columns.Add("TinhTrang");
                    dt.Columns.Add("TinhTrangCode");
                }
                catch
                {

                }

                if (dt.Columns.Count > 1)
                {
                    string[] ktraTonTai = new string[dt.Rows.Count];
                    string[] ktraTonTai3 = new string[dt.Rows.Count];
                    string[] ktraTonTai2 = new string[dt.Rows.Count];
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (dt.Rows[i]["TenDonVi"].ToString() != "")
                        {
                            if (ssloidmdonvi != "Chờ nhận." && ssloidmdonvi != "Ghi đè" && ssloidmdonvi != "")
                            {
                                dt.Rows[i - 1]["TinhTrang"] = ssloidmdonvi;
                                ssloidmdonvi = "";
                            }
                            else if (ssloidmdonvi == "Chờ nhận.")
                            {
                                dt.Rows[i - 1]["TinhTrang"] = ssloidmdonvi;
                                dt.Rows[i - 1]["TinhTrangCode"] = "CN";
                                ssloidmdonvi = "";
                            }
                            else if (ssloidmdonvi == "Ghi đè")
                            {
                                dt.Rows[i - 1]["TinhTrang"] = ssloidmdonvi;
                                dt.Rows[i - 1]["TinhTrangCode"] = "GD";
                                ssloidmdonvi = "";
                            }
                        }
                        KtraDV = "";

                        // Kiểm tra mã đơn vị
                        if (dt.Rows[i]["MaDonVi"].ToString() != "")
                        {
                            string sqlStr = "select count(DonViID) from DonVi where MaDonVi=N'" + dt.Rows[i]["MaDonVi"].ToString() + "'";
                            if (sqlFun.GetData(sqlStr).Rows[0][0].ToString() != "0" && LoaiKiemTra == "1")
                            {
                                ssloidmdonvi = ssloidmdonvi + " - Mã đơn vị: " + dt.Rows[i]["MaDonVi"].ToString() + " đã tồn tại.";
                                sodongthemloi += 1;
                                KtraDV = "o";
                            }

                        }
                        else
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Mã đơn vị không được để trống.";
                            sodongthemloi += 1;

                        }

                        // Kiểm tra tên đơn vị 
                        if (dt.Rows[i]["TenDonVi"].ToString() == "")
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Tên đơn vị không được để trống.";
                            sodongthemloi += 1;
                        }
                        else if (dt.Rows[i]["TenDonVi"].ToString() != "")
                        {
                            string sqlStr2 = "select count(DonViID) from DonVi where MaDonVi=N'" + dt.Rows[i]["MaDonVi"].ToString() + "'";
                            string sqlStr = "select count(DonViID) from DonVi where MaDonVi=N'" + dt.Rows[i]["MaDonVi"].ToString() + "' and TenDonVi = N'" + dt.Rows[i]["TenDonVi"].ToString() + "'";
                            if (sqlFun.GetData(sqlStr).Rows[0][0].ToString() != "0" && LoaiKiemTra == "2")
                            {
                                ssloidmdonvi = "Ghi đè";
                                dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "GD";
                            }
                            else if (sqlFun.GetData(sqlStr2).Rows[0][0].ToString() == "0" && LoaiKiemTra == "2")
                            {
                                dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "CN";
                                ssloidmdonvi = "Chờ nhận.";
                            }
                            else if (sqlFun.GetData(sqlStr).Rows[0][0].ToString() == "0" && LoaiKiemTra == "2")
                            {
                                ssloidmdonvi += " - Không đủ điều kiện Ghi đè";
                                sodongthemloi += 1;

                            }
                        }

                        tenDonVi = dt.Rows[i]["TenDonVi"].ToString();


                        // Kiểm tra đơn vị cấp trên
                        if (dt.Rows[i]["TenDonVi_Cha"].ToString() != "")
                        {
                            string sqlStr = "SELECT DonViID from DonVi where TenDonVi=N'" + dt.Rows[i]["TenDonVi_Cha"].ToString() + "'";
                            if (sqlFun.GetData(sqlStr).Rows.Count == 0)
                            {
                                ssloidmdonvi = ssloidmdonvi + " - Đơn vị: " + dt.Rows[i]["TenDonVi_Cha"].ToString() + " không tồn tại trong hệ thống.";
                                sodongthemloi += 1;
                                KtraDV = "o";
                            }
                            else
                            {
                                maDonViCha = sqlFun.GetData(sqlStr).Rows[0][0].ToString();
                            }
                        }


                        bool loi = false;

                        string[] dauDacBiet = { ".", "@", "#", "$", "%", "^", "&", "*", "=" };
                        for (int y = 0; y < dauDacBiet.Length; y++)
                        {
                            if (tenDonVi.IndexOf(dauDacBiet[y].ToString()) >= 0)
                            {
                                loi = true;
                                break;
                            }
                        }
                        if (loi)
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Tên đơn vị : " + tenDonVi + " không hợp lệ.";
                            sodongthemloi += 1;
                        }

                        string check_doituong = $@"SELECT MaDonVi,TenDonVi
                                                        FROM dbo.DonVi 
                                                        WHERE TenDonVi = N'{dt.Rows[i]["TenDonVi"]}' AND MaDonVi = N'{dt.Rows[i]["MaDonVi"]}'
                                                        and " + (dt.Rows[i]["TenDonVi_Cha"].ToString() != "" ? ("DonViID_Cha = N'" + maDonViCha + "'") : ("isnull(DonViID_Cha,N'00000000-0000-0000-0000-000000000000')=N'00000000-0000-0000-0000-000000000000'"));
                        if (sqlFun.CheckHasRecord(check_doituong) && LoaiKiemTra != "2")
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Đơn vị có tên : " + dt.Rows[i]["TenDonVi"].ToString() + " đã tồn tại .";
                            sodongthemloi += 1;
                            KtraDV = "x";
                        }
                        else if (sqlFun.CheckHasRecord(check_doituong))
                        {
                            check_doituong = $@"SELECT MaDonVi,TenDonVi 
                                                        FROM dbo.DonVi 
                                                        WHERE TenDonVi = N'{dt.Rows[i]["TenDonVi"]}' and MaDonVi = '" + dt.Rows[i]["MaDonVi"].ToString() + "' and "
                                                    + (dt.Rows[i]["TenDonVi_Cha"].ToString() != "" ? ("DonViID_Cha = N'" + maDonViCha + "'") : ("isnull(DonViID_Cha, N'00000000-0000-0000-0000-000000000000') = N'00000000-0000-0000-0000-000000000000'"));
                            if (!sqlFun.CheckHasRecord(check_doituong))
                            {
                                ssloidmdonvi = ssloidmdonvi + " - Đơn vị có tên : " + dt.Rows[i]["TenDonVi"].ToString() + " đã tồn tại .";
                                sodongthemloi += 1;
                                KtraDV = "x";

                            }
                        }

                        // Kiểm tra Địa chỉ

                        diaChi = dt.Rows[i]["DiaChi"].ToString();


                        // Kiểm tra Tỉnh

                        String sqlStrT = "SELECT DiaBanHCID from DiaBanHC where TenDiaBan = N'" + dt.Rows[i]["Tinh"].ToString() + "'";
                        if ((sqlFun.GetData(sqlStrT).Rows[0][0].ToString()).Length == 0)
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Tỉnh không tồn tại trong hệ thống.";
                            sodongthemloi += 1;
                        }
                        maTinh = sqlFun.GetData(sqlStrT).Rows[0][0].ToString();


                        // Kiểm tra Huyện

                        String sqlStrH = "SELECT DiaBanHCID from DiaBanHC where TenDiaBan = N'" + dt.Rows[i]["Huyen"].ToString() + "'";
                        if ((sqlFun.GetData(sqlStrH).Rows[0][0].ToString()).Length == 0)
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Huyện không tồn tại trong hệ thống.";
                            sodongthemloi += 1;
                        }
                        maHuyen = sqlFun.GetData(sqlStrH).Rows[0][0].ToString();


                        // Kiểm tra Xã

                        String sqlStrX = "SELECT DiaBanHCID from DiaBanHC where TenDiaBan = N'" + dt.Rows[i]["Xa"].ToString() + "'";
                        if ((sqlFun.GetData(sqlStrX).Rows[0][0].ToString()).Length == 0)
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Xã không tồn tại trong hệ thống.";
                            sodongthemloi += 1;
                        }
                        maXa = sqlFun.GetData(sqlStrX).Rows[0][0].ToString();

                        // Kiểm tra Thôn

                        String sqlStrTh = "SELECT DiaBanHCID from DiaBanHC where TenDiaBan = N'" + dt.Rows[i]["Thon"].ToString() + "'";
                        if ((sqlFun.GetData(sqlStrTh).Rows[0][0].ToString()).Length == 0)
                        {
                            ssloidmdonvi = ssloidmdonvi + " - Thôn không tồn tại trong hệ thống.";
                            sodongthemloi += 1;
                        }
                        maThon = sqlFun.GetData(sqlStrTh).Rows[0][0].ToString();

                        // Kiểm tra Mã số thuế
                        maSoThue = dt.Rows[i]["MaSoThue"].ToString();

                        // Kiểm tra SĐT
                        soDienThoai = dt.Rows[i]["DienThoai"].ToString();

                        // Kiểm tra Email
                        email = dt.Rows[i]["Email"].ToString();

                        // Kiểm tra Fax
                        fax = dt.Rows[i]["Fax"].ToString();

                        // Kiểm tra Mã Quan hệ ngân sách
                        maQHNS = dt.Rows[i]["MaQHNS"].ToString();


                        DataView dw = dt.DefaultView;
                        string a = string.Format((dt.Rows[i]["MaDonVi"].ToString() == "" ? "" : "MaDonVi = '" + dt.Rows[i]["MaDonVi"].ToString() + @"'")
                          + (dt.Rows[i]["TenDonVi"].ToString() == "" ? "" : " and TenDonVi = '" + dt.Rows[i]["TenDonVi"].ToString() + @"'"));

                        dw.RowFilter = a;

                        if (dw.Count > 1)
                        {
                            if (ktraTonTai.Contains(dw[0]["STT"].ToString()))
                            {
                                ssloidmdonvi += " - Dữ liệu lặp lại.";
                                sodongthemloi += 1;
                                KtraDV = "o";

                            }
                            else
                            {
                                ktraTonTai[i] = dt.Rows[i]["STT"].ToString();
                            }

                        }
                        DataView dw2 = dt.DefaultView;
                        a = string.Format(dt.Rows[i]["MaDonVi"].ToString() == "" ? "1=1" : " MaDonVi = '" + dt.Rows[i]["MaDonVi"].ToString() + @"'");
                        dw2.RowFilter = a;

                        if (dw2.Count > 1)
                        {
                            if (ktraTonTai2.Contains(dw2[0]["STT"].ToString()))
                            {
                                ssloidmdonvi += " - Tồn tại nhiều hơn 1 mã đơn vị giống nhau.";
                                sodongthemloi += 1;
                                KtraDV = "o";

                            }
                            else
                            {
                                ktraTonTai2[i] = dt.Rows[i]["STT"].ToString();
                            }

                        }

                        DataView dw3 = dt.DefaultView;
                        string a3 = string.Format((dt.Rows[i]["TenDonVi"].ToString() == "" ? "" : "TenDonVi = '" + dt.Rows[i]["TenDonVi"].ToString() + @"'") +
                              (dt.Rows[i]["TenDonVi_Cha"].ToString() == "" ? "" : " and TenDonVi_Cha = '" + dt.Rows[i]["TenDonVi_Cha"].ToString() + @"'"));

                        dw3.RowFilter = a3;

                        if (dw3.Count > 1)
                        {
                            if (ktraTonTai3.Contains(dw3[0]["STT"].ToString()))
                            {
                                ssloidmdonvi = "STT " + (i + 1).ToString() + " - Đơn vị có tên : " + dt.Rows[i]["TenDonVi"].ToString() + " đã tồn tại, vui lòng kiểm tra lại .";
                                sodongthemloi += 1;
                                KtraDV = "o";

                            }
                            else
                            {
                                ktraTonTai3[i] = dt.Rows[i]["STT"].ToString();
                            }

                        }

                        if (ssloidmdonvi == "")
                        {
                            dt.Rows[i]["TinhTrang"] = "Chờ nhận.";
                            dt.Rows[i]["TinhTrangCode"] = "CN";
                        }
                        else if (ssloidmdonvi == "Ghi đè")
                        {

                            dt.Rows[i]["TinhTrang"] = ssloidmdonvi;
                            dt.Rows[i]["TinhTrangCode"] = "GD";
                        }
                        else
                        {
                            dt.Rows[i]["TinhTrang"] = ssloidmdonvi;
                        }

                    }
                    if (ssloidmdonvi == "")
                    {
                        dt.Rows[dt.Rows.Count - 1]["TinhTrang"] = "Chờ nhận.";
                        dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "CN";
                    }
                    else if (ssloidmdonvi == "Ghi đè")
                    {

                        dt.Rows[dt.Rows.Count - 1]["TinhTrang"] = ssloidmdonvi;
                        dt.Rows[dt.Rows.Count - 1]["TinhTrangCode"] = "GD";
                    }
                    else
                    {
                        dt.Rows[dt.Rows.Count - 1]["TinhTrang"] = ssloidmdonvi;
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
                Session["ssloidmdonvi"] = ssloidmdonvi;
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
                ssloidmdonvi = "Lỗi nhập excel";
                Session["ssloidmdonvi"] = ssloidmdonvi;
                Session["sodongthemloi"] = sodongthemloi;
                return JSonHelper.ToJson("Lỗi nhập excel");
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
        public string TaiFile()
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

            try
            {
                //Workbook workbook = new Workbook();

                DataTable dt = (DataTable)Session["DataTableNhanExcel"];

                _LOfficeExcel _vLOfficeExcel = new _LOfficeExcel();

                string fileMau = Server.MapPath("~/ExcelMau/ExcelMauDonVi.xlsx");
                string url = Server.MapPath("~/ExcelMau/ExcelMauDonVi_Loi.xlsx");

                DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/ExcelMau/ExcelMauDonVi_Loi.xlsx"));
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
                int vDongXuat = 5;
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ws.Cell("B" + vDongXuat).Value = dt.Rows[i][1].ToString();
                    ws.Cell("C" + vDongXuat).Value = dt.Rows[i][2].ToString();
                    ws.Cell("D" + vDongXuat).Value = dt.Rows[i][3].ToString();
                    ws.Cell("E" + vDongXuat).Value = dt.Rows[i][4].ToString();
                    ws.Cell("F" + vDongXuat).Value = dt.Rows[i][5].ToString();
                    ws.Cell("G" + vDongXuat).Value = dt.Rows[i][6].ToString();
                    ws.Cell("H" + vDongXuat).Value = dt.Rows[i][7].ToString();
                    ws.Cell("I" + vDongXuat).Value = dt.Rows[i][8].ToString();
                    ws.Cell("J" + vDongXuat).Value = dt.Rows[i][9].ToString();
                    ws.Cell("K" + vDongXuat).Value = "'" + dt.Rows[i][10].ToString();
                    ws.Cell("L" + vDongXuat).Value = "'" + dt.Rows[i][11].ToString();
                    ws.Cell("M" + vDongXuat).Value = "'" + dt.Rows[i][12].ToString();
                    ws.Cell("N" + vDongXuat).Value = dt.Rows[i][13].ToString();
                    ws.Column("N").Unhide();
                    vDongXuat++;
                }
                wb.Save();
                return JSonHelper.ToJson("../../../ExcelMau/ExcelMauDonVi_Loi.xlsx");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("Có lỗi xảy ra!");
            }
        }

        [HttpPost]
        public string NhapDuLieuFileExcel(object[] Data)
        {
            try
            {
                Boolean GhiDe = false;
                string sqlInsert = "", donViID = "", maQHNS = "", tenDonVi = "", maDonVi = "", maDonViCha = "", diaChi = "", maTinh = "", maHuyen = "", maXa = "", maThon = "", maSoThue = "", dienThoai = "", email = "", fax = "";
                int sodongthemloi = 0, sodongthemthanhcong = 0, soLuongGhiDe = 0, capDonVi = 0;
                string STTLoi = "";
                DataTable dt = (DataTable)Session["DataTableNhanExcel"];
                SqlConnection sqlConn = new SqlConnection(NTSSession.GetConnectionString2());
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                sqlConn.Open();

                if (dt.Columns.Count > 1)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (Data.Contains(dt.Rows[i]["MaDonVi"].ToString()))//Chỉ nhập những dòng có check
                        {
                            if (dt.Rows[i]["TinhTrangCode"].ToString() == "CN" || dt.Rows[i]["TinhTrangCode"].ToString() == "GD")//tình trạng khác rỗng
                            {
                                if (dt.Rows[i]["TinhTrangCode"].ToString() == "CN")
                                {
                                    GhiDe = false;
                                }
                                else if (dt.Rows[i]["TinhTrangCode"].ToString() == "GD")
                                {
                                    GhiDe = true;
                                }
                                string maDV = NTSSession.GetDonVi().DonViID.ToString();

                                donViID = dt.Rows[i]["MaDonVi"].ToString().Trim();
                                maDonVi = dt.Rows[i]["MaDonVi"].ToString().Trim();
                                maQHNS = dt.Rows[i]["MaQHNS"].ToString().Trim();
                                tenDonVi = dt.Rows[i]["TenDonVi"].ToString().Trim();
                                maDonViCha = sqlFun.GetData("SELECT DonViID from DonVi where TenDonVi=N'" + dt.Rows[i]["TenDonVi_Cha"].ToString() + "'").Rows[0][0].ToString();
                                diaChi = dt.Rows[i]["DiaChi"].ToString().Trim();
                                maTinh = sqlFun.GetData("SELECT DiaBanHCID from DiaBanHC where TenDiaBan like N'%" + dt.Rows[i]["Tinh"].ToString() + "'").Rows[0][0].ToString();
                                maHuyen = sqlFun.GetData("SELECT DiaBanHCID from DiaBanHC where TenDiaBan like N'%" + dt.Rows[i]["Huyen"].ToString() + "'").Rows[0][0].ToString();
                                maXa = sqlFun.GetData("SELECT DiaBanHCID from DiaBanHC where TenDiaBan like N'%" + dt.Rows[i]["Xa"].ToString() + "'").Rows[0][0].ToString();
                                maThon = sqlFun.GetData("SELECT DiaBanHCID from DiaBanHC where TenDiaBan like N'%" + dt.Rows[i]["Thon"].ToString() + "'").Rows[0][0].ToString();
                                maSoThue = dt.Rows[i]["MaSoThue"].ToString().Trim();
                                dienThoai = dt.Rows[i]["DienThoai"].ToString().Trim();
                                email = dt.Rows[i]["Email"].ToString().Trim();
                                fax = dt.Rows[i]["Fax"].ToString().Trim();

                                sqlInsert = "Insert_DonViExcel";
                                DataTable data = new DataTable();

                                SqlConnection sqlConnection = new SqlConnection(NTSSession.GetConnectionString2());
                                SqlFunction sqlFunction = new SqlFunction(NTSSession.GetConnectionString2());
                                sqlConnection.Open();
                                string result = sqlFunction.GetData("SELECT Cap FROM DonVi WHERE DonViID = '" + maDonViCha + "'").Rows[0][0].ToString();
                                if (result != null && result != "")
                                {
                                    if (int.TryParse(result.ToString(), out capDonVi))
                                    {
                                        capDonVi += 1;
                                    }
                                }
                                else
                                {
                                    capDonVi = 1;
                                }

                                SqlParameter[] para = {
                                     new SqlParameter("@MaDonVi",  maDonVi),
                                     new SqlParameter("@MaQHNS", maQHNS),
                                     new SqlParameter("@TenDonVi",tenDonVi),
                                     new SqlParameter("@DonViID_Cha", DungChung.NormalizationGuid(maDonViCha)),
                                     new SqlParameter("@DiaChi",  dt.Rows[i]["DiaChi"].ToString()),
                                     new SqlParameter("@TinhID", DungChung.NormalizationGuid(maTinh)),
                                     new SqlParameter("@HuyenID", DungChung.NormalizationGuid(maHuyen)),
                                     new SqlParameter("@XaID", DungChung.NormalizationGuid(maXa)),
                                     new SqlParameter("@ThonID", DungChung.NormalizationGuid(maThon)),
                                     new SqlParameter("@MaSoThue", maSoThue),
                                     new SqlParameter("@DienThoai", dienThoai),
                                     new SqlParameter("@Email", email),
                                     new SqlParameter("@Fax", fax),
                                     new SqlParameter("@Cap", capDonVi),
                                     new SqlParameter("@GhiDe",  DungChung.NormalizationBoolean(GhiDe))
                                    };




                                data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), sqlInsert, para).Tables[0];

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
                                    dt.Rows[i]["TinhTrang"] = "Không thể nhập file do gặp lỗi.";
                                    dt.Rows[i]["TinhTrangCode"] = "";
                                    dt.AcceptChanges();
                                }
                            }

                        }
                    }
                    Session["DataTableNhanExcel"] = dt;
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
        public string GetLoaiDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT LoaiHinhDonViID,MaLoaiHinhDonVi,TenLoaiHinhDonVi FROM dbo.LoaiHinhDonVi ORDER BY MaLoaiHinhDonVi").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpGet]
        public string LoadDataExcelSauNhan()
        {
            return JSonHelper.ToJson((DataTable)Session["DataTableNhanExcel" + NTSSession.GetUser().UserID]);
        }

        [HttpPost]
        public string TaoMaDonVi(string[] param)
        {
            try
            {
                return JSonHelper.ToJson(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_TaoMaDonViTheoDonViCha", DungChung.NormalizationGuid(param[0])).Tables[0]);
            }
            catch (Exception ex)
            {
                return "[]";
            }
        }
        [HttpPost]
        public string GetMaDonVi()
        {
            try
            {
                return JSonHelper.ToJson(NTSSession.GetUser().UserGroupCode.ToString().ToLower());
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public string LuuDv_Excel(string[] data)
        {
            SqlParameter[] para = {
                         new SqlParameter("MaDonVi",data[0]),
                         new SqlParameter("TenDonVi",data[1]),
                         new SqlParameter("DonVi_Cha",data[2]),
                         new SqlParameter("DiaChi",data[3]),
                         new SqlParameter("Xa",data[4]),
                         new SqlParameter("Huyen",data[5]),
                         new SqlParameter("Tinh",data[6]),
                         new SqlParameter("NgayDauKy",data[7]),
                         new SqlParameter("NgayCuoiKy",data[8]),
                         new SqlParameter("NgayInBC",data[9]),
                         new SqlParameter("TenCanBo",data[10]),
                         new SqlParameter("ChucVu",data[11]),
                         new SqlParameter("GioiTinh",data[12]),
                         new SqlParameter("NgaySinh",data[13]),
                         new SqlParameter("SDT",data[14]),
                         new SqlParameter("EmailCN",data[15]),
                         new SqlParameter("EmailDV",data[16]),
                         new SqlParameter("TenUser",data[17]),
                         new SqlParameter("NhapExcelDVID",DungChung.NormalizationGuid(data[18])),
                        };

            DataTable KQ = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Update_NhanExcelDV_ThuCong", para).Tables[0];
            if (KQ.Rows.Count > 0)
            {
                return JSonHelper.ToJson("1_Cập nhật thành công");
            }
            return JSonHelper.ToJson("0_Cập nhật thất bại!");
        }

        [HttpPost]
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                    //new SqlParameter("@GiaiDoan", 1),
                };
                ep.Result = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDonViByID", para);
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string KiemTraQuyen()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (NTSSession.GetUser().UserGroupCode.ToString().ToLower() == "admin")
                {
                    ep.Result = true;
                }
                else
                {
                    ep.Result = false;
                }

                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuCotDangSD(string ID, string strCotID, string strBang, string value)
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
                    new SqlParameter("DangSD", DungChung.NormalizationBoolean(value))
                };
                if (NTSSession.GetDonVi().DonViID.ToString().ToUpper() == ID.ToString().ToUpper())
                {
                    ep.Err = true;
                    ep.Msg = "Bạn không thể cập nhật trạng thái của đơn vị đang đăng nhập!";
                    return JSonHelper.ToJson(ep);
                }
                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_CotDangSD", para).Tables[0];
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


    }
}