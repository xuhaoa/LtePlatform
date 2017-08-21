using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Aspose.Diagram;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class NewBtsListContainer
    {
        public IEnumerable<BtsExcel> Infos { get; set; }
    }

    [TypeDoc("新的小区信息列表容器")]
    public class NewCellListContainer
    {
        [MemberDoc("Excel小区信息列表")]
        public IEnumerable<CellExcel> Infos { get; set; }
    }

    [TypeDoc("新基站信息容器")]
    public class NewENodebListContainer
    {
        [MemberDoc("基站Excel信息列表")]
        public IEnumerable<ENodebExcel> Infos { get; set; }
    }

    [TypeDoc("CDMA小区EXCEL信息容器，用于打包向服务器POST")]
    public class NewCdmaCellListContainer
    {
        public IEnumerable<CdmaCellExcel> Infos { get; set; }
    }

    public abstract class BtsFileSerivce
    {
        /// <summary>
        /// 图片存放的目录
        /// </summary>
        public string DirectoryPath { get; private set; }


        protected BtsFileSerivce(string root, string directory, string btsId)
        {
            DirectoryPath =
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("LtePlatform\\", "Customers\\") + root + "\\" +
                             (string.IsNullOrEmpty(directory) ? "" : directory + "\\") + btsId);
        }

        /// <summary>
        /// 获取图纸列表
        /// </summary>
        /// <returns></returns>
        public List<DwgInfo> GetList()
        {
            if (string.IsNullOrEmpty(DirectoryPath) || !Directory.Exists(DirectoryPath))
            {
                throw new DirectoryNotFoundException("图纸目录不存在:" + DirectoryPath);
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

            return files.Select(f => new DwgInfo
            {
                FileName = f,
                CreateTime = File.GetCreationTime(DirectoryPath + "/" + f).ToString("yyyy-MM-dd HH:mm:ss")
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
            }

            return content;
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
            if (!Directory.Exists(DirectoryPath))
            {
                Directory.CreateDirectory(DirectoryPath);
            }

            var filePath = DirectoryPath.GenerateFilePath(filename);
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

    }

    public class BtsDwgService : BtsFileSerivce
    {
        public BtsDwgService(string directory, string btsId) : base("BTSDWG", directory, btsId)
        {
        }

    }

    public class DwgInfo
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
