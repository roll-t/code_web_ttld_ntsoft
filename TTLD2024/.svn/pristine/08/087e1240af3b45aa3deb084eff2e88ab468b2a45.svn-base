using TTLD2024.Class;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Web.Services;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class FunctionController : Controller
    {
        // GET: CongThongTinViecLam/Function
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string getMucLuongYeuCau()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_MucLuongYeuCau_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string getCapBac()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetChucVu_Combo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string getTrinhDoCMKT()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
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
        public string getDiaDiemLamViec()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
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
        public string getNganhKinhTe()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNganhKinhTeCap1_ComBo", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string getHinhThucLamViec()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
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
        public string getComBoKinhNghiemLV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
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
        public string GetComBo_DoiTuongUuTien()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
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
        public string GetComBo_TrinhDoHV()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_TrinhDoHV", null).Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_GioiTinh", null).Tables[0];
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetNhomLoaiHinhNoiLV_ComBo", null).Tables[0];
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

                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_QuyMoLaoDong", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        public string KiemTraDuLieu(string DuLieu)
        {
            DuLieu = DuLieu.Replace("select", "");
            DuLieu = DuLieu.Replace("delete", "");
            DuLieu = DuLieu.Replace("drop", "");
            DuLieu = DuLieu.Replace("truncate", "");
            return DuLieu;
        }
        [HttpPost]
        public string LuuDinhKem_MotFile(string PathTemp, string ID, string PathChiTiet, string bangDk, string cotDk, string cotDinhKem)
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                cotDk = KiemTraDuLieu(cotDk);
                cotDinhKem = KiemTraDuLieu(cotDinhKem);
                bangDk = KiemTraDuLieu(bangDk);


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
                    string fileKQ = Server.MapPath($"~/HinhAnh" + "/" + bangDk + "/" + PathChiTiet + "/" + fileName);
                    string url = $"~/HinhAnh" + "/" + bangDk + "/" + PathChiTiet;
                    if (!System.IO.Directory.Exists(Server.MapPath(url)))
                    {
                        System.IO.Directory.CreateDirectory(Server.MapPath(url));
                    }
                    try
                    {
                        System.IO.File.Copy(fileMau, fileKQ, true);
                    }
                    catch (Exception ex)
                    {
                    }
                    PathTong += $"~/HinhAnh/" + bangDk + "/" + PathChiTiet + "/" + fileName + "*";
                }

                if (ID != "")
                {
                    SqlParameter[] para = {
                        new SqlParameter("@TenBang", bangDk), //tên bảng cần update
                        new SqlParameter("@TenCot", cotDinhKem),//tên cột đính kèm
                        new SqlParameter("@Value", PathTong),//path cần lưu
                        new SqlParameter("@TenCotDK",  cotDk),//tên cột khóa chính
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),//khóa chính
                    };
                    DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_UpdateCotNvarchar", para);
                }
                return JSonHelper.ToJson("1*" + PathTong);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1*Có lỗi xảy ra! " + ex.Message);
            }
        }
        [HttpPost]
        public string LuuDinhKem_NhieuFile(string PathTemp, string ID, string PathChiTiet, string bangDk, string cotDk, string cotDinhKem)
        {
            try
            {
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                cotDk = KiemTraDuLieu(cotDk);
                cotDinhKem = KiemTraDuLieu(cotDinhKem);
                bangDk = KiemTraDuLieu(bangDk);
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
                    string fileKQ = Server.MapPath($"~/HinhAnh/" + PathChiTiet + "/" + fileName);
                    string url = $"~/HinhAnh/" + PathChiTiet;
                    if (!System.IO.Directory.Exists(Server.MapPath(url)))
                    {
                        System.IO.Directory.CreateDirectory(Server.MapPath(url));
                    }
                    try
                    {
                        System.IO.File.Copy(fileMau, fileKQ, true);
                    }
                    catch (Exception ex)
                    {
                    }
                    PathTong += $"~/HinhAnh/" + PathChiTiet + "/" + fileName + "*";
                }

                if (ID != "")
                {
                    //lấy đường dẫn cũ
                    string pathOld = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString2(), CommandType.Text, @"SELECT " + cotDinhKem + " FROM " + bangDk + " WHERE " + cotDk + " = '" + DungChung.NormalizationGuid(ID) + "'").ToString();

                    SqlParameter[] para = {
                        new SqlParameter("@TenBang", bangDk), //tên bảng cần update
                        new SqlParameter("@TenCot", cotDinhKem),//tên cột đính kèm
                        new SqlParameter("@Value",  pathOld+PathTong),//path cần lưu
                        new SqlParameter("@TenCotDK",  cotDk),//tên cột khóa chính
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),//khóa chính
                    };
                    DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_UpdateCotNvarchar", para);
                }
                return JSonHelper.ToJson("1*" + PathTong);

            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1*Có lỗi xảy ra! " + ex.Message);
            }
        }
        [HttpPost]
        public string XoaDinhKem(string ID, string duongDan, string bangDk, string cotDk, string loai, string tenCotDinhKem)
        {
            try
            {
                if (!NTSSecurity.Validate())
                    return JSonHelper.ToJson(new DataTable());
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string strDuongDan = "";
                bangDk = KiemTraDuLieu(bangDk);
                cotDk = KiemTraDuLieu(cotDk);
                tenCotDinhKem = KiemTraDuLieu(tenCotDinhKem);

                // lấy đính kèm
                SqlParameter[] paraDK = {
                        new SqlParameter("@TenBang", bangDk),
                        new SqlParameter("@TenCot", tenCotDinhKem),
                        new SqlParameter("@TenCotDK",  cotDk),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };

                DataTable dtDinhKem = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetDinhKemTheoID", paraDK).Tables[0];
                if (dtDinhKem.Rows.Count > 0)
                {
                    strDuongDan = dtDinhKem.Rows[0][tenCotDinhKem].ToString();
                }
                else
                {
                    //nếu không có dữ liệu trong sql trong trường hợp thêm mới thì chỉ xóa file mới đính kèm
                    if (System.IO.File.Exists(Server.MapPath(duongDan)))
                    {
                        System.IO.File.Delete(Server.MapPath(duongDan));
                    }
                    return NTSThongBao.XoaThanhCong();
                }

                //Xóa đính kèm
                SqlParameter[] para = {
                        new SqlParameter("@TenBang", bangDk),
                        new SqlParameter("@TenCot", tenCotDinhKem),
                        new SqlParameter("@Value",  strDuongDan.Replace(duongDan+"*","")),
                        new SqlParameter("@TenCotDK",  cotDk),
                        new SqlParameter("@ID",  DungChung.NormalizationGuid(ID)),
                    };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_UpdateCotNvarchar", para);

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
                return NTSThongBao.XoaThanhCong();
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa();
            }
        }

        [HttpPost]
        public string getComBoLoaiHinhDN()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetCombo_LoaiHinhDN", null).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        [HttpPost]
        public string KiemTraTheoDoiNhaTuyenDung(string id)
        {
            try
            {
                SqlParameter[] para = {
                        new SqlParameter("@NhaTuyenDungCTTID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID.ToString())),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_KiemTraTheoDoiNhaTuyenDung", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return tab.Rows[0]["NhaTuyenDungDaLuu"].ToString();
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string LuuTruNhaTuyenDungCuaUngVien(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (NTSSession.GetUserUngVien().UngVienID == null)
                {
                    return "2"; // chưa đăng nhập
                }
                SqlFunction sqlFun = new SqlFunction(NTSSession.GetConnectionString2());
                string UngVienID = "";
                try
                {
                    UngVienID = NTSSession.GetUserUngVien().UngVienID.ToString();
                }
                catch (Exception)
                {
                    return "3"; // không đúng user ứng viên thì không cho lưu trữ
                }

                SqlParameter[] para = {
                        new SqlParameter("@NhaTuyenDungID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(UngVienID)),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_LuuTruNhaTuyenDungCuaUngVien", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return "1";
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return "Có lỗi xảy ra! " + ex.Message;
            }
        }
        [HttpPost]
        public string getKinhNghiemLamViec()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_KinhNghiemLamViec_Combo", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(null);
            }
        }
        [HttpPost]
        public string getNganhNghe_CauLD()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable ds = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetNganhNghe_CauLD", null).Tables[0];
                ep.Result = ds;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }

        [HttpPost]
        public static string GetUsertGroupCode_DangDangNhap_Server()
        {
            try
            {
                if (NTSSession.GetUserNTD() != null)
                {
                    return "NhaTuyenDung";
                }
                else if (NTSSession.GetUserUngVien() != null)
                {
                    return "UngVien";
                }
                else return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }


        [HttpPost]
        public string getTinh()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetTinh_Combo", null).Tables[0];
                ep.Result = dt;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson(ex);
            }
        }

        [HttpPost]
        public string GetDoiTuongUuTien()
        {
            try
            {
                DataTable dt = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_GetCombo_DoiTuongUuTien", null).Tables[0];
                return JSonHelper.ToJson(dt);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson(null);
            }
        }


        [HttpPost]
        public string LuuTruViecLamCuaUngVien(string id)
        {
            try
            {
                if (NTSSession.GetUserUngVien() == null && NTSSession.GetUserNTD() == null)
                {
                    return "2"; // chưa đăng nhập
                }
                if (NTSSession.GetUserUngVien() == null)
                {
                    return "3"; // không đúng user ứng viên thì không cho lưu trữ
                }
                SqlParameter[] para = {
                        new SqlParameter("@TinTuyenDungID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_LuuTruViecLamCuaUngVien", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return "1";
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return "Có lỗi xảy ra! " + ex.Message;
            }
        }

        [HttpPost]
        public string LuuUngTuyenViecLam(string id)
        {
            try
            {
                if (NTSSession.GetUserUngVien() == null && NTSSession.GetUserNTD() == null)
                {
                    return "2"; // chưa đăng nhập
                }
                if (NTSSession.GetUserUngVien() == null)
                {
                    return "3"; // không đúng user ứng viên thì không cho lưu trữ
                }
                SqlParameter[] para = {
                        new SqlParameter("@TinTuyenDungID",  DungChung.NormalizationGuid(id)),//tên cột khóa chính
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),//khóa chính
                    };
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_LuuThongTinUngTuyenViecLamCuaUngVien", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return "1";
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return "Có lỗi xảy ra! " + ex.Message;
            }
        }

        [HttpPost]
        public string KiemTraUngTuyen(string id)
        {
            try
            {
                SqlParameter[] para = {
                        new SqlParameter("@TinTuyenDungID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_KiemTraUngTuyenViecLamCuaUngVien", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return tab.Rows[0]["DaUngTuyen"].ToString();
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_Có lỗi xảy ra! " + ex);
            }
        }
        [HttpPost]
        public string KiemTraLuuTruViecLam(string id)
        {
            try
            {
                SqlParameter[] para = {
                        new SqlParameter("@TinTuyenDungID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_KiemTraLuuTruViecLamCuaUngVien", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return tab.Rows[0]["ViecDaLuu"].ToString();
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_Có lỗi xảy ra! " + ex);
            }
        }

        [HttpPost]
        public string KiemTraLuuTruUngVien(string id)
        {
            try
            {
                SqlParameter[] para = {
                        new SqlParameter("@UngVienID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_KiemTraLuuTruUngVienCuaNhaTuyenDung", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return tab.Rows[0]["UngVienDaLuu"].ToString();
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("-1_Có lỗi xảy ra! " + ex);
            }
        }
        [HttpPost]
        public string LuuTruUngVienCuaNhaTuyenDung(string id)
        {
            try
            {
                if (NTSSession.GetUserUngVien() == null && NTSSession.GetUserNTD() == null)
                {
                    return "2"; // chưa đăng nhập
                }
                if (NTSSession.GetUserNTD() == null)
                {
                    return "3"; // không đúng user ứng viên thì không cho lưu trữ
                }
                SqlParameter[] para = {
                        new SqlParameter("@UngVienID",  DungChung.NormalizationGuid(id)),
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserNTD().NhaTuyenDungID)),
                    };
                DataTable tab = SqlHelper.ExecuteDataset(DungChung.GetConnectionStrings(), "Proc_LuuTruHoSoCuaNhaTuyenDung", para).Tables[0];
                if (tab.Rows.Count > 0)
                {
                    return "1";
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return "Có lỗi xảy ra! " + ex.Message;
            }
        }

        [HttpPost]
        public string LayMaTuTang(string strKyTu, string strCotTang, string strBangTang, string strDinhDang)
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
                    new SqlParameter("TenCot", strCotTang)
                };

                var duLieu = SqlHelper.ExecuteScalar(NTSSession.GetConnectionString1(), "Proc_LayMaTuTang", sqlParams);
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
    }
}