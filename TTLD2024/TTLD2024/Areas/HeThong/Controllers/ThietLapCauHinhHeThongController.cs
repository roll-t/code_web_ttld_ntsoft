using TTLD2024.Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using System.Web.UI.WebControls.WebParts;

namespace TTLD2024.Areas.HeThong.Controllers
{
    public class ThietLapCauHinhHeThongController : Controller
    {
        // GET: HeThong/ThietLapCauHinhHeThong
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public string LuuThongTinCauHinhHeThong(object[] _arrayT)
        {
            //kiem tra xem don vi co ton tai trong bang thiet lap chua
            string loaiThemSua = "Them";
            DataTable ISExist = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ISExist_ThietLapHeThong", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)).Tables[0];
            if (ISExist.Rows[0][0].ToString() == "1")
            {
                loaiThemSua = "Sua";
            }
            SqlParameter[] param = {                         
                         new SqlParameter("@DonViCapTren",_arrayT[0].ToString()),
                         new SqlParameter("@DonViBaoCao",_arrayT[1].ToString()),
                         new SqlParameter("@KyThay",_arrayT[2].ToString()),
                         new SqlParameter("@ChucDanhNguoiKy",_arrayT[3].ToString()),
                         new SqlParameter("@NguoiKT",_arrayT[4].ToString()),
                         new SqlParameter("@ChucDanhNguoiKT",_arrayT[5].ToString()),
                         new SqlParameter("@NguoiLap",_arrayT[6].ToString()),
                         new SqlParameter("@ChucDanhNguoiLap",_arrayT[7].ToString()),
                         new SqlParameter("@DiaDanh",_arrayT[8].ToString()),
                         new SqlParameter("@LoaiNgayLap",_arrayT[9].ToString()),
                         new SqlParameter("@NgayLapBaoCao1", DungChung.NormalizationDateTime(_arrayT[10].ToString())),
                         new SqlParameter("@NgayLapBaoCao2",_arrayT[11].ToString()),
                         new SqlParameter("@TinhID", DungChung.NormalizationGuid(_arrayT[12].ToString())),
                         new SqlParameter("@HuyenID",DungChung.NormalizationGuid(_arrayT[13].ToString())),
                         new SqlParameter("@XaID",DungChung.NormalizationGuid(_arrayT[14].ToString())),
                         new SqlParameter("@ThonID",DungChung.NormalizationGuid(_arrayT[15].ToString())),
                         new SqlParameter("@NguoiKy",_arrayT[16].ToString()),
                         new SqlParameter("@ThaoTac",loaiThemSua),
                         new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                         new SqlParameter("@UserID", DungChung.NormalizationGuid(NTSSession.GetUser().UserID)),
                         new SqlParameter("@RangBuocHoGiaDinh", DungChung.NormalizationBoolean(_arrayT[18].ToString())),
            };
            
            DataSet tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Insert_ThietLapHeThong", param);
            if (tab.Tables[0].Rows.Count > 0)
            {
                tab.Tables[0].TableName = "CauHinhHeThong";
                NTSSecurity.ghiLogs(tab.Tables[0], "ThietLapHeThong");
                if (loaiThemSua == "Them")
                {
                    return JSonHelper.ToJson("1_Thêm dữ liệu thành công!");
                }
                else
                {
                    return JSonHelper.ToJson("1_Cập nhật dữ liệu thành công!");
                }

            }
            else
            {
                return JSonHelper.ToJson("0_Hệ thống bảo mật phát hiện thao tác của bạn sẽ cập nhật " + tab.Tables[0].Rows.Count + " dòng dữ liệu.<br/>Lượng dữ liệu cập nhật vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!");
            }
        }
        [HttpPost]
        public string LuuColor(string color)
        {
            //kiem tra xem don vi co ton tai trong bang thiet lap chua

            DataSet tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Insert_ColorHeThong", new SqlParameter[] {
                new SqlParameter("@DonViID", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)),
                new SqlParameter("@MauSacJson", color),
            });
            if (tab.Tables[0].Rows.Count > 0)
            {
                //Theme
                DataTable ISExist = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_ISExist_ThietLapHeThong", DungChung.NormalizationGuid(NTSSession.GetDonVi().DonViID)).Tables[0];
                if (ISExist.Rows[0][0].ToString() == "1")
                {
                    try
                    {
                        SqlParameter[] param = {
                        new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                       };
                        DataTable ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetthietlapHeThong", param).Tables[0];
                        NTSSession.SetColor(JSonHelper.ToJson(ds.Rows[0]["MauSacJson"].ToString()));
                    }
                    catch (Exception ex)
                    {
                        return null;
                    }
                }
                else
                {
                    NTSSession.SetColor("");
                }

                tab.Tables[0].TableName = "ThietLapHeThong";
                NTSSecurity.ghiLogs(tab.Tables[0], "ThietLapHeThong");
                return JSonHelper.ToJson("1_Cập nhật màu thành công!");
            }
            else
            {
                return JSonHelper.ToJson("0_Hệ thống bảo mật phát hiện thao tác của bạn sẽ cập nhật " + tab.Tables[0].Rows.Count + " dòng dữ liệu.<br/>Lượng dữ liệu cập nhật vượt giới hạn cho phép. Bạn vui lòng liên hệ cán bộ chăm sóc khách hàng để được hỗ trợ.<br/>Cám ơn!");
            }
        }
        [HttpPost]
        public  string LayDuLieu()
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
        public string LoadDuLieuDonVi()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@DonViID", NTSSession.GetDonVi().DonViID),
                };
                DataSet ds = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString1(), "Proc_GetDonViByID", para);
                ep.Result = ds.Tables[0];
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}