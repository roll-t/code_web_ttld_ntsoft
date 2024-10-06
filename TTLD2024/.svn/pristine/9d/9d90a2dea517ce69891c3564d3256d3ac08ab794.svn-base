using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WEB_DLL;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data.OleDb;

namespace TTLD2024.Models
{
    public static class CaNhan
    {
       //protected static void Page_Load(object sender, EventArgs e)
       // {
       //     AsyncFileUpload3.UploadedComplete += new EventHandler<AsyncFileUploadEventArgs>(AsyncFileUpload3_UploadedComplete);
       //     AsyncFileUpload3.UploadedFileError += new EventHandler<AsyncFileUploadEventArgs>(AsyncFileUpload3_UploadedFileError);
       // }
        public static string GetAllDanhXungCaNhan()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.get);
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"select TenDanhXung from DanhXung where LaTapThe = '0'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string GetAllDanhXungTapThe()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.GetConnectionString2());
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"select TenDanhXung from DanhXung where LaTapThe = '0'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string GetAll()
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.GetConnectionString2());
                DataTable duLieu = SqlHelper.ExecuteDataset(@"Data Source=DESKTOP-FVM9OK9\SQLEXPRESS;Initial Catalog=TDKT_2021;Integrated Security=True", CommandType.Text,
            @"SELECT [DoiTuongID]
      ,[TenDoiTuong]
      ,ChucVu = (select TenChucVu from ChucVu where dt.ChucVuID = ChucVu.ChucVuID)
      ,[GioiTinh]
      ,NamSinh = convert(nvarchar(10),NamSinh,103)
      ,Xa = (select TenXa from Xa where dt.XAID_QueQuan = Xa.XaID)
      ,Huyen = (select TenHuyen from Huyen where dt.HUYENID_QueQuan = Huyen.HuyenID)
      ,Tinh = (select TenTinh from Tinh where dt.TINHID_QueQuan = Tinh.TinhID)
      ,[CMND]
      ,[NgayCap]
      ,[NoiCap]
      ,[DonViID]
      ,[NgayThaoTac]
      ,DoiTuong_CoQuanChuQuan = (select TenDoiTuong from DoiTuongTDKT where DoiTuongID = dt.DoiTuongID_CoQuanChuQuan)
      ,[DoiTuongCode]
      ,[DanhXung]
      ,[ThuyenChuyen]
      ,[NgayThuyenChuyen]
      ,[CumTDID]
      ,[NhapExcel]
      ,[CaNhanTapThe]
      ,[DiaChi]
      ,[NgungSD]
  FROM [TDKT_2021].[dbo].[DoiTuongTDKT] dt where CaNhanTapThe ='1'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string LayDoiTuongTheoID(object[] data)
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.GetConnectionString2());
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"SELECT [DoiTuongID]
      ,[TenDoiTuong]
      ,ChucVuID
      ,[GioiTinh]
      ,NamSinh = convert(nvarchar(10),NamSinh,103)
      ,Xa = (select TenXa from Xa where dt.XAID_QueQuan = Xa.XaID)
      ,Huyen = (select TenHuyen from Huyen where dt.HUYENID_QueQuan = Huyen.HuyenID)
      ,Tinh = (select TenTinh from Tinh where dt.TINHID_QueQuan = Tinh.TinhID)
      ,[CMND]
      ,[NgayCap]
      ,[NoiCap]
      ,[DonViID]
      ,[NgayThaoTac]
      ,DoiTuong_CoQuanChuQuan = (select TenDoiTuong from DoiTuongTDKT where DoiTuongID = dt.DoiTuongID_CoQuanChuQuan)
      ,[DoiTuongCode]
      ,[DanhXung]
      ,[ThuyenChuyen]
      ,[NgayThuyenChuyen]
      ,[CumTDID]
      ,[NhapExcel]
      ,[CaNhanTapThe]
      ,[DiaChi]
      ,[NgungSD]
  FROM [TDKT_2021].[dbo].[DoiTuongTDKT] dt where DoiTuongID = '"+DungChung.NormalizationGuid(data[0].ToString())+ "' and CaNhanTapThe ='"+data[1].ToString()+"'").Tables[0];
                var customerData = duLieu.AsEnumerable();

                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static string LuuDoiTuong(object[] data)
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                SqlParameter[] para = {
                    new SqlParameter("@MaCBCC", data[0].ToString()),
                    new SqlParameter("@DanhXung",  data[1].ToString()),
                    new SqlParameter("@HoTen",  data[2].ToString()),
                    new SqlParameter("@ChucVu", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@GioiTinh", data[4].ToString()),
                    new SqlParameter("@NgaySinh", DungChung.NormalizationDateTime(data[5].ToString())),
                    new SqlParameter("@CMND", data[6].ToString()),
                    new SqlParameter("@NgayCap", DungChung.NormalizationDateTime(data[7].ToString())),
                    new SqlParameter("@NoiCap", data[8].ToString()),
                    new SqlParameter("@DiaChi", data[9].ToString()),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@CaNhan", DungChung.NormalizationBoolean(data[12].ToString())),
                    new SqlParameter("@ThaoTac", DungChung.NormalizationString(data[11].ToString())),
                    new SqlParameter("@DoiTuong", DungChung.NormalizationGuid(data[13].ToString())),
                };
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuDoiTuong", para);
                
                return JSonHelper.ToJson(ds);
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        public static bool KiemTraXoaDoiTuong(string ID)
        {
            SqlFunction _class = new SqlFunction(NTSSession.GetConnectionString1());
            string _sqlSel = "SELECT sttDoiTuongTDKTpr_sd FROM dbo.ThiDuaKhenThuong WHERE sttDoiTuongTDKTpr_sd='" + ID + "'";
            return _class.CheckHasRecord(_sqlSel);
        }
        public static string XoaDoiTuong(string ID)
        {
            try
            {
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.get);
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"DELETE FROM DoiTuongTDKT where DoiTuongID = '"+DungChung.NormalizationGuid(ID)+"'");
               

                return JSonHelper.ToJson("1_Xóa thành công");
            }
            catch (Exception ex)
            {
                return "";

            }
        }
        

    }
    public class HiddenField
    {
        public string Percent { get; set; }
    }
    
}