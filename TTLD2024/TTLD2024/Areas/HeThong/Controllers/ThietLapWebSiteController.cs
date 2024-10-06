using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class ThietLapWebSiteController : Controller
    {
        // GET: HeThong/ThietLapWebSite
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
                    ep.Msg = "Bạn không có quyền truy cập!";
                    return JSonHelper.ToJson(ep);
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllCauHinhWebSite", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.Message.ToString();
                ep.Msg = "Tải dữ liệu thất bại";
                return JSonHelper.ToJson(ep);
            }
        }

        [HttpPost]
        public string GetmaCauHinhWebSite()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetmaCauHinhWebSite", null).Tables[0];
                //var customerData = duLieu.AsEnumerable();
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string LoadDonVi()
        {
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi", null).Tables[0];
                var customerData = duLieu.AsEnumerable();


                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("");
            }
        }
        [HttpPost]
        public string XoaFile(string PathFile)
        {

            System.IO.File.Delete(Server.MapPath(PathFile));

            return JSonHelper.ToJson("");
        }
        [HttpPost]
        public string kiemTraTonTai(string ma, string tenCot, string tenBang)
        {
            string stSQL = "select ketQua=(case when count(" + tenCot + ") > 0 then 'true' else 'false' end) from " + tenBang + " where " + tenCot + " = " + ma;
            DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text, stSQL).Tables[0];
            return duLieu.Rows[0][0].ToString();
        }
        [HttpPost]
        public string LuuThongTin(object[] data)
        {
            string fun = "";
            if (kiemTraTonTai("'" + data[1].ToString() + "'", "maCauHinh", "CauHinhWebSite") == "true" && data[0].ToString() == "them")
            {
                return JSonHelper.ToJson("2_Đã tồn tại mã trong hệ thống");
            }
            if (data[0].ToString() == "them")
            {
                fun = "Insert_CauHinhWebSite";
            }
            else
            {
                fun = "Update_CauHinhWebSite";
            }
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@maCauHinh",DungChung.NormalizationString(data[1].ToString())),
                    new SqlParameter("@tenDonVi",DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@diaChi",DungChung.NormalizationString(data[3].ToString())),
                    new SqlParameter("@soDT", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@Fax", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@Email", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@banner", data[7].ToString()),
                    new SqlParameter("@web", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@DangSD",DungChung.NormalizationBoolean(data[9].ToString())),
                    new SqlParameter("@maCauHinhID", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@TenPMVietTat", DungChung.NormalizationString(data[11].ToString())),
                    new SqlParameter("@PhienBan", DungChung.NormalizationString(data[12].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), fun, para);
                if (data[0].ToString() == "them")
                {
                    duLieu.Tables[0].TableName = "CauHinhWebSite";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows.Count == 1)
                    {
                        duLieu.Tables[0].TableName = "CauHinhWebSite";
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
                return JSonHelper.ToJson("0_Thêm mới không thành công");
            }
        }

        [HttpPost]
        public string XoaCauHinhWebSite(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@maCauHinhID",DungChung.NormalizationGuid(ID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_CauHinhWebSite", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "CauHinhWebSite";
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
                return JSonHelper.ToJson("0_Xóa không thành công");
            }
        }
        [HttpPost]
        public string LuuFile(string PathFile, string FileName)
        {
            string duongDan = "/HinhAnh/TinTuc/HinhAnh";
            string path = "", fileName = "";
            if (!System.IO.Directory.Exists(Server.MapPath(duongDan)))
            {
                System.IO.Directory.CreateDirectory(Server.MapPath(duongDan));
            }
            string[] danhSachFile = Directory.GetFiles(Server.MapPath(duongDan));
            path = string.Concat(Server.MapPath(duongDan + "/" + fileName));
            if (Path.GetExtension(FileName).Contains(".jpg") == false && Path.GetExtension(FileName).Contains(".gif") == false && Path.GetExtension(FileName).Contains(".png") == false && Path.GetExtension(FileName).Contains(".bmp") == false && Path.GetExtension(FileName).Contains(".JPG") == false && Path.GetExtension(FileName).Contains(".GIF") == false && Path.GetExtension(FileName).Contains(".PNG") == false && Path.GetExtension(FileName).Contains(".BMP") == false)
            {
                return JSonHelper.ToJson("");
            }

            //duyet mang file trong thư mục
            string clearThuMuc = "";
            //foreach (string tenFile_ in danhSachFile)
            //{
            //    clearThuMuc = Path.GetFileName(tenFile_).Trim();
            //    System.IO.File.Delete(Server.MapPath(duongDan + "/" + clearThuMuc));
            //}
            string fileMau = Server.MapPath(PathFile);
            System.IO.File.Copy(fileMau, Server.MapPath(duongDan + "/" + FileName), true);
            return JSonHelper.ToJson(duongDan + "/" + FileName);
        }
        [HttpPost]
        public string LoadDuLieuSua(string ID)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@maCauHinhID",DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetCauHinhWebSiteByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }
        [HttpPost]
        public string XoaDinhKem(string ID, string duongDan, string bangDk, string cotDk, string loai)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                string strDuongDan = "";
                string bang = bangDk.ToString();
                string cotDK = cotDk.ToString();

                bang = bang.Replace("select", "");
                bang = bang.Replace("delete", "");
                bang = bang.Replace("drop", "");
                bang = bang.Replace("truncate", "");

                cotDK = cotDK.Replace("select", "");
                cotDK = cotDK.Replace("delete", "");
                cotDK = cotDK.Replace("drop", "");
                cotDK = cotDK.Replace("truncate", "");

                // lấy đính kèm
                SqlParameter[] paraDK = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", "Banner"),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["Banner"].ToString();
                }
                else
                {
                    //nếu không có dữ liệu trong sql trong trường hợp thêm mới thì chỉ xóa file mới đính kèm
                    if (System.IO.File.Exists(Server.MapPath(duongDan)))
                    {
                        System.IO.File.Delete(Server.MapPath(duongDan));
                    }
                    ep.Msg = "Xóa đính kèm thành công!";
                    return JSonHelper.ToJson(ep);
                }

                //Xóa đính kèm
                SqlParameter[] para = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", "Banner"),
                        new SqlParameter("@Value",  strDuongDan.Replace(duongDan+"*","")),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);

                if (duLieu.Tables[0].Rows.Count != 0)
                {
                    if (loai == "all")
                    {
                        string[] arrDuongDan = strDuongDan.Split('*');
                        foreach (string item in arrDuongDan)
                        {
                            if (System.IO.File.Exists(Server.MapPath(item)))
                            {
                                System.IO.File.Delete(Server.MapPath(item));
                            }
                        }
                    }
                    else
                    {
                        if (System.IO.File.Exists(Server.MapPath(duongDan)))
                        {
                            System.IO.File.Delete(Server.MapPath(duongDan));
                        }
                    }
                }
                ep.Msg = "Xóa đính kèm thành công!";
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuVanBan_DinhKem(string PathTemp, string ID, string PathChiTiet, string bangDk, string cotDk, string cotDinhKem)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                bangDk = bangDk.Replace("select", "");
                bangDk = bangDk.Replace("delete", "");
                bangDk = bangDk.Replace("drop", "");
                bangDk = bangDk.Replace("truncate", "");

                cotDk = cotDk.Replace("select", "");
                cotDk = cotDk.Replace("delete", "");
                cotDk = cotDk.Replace("drop", "");
                cotDk = cotDk.Replace("truncate", "");

                cotDinhKem = cotDinhKem.Replace("select", "");
                cotDinhKem = cotDinhKem.Replace("delete", "");
                cotDinhKem = cotDinhKem.Replace("drop", "");
                cotDinhKem = cotDinhKem.Replace("truncate", "");
                string PathTong = "";

                for (int i = 0; i < PathTemp.Split('*').Length; i++)
                {
                    string Path = PathTemp.Split('*')[i];
                    if (Path.Trim() == "")
                    {
                        continue;
                    }
                    string fileName = Path.Substring(Path.LastIndexOf('/') + 1).Replace('*', ' ').Trim();
                    string fileMau = Server.MapPath(Path);
                    string fileKQ = Server.MapPath($"~/Dinhkem/" + NTSSession.GetDonVi().MaDonVi + "/VanBan/" + PathChiTiet + "/" + fileName);
                    string url = $"~/Dinhkem/" + NTSSession.GetDonVi().MaDonVi + "/VanBan/" + PathChiTiet;
                    if (!System.IO.Directory.Exists(Server.MapPath(url)))
                    {
                        System.IO.Directory.CreateDirectory(Server.MapPath(url));
                    }
                    //DirectoryInfo di = new DirectoryInfo(fileMau);
                    //try
                    //{
                    //    FileInfo[] rgFiles = di.GetFiles();
                    //    foreach (FileInfo fi in rgFiles)
                    //    {
                    //        fi.Delete();
                    //    }
                    //}
                    //catch (Exception ex)
                    //{
                    //    NTSThongBao.CoLoiXayRa(ex);
                    //}
                    System.IO.File.Copy(fileMau, fileKQ, true);
                    PathTong += $"~/Dinhkem/" + NTSSession.GetDonVi().MaDonVi + "/VanBan/" + PathChiTiet + "/" + fileName + "*";
                }

                if (ID != "")
                {
                    //lấy đường dẫn cũ
                    string pathOld = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT " + cotDinhKem + " FROM dbo." + bangDk + " WHERE " + cotDk + " = '" + DungChung.NormalizationGuid(ID) + "'").ToString();

                    SqlParameter[] para = {
                        new SqlParameter("@TenBang", bangDk), //tên bảng cần update
                        new SqlParameter("@TenCot", cotDinhKem),//tên cột đính kèm
                        new SqlParameter("@Value",  pathOld+PathTong),//path cần lưu
                        new SqlParameter("@TenCotDK",  cotDk),//tên cột khóa chính
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),//khóa chính
                    };
                    DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);
                }
                ep.Result = PathTong;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }
    }
}