using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Apis
{
    public class UploadFilesController : Controller
    {
        // GET: UpLoadDuLieu
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string UploadFiles()
        {
            try
            {
                IServiceProvider provider = (IServiceProvider)(this.HttpContext);
                HttpWorkerRequest worker = (HttpWorkerRequest)provider.GetService(typeof(HttpWorkerRequest));
                String formName = worker.GetKnownRequestHeader(HttpWorkerRequest.HeaderReferer);
                formName = formName.Split('/')[formName.Split('/').Length-1].ToString().Split('.')[0].ToString();
                try
                {
                    string st = NTSSession.GetDonVi().DonViID.ToString();
                    if (NTSSession.GetDonVi().DonViID != null)
                    {
                        //Loại VB phân làm 2 loại
                        //1. Văn bản -- Lưu văn bản
                        //2. Dữ liệu -- Lưu upload
                        //3. Định dạng -- Lưu upload
                        string loaiVB = Request.QueryString["loaiVB"].ToString().ToUpper();
                        string type = Request.QueryString["type"].ToString().ToUpper();
                        string path = "";
                        string tenFile = "";
                        if (loaiVB == "VB")
                        {
                            //path = "~/VanBan/" + Session.GetDonVi().DonViCode + "/" + formName + "/";
                            path = "~/VanBan/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/" + formName + "/";
                        }
                        else if (loaiVB == "CK")
                        {
                            //path = "~/VanBan/" + Session.GetDonVi().DonViCode + "/" + formName + "/";
                            path = "~/ChuKy/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/" + formName + "/";
                        }
                        else if (loaiVB == "HA")
                        {
                            path = "~/HinhAnh/" + NTSSession.GetDonVi().MaDonVi + "/" + formName + "/";
                        }
                        else if (loaiVB == "DL")
                        {
                            path = "~/Upload/" + NTSSession.GetDonVi().MaDonVi + "/" + formName + "/";
                        }
                        else
                        {
                            return JSonHelper.ToJson("Không xác định loại văn bản!");
                        }
                        string listFile = "";
                        if (Request.Files.Count > 0)
                        {
                            HttpFileCollectionBase files = Request.Files;
                            // Kiểm tra tập tin đính kèm
                            for (int i = 0; i < files.Count; i++)
                            {
                                HttpPostedFileBase file = files[i];

                                if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                                {
                                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                    tenFile = testfiles[testfiles.Length - 1];
                                }
                                else
                                {
                                    tenFile = file.FileName;
                                }
                                if (!System.IO.Directory.Exists(Server.MapPath(path)))
                                    System.IO.Directory.CreateDirectory(Server.MapPath(path));
                                DirectoryInfo di = new DirectoryInfo(Server.MapPath(path));
                                FileInfo[] rgFiles = di.GetFiles();
                                //try
                                //{
                                //    foreach (FileInfo fi in rgFiles)
                                //    {
                                //        fi.Delete();
                                //    }
                                //}
                                //catch
                                //{

                                //}
                                if (!System.IO.Directory.Exists(Server.MapPath(path)))
                                {
                                    System.IO.Directory.CreateDirectory(Server.MapPath(path));
                                }
                                else
                                {
                                    if (loaiVB == "DL")
                                    {
                                        Array.ForEach(Directory.GetFiles(Server.MapPath(path)), System.IO.File.Delete);
                                    }
                                }
                                string fileDuocPhepUpload = "";
                                if (type == "")
                                    fileDuocPhepUpload = ".jpg,.jpeg,.png,.pdf,.xls,.xlsx,.doc,.docx,.zip,.rar,.xml,.dwg,.txt,.tsv";
                                else
                                    fileDuocPhepUpload = type;
                                string strDate = DateTime.Now.ToString("ddMMyyhhmmss");
                                string fileExtension = Path.GetExtension(tenFile).Replace("-", "");
                                if (!fileDuocPhepUpload.ToUpper().Contains(fileExtension.ToUpper()))
                                {
                                    return JSonHelper.ToJson("0|Tệp tinh đính kèm không đúng định dạng, bạn vui lòng chọn file khác!");
                                };
                            }
                            ////////////////////////////////////////////////////////

                            for (int i = 0; i < files.Count; i++)
                            {
                                HttpPostedFileBase file = files[i];

                                if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                                {
                                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                    tenFile = testfiles[testfiles.Length - 1];
                                }
                                else
                                {
                                    tenFile = file.FileName;
                                }
                                if (!System.IO.Directory.Exists(Server.MapPath(path)))
                                {
                                    System.IO.Directory.CreateDirectory(Server.MapPath(path));
                                }
                                else
                                {
                                    if (loaiVB == "DL")
                                    {
                                        Array.ForEach(Directory.GetFiles(Server.MapPath(path)), System.IO.File.Delete);
                                    }
                                }
                                string strDate = DateTime.Now.ToString("ddMMyyhhmmss");
                                string fileExtension = Path.GetExtension(tenFile).Replace("-", "");
                                tenFile = tenFile.Substring(tenFile.LastIndexOf("\\\\") + 1);
                                tenFile = tenFile.Substring(0, tenFile.LastIndexOf(fileExtension)) + strDate + fileExtension;
                                tenFile = tenFile.Replace(" ", "").Replace("~", "").Replace("'", "");
                                tenFile = tenFile.Replace("\\", "")
                                                .Replace("?", "-")
                                                .Replace("#", "-")
                                                .Replace("%", "-")
                                                .Replace(":", "-")
                                                .Replace(";", "-")
                                                .Replace("&", "-")
                                                .Replace("=", "-")
                                                .Replace("+", "-")
                                                .Replace("%", "-")
                                                .Replace("[", "-")
                                                .Replace("]", "-")
                                                .Replace("{", "-")
                                                .Replace("}", "-");
                                file.SaveAs(Server.MapPath(path) + tenFile);
                                listFile += path + tenFile + "*";
                            }
                        }
                        if (loaiVB == "DL")
                        {
                            return JSonHelper.ToJson("1|" + listFile.Replace("*", ""));
                        }
                        else
                        {
                            return JSonHelper.ToJson("1|" + listFile);
                        }

                    }
                    else
                    {
                        return JSonHelper.ToJson("-1|Truy cập dữ liệu không hợp lệ, bạn vui lòng đăng nhập lại!");
                    }
                }             
                catch (Exception ex) //truong hop dang nhap tai khoan ugn vien va nha tuyen dung
                {                    
                    
                    //Loại VB phân làm 2 loại
                    //1. Văn bản -- Lưu văn bản
                    //2. Dữ liệu -- Lưu upload
                    //3. Định dạng -- Lưu upload
                    string loaiVB = Request.QueryString["loaiVB"].ToString().ToUpper();
                    string type = Request.QueryString["type"].ToString().ToUpper();
                    string path = "";
                    string tenFile = "";
                    if (loaiVB == "VB")
                    {
                        //path = "~/VanBan/" + Session.GetDonVi().DonViCode + "/" + formName + "/";
                        path = "~/DinhKem/" + formName + "/";
                    }
                    else if (loaiVB == "HA")
                    {
                        path = "~/HinhAnh/"+ formName + "/";
                    }
                    else if (loaiVB == "DL")
                    {
                        path = "~/Upload/" + formName + "/";
                    }
                    else
                    {
                        return JSonHelper.ToJson("Không xác định loại văn bản!");
                    }
                    string listFile = "";
                    if (Request.Files.Count > 0)
                    {
                        HttpFileCollectionBase files = Request.Files;
                        // Kiểm tra tập tin đính kèm
                        for (int i = 0; i < files.Count; i++)
                        {
                            HttpPostedFileBase file = files[i];

                            if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                            {
                                string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                tenFile = testfiles[testfiles.Length - 1];
                            }
                            else
                            {
                                tenFile = file.FileName;
                            }
                            if (!System.IO.Directory.Exists(Server.MapPath(path)))
                                System.IO.Directory.CreateDirectory(Server.MapPath(path));
                            DirectoryInfo di = new DirectoryInfo(Server.MapPath(path));
                            FileInfo[] rgFiles = di.GetFiles();
                            //try
                            //{
                            //    foreach (FileInfo fi in rgFiles)
                            //    {
                            //        fi.Delete();
                            //    }
                            //}
                            //catch
                            //{

                            //}
                            if (!System.IO.Directory.Exists(Server.MapPath(path)))
                            {
                                System.IO.Directory.CreateDirectory(Server.MapPath(path));
                            }
                            else
                            {
                                if (loaiVB == "DL")
                                {
                                    Array.ForEach(Directory.GetFiles(Server.MapPath(path)), System.IO.File.Delete);
                                }
                            }
                            string fileDuocPhepUpload = "";
                            if (type == "")
                                fileDuocPhepUpload = ".jpg,.jpeg,.png,.pdf,.xls,.xlsx,.doc,.docx,.zip,.rar,.xml,.dwg,.txt,.tsv";
                            else
                                fileDuocPhepUpload = type;
                            string strDate = DateTime.Now.ToString("ddMMyyhhmmss");
                            string fileExtension = Path.GetExtension(tenFile).Replace("-", "");
                            if (!fileDuocPhepUpload.ToUpper().Contains(fileExtension.ToUpper()))
                            {
                                return JSonHelper.ToJson("0|Tệp tinh đính kèm không đúng định dạng, bạn vui lòng chọn file khác!");
                            };
                        }
                        ////////////////////////////////////////////////////////

                        for (int i = 0; i < files.Count; i++)
                        {
                            HttpPostedFileBase file = files[i];

                            if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                            {
                                string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                tenFile = testfiles[testfiles.Length - 1];
                            }
                            else
                            {
                                tenFile = file.FileName;
                            }
                            if (!System.IO.Directory.Exists(Server.MapPath(path)))
                            {
                                System.IO.Directory.CreateDirectory(Server.MapPath(path));
                            }
                            else
                            {
                                if (loaiVB == "DL")
                                {
                                    Array.ForEach(Directory.GetFiles(Server.MapPath(path)), System.IO.File.Delete);
                                }
                            }
                            string strDate = DateTime.Now.ToString("ddMMyyhhmmss");
                            string fileExtension = Path.GetExtension(tenFile).Replace("-", "");
                            tenFile = tenFile.Substring(tenFile.LastIndexOf("\\\\") + 1);
                            tenFile = tenFile.Substring(0, tenFile.LastIndexOf(fileExtension)) + strDate + fileExtension;
                            tenFile = tenFile.Replace(" ", "").Replace("~", "").Replace("'", "");
                            tenFile = tenFile.Replace("\\", "")
                                            .Replace("?", "-")
                                            .Replace("#", "-")
                                            .Replace("%", "-")
                                            .Replace(":", "-")
                                            .Replace(";", "-")
                                            .Replace("&", "-")
                                            .Replace("=", "-")
                                            .Replace("+", "-")
                                            .Replace("%", "-")
                                            .Replace("[", "-")
                                            .Replace("]", "-")
                                            .Replace("{", "-")
                                            .Replace("}", "-");
                            file.SaveAs(Server.MapPath(path) + tenFile);
                            listFile += path + tenFile + "*";
                        }
                    }
                    if (loaiVB == "DL")
                    {
                        return JSonHelper.ToJson("1|" + listFile.Replace("*", ""));
                    }
                    else
                    {
                        return JSonHelper.ToJson("1|" + listFile);
                    }
                    
                }
                
            }
            catch(Exception ex)
            {
                return JSonHelper.ToJson("-1|Tải file đến máy chủ thấy bại! "+ex.ToString());
            }
        }

        [HttpPost]
        public string UploadFiles_ToKhaiTGXH()
        {
            try
            {
                IServiceProvider provider = (IServiceProvider)(this.HttpContext);
                HttpWorkerRequest worker = (HttpWorkerRequest)provider.GetService(typeof(HttpWorkerRequest));
                String formName = worker.GetKnownRequestHeader(HttpWorkerRequest.HeaderReferer);
                string[] separator = new string[] { "?id=" };
                string[] parts = formName.Split(separator, StringSplitOptions.None);
                formName = parts[0];
                formName = formName.Split('/')[formName.Split('/').Length - 1].ToString().Split('.')[0].ToString();
                string st = NTSSession.GetDonVi().DonViID.ToString();
                if (NTSSession.GetDonVi().DonViID != null)
                {
                    //Loại VB phân làm 2 loại
                    //1. Văn bản -- Lưu văn bản
                    //2. Dữ liệu -- Lưu upload
                    //3. Định dạng -- Lưu upload
                    string loaiVB = Request.QueryString["loaiVB"].ToString().ToUpper();
                    string type = Request.QueryString["type"].ToString().ToUpper();
                    string path = "";
                    string tenFile = "";
                    if (loaiVB == "VB")
                    {
                        //path = "~/VanBan/" + Session.GetDonVi().DonViCode + "/" + formName + "/";
                        path = "~/VanBanTemp/" + NTSSession.GetDonVi().MaDonVi + "/" + NTSSession.GetUser().UserGroupCode + "/" + formName + "/";
                    }
                    else if (loaiVB == "HA")
                    {
                        path = "~/HinhAnh/" + NTSSession.GetDonVi().MaDonVi + "/" + formName + "/";
                    }
                    else if (loaiVB == "DL")
                    {
                        path = "~/Upload/" + NTSSession.GetDonVi().MaDonVi + "/" + formName + "/";
                    }
                    else
                    {
                        return JSonHelper.ToJson("Không xác định loại văn bản!");
                    }
                    string listFile = "";
                    if (Request.Files.Count > 0)
                    {
                        HttpFileCollectionBase files = Request.Files;
                        // Kiểm tra tập tin đính kèm
                        for (int i = 0; i < files.Count; i++)
                        {
                            HttpPostedFileBase file = files[i];

                            if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                            {
                                string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                tenFile = testfiles[testfiles.Length - 1];
                            }
                            else
                            {
                                tenFile = file.FileName;
                            }
                            if (!System.IO.Directory.Exists(Server.MapPath(path)))
                                System.IO.Directory.CreateDirectory(Server.MapPath(path));
                            DirectoryInfo di = new DirectoryInfo(Server.MapPath(path));
                            FileInfo[] rgFiles = di.GetFiles();
                            //try
                            //{
                            //    foreach (FileInfo fi in rgFiles)
                            //    {
                            //        fi.Delete();
                            //    }
                            //}
                            //catch
                            //{

                            //}
                            if (!System.IO.Directory.Exists(Server.MapPath(path)))
                            {
                                System.IO.Directory.CreateDirectory(Server.MapPath(path));
                            }
                            else
                            {
                                if (loaiVB == "DL")
                                {
                                    Array.ForEach(Directory.GetFiles(Server.MapPath(path)), System.IO.File.Delete);
                                }
                            }
                            string fileDuocPhepUpload = "";
                            if (type == "")
                                fileDuocPhepUpload = ".jpg,.jpeg,.png,.pdf,.xls,.xlsx,.doc,.docx,.zip,.rar,.xml,.dwg,.txt,.tsv";
                            else
                                fileDuocPhepUpload = type;
                            string strDate = DateTime.Now.ToString("ddMMyyhhmmss");
                            string fileExtension = Path.GetExtension(tenFile).Replace("-", "");
                            if (!fileDuocPhepUpload.ToUpper().Contains(fileExtension.ToUpper()))
                            {
                                return JSonHelper.ToJson("0|Tệp tinh đính kèm không đúng định dạng, bạn vui lòng chọn file khác!");
                            };
                        }
                        ////////////////////////////////////////////////////////

                        for (int i = 0; i < files.Count; i++)
                        {
                            HttpPostedFileBase file = files[i];

                            if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                            {
                                string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                tenFile = testfiles[testfiles.Length - 1];
                            }
                            else
                            {
                                tenFile = file.FileName;
                            }
                            if (!System.IO.Directory.Exists(Server.MapPath(path)))
                            {
                                System.IO.Directory.CreateDirectory(Server.MapPath(path));
                            }
                            else
                            {
                                if (loaiVB == "DL")
                                {
                                    Array.ForEach(Directory.GetFiles(Server.MapPath(path)), System.IO.File.Delete);
                                }
                            }
                            string strDate = DateTime.Now.ToString("ddMMyyhhmmss");
                            string fileExtension = Path.GetExtension(tenFile).Replace("-", "");
                            tenFile = tenFile.Substring(tenFile.LastIndexOf("\\\\") + 1);
                            tenFile = tenFile.Substring(0, tenFile.LastIndexOf(fileExtension)) + strDate + fileExtension;
                            tenFile = tenFile.Replace(" ", "").Replace("~", "").Replace("'", "");
                            tenFile = tenFile.Replace("\\", "")
                                            .Replace("?", "-")
                                            .Replace("#", "-")
                                            .Replace("%", "-")
                                            .Replace(":", "-")
                                            .Replace(";", "-")
                                            .Replace("&", "-")
                                            .Replace("=", "-")
                                            .Replace("+", "-")
                                            .Replace("%", "-")
                                            .Replace("[", "-")
                                            .Replace("]", "-")
                                            .Replace("{", "-")
                                            .Replace("}", "-");
                            file.SaveAs(Server.MapPath(path) + tenFile);
                            listFile += path + tenFile + "*";
                        }
                    }
                    if (loaiVB == "DL")
                    {
                        return JSonHelper.ToJson("1|" + listFile.Replace("*", ""));
                    }
                    else
                    {
                        return JSonHelper.ToJson("1|" + listFile);
                    }

                }
                else
                {
                    return JSonHelper.ToJson("-1|Truy cập dữ liệu không hợp lệ, bạn vui lòng đăng nhập lại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1|Tải file đến máy chủ thấy bại! " + ex.ToString());
            }
        }

    }
}