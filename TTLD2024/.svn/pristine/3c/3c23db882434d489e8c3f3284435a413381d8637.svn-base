using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;
using TTLD2024.Class;
using WEB_DLL;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class NhomNguoiDungController : Controller
    {
        // GET: HeThong/NhomNguoiDung
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string GetAllUserGroup()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_UserGroup").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        
        [HttpGet]
        public string GetQuyenCuaNhom(string id)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserGroupID",DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetQuyenCuaNhom", para).Tables[0];
                string Permission = "", PermissionEncrypt = "";
                string[] arrValue = new string[9];
                for (int i = 0; i < duLieu.Rows.Count; i++)
                {
                    try
                    {
                        PermissionEncrypt = XemQuyenChucnang(duLieu.Rows[i]["Permission"].ToString());
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
                    duLieu.Rows[i]["Quyen"] = Permission.Replace(";;;;;;;;", "").Replace(";;;;;;;", ";").Replace(";;;;;;", ";").Replace(";;;;;", ";").Replace(";;;;", ";").Replace(";;;", ";").Replace(";;", ";");
                    }
                    catch (Exception ex)
                    {
                       
                    }
                }
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
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
        public string GetAllChucNang(string Data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserGroupID",DungChung.NormalizationGuid(Data)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllChucNang", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        public string ThemChucNang(string[] Data)
        {

            object pXem = Convert.ToBoolean(((object[])(Data))[0].ToString());
            object pThem = Convert.ToBoolean(((object[])(Data))[1].ToString());
            object pXoa = Convert.ToBoolean(((object[])(Data))[2].ToString());
            object pSua = Convert.ToBoolean(((object[])(Data))[3].ToString());
            object pNap = Convert.ToBoolean(((object[])(Data))[4].ToString());
            object pIn = Convert.ToBoolean(((object[])(Data))[5].ToString());
            object pP1 = Convert.ToBoolean(((object[])(Data))[6].ToString());
            object pP2 = Convert.ToBoolean(((object[])(Data))[7].ToString());
            object pP3 = Convert.ToBoolean(((object[])(Data))[8].ToString());
            string listID = ((object[])(Data))[9].ToString();
            string nhomUser = ((object[])(Data))[10].ToString();
            bool themuser = Convert.ToBoolean(((object[])(Data))[11].ToString());
            try
            {
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

                string[] _vFunctions = listID.Split(',');
                for (int i = 0; i < _vFunctions.Length; i++)
                {
                    string sqlInsert = "INSERT INTO GroupPermiss ( MenuID , UserGroupID , Permission ) " +
                            " VALUES ( N'" +
                            _vFunctions[i] + "',N'" + nhomUser + "',N'" + WEB_DLL.ntsSecurity._mEncrypt(nhomUser + ";" + _vFunctions[i] + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "')";
                    SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                    sqlFun.ExeCuteNonQuery(sqlInsert);
                    //kiểm tra lưu vào user
                    if (themuser == true)
                    {
                        DataTable _vdt = sqlFun.GetData("SELECT UserID FROM Users WHERE UserGroupID=N'" + nhomUser + "'");
                        string sqlInsert1 = " ";
                        for (int j = 0; j < _vdt.Rows.Count; j++)
                        {
                            //Kiểm tra có tồn tại chưa
                            if (sqlFun.CheckHasRecord("SELECT * FROM UserPermiss WHERE MenuID = N'" + _vFunctions[i] + "' and UserID = N'" + _vdt.Rows[j]["UserID"].ToString() + "'") == false)
                            {
                                sqlInsert1 = "INSERT INTO UserPermiss (MenuID,UserID,Permission) VALUES(N'" +
                                    _vFunctions[i] +
                                    "',N'" + _vdt.Rows[j]["UserID"].ToString() + "'" +
                                    ",N'" + WEB_DLL.ntsSecurity._mEncrypt(_vdt.Rows[j]["UserID"].ToString() + ";" + _vFunctions[i] + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "'" +
                                    ")";
                                sqlFun.ExeCuteNonQuery(sqlInsert1);
                            }
                        }
                    }
                }
                return NTSThongBao.ThemThanhCong();
            }             
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
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
            object UserGroupName = ((object[])(saveData))[10].ToString();
            object functionID = ((object[])(saveData))[11].ToString();
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
                    DataTable _vdt = sqlFun.GetData("Select * from GroupPermiss Where UserGroupID='" + UserGroupName + "'");
                    for (int i = 0; i < _vdt.Rows.Count; i++)
                    {
                        try
                        {
                            string sqlUpdateQoN = "UPDATE GroupPermiss SET Permission ='" + WEB_DLL.ntsSecurity._mEncrypt(UserGroupName + ";" + _vdt.Rows[i]["MenuID"].ToString() + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "' WHERE GroupPerID='" + _vdt.Rows[i]["GroupPerID"].ToString() + "'";
                            sqlFun.ExeCuteNonQuery(sqlUpdateQoN);
                        }
                        catch { }
                    }
                }
                else
                {
                    SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                    string sqlUpdateQoN = "UPDATE GroupPermiss SET Permission ='" + WEB_DLL.ntsSecurity._mEncrypt(UserGroupName + ";" + functionID + ";" + permiss, PageInfo.KeyMaHoaMatKhau, true) + "' WHERE UserGroupID='" + UserGroupName + "' AND MenuID='" + functionID + "'";
                    sqlFun.ExeCuteNonQuery(sqlUpdateQoN);
                }
                return JSonHelper.ToJson("");
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("");
            }
        }
        public string LuuUserGroup(string DuLieuTb)
        {

            try
            {
                DataTable tableUserGroup = JSonHelper.ToTable(DuLieuTb);
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_UserGroup", null).Tables[0];
                for (int i = 0; i < tableUserGroup.Rows.Count; i++)
                {
                    int TonTai = 0;
                    for (int j = 0; j < duLieu.Rows.Count; j++)
                    {
                        if (tableUserGroup.Rows[i]["UserGroupCode"].ToString() == duLieu.Rows[j]["UserGroupCode"].ToString())
                        {
                            TonTai = 1;
                        }
                    }
                    if (TonTai == 0)
                    {
                        SqlParameter[] para = {
                                new SqlParameter("@UserGroupCode",tableUserGroup.Rows[i]["UserGroupCode"].ToString()),
                                new SqlParameter("@UserGroupName",tableUserGroup.Rows[i]["UserGroupName"].ToString()),
                            };
                        SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_InsertUserGroup", para);
                    }

                }


                return NTSThongBao.CapNhatThanhCong();
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaGroupUser(string ma)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserGroupID",DungChung.NormalizationGuid(ma)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_DeleteGroupUsers", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "UserGroup";
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
        public string XoaChucNang(string ID, string IDGroup)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@GroupPerID",DungChung.NormalizationGuid(ID)),
                    new SqlParameter("@IDGroup",DungChung.NormalizationGuid(IDGroup))
                    };
                DataSet duLieu;
               if(ID == "")
                {
                    duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_DeleteGroupPermiss_ALL", para);
                }
                else
                {
                    duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_DeleteGroupPermiss", para);
                }
                
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "GroupPermiss";
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
        public string CapNhatUserGroupName(string UserGroupName, string id)
        {
            try
            {

                SqlParameter[] para = {
                    new SqlParameter("@UserGroupID",DungChung.NormalizationGuid(id)),
                    new SqlParameter("@UserGroupName",UserGroupName),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateUserGroupName", para);
                //Returning Json Data
                if (id == null)
                {
                    return JSonHelper.ToJson("1_" + duLieu.Tables[0].Rows[0][0].ToString());
                }
                else
                {
                    return JSonHelper.ToJson("1_" + id); ;
                }

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string CapNhatUserGroupCode(string UserGroupCode, string id)
        {
            try
            {
               
                SqlParameter[] para = {
                    new SqlParameter("@UserGroupID",DungChung.NormalizationGuid(id)),
                    new SqlParameter("@UserGroupCode",UserGroupCode),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateUserGroupCode", para);
                //Returning Json Data
                if (id == null)
                {
                    return JSonHelper.ToJson("1_" + duLieu.Tables[0].Rows[0][0].ToString()); 
                }
                else
                {
                    return JSonHelper.ToJson("1_" + id); ;
                }
                

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string CapNhatUserTheoNhom(string UserGroupID)
        {
            try
            {
                string nhomUser = UserGroupID.ToString();
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                //kiểm tra lưu vào user
                //Lây tất cả quyền của nhóm người dùng
                DataTable tblGroupPermiss = sqlFun.GetData(@"SELECT GroupPerID,
                                                    MenuID,
                                                    UserGroupID,
                                                    Permission FROM dbo.GroupPermiss WHERE UserGroupID=N'" + nhomUser + "'");
                if (tblGroupPermiss.Rows.Count > 0)
                {
                    DataTable _vdt = sqlFun.GetData("SELECT UserID FROM Users WHERE UserGroupID=N'" + nhomUser + "'");
                    for (int j = 0; j < _vdt.Rows.Count; j++)
                    {
                        //Xóa phân quyền cũ của user
                        sqlFun.ExeCuteNonQuery("DELETE FROM dbo.UserPermiss WHERE UserID='" + _vdt.Rows[j]["UserID"].ToString() + "'");
                        //Thêm lại quyền của nhóm cho user
                        for (int p = 0; p < tblGroupPermiss.Rows.Count; p++)
                        {
                            //lay chuoi phan quyen su dung
                            int permiss = 0;
                            string GroupPermiss = XemQuyenChucnang(tblGroupPermiss.Rows[p]["Permission"].ToString());
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
                            string sqlInsert1 = " ";

                            //Kiểm tra có tồn tại chưa
                            if (sqlFun.CheckHasRecord("SELECT * FROM UserPermiss WHERE MenuID = N'" + tblGroupPermiss.Rows[p]["MenuID"].ToString() + "' and UserID = N'" + _vdt.Rows[j]["UserID"].ToString() + "'") == false)
                            {
                                try
                                {
                                    sqlInsert1 = $@"INSERT INTO UserPermiss (MenuID,UserID,Permission) VALUES(
                                    N'{tblGroupPermiss.Rows[p]["MenuID"].ToString()}'
                                    ,N'{_vdt.Rows[j]["UserID"].ToString()}'
                                    ,N'{WEB_DLL.ntsSecurity._mEncrypt(_vdt.Rows[j]["UserID"].ToString() + ";" + tblGroupPermiss.Rows[p]["MenuID"].ToString() + ";" + permiss, "rateAnd2012", true)}')";
                                    sqlFun.ExeCuteNonQuery(sqlInsert1);
                                }
                                catch (Exception t)
                                {

                                }
                            }
                        }
                    }
                }
                return JSonHelper.ToJson("ThanhCong");
            }
            catch (Exception e)
            {
                return JSonHelper.ToJson("ThatBai");
            }
        }
    }
}