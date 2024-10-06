using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Net;

namespace TTLD2024.Services
{
    /// <summary>
    /// Summary description for AuthPassword
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ServiceSystem : System.Web.Services.WebService
    {
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
        [WebMethod(EnableSession = true)]
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
        [WebMethod(EnableSession = true)]
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
        public static bool email_send(int port, string sever, string TenEmailGui, string MatKhauEmailGui, string TenEmailNhan, string TenEmailCC, string TieuDe, string NoiDung, string DuongDan)
        {
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
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
                        if (File[i].ToString() != "")
                        {
                            System.Net.Mail.Attachment attachment;
                            attachment = new System.Net.Mail.Attachment(HttpContext.Current.Server.MapPath(File[i].ToString()));
                            mail.Attachments.Add(attachment);
                        }
                    }
                }
                catch { }
                SmtpServer.Port = port;
                SmtpServer.Credentials = new System.Net.NetworkCredential(TenEmailGui, MatKhauEmailGui);
                mail.IsBodyHtml = true;
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception gg)
            {
                return false;
            }
        }
        [WebMethod(EnableSession = true)]
        public string sendAuthCode(string username)
        {
            try
            {
                DataTable tab = getData("SELECT UserID, TenDangNhap, Email FROM dbo.Users WHERE TenDangNhap=N'" + HttpUtility.UrlEncode(username) + "'");
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
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 CauHinhEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.CauHinhEmail");
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

        [WebMethod(EnableSession = true)]
        public string checkAuthCode(string code, string authid)
        {
            try
            {
                DataTable tab = getData("SELECT UserID FROM dbo.Users WHERE AuthCode='" + HttpUtility.UrlEncode(code) + "' AND AuthID='" + HttpUtility.UrlEncode(authid) + "' AND TimeAuthOut>=getDate()");
                if (tab.Rows.Count > 0)
                {
                    return JSonHelper.ToJson("1_" + authid + "_Mã xác thực hợp lệ!<br/>Vui lòng đặt lại mật khẩu của bạn!");
                }
                else
                {
                    tab = getData("SELECT UserID FROM dbo.Users WHERE AuthCode='" + HttpUtility.UrlEncode(code) + "' AND AuthID='" + HttpUtility.UrlEncode(authid) + "'");
                    if (tab.Rows.Count > 0)
                    {
                        return JSonHelper.ToJson("-2_Mã xác thực đã hết hiệu lực!<br/>Vui lòng thao tác lại!");
                    }
                    return JSonHelper.ToJson("0_Mã xác thực không hợp lệ!<br/>Vui lòng kiểm tra lại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_" + ex.ToString());
            }
        }
        [WebMethod(EnableSession = true)]
        public string resetPassword(string password, string authid)
        {
            try
            {
                DataTable tab = getData("SELECT UserID, TenDangNhap, Email FROM dbo.Users WHERE AuthID=N'" + HttpUtility.UrlEncode(authid) + "'");
                if (tab.Rows.Count > 0)
                {
                    //Xử lý tạo mã và lưu db
                    int lengthNum = 6;
                    string strMatMa = WEB_DLL.ntsSecurity._mEncrypt(tab.Rows[0]["TenDangNhap"] + ";" + password, PageInfo.KeyMaHoaMatKhau, true); // Hỗ trợ mật mã
                    Random random = new Random();
                    //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                    string AuthID = new System.Guid().ToString() + "-" + new System.Guid().ToString();
                    if (excuteSQL($@"UPDATE dbo.Users SET MatMa=N'{strMatMa}',AuthID='', AuthCode='', TimeAuthOut=NULL  WHERE AuthID=N'{HttpUtility.UrlEncode(authid)}'"))
                    {
                        return JSonHelper.ToJson("1_Đã cập nhật mật khẩu mới thành công!<br/>Vui lòng đăng nhập lại!");
                    }
                    else
                    {
                        return JSonHelper.ToJson("0_Không thể cập nhật mật khẩu mới!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("0_Mã xác thực không hợp lệ!<br/>Vui lòng kiểm tra lại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_" + ex.ToString());
            }
        }


        [WebMethod()]
        public string sendAuthCode_CongThongTin(string mail)
        {
            try
            {
                string hostPath = HttpContext.Current.Request.Url.Authority;
                //hostPath = "https://tdktvinhlong.nhattamsoft.vn/";
                SqlParameter[] para = {
                    new SqlParameter("@Email", mail)
                };
                DataTable tab = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 UngVienID, Email FROM dbo.UngVien WHERE Email=@Email", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    if (!string.IsNullOrWhiteSpace(tab.Rows[0]["Email"].ToString()))
                    {
                        //Xử lý tạo mã và lưu db
                        //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                        string AuthID = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
                        string strCode = hostPath + "/ResetPassword/ResetPassword.html?AuthID=" + AuthID; //link bảo mật
                        if (excuteSQL($@"UPDATE dbo.UngVien SET TimeAuthOut=DATEADD(MINUTE, 1440 /*24 gio*/, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE UngVienID=N'{tab.Rows[0]["UngVienID"].ToString()}'"))
                        {
                            //Gửi mail
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail");
                            if (tabCauHinhGuiMail.Rows.Count > 0)
                            {
                                bool guiMail = email_send(
                                    port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                    , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                    , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                    , TenEmailNhan: tab.Rows[0]["Email"].ToString()
                                    , TenEmailCC: ""
                                    , TieuDe: "[Phần mềm QLNS] Xác nhận quên mật khẩu"
                                    , NoiDung: mauHTML1.Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["Email"].ToString())
                                    , DuongDan: "");
                                if (guiMail)
                                {
                                    return JSonHelper.ToJson("1_Đã gửi mail xác nhận quên mật khẩu. Vui lòng kiểm tra mail để tiếp tục. Hệ thống sẽ tự động chuyển về trang đăng nhập trong vài giây tới!");
                                }
                                else
                                {
                                    return JSonHelper.ToJson("0_Không thể gửi mail. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                                }
                            }
                            else
                                return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                        else
                        {
                            return JSonHelper.ToJson("0_Không thể tạo đường dẫn xác nhận quên mật khẩu. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                    }
                    else
                        return JSonHelper.ToJson("0_Địa chỉ mail " + mail + " không tồn tại. Vui lòng kiểm tra lại!");
                }
                else
                {
                    DataTable tab1 = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 NhaTuyenDungID, Email FROM dbo.NhaTuyenDung WHERE Email=@Email", para).Tables[0];
                    if (tab1.Rows.Count > 0)
                    {
                        if (!string.IsNullOrWhiteSpace(tab1.Rows[0]["Email"].ToString()))
                        {
                            //Xử lý tạo mã và lưu db
                            //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                            string AuthID = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
                            string strCode = hostPath + "/ResetPassword/ResetPassword.html?AuthID=" + AuthID; //link bảo mật
                            if (excuteSQL($@"UPDATE dbo.NhaTuyenDung SET TimeAuthOut=DATEADD(MINUTE, 1440 /*24 gio*/, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE NhaTuyenDungID=N'{tab1.Rows[0]["NhaTuyenDungID"].ToString()}'"))
                            {
                                //Gửi mail
                                DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail");
                                if (tabCauHinhGuiMail.Rows.Count > 0)
                                {
                                    bool guiMail = email_send(
                                        port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                        , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                        , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                        , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                        , TenEmailNhan: tab1.Rows[0]["Email"].ToString()
                                        , TenEmailCC: ""
                                        , TieuDe: "[Phần mềm QLNS] Xác nhận quên mật khẩu"
                                        , NoiDung: mauHTML1.Replace("_Code_", strCode).Replace("_tenDangNhap_", tab1.Rows[0]["Email"].ToString())
                                        , DuongDan: "");
                                    if (guiMail)
                                    {
                                        return JSonHelper.ToJson("1_Đã gửi mail xác nhận quên mật khẩu. Vui lòng kiểm tra mail để tiếp tục. Hệ thống sẽ tự động chuyển về trang đăng nhập trong vài giây tới!");
                                    }
                                    else
                                    {
                                        return JSonHelper.ToJson("0_Không thể gửi mail. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                                    }
                                }
                                else
                                    return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                            }
                            else
                            {
                                return JSonHelper.ToJson("0_Không thể tạo đường dẫn xác nhận quên mật khẩu. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                            }
                        }
                        else
                            return JSonHelper.ToJson("0_Địa chỉ mail " + mail + " không tồn tại. Vui lòng kiểm tra lại!");
                    }
                    else
                        return JSonHelper.ToJson("0_Địa chỉ mail " + mail + " không tồn tại trong hệ thống. Vui lòng kiểm tra lại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_" + ex.Message);
            }
        }
    }
}
