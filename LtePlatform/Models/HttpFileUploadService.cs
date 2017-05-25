using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using Aspose.Diagram;

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

    public abstract class BtsFileSerivce
    {
        /// <summary>
        /// 文件根目录
        /// </summary>
        public string Root { get; set; }

        /// <summary>
        /// 图片存放的目录
        /// </summary>
        public string DirectoryPath { get; private set; }

        /// <summary>
        /// 基站ID（EnodebID或者FSL编号）
        /// </summary>
        public string BtsId { get; set; }


        public BtsFileSerivce(string root, string directory, string btsId)
        {
            Root = root;
            BtsId = btsId;
            DirectoryPath = HttpContext.Current.Server.MapPath(Root + "/" + (string.IsNullOrEmpty(directory) ? "" : directory + "/") + btsId);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(DirectoryPath);
            }
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


        /// <summary>
        /// 获取文件保存路径
        /// </summary>
        /// <param name="directoryPath"></param>
        /// <param name="filename"></param>
        /// <returns></returns>
        public static string GetFilePath(string directoryPath, string filename)
        {
            var filePath = directoryPath + "/" + Path.GetFileName(filename);

            //判断文件是否存在，存在则在文件名称后加上_和数字
            var directory = new DirectoryInfo(directoryPath);
            var name = Path.GetFileNameWithoutExtension(filename);
            var files = directory.GetFiles(name + "*" + Path.GetExtension(filename), SearchOption.TopDirectoryOnly);
            var regexName = name + "(_\\d+)*" + Path.GetExtension(filename);

            files = files.ToList().Where(t => Regex.IsMatch(t.Name, regexName)).OrderByDescending(t => t.CreationTime).ToArray();

            if (!files.Any()) return filePath;
            var file = files.First();
            var math = Regex.Match(Path.GetFileNameWithoutExtension(file.FullName), @"^\S+(?<num>_\d+)$");
            if (math.Success)
            {
                var num = Convert.ToInt32(math.Groups["num"].Value.TrimStart('_'));
                name = name + "_" + (num + 1);
            }
            else
            {
                name += "_1";
            }

            filePath = directoryPath + "/" + name + Path.GetExtension(filename);

            return filePath;
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

        /// <summary>
        /// 获取图纸列表
        /// </summary>
        /// <returns></returns>
        public List<DWGInfo> GetList()
        {
            if (string.IsNullOrEmpty(DirectoryPath) || !Directory.Exists(DirectoryPath))
            {
                throw new DirectoryNotFoundException("图纸目录不存在");
            }

            var files = Directory.GetFiles(DirectoryPath);
            var exts = new[] { "vsd", "pdf", "vsdx" };
            files =
                files.Where(
                    t =>
                        exts.Any(
                            w =>
                                t.ToLower().EndsWith(w) &&
                                !(t.ToLower().EndsWith(".vsd.pdf") || t.ToLower().EndsWith(".vsdx.pdf"))))
                    .Select(Path.GetFileName).ToArray();

            return files.Select(f => new DWGInfo
            {
                FileName = f, CreateTime = File.GetCreationTime(DirectoryPath + "/" + f).ToString("yyyy-MM-dd HH:mm:ss")
            }).ToList();
        }

        /// <summary>
        /// 获取文件内容
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public byte[] GetFile(string name)
        {

            var filePath = DirectoryPath + "/" + name;
            if (!File.Exists(filePath)) return null;
            byte[] content;
            using (var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                // Read the source file into a byte array.
                content = new byte[fs.Length];
                var numBytesToRead = (int)fs.Length;
                var numBytesRead = 0;
                while (numBytesToRead > 0)
                {
                    // Read may return anything from 0 to numBytesToRead.
                    var n = fs.Read(content, numBytesRead, numBytesToRead);

                    // Break when the end of the file is reached.
                    if (n == 0)
                        break;

                    numBytesRead += n;
                    numBytesToRead -= n;
                }

                numBytesToRead = content.Length;
            }

            return content;
        }

        /// <summary>
        /// 获取visio文件对应的pdf文件
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public string GetPdfOfVisio(string file)
        {
            var newFile = file + ".pdf";

            if (File.Exists(newFile)) return newFile;
            try
            {
                var diagram = new Diagram(DirectoryPath + "/" + file);
                using (var pdfStream = new MemoryStream())
                {
                    diagram.Save(pdfStream, SaveFileFormat.PDF);
                    var pdfContent = pdfStream.GetBuffer();

                    using (var fileStream = new FileStream(DirectoryPath + "/" + newFile, FileMode.Create))
                    {
                        // Write the data to the file, byte by byte.
                        foreach (var t in pdfContent)
                        {
                            fileStream.WriteByte(t);
                        }

                        // Set the stream position to the beginning of the file.
                        fileStream.Seek(0, SeekOrigin.Begin);
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception("转换文件失败");
            }

            return newFile;
        }

        /// <summary>
        /// 删除图纸
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool Delete(string name)
        {
            try
            {
                var filePath = DirectoryPath + "/" + name;
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                if (File.Exists(filePath + ".pdf"))
                {
                    File.Delete(filePath + ".pdf");
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// 保存图纸
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="buffer"></param>
        public void Save(string filename, byte[] buffer)
        {
            var filePath = GetFilePath(DirectoryPath, filename);
            using (var ms = new MemoryStream(buffer))
            {
                using (var file = new FileStream(filePath, FileMode.Create))
                {
                    //保存文件
                    ms.Seek(0, SeekOrigin.Begin);
                    ms.CopyTo(file);
                }
            }
        }


    }

    public class DWGInfo
    {
        public string FileName { get; set; }
        public string CreateTime { get; set; }
    }

    public class DWGDeleteView
    {
        public string Directory { get; set; }
        public string BtsId { get; set; }
        public string FileName { get; set; }
    }
}
