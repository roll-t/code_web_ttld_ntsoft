namespace TTLD2024.Services
{
    using System;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Net;
    using System.Net.Mail;
    using System.Security.Cryptography;
    using System.Text;
    using System.Web;
    using System.Web.Script.Services;
    using System.Web.Services;
    using TTLD2024.Class;
    using System.Web.Mvc;
    /// <summary>
    /// Summary description for ServiceSystem
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
                        <p style='color:#000'>Vì lý do bảo mật, NTSOFT không thể gửi mật khẩu của Anh/Chị qua Email. Để tạo mật khẩu mới, Anh/Chị hãy kích vào liên kết dưới đây:</p>
                        <table align='center' border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' style='border-collapse:collapse;height:100%;margin:0;padding:0;width:100%'>
                            <tbody style='color:#000'>
                                <tr style='color:#000'>
                                    <td></td>
                                    <td align='center' valign='top' style='height:100%;margin:0;padding:0;width:100%'>
                                        <p style='font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;width:230px;text-align:center;font-size:20px;vertical-align:middle;margin:0px'><b><a href='_Code_'>Đặt mật khẩu mới</a></b></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p style='color:#000'>Đường dẫn liên kết sẽ hết hạn sau 1 ngày, vui lòng không tiết lộ đường dẫn liên kết cho bất kỳ ai!</p>
                        <div style='color:#000'>Cảm ơn Anh/Chị đã sử dụng sản phẩm của <b>NTSOFT</b>!</div>
                        <p style='color:#000'>Trân trọng!</p>
                        <p style='color: rgb(169, 169, 169); font-size: x-small;'><i>(Gởi lúc {DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")})</i></p>
                    </td>
                </tr>
                <tr>
                    <td valign='middle' style='padding:1em;background:#126db3;text-align:center;color:#ffffff;font-size:14px'>
                        <p><a href='https://nhattamsoft.vn' target='_blank' style='color:#fff'>Công ty TNHH Phát triển phần mềm Nhất Tâm - NTSoft</a></p>
                        <p>Điện thoại: <a href='tel:02703843058'>(0270) 3 843 058</a></p>
                        <p>Địa chỉ mail: <a href='mailto:ntsoft@nhattamsoft.vn'>ntsoft@nhattamsoft.vn</a></p>
                        <p>Địa chỉ: <a href='https://maps.app.goo.gl/wx2fxCEP1oyiczEJA' target='_blank'>Số H25 đường Phan Văn Đáng, Phường 8, Thành phố Vĩnh Long, Tỉnh Vĩnh Long</a></p>
                    </td>
                </tr>
            </tbody>
        </table>
    ";
        public string mauHTML2 = $@"
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
                        <p style='color:#000'>Anh/Chị vừa mới đặt lại mật khẩu trên phần mềm vào lúc {DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")}</p>
                        <p style='color:#000'>Cảm ơn Anh/Chị đã sử dụng sản phẩm của <b>NTSOFT</b>!</p>
                        <p style='color:#000'>Trân trọng!</p>
                    </td>
                </tr>
                <tr>
                    <td valign='middle' style='padding:1em;background:#126db3;text-align:center;color:#ffffff;font-size:14px'>
                        <p><a href='https://nhattamsoft.vn' target='_blank' style='color:#fff'>Công ty TNHH Phát triển phần mềm Nhất Tâm - NTSoft</a></p>
                        <p>Điện thoại: <a href='tel:02703843058'>(0270) 3 843 058</a></p>
                        <p>Địa chỉ mail: <a href='mailto:ntsoft@nhattamsoft.vn'>ntsoft@nhattamsoft.vn</a></p>
                        <p>Địa chỉ: <a href='https://maps.app.goo.gl/wx2fxCEP1oyiczEJA' target='_blank'>Số H25 đường Phan Văn Đáng, Phường 8, Thành phố Vĩnh Long, Tỉnh Vĩnh Long</a></p>
                    </td>
                </tr>
            </tbody>
        </table>
    ";
        //public string mauHTML3 = $@"
        //    <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""max-width:1000px;border-collapse:collapse;margin: 0 auto;border: 2px solid #126db3; font-family: Arial, sans-serif;"">
        //        <tbody>
        //            <tr>
        //                <td style=""padding:2em;background-color:#f7f7f7;color:#333;font-size:16px;"">
        //                    <p style=""font-size:16px;margin-bottom:1.5em;"">Xin chào <span style=""font-weight:bold;color:#126db3;"">_tenDangNhap_</span>,</p>
        //                    <p>Chào mừng bạn đến với hệ thống Cổng thông tin việc làm của chúng tôi! Vui lòng nhấn vào nút <strong>KÍCH HOẠT TÀI KHOẢN</strong> dưới đây để hoàn tất quá trình đăng ký:</p>

        //                    <div style=""text-align:center;margin:2em 0;"">
        //                        <a href=""_Code_"" style=""display:inline-block;padding:15px 25px;background-color:#126db3;color:#fff;font-size:18px;text-decoration:none;border-radius:5px;font-weight:bold;"">KÍCH HOẠT TÀI KHOẢN</a>
        //                    </div>

        //                    <p>Nếu nút <strong>KÍCH HOẠT TÀI KHOẢN</strong> không hoạt động, vui lòng sao chép và dán liên kết sau vào trình duyệt:</p>
        //                    <p style=""word-wrap:break-word;"">_url_</p>

        //                    <p>Liên kết này sẽ hết hạn sau 24 giờ. Vui lòng không chia sẻ liên kết này với bất kỳ ai.</p>

        //                    <p>Chúng tôi rất cảm kích khi bạn đã tin tưởng và sử dụng dịch vụ của <strong>NTSOFT</strong>.</p>
        //                    <p>Trân trọng,</p>
        //                    <div style=""justify-content:space-between; display:flex"">
        //                        <p style=""color:#999;font-size:13px;"">
        //                            <i>* Đây là email tự động, vui lòng không trả lời email này *</i>
        //                        </p>
        //                        <p style=""color: #999; font-size: 13px; margin-left: 45%;"">
        //                            <i>(Gửi lúc {DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")})</i>
        //                        </p>
        //                    </div>
        //                </td>
        //            </tr>
        //            <tr>
        //                <td style=""padding: 1em; padding-left: 4%; padding-right: 10%; background-color: #126db3; color: #fff; font-size: 14px; text-align: left;"">
        //                    <div style=""display:flex"">
        //                        <div>
        //                            <p><a href=""https://nhattamsoft.vn"" target=""_blank"" style=""color:#fff;text-decoration:none;"">Công ty TNHH Phát triển phần mềm Nhất Tâm - NTSoft</a></p>
        //                            <p>Địa chỉ: <a href=""https://maps.app.goo.gl/wx2fxCEP1oyiczEJA"" target=""_blank"" style=""color:#fff;text-decoration:none;"">Số H25, Phan Văn Đáng, Phường 8, TP Vĩnh Long, Tỉnh Vĩnh Long</a></p>
        //                        </div>
        //                        <div style=""margin-left: 15%;"">
        //                            <p>Điện thoại: <a href=""tel:02703843058"" style=""color:#fff;text-decoration:none;"">(0270) 3 843 058</a></p>
        //                            <p>Địa chỉ email: <a href=""mailto:ntsoft@nhattamsoft.vn"" style=""color:#fff;text-decoration:none;"">ntsoft@nhattamsoft.vn</a></p>
        //                        </div>
        //                    </div>
        //                </td>
        //            </tr>
        //        </tbody>
        //    </table>
        //";
        //public string mauHTML4 = $@"
        //    <table border=""0"" cellpadding=""0"" cellspacing=""0"" style=""max-width:1000px;border-collapse:collapse;margin: 0 auto;border: 2px solid #126db3;font-family: Arial, sans-serif;"">
        //        <tbody>
        //            <tr>
        //                <td style=""padding:2em;background-color:#f7f7f7;color:#333;font-size:16px;"">
        //                    <p style=""font-size:16px;margin-bottom:1.5em;"">Xin chào <span style=""font-weight:bold;color:#126db3;"">_tenDangNhap_</span>,</p>
        //                    <p>Chúng tôi vui mừng thông báo rằng tài khoản của bạn đã được kích hoạt thành công. Bạn có thể truy cập vào website và đăng nhập ngay bằng tài khoản của mình.</p>

        //                    <div style=""text-align:center;margin:2em 0;"">
        //                        <a href=""_Code_"" style=""display:inline-block;padding:15px 25px;background-color:#126db3;color:#fff;font-size:18px;text-decoration:none;border-radius:5px;font-weight:bold;"">ĐĂNG NHẬP NGAY</a>
        //                    </div>

        //                    <p>Chúng tôi cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của <strong>NTSOFT</strong>.</p>
        //                    <p>Trân trọng,</p>
        //                    <div style=""justify-content:space-between; display:flex"">
        //                        <p style=""color:#999;font-size:13px;"">
        //                            <i>* Đây là email tự động, vui lòng không trả lời email này *</i>
        //                        </p>
        //                        <p style=""color: #999; font-size: 13px; margin-left: 45%;"">
        //                            <i>(Gửi lúc {DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")})</i>
        //                        </p>
        //                    </div>
        //                </td>
        //            </tr>
        //            <tr>
        //                <td style=""padding: 1em; padding-left: 4%; padding-right: 10%; background-color: #126db3; color: #fff; font-size: 14px; text-align: left;"">
        //                    <div style=""display:flex"">
        //                        <div>
        //                            <p><a href=""https://nhattamsoft.vn"" target=""_blank"" style=""color:#fff;text-decoration:none;"">Công ty TNHH Phát triển phần mềm Nhất Tâm - NTSoft</a></p>
        //                            <p>Địa chỉ: <a href=""https://maps.app.goo.gl/wx2fxCEP1oyiczEJA"" target=""_blank"" style=""color:#fff;text-decoration:none;"">Số H25, Phan Văn Đáng, Phường 8, TP Vĩnh Long, Tỉnh Vĩnh Long</a></p>
        //                        </div>
        //                        <div style=""margin-left: 15%;"">
        //                            <p>Điện thoại: <a href=""tel:02703843058"" style=""color:#fff;text-decoration:none;"">(0270) 3 843 058</a></p>
        //                            <p>Địa chỉ email: <a href=""mailto:ntsoft@nhattamsoft.vn"" style=""color:#fff;text-decoration:none;"">ntsoft@nhattamsoft.vn</a></p>
        //                        </div>
        //                    </div>
        //                </td>
        //            </tr>
        //        </tbody>
        //    </table>
        //";

        public string timenow = $@"(Gửi lúc {DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")})";

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
                //SmtpServer.UseDefaultCredentials = false;
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
        public string sendAuthCode(string mail)
        {
            try
            {
                string hostPath = HttpContext.Current.Request.Url.Authority;
                //hostPath = "https://tdktvinhlong.nhattamsoft.vn/";
                SqlParameter[] para = {
                    new SqlParameter("@Email", mail)
                };
                DataTable tab = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 UserID, TenDangNhap, Email FROM dbo.Users WHERE Email=@Email", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    if (!string.IsNullOrWhiteSpace(tab.Rows[0]["Email"].ToString()))
                    {
                        //Xử lý tạo mã và lưu db
                        //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                        string AuthID = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
                        string strCode = hostPath + "/ResetPassword/ResetPassword.html?AuthID=" + AuthID; //link bảo mật
                        if (excuteSQL($@"UPDATE dbo.Users SET TimeAuthOut=DATEADD(MINUTE, 1440 /*24 gio*/, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE UserID=N'{tab.Rows[0]["UserID"].ToString()}'"))
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
                                    , NoiDung: mauHTML1.Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["TenDangNhap"].ToString())
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
                    //else
                    //{
                    //    //Gửi mã xác
                    //    //Xử lý tạo mã và lưu db
                    //    int lengthNum = 6;
                    //    string strCode = "";
                    //    Random random = new Random();
                    //    for (int i = 0; i < lengthNum; i++)
                    //    {
                    //        strCode += random.Next(0, 9);
                    //    }
                    //    //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                    //    string AuthID = new System.Guid().ToString() + "-" + new System.Guid().ToString();
                    //    if (excuteSQL($@"UPDATE dbo.Users SET AuthCode=N'{strCode}', TimeAuthOut=DATEADD(MINUTE, 5, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE UserID=N'{tab.Rows[0]["UserID"].ToString()}'"))
                    //    {
                    //        //Gửi mail
                    //        DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail");
                    //        if (tabCauHinhGuiMail.Rows.Count > 0)
                    //        {
                    //            email_send(port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                    //                , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                    //                , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                    //                , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                    //                , TenEmailNhan: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                    //                , TenEmailCC: ""
                    //                , TieuDe: "Mã xác thực - NTSOFT"
                    //                , NoiDung: mauHTML1.Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["TenDangNhap"].ToString())
                    //                , DuongDan: "");
                    //            return JSonHelper.ToJson("1_" + ComputeSha256Hash(AuthID) + "_User chưa được đăng ký địa chỉ Email. <br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    //        }
                    //        else
                    //            return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    //    }
                    //    else
                    //    {
                    //        return JSonHelper.ToJson("0_Không thể tạo mã xác thực!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    //    }
                    //}
                    //{
                    //    return JSonHelper.ToJson("0_Tên đăng nhập "+ username + " chưa đăng ký địa chỉ mail trong hệ thống!<br/>Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    //}
                }
                else
                {
                    return JSonHelper.ToJson("0_Địa chỉ mail " + mail + " không tồn tại trong hệ thống. Vui lòng kiểm tra lại!");
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
                DataTable tab = getData("SELECT UserID, TenDangNhap, Email, TimeAuthOut FROM dbo.Users WHERE AuthID=N'" + ComputeSha256Hash(authid) + "'");

                if (tab.Rows.Count > 0)
                {
                    if (!string.IsNullOrEmpty(tab.Rows[0]["TimeAuthOut"].ToString()) && DateTime.Now > DateTime.Parse(tab.Rows[0]["TimeAuthOut"].ToString()))
                    {
                        return JSonHelper.ToJson("0_Đường dẫn liên kết đã hết hạn hoặc không tồn tại. Vui lòng kiểm tra lại!");
                    }
                    //Xử lý tạo mã và lưu db
                    string strMatMa = WEB_DLL.ntsSecurity._mEncrypt(tab.Rows[0]["TenDangNhap"] + ";" + password, PageInfo.KeyMaHoaMatKhau, true); // Hỗ trợ mật mã
                    Random random = new Random();
                    //Cập nhật AuthCode và TimeAuthOut (trong 5 phút)
                    string AuthID = new System.Guid().ToString() + "-" + new System.Guid().ToString();
                    if (excuteSQL($@"UPDATE dbo.Users SET MatMa=N'{strMatMa}',NgayCapNhatMK=GETDATE(),AuthID='', AuthCode='', TimeAuthOut=NULL  WHERE AuthID=N'{ComputeSha256Hash(authid)}'"))
                    {
                        try
                        {
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail");
                            email_send(
                                    port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                    , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                    , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                    , TenEmailNhan: tab.Rows[0]["Email"].ToString()
                                    , TenEmailCC: ""
                                    , TieuDe: "[Phần mềm QLNS] Xác nhận đổi mật khẩu"
                                    , NoiDung: mauHTML2.Replace("_tenDangNhap_", tab.Rows[0]["TenDangNhap"].ToString())
                                    , DuongDan: "");
                        }
                        catch (Exception)
                        {

                        }
                        return JSonHelper.ToJson("1_Đã cập nhật mật khẩu mới thành công. Vui lòng đăng nhập lại!");
                    }
                    else
                    {
                        return JSonHelper.ToJson("0_Không thể cập nhật mật khẩu mới. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    }
                }
                else
                {
                    return JSonHelper.ToJson("0_Mã xác thực không hợp lệ. Vui lòng kiểm tra lại!");
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

        [WebMethod()]
        public string sendAuthCode_ActiveAcount(string mail)
        {
            try
            {
                string hostPath = HttpContext.Current.Request.Url.Authority;
                //hostPath = "https://tdktvinhlong.nhattamsoft.vn/";
                SqlParameter[] para = {
                    new SqlParameter("@Email", mail)
                };
                DataTable tab = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 UngVienID, Email, HoVaTen FROM dbo.UngVien WHERE Email=@Email", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    if (!string.IsNullOrWhiteSpace(tab.Rows[0]["Email"].ToString()))
                    {
                        //Xử lý tạo mã và lưu db
                        //Cập nhật AuthCode và TimeAuthOut
                        string AuthID = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
                        string strCode = hostPath + "/ActiveAccount/AuthCodeActiveUV.html?AuthID=" + AuthID; //link bảo mật
                        if (excuteSQL($@"UPDATE dbo.UngVien SET TimeAuthOut=DATEADD(MINUTE, 1440 /*24 gio*/, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE UngVienID=N'{tab.Rows[0]["UngVienID"].ToString()}'"))
                        {
                            //Gửi mail
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail WHERE DinhDanh='mail-kich-hoat'");
                            if (tabCauHinhGuiMail.Rows.Count > 0)
                            {
                                bool guiMail = email_send(
                                    port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                    , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                    , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                    , TenEmailNhan: tab.Rows[0]["Email"].ToString()
                                    , TenEmailCC: ""
                                    , TieuDe: "[Cổng thông tin việc làm] Kích hoạt tài khoản"
                                    , NoiDung: tabCauHinhGuiMail.Rows[0]["NoiDung"].ToString().Replace("_url_", strCode).Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["HoVaTen"].ToString()).Replace("_TimeNow_", timenow)
                                    , DuongDan: "");
                                if (guiMail)
                                {
                                    return JSonHelper.ToJson("1_Đã gửi mail kích hoạt tài khoản. Vui lòng kiểm tra mail để tiếp tục. Hệ thống sẽ tự động chuyển về trang đăng nhập trong vài giây tới!");
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
                            return JSonHelper.ToJson("0_Không thể tạo đường dẫn kích hoạt tài khoản. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                        }
                    }
                    else
                        return JSonHelper.ToJson("0_Địa chỉ mail " + mail + " không tồn tại. Vui lòng kiểm tra lại!");
                }
                else
                {
                    DataTable tab1 = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 NhaTuyenDungID, Email, TenToChuc FROM dbo.NhaTuyenDung WHERE Email=@Email", para).Tables[0];
                    if (tab1.Rows.Count > 0)
                    {
                        if (!string.IsNullOrWhiteSpace(tab1.Rows[0]["Email"].ToString()))
                        {
                            //Xử lý tạo mã và lưu db
                            //Cập nhật AuthCode và TimeAuthOut
                            string AuthID = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
                            string strCode = hostPath + "/ActiveAccount/AuthCodeActiveNTD.html?AuthID=" + AuthID; //link bảo mật
                            if (excuteSQL($@"UPDATE dbo.NhaTuyenDung SET TimeAuthOut=DATEADD(MINUTE, 1440 /*24 gio*/, GETDATE()), AuthID=N'{ComputeSha256Hash(AuthID)}' WHERE NhaTuyenDungID=N'{tab1.Rows[0]["NhaTuyenDungID"].ToString()}'"))
                            {
                                //Gửi mail
                                DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail WHERE DinhDanh='mail-kich-hoat'");
                                if (tabCauHinhGuiMail.Rows.Count > 0)
                                {
                                    bool guiMail = email_send(
                                        port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                        , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                        , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                        , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                        , TenEmailNhan: tab1.Rows[0]["Email"].ToString()
                                        , TenEmailCC: ""
                                        , TieuDe: "[Cổng thông tin việc làm] Kích hoạt tài khoản"
                                        , NoiDung: tabCauHinhGuiMail.Rows[0]["NoiDung"].ToString().Replace("_url_", strCode).Replace("_Code_", strCode).Replace("_tenDangNhap_", tab1.Rows[0]["TenToChuc"].ToString()).Replace("_TimeNow_", timenow)
                                        , DuongDan: "");
                                    if (guiMail)
                                    {
                                        return JSonHelper.ToJson("1_Đã gửi mail kích hoạt tài khoản. Vui lòng kiểm tra mail để tiếp tục. Hệ thống sẽ tự động chuyển về trang đăng nhập trong vài giây tới!");
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
                                return JSonHelper.ToJson("0_Không thể tạo đường dẫn kích hoạt tài khoản. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
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


        [WebMethod()]
        public string sendActivateEmail(string mail)
        {
            try
            {
                string hostPath = HttpContext.Current.Request.Url.Authority;
                //hostPath = "https://tdktvinhlong.nhattamsoft.vn/";
                SqlParameter[] para = {
                    new SqlParameter("@Email", mail)
                };
                DataTable tab = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 UngVienID, Email, HoVaTen FROM dbo.UngVien WHERE Email=@Email", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    if (!string.IsNullOrWhiteSpace(tab.Rows[0]["Email"].ToString()))
                    {
                        string strCode = hostPath + "/dang-nhap-ung-vien.html";
                        //Gửi mail
                        DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail WHERE DinhDanh='mail-thong-bao-kich-hoat-thanh-cong'");
                        if (tabCauHinhGuiMail.Rows.Count > 0)
                        {
                            bool guiMail = email_send(
                                port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                , TenEmailNhan: tab.Rows[0]["Email"].ToString()
                                , TenEmailCC: ""
                                , TieuDe: "[Cổng thông tin việc làm] Kích hoạt tài khoản thành công!"
                                , NoiDung: tabCauHinhGuiMail.Rows[0]["NoiDung"].ToString().Replace("_Code_", strCode).Replace("_tenDangNhap_", tab.Rows[0]["HoVaTen"].ToString()).Replace("_TimeNow_", timenow)
                                , DuongDan: "");
                            return JSonHelper.ToJson("1_Kích hoạt tài khoản thành công!");
                        }
                        else
                            return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
                    }
                    else
                        return JSonHelper.ToJson("0_Địa chỉ mail " + mail + " không tồn tại. Vui lòng kiểm tra lại!");
                }
                else
                {
                    DataTable tab1 = SqlHelper.ExecuteDataset(System.Configuration.ConfigurationManager.ConnectionStrings[connectionStrings].ConnectionString, CommandType.Text, "SELECT TOP 1 NhaTuyenDungID, Email, TenToChuc FROM dbo.NhaTuyenDung WHERE Email=@Email", para).Tables[0];
                    if (tab1.Rows.Count > 0)
                    {
                        if (!string.IsNullOrWhiteSpace(tab1.Rows[0]["Email"].ToString()))
                        {
                            string strCode = hostPath + "/dang-nhap-nha-tuyen-dung.html";
                            //Gửi mail
                            DataTable tabCauHinhGuiMail = getData("SELECT TOP 1 ThietLapEmailID,DiaChiEmail,MatKhau,DinhDanh,Server_,Port_,EmailTest,NoiDung FROM dbo.ThietLapEmail WHERE DinhDanh='mail-thong-bao-kich-hoat-thanh-cong'");
                            if (tabCauHinhGuiMail.Rows.Count > 0)
                            {
                                bool guiMail = email_send(
                                    port: int.Parse(tabCauHinhGuiMail.Rows[0]["Port_"].ToString())
                                    , sever: tabCauHinhGuiMail.Rows[0]["Server_"].ToString()
                                    , TenEmailGui: tabCauHinhGuiMail.Rows[0]["DiaChiEmail"].ToString()
                                    , MatKhauEmailGui: tabCauHinhGuiMail.Rows[0]["MatKhau"].ToString()
                                    , TenEmailNhan: tab1.Rows[0]["Email"].ToString()
                                    , TenEmailCC: ""
                                    , TieuDe: "[Cổng thông tin việc làm] Kích hoạt tài khoản thành công!"
                                    , NoiDung: tabCauHinhGuiMail.Rows[0]["NoiDung"].ToString().Replace("_Code_", strCode).Replace("_tenDangNhap_", tab1.Rows[0]["TenToChuc"].ToString()).Replace("_TimeNow_", timenow)
                                    , DuongDan: "");
                                return JSonHelper.ToJson("1_Kích hoạt tài khoản thành công!");
                            }
                            else
                                return JSonHelper.ToJson("0_Hiện tại hệ thống mail NTSOFT đang trong thời gian bảo trì. Vui lòng liên hệ bộ phận CSKH để được hỗ trợ!");
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