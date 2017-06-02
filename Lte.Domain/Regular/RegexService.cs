using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Lte.Domain.Regular
{
    public static class RegexService
    {
        /// <summary>
        /// 匹配日期是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>匹配结果true是日期反之不是日期</returns>
        public static bool CheckDateByString(this string source)
        {
            var rg = new Regex(@"^(\d{4}[\/\-](0?[1-9]|1[0-2])[\/\-]((0?[1-9])|((1|2)[0-9])|30|31))|((0?[1-9]|1[0-2])[\/\-]((0?[1-9])|((1|2)[0-9])|30|31)[\/\-]\d{4})$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 从字符串中获取第一个日期
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串中的第一个日期</returns>
        public static string GetFirstDateByString(this string source)
        {
            return Regex.Match(source, @"(\d{4}[\/\-](0?[1-9]|1[0-2])[\/\-]((0?[1-9])|((1|2)[0-9])|30|31))|((0?[1-9]|1[0-2])[\/\-]((0?[1-9])|((1|2)[0-9])|30|31)[\/\-]\d{4})").Groups[0].Value;
        }

        /// <summary>
        /// 从字符串中获取所有的日期
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串中的所有日期</returns>
        public static List<string> GetAllDateByString(this string source)
        {
            var all = Regex.Matches(source, @"(\d{4}[\/\-](0?[1-9]|1[0-2])[\/\-]((0?[1-9])|((1|2)[0-9])|30|31))|((0?[1-9]|1[0-2])[\/\-]((0?[1-9])|((1|2)[0-9])|30|31)[\/\-]\d{4})");
            return (from Match item in all select item.Value).ToList();
        }

        public static string GetStrictDateByString(this string source)
        {
            return
                Regex.Match(source,
                    @"([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))")
                    .Groups[0].Value;
        }

        public static string GetPersistentDateTimeString(this string source)
        {
            return
                Regex.Match(source,
                    @"([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8])))(([01][0-9])|(2[0-3]))([0-5][0-9])([0-5][0-9])")
                    .Groups[0].Value;
        }

        public static DateTime? GetDateTimeFromFileName(this string fileName)
        {
            var dateTimeString = fileName.GetPersistentDateTimeString();
            if (String.IsNullOrEmpty(dateTimeString)) return null;
            var year = dateTimeString.Substring(0, 4);
            var month = dateTimeString.Substring(4, 2);
            var day = dateTimeString.Substring(6, 2);
            var hour = dateTimeString.Substring(8, 2);
            var minute = dateTimeString.Substring(10, 2);
            var second = dateTimeString.Substring(12, 2);
            return new DateTime(year.ConvertToInt(2015), month.ConvertToInt(1), day.ConvertToInt(1),
                hour.ConvertToInt(12), minute.ConvertToInt(0), second.ConvertToInt(0));
        }

        /// <summary>
        /// 检测字符串中是否包含符合正则的子集
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="reg">正则, e.g. \d+</param>
        /// <returns>true:包含，反之不包含</returns>
        public static bool CheckContainsByReg(string source, string reg)
        {
            return Regex.Match(source, reg).Success;
        }

        /// <summary>
        /// 检测整个字符串是否能匹配正则,而不是包含
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="reg">正则, e.g. ^\d+$</param>
        /// <returns>true:匹配，反之不匹配</returns>
        public static bool CheckStringByReg(string source, string reg)
        {
            var rg = new Regex(reg, RegexOptions.IgnoreCase);
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 从指定字符串中过滤出第一个符合正则匹配的子集
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="reg">正则, e.g. \d+</param>
        /// <returns>源字符串的第一个匹配的子集</returns>
        public static string GetFirstStringByReg(string source, string reg)
        {
            return Regex.Match(source, reg).Groups[0].Value;
        }

        /// <summary>
        /// 从指定字符串中过滤出所有符合正则匹配的子集
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="reg">正则, e.g. \d+</param>
        /// <returns>true:匹配，反之不匹配</returns>
        public static List<string> GetStringByReg(string source, string reg)
        {
            var regex = Regex.Matches(source, reg);

            return (from Match item in regex select item.Value).ToList();
        }

        /// <summary>
        /// 从指定字符串中过滤出第一个数字
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串的第一个数字</returns>
        public static string GetFirstNumberByString(string source)
        {
            return Regex.Match(source, @"\d+").Groups[0].Value;
        }

        /// <summary>
        /// 从指定字符串中过滤出最后一个数字
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串的最后一个数字</returns>
        public static string GetLastNumberByString(string source)
        {
            var reg = Regex.Matches(source, @"\d+");
            return reg[reg.Count - 1].Value;
        }

        /// <summary>
        /// 从指定字符串中过滤出所有数字
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串的所有数字</returns>
        public static List<string> GetAllNumberByString(string source)
        {
            var reg = Regex.Matches(source, @"\d+");

            return (from Match item in reg select item.Value).ToList();
        }

        /// <summary>
        /// 检车源字符串中是否包含数字
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>true:源字符串包含数字;false:源字符串不包含数字</returns>
        public static bool CheckNumberByString(string source)
        {
            return Regex.Match(source, @"\d").Success;
        }

        /// <summary>
        /// 判断字符串是否全部是数字且长度等于指定长度
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="length">指定长度</param>
        /// <returns>返回值</returns>
        public static bool CheckLengthByString(string source, int length)
        {
            var rg = new Regex(@"^\d{" + length + "}$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 截取字符串中开始和结束字符串中间的字符串
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <param name="startStr">开始字符串</param>
        /// <param name="endStr">结束字符串</param>
        /// <returns>中间字符串</returns>
        public static string Substring(string source, string startStr, string endStr)
        {
            var rg = new Regex("(?=(" + startStr + "))[.\\s\\S]*?(?=(" + endStr + "))", RegexOptions.Multiline | RegexOptions.Singleline);
            return rg.Match(source).Value;
        }

        /// <summary>
        /// 匹配邮箱是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>匹配结果true是邮箱反之不是邮箱</returns>
        public static bool CheckEmailByString(string source)
        {
            var rg = new Regex("^\\s*([A-Za-z0-9_-]+(\\.\\w+)*@(\\w+\\.)+\\w{2,5})\\s*$", RegexOptions.IgnoreCase);
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 匹配URL是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>匹配结果true是URL反之不是URL</returns>
        public static bool CheckURLByString(string source)
        {
            var rg = new Regex(@"^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$", RegexOptions.IgnoreCase);
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 检测密码复杂度是否达标：密码中必须包含字母、数字、特称字符，至少8个字符，最多16个字符。
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>密码复杂度是否达标true是达标反之不达标</returns>
        public static bool CheckPasswordByString(string source)
        {
            var rg = new Regex(@"^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 匹配邮编是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>邮编合法返回true,反之不合法</returns>
        public static bool CheckPostcodeByString(string source)
        {
            var rg = new Regex(@"^\d{6}$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 匹配电话号码是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>电话号码合法返回true,反之不合法</returns>
        public static bool CheckTelephoneByString(string source)
        {
            var rg = new Regex(@"^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 从字符串中获取电话号码
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串中电话号码</returns>
        public static string GetTelephoneByString(string source)
        {
            return Regex.Match(source, @"((\d{3,4}-)|\d{3.4}-)?\d{7,8}").Groups[0].Value;
        }

        /// <summary>
        /// 匹配手机号码是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>手机号码合法返回true,反之不合法</returns>
        public static bool CheckMobilephoneByString(string source)
        {
            var rg = new Regex(@"^[1]+[3,5,7,8]+\d{9}$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 从字符串中获取手机号码
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串中手机号码</returns>
        public static string GetMobilephoneByString(string source)
        {
            return Regex.Match(source, @"[1]+[3,5,7,8]+\d{9}").Groups[0].Value;
        }

        /// <summary>
        /// 匹配身份证号码是否合法
        /// </summary>
        /// <param name="source">待匹配字符串</param>
        /// <returns>身份证号码合法返回true,反之不合法</returns>
        public static bool CheckIDCardByString(string source)
        {
            var rg = new Regex(@"^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$");
            return rg.IsMatch(source);
        }

        /// <summary>
        /// 从字符串中获取身份证号码
        /// </summary>
        /// <param name="source">源字符串</param>
        /// <returns>源字符串中身份证号码</returns>
        public static string GetIDCardByString(string source)
        {
            return Regex.Match(source, @"(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))").Groups[0].Value;
        }

        public static int GetNumberAffix(this string fullName)
        {
            if (string.IsNullOrEmpty(fullName)) return 0;
            var math = Regex.Match(Path.GetFileNameWithoutExtension(fullName), @"^\S+(?<num>_\d+)$");
            if (!math.Success) return 1;
            var num = math.Groups["num"].Value.TrimStart('_').ConvertToInt(100);
            return num + 1;
        }
    }

    public static class IOOperations
    {
        public static StreamReader GetStreamReader(this string source)
        {
            byte[] stringAsByteArray = Encoding.UTF8.GetBytes(source);
            Stream stream = new MemoryStream(stringAsByteArray);

            var streamReader = new StreamReader(stream, Encoding.UTF8);
            return streamReader;
        }

        public static string GenerateFilePath(this string directoryPath, string filename)
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
            name += "_" + file.FullName.GetNumberAffix();

            return directoryPath + "/" + name + Path.GetExtension(filename);
        }

        public static string QueryContentType(this string extension)
        {
            switch (extension)
            {
                case ".vsd":
                case ".vsdx":
                    return "application/vnd.visio";
                case ".pdf":
                    return "application/pdf";
                case "dwg":
                    return "application/x-dwg";
                default:
                    return "application/octet-stream";
            }
        }
    }
}
