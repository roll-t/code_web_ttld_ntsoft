using System;
using System.Data;
namespace QLLD2024.Class
{
    public class TableNTS
    {
        public static string CapNhatCot(string TenBang, string Cot, string GiaTri, string Json_CongThuc, string TenID, string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                 $"UPDATE dbo.{TenBang} " +
                    $"SET '{Cot}' = N'{GiaTri}', " +
                    $"Json_CongThuc=N'{Json_CongThuc}'" +
                    $"OUTPUT inserted.* " +
                    $"WHERE '{TenID}' = N'{ID}'", null).Tables[0];

                ep.Result = tab;
                return JSonHelper.ToJson(ep);
            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }
        public static string XoaCot(string TenBang, string TenID, string ID)
        {
            ExecPermiss ep = new ExecPermiss();
            try
            {
                DataTable tab = SqlHelper.ExecuteDataset(NTSSession.GetConnectionString2(), CommandType.Text,
                $"DELETE FROM dbo.{TenBang} " +
                    $"OUTPUT inserted.* WHERE '{TenID}' = N'{ID}'", null).Tables[0];

                ep.Result = tab;
                return JSonHelper.ToJson(ep);

            }
            catch (Exception ex)
            {
                return NTSThongBao.CoLoiXayRa(ex);
            }

        }
    }
}