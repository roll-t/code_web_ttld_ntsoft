using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class LoaiChungTuController : Controller
    {
        // GET: HeThong/LoaiChungTu
        public ActionResult Index()
        {
            return View();
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
                            new SqlParameter("@LoaiChungTuID ",DungChung.NormalizationGuid(id)),
                        };
                DataTable data = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetAll_LoaiChungTuByID", para).Tables[0];
                ep.Result = data;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

        //Switch to TrangThai
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
                    new SqlParameter("ID", DungChung.NormalizationGuid(ID.ToString())),
                    new SqlParameter("DangSD", DungChung.NormalizationBoolean(value))
                };
                if (NTSSession.GetDonVi().DonViID.ToString().ToUpper() == ID.ToString().ToUpper())
                {
                    ep.Err = true;
                    ep.Msg = "Bạn không thể cập nhật trạng thái của đơn vị đang đăng nhập!";
                    return JSonHelper.ToJson(ep);
                }
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


        //Insert and Update
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
                string Loai = data[15].ToString();
                SqlParameter[] para = {
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@LoaiChungTuID",DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@LoaiChungTuCode", DungChung.NormalizationString(data[1].ToString())),
                    new SqlParameter("@TenLoaiChungTu", DungChung.NormalizationString(data[2].ToString())),
                    new SqlParameter("@DienGiai", DungChung.NormalizationString(data[5].ToString())),
                    new SqlParameter("@KyHieuMauCT", data[3].ToString()),
                    new SqlParameter("@KyHieuCT", DungChung.NormalizationString(data[4].ToString())),
                    new SqlParameter("@KyHieuPhiaTruoc", data[6].ToString()),
                    new SqlParameter("@KyHieuPhiaSau", DungChung.NormalizationString(data[8].ToString())),
                    new SqlParameter("@ChieuDaiChuoiTT", DungChung.NormalizationString(data[7].ToString())),
                    new SqlParameter("@HienDauGach", DungChung.NormalizationBoolean(data[11].ToString())),
                    new SqlParameter("@TangTheoThang", DungChung.NormalizationBoolean(data[14].ToString())),
                    new SqlParameter("@HienKyHieuCT", DungChung.NormalizationBoolean(data[10].ToString())),
                    new SqlParameter("@TuTang",  DungChung.NormalizationBoolean(data[13].ToString())),
                    new SqlParameter("@SoChungTuMau", DungChung.NormalizationString(data[9].ToString())),
                    new SqlParameter("@TrangThai", DungChung.NormalizationBoolean(data[12].ToString())),
                };
                DataSet duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_Insert_LoaiChungTu", para);
                var _duLieu = duLieu.Tables[0];
                if (_duLieu.Rows.Count > 0)
                {
                    _duLieu.TableName = "LoaiChungTu";
                    if (Loai.ToLower() == "them")
                    {
                        NTSSecurity.ghiLogs(_duLieu, "Them");
                        return NTSThongBao.ThemThanhCong();
                    }
                    else
                    {
                        NTSSecurity.ghiLogs(_duLieu, "Sua");
                        return NTSThongBao.CapNhatThanhCong();
                    }
                }
                else
                {
                    return JSonHelper.ToJson("-1_Thao tác thất bại!");
                }

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
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@LoaiChungTuID",DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_Delete_LoaiChungTu", para).Tables[0];
                if (duLieu.Rows.Count > 0)
                {
                    duLieu.TableName = "LoaiChungTu";
                    NTSSecurity.ghiLogs(duLieu, "Xoa");
                    return JSonHelper.ToJson("1_Xóa dữ liệu thành công!");
                }
                else
                {
                    return JSonHelper.ToJson("0_Thao tác thất bại!");
                }
            }
            catch (Exception ex)
            {
                return JSonHelper.ToJson("0_Xóa dữ liệu không thành công!");
            }
        }


        //GetAll
        [HttpPost]
        public string GetAll_LoaiCT()
        {
            var ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }

                using (var connection = new SqlConnection(NTSSession.GetConnectionString1()))
                {
                    using (var command = new SqlCommand("Proc_GetAll_LoaiChungTu", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        var adapter = new SqlDataAdapter(command);
                        var dataTable = new DataTable();
                        connection.Open();
                        adapter.Fill(dataTable);
                        ep.Result = dataTable;
                        return JSonHelper.ToJson(ep);
                    }
                }
            }
            catch (SqlException sqlEx)
            {
                return NTSThongBao.CoLoiXayRa(sqlEx);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }

    }
}