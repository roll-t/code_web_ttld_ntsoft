﻿using ClosedXML.Excel;
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

namespace TTLD2024.Areas.UngVien.Controllers
{
    public class HoSoUngVienDangUngTuyenController : Controller
    {
        // GET: UngVien/HoSoUngVienDangUngTuyen
        public ActionResult Index()
        {
            if (NTSSession.GetUserUngVien() == null)
            {
                return Redirect("dang-nhap-ung-vien.html");
            }
            return View();
        }
        [HttpPost]
        public  string getALLViecLamDangUngTuyen()
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                SqlParameter[] para = {
                        new SqlParameter("@UserID",  DungChung.NormalizationGuid(NTSSession.GetUserUngVien().UngVienID)),
                    };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetAllDaNopHoSoVaoNhaTuyenDung_CTT", para).Tables[0];

                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string GetThongTinViecLamByID(string ID)
        {
            try
            {
                ExecPermiss ep = new ExecPermiss();
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Proc_GetThongTinViecLamByID_CTT", para).Tables[0];
                ep.Result = duLieu;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
        [HttpPost]
        public string XoaHoSoUngVienDangUngTuyen(string ID)
        {
            try
            {
                SqlParameter[] para = {
                    new SqlParameter("@ID" , DungChung.NormalizationGuid(ID)),
                };
                DataTable duLieu = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), "Delete_HoSoUngVienDangUngTuyen_CTT", para).Tables[0];
                return NTSThongBao.XoaThanhCong();
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }
        }
    }
}