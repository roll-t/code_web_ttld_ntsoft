using ImageMagick;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http; 
using TTLD2024.Class;
using TTLD2024.DataConnect;
using TTLD2024.Models;
using WEB_DLL;

namespace TTLD2024.api
{
    public class Permission
    {
        public string MenuCode { get; set; }
        public string TenMenu { get; set; }
        public string Permiss { get; set; }
    }
    public class StringData
    {
        public string str { get; set; }
        public StringData(string s)
        {
            str = s;
        }
        public StringData()
        {
            str = "";
        }
        public override string ToString()
        {
            return str;
        }
    }
    public class DESHelper
    {
        public static readonly byte[] privatekey = UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.PRIVATEKEY);
        public static readonly byte[] publickey = UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.PUBLICKEY);

        public static string Encryption(string strText)
        {

            try
            {
                byte[] inputtextbyteArray = System.Text.UTF8Encoding.UTF8.GetBytes(strText);
                using (DESCryptoServiceProvider dsp = new DESCryptoServiceProvider())
                {
                    var memstr = new MemoryStream();
                    var crystr = new CryptoStream(memstr, dsp.CreateEncryptor(publickey, privatekey), CryptoStreamMode.Write);
                    crystr.Write(inputtextbyteArray, 0, inputtextbyteArray.Length);
                    crystr.FlushFinalBlock();
                    return Convert.ToBase64String(memstr.ToArray());
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string Decryption(string strText)
        {
            try
            {
                byte[] inputtextbyteArray = new byte[strText.Replace(" ", "+").Length];
                inputtextbyteArray = Convert.FromBase64String(strText.Replace(" ", "+"));
                using (DESCryptoServiceProvider dEsp = new DESCryptoServiceProvider())
                {
                    var memstr = new MemoryStream();
                    var crystr = new CryptoStream(memstr, dEsp.CreateDecryptor(publickey, privatekey), CryptoStreamMode.Write);
                    crystr.Write(inputtextbyteArray, 0, inputtextbyteArray.Length);
                    crystr.FlushFinalBlock();
                    return UTF8Encoding.UTF8.GetString(memstr.ToArray());
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
    [Authorize]
    public class NTSController : ApiController
    {
        [AllowAnonymous]
        [Route("api/GetNamSuDung")]
        [HttpPost]
        public ExecPermiss GetNamSuDung()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                execPermiss.Result = NTSSession.GetNamSudung();
                return execPermiss;
            }
            catch (Exception ex)
            {
                execPermiss.Result = DateTime.Now.Year.ToString();
                return execPermiss;
            }
        }
        [AllowAnonymous]
        [Route("api/GetKyBaoCao")]
        [HttpPost]
        public ExecPermiss GetKyBaoCao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(),CommandType.Text, "Select KyBaoCaoID,TenKyBaoCao FROM KyBaoCao").Tables[0];
                ep.Result = duLieu;
                
            }
            catch (Exception ex)
            {
                ep.Result = new DataTable();
            }
            return ep;
        }
        [AllowAnonymous]
        [Route("api/SetWidhtHeight")]
        [HttpPost]
        public ExecPermiss SetWidhtHeight(Screen screen)
        {
            ExecPermiss execPermiss = new ExecPermiss();
            NTSSession.SetWidth(screen.width);
            NTSSession.SetHeight(screen.height);
            execPermiss.Result = new Screen(NTSSession.GetWidth(), NTSSession.GetWidth());
            return execPermiss;
        }
        [AllowAnonymous]
        [Route("api/CapNhatKyBaoCao")]
        [HttpPost]
        public ExecPermiss CapNhatKyBaoCao(string kyBaoCao, string namBaoCao)
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                execPermiss.Result = Class.DungChung.CapNhatNamBaoCao(kyBaoCao, namBaoCao);
                return execPermiss;
            }
            catch (Exception ex)
            {
                execPermiss.Result = false;
                return execPermiss;
            }
        }
        [AllowAnonymous]
        [Route("api/DauTachNhomTienTe")]
        [HttpPost]
        public ExecPermiss DauTachNhomTienTe()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            execPermiss.Result = Class.DungChung.DauTachNhomTienTe();
            return execPermiss;
        }
        [AllowAnonymous]
        [Route("api/DauTachThapPhan")]
        [HttpPost]
        public ExecPermiss DauTachThapPhan()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            execPermiss.Result = Class.DungChung.DauTachThapPhan();
            return execPermiss;
        }
        [AllowAnonymous]
        [Route("api/GetPermission")]
        [HttpPost]
        public ExecPermiss GetPermission()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                string permiss = HttpContext.Current.Session["CurrentPermiss"].ToString();
                if (permiss.Length > 0)
                {
                    string[] per = permiss.Split(';');
                    bool[] _arrayT = Array.ConvertAll(per, s => Convert.ToBoolean(s));
                    execPermiss.Result = _arrayT;
                    return execPermiss;
                }
                return execPermiss;
            }
            catch (Exception ex)
            {
                execPermiss.Err = true;
                return execPermiss;
            }
        }
        [AllowAnonymous]
        [Route("api/KiemTraNgay")]
        [HttpPost]
        public ExecPermiss KiemTraNgay(Newtonsoft.Json.Linq.JObject ChuoiNgay)
        {
            ExecPermiss execPermiss = new ExecPermiss();
            if (!ChuoiNgay.HasValues)
            {
                execPermiss.Result = false;
                return execPermiss;
            }
            string chuoiNgay = ChuoiNgay.First.First.ToString();
            chuoiNgay = chuoiNgay.Replace("-", "/").Trim();
            try
            {
                string[] mangNgay = chuoiNgay.Split('/');
                DateTime.Parse(mangNgay[2] + "/" + mangNgay[1] + "/" + mangNgay[0]);
                execPermiss.Result = true;
                return execPermiss;
            }
            catch (Exception ex)
            {
                execPermiss.Result = false;
                return execPermiss;
            }
        }
        [AllowAnonymous]
        [Route("api/KiemTraNgayHoacNam")]
        [HttpPost]
        public ExecPermiss KiemTraNgayHoacNam(Newtonsoft.Json.Linq.JObject ChuoiNgay)
        {
            ExecPermiss execPermiss = new ExecPermiss();
            if (!ChuoiNgay.HasValues)
            {
                execPermiss.Result = false;
                return execPermiss;
            }
            string chuoiNgay = ChuoiNgay.First.First.ToString();
            chuoiNgay = chuoiNgay.Replace("-", "/").Trim();
            try
            {
                if (chuoiNgay.Length == 4)
                {
                    int.Parse(chuoiNgay);
                    execPermiss.Result = true;
                    return execPermiss;
                }
                else if (chuoiNgay.Length > 4)
                {
                    string[] mangNgay = chuoiNgay.Split('/');
                    DateTime.Parse(mangNgay[2] + "/" + mangNgay[1] + "/" + mangNgay[0]);
                    execPermiss.Result = true;
                    return execPermiss;
                }
                else
                {
                    execPermiss.Result = false;
                    return execPermiss;
                }

            }
            catch (Exception ex)
            {
                execPermiss.Result = false;
                return execPermiss;
            }
        }
        public string connectionStrings = "ConnectionString";
        public string mauHTML1 = $@"
        <table border='0' cellpadding='0' cellspacing='0' style='min-width:500px;border-collapse:collapse;margin: 0 auto;border: 2px solid #126db3;'>
            <tbody>
                <tr style='border: 2px solid #126db3;'>
                    <td valign='middle'>
                        <img src='http://nhattamsoft.vn/Images/NTS-AUTHCODE.jpg' alt='banner' title='banner' style='background-size:cover;width:100%;display:block;background-color:#f7f7f7' class='CToWUd'>
                    </td>
                </tr>
                <tr>
                    <td style='padding:1em;background-color:#f7f7f7;font-size:15px;color:#000'>
                        <p style='color:#000'>Xin chào <span style='font-weight:bold;color:#000'>_tenDangNhap_</span>,</p>
                        <p style='color:#000'>Mã xác thực lấy lại mật khẩu tài khoản NTSOFT của bạn là:</p>
                        <table align='center' border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' style='border-collapse:collapse;height:100%;margin:0;padding:0;width:100%'>
                            <tbody style='color:#000'>
                                <tr style='color:#000'>
                                    <td></td>
                                    <td align='center' valign='top' style='height:100%;margin:0;padding:0;width:100%'>
                                        <p style='font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;width:120px;text-align:center;font-size:25px;vertical-align:middle;margin:0px'><b>_Code_</b></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p style='color:#000'>Mã này sẽ hết hạn sau 5 phút, vui lòng không tiết lộ mã xác thực của bạn cho bất kỳ ai.</p>
                        <div style='color:#000'>Cảm ơn bạn đã sử dụng sản phẩm của <b>NTSOFT</b>!</div>
                        <p style='color:#000'>Trân trọng!</p>
                    </td>
                </tr>
                <tr>
                    <td valign='middle' style='padding:1em;background:#126db3;text-align:center;color:#ffffff;font-size:14px'>
                        <p>Copyright © {DateTime.Now.Year.ToString()} - by <a href='http://nhattamsoft.vn' target='_blank' style='color:#fff'>NTSOFT</a></p>
                        <p>Số H25 Đường Phan Văn Đáng, Phường 8, TP. Vĩnh Long</p>
                    </td>
                </tr>
            </tbody>
        </table>
    ";
        public DataTable getData(string sql)
        {
            try
            {
                string connection = System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString;
                DataTable tabData = new DataTable();
                using (SqlConnection con = new SqlConnection(connection))
                {
                    con.Open();
                    using (SqlCommand command = new SqlCommand(sql, con))
                        tabData.Load(command.ExecuteReader());
                }
                return tabData;
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        public bool excuteSQL(string sql)
        {
            try
            {
                string connection = System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString;
                DataTable tabData = new DataTable();
                using (SqlConnection con = new SqlConnection(connection))
                {
                    con.Open();
                    int complete = 0;
                    using (SqlCommand command = new SqlCommand(sql, con))
                        complete = command.ExecuteNonQuery();
                    if (complete == 1)
                        return true;
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        static string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
        public static void email_send(int port, string sever, string TenEmailGui, string MatKhauEmailGui, string TenEmailNhan, string TenEmailCC, string TieuDe, string NoiDung, string DuongDan)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient(sever);
            mail.From = new MailAddress(TenEmailGui);
            mail.To.Add(TenEmailNhan);

            if (TenEmailCC != "")
            {
                try
                {
                    mail.CC.Add(TenEmailCC);
                }
                catch { }
            }
            mail.Subject = TieuDe;
            mail.Body = NoiDung;
            try
            {
                string[] File = DuongDan.Split('*');
                for (int i = 0; i < File.Length; i++)
                {
                    System.Net.Mail.Attachment attachment;
                    attachment = new System.Net.Mail.Attachment(HttpContext.Current.Server.MapPath(File[i].ToString()));
                    mail.Attachments.Add(attachment);
                }
            }
            catch { }
            SmtpServer.Port = port;
            SmtpServer.Credentials = new System.Net.NetworkCredential(TenEmailGui, MatKhauEmailGui);
            mail.IsBodyHtml = true;
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
        }
        [Route("api/sendAuthCode")]
        [HttpPost]
        public string sendAuthCode(Newtonsoft.Json.Linq.JObject username)
        {
            try
            {
                DataTable tab = getData("SELECT UserID, TenDangNhap, Email FROM dbo.Users WHERE TenDangNhap=N'" + HttpUtility.UrlEncode(username.First.First.ToString()) + "'");
                if (tab.Rows.Count > 0)
                {
                    if (!string.IsNullOrWhiteSpace(tab.Rows[0]["Email"].ToString()))
                    {
                        //Xử lý tạo mã và lưu db
                        int lengthNum = 6;
                        string strCode = "";
                        Random random = new Random();
                        for (int i = 0; i < lengthNum; i++)
                        {
                            strCode += random.Next(0, 9);
                        }
                        //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                        string AuthID = new System.Guid().ToString() + "-" + new System.Guid().ToString();
                        if (excuteSQL($@"UPDATE dbo.Users SET AuthCode=N'{strCode}', TimeAuthOut=DATEADD(MINUTE, 5, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE UserID=N'{tab.Rows[0]["UserID"].ToString()}'"))
                        {
                            //Gửi mail
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 CauHinhEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.CauHinhEmail");
                            if (tabCauHinhGuiMail.Rows.Count > 0)
                            {
                                email_send(port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                    , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                    , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                    , TenEmailNhan: tab.Rows[0]["Email"].ToString()
                                    , TenEmailCC: ""
                                    , TieuDe: "Mã xác thực - NTSOFT"
                                    , NoiDung: mauHTML1.Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["TenDangNhap"].ToString())
                                    , DuongDan: "");
                                return JSonHelper.ToJson("1_" + ComputeSha256Hash(AuthID) + "_Đã gửi mail đến " + tab.Rows[0]["Email"].ToString() + "<br/>Vui lòng kiểm tra mail và nhập mã xác thực!");
                            }
                            else
                                return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                        else
                        {
                            return JSonHelper.ToJson("0_Không thể tạo mã xác thực!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                    }
                    else
                    {
                        //Xử lý tạo mã và lưu db
                        int lengthNum = 6;
                        string strCode = "";
                        Random random = new Random();
                        for (int i = 0; i < lengthNum; i++)
                        {
                            strCode += random.Next(0, 9);
                        }
                        //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                        string AuthID = new System.Guid().ToString() + "-" + new System.Guid().ToString();
                        if (excuteSQL($@"UPDATE dbo.Users SET AuthCode=N'{strCode}', TimeAuthOut=DATEADD(MINUTE, 5, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE UserID=N'{tab.Rows[0]["UserID"].ToString()}'"))
                        {
                            //Gửi mail
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 CauHinhEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.CauHinhEmail  WHERE DonViID='00000000-0000-0000-0000-000000000000'");
                            if (tabCauHinhGuiMail.Rows.Count > 0)
                            {
                                email_send(port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                    , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                    , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                    , TenEmailNhan: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , TenEmailCC: ""
                                    , TieuDe: "Mã xác thực - NTSOFT"
                                    , NoiDung: mauHTML1.Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["TenDangNhap"].ToString())
                                    , DuongDan: "");
                                return JSonHelper.ToJson("1_" + ComputeSha256Hash(AuthID) + "_User chưa được đăng ký địa chỉ Email. <br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                            }
                            else
                                return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                        else
                        {
                            return JSonHelper.ToJson("0_Không thể tạo mã xác thực!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                    }
                    //{
                    //    return JSonHelper.ToJson("0_Tên đăng nhập "+ username + " chưa đăng ký địa chỉ mail trong hệ thống!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    //}
                }
                else
                {
                    return JSonHelper.ToJson("0_Tên đăng nhập " + username + " không tồn tại trong hệ thống!<br/>Vui lòng kiểm tra lại");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_" + ex.ToString());
            }
        }
        [Route("api/checkAuthCode")]
        [HttpPost]
        public string checkAuthCode(Newtonsoft.Json.Linq.JObject code)
        {
            try
            {
                string[] noiDung = code.First.First.ToString().Split('_');
                DataTable tab = getData("SELECT UserID FROM dbo.Users WHERE AuthCode='" + HttpUtility.UrlEncode(noiDung[0]) + "' AND AuthID='" + HttpUtility.UrlEncode(noiDung[1]) + "' AND TimeAuthOut>=getDate()");
                if (tab.Rows.Count > 0)
                {
                    return JSonHelper.ToJson("1_" + noiDung[1] + "_Mã xác thực hợp lệ! Vui lòng đặt lại mật khẩu của bạn!");
                }
                else
                {
                    tab = getData("SELECT UserID FROM dbo.Users WHERE AuthCode='" + HttpUtility.UrlEncode(noiDung[0]) + "' AND AuthID='" + HttpUtility.UrlEncode(noiDung[1]) + "'");
                    if (tab.Rows.Count > 0)
                    {
                        return JSonHelper.ToJson("-2_Mã xác thực đã hết hiệu lực! Vui lòng thao tác lại!");
                    }
                    return JSonHelper.ToJson("0_Mã xác thực không hợp lệ! Vui lòng kiểm tra lại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_" + ex.ToString());
            }
        }
        [Route("api/resetPassword")]
        [HttpPost]
        public string resetPassword(Newtonsoft.Json.Linq.JObject code)
        {
            try
            {
                string[] noiDung = code.First.First.ToString().Split('_');
                DataTable tab = getData("SELECT UserID, TenDangNhap, Email FROM dbo.Users WHERE AuthID=N'" + noiDung[1] + "'");
                if (tab.Rows.Count > 0)
                {
                    //Xử lý tạo mã và lưu db
                    int lengthNum = 6;
                    string strMatMa = WEB_DLL.ntsSecurity._mEncrypt(tab.Rows[0]["TenDangNhap"] + ";" + noiDung[0], PageInfo.KeyMaHoaMatKhau, true); // Hỗ trợ mật mã
                    Random random = new Random();
                    //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                    string AuthID = new System.Guid().ToString() + "-" + new System.Guid().ToString();
                    if (excuteSQL($@"UPDATE dbo.Users SET MatMa=N'{strMatMa}',AuthID='', AuthCode='', TimeAuthOut=NULL  WHERE AuthID=N'{HttpUtility.UrlEncode(noiDung[1])}'"))
                    {
                        return JSonHelper.ToJson("1_Đã cập nhật mật khẩu mới thành công! Vui lòng đăng nhập lại!");
                    }
                    else
                    {
                        return JSonHelper.ToJson("0_Không thể cập nhật mật khẩu mới! Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("0_Mã xác thực không hợp lệ! Vui lòng kiểm tra lại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_" + ex.ToString());
            }
        }
        [Route("api/DonViDangDangNhap")]
        [HttpPost]
        public ExecPermiss DonViDangDangNhap()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                execPermiss.Result = NTSSession.GetDonVi();
                return execPermiss;
            }
            catch (Exception ex)
            {
                execPermiss.Result = new DataTable();
                return execPermiss;
            }
        }
        [Route("api/UserGroupCode")]
        [HttpPost]
        public ExecPermiss UserGroupCode()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                execPermiss.Result = NTSSession.GetUser().UserGroupCode;
                return execPermiss;
            }
            catch (Exception ex)
            {
                execPermiss.Result = new DataTable();
                return execPermiss;
            }
        }
        [Route("api/GetNhatKy")]
        [HttpPost]
        public string GetNhatKy()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@UserID", Class.DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                    new SqlParameter("@NienDo", NTSSession.GetNamSudung().ToString()),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhatKyThongBao", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        [Route("apis")]
        public async Task<IHttpActionResult> Api(Data[] datas)
        {
            try
            {
                // kiểm tra nếu k có proc thì return lỗi.
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (!query.ContainsKey("proc"))
                    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                var proc = NTSTrim(query["proc"]);

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = getClaim((query.ContainsKey("dbuser") && query["dbuser"].ToString().Equals("1"))
                    ? "ConnectUSER_Encode" : "ConnectData_Encode", true);

                // Convert datas -> SqlParameter
                SqlParameter[] parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [HttpPost]
        [Route("taomatutang")]
        public async Task<IHttpActionResult> taomatutang(Data[] datas)
        //(string kyhieuLoaiPhieu, string bangDuLieu, string cotDuLieu, string dieuKienTruyVan, string ngayLoc)
        {
            try
            {
                DataTable resultData = new DataTable();
                resultData.Columns.Add("Ma");
                DataRow dr = resultData.NewRow();
                dr["Ma"] = "";
                resultData.Rows.Add(dr);
                string ChuoiMau = "";

                //var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (datas.Length != 5)
                {
                    resultData.Rows[0]["Ma"] = ChuoiMau;
                    return Ok(new { success = false, data = new DataTable(), message = "Thiếu tham số!" });
                }

                string kyhieuLoaiPhieu = "";
                string bangDuLieu = "";
                string cotDuLieu = "";
                string dieuKienTruyVan = "";
                string ngayLoc = "";

                for (var i = 0; i < datas.Length; i++)
                {
                    if (datas[i].Name == "kyhieuLoaiPhieu")
                        kyhieuLoaiPhieu = datas[i].Value;
                    else if (datas[i].Name == "bangDuLieu")
                        bangDuLieu = datas[i].Value;
                    else if (datas[i].Name == "cotDuLieu")
                        cotDuLieu = datas[i].Value;
                    else if (datas[i].Name == "dieuKienTruyVan")
                        dieuKienTruyVan = datas[i].Value;
                    else if (datas[i].Name == "ngayLoc")
                        ngayLoc = datas[i].Value;
                }

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = getClaim("ConnectData_Encode", true);
                //SqlFunction sqlFun = new SqlFunction(HttpContext.Current.Session.GetConnectionString2());
                DataTable ThongTinChungTu = new DataTable();
                ThongTinChungTu = SqlHelper
                    .ExecuteDataset(connectionString, CommandType.Text, "Select * From LoaiChungTu where LoaiChungTuCode=N'" + kyhieuLoaiPhieu + "'", null).Tables[0];
                //ThongTinChungTu = sqlFun.GetData("Select * From LoaiChungTu where LoaiChungTuCode=N'" + kyhieuLoaiPhieu + "'");
                if (ThongTinChungTu.Rows.Count == 0)
                {
                    return Ok(new { success = true, data = resultData, message = "" });
                }
                else
                {
                    DateTime _vNgayLap = DateTime.Now;
                    string _vKyhieuTruoc = "", _vKyhieuSau = "";
                    decimal _vChieuDaiChuoiTT = 0;
                    bool _vTangTheoThang = false, _vTuTang = false, _vHienDauGach = false;
                    if (!string.IsNullOrEmpty(ngayLoc))
                        _vNgayLap = DateTime.Parse(ngayLoc);
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
                        string SQL = "SELECT MAX(REPLACE(REPLACE(" + cotDuLieu + ",N'" + _vKyhieuTruoc + "',''),N'" + _vKyhieuSau + "','')) From " + bangDuLieu + " WHERE LEFT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuTruoc.Length + ")=N'" + _vKyhieuTruoc + "' AND RIGHT(ISNULL(" + cotDuLieu + ",'')," + _vKyhieuSau.Length + ")=N'" + _vKyhieuSau + "' " + dieuKienTruyVan;
                        //string SoChungTu = sqlFun.GetOneStringField(SQL);
                        string SoChungTu = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, SQL, null).Tables[0].Rows[0][0].ToString();
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
                resultData.Rows[0]["Ma"] = ChuoiMau;
                return Ok(new { success = true, data = resultData, message = "" });
            }
            catch (Exception)
            {
                DataTable resultData = new DataTable();
                DataRow dr = resultData.NewRow();
                dr["Ma"] = "1";
                resultData.Rows.Add(dr);
                return Ok(new { success = true, data = resultData, message = "" });
            }
        }

        [HttpPost]
        [Route("apiV3")]
        public async Task<IHttpActionResult> apiV3(Data[] datas)
        {
            try
            {

                // kiểm tra nếu k có proc thì return lỗi.
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (!query.ContainsKey("proc") || !query.ContainsKey("conn"))
                    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                var proc = NTSTrim(query["proc"]);
                byte[] encryptedBytes = Convert.FromBase64String((NTSTrim(query["conn"])).Replace(" ", "+"));

                var conn = NTSSecurity.Decrypt(encryptedBytes, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                //string connectionString = ntsSecurity.getConnectString(conn);
                string connectionString = conn;
                if (connectionString == "")
                {
                    return Ok(new { success = false, data = "", message = "Kiểm tra lại kết nối!" });
                }
                // Convert datas -> SqlParameter
                SqlParameter[] parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }


        [HttpPost]
        [Route("getPerMission")]
        public async Task<IHttpActionResult> getPerMission(string UserID)
        {
            try
            {
                string sql = @"select MenuCode,TenMenu,PerMission from UserPermiss pm, Menu mn where  mn.MeNuId=pm.MeNuID and UserID='" + UserID + "' ";

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                string connectionString = getClaim("ConnectUSER_Encode", true);

                // chuyển datas thành SqlParameter
                //Data[] datas = { };
                //if (obj.ContainsKey("data"))
                //    datas = obj["data"].ToObject<Data[]>();
                //var parameters = new SqlParameter[datas.Length];
                //for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                var duLieu = SqlHelper
                    .ExecuteDataset(connectionString, CommandType.Text, sql.ToString(), null).Tables[0];
                Permission[] arr = new Permission[duLieu.Rows.Count];


                for (int i = 0; i < duLieu.Rows.Count; i++)
                {
                    string CurrentPermiss = "";
                    string _vPermiss = duLieu.Rows[i]["PerMission"].ToString();
                    _vPermiss = NTSSecurity._mDecrypt(duLieu.Rows[i]["PerMission"].ToString(), "rateAnd2012", true).Split(';')[2];
                    CurrentPermiss += NTSSecurity.HasPermission(TypeAudit.View, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.AddNew, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.Delete, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.Edit, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.LoadData, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.Print, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.PlusP1, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.PlusP2, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    CurrentPermiss += ";" + NTSSecurity.HasPermission(TypeAudit.PlusP3, Convert.ToInt32(_vPermiss)).ToString().ToLower();
                    arr[i] = new Permission()
                    {
                        MenuCode = duLieu.Rows[i]["MenuCode"].ToString(),
                        TenMenu = duLieu.Rows[i]["TenMenu"].ToString(),
                        Permiss = CurrentPermiss
                    };
                }
                return Ok(new { success = true, data = arr, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "Truy vấn không thể thực hiện!", message = e.Message });
            }
        }

        [HttpPost]
        [Route("kiemTraXoaTTLD")]
        public IHttpActionResult kiemTraXoaTTLD(string giaTri, string cotKhoaChinh, string tenBangXoa, string ListBangKhongKtra, string namSuDung)
        {
            try
            {
                //// kiểm tra nếu k có proc thì return lỗi.
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                //if (!query.ContainsKey("proc"))
                //    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                //var proc = NTSTrim(query["proc"]);

                ////kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = getClaim("ConnectData_Encode", true);
                //string connectionString = getClaim("ConnectData_Encode", true);

                //// Convert datas -> SqlParameter
                //SqlParameter[] parameters = new SqlParameter[datas.Length];
                //for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                //var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                //SqlFunction _sqlClass = new SqlFunction(HttpContext.Current.Session.GetConnectionString2());
                string giaiQuyetVL = "";
                if (tenBangXoa.Contains("CungLDCT_"))
                {
                    //DataTable tabCung = _sqlClass.GetData(@"
                    //SELECT t.name AS tableName, c.name AS columnName 
                    //FROM sys.tables as t 
                    //INNER JOIN sys.columns AS c ON t.object_id=c.object_id 
                    //WHERE c.name LIKE '" + cotKhoaChinh + @"%'");
                    DataTable tabCung = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, @"
                    SELECT t.name AS tableName, c.name AS columnName 
                    FROM sys.tables as t 
                    INNER JOIN sys.columns AS c ON t.object_id=c.object_id 
                    WHERE c.name LIKE '" + cotKhoaChinh + @"%'", null).Tables[0];

                    foreach (DataRow item in tabCung.Rows)
                    {
                        if (item["tableName"].ToString().Contains("CungLDCT_") && !item["tableName"].ToString().Contains(tenBangXoa))
                        {
                            ListBangKhongKtra += "," + item["tableName"].ToString();
                        }
                    }
                }
                if (tenBangXoa.Contains("HoGiaDinh_"))
                {
                    DataTable tabCung = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, @"
                    SELECT t.name AS tableName, c.name AS columnName 
                    FROM sys.tables as t 
                    INNER JOIN sys.columns AS c ON t.object_id=c.object_id 
                    WHERE c.name LIKE '" + cotKhoaChinh + @"%'", null).Tables[0];

                    foreach (DataRow item in tabCung.Rows)
                    {
                        if (item["tableName"].ToString().Contains("HoGiaDinh_") && !item["tableName"].ToString().Contains(tenBangXoa))
                        {
                            ListBangKhongKtra += "," + item["tableName"].ToString();
                        }
                    }
                }
                string strSQL = @"SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE N'" + cotKhoaChinh.ToString() + "%' "
                    + (ListBangKhongKtra.ToString() == "" ? (" AND TABLE_NAME NOT IN ('" + tenBangXoa + "')") : " AND TABLE_NAME NOT IN ('" + ListBangKhongKtra.Replace(",", "','") + "','" + tenBangXoa + "'" + ")");
                DataTable _dt = new DataTable();
                _dt = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, strSQL, null).Tables[0];
                strSQL = ""; // gán lại giá trị là rỗng
                string kq = "";
                if (_dt.Rows.Count > 0)
                {
                    try
                    {
                        foreach (DataRow dr in _dt.Rows)
                        {

                            // kiểm tra xóa với chứng từ giải quyết VL tại năm thao tác
                            //if (tenBangXoa.Contains("CungLDCT_"))
                            //{
                            //    if (dr[0].ToString().Contains("GiaiQuyetVL"))
                            //    {
                            //        strSQL = @"SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "' AND YEAR(NgayLap)='" + namSuDung + "'";
                            //    }
                            //}
                            //else
                            if (tenBangXoa.Contains("HoGiaDinh_"))
                            {
                                if (dr[0].ToString().Contains("CungLDCT_" + tenBangXoa.Split('_')[1]))
                                {
                                    strSQL = strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                                }
                                if (dr[0].ToString().Contains("CungLD_" + tenBangXoa.Split('_')[1]))
                                {
                                    strSQL = strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                                }
                            }
                            else
                            {
                                strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                            }

                            if (CheckHasRecord(connectionString, strSQL))
                                kq += dr[0].ToString();
                            //kq += "<tr><td>" + _sqlClass.GetOneStringField("SELECT NoiDungThongBao FROM dbo.ThongBaoLoi WHERE TenBang=N'" + dr[0].ToString() + "'") + "</td></tr>";
                        }
                    }
                    catch
                    {
                        return Ok(new { success = true, data = "", message = "" });
                    }
                }
                // kiểm tra quan hệ cha con bảng được xoá
                strSQL = @"SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE N'" + cotKhoaChinh + "_%' AND TABLE_NAME IN ('" + tenBangXoa + "')";
                _dt.Clear();
                _dt = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, strSQL, null).Tables[0];
                if (_dt.Rows.Count > 0)
                {
                    try
                    {
                        foreach (DataRow dr in _dt.Rows)
                        {
                            strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                            if (CheckHasRecord(connectionString, strSQL))
                                kq += dr[0].ToString();
                        }
                    }
                    catch
                    {
                        return Ok(new { success = true, data = "", message = "" });
                    }
                }
                //return kq;

                return Ok(new { success = true, data = kq, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [HttpPost]
        [Route("kiemTraXoaTTLD_OnDB")]
        public IHttpActionResult kiemTraXoaTTLD_OnDB(string giaTri, string cotKhoaChinh, string tenBangXoa, string ListBangKhongKtra, string namSuDung, string connStr)
        {
            try
            {

                //// kiểm tra nếu k có proc thì return lỗi.
                //if (!query.ContainsKey("proc"))
                //    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                //var proc = NTSTrim(query["proc"]);

                ////kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (!query.ContainsKey("connStr"))
                    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                var conn = NTSTrim(query["connStr"]);

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = NTSSecurity.getConnectString(conn);
                if (connectionString == "")
                {
                    return Ok(new { success = false, data = "", message = "Kiểm tra lại kết nối!" });
                }
                //string connectionString = getClaim("ConnectData_Encode", true);

                //// Convert datas -> SqlParameter
                //SqlParameter[] parameters = new SqlParameter[datas.Length];
                //for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                //var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                //SqlFunction _sqlClass = new SqlFunction(HttpContext.Current.Session.GetConnectionString2());
                string giaiQuyetVL = "";
                if (tenBangXoa.Contains("CungLDCT_"))
                {
                    //DataTable tabCung = _sqlClass.GetData(@"
                    //SELECT t.name AS tableName, c.name AS columnName 
                    //FROM sys.tables as t 
                    //INNER JOIN sys.columns AS c ON t.object_id=c.object_id 
                    //WHERE c.name LIKE '" + cotKhoaChinh + @"%'");
                    DataTable tabCung = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, @"
                    SELECT t.name AS tableName, c.name AS columnName 
                    FROM sys.tables as t 
                    INNER JOIN sys.columns AS c ON t.object_id=c.object_id 
                    WHERE c.name LIKE '" + cotKhoaChinh + @"%'", null).Tables[0];

                    foreach (DataRow item in tabCung.Rows)
                    {
                        if (item["tableName"].ToString().Contains("CungLDCT_") && !item["tableName"].ToString().Contains(tenBangXoa))
                        {
                            ListBangKhongKtra += "," + item["tableName"].ToString();
                        }
                    }
                }
                if (tenBangXoa.Contains("HoGiaDinh_"))
                {
                    DataTable tabCung = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, @"
                    SELECT t.name AS tableName, c.name AS columnName 
                    FROM sys.tables as t 
                    INNER JOIN sys.columns AS c ON t.object_id=c.object_id 
                    WHERE c.name LIKE '" + cotKhoaChinh + @"%'", null).Tables[0];

                    foreach (DataRow item in tabCung.Rows)
                    {
                        if (item["tableName"].ToString().Contains("HoGiaDinh_") && !item["tableName"].ToString().Contains(tenBangXoa))
                        {
                            ListBangKhongKtra += "," + item["tableName"].ToString();
                        }
                    }
                }
                string strSQL = @"SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE N'" + cotKhoaChinh.ToString() + "%' "
                    + (ListBangKhongKtra.ToString() == "" ? (" AND TABLE_NAME NOT IN ('" + tenBangXoa + "')") : " AND TABLE_NAME NOT IN ('" + ListBangKhongKtra.Replace(",", "','") + "','" + tenBangXoa + "'" + ")");
                DataTable _dt = new DataTable();
                _dt = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, strSQL, null).Tables[0];
                strSQL = ""; // gán lại giá trị là rỗng
                string kq = "";
                if (_dt.Rows.Count > 0)
                {
                    try
                    {
                        foreach (DataRow dr in _dt.Rows)
                        {

                            // kiểm tra xóa với chứng từ giải quyết VL tại năm thao tác
                            //if (tenBangXoa.Contains("CungLDCT_"))
                            //{
                            //    if (dr[0].ToString().Contains("GiaiQuyetVL"))
                            //    {
                            //        strSQL = @"SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "' AND YEAR(NgayLap)='" + namSuDung + "'";
                            //    }
                            //}
                            //else
                            if (tenBangXoa.Contains("HoGiaDinh_"))
                            {
                                if (dr[0].ToString().Contains("CungLDCT_" + tenBangXoa.Split('_')[1]))
                                {
                                    strSQL = strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                                }
                                if (dr[0].ToString().Contains("CungLD_" + tenBangXoa.Split('_')[1]))
                                {
                                    strSQL = strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                                }
                            }
                            else
                            {
                                strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                            }

                            if (CheckHasRecord(connectionString, strSQL))
                                kq += dr[0].ToString();
                            //kq += "<tr><td>" + _sqlClass.GetOneStringField("SELECT NoiDungThongBao FROM dbo.ThongBaoLoi WHERE TenBang=N'" + dr[0].ToString() + "'") + "</td></tr>";
                        }
                    }
                    catch
                    {
                        return Ok(new { success = true, data = "", message = "" });
                    }
                }
                // kiểm tra quan hệ cha con bảng được xoá
                strSQL = @"SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE N'" + cotKhoaChinh + "_%' AND TABLE_NAME IN ('" + tenBangXoa + "')";
                _dt.Clear();
                _dt = SqlHelper.ExecuteDataset(connectionString, CommandType.Text, strSQL, null).Tables[0];
                if (_dt.Rows.Count > 0)
                {
                    try
                    {
                        foreach (DataRow dr in _dt.Rows)
                        {
                            strSQL = "SELECT " + dr[1].ToString() + " FROM " + dr[0].ToString() + " WHERE " + dr[1].ToString() + "  = N'" + giaTri + "'";
                            if (CheckHasRecord(connectionString, strSQL))
                                kq += dr[0].ToString();
                        }
                    }
                    catch
                    {
                        return Ok(new { success = true, data = "", message = "" });
                    }
                }
                //return kq;

                return Ok(new { success = true, data = kq, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        public bool CheckHasRecord(string conn, string sql)
        {
            try
            {
                DataTable dataTable = new DataTable();
                dataTable = SqlHelper.ExecuteDataset(conn, CommandType.Text, sql, null).Tables[0];
                return (dataTable != null && dataTable.Rows.Count > 0) ? true : false;
            }
            catch
            {
                return false;
            }
        }


        [HttpPost]
        [Route("apiQLCV")]
        public IHttpActionResult ApiQLCV(Data[] datas)
        {
            try
            {
                // kiểm tra nếu k có proc thì return lỗi.
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (!query.ContainsKey("proc"))
                    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                var proc = NTSTrim(query["proc"]);

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = TTLD2024.Models.CONFIG.CONNECT2;

                // Convert datas -> SqlParameter
                SqlParameter[] parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }
        // chạy lệnh procedure và trả về <chuỗi>
        [HttpPost]
        [Route("api2")]
        public IHttpActionResult Api2(Data[] datas)
        {
            try
            {
                // kiểm tra nếu k có proc thì return lỗi.
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (!query.ContainsKey("proc"))
                    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                var proc = NTSTrim(query["proc"]);

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = getClaim((query.ContainsKey("dbuser") && query["dbuser"].ToString().Equals("1"))
                    ? "ConnectUSER_Encode" : "ConnectData_Encode", true);

                // Convert datas -> SqlParameter
                SqlParameter[] parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();
                var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // kiểm tra token hợp lệ
        [AllowAnonymous]
        [HttpPost]
        [Route("checktoken")]
        public bool CheckToken(StringData token)
        {
            try
            {
                string strToken = token.ToString();
                if (!String.IsNullOrEmpty(strToken)) strToken = strToken.Replace("Bearer ", "");
                JwtHelper.ValidateJwtToken(strToken);
                return true;
            }
            catch (Exception e) { }

            return false;
        }

        // trả về <chuỗi> csdl lấy từ bảng CSDL_Mobile
        [AllowAnonymous]
        [HttpGet]
        [Route("csdl_ApiSK")]
        public IHttpActionResult Csdl_ApiSK(string app)
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringQLCV"].ConnectionString;
            try
            {
                SqlParameter[] parameters = {
                    new SqlParameter("@PhanMemCode", app)
                };

                var duLieu = SqlHelper.ExecuteDataset(connectionString, CommandType.Text,
                    "SELECT TieuDeSuKien=TieuDeSuKien, NoiDung=NoiDung, TieuDeDuongDan=TieuDeDuongDan, DuongDan=DuongDan FROM dbo.SuKien WHERE (GETDATE() BETWEEN TuNgay AND DenNgay) AND (SELECT PhanMemCode FROM dbo.PhanMem WHERE PhanMemID=SuKien.PhanMemID) =@PhanMemCode", parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }

        // trả về <chuỗi> csdl lấy từ bảng CSDL_Mobile
        [AllowAnonymous]
        [HttpGet]
        [Route("csdl")]
        public IHttpActionResult Csdl(string app)
        {
            try
            {
                SqlParameter[] parameters = { new SqlParameter("@TenApp", app) };

                //var duLieu = SqlHelper.ExecuteDataset(Config.CONNECT, CommandType.Text,
                //    "SELECT ID, TenApp, TenSite, SiteURL, DBData_Name=ISNULL(DBData_Name,''),DBDUser_Name=ISNULL(DBDUser_Name,'') FROM dbo.CSDL_Mobile WHERE NgungSD = 0 AND TenApp = @TenApp order by DBData_Name,TenSite", parameters).Tables[0];
                var duLieu = SqlHelper.ExecuteDataset(Models.CONFIG.CONNECT, CommandType.StoredProcedure,
                    "Proc_Mobile_GetCSDL", parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("csdl2")]
        public IHttpActionResult Csdl2(string app)
        {
            try
            {
                SqlParameter[] parameters = { new SqlParameter("@TenApp", app) };

                var duLieu = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.Text,
                    "SELECT ID, TenApp, TenSite, SiteURL FROM dbo.CSDL_Mobile WHERE NgungSD = 0 AND TenApp = @TenApp", parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }
        // trả về <mảng> csdl lấy từ bảng CSDL_Mobile
        [AllowAnonymous]
        [HttpGet]
        [Route("donvi")]
        public IHttpActionResult DonVi(string app)
        {
            try
            {
                SqlParameter[] parameters = { new SqlParameter("@TenApp", app) };


                var duLieu = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.StoredProcedure,
                "Proc_Mobile_GetCSDL_DonVi", parameters).Tables[0];
                return Ok(new { success = true, data = (duLieu), message = "" });
                //var duLieu = SqlHelper.ExecuteDataset(Config.CONNECT, CommandType.Text,
                //    "SELECT ID, TenApp, TenSite, SiteURL FROM dbo.CSDL_Mobile WHERE NgungSD = 0 AND TenApp = @TenApp", parameters).Tables[0];
                //return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }

        // đổi mật khẩu
        [HttpPost]
        [Route("doimatkhau")]
        public IHttpActionResult DoiMatKhau(JObject obj)
        {
            try
            {
                // kiểm tra có sql không
                if (!obj.ContainsKey("MatKhau") || !obj.ContainsKey("MatKhauMoi")) return Ok(new { success = false, data = "", message = "Thiếu tham số!" });

                string connectionString = getClaim("ConnectUSER_Encode", true);

                string tenDangNhap = getClaim("TenDangNhap");

                string sql = "UPDATE dbo.Users SET MatMa = @MatKhauMoi OUTPUT Inserted.* WHERE MatMa = @MatKhauCu AND TenDangNhap = @TenDangNhap";

                if (obj.ContainsKey("Old") && obj["Old"].ToString().Equals("1"))
                {
                    sql = "UPDATE dbo.tblUsers SET MatMa = @MatKhauMoi OUTPUT Inserted.* WHERE MatMa = @MatKhauCu AND TenDangNhap = @TenDangNhap";
                }

                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@MatKhauMoi",
                        ntsSecurity._mEncrypt((tenDangNhap + ";" + obj["MatKhauMoi"]), NTSSecurity.KeyPassWord1, true)),
                    new SqlParameter("@MatKhauCu",
                        ntsSecurity._mEncrypt((tenDangNhap + ";" + obj["MatKhau"]), NTSSecurity.KeyPassWord1, true)),
                    new SqlParameter("@TenDangNhap", tenDangNhap)
                };
                var duLieu = SqlHelper
                    .ExecuteDataset(connectionString, CommandType.Text, sql, parameters).Tables[0];
                return Ok(new { success = (duLieu.Rows.Count > 0) ? true : false, data = "", message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }


        // chạy lệnh sql và trả về <mảng>
        [HttpPost]
        [Route("exec")]
        public IHttpActionResult exec(JObject obj)
        {
            try
            {
                // kiểm tra có sql không
                if (!obj.ContainsKey("sql")) return Ok(new { success = false, data = "", message = "Thiếu lệnh sql!" });

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                string connectionString = getClaim((query.ContainsKey("dbuser") && query["dbuser"].ToString().Equals("1"))
                    ? "ConnectUSER_Encode" : "ConnectData_Encode", true);

                // chuyển datas thành SqlParameter
                Data[] datas = { };
                if (obj.ContainsKey("data"))
                    datas = obj["data"].ToObject<Data[]>();
                var parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();


                var duLieu = SqlHelper
                    .ExecuteDataset(connectionString, CommandType.Text, obj["sql"].ToString(), parameters).Tables[0];
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }
        // chạy lệnh sql và trả về <chuỗi>
        [HttpPost]
        [Route("exec2")]
        public IHttpActionResult exec2(JObject obj)
        {
            try
            {
                // kiểm tra có sql không
                if (!obj.ContainsKey("sql")) return Ok(new { success = false, data = "", message = "Thiếu lệnh sql!" });

                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                string connectionString = getClaim((query.ContainsKey("dbuser") && query["dbuser"].ToString().Equals("1"))
                    ? "ConnectUSER_Encode" : "ConnectData_Encode", true);

                // chuyển datas thành SqlParameter
                Data[] datas = { };
                if (obj.ContainsKey("data"))
                    datas = obj["data"].ToObject<Data[]>();
                var parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();


                var duLieu = SqlHelper
                    .ExecuteDataset(connectionString, CommandType.Text, obj["sql"].ToString(), parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // kiểm tra xóa
        [HttpPost]
        [Route("KTXoa")]
        public IHttpActionResult KTXoa(KTXoaModel data)
        {
            try
            {
                string connectionString = getClaim("ConnectData_Encode", true);
                string stringWhere = "";
                if (data.CacBangKhongXet != null && data.CacBangKhongXet.Length != 0)
                {
                    stringWhere = " AND ThongBaoLoiCode not in (";
                    for (int i = 0; i < data.CacBangKhongXet.Length; i++)
                    {
                        if (i == 0)
                        {
                            stringWhere += "'" + data.CacBangKhongXet[i] + "'";
                        }
                        else
                        {
                            stringWhere += ",'" + data.CacBangKhongXet[i] + "'";
                        }
                    }
                    stringWhere += ")";
                }

                string strSQL = "select ThongBaoLoiCode, NoiDung from ThongBaoLoi where ThongBaoLoiCode in (SELECT TABLE_NAME tablename FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = @TenCot) and ThongBaoLoiCode <> @TenBangHienTai" + stringWhere;
                SqlParameter[] parameters = { new SqlParameter("@TenCot", data.TenCot), new SqlParameter("@TenBangHienTai", data.TenBangHienTai) };
                var duLieu = SqlHelper.ExecuteDataset(connectionString, CommandType.Text,
                    strSQL, parameters).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    List<string> eRR = new List<string>();
                    try
                    {
                        for (int i = 0; i < duLieu.Rows.Count; i++)
                        {
                            strSQL = "select " + data.TenCot + " from " + duLieu.Rows[i][0] + " where " + data.TenCot + " =N'" + data.ID + "'";
                            var duLieu2 = SqlHelper.ExecuteDataset(connectionString, CommandType.Text,
                                strSQL, null).Tables[0];

                            if (duLieu2.Rows.Count > 0)
                                eRR.Add(duLieu.Rows[i][1].ToString());
                        }
                    }
                    catch (Exception ex)
                    {
                        return Ok(new { success = true, data = eRR, message = ex.Message });
                    }
                    return Ok(new { success = true, data = eRR, message = "" });
                }

                return Ok(new { success = true, data = "", message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // kiểm tra tồn tại (khi thêm)
        [HttpPost]
        [Route("KTTonTai")]
        public IHttpActionResult KTTonTai(KTTonTaiModel data)
        {
            try
            {
                string connectionString = getClaim("ConnectData_Encode", true);

                string stSQL = "select ketQua=(case when count(" + data.TenCot + ") > 0 then 'true' else 'false' end) from " + data.TenBang + " where " + data.TenCot + " = '" + data.Ma + "'";
                if (!String.IsNullOrEmpty(data.TenCotDonVi))
                {
                    stSQL += " AND " + data.TenCotDonVi + " = '" + data.MaDonVi + "'";
                }

                var duLieu = SqlHelper.ExecuteScalar(connectionString, CommandType.Text, stSQL);
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // kiểm tra tồn tại (khi sửa)
        [HttpPost]
        [Route("KTSua")]
        public IHttpActionResult KTSua(KTSuaModel data)
        {
            try
            {
                string connectionString = getClaim("ConnectData_Encode", true);

                string stSQL = "select ketQua=(case when count(" + data.TenCot + ") > 0 then 'true' else 'false' end) from " + data.TenBang + " where " + data.TenCot + " = '" + data.Ma + "' and " + data.TenCotXet + " not in (select tmp." + data.TenCotXet + " from " + data.TenBang + " tmp where tmp." + data.TenCotXet + " = '" + data.MaID + "')";
                if (!String.IsNullOrEmpty(data.TenCotDonVi))
                {
                    stSQL += " AND " + data.TenCotDonVi + " = '" + data.MaDonVi + "'";
                }
                var duLieu = SqlHelper.ExecuteScalar(connectionString, CommandType.Text, stSQL);
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }
        //Kiểm tra đăng nhập và trả về <mảng> TenDangNhap, token
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login(LoginRequest request)
        {
            try
            {
                //var CSDL = getConnectString(Class.DungChung.NormalizationGuid(request.Database));
                //if (CSDL == null) return Ok(new { success = false, data = "", message = "Kiểm tra lại Database!" });

                SqlParameter[] parameters =
                {
                    new SqlParameter("@TenDangNhap", NTSTrim(request.UserName)), new SqlParameter("@MatMa", ntsSecurity._mEncrypt((request.UserName+";"+NTSTrim(request.Password)),NTSSecurity.KeyPassWord1,true).ToString())
                };

                string sql = "SELECT UserID, TenDangNhap FROM dbo.Users WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                if (request.Old)
                {
                    sql = "SELECT UserID = maNguoidungpr, TenDangNhap FROM dbo.tblUsers WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                }
                //byte[] encryptedBytesUsers = Convert.FromBase64String((NTSTrim(CSDL["ConnectUSER_Encode"].ToString())).Replace(" ", "+"));

                //byte[] encryptedBytesDB = Convert.FromBase64String((NTSTrim(CSDL["ConnectData_Encode"].ToString())).Replace(" ", "+"));


                //var connUsers = NTSSecurity.Decrypt(encryptedBytesUsers, UTF8Encoding.UTF8.GetBytes(CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(CONFIG.IVS));
                var connUsers = ntsDataConnect._mGetConnectStringFromFile1();

                //var connDB = NTSSecurity.Decrypt(encryptedBytesDB, UTF8Encoding.UTF8.GetBytes(CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(CONFIG.IVS));
                var connDB = ntsDataConnect._mGetConnectStringFromFile2();

                //var duLieu = SqlHelper.ExecuteDataset(CSDL["ConnectUSER_Encode"].ToString(), CommandType.Text,
                //    sql, parameters).Tables[0];
                var duLieu = SqlHelper.ExecuteDataset(connUsers, CommandType.Text,
                sql, parameters).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    var user = new Models.User(duLieu.Rows[0]["UserID"].ToString(), duLieu.Rows[0]["TenDangNhap"].ToString(), connUsers, connDB);
                    var token = JwtHelper.CreateJwtToken(user);
                    user.Token = token;
                    return Ok(new { success = true, data = user, message = "" });
                }

                return Ok(new { success = false, data = "", message = "Kiểm tra lại tài khoản hoặc mật khẩu!" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });

            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("getEmailXN")]
        public IHttpActionResult GetEmailGuiXacNhan(StringData request)
        {
            try
            {
                var CSDL = getConnectString(Class.DungChung.NormalizationGuid(request.ToString()));
                if (CSDL == null) return Ok(new { success = false, data = "", message = "Kiểm tra lại Database!" });
                SqlParameter[] parameters =
                {
                    new SqlParameter()
                };

                byte[] encryptedBytesDB = Convert.FromBase64String((NTSTrim(CSDL["ConnectData_Encode"].ToString())).Replace(" ", "+"));

                var connDB = NTSSecurity.Decrypt(encryptedBytesDB, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));

                var duLieu = SqlHelper.ExecuteDataset(connDB, "Proc_Mobile_GetEmailXacNhan", null);
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });

            }
        }

        [HttpGet]
        [Route("getBDApp")]
        public IHttpActionResult getBDApp(string app)
        {
            try
            {
                SqlParameter[] parameters = { new SqlParameter("@TenApp", app) };

                var duLieu = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.StoredProcedure,
                    "Proc_Mobile_GetDBApp", parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("csdl_laptrinh")]
        public IHttpActionResult csdl_laptrinh(string app)
        {
            try
            {
                SqlParameter[] parameters = { new SqlParameter("@TenApp", app) };

                var duLieu = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.StoredProcedure,
                    "Proc_Mobile_GetDBApp_laptrinh", parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }

        [HttpPost]
        [Route("apiOnDB")]
        public async Task<IHttpActionResult> ApiOnDb(Data[] datas)
        {
            try
            {
                // kiểm tra nếu k có proc thì return lỗi.
                var query = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                if (!query.ContainsKey("proc") || !query.ContainsKey("ID"))
                    return Ok(new { success = false, data = "", message = "Thiếu tham số!" });
                string ID = NTSTrim(query["ID"]);
                var CSDL = getConnectString(Class.DungChung.NormalizationGuid(ID));
                if (CSDL == null) return Ok(new { success = false, data = "", message = "Kiểm tra lại Database!" });

                var proc = NTSTrim(query["proc"]);

                byte[] encryptedBytesUsers = Convert.FromBase64String((NTSTrim(CSDL["ConnectUSER_Encode"].ToString())).Replace(" ", "+"));

                byte[] encryptedBytesDB = Convert.FromBase64String((NTSTrim(CSDL["ConnectData_Encode"].ToString())).Replace(" ", "+"));


                var connUsers = NTSSecurity.Decrypt(encryptedBytesUsers, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));

                var connDB = NTSSecurity.Decrypt(encryptedBytesDB, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));


                //kiểm tra nếu dbuser == 1 thì connectionString lấy db User, ngược lại lấy db Data;
                string connectionString = (query.ContainsKey("dbuser") && query["dbuser"].ToString().Equals("1")) ? connUsers : connDB;


                // Convert datas -> SqlParameter
                SqlParameter[] parameters = new SqlParameter[datas.Length];
                for (var i = 0; i < datas.Length; i++) parameters[i] = datas[i].ToSqlParameter();

                var duLieu = SqlHelper.ExecuteDataset(connectionString, proc, parameters).Tables[0];
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        //Kiểm tra đăng nhập và trả về <chuỗi> TenDangNhap, token
        [AllowAnonymous]
        [HttpPost]
        [Route("login_moi")]
        public async Task<IHttpActionResult> Login_moi(LoginRequest request)
        {
            try
            {
                var CSDL = getConnectString(Class.DungChung.NormalizationGuid(request.Database));
                if (CSDL == null) return Ok(new { success = false, data = "", message = "Kiểm tra lại Database!" });

                SqlParameter[] parameters =
                {
                   new SqlParameter("@TenDangNhap", request.UserName), new SqlParameter("@MatMa", ntsSecurity._mEncrypt((request.UserName+";"+request.Password),NTSSecurity.KeyPassWord1,true).ToString())
                };

                //string sql = "SELECT UserID, TenDangNhap FROM dbo.Users WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                //if (request.Old)
                //{
                //    sql = "SELECT UserID = maNguoidungpr, TenDangNhap FROM dbo.tblUsers WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                //}
                byte[] encryptedBytesUsers = Convert.FromBase64String((NTSTrim(CSDL["ConnectUSER_Encode"].ToString())).Replace(" ", "+"));

                byte[] encryptedBytesDB = Convert.FromBase64String((NTSTrim(CSDL["ConnectData_Encode"].ToString())).Replace(" ", "+"));


                var connUsers = NTSSecurity.Decrypt(encryptedBytesUsers, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));

                var connDB = NTSSecurity.Decrypt(encryptedBytesDB, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));


                //var duLieu = SqlHelper.ExecuteDataset(CSDL["ConnectUSER_Encode"].ToString(), CommandType.StoredProcedure, "Proc_Mobile_Login", parameters).Tables[0];
                var duLieu = SqlHelper.ExecuteDataset(connUsers, CommandType.StoredProcedure, "Proc_Mobile_Login", parameters).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    var user = new Models.User(duLieu.Rows[0]["UserID"].ToString(), duLieu.Rows[0]["TenDangNhap"].ToString(), connUsers, connDB);
                    var token = JwtHelper.CreateJwtToken(user);
                    user.Token = token;
                    duLieu.Columns.Add("Token", typeof(String));
                    duLieu.Rows[0]["Token"] = token;
                    return Ok(new { success = true, data = duLieu, message = "" });
                }

                return Ok(new { success = false, data = "", message = "Kiểm tra lại tài khoản hoặc mật khẩu!" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });

            }
        } //Kiểm tra đăng nhập và trả về <chuỗi> TenDangNhap, token
        [AllowAnonymous]
        [HttpPost]
        [Route("login_keybanquyen")]
        public IHttpActionResult Login_keybanquyen(LoginRequest request)
        {
            try
            {
                var CSDL = getConnectString(Class.DungChung.NormalizationGuid(request.Database));
                if (CSDL == null) return Ok(new { success = false, data = "", message = "Kiểm tra lại Database!" });

                SqlParameter[] parameters =
                {
                   new SqlParameter("@TenDangNhap", request.UserName), new SqlParameter("@MatMa", ntsSecurity._mEncrypt((request.UserName+";"+request.Password),NTSSecurity.KeyPassWord1,true).ToString())
                };

                //string sql = "SELECT UserID, TenDangNhap FROM dbo.Users WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                //if (request.Old)
                //{
                //    sql = "SELECT UserID = maNguoidungpr, TenDangNhap FROM dbo.tblUsers WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                //}
                byte[] encryptedBytesUsers = Convert.FromBase64String((NTSTrim(CSDL["ConnectUSER_Encode"].ToString())).Replace(" ", "+"));

                byte[] encryptedBytesDB = Convert.FromBase64String((NTSTrim(CSDL["ConnectData_Encode"].ToString())).Replace(" ", "+"));


                var connUsers = NTSSecurity.Decrypt(encryptedBytesUsers, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));

                var connDB = NTSSecurity.Decrypt(encryptedBytesDB, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));


                //var duLieu = SqlHelper.ExecuteDataset(CSDL["ConnectUSER_Encode"].ToString(), CommandType.StoredProcedure, "Proc_Mobile_Login", parameters).Tables[0];
                var duLieu = SqlHelper.ExecuteDataset(connUsers, CommandType.StoredProcedure, "Proc_Mobile_Login", parameters).Tables[0];
                string sqlKeyBangQuyen = "SELECT KeyBanQuyen_Mobile, UserID, TenDangNhap FROM dbo.Users WHERE TenDangNhap = @TenDangNhap AND MatMa = N''+@MatMa";

                SqlParameter[] paracheckKey = { new SqlParameter("@ID", Class.DungChung.NormalizationGuid(request.Database)) };
                var checkKey = SqlHelper.ExecuteScalar(TTLD2024.Models.CONFIG.CONNECT, "Proc_Mobile_CheckLicense", paracheckKey);
                if (Boolean.Parse(checkKey.ToString()))
                {
                    if (duLieu.Rows.Count > 0)
                    {
                        var duLieuKeyBangQuyen = SqlHelper.ExecuteDataset(connUsers, CommandType.Text, sqlKeyBangQuyen, parameters).Tables[0];
                        if (duLieuKeyBangQuyen.Rows.Count > 0)
                        {
                            //                     
                            string sqlcheckNamSD = @"select HanSuDung, KeyBanQuyen from ProductKey where Isnull(Device,1) = 2  and isnull(NgungSD,0) = 0 and isnull(TinhTrang,1) = 2 and KeyBanQuyen = N'" + duLieuKeyBangQuyen.Rows[0]["KeyBanQuyen_Mobile"].ToString() + @"'union all select HanSuDung, KeyBanQuyen from ProductKeyCT where Isnull(Device,1) = 2  and isnull(TrangThai,1) = 2 and KeyBanQuyen = N'" + duLieuKeyBangQuyen.Rows[0]["KeyBanQuyen_Mobile"].ToString() + "'";
                            string connectionStringQLCV = TTLD2024.Models.CONFIG.CONNECT2;
                            var duLieuQLCV = SqlHelper.ExecuteDataset(connectionStringQLCV, CommandType.Text, sqlcheckNamSD, parameters).Tables[0];
                            if (duLieuQLCV.Rows.Count > 0)
                            {
                                //Nếu Hạn sử dụng bằng null thì key bảng quyền vô thời hạn
                                if (duLieuQLCV.Rows[0]["HanSuDung"].ToString() != "")
                                {
                                    if (DateTime.Parse(duLieuQLCV.Rows[0]["HanSuDung"].ToString()) < DateTime.Now.Date)
                                    {
                                        //Có key nhưng hết hạn => Nhập key
                                        return Ok(new { success = false, data = "1", message = "Key bản quyền đã hết hạn!" });
                                    }
                                    else
                                    {
                                        SqlParameter[] para =
                                        {
                                        new SqlParameter("@ID", Class.DungChung.NormalizationGuid(request.Database)),
                                    };
                                        var duLieuTinh = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.Text, "SELECT TenTinh FROM dbo.CSDL_Mobile WHERE ID = @ID", para).Tables[0];
                                        int Tinh = 0;
                                        if (duLieuTinh.Rows[0]["TenTinh"].ToString().Equals("Trà Vinh") || duLieuTinh.Rows[0]["TenTinh"].ToString().Equals("laptrinh"))
                                        {
                                            Tinh = 1;
                                        }

                                        var user = new Models.User(duLieu.Rows[0]["UserID"].ToString(), duLieu.Rows[0]["TenDangNhap"].ToString(), connUsers, connDB);
                                        var token = JwtHelper.CreateJwtToken(user);
                                        user.Token = token;
                                        duLieu.Columns.Add("Token", typeof(String));
                                        duLieu.Rows[0]["Token"] = token;

                                        duLieu.Columns.Add("KeyLicense_En", typeof(String));
                                        duLieu.Columns.Add("KeyLicense_De", typeof(String));
                                        duLieu.Columns.Add("KiemTraGiayPhepSuDung", typeof(String));
                                        duLieu.Rows[0]["KeyLicense_En"] = duLieuQLCV.Rows[0]["KeyBanQuyen"].ToString();
                                        duLieu.Rows[0]["KeyLicense_De"] = ntsSecurity._mDecrypt(duLieuQLCV.Rows[0]["KeyBanQuyen"].ToString(), TTLD2024.Models.CONFIG.KEYBANQUYEN, true);
                                        duLieu.Rows[0]["KiemTraGiayPhepSuDung"] = Tinh;
                                        return Ok(new { success = true, data = duLieu, message = "" });
                                    }
                                }
                                else
                                {
                                    SqlParameter[] para =
                                       {
                                        new SqlParameter("@ID", Class.DungChung.NormalizationGuid(request.Database)),
                                    };
                                    var duLieuTinh = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.Text, "SELECT TenTinh FROM dbo.CSDL_Mobile WHERE ID = @ID", para).Tables[0];
                                    int Tinh = 0;
                                    if (duLieuTinh.Rows[0]["TenTinh"].ToString().Equals("Trà Vinh") || duLieuTinh.Rows[0]["TenTinh"].ToString().Equals("laptrinh"))
                                    {
                                        Tinh = 1;
                                    }

                                    var user = new Models.User(duLieu.Rows[0]["UserID"].ToString(), duLieu.Rows[0]["TenDangNhap"].ToString(), connUsers, connDB);
                                    var token = JwtHelper.CreateJwtToken(user);
                                    user.Token = token;
                                    duLieu.Columns.Add("Token", typeof(String));
                                    duLieu.Rows[0]["Token"] = token;

                                    duLieu.Columns.Add("KeyLicense_En", typeof(String));
                                    duLieu.Columns.Add("KeyLicense_De", typeof(String));
                                    duLieu.Columns.Add("KiemTraGiayPhepSuDung", typeof(String));
                                    duLieu.Rows[0]["KeyLicense_En"] = duLieuQLCV.Rows[0]["KeyBanQuyen"].ToString();
                                    duLieu.Rows[0]["KeyLicense_De"] = ntsSecurity._mDecrypt(duLieuQLCV.Rows[0]["KeyBanQuyen"].ToString(), TTLD2024.Models.CONFIG.KEYBANQUYEN, true);
                                    duLieu.Rows[0]["KiemTraGiayPhepSuDung"] = Tinh;
                                    return Ok(new { success = true, data = duLieu, message = "" });
                                }
                            }
                            else
                            {
                                return Ok(new { success = false, data = "1", message = "Chưa kích hoạt key bản quyền!" });
                            }

                        }
                        else
                        {
                            //Chưa có key => Nhập key
                            return Ok(new { success = false, data = "1", message = "Chưa kích hoạt key bản quyền!" });
                        }

                    }
                }
                else
                {
                    SqlParameter[] para =
                                       {
                                        new SqlParameter("@ID", Class.DungChung.NormalizationGuid(request.Database)),
                                    };
                    var duLieuTinh = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.Text, "SELECT TenTinh FROM dbo.CSDL_Mobile WHERE ID = @ID", para).Tables[0];
                    int Tinh = 0;
                    if (duLieuTinh.Rows[0]["TenTinh"].ToString().Equals("Trà Vinh") || duLieuTinh.Rows[0]["TenTinh"].ToString().Equals("laptrinh"))
                    {
                        Tinh = 1;
                    }

                    var user = new Models.User(duLieu.Rows[0]["UserID"].ToString(), duLieu.Rows[0]["TenDangNhap"].ToString(), connUsers, connDB);
                    var token = JwtHelper.CreateJwtToken(user);
                    user.Token = token;
                    duLieu.Columns.Add("Token", typeof(String));
                    duLieu.Rows[0]["Token"] = token;

                    duLieu.Columns.Add("KeyLicense_En", typeof(String));
                    duLieu.Columns.Add("KeyLicense_De", typeof(String));
                    duLieu.Columns.Add("KiemTraGiayPhepSuDung", typeof(String));
                    duLieu.Rows[0]["KeyLicense_En"] = "";
                    duLieu.Rows[0]["KeyLicense_De"] = "";
                    duLieu.Rows[0]["KiemTraGiayPhepSuDung"] = Tinh;
                    return Ok(new { success = true, data = duLieu, message = "" });

                }


                return Ok(new { success = false, data = "", message = "Kiểm tra lại tài khoản hoặc mật khẩu!" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });

            }
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("nhapkeybanquyen_mobile")]
        public IHttpActionResult NhapKeyBanQuyen_Mobile(LoginRequest request)
        {
            try
            {
                string KeyBanQuyen = ntsSecurity._mEncrypt(request.KeyBanQuyen, TTLD2024.Models.CONFIG.KEYBANQUYEN, true);
                var CSDL = getConnectString(Class.DungChung.NormalizationGuid(request.Database));
                if (CSDL == null) return Ok(new { success = false, data = "", message = "Kiểm tra lại Database!" });

                SqlParameter[] parameters =
                {
                   new SqlParameter("@TenDangNhap", request.UserName), new SqlParameter("@MatMa", ntsSecurity._mEncrypt((request.UserName+";"+request.Password),NTSSecurity.KeyPassWord1,true).ToString())
                };

                byte[] encryptedBytesUsers = Convert.FromBase64String((NTSTrim(CSDL["ConnectUSER_Encode"].ToString())).Replace(" ", "+"));

                byte[] encryptedBytesDB = Convert.FromBase64String((NTSTrim(CSDL["ConnectData_Encode"].ToString())).Replace(" ", "+"));


                var connUsers = NTSSecurity.Decrypt(encryptedBytesUsers, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));

                var connDB = NTSSecurity.Decrypt(encryptedBytesDB, UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.KEYCONNECTDB), UTF8Encoding.UTF8.GetBytes(TTLD2024.Models.CONFIG.IVS));


                //var duLieu = SqlHelper.ExecuteDataset(CSDL["ConnectUSER_Encode"].ToString(), CommandType.StoredProcedure, "Proc_Mobile_Login", parameters).Tables[0];
                var duLieu = SqlHelper.ExecuteDataset(connUsers, CommandType.StoredProcedure, "Proc_Mobile_Login", parameters).Tables[0];
                string sqlKeyBangQuyen = "SELECT UserID, TenDangNhap FROM dbo.Users WHERE TenDangNhap = @TenDangNhap AND MatMa = @MatMa";
                if (duLieu.Rows.Count > 0)
                {
                    var duLieuKeyBangQuyen = SqlHelper.ExecuteDataset(connUsers, CommandType.Text, sqlKeyBangQuyen, parameters).Tables[0];
                    if (duLieuKeyBangQuyen.Rows.Count > 0)
                    {
                        //                     
                        string sqlcheckKeyBanQuyen = @"select ID = ProductKeyID, HanSuDung, NgayKichHoat from ProductKey where  Isnull(Device,1) = 2 and isnull(NgungSD,0) = 0 and isnull(TinhTrang,1) = 1 and isnull(TenDangNhap,'') = ''  and KeyBanQuyen = N'" + KeyBanQuyen + @"'union all select ID = ProductKeyID , HanSuDung, NgayKichHoat from ProductKeyCT where Isnull(Device,1) = 2 and isnull(TrangThai,1) = 1 and isnull(TenDangNhap,'') = '' and  KeyBanQuyen = N'" + KeyBanQuyen + "'";
                        string connectionStringQLCV = TTLD2024.Models.CONFIG.CONNECT2;
                        var duLieuQLCV = SqlHelper.ExecuteDataset(connectionStringQLCV, CommandType.Text, sqlcheckKeyBanQuyen, parameters).Tables[0];
                        //Key nhập bằng key trên hệ thống
                        if (duLieuQLCV.Rows.Count > 0)
                        {

                            //Nếu Hạn sử dụng bằng null thì key bảng quyền vô thời hạn
                            if (duLieuQLCV.Rows[0]["HanSuDung"].ToString() != "")
                            {
                                if (DateTime.Parse(duLieuQLCV.Rows[0]["HanSuDung"].ToString()) < DateTime.Now.Date)
                                {
                                    //Update key 2 bên
                                    //Có key nhưng hết hạn => Nhập key                             
                                    return Ok(new { success = false, data = "1", message = "Key bản quyền đã hết hạn!" });
                                }
                                else
                                {
                                    string sqluser = "UPDATE dbo.Users SET KeyBanQuyen_Mobile = @KeyBanQuyen, NgayKichHoat_Mobile = getdate(), ProductKey_Mobile = @ProductKey_Mobile " +
                            " OUTPUT Inserted.* WHERE UserID = @UserID ";
                                    SqlParameter[] para = new SqlParameter[]
                                     {
                                       new SqlParameter("@UserID",Class.DungChung.NormalizationGuid(duLieuKeyBangQuyen.Rows[0]["UserID"])),
                                        new SqlParameter("@KeyBanQuyen", KeyBanQuyen),
                                        new SqlParameter("@ProductKey_Mobile", Class.DungChung.NormalizationGuid(duLieuQLCV.Rows[0]["ID"].ToString())),
                                     };
                                    var updateUser = SqlHelper
                                        .ExecuteDataset(connUsers, CommandType.Text, sqluser, para).Tables[0];

                                    string sqlproductkey = "UPDATE dbo.ProductKey SET TinhTrang = 2, NgayKichHoat = getdate(), TenDangNhap = @TenDangNhap " +
                                        " OUTPUT Inserted.* WHERE KeyBanQuyen = @KeyBanQuyen and Isnull(Device,1) = 2;";
                                    SqlParameter[] para2 = new SqlParameter[]
                                    {
                                        new SqlParameter("@KeyBanQuyen", KeyBanQuyen),
                                        new SqlParameter("@TenDangNhap", duLieuKeyBangQuyen.Rows[0]["TenDangNhap"].ToString()),
                                    };
                                    var updateproductkey = SqlHelper
                                        .ExecuteDataset(connectionStringQLCV, CommandType.Text, sqlproductkey, para2).Tables[0];

                                    string sqlproductkeyCT = "UPDATE dbo.ProductKeyCT SET TrangThai = 2, NgayKichHoat = getdate(), TenDangNhap = @TenDangNhap " +
                                        " OUTPUT Inserted.* WHERE KeyBanQuyen = @KeyBanQuyen and Isnull(Device,1) = 2; ";
                                    SqlParameter[] para3 = new SqlParameter[]
                                    {
                                        new SqlParameter("@KeyBanQuyen", KeyBanQuyen),
                                        new SqlParameter("@TenDangNhap", duLieuKeyBangQuyen.Rows[0]["TenDangNhap"].ToString()),
                                    };
                                    var updateproductkeyCT = SqlHelper
                                        .ExecuteDataset(connectionStringQLCV, CommandType.Text, sqlproductkeyCT, para3).Tables[0];

                                    if (updateUser.Rows.Count > 0 && (updateproductkey.Rows.Count > 0 || updateproductkeyCT.Rows.Count > 0))
                                    {
                                        return Ok(new { success = true, data = "", message = "Nhập key bản quyền thành công!" });
                                    }
                                    else
                                    {
                                        return Ok(new { success = false, data = "", message = "Cập nhật không thành công!" });
                                    }

                                }
                            }
                            else
                            {
                                string sqluser = "UPDATE dbo.Users SET KeyBanQuyen_Mobile = @KeyBanQuyen, NgayKichHoat_Mobile = getdate(), ProductKey_Mobile = @ProductKey_Mobile " +
                                        " OUTPUT Inserted.* WHERE UserID = @UserID ";
                                SqlParameter[] para = new SqlParameter[]
                                 {
                                       new SqlParameter("@UserID",Class.DungChung.NormalizationGuid(duLieuKeyBangQuyen.Rows[0]["UserID"])),
                                        new SqlParameter("@KeyBanQuyen", KeyBanQuyen),
                                        new SqlParameter("@ProductKey_Mobile", Class.DungChung.NormalizationGuid(duLieuQLCV.Rows[0]["ID"].ToString())),
                                 };
                                var updateUser = SqlHelper
                                    .ExecuteDataset(connUsers, CommandType.Text, sqluser, para).Tables[0];

                                string sqlproductkey = "UPDATE dbo.ProductKey SET TinhTrang = 2, NgayKichHoat = getdate(), TenDangNhap = @TenDangNhap " +
                                    " OUTPUT Inserted.* WHERE KeyBanQuyen = @KeyBanQuyen and Isnull(Device,1) = 2;";
                                SqlParameter[] para2 = new SqlParameter[]
                                {
                                        new SqlParameter("@KeyBanQuyen", KeyBanQuyen),
                                        new SqlParameter("@TenDangNhap", duLieuKeyBangQuyen.Rows[0]["TenDangNhap"].ToString()),
                                };
                                var updateproductkey = SqlHelper
                                    .ExecuteDataset(connectionStringQLCV, CommandType.Text, sqlproductkey, para2).Tables[0];

                                string sqlproductkeyCT = "UPDATE dbo.ProductKeyCT SET TrangThai = 2, NgayKichHoat = getdate(), TenDangNhap = @TenDangNhap " +
                                    " OUTPUT Inserted.* WHERE KeyBanQuyen = @KeyBanQuyen and Isnull(Device,1) = 2; ";
                                SqlParameter[] para3 = new SqlParameter[]
                                {
                                        new SqlParameter("@KeyBanQuyen", KeyBanQuyen),
                                        new SqlParameter("@TenDangNhap", duLieuKeyBangQuyen.Rows[0]["TenDangNhap"].ToString()),
                                };
                                var updateproductkeyCT = SqlHelper
                                    .ExecuteDataset(connectionStringQLCV, CommandType.Text, sqlproductkeyCT, para3).Tables[0];

                                if (updateUser.Rows.Count > 0 && (updateproductkey.Rows.Count > 0 || updateproductkeyCT.Rows.Count > 0))
                                {
                                    return Ok(new { success = true, data = "", message = "Nhập key bản quyền thành công!" });
                                }
                                else
                                {
                                    return Ok(new { success = false, data = "", message = "Cập nhật không thành công!" });
                                }

                            }
                        }
                        else
                        {
                            return Ok(new { success = false, data = "1", message = "Key bản quyền không tồn tại!" });
                        }

                    }
                    else
                    {
                        //Chưa có key => Nhập key
                        return Ok(new { success = false, data = "1", message = "Chưa kích hoạt key bản quyền!" });
                    }

                }

                return Ok(new { success = false, data = "", message = "Kiểm tra lại tài khoản hoặc mật khẩu!" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });

            }
        }

        // lấy mã tự tăng
        [HttpPost]
        [Route("matutang")]
        public IHttpActionResult MaTuTang(MaTuTangModel data)
        {
            try
            {
                string connectionString = getClaim("ConnectData_Encode", true);

                string sql = @"SELECT maxcode = ISNULL(MAX(CASE WHEN ISNUMERIC(" + data.TenCot + ")=1 THEN CAST(" + data.TenCot + " AS INT)END),0)+1 FROM " + data.TenBang + " WHERE 1=1 ";

                if (!String.IsNullOrEmpty(data.TenCotDonVi))
                {
                    sql += " AND " + data.TenCotDonVi + " = '" + data.MaDonVi + "'";
                }
                var duLieu = SqlHelper.ExecuteScalar(connectionString, CommandType.Text, sql);

                return Ok(new { success = false, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [HttpGet]
        [Route("thongtin")]
        public IHttpActionResult ThongTin(string Old)
        {
            try
            {
                string sql = "SELECT u.TenDangNhap , u.HoTen , u.Email , u.UserGroupID , u.UserGroupCode , u.DonViID , d.DonViCode , d.TenDonVi , u.HinhAnh , u.GioiTinh , u.DiaChi , u.NgaySinh FROM dbo.Users u , dbo.DonVi d WHERE u.DonViID = d.DonViID AND u.TenDangNhap = @TenDangNhap";
                if (Old == "1")
                {
                    sql = "SELECT u.TenDangNhap, u.HoTen, u.Email, UserGroupID = u.idGrouppr_sd, UserGroupCode = u.idGrouppr_sd, DonViID = u.maDonvipr_sd, DonViCode = d.maDonVi, TenDonVi = d.tenDonVi,u.HinhAnh, u.GioiTinh, u.DiaChi, u.NgaySinh FROM dbo.tblUsers u, dbo.tblDMDonvi d WHERE u.maDonvipr_sd = d.maDonVi AND u.tenDangNhap = @TenDangNhap";
                }
                if (Old == "2")
                {
                    sql = "SELECT u.TenDangNhap , u.HoTen , u.Email , u.UserGroupID , u.UserGroupCode , u.HinhAnh , u.GioiTinh , u.DiaChi , u.NgaySinh FROM dbo.Users u WHERE u.TenDangNhap = @TenDangNhap";
                }
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@TenDangNhap", getClaim("TenDangNhap"))
                };
                var duLieu = SqlHelper
                    .ExecuteDataset(getClaim("ConnectUSER_Encode", true), CommandType.Text, sql, parameters).Tables[0];
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }


        // upload file
        [HttpPost]
        [Route("upload")]
        public async Task<IHttpActionResult> Upload(string filename)
        {
            try
            {

                Stream requestStream = await Request.Content.ReadAsStreamAsync();

                // kiểm tra định dạng file hợp lệ
                if (!TTLD2024.Models.CONFIG.UPLOAD_MIME_TYPE.Contains(Request.Content.Headers.ContentType.ToString()))
                {
                    return Ok(new { success = false, data = "", message = "File không đúng định dạng" });
                }

                // kiểm tra filename
                if (String.IsNullOrEmpty(filename))
                {
                    filename = Guid.NewGuid().ToString() + Path.GetExtension(Request.Content.Headers.ContentDisposition.FileName);
                }

                string path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_PATH + filename);

                string folder = path.Substring(0, path.LastIndexOf("\\"));
                // tạo thư mục nếu chưa có
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                // nếu file đã tồn tại thì đổi tên file
                if (File.Exists(path))
                {
                    path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_PATH + Guid.NewGuid().ToString() + Path.GetExtension(Request.Content.Headers.ContentDisposition.FileName));
                }

                using (FileStream fileStream = File.Create(path))
                {
                    await requestStream.CopyToAsync(fileStream);
                }
                string url = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_PATH + filename;
                return Ok(new { success = true, data = url, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("upload2")]
        public async Task<IHttpActionResult> UploadMultiiles()
        {
            try
            {
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                List<string> urls = new List<string>();

                foreach (var file in provider.Contents)
                {
                    try
                    {
                        Stream stream = await file.ReadAsStreamAsync();

                        if (file.Headers.ContentType != null && !TTLD2024.Models.CONFIG.UPLOAD_MIME_TYPE.Contains(file.Headers.ContentType.ToString()))
                        {
                            return Ok(new { success = false, data = "", message = "File không đúng định dạng" });
                        }

                        string originalFileName = file.Headers.ContentDisposition.FileName.Trim('"');
                        string extension = Path.GetExtension(originalFileName);
                        bool isHeicOrHeif = (extension == ".heic" || extension == ".heif");

                        string filename = Guid.NewGuid().ToString() + extension;
                        string path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_IMAGE + filename);
                        string folder = path.Substring(0, path.LastIndexOf("\\"));

                        if (!Directory.Exists(folder))
                        {
                            Directory.CreateDirectory(folder);
                        }

                        if (isHeicOrHeif)
                        {
                            // Convert the .heic/.heif image to a compatible format (e.g., .jpeg)
                            using (var magickImage = new MagickImage(stream))
                            {
                                path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_IMAGE + Guid.NewGuid().ToString() + ".jpeg");
                                filename = Path.GetFileName(path);
                                urls.Add(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_IMAGE + filename);

                                // Resize the image if needed (optional)
                                magickImage.Resize(new MagickGeometry(800, 600));

                                // Save the converted image
                                magickImage.Write(path);
                            }
                        }
                        else
                        {
                            // For other image formats, directly save the file
                            using (FileStream fileStream = File.Create(path))
                            {
                                await stream.CopyToAsync(fileStream);
                            }

                            string url = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_IMAGE + filename;
                            urls.Add(url);
                        }
                    }
                    catch
                    {
                        continue;
                    }
                }

                return Ok(new { success = true, data = urls, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [HttpPost]
        [Route("upload3")]
        public async Task<IHttpActionResult> UploadMultiVideos()
        {
            try
            {
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                List<string> urls = new List<string>();

                foreach (var video in provider.Contents)
                {
                    Stream stream = await video.ReadAsStreamAsync();

                    if (!TTLD2024.Models.CONFIG.UPLOAD_MIME_TYPE_VIDEO.Contains(video.Headers.ContentType.ToString()))
                    {
                        return Ok(new { success = false, data = "", message = "Video không đúng định dạng" });
                    }

                    string filename = Guid.NewGuid().ToString() + Path.GetExtension(video.Headers.ContentDisposition.FileName.Trim('"'));
                    string path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_VIDEO + filename);
                    string folder = path.Substring(0, path.LastIndexOf("\\"));

                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }

                    if (File.Exists(path))
                    {
                        path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_VIDEO + Guid.NewGuid().ToString() + Path.GetExtension(video.Headers.ContentDisposition.FileName.Trim('"')));
                        filename = Path.GetFileName(path);
                    }

                    using (FileStream fileStream = File.Create(path))
                    {
                        await stream.CopyToAsync(fileStream);
                    }

                    string url = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_VIDEO + filename;
                    urls.Add(url);
                }

                return Ok(new { success = true, data = urls, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [HttpGet]
        [Route("checkfile")]
        public async Task<IHttpActionResult> CheckFile(string filename)
        {
            try
            {
                if (String.IsNullOrEmpty(filename))
                {
                    return Ok(new { success = false, data = "", message = "Không có tên file" });
                }
                string path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_PATH + filename);
                if (File.Exists(path))
                {
                    string url = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_PATH + filename;
                    return Ok(new { success = true, data = url, message = "" });
                }
                return Ok(new { success = false, data = "", message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // upload file
        [HttpGet]
        [Route("deletefile")]
        public async Task<IHttpActionResult> DeleteFile(string filename)
        {
            try
            {
                filename = filename.Replace(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_PATH, "");
                string path = HttpContext.Current.Server.MapPath("~" + TTLD2024.Models.CONFIG.UPLOAD_PATH + filename);
                if (File.Exists(path))
                {
                    string url = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + TTLD2024.Models.CONFIG.UPLOAD_PATH + filename;
                    File.Delete(path);
                    return Ok(new { success = true, data = url, message = "" });
                }
                return Ok(new { success = true, data = "", message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }

        }

        // lấy giới thiệu, hướng dẫn sử dụng phần mềm
        [HttpGet]
        [Route("huongdan")]
        public IHttpActionResult HuongDan(string phanmem, string chucnang)
        {
            try
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringQLCV"].ConnectionString;

                //string sql = "SELECT NoiDung FROM HuongDanSuDung WHERE PhanMemID IN (SELECT PhanMemID FROM PhanMem WHERE PhanMemCode = @PhanMemCode) AND ChucNangID IN (SELECT ChucNangID FROM ChucNang WHERE ChucNangCode = @ChucNangCode) AND ISNULL(NgungSD, 0) <> 1 AND TinhNangMobile = 1";
                SqlParameter[] para = {
                    new SqlParameter("@PhanMemCode", phanmem)
                    ,new SqlParameter("@DuongDanMobile", chucnang)
                };

                var duLieu = SqlHelper.ExecuteScalar(connectionString, "Proc_Mobile_GetHuongDanSuDung", para);
                return Ok(new { success = true, data = duLieu, message = "" });

            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // lấy tất cả giới thiệu, hướng dẫn sử dụng phần mềm
        [HttpGet]
        [Route("getallhuongdan")]
        public IHttpActionResult GetAllHuongDan(string phanmem)
        {
            try
            {
                string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionStringQLCV"].ConnectionString;

                SqlParameter[] para = {
                    new SqlParameter("@PhanMemCode", phanmem)
                };

                var duLieu = SqlHelper.ExecuteDataset(connectionString, "Proc_Mobile_GetAllHuongDanSuDung", para);
                return Ok(new { success = true, data = duLieu, message = "" });

            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("KTKeyBanQuyen")]
        public IHttpActionResult KTKeyBanQuyen(string ID)
        {
            try
            {

                SqlParameter[] parameters = { new SqlParameter("@ID", Class.DungChung.NormalizationGuid(ID)) };
                var duLieu = SqlHelper.ExecuteScalar(TTLD2024.Models.CONFIG.CONNECT, "Proc_Mobile_CheckLicense", parameters);
                return Ok(new { success = true, data = duLieu, message = "" });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        [HttpGet]
        [Route("reset")]
        public IHttpActionResult reset()
        {
            try
            {
                HttpRuntime.UnloadAppDomain();
                return Ok(new { success = true, data = "", message = "" });

            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = e.Message });
            }
        }

        // lấy chuỗi kết nối từ bảng CSDL_Mobile
        private DataRow getConnectString(Guid ID)
        {
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@ID", ID)
                };
                var data = SqlHelper
                    .ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT,
                        CommandType.Text, "SELECT ConnectUSER_Encode, ConnectData_Encode FROM dbo.CSDL_Mobile WHERE ID = @ID", parameters)
                    .Tables[0];
                if (data.Rows.Count > 0) return data.Rows[0];
            }
            catch (Exception e) { }

            return null;
        }


        // chuyển token thành IEnumerable
        private IEnumerable<Claim> getClaims()
        {
            //var identity = HttpContext.Current.User.Identity as ClaimsPrincipal;
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
            return identity.Claims;
        }
        // lấy giá trị lưu trong token theo key
        private string getClaim(string Key)
        {
            var claim = getClaims();
            return claim.Where(c => c.Type == Key)
                .Select(c => c.Value).SingleOrDefault();
        }

        // lấy giá trị lưu trong token theo key và giả mã
        private string getClaim(string Key, bool Encrypt)
        {
            if (Encrypt)
            {
                return DESHelper.Decryption(getClaim(Key));
            }
            return getClaim(Key);
        }

        public string NTSTrim(string str)
        {
            if (str == null)
            {
                return "";
            }
            return str.Trim();
        }
        public string Encrypt_X2(object data)
        {
            var sb = new StringBuilder();
            var bytes = UTF8Encoding.Unicode.GetBytes(data.ToString());
            foreach (var t in bytes)
            {
                sb.Append(t.ToString("X2"));
            }
            return sb.ToString();
        }
        public Image resizeImage(Image image, int newHeight, int newWidth)
        {
            Bitmap newImage = new Bitmap(newWidth, newHeight);
            Graphics g = Graphics.FromImage((Image)newImage);
            g.InterpolationMode = InterpolationMode.High;
            g.DrawImage(image, 0, 0, newWidth, newHeight);
            return newImage;
        }

        public static string UPLOAD_MIME_TYPE = "image/heic,heic,mp4,image/jpeg,image/png,image/gif,image/bmp,image/tiff,image/x-icon,video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,audio/mpeg,audio/x-wav,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf,application/zip,application/x-rar-compressed,text/plain";
        private string GetBearerToken()
        {
            string authHeader = HttpContext.Current.Request.Headers["Authorization"];
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                return authHeader.Substring(7);
            }
            return null;
        }
        public bool IsBearerTokenValid(string bearerToken)
        {
            string secretKey = "gEk6UG4ypXcHhg3xz9u2SK6FDj76UvTWG9HsYwvqfLrDsUoy7gmWnXeKRTet";// key mã hóa token

            var handler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(UTF8Encoding.ASCII.GetBytes(secretKey)),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            try
            {
                SecurityToken validatedToken;
                handler.ValidateToken(bearerToken.ToString(), tokenValidationParameters, out validatedToken);
                return true;
            }
            catch (SecurityTokenException)
            {
                return false;
            }
        }

        [Route("api/UploadMultiFiles")]
        [HttpPost]
        public IHttpActionResult UploadMultiFiles()
        {
            try
            {
                //DinhKem data = null;
                DinhKem data = new DinhKem(
                    HttpContext.Current.Request.QueryString["loaiVB"].ToString().ToUpper()
                    , HttpContext.Current.Request.QueryString["donViCode"].ToString().ToUpper()
                    , HttpContext.Current.Request.QueryString["formName"].ToString().ToUpper());
                //string token = GetBearerToken();
                //if (!IsBearerTokenValid(token))
                //{
                //    return Ok(new { success = false, data = "", message = "Authorization has been denied for this request." });

                //}
                //else
                //{
                //}
                var httpRequest = HttpContext.Current.Request;

                if (httpRequest.Files.Count == 0)
                {
                    return Ok(new { success = false, data = "", message = "No files uploaded." });
                }

                List<string> urls = new List<string>();

                //foreach (string fileKey in httpRequest.Files)
                for (int i = 0; i < httpRequest.Files.Count; i++)
                {
                    HttpPostedFile file = httpRequest.Files[i];

                    if (file == null || file.ContentLength == 0)
                    {
                        continue;
                    }

                    try
                    {
                        string originalFileName = Path.GetFileName(file.FileName);
                        string extension = Path.GetExtension(originalFileName);
                        bool isHeicOrHeif = (extension == ".heic" || extension == ".heif");

                        //if (!IsAllowedFileType(file.ContentType))
                        if (!NTSController.UPLOAD_MIME_TYPE.Contains(file.ContentType))
                        {
                            return Ok(new { success = false, data = "", message = "File không đúng định dạng" });
                        }

                        //string filename = Guid.NewGuid().ToString() + extension;
                        string filename = (originalFileName == "" || originalFileName == null) ? Guid.NewGuid().ToString() + extension : originalFileName;

                        string path = "";
                        if (data.loaiVB == "VB")
                        {
                            path = "~/VanBan/" + data.donViCode + "/" + data.formName + "/";
                        }
                        else if (data.loaiVB == "HA")
                        {
                            path = "~/HinhAnh/" + data.donViCode + "/" + data.formName + "/";
                        }
                        else if (data.loaiVB == "DL")
                        {
                            path = "~/Upload/" + data.donViCode + "/" + data.formName + "/";
                        }
                        string uploadFolder = HttpContext.Current.Server.MapPath(path);

                        if (!Directory.Exists(uploadFolder))
                        {
                            Directory.CreateDirectory(uploadFolder);
                        }

                        string filePath;
                        if (isHeicOrHeif)
                        {
                            filePath = Path.Combine(uploadFolder, filename.Replace(extension, ".jpeg"));
                            //urls.Add(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + "/uploads/" + Path.GetFileName(filePath));
                            urls.Add(path + filename.Replace(extension, ".jpeg"));

                            // Convert the .heic/.heif image to a compatible format (e.g., .jpeg)
                            using (var magickImage = new MagickImage(file.InputStream))
                            {
                                // Resize the image if needed (optional)
                                magickImage.Resize(new MagickGeometry(800, 600));

                                // Save the converted image
                                magickImage.Write(filePath);
                            }
                        }
                        else
                        {
                            filePath = Path.Combine(uploadFolder, filename);
                            urls.Add(path + filename);

                            // For other image formats, directly save the file
                            file.SaveAs(filePath);
                        }
                    }
                    catch
                    {
                        continue;
                    }
                }

                if (urls.Count > 0)
                {
                    return Ok(new { success = true, data = urls, message = "" });
                }
                else
                {
                    return Ok(new { success = false, data = "", message = "Tải file thất bại!" });
                }
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = JSonHelper.ToJson(e) });
            }
        }

        [Route("api/DeleteMultiFiles")]
        [HttpPost]
        public IHttpActionResult DeleteMultiFiles(string[] fileUrls)
        {
            try
            {
                //string token = GetBearerToken();
                //if (!IsBearerTokenValid(token))
                //{
                //    return Ok(new { success = false, data = "", message = "Authorization has been denied for this request." });

                //}
                //else
                //{

                //}
                List<string> deletedFiles = new List<string>();

                foreach (var fileUrl in fileUrls)
                {
                    // Convert the file URL to a physical path on the server
                    //string physicalPath = HttpContext.Current.Server.MapPath(fileUrl);
                    string physicalPath = HttpContext.Current.Server.MapPath(fileUrl).Replace(@"api\", "");
                    // Check if the file exists and delete it
                    if (File.Exists(physicalPath))
                    {
                        File.Delete(physicalPath);
                        deletedFiles.Add(fileUrl);
                    }
                }

                return Ok(new { success = true, data = deletedFiles, message = "Files deleted successfully." });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, data = "", message = JSonHelper.ToJson(e) });
            }
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("csdl3")]
        public IHttpActionResult Csdl3(string app, string tinh)
        {
            try
            {
                SqlParameter[] parameters = { new SqlParameter("@TenApp", app),
                                       new SqlParameter("@TenTinh", tinh)};

                //var duLieu = SqlHelper.ExecuteDataset(Config.CONNECT, CommandType.Text,
                //    "SELECT ID, TenApp, TenSite, SiteURL, DBData_Name=ISNULL(DBData_Name,''),DBDUser_Name=ISNULL(DBDUser_Name,'') FROM dbo.CSDL_Mobile WHERE NgungSD = 0 AND TenApp = @TenApp order by DBData_Name,TenSite", parameters).Tables[0];
                var duLieu = SqlHelper.ExecuteDataset(TTLD2024.Models.CONFIG.CONNECT, CommandType.StoredProcedure,
                    "Proc_Mobile_GetCSDL_Tinh", parameters).Tables[0];
                return Ok(new { success = true, data = JSonHelper.ToJson(duLieu), message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, data = "", message = ex.Message });
            }
        }
    }
    public class DinhKem
    {
        public string loaiVB { get; set; }
        public string donViCode { get; set; }
        public string formName { get; set; }
        public HttpPostedFileBase File { get; set; }
        public DinhKem(string _loaiVB, string _donViCode, string _formName)
        {
            this.loaiVB = _loaiVB;
            this.donViCode = _donViCode;
            this.formName = _formName;
        }
    }
}