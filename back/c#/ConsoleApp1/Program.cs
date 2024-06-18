using MANTRA;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    static class Program
    {
        static async Task Main(string[] args)
        {
            MFS100 mfs100 = new MFS100();
            int ret = mfs100.Init();
            if (ret != 0)
            {
                Console.WriteLine("Device initialization failed: " + mfs100.GetErrorMsg(ret));
                return;
            }
            else
            {
                Console.WriteLine("Device initialized successfully at register");
            }
            FingerData fingerprintdata1 = null;
            int ret1 = mfs100.AutoCapture(ref fingerprintdata1, 300000000, true, true);
            while (ret1 != 0)
            {
                ret1 = mfs100.AutoCapture(ref fingerprintdata1, 300000000, true, true);
            }
            if (ret1 != 0)
            {
                Console.WriteLine("Fingerprint capture failed.");
                return;
            }


        }
        
    }
}