using ClosedXML.Excel;
using Cong.Class;
using Newtonsoft.Json;
using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Text.RegularExpressions;

namespace TTLD2024.Areas.DanhMuc.Controllers
{
    public class DungChungController : Controller
    {
        // GET: DanhMuc/DungChung
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string kiemTraTonTai(string ma, string tenCot, string tenBang)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("GiaTri", ma)
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTai", sqlParams);
                ep.Result = duLieu.ToString();
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        public static bool KiemTraTonTai(string ma, string tenCot, string tenBang)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("GiaTri", ma)
                };
                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTai", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string ThongBao(string ma, string tenBien, string GiaTri)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("ma", ma),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNoiDungThongBao", sqlParams);

                string thongBao = duLieu.Tables[0].Rows[0]["NoiDung"].ToString();

                // Thay thế các giá trị vào chuỗi nội dung
                string[] bienArr = tenBien.Split('_');
                string[] giaTriArr = GiaTri.Split('_');
                for (int i = 0; i < bienArr.Length; i++)
                {
                    //thongBao = thongBao.Replace(bienArr[i], giaTriArr[i]);
                    // Tạo chuỗi HTML để in đậm giá trị
                    string giaTriInDam = "<b>" + giaTriArr[i] + "</b>";
                    thongBao = thongBao.Replace(bienArr[i], giaTriInDam);
                }

                return thongBao;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static bool KiemTraTonTai_TheoDonVi(string ma, string tenCot, string tenBang)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("GiaTri", ma),
                    new SqlParameter("DonViID", NTSSession.GetDonVi().DonViID),
                };
                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTai_TheoDonVi", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static bool KiemTraTonTaiSua(string ma, string tenCot, string tenBang, string tenCotxet, string maID)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("ma", ma),
                    new SqlParameter("TenCotXet", tenCotxet),
                    new SqlParameter("maID", maID)
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSua", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public static bool KiemTraTonTaiSua_TheoDonVi(string ma, string tenCot, string tenBang, string tenCotxet, string maID)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("ma", ma),
                    new SqlParameter("TenCotXet", tenCotxet),
                    new SqlParameter("maID", maID),
                    new SqlParameter("DonViID", NTSSession.GetDonVi().DonViID),
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSua_TheoDonVi", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [HttpPost]
        public string LuuDangSD(string ID, string strCotID, string strBang, string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para =
                {
                    new SqlParameter("TenBang", strBang),
                    new SqlParameter("TenCot", strCotID),
                    new SqlParameter("ID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("NgungSD", DungChung.NormalizationBoolean(value))
                };

                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_DangSD", para).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThaoTacThatBai();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuCheckbox(string ID, string strCotID, string strBang, string cotThayDoi, string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para =
                {
                    new SqlParameter("TenBang", strBang),
                    new SqlParameter("TenCot", strCotID),
                    new SqlParameter("TenCotThayDoi", cotThayDoi),
                    new SqlParameter("ID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("NgungSD", DungChung.NormalizationBoolean(value))
                };

                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_Checkbox", para).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThaoTacThatBai();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string KiemTraXoaDT(string TenCot, string ID, string TenBangHienTai, string[] CacBangKhongXet)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string strCacBangKhongXet = "";
                if (CacBangKhongXet != null)
                {
                    strCacBangKhongXet = string.Join(";", CacBangKhongXet);
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@TenCot", TenCot),
                    new SqlParameter("@TenBangHienTai", TenBangHienTai),
                    new SqlParameter("@CacBangKhongXet", strCacBangKhongXet)
                };

                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa", sqlParams).Tables[0];
                string strSQL;
                string eRR = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

                if (tab.Rows.Count > 0)
                {
                    try
                    {
                        for (int i = 0; i < tab.Rows.Count; i++)
                        {
                            SqlParameter[] sqlParams1 = {
                                new SqlParameter("@TenCot", TenCot),
                                new SqlParameter("@TenBang", tab.Rows[i][1].ToString()),
                                new SqlParameter("@ID", DungChung.NormalizationGuid(ID))
                            };
                            var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa_BangSD", sqlParams1);
                            if (duLieu != null)
                                eRR += "<b>- " + tab.Rows[i][1] + "</b><br/>";
                        }
                    }
                    catch (Exception ex)
                    {
                        ep.Msg = ex.Message;
                        ep.Result = eRR;
                        return JSonHelper.ToJson(ep);
                    }
                }
                ep.Result = eRR;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }

       
        [HttpPost]
        public string KiemTraXoaDT_CotCha(string TenCot, string TenCot_Cha, string ID, string TenBangHienTai, string[] CacBangKhongXet)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string strCacBangKhongXet = "";
                if (CacBangKhongXet != null)
                {
                    strCacBangKhongXet = string.Join(";", CacBangKhongXet);
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@TenCot", TenCot),
                    new SqlParameter("@TenBangHienTai", TenBangHienTai),
                    new SqlParameter("@CacBangKhongXet", strCacBangKhongXet)
                };

                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa", sqlParams).Tables[0];
                string strSQL;
                string eRR = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());

                if (tab.Rows.Count > 0)
                {
                    try
                    {
                        for (int i = 0; i < tab.Rows.Count; i++)
                        {
                            SqlParameter[] sqlParams1 = {
                                new SqlParameter("@TenCot", TenCot),
                                new SqlParameter("@TenBang", tab.Rows[i][0].ToString()),
                                new SqlParameter("@ID", DungChung.NormalizationGuid(ID))
                            };
                            var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa_BangSD", sqlParams1);
                            if (duLieu != null)
                                eRR += "<b>- " + tab.Rows[i][1] + "</b><br/>";
                        }
                    }
                    catch (Exception ex)
                    {
                        ep.Msg = ex.Message;
                        ep.Result = eRR;
                        return JSonHelper.ToJson(ep);
                    }
                }
                else
                {
                    try
                    {
                        SqlParameter[] sqlParams1 = {
                                new SqlParameter("@TenCot", TenCot),
                                new SqlParameter("@TenCot_Cha", TenCot_Cha),
                                new SqlParameter("@TenBang", TenBangHienTai),
                                new SqlParameter("@ID", DungChung.NormalizationGuid(ID))

                            };
                        var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa_BangSDTB", sqlParams1);
                        if (duLieu != null)
                            eRR += "<b>- " + TenBangHienTai + "</b><br/>";
                    }
                    catch (Exception ex)
                    {
                        ep.Msg = ex.Message;
                        ep.Result = eRR;
                        return JSonHelper.ToJson(ep);
                    }
                }
                ep.Result = eRR;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }

        public static ExecPermiss KiemTraXoaDT_nvarchar(string TenCot, string TenCot_Cha, string Ma, string TenBangHienTai, string[] CacBangKhongXet)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    ep.Result = NTSThongBao.KhongCoQuyenTruyCap();
                    return ep;
                }
                string strCacBangKhongXet = "";
                if (CacBangKhongXet != null)
                {
                    strCacBangKhongXet = string.Join(";", CacBangKhongXet);
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@TenCot", TenCot),
                    new SqlParameter("@TenBangHienTai", TenBangHienTai),
                    new SqlParameter("@CacBangKhongXet", strCacBangKhongXet)
                };

                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa", sqlParams).Tables[0];
                string strSQL;
                string eRR = "";
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
                int soluongbangchuama = 0;
                if (tab.Rows.Count > 0)
                {
                    try
                    {
                        for (int i = 0; i < tab.Rows.Count; i++)
                        {
                            SqlParameter[] sqlParams1 = {
                                new SqlParameter("@TenCot", TenCot),
                                new SqlParameter("@TenBang", tab.Rows[i][1].ToString()),
                                new SqlParameter("@Ma", DungChung.NormalizationString(Ma))
                            };
                            var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraXoa_BangSD_Nvarchar", sqlParams1);
                            if (duLieu != null)
                            {
                                soluongbangchuama += 1;
                                eRR += "<b>- " + tab.Rows[i][1] + "</b><br/>";
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        ep.Msg = ex.Message;
                        ep.Result = eRR;
                        return ep;
                    }
                }
                ep.Result = eRR;
                ep.Msg = soluongbangchuama.ToString();
                return (ep);
            }
            catch (Exception ex)
            {
                ep.Result = NTSThongBao.CoLoiXayRa(ex);
                return (ep);
            }

        }

        [HttpPost]
        public string GetToChucThucHien()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                //SqlParameter[] para = {
                //    new SqlParameter("@GiaiDoanDuAnID", DungChung.NormalizationGuid(GiaiDoanDuAnID)),
                //};
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, "select ToChucID='1', TenToChuc=N'Công ty Nhất Tâm' ").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }








        [HttpPost]
        public string GetCanBoCongChuc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT CanBoCongChucID,MaCanBoCongChuc,TenCanBoCongChuc FROM dbo.CanBoCongChuc where DonViID = '" + DungChung.NormalizationGuid(NTSSession.GetUser().DonViID) + "' ORDER BY MaCanBoCongChuc").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDonViID_LDT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, @"SELECT DonViID,MaDonVi,TenDonVi FROM dbo.DonVi WHERE DonViID <> '" + DungChung.NormalizationGuid(NTSSession.GetUser().DonViID) + "' ORDER BY MaDonVi").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetXa(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0])),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[1]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllXaTheoHuyen", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetHuyen_ComBo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHuyen_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetXaTheoHuyen(string data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllXaTheoHuyenID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetTinh()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllTinhCombo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDiaBanHCTinh_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiaBanHCTinh_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDiaBanHCHuyen_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiaBanHCHuyen_Combo", DungChung.NormalizationGuid(id)).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDiaBanHCXa_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiaBanHCXa_Combo", DungChung.NormalizationGuid(id)).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDiaBanHCThon_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiaBanHCThon_Combo", DungChung.NormalizationGuid(id)).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetLoaiDiaBan_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiDiaBan_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetTinh_NoiCap()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllTinh_NoiCap_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetHuyenTheoTinh(string TinhID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (TinhID == null)
                {
                    TinhID = "";
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("TinhID", DungChung.NormalizationGuid(TinhID)),
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHuyenTheoTinh", sqlParams).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetThonTheoXa(string XaID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (XaID == null)
                {
                    XaID = "";
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("XaID", DungChung.NormalizationGuid(XaID)),
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThonTheoXa", sqlParams).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetNoiDangKyTheoLoaiDoiTuong(string LoaiDoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("LoaiDoiTuongID", DungChung.NormalizationGuid(LoaiDoiTuongID)),
                    new SqlParameter("DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_NoiDangKyTheoLoaiDoiTuong", sqlParams).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetTreeNguonVon()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                //ep.Result = JsonConvert.SerializeObject((new NestedData()).CreateTree_NguonVon(), Formatting.Indented,
                //    new JsonSerializerSettings()
                //    {
                //        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                //    }
                //);
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetTreeDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                ep.Result = JsonConvert.SerializeObject((new NestedData()).CreateTree_DonVi(), Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                }
            );
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //[HttpPost]
        //public string LayMaTuTang(string strKyTu, string strCotTang, string strBangTang, string strDinhDang)
        //{
        //    ExecPermiss ep = new ExecPermiss();
        //    try
        //    {
        //        if (!NTSSecurity.Validate())
        //        {
        //            return NTSThongBao.KhongCoQuyenTruyCap();

        //        }

        //        SqlParameter[] sqlParams = {
        //            new SqlParameter("TenBang", strBangTang),
        //            new SqlParameter("TenCot", strCotTang)
        //        };

        //        var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_LayMaTuTang", sqlParams);
        //        decimal maxcode = Decimal.Parse(duLieu.ToString()) + 1;
        //        string soPhieu = strKyTu + maxcode.ToString(strDinhDang);
        //        ep.Result = soPhieu;
        //        return JSonHelper.ToJson(ep);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NTSThongBao.CoLoiXayRa(ex);
        //    }
        //}

        [HttpPost]
        public string LayMaTuTang(string kyhieuLoaiPhieu, string bangDuLieu, string cotDuLieu, string dieuKienTruyVan, string ngayLap)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string maTuTang = DungChung.taoMaTuTangTheoDM(kyhieuLoaiPhieu, bangDuLieu, cotDuLieu, dieuKienTruyVan, ngayLap);
                ep.Result = maTuTang;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LayMaTuTangTheoDonVi(string strKyTu, string strCotTang, string strBangTang, string strDinhDang)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();

                }

                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", strBangTang),
                    new SqlParameter("TenCot", strCotTang),
                    new SqlParameter("DonViID",DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID.ToString()))
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_LayMaTuTangTheoDonVi", sqlParams);
                decimal maxcode = Decimal.Parse(duLieu.ToString()) + 1;
                string soPhieu = strKyTu + maxcode.ToString(strDinhDang);
                ep.Result = soPhieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDonViTheoDonViTrucThuoc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DoiViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi_TheoDonViTrucThuoc", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDonViKiemTraDT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DoiViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi_KTDT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDonViKiemTraDTv2()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DoiViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonVi_KTDTv2", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCapNganSach()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT CapNganSachID,MaCapNganSach,TenCapNganSach FROM dbo.CapNganSach ORDER BY MaCapNganSach").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetNhomDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT NhomDVID,TenNhomDV FROM dbo.NhomDV ORDER BY TenNhomDV").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetLoaiDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT LoaiHinhDonViID,MaLoaiHinhDonVi,TenLoaiHinhDonVi FROM dbo.LoaiHinhDonVi ORDER BY MaLoaiHinhDonVi").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAllNienDo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = new DataTable();
                //SqlFunction sqlfun = new SqlFunction(NTSSession.GetConnectionString2());
                duLieu.Columns.Add("NamXetDuyetText");

                for (int i = 0; i < 50; i++)
                {
                    duLieu.Rows.Add((i + 1995).ToString());
                }
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetChuongCapXa()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT ChuongID,MaChuong,TenChuong FROM dbo.Chuong WHERE ISNULL(TrangThai,0) = 1 AND CapChuongID = '4' ORDER BY MaChuong").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetMaChuongByID(string LoaiChi, string ChuongID, string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string sql = "";
                if (LoaiChi == "CTX")
                {
                    sql += @"UPDATE dbo.DuToanChiTXCNSCT SET MaChuong = ISNULL((SELECT TOP 1 MaChuong FROM dbo.Chuong WHERE ChuongID = '" + DungChung.NormalizationString(ChuongID) + "'), '') OUTPUT inserted.* WHERE DuToanChiTXCNSCTID = '" + DungChung.NormalizationString(ID) + "'";
                }
                else if (LoaiChi == "CDTPT")
                {
                    sql += @"UPDATE dbo.DuToanChiDTPTCNSCT SET MaChuong = ISNULL((SELECT TOP 1 MaChuong FROM dbo.Chuong WHERE ChuongID = '" + DungChung.NormalizationString(ChuongID) + "'), '') OUTPUT inserted.* WHERE DuToanChiDTPTCNSCTID = '" + DungChung.NormalizationString(ID) + "'";
                }
                else if (LoaiChi == "CCTMT")
                {
                    sql += @"UPDATE dbo.DuToanChiCTMTCNSCT SET MaChuong = ISNULL((SELECT TOP 1 MaChuong FROM dbo.Chuong WHERE ChuongID = '" + DungChung.NormalizationString(ChuongID) + "'), '') OUTPUT inserted.* WHERE DuToanChiCTMTCNSCTID = '" + DungChung.NormalizationString(ID) + "'";
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text, sql).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetChuong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
             "SELECT ChuongID,MaChuong,TenChuong FROM dbo.Chuong WHERE ISNULL(DangSD,0) = 1 ORDER BY TenChuong").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_TonGiao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTonGiao_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_DanToc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDanToc_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_KhuVuc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetKhuVuc_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
     
        [HttpPost]
        public string GetComBo_TheLoaiNhaO()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTheLoaiNhaO_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TheLoaiNhaVeSinh()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiNhaVeSinh_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_NuocSinhHoat()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNuocSinhHoat_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_NguonDienSuDung()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNguonDienSuDung_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_PhanLoaiHoNgheo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetPhanLoaiHoNgheoQuocGia_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetCombo_QuocGia()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetQuocGia_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetCombo_QuocGiaLVNuocNgoai()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetQuocGiaLVNuoNgoai_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetComBo_MoiQuanHe()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetQuanHe_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_MoiQuanHeKhongChuHo(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@Loai", DungChung.NormalizationString(data[0].ToString())),
                    new SqlParameter("@Ma", DungChung.NormalizationString(data[1].ToString())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetQuanHe_ComBo_KhongChuHo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_TinhTrangHonNhan()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTinhTrangHonNhan_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_HinhThucSoHuuNha()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHinhThucSoHuuNha_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_Thang()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThang_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_Ky()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_Ky", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDoiTuong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuong", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDanhSachDoiTuongTheoDiaBan(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0])),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[1])),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2])),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3])),
                    new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(data[4])),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[5])),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllChonDoiTuong", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetHoGiaDinHTheoDiaBan(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0])),
                    new SqlParameter("@HuyenID", DungChung.NormalizationGuid(data[1])),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2])),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3])),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllHoGiaDinhTheoDiaBan", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDoiTuongComBo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                     new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuong_Combo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

















        [HttpPost]
        public string GetDataDoiTuong(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@Tinh", DungChung.NormalizationGuid( data[0])),
                    new SqlParameter("@Huyen", DungChung.NormalizationGuid( data[1])),
                    new SqlParameter("@Xa", DungChung.NormalizationGuid( data[2])),
                    new SqlParameter("@Thon", DungChung.NormalizationGuid( data[3])),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid( NTSSession.GetDonVi().DonViID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuong_Search", sqlParams).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        public static DataTable getNienDo()
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
            @"select top 1 NienDoBatDau, NienDoKetThuc from CauHinhHeThong");

                int NamBD = int.Parse(ds.Tables[0].Rows[0]["NienDoBatDau"].ToString());
                int NamKT = int.Parse(ds.Tables[0].Rows[0]["NienDoKetThuc"].ToString());

                DataTable table = new DataTable();
                table.Columns.Add("NamLamViec");
                for (int i = NamBD; i <= NamKT; i++)
                {
                    table.Rows.Add(i.ToString());
                }
                execPermiss = new ExecPermiss();
                ds = new DataSet();
                ds.Tables.Add(table);
                return ds.Tables[0];
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }
        [HttpPost]
        public string CapNhatKyBaoCao(string kyBaoCao, string namBaoCao)
        {
            ExecPermiss execPermiss = new ExecPermiss();
            try
            {
                execPermiss.Result = DungChung.CapNhatNamBaoCao(kyBaoCao, namBaoCao);
                return JSonHelper.ToJson(execPermiss);
            }
            catch (Exception ex)
            {
                execPermiss.Result = false;
                return JSonHelper.ToJson(execPermiss);
            }
        }
        [HttpPost]
        public string GetComBo_ThuTucThamGiaBHYT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThuTucThamGiaBHYT_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }



        [HttpPost]
        public string GetComBo_CoSoKCB()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCoSoKCB_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_NoiCapTheBHYT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNoiCapTheBHYT_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_PhuongThucDong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetPhuongThucDong_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string getUserInfo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllUserTheoID", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }





        [HttpPost]
        public string GetDoiTuong_TheoHoGiaDinh(string HoGiaDinhID, string DoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(HoGiaDinhID))
                                        ,new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(DoiTuongID))
                                        ,new SqlParameter("@DoiViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuong_TheoHoGiaDinh", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDoiTuong_TheoHoGiaDinh_ToKhaiBHYT(string HoGiaDinhID, string DoiTuongID, string ChuoiDoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@HoGiaDinhID", DungChung.NormalizationGuid(HoGiaDinhID))
                                        ,new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(DoiTuongID))
                                        ,new SqlParameter("@ChuoiDoiTuongID", DungChung.NormalizationString(ChuoiDoiTuongID))
                                        ,new SqlParameter("@DoiViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDoiTuong_TheoHoGiaDinh_ToKhaiBHYT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDoiTuongByID(string DoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(DoiTuongID)) };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDoiTuongTheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }





        [HttpPost]
        public string GetDoiTuongByID_US(string DoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@DoiTuongID", DungChung.NormalizationGuid(DoiTuongID)) };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_US_GetDoiTuongTheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetDoiTuongByHoGiaDinhID_US(string HoGiaDinhID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlFunction sqlFunction = new SqlFunction(NTSSession.GetConnectionString1());

                string DoiTuongID = sqlFunction.GetOneStringField("select convert(nvarchar(50),DoiTuongID_ChuHo) from HoGiaDinh where HoGiaDinhID='" + HoGiaDinhID + "'").ToString();
                ep.Result = DoiTuongID;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetDataThietLapDonVi()
        {
            try
            {
                SqlParameter[] param = {
                        new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                    };
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetthietlapHeThong", param);
                return JSonHelper.ToJson(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public string GetThongTinDonViThaoTac()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDonViTheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetCombo_ThietBiThongTin()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThietBiThongTin_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCombo_TieuChiDoLuongChuanNgheo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTieuChiDoLuongChuanNgheo_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCombo_ChiTietHoNgheo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChiTietHoNgheo_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCombo_TatCaLoaiDoiTuong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllLoaiDoiTuong_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetMucLuongCoSoTheoNgay(string Ngay)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = { new SqlParameter("@Ngay", DungChung.NormalizationDateTime(Ngay)) };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMucLuongCoSoTheoNgay", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }



        [HttpPost]
        public string GetNhomNguoiDung()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                int nhomnguoidung = 3;
                //if (NTSSession.GetUser().UserGroupCode.ToLower() == "admin")
                //{
                //    nhomnguoidung = 0;
                //}
                //else if (NTSSession.GetUser().UserGroupCode.ToLower() == "thtinh" || NTSSession.GetUser().UserGroupCode.ToLower() == "thhuyen")
                //{
                //    nhomnguoidung = 1;
                //}
                //else if (NTSSession.GetUser().UserGroupCode.ToLower() == "tonghop")
                //{
                //    nhomnguoidung = 2;
                //}
                //else if (NTSSession.GetUser().UserGroupCode.ToLower() == "nguoisd")
                //{
                //    nhomnguoidung = 3;
                //}
                //else
                //{
                //    nhomnguoidung = 4;
                //}
                SqlParameter[] para = { new SqlParameter("@UserGroupCode", DungChung.NormalizationString(NTSSession.GetUser().UserGroupCode.ToLower())) };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetPhanQuyenChoBoLocDiaBan", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    nhomnguoidung = int.Parse(duLieu.Rows[0]["NhomNguoiDung"].ToString());
                }
                return JSonHelper.ToJson(nhomnguoidung);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAllPhuongAnKhaiBao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetPhuongAn_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_CapHoc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCapHoc_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TrangThai(string ChucNang)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTrangThai_Combo", ChucNang).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDiaChi_ByUser()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiaChi_ByUser", sqlParams).Tables[0];
                return JSonHelper.ToJson(duLieu);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ChinhSach()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChinhSach_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ToKhai(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] sqlParams = {
                    new SqlParameter("@LaBHYT", DungChung.NormalizationBoolean(ID)),
                    new SqlParameter("@DonViID",DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID.ToString()))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetToKhai_Combo", sqlParams).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_NhomDoiTuong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhomDoiTuong_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }








        [HttpPost]
        public string GetComBo_NhomDoiTuong_CapPhat()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhomDoiTuong_Combo_CapPhat", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }





        [HttpPost]
        public string GetCombo_TinhHinhThietHai()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTinhHinhThietHai_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LayMaTuTang_TuDanhMuc()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string maTuTang = DungChung.taoMaTuTangTheoDM("TKDKTGBHYT", "ToKhaiThamGiaBHYT", "MaHoSo", "", "");
                ep.Result = maTuTang;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetAllThuTucTheoMaChinhSach(string LoaiChinhSach)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@LoaiChinhSach", DungChung.NormalizationString(LoaiChinhSach)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllThuTucThamGiaTGXH_TheoChinhSach", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAllToKhaiMauTheoThuTuc(string ThuTucID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ThuTucID", DungChung.NormalizationGuid(ThuTucID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllToKhaiMau_TheoThuTucThamGiaTGXH", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_MaKBNN()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMaKBNN_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_MucDoKhuyetTat()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMucKhuyetTat_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetLoaiDoiTuongTheoNhomDoiTuong(string NhomDoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@NhomDoiTuongID", DungChung.NormalizationGuid(NhomDoiTuongID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiDoiTuongTheoNhomDoiTuong_Combo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetLoaiDoiTuongTheoNhomDoiTuongCoMucHuong(string NhomDoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@NhomDoiTuongID", DungChung.NormalizationGuid(NhomDoiTuongID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiDoiTuongTheoNhomDoiTuongCoMucHuong_Combo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string Encrypt(string ID)
        {
            try
            {
                string textToEncrypt = ID;
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] secretkeyByte = { };
                secretkeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = System.Text.Encoding.UTF8.GetBytes(textToEncrypt);
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateEncryptor(publickeybyte, secretkeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    ToReturn = Convert.ToBase64String(ms.ToArray());
                }
                return JSonHelper.ToJson(ToReturn);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        [HttpPost]
        public string Decrypt(string ID)
        {
            try
            {
                string textToDecrypt = ID;
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] privatekeyByte = { };
                privatekeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = new byte[textToDecrypt.Replace(" ", "+").Length];
                inputbyteArray = Convert.FromBase64String(textToDecrypt.Replace(" ", "+"));
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateDecryptor(publickeybyte, privatekeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    Encoding encoding = Encoding.UTF8;
                    ToReturn = encoding.GetString(ms.ToArray());
                }

                return JSonHelper.ToJson(ToReturn);
            }
            catch (Exception ae)
            {
                throw new Exception(ae.Message, ae.InnerException);
            }
        }

        [HttpPost]
        public string GetHoGiaDinhID_ByDoiTuongID(string DoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para =
                {
                    new SqlParameter("@DoiTuongID",DungChung.NormalizationGuid(DoiTuongID))
                    ,new SqlParameter("@DonViID",DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHoGiaDinhID_ByDoiTuongID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAll_ThanhVienTheoHoGiaDinh(string HoGiaDinhID, string DoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@HoGiaDinhID",DungChung.NormalizationGuid(HoGiaDinhID)),
                    new SqlParameter("@DoiTuongID",DungChung.NormalizationGuid(DoiTuongID)),
                    new SqlParameter("@DonViID",DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDoiTuong_TheoVoChong_TheoHoGiaDinh", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetTenToKhaiMau(string duongDan)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DuongDan", DungChung.NormalizationString(duongDan)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTenToKhaiMau", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string ViewDuLieu_TGXH(string ID, string Loai)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ThamChieuID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("@Loai", DungChung.NormalizationString(Loai)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ViewToKhaiTGXHTheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }


        }
        [HttpPost]
        public string GetDoiTuong_TheoMau03(string ToKhaiTGXHCaNhanID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ToKhaiTGXHCaNhanID", DungChung.NormalizationGuid(ToKhaiTGXHCaNhanID)),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDoiTuong_ThamGiaMau03", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadDuLieuDoiTuong_TheoMau03(string ToKhaiTGXHCaNhanID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@ToKhaiTGXHCaNhanID", DungChung.NormalizationGuid(ToKhaiTGXHCaNhanID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDoiTuong_ThamGiaMau03_TheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        public void XoaMacDinhSD(string ID, string stringCotID, string strBang)
        {
            SqlParameter[] para =
            {
                new SqlParameter("TenBang", strBang),
                new SqlParameter("TenCot", stringCotID),
                new SqlParameter("ID", DungChung.NormalizationGuid(ID))
            };
            SqlHelper.ExecuteNonQuery(NTSSession.GetConnectionString1(), "Proc_XoaMacDinhSD", para);
        }
        [HttpPost]
        public string LuuMacDinhSD(string ID, string strCotID, string strBang, string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();

                }

                SqlParameter[] para =
                {
                    new SqlParameter("TenBang", strBang),
                    new SqlParameter("TenCot", strCotID),
                    new SqlParameter("ID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("MacDinhSD", DungChung.NormalizationBoolean(value))
                };

                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_MacDinhSD", para).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    XoaMacDinhSD(ID, strCotID, strBang);
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThaoTacThatBai();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadComboMacDinhSD(string TenBang)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TenBang", TenBang),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMacDinhSD", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCombo_LoaiVanBan_HoKhau()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiVanBan_HoKhau", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string KiemTra_LoaiDoiTuong_ThuocHoGiaDinh(string LoaiDoiTuongID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@LoaiDoiTuongID", DungChung.NormalizationGuid(LoaiDoiTuongID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiDoiTuong_ThuocHoGiaDinh", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LayMaTuTang_HoGiaDinh_TheoDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string maTuTang = DungChung.taoMaTuTangTheoDM_TheoDonVi("HGD", "HoGiaDinh", "MaHoGiaDinh", "", "");
                maTuTang = maTuTang.Replace("MaDonVi", NTSSession.GetDonVi().MaDonVi.ToString());
                ep.Result = maTuTang;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCombo_VungSinhSong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_VungSinhSong", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetColor()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                return JSonHelper.ToJson(NTSSession.GetColor());
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCauHinhWebSite3()
        {
            try
            {
                string _vConnectstring = System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                string _dataName = _vConnectstring.Split(';')[1].Replace("Initial Catalog=", "");
                _vConnectstring = _vConnectstring.Replace(_vConnectstring.Split(';')[1], "Initial Catalog=master");
                SqlFunction _vSql = new SqlFunction(_vConnectstring);
                _vConnectstring = _vConnectstring.Replace("master", _dataName.ToLower());
                _vSql = new SqlFunction(_vConnectstring);
                DataTable _vdt = _vSql.GetData(@"select TenDonVi=ISNULL(TenDonVi,''),DiaChi=ISNULL(DiaChi,''),
                SoDT=ISNULL(SoDT,''),Fax=ISNULL(Fax,''),Email=ISNULL(Email,''),Web=ISNULL(Web,''),TenPMVietTat=ISNULL(TenPMVietTat,''),
                TenPhanMem = (select TenDonVi=ISNULL(TenDonVi,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                TenPMVietTatPM = (select TenPMVietTat=ISNULL(TenPMVietTat,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                PhienBanPM = (select PhienBan=ISNULL(PhienBan,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1),
                Banner = (select Banner=ISNULL(Banner,'') FROM CauHinhWebsite where MaCauHinh='03' and ISNULL(DangSD,0)=1)    
                from CauHinhWebsite where MaCauHinh='02' and ISNULL(DangSD,0)=1");
                var customerData = _vdt.AsEnumerable();
                if (_vdt.Rows.Count > 0)
                {

                    if (_vdt.Rows[0]["Banner"].ToString() != "")
                    {
                        string[] Path = _vdt.Rows[0]["Banner"].ToString().Split('*');
                        int kiemtra = 0;
                        Random rand = new Random();
                        int stt = Path.Length;
                        for (int i = 0; i < Path.Length; i++)
                        {
                            kiemtra = rand.Next(0, Path.Length - 1);
                            break;
                        }
                        _vdt.Rows[0]["Banner"] = Path[kiemtra].ToString().Replace("*", "").Replace("~", "");
                    }
                    else
                    {
                        _vdt.Rows[0]["Banner"] = _vdt.Rows[0]["Banner"].ToString();
                    }
                    _vdt.AcceptChanges();

                }
                return JSonHelper.ToJson(_vdt);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(new DataTable());
            }
        }

        [HttpPost]
        public string GetHuyen(string data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                    "SELECT HuyenID,MaHuyen,TenHuyen FROM dbo.Huyen WHERE ISNULL(DangSD,0) = 1 AND TinhID = N'" + DungChung.NormalizationGuid(data) + "' ORDER BY TenHuyen").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Chương
        [HttpPost]
        public string GetChuongCombo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChuong_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Chương
        [HttpPost]
        public string GetNguonThuNSNNCombo(string loai, string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                      new SqlParameter("@Loai", loai),
                      new SqlParameter("@ID", DungChung.NormalizationGuid(ID)),
                 };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNguonThuNSNNByID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Loại, khoản
        [HttpPost]
        public string GetLoaiKhoanCombo(string Loai, string LoaiKhoanID_Loai)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                      new SqlParameter("@Loai", Loai),
                      new SqlParameter("@LoaiKhoanID_Loai", DungChung.NormalizationGuid(LoaiKhoanID_Loai)),
                 };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiKhoan_Combo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Mục,tiểu mục
        [HttpPost]
        public string GetMucTieuMucCombo(int Loai, string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                      new SqlParameter("@Loai", DungChung.NormalizationNumber(Loai)),
                      new SqlParameter("@MucTieuMucID_cha", DungChung.NormalizationGuid(ID)),
                 };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMucTieuMuc_Combo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Nguồn kinh phí
        [HttpPost]
        public string GetNguonKinhPhiCombo(int Loai, string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                      new SqlParameter("@Loai", DungChung.NormalizationNumber(Loai)),
                      new SqlParameter("@NguonKinhPhiID_cha", DungChung.NormalizationGuid(ID)),
                 };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNguonKinhPhi_Combo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string LuuCotDangSD(string ID, string strCotID, string strBang, string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                SqlParameter[] para =
                {
                    new SqlParameter("TenBang", strBang),
                    new SqlParameter("TenCot", strCotID),
                    new SqlParameter("ID", DungChung.NormalizationGuid(ID)),
                    new SqlParameter("DangSD", DungChung.NormalizationBoolean(value))
                };

                DataTable dt = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Update_CotDangSD", para).Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return NTSThongBao.CapNhatThanhCong();
                }
                else
                {
                    return NTSThongBao.ThaoTacThatBai();
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDonViTienTe()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAllDonViTienTeCombo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDonViDangDangNhap()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), CommandType.Text,
                    "SELECT DonViID,MaQHNS,MaDonVi,TenDonVi FROM dbo.DonVi WHERE DonViID='" + DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID) + "'").Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetThongTinMacDinhDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para =
                {
                    new SqlParameter("@DonViID",DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID",NTSSession.GetUser().UserID),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThongTinMacDinhCuaDonVi", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public static void LuuNhatKyThaoTacGuiNhan(Guid ThamChieuID, string TenChucNang, DateTime NgayGui, Guid NguoiGui, Guid DonViGui, string DienGiai, string ThongBaoCode, string DuongDan, string TrangThaiCode, string LoaiNhatKy, string NienDo, bool LaThongBao, string DonViID_Nhan)
        {
            try
            {
                //ThamChieuID Khóa ngoại các chức năng
                //TenChucNang 
                //ThongBaoCode: Xem mã code từ bảng ThongBao trên database
                //DuongDan: Chức năng cần trỏ tới khi click vào thông báo
                //TrangThaiCode: Xem mã code từ bảng TrangThai
                //LoaiNhatKy: TB Thông báo (Đề xuất lựa chọn này); HD Hoạt động; HT Hệ thống
                //LaThongBao: Nếu = false sẽ chỉ lưu vào nhật ký, không lưu vào bảng thông báo và không hiển thị thông báo lên hệ thống.
                //DonViID_Nhan: Đơn vị sẽ thấy được thông báo; Dạng string nối chuỗi các ID đơn vị với nhau
                SqlParameter[] paraValue = {
                    new SqlParameter("@CanBoCongChucID_TiepNhan",ThamChieuID),
                    new SqlParameter("@NgayTiepNhan", null),
                    new SqlParameter("@NoiDung_HoanThanh", null),
                    new SqlParameter("@NoiDung_TiepNhan", null),
                    new SqlParameter("@DonViID_TiepNhan", DonViID_Nhan),
                     new SqlParameter("@UserID_TiepNhan",null),
                    new SqlParameter("@UserID",NTSSession.GetUser().UserID),
                    new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                    new SqlParameter("@CanBoCongChucID_Gui", NguoiGui),
                    new SqlParameter("@NoiDung_Gui", DienGiai),
                    new SqlParameter("@NgayGui", NgayGui),
                    new SqlParameter("@KhoaNgoaiID", ThamChieuID),
                    new SqlParameter("@NgayHoanThanh", null),
                    new SqlParameter("@NgayKiemTra",null),
                    new SqlParameter("@CanBoCongChucID_KiemTra", null),
                    new SqlParameter("@NoiDung_KiemTra",null),
                    new SqlParameter("@TrangThai", TrangThaiCode),
                    new SqlParameter("@ThongBaoCode", ThongBaoCode),
                    new SqlParameter("@ChucNangChuyenDen", DuongDan),
                    new SqlParameter("@LoaiNhatKy", LoaiNhatKy),
                    new SqlParameter("@LaThongBao", LaThongBao),
                    new SqlParameter("@NienDo", DungChung.NormalizationNumber(NienDo)),
                    new SqlParameter("@DonViID_Gui", DonViGui)
            };
                SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "LuuNhatKy", paraValue);
            }
            catch (Exception ex)
            {

            }
        }
        [HttpPost]
        public string LayMaTuTang_TheoMaDonVi(string kyTu, string TenBang, string TenCotMa)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string maTuTang = DungChung.taoMaTuTangTheoDM_TheoMaDonVi(kyTu, TenBang, TenCotMa, "", "");
                maTuTang = maTuTang.Replace("MaDonVi", NTSSession.GetDonVi().MaDonVi.ToString());
                ep.Result = maTuTang;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetLoaiVanBan_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiVanBan_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetThongTinDonViLamViec()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(HttpContext.Session["SessionDonViID_LamViec_" + NTSSession.GetDonVi().DonViID.ToString()])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDonViTheoID", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_NhomDV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhomDV_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetKyBaoCaoTheoLoai(string loai)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (loai == "1")//Qúy
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao WHERE KyBaoCaoID IN ('14', '15','16','17')").Tables[0];
                    ep.Result = duLieu;
                }
                else if (loai == "2")//Tháng 
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT b.KyBaoCaoID,b.TenKyBaoCao FROM dbo.KyBaoCao b WHERE b.KyBaoCaoID IN ( SELECT a.KyBaoCaoID FROM dbo.KyBaoCao a WHERE a.KyBaoCaoID <= 12)").Tables[0];
                    ep.Result = duLieu;
                }
                else if (loai == "3")//Qúy + 6 tháng
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao WHERE KyBaoCaoID IN ('13', '14', '15','16','17')").Tables[0];
                    ep.Result = duLieu;
                }
                else if (loai == "4")//Năm 12 tháng hoặc 13 tháng
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao WHERE KyBaoCaoID IN ('13')").Tables[0];
                    ep.Result = duLieu;
                }
                else if (loai == "5")//6 tháng
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao WHERE KyBaoCaoID IN ('18','19')").Tables[0];
                    ep.Result = duLieu;
                }
                else if (loai == "6")//6 tháng, năm
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao WHERE KyBaoCaoID IN ('18','19', '13')").Tables[0];
                    ep.Result = duLieu;
                }
                else if (loai == "7")// không gồm Tùy chọn ngày
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao WHERE KyBaoCaoID NOT IN ('20')").Tables[0];
                    ep.Result = duLieu;
                }
                else
                {
                    DataTable duLieu = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), CommandType.Text,
"SELECT KyBaoCaoID,TenKyBaoCao FROM dbo.KyBaoCao").Tables[0];
                    ep.Result = duLieu;
                }
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetKyBaoCao_Thang()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                return GetKyBaoCaoTheoLoai("2");
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetKyBaoCao_6Thang()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                return GetKyBaoCaoTheoLoai("5");
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetKyBaoCao_6ThangNam()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                return GetKyBaoCaoTheoLoai("6");
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LoadComboPhanLoai()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetPhanLoai_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAllNienDo_layout()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                ep.Result = DungChung.getNienDo();
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XuatDataExcel(string Cot, string Data, string TenFile)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable dulieu = JSonHelper.ToTable(Data);
                DataTable tbcot = JSonHelper.ToTable(Cot);
                DataTable dt = new DataTable();
                string[] mangCot = new string[] { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "An", "AO" };
                _LOfficeExcel _vLOfficeExcel = new _LOfficeExcel();
                string fileKQ = "", url = "", KetQua = "";
                int vDongXuat = 3;
                string fileName = TenFile.Trim() + ".xlsx";
                string fileMau = Server.MapPath("~/ExcelMau/DanhMuc/ExcelMau.xlsx");
                _LOfficeExcel vlo = new _LOfficeExcel();

                fileKQ = Server.MapPath("~/Excel/DanhMuc" + "/" + NTSSession.GetDonVi().MaDonVi + "/ExcelDM/" + fileName.Trim());
                url = "~/Excel/DanhMuc" + "/" + NTSSession.GetDonVi().MaDonVi + "/ExcelDM/";
                if (!System.IO.Directory.Exists(Server.MapPath(url)))
                {
                    System.IO.Directory.CreateDirectory(Server.MapPath(url));
                }
                DirectoryInfo di = new DirectoryInfo(Server.MapPath(url));
                FileInfo[] rgFiles = di.GetFiles();
                try
                {
                    foreach (FileInfo fi in rgFiles)
                    {
                        fi.Delete();
                    }
                }
                catch
                { }
                System.IO.File.Copy(fileMau, fileKQ, true);
                var wb = new XLWorkbook(fileKQ);
                var ws = wb.Worksheet(1);
                try
                {
                    ws.Range("A1:" + mangCot[tbcot.Rows.Count] + "1").Merge();
                    ws.Range("A1:" + mangCot[tbcot.Rows.Count] + "1").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Font.SetBold(true);
                    ws.Cell("A1").Value = TenFile.ToUpper();
                    ws.Cell("A2").Value = "STT";
                    ws.Column("A").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    ws.Column(_LOfficeExcel.ColumsCell[1]).Width = 5;

                }
                catch
                {

                }
                for (int k = 0; k < tbcot.Rows.Count; k++)
                {
                    string vitri = mangCot[k + 1].ToString();
                    string TenCot = tbcot.Rows[k]["TenCot"].ToString();
                    if (TenCot == "Trạng thái sử dụng")
                    {
                        ws.Column(_LOfficeExcel.ColumsCell[k + 2]).Width = double.Parse(tbcot.Rows[k]["DoRong"].ToString()) + 5;
                    }
                    else
                    {
                        ws.Column(_LOfficeExcel.ColumsCell[k + 2]).Width = double.Parse(tbcot.Rows[k]["DoRong"].ToString());
                    }
                    ws.Cell(vitri + "2").Value = TenCot;
                    switch (tbcot.Rows[k]["CanhLe"].ToString())
                    {
                        case "Center":
                            ws.Column(vitri).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                            break;
                        case "Left":
                            ws.Column(vitri).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                            break;
                        default:
                            ws.Column(vitri).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);
                            break;
                    }
                    if (k + 2 > tbcot.Rows.Count)
                    {
                        ws.Range("A2:" + vitri + "2").Style.Border.SetBottomBorder(XLBorderStyleValues.Thin).Border.SetTopBorder(XLBorderStyleValues.Thin).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Border.SetRightBorder(XLBorderStyleValues.Thin).Border.SetLeftBorder(XLBorderStyleValues.Thin).Font.SetBold(true);
                    }
                }

                for (int i = 0; i < dulieu.Rows.Count; i++)
                {
                    string vitricot = mangCot[tbcot.Rows.Count].ToString();
                    CultureInfo culture = CultureInfo.GetCultureInfo("vi-VN");
                    ws.Range("A" + vDongXuat + ":" + vitricot + vDongXuat).Style.Border.SetBottomBorder(XLBorderStyleValues.Thin).Border.SetTopBorder(XLBorderStyleValues.Thin).Border.SetRightBorder(XLBorderStyleValues.Thin).Border.SetLeftBorder(XLBorderStyleValues.Thin);
                    ws.Cell("A" + vDongXuat).Value = (i + 1).ToString();
                    for (int l = 0; l < tbcot.Rows.Count; l++)
                    {
                        if (tbcot.Rows[l]["datafil"].ToString().ToLower().Contains("ma") || tbcot.Rows[l]["datafil"].ToString().ToLower().Contains("ngay"))
                        {
                            ws.Cell(mangCot[l + 1].ToString() + vDongXuat).Value = "'" + dulieu.Rows[i][tbcot.Rows[l]["datafil"].ToString()].ToString();
                        }
                        else if (tbcot.Rows[l]["datafil"].ToString().ToLower().Contains("dangsd") && dulieu.Rows[i]["DangSD"].ToString() == "")
                        {
                            ws.Cell(mangCot[l + 1].ToString() + vDongXuat).Value = "Ngưng sử dụng";
                        }
                        else if (IsNumber(dulieu.Rows[i][tbcot.Rows[l]["datafil"].ToString()].ToString()) == true)
                        {
                            if (dulieu.Rows[i][tbcot.Rows[l]["datafil"].ToString()].ToString().Contains("."))
                            {
                                ws.Cell(mangCot[l + 1].ToString() + vDongXuat).Value = "'" + dulieu.Rows[i][tbcot.Rows[l]["datafil"].ToString()].ToString();

                            }
                            else
                            {
                                float number = float.Parse(dulieu.Rows[i][tbcot.Rows[l]["datafil"].ToString()].ToString());
                                string formattedNumber = number.ToString("N0", culture);
                                ws.Cell(mangCot[l + 1].ToString() + vDongXuat).Value = "'" + formattedNumber;
                            }

                        }
                        else
                        {
                            ws.Cell(mangCot[l + 1].ToString() + vDongXuat).Value = dulieu.Rows[i][tbcot.Rows[l]["datafil"].ToString()].ToString();
                        }
                    }
                    vDongXuat++;
                }
                wb.Save();
                return JSonHelper.ToJson((url + fileName).Replace('~', ' '));

            }
            catch (Exception ex)
            {
                ep.Err = true;
                ep.Logs = ex.ToString();
                return JSonHelper.ToJson(ep);

            }
        }
        public bool IsNumber(string pText)
        {
            Regex regex = new Regex(@"^[-+]?[0-9]*.?[0-9]+$");
            return regex.IsMatch(pText);
        }
        [HttpPost]
        public string GetDieuKienLaoDong_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDieuKienLaoDong_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Get Cấp 5
        [HttpPost]
        public string GetCap_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetCap_ComBo", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Get Cấp 4
        [HttpPost]
        public string GetCap_Combo_4()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetCap_ComBo_4", null).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetNganhKinhTe_Combo(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(data[0])),
                    new SqlParameter("@CapID", DungChung.NormalizationString(data[1]))
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNganhKinhTe_ComBo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetNghedaotao_ComboTheoCap(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(data[0])),
                    new SqlParameter("@CapID", DungChung.NormalizationString(data[1]))
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDMNgheDaoTao_ComBo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Get nghề nghiệp
        //[HttpPost]
        //public string GetNgheNghiep_Combo(string id)
        //{
        //    ExecPermiss ep = new ExecPermiss();
        //    try
        //    {
        //        if (!NTSSecurity.Validate())
        //        {
        //            return NTSThongBao.KhongCoQuyenTruyCap();
        //        }
        //        SqlParameter[] para = {
        //            new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
        //        };
        //        DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ThuocNgheNghiep", para).Tables[0];
        //        ep.Result = duLieu;
        //        return JSonHelper.ToJson(ep);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NTSThongBao.CoLoiXayRa(ex);
        //    }
        //}

        [HttpPost]
        public string GetNgheNghiep_Combo(string[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(data[0])),
                    new SqlParameter("@CapID", DungChung.NormalizationString(data[1]))
                };

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNgheNghiep_ComBo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Get nhóm vị trí việc làm
        [HttpPost]
        public string GetNhomVTVL_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_NhomVTVL", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Get nghề đào tạo
        [HttpPost]
        public string GetNgheDaoTao_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNgheDaoTao_ComBo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Get nhóm loại hình nới làm việc
        [HttpPost]
        public string GetNhomLoaiHinhNoiLV_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhomLoaiHinhNoiLV_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Get chuyên ngành đào tạo
        [HttpPost]
        public string GetChuyenNganhDaoTao_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChuyenNganhDaoTao_ComBo", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Get chuyên ngành đào tạo
        [HttpPost]
        public string GetNhomDieuKienLV_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhomDieuKienLV_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public static bool KiemTraTonTai_KemTheoLoai(string ma, string tenCot, string tenBang, string TenLoai, string GiaTriLoai)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("GiaTri", ma),
                    new SqlParameter("TenLoai", TenLoai),
                    new SqlParameter("GiaTriLoai", GiaTriLoai)
                };
                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTai_KemTheoLoai", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static bool KiemTraTonTaiSua_KemTheoLoai(string ma, string tenCot, string tenBang, string tenCotxet, string maID, string TenLoai, string GiaTriLoai)
        {
            try
            {
                SqlParameter[] sqlParams = {
                    new SqlParameter("TenBang", tenBang),
                    new SqlParameter("TenCot", tenCot),
                    new SqlParameter("ma", ma),
                    new SqlParameter("TenCotXet", tenCotxet),
                    new SqlParameter("maID", maID),
                    new SqlParameter("TenLoai", TenLoai),
                    new SqlParameter("GiaTriLoai", GiaTriLoai)
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSua_KemTheoLoai", sqlParams);
                return DungChung.NormalizationBoolean(duLieu);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //Get kho luu tru
        [HttpPost]
        public string GetKhoLuuTru_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_KhoLuuTru", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        //Get ke luu tru
        [HttpPost]
        public string GetKeLuuTru_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_KeLuuTru", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetGioiTinh_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_GioiTinh", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDiaBanHCAllTinh_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiaBanHCAllTinh_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDanToc_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDanToc_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetPhanLoaiHo_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetPhanLoaiHo_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetLoaiTaiLieu_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_TaiLieuLuuGiu", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetHoGiaDinh_Combo(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                     new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                     new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4]))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAHoGiaDinh_ComBo", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetToChuc_ComboChuaThuThap(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAToChuc_ComBo", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetToChuc_ComboToChuc(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllToChuc_ComBo", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDoiTuongNN_ComBo(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuongNN_ComBo", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDoiTuongNN_ComBoCapGPLD(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuongNN_ComBoCapGiayPhepLD", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetDoiTuongCaNhan_Combo(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllThanhVienHoGD_ComBo", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }


        [HttpPost]
        public string GetToChuc_ComboDaThuThap(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAToChuc_ComBoDaThuThap", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTinToChuc(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                if (data[0].ToString() == "them" && DungChungController.KiemTraTonTai(data[2].ToString(), "MaToChuc", "ToChuc"))
                {
                    return NTSThongBao.DaTonTaiMa();
                }



                if (data[0].ToString() == "sua" && DungChungController.KiemTraTonTaiSua(data[2].ToString(), "MaToChuc", "ToChuc", "ToChucID", data[1].ToString()))
                {
                    return NTSThongBao.DaTonTaiMa();
                }

                // Kiểm tra tồn tại mã số thuế doanh nghiệp khi thêm mới
                if (data[0].ToString() == "them")
                {
                    DataSet duLieuKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiMaSoThue", data[5].ToString());
                    if (duLieuKT.Tables[0].Rows.Count > 0)
                    {
                        string tenBien = "@MaSoThue_@TenToChuc_@DiaChiCuThe";
                        string giaTri = duLieuKT.Tables[0].Rows[0]["MaSoThue"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["TenToChuc"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["DiaChiCuThe"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("004", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD
                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                // Kiểm tra tồn tại mã số thuế doanh nghiệp khi Cập nhật
                if (data[0].ToString() == "sua")
                {
                    SqlParameter[] para2 = {
                        new SqlParameter("@ToChucID", DungChung.NormalizationGuid(data[1].ToString())),
                        new SqlParameter("@MaSoThue", data[5].ToString()),
                    };
                    DataSet duLieuKT = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTraTonTaiSuaMaSoThue", para2);
                    if (duLieuKT.Tables[0].Rows.Count > 0)
                    {
                        string tenBien = "@MaSoThue_@TenToChuc_@DiaChiCuThe";
                        string giaTri = duLieuKT.Tables[0].Rows[0]["MaSoThue"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["TenToChuc"].ToString()
                            + "_" + duLieuKT.Tables[0].Rows[0]["DiaChiCuThe"].ToString();

                        string thongBao = Areas.DanhMuc.Controllers.DungChungController.ThongBao("004", tenBien, giaTri); // 001 la loi thong bao trung so CMND/CCCD
                        ep.Logs = "1";
                        ep.Msg = thongBao;
                        return JSonHelper.ToJson(ep);
                    }
                }

                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@ToChucID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@MaToChuc_us", data[2].ToString()),
                    new SqlParameter("@NamTrongKCN",DungChung.NormalizationBoolean(data[3].ToString())),
                    new SqlParameter("@TenKCN_us", data[4].ToString()),
                    new SqlParameter("@MaSoThue_us", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@TenToChuc_us", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@TenNguoiSDLD_us", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@SoCCCD_us", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@LoaiHinhDNID_us_TC", DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@TinhTrangHDID_us", DungChung.NormalizationGuid(data[10].ToString())),
                    new SqlParameter("@NgayHoatDong_us_TC", DungChung.NormalizationDateTime(data[11].ToString())),
                    new SqlParameter("@SoDienThoai_us", DungChung.NormalizationString(data[12].ToString())),
                    new SqlParameter("@Email_us", DungChung.NormalizationString(data[13].ToString())),
                    new SqlParameter("@TinhID_us_TC", DungChung.NormalizationGuid(data[14].ToString())),
                    new SqlParameter("@HuyenID_us_TC", DungChung.NormalizationGuid(data[15].ToString())),
                    new SqlParameter("@XaID_us_TC", DungChung.NormalizationGuid(data[16].ToString())),
                    new SqlParameter("@ThonID_us_TC", DungChung.NormalizationGuid(data[17].ToString())),
                    new SqlParameter("@SoNha_us_TC", DungChung.NormalizationString(data[18].ToString())),
                    new SqlParameter("@DiaChi_us_TC", DungChung.NormalizationString(data[19].ToString())),
                    new SqlParameter("@GhiChuTC_us", DungChung.NormalizationString(data[20].ToString())),
                    new SqlParameter("@TrangThaiToChuc_us", DungChung.NormalizationBoolean(data[21].ToString())),
                    new SqlParameter("@NganhNgheID_us_TC", DungChung.NormalizationString(data[22].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),

                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinToChuc", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "ToChuc";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "ToChuc";
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
                    string fileKQ = Server.MapPath($"~/TaiLieu" + "/" + bangDk + "/" + PathChiTiet + "/" + fileName);
                    string url = $"~/TaiLieu" + "/" + bangDk + "/" + PathChiTiet;
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
                    PathTong += $"~/TaiLieu" + "/" + bangDk + "/" + PathChiTiet + "/" + fileName + "*";
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
        public string LuuDinhKem_ChuKy(string ID, string bangDk, string cotDk, string cotDinhKem, string pathFile)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
               
                SqlParameter[] para = {
                    new SqlParameter("@TenBang", bangDk), //tên bảng cần update
                    new SqlParameter("@TenCot", cotDinhKem),//tên cột đính kèm
                    new SqlParameter("@Value", pathFile),//path cần lưu
                    new SqlParameter("@TenCotDK",  cotDk),//tên cột khóa chính
                    new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),//khóa chính
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }

        //
        public static string checkString(string data)
        {
            data = data.Replace("select", "");
            data = data.Replace("delete", "");
            data = data.Replace("drop", "");
            data = data.Replace("truncate", "");
            return data;
        }

        // Xóa file đính kèm khi xóa dt trên luói
        public static string LayDuongDanDinhKem(string bang, string cotDinhKem, string cotID, string ID)
        {
            SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString1());
            string pathOld = "";
            try
            {
                bang = checkString(bang);
                cotDinhKem = checkString(cotDinhKem);
                cotID = checkString(cotID);
                //lấy đường dẫn cũ để xóa file
                DataTable data = sqlFun.GetData(@"SELECT " + cotDinhKem + " FROM dbo." + bang + " WHERE " + cotID + " = '" + DungChung.NormalizationGuid(ID) + "'");
                if (data.Rows.Count > 0)
                {
                    for (int i = 0; i < data.Rows.Count; i++)
                    {
                        pathOld += data.Rows[i][cotDinhKem].ToString();
                    }
                }
                return pathOld;
            }
            catch (Exception ex)
            {
                return "";
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
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["DinhKem"].ToString();
                }
                else
                {

                    //nếu không có dữ liệu trong sql trong trường hợp thêm mới thì chỉ xóa file mới đính kèm
                    try
                    {
                        if (System.IO.File.Exists(Server.MapPath(duongDan)))
                        {
                            System.IO.File.Delete(Server.MapPath(duongDan));
                        }
                    }
                    catch (Exception)
                    {

                    }
                    ep.Msg = "Xóa đính kèm thành công!";
                    return JSonHelper.ToJson(ep);
                }

                //Xóa đính kèm
                DataSet duLieu = new DataSet();
                if (loai == "all")
                {
                    SqlParameter[] paraAll = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@Value",  ""),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                    duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", paraAll);
                }
                else
                {
                    SqlParameter[] para = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@Value",  strDuongDan.Replace(duongDan,"").Replace("**","")),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                    duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);
                }


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
        public string XoaDinhKem2(string ID, string duongDan, string bangDk, string cotDk, string cotValue, string loai)
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
                        new SqlParameter("@TenCot", cotValue),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["ChuKy"].ToString();
                }
                else
                {

                    //nếu không có dữ liệu trong sql trong trường hợp thêm mới thì chỉ xóa file mới đính kèm
                    try
                    {
                        if (System.IO.File.Exists(Server.MapPath(duongDan)))
                        {
                            System.IO.File.Delete(Server.MapPath(duongDan));
                        }
                    }
                    catch (Exception)
                    {

                    }
                    ep.Msg = "Xóa đính kèm thành công!";
                    return JSonHelper.ToJson(ep);
                }

                //Xóa đính kèm
                DataSet duLieu = new DataSet();
                if (loai == "all")
                {
                    SqlParameter[] paraAll = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", cotValue),
                        new SqlParameter("@Value",  ""),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                    duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", paraAll);
                }
                else
                {
                    SqlParameter[] para = {
                        new SqlParameter("@TenBang", bang),
                        new SqlParameter("@TenCot", cotValue),
                        //new SqlParameter("@Value",  strDuongDan.Replace(duongDan,"").Replace("**","")),
                        new SqlParameter("@Value",""),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                    duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);
                }


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
        public string LuuThietLapCot(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string loaiThemSua = "Them";
                SqlParameter[] para1 = {
                     new SqlParameter("@BangThamChieu", data[1].ToString()),
                };
                DataTable ISExist = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ISExist_ThietLapCotTheoUser", para1).Tables[0];
                if (ISExist.Rows[0][0].ToString() == "1")
                {
                    loaiThemSua = "Sua";
                }
                SqlParameter[] para2 = {
                     new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                     new SqlParameter("@TenCot", data[0].ToString()),
                     new SqlParameter("@BangThamChieu", data[1].ToString()),
                     new SqlParameter("@ThaoTac", loaiThemSua),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Insert_ThietLapCot", para2);
                if (duLieu.Tables[0].Rows.Count > 0)
                {
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    ep.Msg = "Thiết lập cột dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
                }
                else
                {
                    return NTSThongBao.ThongBaoXuLyNhieuDong(NTSThongBao.CAPNHAT, duLieu.Tables[0].Rows.Count);
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LoadDuLieuThietLapCot(string tenBang)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@tenBang", DungChung.NormalizationString(tenBang)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThietLapCotBangThamChieu", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string XoaThietLapCotTheoUser(string tenBang)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@User",DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                    new SqlParameter("@TenBang",DungChung.NormalizationString(tenBang)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Delete_ThietLapCotTheoUser", para);
                if (duLieu.Tables[1].Rows[0][0].ToString() == "1")
                {
                    duLieu.Tables[0].TableName = "ThietLapCotTheoUser";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Xoa");
                    ep.Msg = "Thiết lập cột dữ liệu thành công!";
                    return JSonHelper.ToJson(ep);
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
        public string LoadDuLieuThietLapCotTheoUser(string tenBang)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                    new SqlParameter("@tenBang", DungChung.NormalizationString(tenBang)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThietLapCotTheoUserBangThamChieu", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string SoLuongDoiTuongKhiXoaHoGiaDinh(string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(DungChung.NormalizationGuid(ID))),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetSoLuongDoiTuongKhiXoaByIDHoGiaDinh", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string LuuThongTin_TL(object[] data)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                string Loai = data[0].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@TaiLieuLuuGiuID", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@SoVanBan", DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@NgayKy", DungChung.NormalizationDateTime(data[3].ToString())),
                    new SqlParameter("@TrichYeuNoiDung",DungChung.NormalizationString( data[4].ToString())),
                    new SqlParameter("@CoQuanBanHanh", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@NguoiKy", DungChung.NormalizationString(data[6].ToString())),
                    new SqlParameter("@ChucDanh", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@LoaiTaiLieuID", DungChung.NormalizationGuid(data[8].ToString())),
                    new SqlParameter("@ThamChieuID",DungChung.NormalizationGuid(data[9].ToString())),
                    new SqlParameter("@DinhKem", DungChung.NormalizationString(data[10].ToString())),
                    new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                    new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_LuuThongTinTaiLieu", para);
                if (Loai == "them")
                {
                    duLieu.Tables[0].TableName = "TaiLieuLuuGiu";
                    NTSSecurity.ghiLogs(duLieu.Tables[0], "Them");
                    return NTSThongBao.ThemThanhCong();
                }
                else
                {
                    if (duLieu.Tables[0].Rows[0][0].ToString() != "")
                    {
                        duLieu.Tables[0].TableName = "TaiLieuLuuGiu";
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
        public string GetComBo_TrinhDoGiaoDucPhoThong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TrinhDoGiaoDucDaoTao", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TrinhDoCMKT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TrinhDoCMKT", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TrinhDoCMKT_NguoiNNLVVN()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TrinhDoCMKT_NguoiNNLVVN", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_LinhVucDaoTao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_LinhVucDaoTao", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ChuyenNganhDaoTao()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ChuyenNganhDaoTao", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ViTheViecLam()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ViTheViecLam", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ViTriViecLam()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ViTriViecLam", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_ViTriViecLam_NguoiNNLVVN()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ViTriViecLam_NguoiNNLVVN", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_NgheNghiep()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_NgheNghiep", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_NgheCongViec()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_NgheCongViec", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_HinhThucLV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_HinhThucLamViec", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_LoaiHopDong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_LoaiHopDong", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_LoaiHinhNoiLV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_LoaiHinhNoiLV", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_GiayPhepLD()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_GiayPhepLD", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_NganhSanXuatKinhDoanh()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_NganhSXKD", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
       
        [HttpPost]
        public string GetComBo_LyDoKhongThamGiaHDKT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_LyDo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ThamGiaBHXH()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ThamGiaBHXH", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_DoiTuongUuTien()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_DoiTuongUuTien", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_ThoiGianThatNghiep()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ThoiGianThatNghiep", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_LoaiBienDong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_LoaiBienDong", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string KiemTraTrinhDoCMKT(string value)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@Value", DungChung.NormalizationGuid(value))
                };
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_KiemTrinhDoCMKT", para);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0]["KiemTra"].ToString() == "1")
                    {
                        return JSonHelper.ToJson("1_"); // cho qua bước
                    }
                    else
                    {
                        return JSonHelper.ToJson("0_"); //k có nhảy bước
                    }
                }
                else
                {
                    return JSonHelper.ToJson("-1_Có lỗi xảy ra!");
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        // Xoa đính kèm
        [HttpPost]
        public string XoaDinhKemCungLaoDong(string ID, string duongDan, string bangDk, string cotDk, string loai)
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
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0]["DinhKem"].ToString();
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
                        new SqlParameter("@TenCot", "DinhKem"),
                        new SqlParameter("@Value",  strDuongDan.Replace(duongDan+"*","")),
                        new SqlParameter("@TenCotDK",  cotDK),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", para);

                if (duLieu.Tables[0].Rows.Count != 0)
                {
                    if (loai == "all")
                    {
                        SqlParameter[] parameters = {
                            new SqlParameter("@TenBang", bang),
                            new SqlParameter("@TenCot", "DinhKem"),
                            new SqlParameter("@Value",  ""),
                            new SqlParameter("@TenCotDK",  cotDK),
                            new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                        };
                        DataSet delete = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_UpdateCotNvarchar", parameters);

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
                //ep.Result = delete.Tables[0].Rows.Count;
                ep.Msg = "Xóa đính kèm thành công!";
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TrinhDoKNMem()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TrinhDoKNMem", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TrinhDoKyNangNghe()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TrinhDoKyNangNghe", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_TinhTrangTGHDKT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TinhTrangTGHDKT", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_QuyMoLaoDong()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_QuyMoLaoDong", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetComBo_ChucVu()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_ChucVu", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllToChuc_Chon(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@LoaiHinhDN_TimKiem_us", DungChung.NormalizationGuid(data[5])),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllToChuc_Chon", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllToChuc_ChonCapGiayPhepLD(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                    new SqlParameter("@LoaiHinhDN_TimKiem_us", DungChung.NormalizationGuid(data[5])),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllToChuc_ChonCapGiayPhepLD", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllDoiTuong_Chon(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuong_Chon", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetAllDoiTuongCaNhan_Chon(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDoiTuongCaNhan_Chon", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetLoaiTinDang_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiTinDang_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string GetTrinhDoNgoaiNgu_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTrinhDoNgoaiNgu_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetTrinhDoTinHoc_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTrinhDoTinHoc_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDichVuDK_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_DichVuDK", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetBac_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_Bac", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetCheDoPhucLoi_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_CheDoPhucLoi", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetYeuCauKinhNghiem_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetYeuCauKinhNghiem_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetYeuCauThem_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetYeuCauThem_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetLoaiHopDong_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetLoaiHopDong_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetHinhThucLV_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHinhThucLamViec_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetMucDichLV_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMucDichLamViec_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetMucLuong_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMucLuong_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetNoiLamViec_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNoiLamViec_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetTrongLuongNang_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetTrongLuongNang_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDiDung_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDiDung_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetNgheNoi_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNgheNoi_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetThiLuc_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThiLuc_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetThaoTacTay_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetThaoTacTay_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetDungHaiTay_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDungHaiTay_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_MaNgheCap1()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_MaNgheCap1", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_MaNgheCap2(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_MaNgheCap2", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_MaNgheCap3(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_MaNgheCap3", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetComBo_MaNgheCap4(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_MaNgheCap4", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetHuyenNoiLamViec_Combo(string id)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(id))
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_HuyenNoiLamViec", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetMongMuonDN_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetMongMuonDN_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetChucVu_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChucVu_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public string GetHinhThucTuyenDung_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetHinhThucTuyenDung_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public string GetKhaNangDapUng_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetKhaNangDapUngCV_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetSanSangLV_Combo()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetSanSangLV_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetPhieuDKGTVL_Combo(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@NamThuThap", DungChung.NormalizationNumber(NTSSession.GetNamSudung())),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllPhieuDKGTVL_ComBo", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetAllPhieuDKGTVL_Chon(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@TinhID_TimKiem_us", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@HuyenID_TimKiem_us", DungChung.NormalizationGuid(data[1].ToString())),
                    new SqlParameter("@XaID_TimKiem_us", DungChung.NormalizationGuid(data[2].ToString())),
                    new SqlParameter("@ThonID_TimKiem_us", DungChung.NormalizationGuid(data[3].ToString())),
                    new SqlParameter("@TuKhoa", DungChung.NormalizationString(data[4])),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllPhieuDKGTVL_Chon", para).Tables[0];
                var customerData = duLieu.AsEnumerable();
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}
