using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TTLD2024.Class;
using TTLD2024.DataConnect;

namespace TTLD2024.Models
{
    public class DungChung
    {
        public static string kiemTraPhanQuyen()
        {
            try
            {
                return HttpContext.Current.Session["CurrentPermiss"].ToString();
            }
            catch (Exception)
            {
                return "";
            }
        }
        public DataTable LoadMainMenu_lv1()
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                return sqlFun.GetData(@"SELECT functionIDpr,dienGiai,nhomChucnang,pathFile,IconName FROM dbo.Functions   WHERE (nhomChucnang IS NULL OR nhomChucnang = '') AND functionIDpr IN (SELECT functionIDpr_sd FROM dbo.UserPermiss WHERE maNguoidungpr_sd='" + NTSSession.GetUser().UserID.ToString() + "')   ORDER BY tenFile asc");
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static bool CapNhatKyBaoCao(string tungay, string denngay, string kybaocao, string KeyMaHoa)
        {
            try
            {
                UsersDataContext db = new UsersDataContext();
                IQueryable<DonVi> dv = from u in db.DonVis where (u.DonViID == NTSSession.GetDonVi().DonViID) select u;
                DonVi _vdonvi = dv.FirstOrDefault();
                //_vdonvi.NgayDauKy = Convert.ToDateTime(DungChung.chuyenChuoiSangNgay_YYYYmmdd(tungay));
                //_vdonvi.NgayCuoiKy = Convert.ToDateTime(DungChung.chuyenChuoiSangNgay_YYYYmmdd(denngay));
                NTSSession.SetDonVi(_vdonvi);
                NTSSession.SetNamSudung(tungay.ToString().Substring(6, 4));
                NTSSession.SetKyBaoCao(kybaocao);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static DataTable LoadKyBaoCao()
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                return sqlFun.GetData(@"SELECT bangChu,bangSo FROM dbo.DMKyBaocao where bangSo not in ('19','20') ");
            }
            catch (Exception)
            {
                return null;
            }
        }
        public DataTable LoadMainMenu_child(string motherID)
        {

            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                return sqlFun.GetData(@"SELECT functionIDpr,dienGiai,nhomChucnang,pathFile,IconName FROM dbo.Functions   WHERE nhomChucnang = '" + motherID + "' AND functionIDpr IN (SELECT functionIDpr_sd FROM dbo.UserPermiss WHERE maNguoidungpr_sd='" + NTSSession.GetUser().UserID + "')    ORDER BY tenFile asc");
            }
            catch (Exception)
            {
                return null;
            }
        }
        //kiem tra ma khi them vao bang DL
        public static bool kiemTraTrungMa(string strMaKiemTra, string strBangKiemTra, string strCotKiemTra)
        {
            try
            {

                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                string strSQL = @"Select " + strCotKiemTra + " FROM " + strBangKiemTra + " WHERE " + strCotKiemTra + "=N'" + strMaKiemTra + "'";
                return sqlFun.CheckHasRecord(strSQL);
            }
            catch
            {
                return false;
            }
        }
        //lay ma tu dong
        public static string layMaTuTang(string strKyTu, string strCotTang, string strBangTang, string strDinhDang)
        {
            try
            {

                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                string soPhieu = "";
                string sql = "SELECT MAX(CONVERT(DECIMAL,RIGHT(" + strCotTang + ",4))) FROM dbo." + strBangTang;
                decimal _vNewKey = sqlFun.GetOneDecimalField(sql) + 1;
                soPhieu = strKyTu + _vNewKey.ToString(strDinhDang);
                return soPhieu;
            }
            catch
            {
                return "";
            }
        }
        //kiem tram ma khi xoa
        public static string KiemTraXoa(string sma, string sbangtru, string scot, string scotcon, string bangtrucon)
        {
            SqlFunction _sqlClass = new SqlFunction(NTSSession.GetConnectionString1());
            //if (scot == "sttDinhMucNButpr")
            //{
            //    if (_sqlClass.CheckHasRecord("SELECT maDoiTuongpr_sd FROM dbo.NhuanBut WHERE sttNhapKhopr = '" + sma + "' AND trangThai ='1'") == true)
            //    return "Không được phép xóa khi đã được lưu chính thức!";
            //}
            if (scot == "sttTraNhapKhopr" && _sqlClass.CheckHasRecord("SELECT sttTraNhapKhopr FROM dbo.TraNhapKho WHERE sttTraNhapKhopr = '" + sma + "' AND trangThai ='1'") == true)
            {
                return "Không được phép xóa khi đã được lưu chính thức!";
            }
            if (scot == "sttXuatKhopr" && _sqlClass.CheckHasRecord("SELECT sttXuatKhopr FROM dbo.XuatKho WHERE sttXuatKhopr = '" + sma + "' AND trangThai ='1'") == true)
            {
                return "Không được phép xóa khi đã được lưu chính thức!";
            }
            if (scot == "sttKiemKhopr" && _sqlClass.CheckHasRecord("SELECT sttKiemKhopr FROM dbo.KiemKho WHERE sttKiemKhopr = '" + sma + "' AND trangThai ='1'") == true)
            {
                return "Không được phép xóa khi đã được lưu chính thức!";
            }
            string strSQL = "SELECT TABLE_NAME tablename FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE N'" + scot.ToString() + '_' + "%' " + (sbangtru.ToString() == "" ? "" : " AND TABLE_NAME NOT IN ('" + sbangtru.Replace(",", "','") + "')") + " group by TABLE_NAME";
            DataTable _dt = new DataTable();
            _dt = _sqlClass.GetData(strSQL);
            strSQL = " ";
            if (_dt.Rows.Count > 0)
            {
                try
                {
                    string text = "<table style='width:100%'>";
                    int dem = 0;
                    for (int i = 0; i < _dt.Rows.Count; i++)
                    {

                        string dieuKien = "";
                        DataTable tabTenCot = _sqlClass.GetData("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME like N'" + scot.ToString() + '_' + "%' and TABLE_NAME = N'" + _dt.Rows[i][0].ToString() + "'");
                        for (int j = 0; j < tabTenCot.Rows.Count; j++)
                        {
                            if (j == 0)
                                dieuKien = dieuKien + tabTenCot.Rows[j][0] + " =N'" + sma + "'";
                            else
                                dieuKien = dieuKien + " or " + tabTenCot.Rows[j][0] + " =N'" + sma + "'";
                        }
                        strSQL = "select * from " + _dt.Rows[i][0] + " where " + (dieuKien == "" ? "1=1" : dieuKien) + "";
                        if (_sqlClass.CheckHasRecord(strSQL))
                        {
                            dem += 1;
                            text += "<tr><td>" + _sqlClass.GetOneStringField("SELECT noiDungTB FROM dbo.ThongBaoLoi WHERE tenBangpr=N'" + _dt.Rows[i][0] + "'") + "</td></tr>";
                        }
                    }
                    if (dem > 0)
                    {
                        if (sbangtru == "''" || sbangtru == "")
                        {
                            return text += "</table>";
                        }
                        else
                        {
                            string strBangTru = sbangtru.Replace("'", "");
                            string[] mangBangTru = strBangTru.Split(',');
                            string[] mangCotCon = scotcon.Split(',');
                            string chuoicon_ = "";
                            for (int i = 0; i < mangBangTru.Length; i++)
                            {
                                chuoicon_ += KiemTraXoa1(sma, mangCotCon[i].ToString(), mangBangTru[i].ToString(), scot, bangtrucon);
                            }
                            text += chuoicon_;
                            text += "</table>";
                            return text;
                        }
                    }
                    else
                    {
                        if (sbangtru == "''" || sbangtru == "")
                        {
                            return "";
                        }
                        else
                        {
                            string chuoicon_ = "";
                            string strBangTru = sbangtru.Replace("'", "");
                            string[] mangBangTru = strBangTru.Split(',');
                            string[] mangCotCon = scotcon.Split(',');
                            for (int i = 0; i < mangBangTru.Length; i++)
                            {
                                chuoicon_ += KiemTraXoa1(sma, mangCotCon[i].ToString(), mangBangTru[i].ToString(), scot, bangtrucon);
                            }
                            if (chuoicon_ == "")
                            {
                                return "";
                            }
                            else
                            {
                                text += chuoicon_;
                                text += "</table>";
                                return text;
                            }
                        }
                    }
                }
                catch
                {
                    return "";
                }
            }
            else
            {
                return "";
            }
        }
        public static string KiemTraXoa1(string sma, string scotcon, string strBangCon, string scotcha, string bangtrucon)
        {
            string strSQL = "SELECT TABLE_NAME tablename FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE N'" + scotcon.ToString() + '_' + "%' " + (bangtrucon.ToString() == "" ? "" : " AND TABLE_NAME NOT IN ('" + bangtrucon.Replace(",", "','") + "')") + " group by TABLE_NAME";
            SqlFunction _sqlClass = new SqlFunction(NTSSession.GetConnectionString1());
            DataTable _dt = new DataTable();
            _dt = _sqlClass.GetData(strSQL);
            strSQL = " ";
            string kq = "";
            if (_dt.Rows.Count > 0)
            {
                try
                {

                    for (int i = 0; i < _dt.Rows.Count; i++)
                    {
                        strSQL = "select " + scotcon + "_sd from " + _dt.Rows[i][0] + " where " + scotcon + "_sd in  (select " + scotcon + " from  " + strBangCon + " where " + scotcha + " = N'" + sma + "')";
                        if (_sqlClass.CheckHasRecord(strSQL))
                        {
                            kq += "<tr><td>" + _sqlClass.GetOneStringField("SELECT noiDungTB FROM dbo.ThongBaoLoi WHERE tenBangpr=N'" + _dt.Rows[i][0] + "'") + "</td></tr>";
                        }
                    }
                    return kq;
                }
                catch { return ""; }
            }
            else
            {
                return "";
            }
        }
        // chuyển chuỗi sang ngày
        //public static string chuyenChuoiSangNgay(string strChuoi)
        //{
        //    return strChuoi.Substring(3, 2) + "/" + strChuoi.Substring(0, 2) + "/" + strChuoi.Substring(6, 4);
        //}
        // chuyển chuỗi sang ngày dạng yyyy-mm-dd
        public static string chuyenChuoiSangNgay_YYYYmmdd(string strChuoi)
        {
            //return strChuoi.Substring(3, 2) + "/" + strChuoi.Substring(0, 2) + "/" + strChuoi.Substring(6, 4);
            try
            {
                string[] sa = strChuoi.Split('/');
                return sa[2] + "-" + sa[1] + "-" + sa[0];
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }
        // chuyển chuỗi sang ngày dạng yyyy-mm-dd hh:mm:ss
        public static string chuyenChuoiSangNgayGio_YYYYmmddHHmmss(string strChuoi)
        {
            string[] sa = strChuoi.Split(' ');
            string[] strNgay = sa[0].Split('/');
            string strGio = sa[1];
            return (strNgay[2] + "-" + strNgay[1] + "-" + strNgay[0] + " " + strGio);
        }
        public static DataTable loadCombobox(string tenBang, string cotTruyVan, string dieuKien)
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                string str = "select " + cotTruyVan + " from " + tenBang + " " + dieuKien + "";
                return sqlFun.GetData(str);
            }
            catch
            {
                return null;
            }
        }
        public static string taoMaTuTangTheoDM(string kyhieuLoaiPhieu, string bangDuLieu, string cotDuLieu, string dieuKienTruyVan, string ngayLap)
        {
            string ChuoiMau = "";
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            DataTable ThongTinChungTu = new DataTable();
            ThongTinChungTu = sqlFun.GetData("Select * From LoaiChungTu where LoaiChungTuCode=N'" + kyhieuLoaiPhieu + "'");
            if (ThongTinChungTu.Rows.Count == 0)
            {
                return "";
            }
            else
            {
                DateTime _vNgayLap = DateTime.Now;
                string _vKyhieuTruoc = "", _vKyhieuSau = "";
                decimal _vChieuDaiChuoiTT = 0;
                bool _vTangTheoThang = false, _vTuTang = false, _vHienDauGach = false;
                if (!string.IsNullOrEmpty(ngayLap))
                    _vNgayLap = DateTime.Parse(ngayLap);
                _vKyhieuTruoc = ThongTinChungTu.Rows[0]["KyHieuPhiaTruoc"].ToString();
                _vKyhieuSau = ThongTinChungTu.Rows[0]["KyHieuPhiaSau"].ToString();
                _vChieuDaiChuoiTT = decimal.Parse(ThongTinChungTu.Rows[0]["ChieuDaiChuoiTT"].ToString());
                _vTangTheoThang = bool.Parse(ThongTinChungTu.Rows[0]["TangTheoThang"].ToString());
                _vTuTang = bool.Parse(ThongTinChungTu.Rows[0]["TuTang"].ToString());
                _vHienDauGach = bool.Parse(ThongTinChungTu.Rows[0]["hienDauGach"].ToString());
                string Format = "";
                for (int i = 0; i < _vChieuDaiChuoiTT; i++)
                {
                    Format += "0";
                }
                if (_vTuTang)
                {
                    if (_vTangTheoThang)
                    {
                        if (_vKyhieuTruoc.Contains("[MONTH]"))
                            _vKyhieuTruoc = _vKyhieuTruoc.Replace("[MONTH]", _vNgayLap.Month.ToString() + "-");
                        if (_vKyhieuSau.Contains("[MONTH]"))
                            _vKyhieuSau = _vKyhieuSau.Replace("[MONTH]", "-" + _vNgayLap.Month.ToString());
                    }
                    _vKyhieuTruoc = _vKyhieuTruoc.Replace("[YEAR]", _vNgayLap.Year.ToString());
                    _vKyhieuSau = _vKyhieuSau.Replace("[YEAR]", _vNgayLap.Year.ToString());
                    string SQL = "Select REPLACE(REPLACE(" + cotDuLieu + ",N'" + _vKyhieuTruoc + "',''),N'" + _vKyhieuSau + "','') From " + bangDuLieu + " WHERE LEFT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuTruoc.Length + ")=N'" + _vKyhieuTruoc + "' AND RIGHT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuSau.Length + ")=N'" + _vKyhieuSau + "' " + dieuKienTruyVan;
                    string SoChungTu = sqlFun.GetOneStringField(SQL);
                    if (string.IsNullOrEmpty(SoChungTu))
                    {

                        ChuoiMau = _vKyhieuTruoc + decimal.Parse("1").ToString(Format) + _vKyhieuSau;
                    }
                    else
                    {
                        try
                        {
                            decimal SoLonNhat = decimal.Parse(SoChungTu) + 1;

                            if (SoLonNhat.ToString().Length > _vChieuDaiChuoiTT)
                            {
                                Format = "";
                                for (int i = 0; i < SoLonNhat.ToString().Length; i++)
                                {
                                    Format += "0";
                                }
                            }
                            ChuoiMau = _vKyhieuTruoc + SoLonNhat.ToString(Format) + _vKyhieuSau;
                        }
                        catch (Exception)
                        {
                            ChuoiMau = _vKyhieuTruoc + decimal.Parse("1").ToString(Format) + _vKyhieuSau;
                        }
                    }
                }
                else
                {
                    if (_vTangTheoThang)
                    {
                        if (_vKyhieuTruoc.Contains("[MONTH]"))
                            _vKyhieuTruoc = _vKyhieuTruoc.Replace("[MONTH]", _vNgayLap.Month.ToString() + "-");
                        if (_vKyhieuSau.Contains("[MONTH]"))
                            _vKyhieuSau = _vKyhieuSau.Replace("[MONTH]", "-" + _vNgayLap.Month.ToString());
                    }
                    _vKyhieuTruoc = _vKyhieuTruoc.Replace("[YEAR]", _vNgayLap.Year.ToString());
                    _vKyhieuSau = _vKyhieuSau.Replace("[YEAR]", _vNgayLap.Year.ToString());
                    ChuoiMau = _vKyhieuTruoc + _vKyhieuSau;
                }
            }
            return ChuoiMau;
            //string _vKyhieuTruoc = "", _vKyhieuSau = "", _vKyhieuLoaiPhieu = kyhieuLoaiPhieu, _vDauCach = "";
            //decimal _vChieuDaiChuoiTT = 0;
            //bool _vTangTheoThang = false, _vTuTang = false, _vHienDauCach = false;
            //DateTime ngayLap;
            //_vKyhieuTruoc = sqlFun.GetOneStringField("Select KyHieuPhiaTruoc From LoaiChungTu where LoaiChungTuID=N'" + _vKyhieuLoaiPhieu + "'");
            //_vKyhieuSau = sqlFun.GetOneStringField("Select KyHieuPhiaSau From LoaiChungTu where LoaiChungTuID=N'" + _vKyhieuLoaiPhieu + "'");
            //_vChieuDaiChuoiTT = sqlFun.GetOneDecimalField("Select ChieuDaiChuoiTT From LoaiChungTu where LoaiChungTuID=N'" + _vKyhieuLoaiPhieu + "'");
            //_vTangTheoThang = Convert.ToBoolean(sqlFun.GetOneBoolField("Select TangTheoThang From LoaiChungTu where LoaiChungTuID=N'" + _vKyhieuLoaiPhieu + "'"));
            //_vTuTang = Convert.ToBoolean(sqlFun.GetOneBoolField("Select tuTang From LoaiChungTu where LoaiChungTuID=N'" + _vKyhieuLoaiPhieu + "'"));
            //_vHienDauCach = Convert.ToBoolean(sqlFun.GetOneBoolField("Select HienDauGach From LoaiChungTu where LoaiChungTuID=N'" + _vKyhieuLoaiPhieu + "'"));
            //string format = "", _vSoPhieu = "", _vTruyVan = "", _vSoPhieuTT = "";
            //decimal _vChieuDaiPhieu = 0, stt = 0, _vChieuDaiChuoiTTThang = 0;
            //for (int i = 0; i < _vChieuDaiChuoiTT; i++)
            //{
            //    format += "0";
            //}
            //try
            //{
            //    if (_vTangTheoThang == true)
            //    {

            //        ngayLap = Convert.ToDateTime(chuyenChuoiSangNgay(ngayLoc));
            //        if (_vHienDauCach == true)
            //            _vDauCach = "/";
            //        else
            //            _vDauCach = "";
            //        //lay cau truc phieu (chua tinh so tu tang)
            //        _vSoPhieu = _vKyhieuTruoc + ngayLap.Month.ToString("00") + _vDauCach + _vKyhieuSau;

            //        //lấy chiều dài của phiếu 
            //        _vChieuDaiPhieu = Convert.ToDecimal(_vSoPhieu.Length) + _vChieuDaiChuoiTT;//NK10/0010-2015/PNK

            //        _vSoPhieuTT = _vKyhieuTruoc + ngayLap.Month.ToString("00") + _vDauCach;

            //        _vChieuDaiChuoiTTThang = Convert.ToDecimal(_vSoPhieuTT.Length) + _vChieuDaiChuoiTT;

            //        _vTruyVan = "SELECT MAX(CONVERT(DECIMAL,RIGHT(LEFT (" + cotDuLieu + "," + _vChieuDaiChuoiTTThang + ") ," + _vChieuDaiChuoiTT + "))) FROM " + bangDuLieu + " WHERE  LEN(" + cotDuLieu + ")="
            //                     + _vChieuDaiPhieu + "" + dieuKienTruyVan + "";
            //        stt = sqlFun.GetOneDecimalField(_vTruyVan) + 1;
            //        return _vKyhieuTruoc + ngayLap.Month.ToString("00") + _vDauCach + stt.ToString(format) + _vKyhieuSau;
            //    }
            //    else
            //    {
            //        //lay cau truc phieu (chua tinh so tu tang)
            //        _vSoPhieu = _vKyhieuTruoc + _vKyhieuSau;
            //        //lấy chiều dài của phiếu 
            //        _vChieuDaiPhieu = Convert.ToDecimal(_vSoPhieu.Length) + _vChieuDaiChuoiTT;

            //        _vChieuDaiChuoiTTThang = Convert.ToDecimal(_vKyhieuTruoc.Length) + _vChieuDaiChuoiTT;

            //        _vTruyVan = "SELECT MAX(CONVERT(DECIMAL,RIGHT(LEFT (" + cotDuLieu + "," + _vChieuDaiChuoiTTThang + ")," + _vChieuDaiChuoiTT + "))) FROM " + bangDuLieu + " WHERE LEN(" + cotDuLieu + ")="
            //                     + _vChieuDaiPhieu + " ";
            //        stt = sqlFun.GetOneDecimalField(_vTruyVan) + 1;
            //        return _vKyhieuTruoc + stt.ToString(format) + _vKyhieuSau;
            //    }
            //}
            //catch
            //{
            //    //lay cau truc phieu (chua tinh so tu tang)
            //    _vSoPhieu = _vKyhieuTruoc + _vKyhieuSau;
            //    //lấy chiều dài của phiếu 
            //    _vChieuDaiPhieu = Convert.ToDecimal(_vSoPhieu.Length) + _vChieuDaiChuoiTT;

            //    _vChieuDaiChuoiTTThang = Convert.ToDecimal(_vKyhieuTruoc.Length) + _vChieuDaiChuoiTT;

            //    _vTruyVan = "SELECT MAX(CONVERT(DECIMAL,RIGHT(LEFT (" + cotDuLieu + "," + _vChieuDaiChuoiTTThang + ")," + _vChieuDaiChuoiTT + "))) FROM " + bangDuLieu + " WHERE LEN(" + cotDuLieu + ")="
            //                 + _vChieuDaiPhieu + " ";
            //    stt = sqlFun.GetOneDecimalField(_vTruyVan) + 1;
            //    return _vKyhieuTruoc + stt.ToString(format) + _vKyhieuSau;
            //}
        }
        //lay du lieu bang Hang hoa trong csdl 
        //public static DataTable LayDuLieuTheoID(string cauTruyVan)
        //{
        //    try
        //    {
        //        SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
        //        return sqlFun.GetData(@"" + cauTruyVan + "");
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}
        public static string LayThongTinCauHinh(string maForm)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            return sqlFun.GetOneStringField(@"select noiDung from CHHienThi where maForm = N'" + maForm + "'");
        }

        public static string layDanhSachDonVi(string sMaDonVipr, string dieuKien)
        {
            try
            {
                SqlFunction _sqlClass = new SqlFunction(NTSSession.GetConnectionString1());
                return "SELECT maDonvipr FROM dbo.DonVi WHERE maDonVipr " + dieuKien + " N'" + sMaDonVipr + "" + (dieuKien == "=" ? "" : "%") + "'";
            }
            catch
            {
                return "''";
            }
        }
        public static bool IsNumeric(string input)
        {
            int n;
            if (!string.IsNullOrEmpty(input)) //.Replace('.',null).Replace(',',null)
            {
                foreach (var i in input)
                {
                    if (!int.TryParse(i.ToString(), out n))
                    {
                        return false;
                    }

                }
                return true;
            }
            return false;
        }
        public static bool kiemtrangaythangnam(string chuoikiemtra)
        {
            try
            {
                if (chuoikiemtra.Length > 10)
                {
                    chuoikiemtra = DateTime.Parse(chuoikiemtra.Substring(0, 10).ToString(), System.Globalization.CultureInfo.GetCultureInfo("en-gb")).ToString("dd/MM/yyyy");
                }
                if (chuoikiemtra.Length == 10)
                {
                    string ngay = "", thang="", nam="";
                    if (chuoikiemtra.Contains("/"))
                    {
                         ngay = chuoikiemtra.ToString().Trim().Split('/')[0].ToString();
                        thang = chuoikiemtra.ToString().Trim().Split('/')[1].ToString();
                        nam = chuoikiemtra.ToString().Trim().Split('/')[2].ToString();
                    }
                    if (chuoikiemtra.Contains("-"))
                    {
                        ngay = chuoikiemtra.ToString().Trim().Split('-')[2].ToString();
                        thang = chuoikiemtra.ToString().Trim().Split('-')[1].ToString();
                        nam = chuoikiemtra.ToString().Trim().Split('-')[0].ToString();
                    }
                    if (ngay.Length.ToString() != "2" || thang.Length.ToString() != "2" || nam.Length.ToString() != "4")
                    {
                        return false;
                    }
                    else
                    {
                        if (Convert.ToDecimal(ngay.ToString()) > 32 || Convert.ToDecimal(ngay.ToString()) < 0)
                        {
                            return false;
                        }
                        if (Convert.ToDecimal(thang.ToString()) > 12 || Convert.ToDecimal(thang.ToString()) < 0)
                        {
                            return false;
                        }
                        if (Convert.ToDecimal(nam.ToString()) > 2090 || Convert.ToDecimal(nam.ToString()) < 1900)
                        {
                            return false;
                        }
                    }
                }
                else
                {

                    return false;
                }
                return true;

            }
            catch
            {
                return false;
            }
        }
        public static string DinhDangSoSQL(string value)
        {
            try
            {
                value += "";
                string _DauTachNhomTienTe = DauTachNhomTienTe();
                string _DauTachThapPhan = DauTachThapPhan();
                if (_DauTachThapPhan.Trim() == ".") // => _DauTachNhomTienTe == ","
                {
                    decimal.Parse(value.Replace(_DauTachNhomTienTe, ""));
                    if (string.IsNullOrEmpty(value))
                        return "0";
                    return value.Replace(_DauTachNhomTienTe, "");
                }
                else
                {
                    decimal.Parse(value.Replace(".", ""));
                    if (string.IsNullOrEmpty(value))
                        return "0";
                    return value.Replace(".", "");
                }
            }
            catch (Exception)
            {
                return "0";
            }
        }
        public static string DinhDangSoSQL_NoWhithParameter(string value)
        {
            try
            {
                value += "";
                string _DauTachNhomTienTe = DauTachNhomTienTe();
                string _DauTachThapPhan = DauTachThapPhan();
                if (_DauTachThapPhan.Trim() == ".")
                {
                    decimal.Parse(value.Replace(_DauTachNhomTienTe, ""));
                    if (string.IsNullOrEmpty(value))
                        return "0";
                    value = value.Replace(_DauTachNhomTienTe, "");
                }
                else
                {
                    decimal.Parse(value.Replace(".", ""));
                    if (string.IsNullOrEmpty(value))
                        return "0";
                    value = value.Replace(".", "");
                }
                return value.Replace(",", ".");
            }
            catch (Exception)
            {
                return "0";
            }
        }
        public static bool IsValid(string str)
        {
            string pattern = "[0-9a-zA-Z]";
            return System.Text.RegularExpressions.Regex.IsMatch(str, pattern, System.Text.RegularExpressions.RegexOptions.Compiled);
        }
        public static bool IsValidGUID(string str)
        {
            string pattern = @"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$";
            return System.Text.RegularExpressions.Regex.IsMatch(str, pattern, System.Text.RegularExpressions.RegexOptions.Compiled);
        }
       
        /// <summary>
        /// Định độ cao cho Grid
        /// </summary>
        /// <param name="Luoi">Tên lưới VD: Grid1</param>
        /// <param name="ChieuCaoTruHao">Chiều các phần header+footer</param>
   
        /// Định độ rộng (width) của cột lại
        /// </summary>
        /// <param name="Luoi">Tên lưới VD: Grid1</param>
        /// <param name="Colum">Cột cần chạy động VD: 1</param>
        /// <param name="tongCot">Tổng số lượng cần trừ thêm VD: 100</param>
     
     
        /// <summary>
        /// Định độ rộng (width) của cột lại
        /// </summary>
        /// <param name="Luoi">Tên lưới VD: Grid1</param>
        /// <param name="Colum">Cột cần chạy động VD: 1</param>
        /// <param name="tongCot">Tổng số lượng cần trừ thêm VD: 100</param>
        /// /// <param name="tongCot">Phần trăm của modal: 70</param>
       
       

        public static DateTime NgayChuNhat(DateTime date)
        {
            return NgayThuHai(date).AddDays(6);
        }
        public static DateTime NgayThuHai(DateTime date)
        {
            var dayOfWeek = date.DayOfWeek;

            if (dayOfWeek == DayOfWeek.Sunday)
            {
                //xét chủ nhật là đầu tuần thì thứ 2 là ngày kế tiếp nên sẽ tăng 1 ngày  
                //return date.AddDays(1);  

                // nếu xét chủ nhật là ngày cuối tuần  
                return date.AddDays(-6);
            }

            // nếu không phải thứ 2 thì lùi ngày lại cho đến thứ 2  
            int offset = dayOfWeek - DayOfWeek.Monday;
            return date.AddDays(-offset);
        }

        public static string DauTachNhomTienTe()
        {
            return System.Globalization.NumberFormatInfo.CurrentInfo.CurrencyGroupSeparator;
        }
        public static string DauTachThapPhan()
        {
            return System.Globalization.NumberFormatInfo.CurrentInfo.CurrencyDecimalSeparator;
        }

        public static DataTable GetDataFromExcel(string pathFile, string rangeName, string where)
        {
            //Create a new DataTable result
            DataTable dtData = new DataTable();
            try
            {
                //Open the Excel file using ClosedXML.
                using (XLWorkbook workBook = new XLWorkbook(pathFile))
                {
                    IXLWorksheet ws = workBook.Worksheet(1);
                    var Address = ws.Range(rangeName);
                    // Get position range start
                    var StartAddress = Address.RangeAddress.FirstAddress;
                    int StartColumnNumber = StartAddress.ColumnNumber;
                    int StartColumnLoop = StartAddress.RowNumber;
                    // Get position range end
                    var LastAddress = Address.RangeAddress.LastAddress;
                    int LastColumnNumber = LastAddress.ColumnNumber;
                    int LastRowNumber = LastAddress.RowNumber;
                    int indexRow = StartColumnLoop, IndexRowTableResult = 0;
                    // Auto create header column for table result
                    for (int i = StartColumnNumber; i <= LastColumnNumber; i++)
                        dtData.Columns.Add("Column" + i.ToString(), typeof(String));
                    // Get data excel to datatable
                    for (int i = indexRow; i <= LastRowNumber; i++)
                    {
                        dtData.Rows.Add();
                        int IndexColumnTableResult = 0;
                        for (int j = StartColumnNumber; j <= LastColumnNumber; j++)
                        {
                            if (ws.Cell(i, j).HasFormula)
                            {
                                string[] errorList = { "#N/A", "#VALUE!", "#NAME" };
                                if (Array.Exists(errorList, elelemt => elelemt.ToUpper() == ws.Cell(i, j).ToString().ToUpper()))
                                    dtData.Rows[IndexRowTableResult][IndexColumnTableResult] = "";
                                else
                                    dtData.Rows[IndexRowTableResult][IndexColumnTableResult] = "" + ws.Cell(i, j).ToString();
                            }
                            else
                                dtData.Rows[IndexRowTableResult][IndexColumnTableResult] = "" + ws.Cell(i, j).Value.ToString();
                            IndexColumnTableResult++;
                        }
                        IndexRowTableResult++;
                    }
                    if (dtData.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtData.Columns.Count; i++)
                        {
                            dtData.Columns[dtData.Columns[i].ColumnName].ColumnName = dtData.Rows[0][i].ToString();
                        }
                        dtData.Rows.Remove(dtData.Rows[0]); // Delete first row in result data
                    }
                    // Filter datatable before return
                    DataView dataView = new DataView(dtData);
                    dataView.RowFilter = where;
                    return dataView.ToTable();
                }
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        // Xuống dòng, định dạng word
     
        public static Guid NormalizationGuid(object chuoi)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(chuoi.ToString()) && DungChung.IsValidGUID(chuoi.ToString()))
                    return Guid.Parse(chuoi.ToString());
                else
                    return default(Guid);
            }
            catch (Exception ex)
            {
                return default(Guid);
            }
        }
        public static object NormalizationGuid(object chuoi, bool nullValue = true)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(chuoi.ToString()) && DungChung.IsValidGUID(chuoi.ToString()))
                    return Guid.Parse(chuoi.ToString());
                else
                    return (object)DBNull.Value;
            }
            catch (Exception ex)
            {
                return (object)DBNull.Value;
            }
        }
        public static object NormalizationString(object chuoi, bool catKhoangTrong)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(chuoi.ToString()))
                {
                    if (catKhoangTrong)
                        chuoi = chuoi.ToString().Trim();
                    return chuoi.ToString();
                }
                else
                    return DBNull.Value;
            }
            catch (Exception ex)
            {
                return DBNull.Value;
            }
        }
        public static object NormalizationDateTime(object chuoi)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(chuoi.ToString()))
                {
                    string _chuoi = chuoi.ToString().Trim();
                    if (_chuoi.Length == 4)
                    {
                        return _chuoi + "-01-01";
                    }
                    else
                    {
                        string[] sa = _chuoi.Split('/');
                        return sa[2] + "-" + sa[1] + "-" + sa[0];
                    }
                }
                else
                    return DBNull.Value;
            }
            catch (Exception ex)
            {
                return DBNull.Value;
            }
        }
        public static object NormalizationString(object chuoi)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(chuoi.ToString()))
                    return chuoi.ToString();
                else
                    return DBNull.Value;
            }
            catch (Exception ex)
            {
                return DBNull.Value;
            }
        }

        public static object NormalizationNumber(object chuoi)
        {
            try
            {
                return DungChung.DinhDangSoSQL(chuoi.ToString());
            }
            catch (Exception ex)
            {
                return DBNull.Value;
            }
        }

        public static bool NormalizationBoolean(object chuoi)
        {
            try
            {
                if (chuoi == null)
                    return false;
                string[] arrCheck = { "1", "true" };
                if (Array.Exists(arrCheck, element => element == chuoi.ToString().ToLower()))
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static double StringToDouble(object str)
        {
            try
            {
                return Convert.ToDouble(str);
            }
            catch (Exception ex)
            {
                return 0.0;
            }
        }
        public static string GetAllChucVu()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"select ChucVuID, TenChucVu from ChucVu where NgungSD = '0'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string GetAllGioiTinh()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"select N'Nam' union all select N'Nữ' union all select N'Khác'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string GetAllLoaiDoiTuong()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"SELECT [maLoaiDoiTuongpr]
      ,[tenLoaiDoiTuong]   
  FROM [LoaiDoiTuong]").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string GetAllDonVi()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"SELECT DonViCode
      ,TenDonVi,DonViID ,Tinh = ISNULL((select TenTinh from Tinh where TinhID = DonVi.TinhID),N'Khác'),Huyen = ISNULL((select TenHuyen from Huyen where TinhID = DonVi.HuyenID),N'Khác' ) 
  FROM DonVi order by LEN(DonViCode) asc").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string GetDonViTheoID(string ID)
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"SELECT DonViCode
      ,TenDonVi,DonViID ,Tinh = ISNULL((select TenTinh from Tinh where TinhID = DonVi.TinhID),N'Khác'),Huyen = ISNULL((select TenHuyen from Huyen where TinhID = DonVi.HuyenID),N'Khác' ) 
  FROM DonVi where DonViID = '"+DungChung.NormalizationGuid(ID)+"' order by LEN(DonViCode) asc").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }

        public static string chuanHoaNgayThangNam(string chuoiNgayThangNam)
        {
            string chuoiNgayThangNam_moi = chuoiNgayThangNam;
            try
            {
                string[] sa = chuoiNgayThangNam.Split('/');
                return DateTime.Parse(sa[2] + "/" + sa[1] + "/" + sa[0]).ToString("dd/MM/yyyy");
            }
            catch (Exception ex)
            {
                return chuoiNgayThangNam_moi;
            }
        }
        private static string _mChuyenChuoiSangNgay(string ddMMyyyy)
        {
            return ddMMyyyy.Substring(3, 2) + "/" + ddMMyyyy.Substring(0, 2) + "/" + ddMMyyyy.Substring(6, 4);
        }
        public static string taoMaDoiTuong(string maDonVi)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string soPhieu = "";
            string sql = "SELECT MAX(CONVERT(DECIMAL,RIGHT(DoiTuongCode,6))) FROM dbo.DoiTuongTDKT WHERE CaNhanTapThe = N'1' and DoiTuongCode like N'" + maDonVi + "-%' and ISNUMERIC(RIGHT(maDoiTuong,6)) = 1 AND DonViID=N'" + maDonVi + "'";
            decimal _vNewKey = sqlFun.GetOneDecimalField(sql) + 1;
            soPhieu = maDonVi + "-" + _vNewKey.ToString("000000");
            return soPhieu;
        }

    }
}