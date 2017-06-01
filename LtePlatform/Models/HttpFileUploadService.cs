using System;
using System.IO;
using System.Web;
using Lte.Evaluations.DataService.Dump;

namespace LtePlatform.Models
{
    public static class HttpFileUploadService
    {
        public static string UploadKpiFile(this HttpPostedFileBase httpPostedFileBase)
        {
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "uploads\\Kpi",
                    httpPostedFileBase.FileName);
            httpPostedFileBase.SaveAs(path);
            return path;
        }

        public static string UploadParametersFile(this HttpPostedFileBase httpPostedFileBase)
        {
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "uploads\\Parameters",
                    httpPostedFileBase.FileName);
            httpPostedFileBase.SaveAs(path);
            return path;
        }
    }

    public class FileResultMessage
    {
        public string Error { get; set; }
        public string File { get; set; }
    }

    public class BtsDwgService : BtsFileSerivce
    {
        public BtsDwgService(string directory, string btsId) : base("~/BtsDWG", directory, btsId)
        {
        }

        public string UrlEncode(string text)
        {
            var urlEncode = HttpUtility.UrlEncode(text.Replace(" ", ""));
            if (urlEncode != null)
                return urlEncode.Replace("+", "%2B")
                    .Replace("(", "%28").Replace(")", "%29")
                    .Replace("[", "%5B").Replace("]", "%5D")
                    .Replace("-", "_");
            return "";
        }
        
    }

}
