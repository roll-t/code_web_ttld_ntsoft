using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Web;
using ClosedXML.Excel;
using TTLD2024.Class;

namespace TTLD2024
{

    public class CauHinhHeThong
    {
        private NumberFormatInfo _nfi = new NumberFormatInfo { NumberDecimalSeparator = ",", NumberGroupSeparator = "." };
        public NumberFormatInfo nfi
        {
            get { return _nfi; }
            set { _nfi = value; }
        }
        private int sochusothapphan = 2;
        public int SoChuSoThapPhan
        {
            get { return sochusothapphan; }
            set { sochusothapphan = value; }
        }
        private string  mahaomonpr_sd = "01";
        public string maHaoMonpr_sd
        {
            get { return mahaomonpr_sd; }
            set { mahaomonpr_sd = value; }
        }
        private string makykhauhaopr_sd = "Thang";
        public string maKyKhauHaopr_sd
        {
            get { return makykhauhaopr_sd; }
            set { makykhauhaopr_sd = value; }
        }
        private DateTime ngaybatdautinhhaomon = DateTime.Now;
        public DateTime NgayBatDauTinhHM
        {
            get { return ngaybatdautinhhaomon; }
            set { ngaybatdautinhhaomon = value; }
        }
        public CauHinhHeThong()
        {
            try
            {
                DataTable tab = new DataTable();
                tab = ((DataSet)SqlHelper.ExecuteNonQuery_v1(NTSSession.GetConnectionString1()
                    , "ProcGetAll_tblCauHinhHeThong"
                    , new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID)).Result).Tables[0];
                if (tab.Rows.Count != 0)
                {
                    nfi = new NumberFormatInfo { NumberDecimalSeparator = tab.Rows[0]["NganCachThapPhan"].ToString(), NumberGroupSeparator = tab.Rows[0]["NganCachHangNghin"].ToString() };
                    SoChuSoThapPhan = int.Parse(tab.Rows[0]["SoChuSoThapPhan"].ToString());
                }
            }
            catch (Exception)
            {    

            }  
        }
    }                                                                               
    public static class Extension
    {
        #region  Xử lý excel     
        public static void NTS_ExcelDinhDangDong(this IXLRange Range, bool Bold, bool Italic, bool DinhDang_DongDuLieu)
        {
            Range.Style.Font.Bold = Bold;
            Range.Style.Font.Italic = Italic;
            Range.Style.Border.LeftBorder = Range.Style.Border.RightBorder = XLBorderStyleValues.Thin;
            if (DinhDang_DongDuLieu)
                Range.Style.Border.BottomBorder = XLBorderStyleValues.Dashed;
            
            else
                Range.Style.Border.TopBorder = XLBorderStyleValues.Thin;
            Range.Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            Range.Style.Border.TopBorder = XLBorderStyleValues.Thin;
        } 
        #endregion
        #region Xử lý số  
        /// <summary>
        /// Dựa vào cấu hình hệ thống xuất ra định dạng số
        /// Chỉ sự dụng hàm này để view dữ liệu
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        /// 
        public static string NTS_ToNumberStr(this object number)
        {
            if (string.IsNullOrEmpty(number.ToString()))
                return "0";
            CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
            return decimal.Parse(number.ToString(), cauHinhHeThong.nfi).ToString("N" + cauHinhHeThong.SoChuSoThapPhan, cauHinhHeThong.nfi);
        }
        /// <summary>
        /// Sử dụng hàm này để lưu vào Database, có sao lưu vào như vậy
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public static decimal NTS_ToNumber(this object number)
        {
            try
            {
                CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
                return decimal.Parse(number.ToString(), cauHinhHeThong.nfi);
            }
            catch (Exception)
            {

                return 0;
            }
           
        }
        
        /// <summary>
        /// Sử dụng hàm này để lưu vào Database, có sao lưu vào như vậy
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public static Guid NTS_ToGuid(this object guid)
        {
            try
            {
                return Guid.Parse(guid.ToString());
            }
            catch
            {

                return default(Guid);
            }
           
        }
        #endregion
        #region Xử ngày
        public static object NTS_ToDate(this object date)
        {
            try
            {
                CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
                string Date = date.ToString().Substring(6, 4) + "/" + date.ToString().Substring(3, 2) + "/" + date.ToString().Substring(0, 2);
                return Date;

            }
            catch (Exception ex)
            {
                return DBNull.Value;
            }
        }

        public static string NTS_ToDateString(this object date)
        {
            try
            {
                CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
                string Date = date.ToString().Substring(6, 4) + "/" + date.ToString().Substring(3, 2) + "/" + date.ToString().Substring(0, 2);
                return Date;

            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public static object NTS_ToDate(this object date, string format)
        {
            try
            {
                CauHinhHeThong cauHinhHeThong = new CauHinhHeThong();
                string Date = date.ToString().Substring(6, 4) + "/" + date.ToString().Substring(3, 2) + "/" + date.ToString().Substring(0, 2);
                if (date.ToString().Length != 10)
                {
                    Date += " " + date.ToString().Split(' ')[1];

                    return DateTime.ParseExact(Date, format, System.Globalization.CultureInfo.InvariantCulture);
                }
                return DateTime.ParseExact(Date, format, System.Globalization.CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
              return  DBNull.Value;
            }
        }
        public static bool NTS_ToBool(this object value)
        {
            if (value.ToString() == "1")
                return true;
            else if (value.ToString().ToUpper() == "TRUE")
                return true;
            else if (value.ToString().ToUpper() == "FALSE")
                return false;
            else if (value.ToString().ToUpper() == "0")
                return false;
            throw new ArgumentNullException("Không thể chuyển đổi " + value + " sang kiểu bool");
        }
        #endregion
    }
}