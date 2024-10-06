﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web;

namespace TTLD2024.Class
{
    public class JSonHelper
    {
        public static string ToJson(object obj)
        {
            var converter = new FormattedDecimalConverter(CultureInfo.InstalledUICulture);
            string json = JsonConvert.SerializeObject(obj, converter);
            //return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
            return json;
        }

        public static object FromJson(string obj)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject(obj);
        }

        public static DataTable ToTable(string obj)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<DataTable>(obj);
        }
    }
}