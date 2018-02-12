using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using Lte.Domain.Common;
using Lte.Domain.Regular;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Parameters
{
    public class DwgQueryController : ApiController
    {
        [HttpGet]
        public IList<DwgInfo> Get(string directory, string btsId)
        {
            var service = new BtsDwgService(directory, btsId);
            return service.GetList();
        }

        [HttpGet]
        public string Get(string btsId)
        {
            var service = new BtsDwgService("Common", btsId);
            return service.DirectoryPath;
        }

        [HttpGet]
        public HttpResponseMessage Get(string directory, string btsId, string name)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var dwgService = new BtsDwgService(directory, btsId);
            var data = dwgService.GetFile(name);
            var ext = Path.GetExtension(name);
            var contentType = ext?.ToLower().QueryContentType();

            response.Content = new ByteArrayContent(data);
            response.Content.Headers.Add("Content-Disposition", "attachment; filename*=UTF-8''" + name.UrlEncode());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);

            return response;
        }
    }
}