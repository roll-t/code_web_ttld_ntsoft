﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTLD2024.Class;

namespace TTLD2024.Areas.CongThongTinViecLam.Controllers
{
    public class DanhSachHoSoUngVienController : Controller
    {
        // GET: CongThongTinViecLam/DanhSachHoSoUngVien
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
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllHoSoUngVienGuiXacDuyet", null).Tables[0];
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
        public string XetDuyet(string id)
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
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_XetDuyetThongTinHoSoUngVien", para).Tables[0];
                ep.Msg = "Thao tác dữ liệu thành công!";
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string TuChoi(object[] data)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                if (!NTSSecurity.Validate())
                {
                    return NTSThongBao.KhongCoQuyenTruyCap();
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(data[0].ToString())),
                    new SqlParameter("@NgayTuChoi", DungChung.NormalizationDateTime(data[1].ToString())),
                    new SqlParameter("@NoiDungTuChoi", DungChung.NormalizationString(data[2].ToString())),

                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_TuChoiThongTinHoSoUngVien", para).Tables[0];
                ep.Msg = "Thao tác dữ liệu thành công!";
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XemThongTinHoSoUngVien(string id)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                if (!NTSSecurity.Validate())
                {
                    return JSonHelper.ToJson("Bạn không có quyền truy cập!");
                }
                SqlParameter[] para = {
                    new SqlParameter("@ID",Class.DungChung.NormalizationGuid(id)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_XemThongTinHoSoUngVien", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception)
            {
                return JSonHelper.ToJson("Tải dữ liệu thất bại");
            }
        }
    }
}