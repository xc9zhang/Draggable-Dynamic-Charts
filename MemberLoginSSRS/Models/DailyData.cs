using System;
using System.Collections.Generic;

namespace MemberLoginSSRS.Models
{
    public class DailyData
    {
        public string CurrentServerTime { get; set; }
        public int Hello1Total { get; set; }
        public int Hello2Total { get; set; }
        public int Hello3Total { get; set; }
        public int Hello4Total { get; set; }

        public IEnumerable<DailyDataRow> HelloList { get; set; }


        public DailyData()
        {
            CurrentServerTime = DateTime.Now.ToString();
            HelloList = InitialList(24);
            
        }

        private IEnumerable<DailyDataRow> InitialList(int size)
        {
            Random rd = new Random();
            var list = new List<DailyDataRow>();
            for (int i=0;i<size;i++)
            {
                list.Add(new DailyDataRow
                {
                    Hour = i,
                    Tickets = rd.Next(100)
                         });
            }
            return list;
        }

    }
}
