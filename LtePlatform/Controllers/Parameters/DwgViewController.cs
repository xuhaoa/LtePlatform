using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Evaluations.DataService.Basic;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    public class DwgViewController : ApiController
    {
        private readonly BluePrintService _service;

        public DwgViewController(BluePrintService service)
        {
            _service = service;
        }

        [HttpGet]
        public FileResultMessage View(string directory, string btsId, string filename)
        {
            var dwgService = new BtsDwgService(directory, btsId);

            var file = filename;
            if (file.EndsWith(".vsd") || file.EndsWith(".vsdx"))
            {
                file = dwgService.GetPdfOfVisio(file);
            }

            return !File.Exists(dwgService.DirectoryPath + "/" + file)
                ? new FileResultMessage {Error = "文件不存在", File = ""}
                : new FileResultMessage {Error = "", File = file};
        }

        [HttpDelete]
        public bool Delete(DWGDeleteView dwg)
        {
            var dwgService = new BtsDwgService(dwg.Directory, dwg.BtsId);
            return dwgService.Delete(dwg.FileName);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            Func<HttpRequestMessage, string, string> getQuerystring = (request, key) =>
            {
                var queryStrings = request.GetQueryNameValuePairs();
                if (queryStrings == null)
                    return null;

                var match = queryStrings.FirstOrDefault(kv => string.Compare(kv.Key, key, StringComparison.OrdinalIgnoreCase) == 0);
                return string.IsNullOrEmpty(match.Value) ? null : match.Value;
            };

            var btsId = getQuerystring(Request, "btsId");
            var directory = getQuerystring(Request, "directory");

            if (string.IsNullOrEmpty(btsId) || string.IsNullOrEmpty(directory))
            {
                throw new DirectoryNotFoundException("基站ID或者图纸目录为空");
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            var dwgService = new BtsDwgService(directory, btsId);

            foreach (var file in provider.Contents)
            {
                if (string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName)) { continue; }

                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();

                dwgService.Save(filename, buffer);
                _service.SaveVisioPath(btsId, filename);
            }

            return Ok(new { Result = 1 });
        }
    }
}