using ClosedXML.Excel;
using System;
using System.Data;
using System.Linq;
using System.Web;
using TTLD2024.Class;
using TTLD2024.DataConnect;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Globalization;
using System.Configuration;

namespace TTLD2024.Class
{
    public class DungChung
    {

        public static int CapNhatTrangThaiBangDanhGia(string BangDanhGiaID, string TenTrangThai)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@BangDanhGiaID", NormalizationGuid(BangDanhGiaID)),
                    new SqlParameter("@TrangThai",NormalizationString(TenTrangThai)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_TrangThaiBangDanhGia", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "BangDanhGia";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Sua");
                    return duLieu.Tables[0].Rows.Count; //trả về dòng được cập nhật để kiểm tra có cập nhật thành công không
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
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

        public static bool CapNhatKyBaoCao(KyBaoCao kyBaoCao)
        {
            try
            {
                string tungay = kyBaoCao.tuNgay;
                string denngay = kyBaoCao.denNgay;
                string kybaocao = kyBaoCao.kyBaoCao;
                string KeyMaHoa = kyBaoCao.keyMaHoa;
                UsersDataContext db = new UsersDataContext();
                IQueryable<DonVi> dv = from u in db.DonVis where (u.DonViID == NTSSession.GetDonVi().DonViID) select u;
                DonVi _vdonvi = dv.FirstOrDefault();
                //_vdonvi.NgayDauKy = Convert.ToDateTime(DungChung.chuyenChuoiSangNgay_YYYYmmdd(tungay));
                //_vdonvi.NgayCuoiKy = Convert.ToDateTime(DungChung.chuyenChuoiSangNgay_YYYYmmdd(denngay));
                NTSSession.SetDonVi(_vdonvi);
                NTSSession.SetNamSudung(tungay.ToString().Substring(6, 4));
                NTSSession.SetKyBaoCao(kybaocao);
                NTSSession.SetKeyMaHoa(KeyMaHoa);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static bool CapNhatNamBaoCao(string kyBaoCao, string namBaoCao)
        {
            try
            {
                string kybaocao = kyBaoCao;
                UsersDataContext db = new UsersDataContext();
                IQueryable<DonVi> dv = from u in db.DonVis where (u.DonViID == NTSSession.GetDonVi().DonViID) select u;
                DonVi _vdonvi = dv.FirstOrDefault();
                NTSSession.SetDonVi(_vdonvi);
                NTSSession.SetNamSudung(namBaoCao);
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
            ThongTinChungTu = sqlFun.GetData("Select * From LoaiChungTu where MaLoaiChungTu=N'" + kyhieuLoaiPhieu + "'");
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
                    string SQL = "Select Max(REPLACE(REPLACE(" + cotDuLieu + ",N'" + _vKyhieuTruoc + "',''),N'" + _vKyhieuSau + "','')) From " + bangDuLieu + " WHERE LEFT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuTruoc.Length + ")=N'" + _vKyhieuTruoc + "' AND RIGHT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuSau.Length + ")=N'" + _vKyhieuSau + "' " + dieuKienTruyVan;
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
        public static string taoMaTuTangTheoDM_TheoMaDonVi(string kyhieuLoaiPhieu, string bangDuLieu, string cotDuLieu, string dieuKienTruyVan, string ngayLap)
        {
            string ChuoiMau = "";
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            DataTable ThongTinChungTu = new DataTable();
            ThongTinChungTu = sqlFun.GetData("Select * From LoaiChungTu where MaLoaiChungTu=N'" + kyhieuLoaiPhieu + "'");
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
                _vKyhieuTruoc = _vKyhieuTruoc.Replace("MaDonVi", NTSSession.GetDonVi().MaDonVi);
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
                    string SQL = "Select Max(REPLACE(REPLACE(" + cotDuLieu + ",N'" + _vKyhieuTruoc + "',''),N'" + _vKyhieuSau + "','')) From " + bangDuLieu + " WHERE DonViID = '" + DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID) + "' and LEFT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuTruoc.Length + ")=N'" + _vKyhieuTruoc + "' AND RIGHT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuSau.Length + ")=N'" + _vKyhieuSau + "' " + dieuKienTruyVan;
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
        }
        public static string taoMaTuTangTheoDM_TheoDonVi(string kyhieuLoaiPhieu, string bangDuLieu, string cotDuLieu, string dieuKienTruyVan, string ngayLap)
        {
            string ChuoiMau = "";
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            DataTable ThongTinChungTu = new DataTable();
            ThongTinChungTu = sqlFun.GetData("Select * From LoaiChungTu where MaLoaiChungTu=N'" + kyhieuLoaiPhieu + "'");
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
                    string SQL = "Select Max(REPLACE(REPLACE(" + cotDuLieu + ",N'" + _vKyhieuTruoc + "',''),N'" + _vKyhieuSau + "','')) From " + bangDuLieu + " WHERE DonViID = '" + DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID) + "' and LEFT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuTruoc.Length + ")=N'" + _vKyhieuTruoc + "' AND RIGHT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuSau.Length + ")=N'" + _vKyhieuSau + "' " + dieuKienTruyVan;
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
                    string ngay = chuoikiemtra.ToString().Trim().Split('/')[0].ToString();
                    string thang = chuoikiemtra.ToString().Trim().Split('/')[1].ToString();
                    string nam = chuoikiemtra.ToString().Trim().Split('/')[2].ToString();
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
                    if (chuoikiemtra.Length == 4)
                    {
                        if (Convert.ToDecimal(chuoikiemtra.ToString()) > 2090 || Convert.ToDecimal(chuoikiemtra.ToString()) < 1900)
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"select ChucVuID, TenChucVu from DMChucVu where NgungSD = '0'").Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"SELECT [maLoaiDoiTuongpr]
      ,[tenLoaiDoiTuong]
  FROM [DMLoaiDoiTuong]").Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"SELECT DonViCode
      ,TenDonVi,DonViID ,Tinh = ISNULL((select TenTinh from DMTinh where TinhID = DMDonVi.TinhID),N'Khác'),Huyen = ISNULL((select TenHuyen from DMHuyen where TinhID = DMDonVi.HuyenID),N'Khác' )
  FROM DMDonVi where DonViID = '" + DungChung.NormalizationGuid(ID) + "' order by LEN(DonViCode) asc").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public static string taoMaDoiTuong(string DonViCode)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string soPhieu = "";
            string sql = "SELECT MAX(CONVERT(DECIMAL,RIGHT(DoiTuongCode,6))) FROM DoiTuongTDKT WHERE CaNhanTapThe = N'Cá nhân' and DoiTuongCode like N'" + DonViCode + "-%' and ISNUMERIC(RIGHT(DoiTuongCode,6)) = 1 AND DonViID_NoiCongTac = (select DonViID from DonVi where DonViCode = N'" + DonViCode + "')";
            decimal _vNewKey = sqlFun.GetOneDecimalField(sql) + 1;
            soPhieu = DonViCode + "-" + _vNewKey.ToString("000000");
            return soPhieu;
        }
        public static string taoMaDoiTuongTT(string DonViCode)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string soPhieu = "";
            string sql = "SELECT MAX(CONVERT(DECIMAL,RIGHT(DoiTuongCode,6))) FROM DoiTuongTDKT WHERE CaNhanTapThe = N'Tập thể' and DoiTuongCode like N'" + DonViCode + "-%' and ISNUMERIC(RIGHT(DoiTuongCode,6)) = 1 AND DonViID_NoiCongTac = (select DonViID from DonVi where DonViCode = N'" + DonViCode + "')";
            decimal _vNewKey = sqlFun.GetOneDecimalField(sql) + 1;
            soPhieu = DonViCode + "-" + _vNewKey.ToString("000000");
            return soPhieu;
        }
        public static string taoMaDoiTuongCN(string DonViCode)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string soPhieu = "";
            string sql = "SELECT MAX(CONVERT(DECIMAL,RIGHT(DoiTuongCode,6))) FROM DoiTuongTDKT WHERE CaNhanTapThe = N'Cá nhân' and DoiTuongCode like N'" + DonViCode + "-%' and ISNUMERIC(RIGHT(DoiTuongCode,6)) = 1 AND DonViID_NoiCongTac = (select DonViID from DonVi where DonViCode = N'" + DonViCode + "')";
            decimal _vNewKey = sqlFun.GetOneDecimalField(sql) + 1;
            soPhieu = DonViCode + "-" + _vNewKey.ToString("000000");
            return soPhieu;
        }
        public static DataTable GetAllDonVi()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi",null).Tables[0];
                var customerData = duLieu.AsEnumerable();

                return duLieu;
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        public static DataTable GetAllDonViTheoDonViCode(string HienTatCa)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@HienTatCa",NormalizationString(HienTatCa)),
                    new SqlParameter("@DonViID",NTSSession.GetDonVi().MaDonVi),
                    new SqlParameter("@UserGroupCode",NTSSession.GetUser().UserGroupCode.ToUpper()),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonViTheoDonViCode", para).Tables[0];
                var customerData = duLieu.AsEnumerable();

                return duLieu;
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        public static DataTable GetAllDonVi_DoiTuongTDKT()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(NTSSession.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonViDoiTuongTDKT", NTSSession.GetDonVi().MaDonVi).Tables[0];
                var customerData = duLieu.AsEnumerable();

                return duLieu;
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        public static bool kiemTraDieuKienKhongXetTDKT(string DoiTuongID, string DanhHieuThiDuaCode)
        {
            DataTable DoiTuongKhongXetTDKT = new DataTable();
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string sql = "";
            sql = "SELECT DoiTuongKhongXetTDKTID,NamXetDuyet FROM DoiTuongKhongXetTDKT WHERE DoiTuongID =N'" + DoiTuongID + "' and NamXetDuyet = N'" + NTSSession.GetNamSudung() + "'";
            try
            {
                DoiTuongKhongXetTDKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0];
            }
            catch
            {

            }
            if (DoiTuongKhongXetTDKT.Rows.Count > 0)
            {
                for (int i = 0; i < DoiTuongKhongXetTDKT.Rows.Count; i++)
                {
                    DataTable dtDanhHieuThiDuaID = new DataTable();
                    dtDanhHieuThiDuaID = sqlFun.GetData("SELECT DanhHieuThiDuaCode = (select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = (select DanhHieuThiDuaID FROM TruongHopKhongXetTDKT WHERE TruongHopKhongXetTDKTID = dt.TruongHopKhongXetTDKTID)),soNam = (select soNam FROM TruongHopKhongXetTDKT WHERE TruongHopKhongXetTDKTID = dt.TruongHopKhongXetTDKTID) FROM DoiTuongKhongXetTDKTCT dt WHERE DoiTuongKhongXetTDKTID =N'" + DoiTuongKhongXetTDKT.Rows[i]["DoiTuongKhongXetTDKTID"] + "'");
                    for (int j = 0; j < dtDanhHieuThiDuaID.Rows.Count; j++)
                    {
                        if (dtDanhHieuThiDuaID.Rows[j]["DanhHieuThiDuaCode"].ToString() == DanhHieuThiDuaCode.ToString())
                        {
                            if (Convert.ToDecimal(NTSSession.GetNamSudung()) >= Convert.ToDecimal(DoiTuongKhongXetTDKT.Rows[i]["NamXetDuyet"].ToString()) && Convert.ToDecimal(NTSSession.GetNamSudung()) <= Convert.ToDecimal(DoiTuongKhongXetTDKT.Rows[i]["NamXetDuyet"].ToString()) + Convert.ToDecimal(dtDanhHieuThiDuaID.Rows[i]["SoNam"].ToString()))
                            { return true; }
                        }
                    }
                }
                return false;
            }
            else
            {
                return false;
            }
        }
        public static decimal kiemTraSKKN(string DanhHieuThiDuaCode, string DoiTuongID, string NgayDauKystr, string NgayCuoiKystr, bool dangKyThiDua)
        {

            //if (DanhHieuThiDuaID == "166166DB-6654-4471-BD39-85CC73012A60")
            //{
            //}
            DateTime NgayDauKy = DateTime.Parse(NgayDauKystr);
            DateTime NgayCuoiKy = DateTime.Parse(NgayCuoiKystr);
            decimal SangKienKN = 0, SoNamXet = 0;
            decimal namBatDau = NgayDauKy.Year, namKetThuc = NgayCuoiKy.Year, soLuongSKKN = 0, namCongNhan = 0;
            string sql = "", danhHieuCaoNhat = "";
            DataTable dt = new DataTable();
            //kiểm tra nếu những danh hiệu có danh hiệu con là  166166DB-6654-4471-BD39-85CC73012A60	Chiến sĩ thi đua cơ sở,

            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

            try
            {
                try
                {
                    danhHieuCaoNhat = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT DanhHieuThiDuaID FROM CauHinhTDKTCNCT WHERE CauHinhTDKTCNID IN 
                                                            (SELECT CauHinhTDKTCNID FROM dbo.CauHinhTDKTCN WHERE DanhHieuThiDuaID = (select DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = '" + DanhHieuThiDuaCode +
                                                                @"')) AND CauHinhTDKTCNCTID=(SELECT MAX(CauHinhTDKTCNCTID) FROM CauHinhTDKTCNCT WHERE CauHinhTDKTCNID IN 
                                                            (SELECT CauHinhTDKTCNID FROM dbo.CauHinhTDKTCN WHERE DanhHieuThiDuaID=(select DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = '" + DanhHieuThiDuaCode +
                                                                @"')))").Tables[0].Rows[0][0].ToString();
                }
                catch
                {
                    danhHieuCaoNhat = "";
                }
                try
                {
                    namCongNhan = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "SELECT YEAR(NgayQuyetDinh) FROM dbo.ThiDuaKhenThuong WHERE	DanhHieuThiDuaID=N'" + danhHieuCaoNhat + "' AND DoiTuongID='" + DoiTuongID + "'").Tables[0].Rows[0][0].ToString());
                }
                catch
                {

                }
                try
                {
                    dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "SELECT * FROM CauHinhTDKTCN  WHERE DanhHieuThiDuaID = (select DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = '" + DanhHieuThiDuaCode + "')").Tables[0];
                }
                catch
                {

                }
                try
                {
                    SoNamXet = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT convert(decimal(18,0),max(SoNamXet)) FROM dbo.CauHinhTDKTCNCT WHERE CauHinhTDKTCNID IN 
                                                            (SELECT CauHinhTDKTCNID FROM dbo.CauHinhTDKTCN WHERE DanhHieuThiDuaID=(select DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = '" + DanhHieuThiDuaCode + "'))").Tables[0].Rows[0][0].ToString());
                }
                catch
                {

                }
                if (dt.Rows.Count > 0)//nếu có trong bảng cấu hình
                {
                    if (dangKyThiDua == true)
                    {
                        if (dt.Rows[0]["DKTD"].ToString() == "True")
                        {
                            if (dt.Rows[0]["SKKN"].ToString() == "True")
                            {

                                if (Convert.ToDecimal(dt.Rows[0]["SKKNCS"].ToString()) > 1)//kiểm tra SKKN cấp CS
                                {

                                    string sql2 = @"SELECT convert(decimal(18,0),count(SangKienKNID)) FROM SangKienKN WHERE KetQua=N'Đ' AND DoiTuongID='" + DoiTuongID + "' AND (NgayQuyetDinh BETWEEN '" + NgayDauKy.Month + "/" + NgayDauKy.Day + "/" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + NgayCuoiKy.Month + "/" + NgayCuoiKy.Day + "/" + namKetThuc + "') AND CapCS='1'";
                                    decimal soLuongcs = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql2).Tables[0].Rows[0][0].ToString());
                                    decimal soLuongcs_hiennhienduoc = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select convert(decimal(18,0),count(ThiDuaKhenThuongID)) from ThiDuaKhenThuong where DanhHieuThiDuaID in (select DanhHieuThiDuaID from CauHinhTDKTCN where SKKNCS ='1') and (NamXetKhenThuong BETWEEN '" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + namKetThuc + "') and DoiTuongID =N'" + DoiTuongID + "' and SoQuyetDinh is not null").Tables[0].Rows[0][0].ToString());
                                    soLuongcs = soLuongcs + soLuongcs_hiennhienduoc;

                                    if (soLuongcs >= Convert.ToDecimal(dt.Rows[0]["SKKNCS"].ToString()) - 1)
                                    {
                                        SangKienKN = 1;
                                        return SangKienKN;
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                                else if (Convert.ToDecimal(dt.Rows[0]["SKKNT"].ToString()) > 1)//kiểm tra SKKN cấp CS
                                {

                                    decimal soLuongtinh = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT convert(decimal(18,0),count(SangKienKNID)) FROM SangKienKN WHERE KetQuaTinh=N'Đ' AND DoiTuongID='" + DoiTuongID + "' AND (NgayQuyetDinhTinh BETWEEN '" + NgayDauKy.Month + "/" + NgayDauKy.Day + "/" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + NgayCuoiKy.Month + "/" + NgayCuoiKy.Day + "/" + namKetThuc + "') AND CapTinh='1'").Tables[0].Rows[0][0].ToString());
                                    decimal soLuongtinh_hiennhienduoc = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select convert(decimal(18,0),count(ThiDuaKhenThuongID)) from ThiDuaKhenThuong where DanhHieuThiDuaID in (select DanhHieuThiDuaID from CauHinhTDKTCN where SKKNT ='1') and (NamXetKhenThuong BETWEEN '" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + namKetThuc + "') and DoiTuongID =N'" + DoiTuongID + "' and SoQuyetDinh is not null").Tables[0].Rows[0][0].ToString());
                                    soLuongtinh = soLuongtinh + soLuongtinh_hiennhienduoc;
                                    if (soLuongtinh >= Convert.ToDecimal(dt.Rows[0]["SKKNT"].ToString()) - 1)
                                    {
                                        SangKienKN = 1;
                                        return SangKienKN;
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                                else if (Convert.ToDecimal(dt.Rows[0]["SKKNTQ"].ToString()) > 1)//kiểm tra SKKN cấp CS
                                {
                                    decimal soLuongtq = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT convert(decimal(18,0),count(SangKienKNID)) FROM SangKienKN WHERE KetQuaTQ=N'Đ' AND DoiTuongID='" + DoiTuongID + "' AND (NgayQuyetDinhTQ BETWEEN '" + NgayDauKy.Month + "/" + NgayDauKy.Day + "/" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + NgayCuoiKy.Month + "/" + NgayCuoiKy.Day + "/" + namKetThuc + "') AND CapTQ='1'").Tables[0].Rows[0][0].ToString());
                                    decimal soLuongtq_hiennhienduoc = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select convert(decimal(18,0),count(ThiDuaKhenThuongID)) from ThiDuaKhenThuong where DanhHieuThiDuaID in (select DanhHieuThiDuaID from CauHinhTDKTCN where SKKNTQ ='1') and (NamXetKhenThuong BETWEEN '" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + namKetThuc + "') and DoiTuongID =N'" + DoiTuongID + "' and SoQuyetDinh is not null").Tables[0].Rows[0][0].ToString());
                                    soLuongtq = soLuongtq + soLuongtq_hiennhienduoc;
                                    if (soLuongtq >= Convert.ToDecimal(dt.Rows[0]["SKKNTQ"].ToString()) - 1)
                                    {
                                        SangKienKN = 1;
                                        return SangKienKN;
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                                else//neu 1 SKKN
                                {
                                    SangKienKN = 1;
                                }
                            }
                            else
                            {
                                SangKienKN = 1;
                            }
                        }
                        else
                        {
                            SangKienKN = 0;
                        }
                    }
                    else //kiểm tra SKKN khi nhập khen thưởng
                    {

                        if (dt.Rows[0]["DKTD"].ToString() == "True")
                        {
                            if (dt.Rows[0]["SKKN"].ToString() == "True")
                            {
                                if (Convert.ToDecimal(dt.Rows[0]["SKKNCS"].ToString()) >= 1)//kiểm tra SKKN cấp CS
                                {

                                    decimal soLuongcs = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT convert(decimal(18,0),count(SangKienKNID)) FROM SangKienKN WHERE KetQua=N'Đ' AND DoiTuongID='" + DoiTuongID + "' AND (NgayQuyetDinh BETWEEN '" + NgayDauKy.Month + "/" + NgayDauKy.Day + "/" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + NgayCuoiKy.Month + "/" + NgayCuoiKy.Day + "/" + namKetThuc + "') AND CapCS='1'").Tables[0].Rows[0][0].ToString());
                                    decimal soLuongcs_hiennhienduoc = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select convert(decimal(18,0),count(ThiDuaKhenThuongID)) from ThiDuaKhenThuong where DanhHieuThiDuaID in (select DanhHieuThiDuaID from CauHinhTDKTCN where SKKNCS ='1') and (NamXetKhenThuong BETWEEN '" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + namKetThuc + "') and DoiTuongID =N'" + DoiTuongID + "' and SoQuyetDinh is not null").Tables[0].Rows[0][0].ToString());
                                    soLuongcs = soLuongcs + soLuongcs_hiennhienduoc;
                                    if (soLuongcs >= Convert.ToDecimal(dt.Rows[0]["SKKNCS"].ToString()))
                                    {
                                        SangKienKN = 1;
                                        return SangKienKN;
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                                else if (Convert.ToDecimal(dt.Rows[0]["SKKNT"].ToString()) >= 1)//kiểm tra SKKN cấp CS
                                {

                                    decimal soLuongtinh = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT convert(decimal(18,0),count(SangKienKNID)) FROM SangKienKN WHERE KetQuaTinh=N'Đ' AND DoiTuongID='" + DoiTuongID + "' AND (NgayQuyetDinhTinh BETWEEN '" + NgayDauKy.Month + "/" + NgayDauKy.Day + "/" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + NgayCuoiKy.Month + "/" + NgayCuoiKy.Day + "/" + namKetThuc + "') AND CapTinh='1'").Tables[0].Rows[0][0].ToString());
                                    decimal soLuongtinh_hiennhienduoc = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select convert(decimal(18,0),count(ThiDuaKhenThuongID)) from ThiDuaKhenThuong where DanhHieuThiDuaID in (select DanhHieuThiDuaID from CauHinhTDKTCN where SKKNT ='1') and (NamXetKhenThuong BETWEEN '" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + namKetThuc + "') and DoiTuongID =N'" + DoiTuongID + "' and SoQuyetDinh is not null").Tables[0].Rows[0][0].ToString());
                                    soLuongtinh = soLuongtinh + soLuongtinh_hiennhienduoc;
                                    if (soLuongtinh >= Convert.ToDecimal(dt.Rows[0]["SKKNT"].ToString()))
                                    {
                                        SangKienKN = 1;
                                        return SangKienKN;
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                                else if (Convert.ToDecimal(dt.Rows[0]["SKKNTQ"].ToString()) >= 1)//kiểm tra SKKN cấp CS
                                {

                                    decimal soLuongtq = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT convert(decimal(18,0),count(SangKienKNID)) FROM SangKienKN WHERE KetQuaTQ=N'Đ' AND DoiTuongID='" + DoiTuongID + "' AND (NgayQuyetDinhTQ BETWEEN '" + NgayDauKy.Month + "/" + NgayDauKy.Day + "/" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + NgayCuoiKy.Month + "/" + NgayCuoiKy.Day + "/" + namKetThuc + "') AND CapTQ='1'").Tables[0].Rows[0][0].ToString());
                                    decimal soLuongtq_hiennhienduoc = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"select convert(decimal(18,0),count(ThiDuaKhenThuongID)) from ThiDuaKhenThuong where DanhHieuThiDuaID in (select DanhHieuThiDuaID from CauHinhTDKTCN where SKKNTQ ='1') and (NamXetKhenThuong BETWEEN '" + (namBatDau - (Convert.ToDecimal(SoNamXet) - 1)) + "' AND '" + namKetThuc + "') and DoiTuongID =N'" + DoiTuongID + "' and SoQuyetDinh is not null").Tables[0].Rows[0][0].ToString());
                                    soLuongtq = soLuongtq + soLuongtq_hiennhienduoc;
                                    if (soLuongtq >= Convert.ToDecimal(dt.Rows[0]["SKKNTQ"].ToString()))
                                    {
                                        SangKienKN = 1;
                                        return SangKienKN;
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                                else//neu 1 SKKN
                                {
                                    SangKienKN = 1;
                                }
                            }
                            else
                            {
                                SangKienKN = 1;
                            }
                        }
                        else
                        {
                            SangKienKN = 1;
                        }
                    }
                }
                else //nếu không cấu hình thì trả kết quả không đủ điều kiện
                {
                    SangKienKN = 0;
                }

                return SangKienKN;
            }
            catch (Exception ex)
            {
                return SangKienKN;
            }
        }
        public static decimal kiemTraDKBatBuoc(string DanhHieuThiDuaCode, string DoiTuongID, string NgayDauKystr, string NgayCuoiKystr, bool dangKyThiDua)
        {

            DateTime NgayDauKy = DateTime.Parse(NgayDauKystr);
            DateTime NgayCuoiKy = DateTime.Parse(NgayCuoiKystr);
            decimal SangKienKN = 0;
            decimal SangKienKN_Chinh = 0;
            decimal namBatDau = 0, namKetThuc = 0, SoNamDat = 0;
            string sql = "";
            string[] arr = null;
            DataTable dt = new DataTable();
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            try
            {
                dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "SELECT * FROM dbo.CauHinhTDKTCNCT WHERE CauHinhTDKTCNID IN (SELECT CauHinhTDKTCNID FROM dbo.CauHinhTDKTCN WHERE DanhHieuThiDuaID = (select DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = N'" + DanhHieuThiDuaCode + "')) ORDER BY  DanhHieuThiDuaID").Tables[0];
                if (dt.Rows.Count > 0)//nếu có trong bảng cấu hình
                {
                    if (dangKyThiDua == true)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            SoNamDat = 0;
                            namBatDau = NgayCuoiKy.Year - (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) - 1);
                            namKetThuc = NgayCuoiKy.Year;
                            sql = @"SELECT * FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = (select DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = N'" + DanhHieuThiDuaCode + "') AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + @"')
                            and DanhHieuThiDuaID not in (select DanhHieuThiDuaID from CauHinhTDKTCN where NhapHTKT = '1')";
                            if (sqlFun.CheckHasRecord(sql))//nếu trong giai đoạn xét đã có danh hiệu rồi thì không xét nữa
                            {
                                SangKienKN = 0;
                                return SangKienKN;
                            }
                            else
                            {
                                if (dt.Rows[i]["DanhHieuThiDuaID"].ToString().Contains(";") == true)
                                {
                                    arr = dt.Rows[i]["DanhHieuThiDuaID"].ToString().Split(';');
                                    for (int j = 0; j < arr.Length; j++)
                                    {
                                        SoNamDat = 0;
                                        if (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) == 1)//kiểm tra số năm đạt
                                        {
                                            SangKienKN = 1;
                                            SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                            break;
                                            //return SangKienKN;
                                        }
                                        else
                                        {
                                            //kiểm tra số năm đạt
                                            for (int k = 0; k < Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)//for (int k = 0; k <= Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)
                                            {
                                                if (k == 0)//năm hiện hành thì kiểm tra thông tin đăng ký
                                                {
                                                    if (Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()) > 1)
                                                    {
                                                        SoNamDat += 1;
                                                        SangKienKN = 1;
                                                        continue;
                                                    }
                                                }
                                                else
                                                {
                                                    namBatDau = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString())) - 1);
                                                    namKetThuc = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString())) - 1);
                                                    if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "003")// nếu đc cstđcs thì được htsxnv
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode  in ('103','101','10201','10202','10203'))) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "004")// nếu được htsxnv thì được htnv
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('003','103','101','10201','10202','10203'))) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    decimal SoNamDat_dem = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0].Rows[0][0].ToString());
                                                    if (SoNamDat_dem > 0)
                                                    {
                                                        SoNamDat = SoNamDat + SoNamDat_dem;
                                                        if (SoNamDat >= Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))//nếu số lượng SKKN = với cấu hình//ban đầu là bằng
                                                        {
                                                            if (i == dt.Rows.Count - 1)
                                                            {
                                                                SangKienKN = 1;
                                                                SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                                                break;
                                                                //return SangKienKN;
                                                            }
                                                            else
                                                            {
                                                                SangKienKN = 1;
                                                                break;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            SangKienKN = 0;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if (Convert.ToBoolean(dt.Rows[i]["LienTuc"].ToString()) == true)
                                                        {
                                                            SangKienKN = 0;
                                                            break;
                                                        }
                                                        else
                                                        {
                                                            SangKienKN = 0;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else //nếu không chứa điều kiện hoac thì kiểm tra từng dieu kien riêng lẻ
                                {
                                    //kiểm tra số năm đạt
                                    for (int k = 0; k <= Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)  //for (int k = 0; k <= Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)
                                    {
                                        if (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) == 1)
                                        {
                                            SangKienKN = 1;
                                            SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                            break;
                                        }
                                        else
                                        {
                                            if (k == 0)//năm hiện hành thì kiểm tra thông tin đăng ký
                                            {
                                                if (Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()) > 1)
                                                {
                                                    SoNamDat += 1;
                                                    SangKienKN = 1;
                                                    continue;
                                                }
                                            }
                                            else
                                            {
                                                //namBatDau = NgayDauKy.Year - k;
                                                //namKetThuc = NgayCuoiKy.Year - k;

                                                namBatDau = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString())) - 1);
                                                namKetThuc = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString())) - 1);
                                                if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "003")// nếu đc cstđcs thì được htsxnv
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('103','101','10201','10202','10203'))) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "004")// nếu được htsxnv thì được htnv
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('003','103','101','10201','10202','10203'))) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"'  AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                decimal SoNamDat_dem = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0].Rows[0][0].ToString());
                                                if (SoNamDat_dem > 0)
                                                {
                                                    SoNamDat = SoNamDat + SoNamDat_dem;
                                                    if (SoNamDat >= Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))//nếu số lượng SKKN = với cấu hình // ban đầu là bằng
                                                    {
                                                        if (i == dt.Rows.Count - 1)
                                                        {
                                                            SangKienKN = 1;
                                                            SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                                            break;
                                                            //return SangKienKN;
                                                        }
                                                        else
                                                        {
                                                            SangKienKN = 1;
                                                            break;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        SangKienKN = 0;
                                                    }
                                                }
                                                else
                                                {
                                                    if (Convert.ToBoolean(dt.Rows[i]["LienTuc"].ToString()) == true)
                                                    {
                                                        SangKienKN = 0;
                                                        return SangKienKN;
                                                    }
                                                    else
                                                    {
                                                        SangKienKN = 0;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (SangKienKN_Chinh >= dt.Rows.Count)
                            return 1;
                        else
                            return 0;
                    }
                    else //điều kiện kiểm tra nhập kết quả khen thưởng
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            SoNamDat = 0;
                            namBatDau = NgayCuoiKy.Year - (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) - 1);
                            namKetThuc = NgayCuoiKy.Year;
                            sql = @"SELECT * FROM ThiDuaKhenThuong WHERE ISNULL(NgayQuyetDinh,'') <> '' and DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = (select top 1 DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode = '" + DanhHieuThiDuaCode + "') AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + @"')
                            and DanhHieuThiDuaID not in (select DanhHieuThiDuaID from CauHinhTDKTCN where NhapHTKT = '1')";
                            if (sqlFun.CheckHasRecord(sql))//nếu trong giai đoạn xét đã có danh hiệu rồi thì không xét nữa
                            {
                                SangKienKN = 0;
                                return SangKienKN;
                            }
                            else
                            {
                                if (dt.Rows[i]["DanhHieuThiDuaID"].ToString().Contains(";") == true)
                                {
                                    arr = dt.Rows[i]["DanhHieuThiDuaID"].ToString().Split(';');
                                    SoNamDat = 0;
                                    for (int j = 0; j < arr.Length; j++)
                                    {
                                        if (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) > 0)//kiểm tra số năm đạt
                                        {
                                            if (Convert.ToBoolean(dt.Rows[i]["LienTuc"].ToString()) == false)
                                            {
                                                //kiểm tra số năm đạt
                                                for (int k = 0; k < Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)
                                                {
                                                    namBatDau = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))) + 1;
                                                    namKetThuc = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))) + 1;
                                                    if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "003")// nếu đc cstđcs thì được htsxnv
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "004")// nếu được htsxnv thì được htnv
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('003','103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "103")// nếu được cstđ ccấp tỉnh thì được cstđ cs
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode LIKE N'102%')) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    decimal SoNamDat_dem = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0].Rows[0][0].ToString());
                                                    if (SoNamDat_dem > 0)
                                                    {
                                                        SoNamDat = SoNamDat + SoNamDat_dem;
                                                        if (SoNamDat >= Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))//nếu số lượng SKKN = với cấu hình// ban đầu là bằng
                                                        {
                                                            SangKienKN = 1;
                                                            SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                                            break;
                                                            //return SangKienKN;
                                                        }
                                                        else
                                                        {
                                                            SangKienKN = 0;
                                                        }
                                                    }
                                                    else
                                                    {
                                                            SangKienKN = 0;
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                for (int k = 0; k < Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)
                                                {
                                                    namBatDau = NgayCuoiKy.Year - k;
                                                    namKetThuc = NgayCuoiKy.Year - k;
                                                    if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "003")// nếu đc cstđcs thì được htsxnv
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "004")// nếu được htsxnv thì được htnv
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('003','103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + arr[j].ToString() + "'").Tables[0].Rows[0][0].ToString() == "103")// nếu được cstđ ccấp tỉnh thì được cstđ cs
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode LIKE N'102%')) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    else
                                                    {
                                                        sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = N'" + arr[j].ToString() + @"' AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                    }
                                                    decimal SoNamDat_dem = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0].Rows[0][0].ToString());
                                                    if (SoNamDat_dem > 0)
                                                    {
                                                        SoNamDat = SoNamDat + SoNamDat_dem;
                                                        if (SoNamDat >= Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))//nếu số lượng SKKN = với cấu hình// ban đầu là bằng
                                                        {
                                                            SangKienKN = 1;
                                                            SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                                            break;
                                                            //return SangKienKN;
                                                        }
                                                        else
                                                        {
                                                            SangKienKN = 0;
                                                        }
                                                    }
                                                    else
                                                    {
                                                            SangKienKN = 0;
                                                    }
                                                }
                                            }    
                                        }
                                        else
                                        {
                                            SangKienKN = 0;
                                        }
                                    }
                                }
                                else //nếu không chứa điều kiện hoac thì kiểm tra từng dieu kien riêng lẻ
                                {
                                    if (Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()) > 0)//kiểm tra số năm đạt
                                    {
                                        if (Convert.ToBoolean(dt.Rows[i]["LienTuc"].ToString()) == false)
                                        {
                                            //kiểm tra số năm đạt
                                            for (int k = 0; k < Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)
                                            {
                                                namBatDau = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))) + 1;
                                                namKetThuc = NgayCuoiKy.Year - (k + (Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()) / Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))) + 1;
                                                if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "003")// nếu đc cstđcs thì được htsxnv
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "004")// nếu được htsxnv thì được htnv
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('003','103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "103")// nếu được cstđ ccấp tỉnh thì được cstđ cs
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode LIKE N'102%')) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"'  AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                decimal SoNamDat_dem = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0].Rows[0][0].ToString());
                                                if (SoNamDat_dem > 0)
                                                {
                                                    SoNamDat = SoNamDat + SoNamDat_dem;
                                                    if (SoNamDat >= Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))//nếu số lượng SKKN = với cấu hình// ban đầu là bằng
                                                    {

                                                        SangKienKN = 1;
                                                        SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                                        break;
                                                    }
                                                    else
                                                    {
                                                        SangKienKN = 0;
                                                    }
                                                }
                                                else
                                                {
                                                        SangKienKN = 0;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            for (int k = 0; k < Convert.ToDecimal(dt.Rows[i]["SoNamXet"].ToString()); k++)
                                            {
                                                namBatDau = NgayCuoiKy.Year - k;
                                                namKetThuc = NgayCuoiKy.Year - k;
                                                if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "003")// nếu đc cstđcs thì được htsxnv
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "004")// nếu được htsxnv thì được htnv
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode in ('003','103','101','10201','10202','10203')) ) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else if (SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DanhHieuThiDuaCode from DanhHieuThiDua where DanhHieuThiDuaID = '" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + "'").Tables[0].Rows[0][0].ToString() == "103")// nếu được cstđ ccấp tỉnh thì được cstđ cs
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and (DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"' or DanhHieuThiDuaID in (select  DanhHieuThiDuaID from DanhHieuThiDua where DanhHieuThiDuaCode LIKE N'102%')) AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                else
                                                {
                                                    sql = @"SELECT convert(decimal(18,0),count(DoiTuongID)) FROM ThiDuaKhenThuong WHERE (ISNULL(NgayQuyetDinh,'') <> '' or TinhTrang =N'Có quyết định') and DoiTuongID = N'" + DoiTuongID + @"' and DanhHieuThiDuaID = N'" + dt.Rows[i]["DanhHieuThiDuaID"].ToString() + @"'  AND (NamXetKhenThuong BETWEEN '" + namBatDau + "' AND '" + namKetThuc + "') ";
                                                }
                                                decimal SoNamDat_dem = decimal.Parse(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0].Rows[0][0].ToString());
                                                if (SoNamDat_dem > 0)
                                                {
                                                    SoNamDat = SoNamDat + SoNamDat_dem;
                                                    if (SoNamDat >= Convert.ToDecimal(dt.Rows[i]["SoNamDat"].ToString()))//nếu số lượng SKKN = với cấu hình// ban đầu là bằng
                                                    {

                                                        SangKienKN = 1;
                                                        SangKienKN_Chinh = SangKienKN_Chinh + 1;
                                                        break;
                                                    }
                                                    else
                                                    {
                                                        SangKienKN = 0;
                                                    }
                                                }
                                                else
                                                {
                                                        SangKienKN = 0;
                                                }
                                            }
                                        }    
                                    }
                                    else
                                    {
                                        SangKienKN = 0;
                                    }
                                }
                            }
                        }
                        if (SangKienKN_Chinh >= dt.Rows.Count)
                            return 1;
                        else
                            return 0;
                    }
                }
                else //nếu không cấu hình thì trả kết quả đủ điều kiện
                {
                    if (dangKyThiDua == true)
                    {
                        return 1;
                    }
                    else if (kiemTraSKKN(DanhHieuThiDuaCode, DoiTuongID, NgayDauKystr, NgayCuoiKystr, dangKyThiDua) == 1)
                        SangKienKN = 1;
                    else
                        SangKienKN = 0;
                }
                return SangKienKN;
            }
            catch
            {
                return SangKienKN;
            }
        }
        public static decimal kiemTraDKPhu(string DanhHieuThiDuaCode, string DoiTuongID, DateTime NgayDauKy, DateTime NgayCuoiKy, bool dangKyThiDua)
        {
            decimal SangKienKN = 0;
            decimal namBatDau = 0, namKetThuc = 0, SoNamDat = 0;
            string sql = "";
            string[] arr = null;
            DataTable dt = new DataTable();
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            try
            {
                SangKienKN = 0;
                return SangKienKN;
            }
            catch
            {
                return SangKienKN;
            }
        }
        public static DataTable getNienDo()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"select top 1 NienDoBatDau, NienDoKetThuc from CauHinhHeThong");

                int NamBD = int.Parse(ds.Tables[0].Rows[0]["NienDoBatDau"].ToString());
                int NamKT = int.Parse(ds.Tables[0].Rows[0]["NienDoKetThuc"].ToString());

                DataTable table = new DataTable();
                table.Columns.Add("NamLamViec");
                for (int i = NamBD; i <= NamKT; i++)
                {
                    table.Rows.Add(i.ToString());
                }
                execPermiss = new ExecPermiss();
                ds = new DataSet();
                ds.Tables.Add(table);
                return ds.Tables[0];
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        public static string KiemTraDangKyDanhHieuDauNam()
        {
            try
            {
                return JSonHelper.ToJson(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select DangKyDanhHieuDauNam from DonVi where DonViID = '" + NTSSession.GetDonVi().DonViID + "'").Tables[0].Rows[0][0].ToString());
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("False");
            }

        }




        public string KiemTraXoaDT(string TenCot, string ID, string TenBangHienTai, string[] CacBangKhongXet)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string strCacBangKhongXet = "";
                if (CacBangKhongXet != null)
                {
                    strCacBangKhongXet = string.Join(";", CacBangKhongXet);
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@TenCot", TenCot),
                    new SqlParameter("@TenBangHienTai", TenBangHienTai),
                    new SqlParameter("@CacBangKhongXet", strCacBangKhongXet)
                };

                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa", sqlParams).Tables[0];
                string strSQL;
                string eRR = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

                if (tab.Rows.Count > 0)
                {
                    try
                    {
                        for (int i = 0; i < tab.Rows.Count; i++)
                        {
                            SqlParameter[] sqlParams1 = {
                                new SqlParameter("@TenCot", TenCot),
                                new SqlParameter("@TenBang", tab.Rows[i][0].ToString()),
                                new SqlParameter("@ID", DungChung.NormalizationGuid(ID))
                            };
                            var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa_BangSD", sqlParams1);
                            if (duLieu != null)
                                eRR += "<b>- " + tab.Rows[i][1] + "</b><br/>";
                        }
                    }
                    catch (Exception ex)
                    {
                        ep.Msg = ex.Message;
                        ep.Result = eRR;
                        return JSonHelper.ToJson(ep);
                    }
                }
                ep.Result = eRR;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }


        public static bool KiemTraTonTai(string ma, string tenCot, string tenBang)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("GiaTri", ma)
                };
                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTai", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool KiemTraTonTaiSua(string ma, string tenCot, string tenBang, string tenCotxet, string maID)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("ma", ma),
                    new SqlParameter("TenCotXet", tenCotxet),
                    new SqlParameter("maID", maID)
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSua", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public void XoaMacDinhSD(string ID, string stringCotID, string strBang)
        {
            SqlParameter[] para =
            {
                new SqlParameter("TenBang", strBang),
                new SqlParameter("TenCot", stringCotID),
                new SqlParameter("ID", DungChung.NormalizationGuid(ID))
            };
            SqlHelper.ExecuteNonQuery(NTSSession.GetConnectionString1(), "Proc_XoaMacDinhSD", para);
        }


        public static string checkString(string data)
        {
            data = data.Replace("select", "");
            data = data.Replace("delete", "");
            data = data.Replace("drop", "");
            data = data.Replace("truncate", "");
            return data;
        }
        public static string LayDuongDanDinhKem(string bang, string cotDinhKem, string cotID, string ID)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string pathOld = "";
            try
            {
                bang = checkString(bang);
                cotDinhKem = checkString(cotDinhKem);
                cotID = checkString(cotID);
                //lấy đường dẫn cũ để xóa file
                DataTable data = sqlFun.GetData(@"SELECT " + cotDinhKem + " FROM dbo." + bang + " WHERE " + cotID + " = '" + DungChung.NormalizationGuid(ID) + "'");
                if (data.Rows.Count>0)
                {
                    for (int i = 0; i < data.Rows.Count; i++)
                    {
                        pathOld += data.Rows[i][cotDinhKem].ToString();
                    }
                }
                return pathOld;
            }
            catch (Exception ex)
            {
                return "";
            }
        }
        public static void XoaDinhKemTrongFolder(string path)
        {
            try
            {
                if (path.Trim() != "")
                {
                    string[] arrDuongDan = path.Split('*');
                    foreach (string item in arrDuongDan)
                    {
                        if (System.IO.File.Exists(HttpContext.Current.Server.MapPath(item)))
                        {
                            System.IO.File.Delete(HttpContext.Current.Server.MapPath(item));
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static string Decrypt(string ID)
        {
            try
            {
                string textToDecrypt = ID;
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] privatekeyByte = { };
                privatekeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = new byte[textToDecrypt.Replace(" ", "+").Length];
                inputbyteArray = Convert.FromBase64String(textToDecrypt.Replace(" ", "+"));
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateDecryptor(publickeybyte, privatekeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    Encoding encoding = Encoding.UTF8;
                    ToReturn = encoding.GetString(ms.ToArray());
                }

                return ToReturn;
            }
            catch (Exception ae)
            {
                throw new Exception(ae.Message, ae.InnerException);
            }
        }

        public static string Encrypt(string ID)
        {
            try
            {
                string textToEncrypt = ID;
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] secretkeyByte = { };
                secretkeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = System.Text.Encoding.UTF8.GetBytes(textToEncrypt);
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateEncryptor(publickeybyte, secretkeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    ToReturn = Convert.ToBase64String(ms.ToArray());
                }
                return JSonHelper.ToJson(ToReturn);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }


        public static string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC).Replace(" ","");
        }

        public static string GetConnectionStrings()
        {
            try
            {
                return ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString.ToString();
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}