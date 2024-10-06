using TTLD2024.Areas.DanhMuc.Controllers;
using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class ThietLapBangController : Controller
    {
        // GET: HeThong/ThietLapBang
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetAll1()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                "select * from ThietLapBang where isnull(USERID,'00000000-0000-0000-0000-000000000000') = '00000000-0000-0000-0000-000000000000'").Tables[0];
                duLieu.Columns.Add("TenChucNang");
                for (int i = 0; i < duLieu.Rows.Count; i++)
                {
                    SqlFunction sqlFunction = new SqlFunction(NTSSession.GetConnectionString1());
                    string TenChucNang = sqlFunction.GetOneStringField("select TenMenu from Menu where MenuID='" + duLieu.Rows[i]["ChucNang"] + "'");
                    duLieu.Rows[i]["TenChucNang"] = TenChucNang;
                }
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                //return JSonHelper.ToJson(new DataTable());
                ep.Err = true;
                ep.Logs = ex.Message.ToString();
                ep.Msg = "Thao tác thất bại!";
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string GetAll2(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                "select * from ThietLapBang where ChucNang='"+DungChung.NormalizationGuid(id).ToString()+ "' and isnull(USERID,'00000000-0000-0000-0000-000000000000') = '00000000-0000-0000-0000-000000000000'").Tables[0];
                duLieu.Columns.Add("TenChucNang");
                for (int i = 0; i < duLieu.Rows.Count; i++)
                {
                    SqlFunction sqlFunction = new SqlFunction(NTSSession.GetConnectionString1());
                    string TenChucNang = sqlFunction.GetOneStringField("select TenMenu from Menu where MenuID='" + duLieu.Rows[i]["ChucNang"] + "'");
                    duLieu.Rows[i]["TenChucNang"] = TenChucNang;
                }
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                //return JSonHelper.ToJson(new DataTable());
                ep.Err = true;
                ep.Logs = ex.Message.ToString();
                ep.Msg = "Thao tác thất bại!";
                return JSonHelper.ToJson(ep);
            }
        }



        [HttpPost]
        public string getMenu()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                "select  MenuID,MenuCode,TenMenu from Menu where DuongDan is not null and DuongDan !='' order by TenMenu").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        //[HttpPost]
        //public string GetCauHinh_cha(string ThietLapBangID, string ChucNang)
        //{
        //    try
        //    {
        //        if (!NTSSecurity.Validate())
        //            return JSonHelper.ToJson(null);
        //        return JSonHelper.ToJson(SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
        //        "SELECT ThietLapBangID, TenCot FROM dbo.CauHinhBang WHERE ThietLapBangID <> N'" + DungChung.NormalizationGuid(ThietLapBangID) + "' and ChucNang = N'" + DungChung.NormalizationGuid(ChucNang) + "'", null).Tables[0]);
        //    }
        //    catch (Exception)
        //    {
        //        return JSonHelper.ToJson(null);
        //    }
        //}




        [HttpPost]
        public int KTTrungCauTruc(string maluoi, string chucnangid)
        {
            try
            {
                var data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "select * from ThietLapBang where ChucNang='" + chucnangid + "' and MaLuoi='" + maluoi + "'", null).Tables[0];

                return data.Rows.Count;
            }
            catch (Exception)
            {
                return 0;
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
                if (KTTrungCauTruc(data[3].ToString(),data[2].ToString())>0 && data[0].ToString()=="them")
                {
                    return NTSThongBao.DaTonTaiMa();
                }
                //if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[1].ToString(), "MaXa", "Xa", "XaID", data[8].ToString()))
                //{
                //    return NTSThongBao.DaTonTaiMa();
                //}

                SqlParameter[] para = {
                    new SqlParameter("@Loai",data[0].ToString()),
                    new SqlParameter("@ThietLapBangID",DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ChucNang",DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@MaLuoi",DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@TinhNang",DungChung.NormalizationString(data[4].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "insert_LuuThongTinThietLapBang", para);

                if (data[0].ToString() == "them")
                {
                    duLieu.Tables[0].TableName = "ThietLapBang";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "ThietLapBang";
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
        public string MaID()
        {
            var id = Guid.NewGuid().ToString("N");
            return JSonHelper.ToJson(id);
        }



        [HttpPost]
        public string LoadDuLieuSua(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para = {
                    new SqlParameter("@ThietLapBangID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThietLapBang_ByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }









        [HttpPost]
        public string GetJsonCauHinhTest(string ma)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ThietLapBangID",DungChung.NormalizationGuid(ma)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetThietLapBang_ByID", para).Tables[0];
                //Returning Json Data
                
                var json = JSonHelper.ToTable(duLieu.Rows[0]["TinhNang"].ToString());
                ep.Result = json;
                return JSonHelper.ToJson(ep);
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
                    new SqlParameter("@ThietLapBangID",DungChung.NormalizationGuid(id)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ThietLapBang", para);
                if (duLieu.Tables[0].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "ThietLapBang";
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
        public string GetAllCauhinh(string url, string mabang)
        {
            try
            {

                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlFunction sqlFun1 = new SqlFunction(NTSSession.GetConnectionString1());

                string MenuID = sqlFun1.GetOneStringField(@"select Convert(nvarchar(50), MenuID) from Menu where DuongDan=N'" + url.ToString() + "' or DuongDanTuyetDoi = N'" + url.ToString() + "'");

                SqlFunction sqlFunction = new SqlFunction(NTSSession.GetConnectionString2());
                string ten = sqlFunction.GetOneStringField("select MaLuoi from ThietLapBang  where MaLuoi='" + mabang + "' and ChucNang='" + DungChung.NormalizationGuid(MenuID.ToString()) + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "' group by maluoi");
                if (ten == "")
                {
                    var data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "select * from ThietLapBang  where ChucNang='" + DungChung.NormalizationGuid(MenuID.ToString()) + "' and MaLuoi='" + mabang.ToString() + "' and isnull(USERID,'00000000-0000-0000-0000-000000000000') = '00000000-0000-0000-0000-000000000000'", null).Tables[0];
                    var json = JSonHelper.ToTable(data.Rows[0]["TinhNang"].ToString());
                    ep.Result = json;
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    var data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "select * from ThietLapBang  where ChucNang='" + DungChung.NormalizationGuid(MenuID.ToString()) + "' and MaLuoi='" + mabang.ToString() + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "'", null).Tables[0];
                    var json = JSonHelper.ToTable(data.Rows[0]["TinhNang"].ToString());
                    ep.Result = json;
                    return JSonHelper.ToJson(ep);
                }

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }








        [HttpPost]
        public string GetCauHinhID(string url, string mabang)
        {
            try
            {

                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlFunction sqlFun1 = new SqlFunction(NTSSession.GetConnectionString1());

                string MenuID = sqlFun1.GetOneStringField(@"select Convert(nvarchar(50), MenuID) from Menu where DuongDan=N'" + url.ToString() + "' or DuongDanTuyetDoi = N'" + url.ToString() + "'");

                SqlFunction sqlFunction = new SqlFunction(NTSSession.GetConnectionString2());
                string ten = sqlFunction.GetOneStringField("select MaLuoi from ThietLapBang  where MaLuoi='" + mabang + "' and ChucNang='" + DungChung.NormalizationGuid(MenuID.ToString()) + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "' group by maluoi");
                if (ten == "")
                {
                    string CauHinhID = sqlFunction.GetOneStringField("select ThietLapBangID from ThietLapBang  where MaLuoi='" + mabang + "' and ChucNang='" + DungChung.NormalizationGuid(MenuID.ToString()) + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "' and isnull(UserID,0)=0");
                    ep.Result = CauHinhID;
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    string CauHinhID = sqlFunction.GetOneStringField("select ThietLapBangID from ThietLapBang  where MaLuoi='" + mabang + "' and ChucNang='" + DungChung.NormalizationGuid(MenuID.ToString()) + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "'");
                    ep.Result = CauHinhID;
                    return JSonHelper.ToJson(ep);
                }

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }










        [HttpPost]
        public string KTTrungCauTrucCauHinh(string maluoi, string chucnangid)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                var sqlFun1 = new SqlFunction(NTSSession.GetConnectionString1());
                string MenuID = sqlFun1.GetOneStringField(@"select Convert(nvarchar(50), MenuID) from Menu where DuongDan=N'" + chucnangid.ToString() + "' or DuongDanTuyetDoi = N'" + chucnangid.ToString() + "'");

                var data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                "select * from ThietLapBang where ChucNang='" + MenuID + "' and maluoi='" + maluoi + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "'", null).Tables[0];

                ep.Result = data.Rows.Count.ToString();
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ep.Result = "0";
                return JSonHelper.ToJson(ep);
            }
        }










        [HttpPost]
        public string GetIDCauHinhNhanh(string maluoi, string chucnangid)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                var sqlFun1 = new SqlFunction(NTSSession.GetConnectionString1());
                string MenuID = sqlFun1.GetOneStringField(@"select Convert(nvarchar(50), MenuID) from Menu where DuongDan=N'" + chucnangid.ToString() + "' or DuongDanTuyetDoi = N'" + chucnangid.ToString() + "'");

                var sqlFun2 = new SqlFunction(NTSSession.GetConnectionString2());
                string CauHinhID = sqlFun2.GetOneStringField(@"select Convert(nvarchar(50), ThietLapBangID) from ThietLapBang where ChucNang='" + MenuID + "' and maluoi='" + maluoi + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "'");

                ep.Result = CauHinhID + "_" + MenuID;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }



        [HttpPost]
        public string GetMenuCauHinhNhanh(string chucnangid)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                var sqlFun1 = new SqlFunction(NTSSession.GetConnectionString1());
                string MenuID = sqlFun1.GetOneStringField(@"select Convert(nvarchar(50), MenuID) from Menu where DuongDan=N'" + chucnangid.ToString() + "' or DuongDanTuyetDoi = N'" + chucnangid.ToString() + "'");
                ep.Result = MenuID;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }







        [HttpPost]
        public string LuuThongTinCauHinhNhanh(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            if (!NTSSecurity.Validate())
            {
                return NTSThongBao.KhongCoQuyenTruyCap();
            }
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@Loai",data[0].ToString()),
                    new SqlParameter("@ThietLapBangID",DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@ChucNang",DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@MaLuoi",DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@TinhNang",DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@UserID",DungChung.NormalizationGuid(NTSSession.GetUser().UserID.ToString())),
                };

                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "insert_LuuThongTinThietLapBangNhanh", para);

                if (data[0].ToString() == "them")
                {
                    duLieu.Tables[0].TableName = "ThietLapBang";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                    {
                        duLieu.Tables[0].TableName = "ThietLapBang";
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
        public string CauHinhGoc(string maluoi, string duongdan)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                var sqlFun1 = new SqlFunction(NTSSession.GetConnectionString1());
                string MenuID = sqlFun1.GetOneStringField(@"select Convert(nvarchar(50), MenuID) from Menu where DuongDan=N'" + duongdan.ToString() + "' or DuongDanTuyetDoi = N'" + duongdan.ToString() + "'");

                var sqlFun2 = new SqlFunction(NTSSession.GetConnectionString2());
                string CauHinhID = sqlFun2.GetOneStringField(@"select Convert(nvarchar(50), ThietLapBangID) from ThietLapBang where ChucNang='" + MenuID + "' and maluoi='" + maluoi + "' and UserID='" + NTSSession.GetUser().UserID.ToString().ToUpper() + "'");
                SqlParameter[] para = {
                    new SqlParameter("@ThietLapBangID",DungChung.NormalizationGuid(CauHinhID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ThietLapBang", para);
                if (duLieu.Tables[0].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "ThietLapBang";
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











    }
}