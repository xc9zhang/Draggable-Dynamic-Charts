using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using MemberLoginSSRS.Models;

namespace MemberLoginSSRS.Helpers
{
    public static class Sql
    {
        public static T Read<T>(DbDataReader DataReader, string FieldName)
        {
            int FieldIndex;
            try { FieldIndex = DataReader.GetOrdinal(FieldName); }
            catch { return default(T); }

            if (DataReader.IsDBNull(FieldIndex))
            {
                return default(T);
            }
            else
            {
                object readData = DataReader.GetValue(FieldIndex);
                if (readData is T)
                {
                    return (T)readData;
                }
                else
                {
                    try
                    {
                        return (T)Convert.ChangeType(readData, typeof(T));
                    }
                    catch (InvalidCastException)
                    {
                        return default(T);
                    }
                }
            }
        }
    }
    public static class DailyReportDataHelper
    {
        public static DailyData GetDailyData(DateTime date)
        {
            var data = new DailyData();
            Random rd = new Random();
            data.Hello1Total = rd.Next(10);
            data.Hello2Total = rd.Next(10);
            data.Hello3Total = rd.Next(10);
            data.Hello4Total = rd.Next(10);
            return data;
        }


    }
}