using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace TTLD2024.Areas.CongThongTin.Controllers
{
    public class DungChungController : Controller
    {
        // GET: CongThongTin/DungChung
        public ActionResult Index()
        {
            return View();
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
                    string fileKQ = Server.MapPath($"~/HinhAnh" + "/"+ bangDk + "/" + PathChiTiet + "/" + fileName);
                    string url = $"~/HinhAnh" + "/" + bangDk + "/" + PathChiTiet;
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
                    PathTong += $"~/HinhAnh" + "/" + bangDk + "/" + PathChiTiet + "/" + fileName + "*";
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
        [HttpPost]
        public string XoaDinhKem(string ID, string duongDan, string bangDk, string cotDk, string loai, string tenCotTrongDB = "")
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
                        new SqlParameter("@TenCot", tenCotTrongDB),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0][tenCotTrongDB].ToString();
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
                        new SqlParameter("@TenCot", tenCotTrongDB),
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
    }
}