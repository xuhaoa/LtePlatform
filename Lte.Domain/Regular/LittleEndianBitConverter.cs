﻿using System;
using System.Security;

namespace Lte.Domain.Regular
{
    public static class LittleEndianBitConverter
    {
        public const bool IsLittleEndian = true;

        [SecuritySafeCritical]
        public static unsafe long DoubleToInt64Bits(double value)
        {
            return *(((long*)&value));
        }

        public static byte[] GetBytes(bool value)
        {
            return new[] { (value ? ((byte)1) : ((byte)0)) };
        }

        public static byte[] GetBytes(char value)
        {
            return GetBytes((short)value);
        }

        [SecuritySafeCritical]
        public static unsafe byte[] GetBytes(double value)
        {
            return GetBytes(*((long*)&value));
        }

        [SecuritySafeCritical]
        public static unsafe byte[] GetBytes(short value)
        {
            byte[] buffer = new byte[2];
            fixed (byte* numRef = buffer)
            {
                *((short*)numRef) = value;
            }
            return buffer;
        }

        [SecuritySafeCritical]
        public static unsafe byte[] GetBytes(int value)
        {
            byte[] buffer = new byte[4];
            fixed (byte* numRef = buffer)
            {
                *((int*)numRef) = value;
            }
            return buffer;
        }

        [SecuritySafeCritical]
        public static unsafe byte[] GetBytes(long value)
        {
            byte[] buffer = new byte[8];
            fixed (byte* numRef = buffer)
            {
                *((long*)numRef) = value;
            }
            return buffer;
        }

        [SecuritySafeCritical]
        public static unsafe byte[] GetBytes(float value)
        {
            return GetBytes(*((int*)&value));
        }

        public static byte[] GetBytes(ushort value)
        {
            return GetBytes((short)value);
        }

        public static byte[] GetBytes(uint value)
        {
            return GetBytes((int)value);
        }

        public static byte[] GetBytes(ulong value)
        {
            return GetBytes((long)value);
        }

        private static char GetHexValue(int i)
        {
            if (i < 10)
            {
                return (char)(i + 0x30);
            }
            return (char)((i - 10) + 0x41);
        }

        [SecuritySafeCritical]
        public static unsafe double Int64BitsToDouble(long value)
        {
            return *(((double*)&value));
        }

        public static bool ToBoolean(byte[] value, int startIndex)
        {
            if (value == null)
            {
                throw new ArgumentNullException("value");
            }
            if (startIndex < 0)
            {
                throw new ArgumentOutOfRangeException("startIndex", "ArgumentOutOfRange_NeedNonNegNum");
            }
            if (startIndex > (value.Length - 1))
            {
                throw new ArgumentOutOfRangeException("startIndex", "ArgumentOutOfRange_Index");
            }
            return (value[startIndex] != 0);
        }

        public static char ToChar(byte[] value, int startIndex)
        {
            return (char)((ushort)ToInt16(value, startIndex));
        }

        [SecuritySafeCritical]
        public static unsafe double ToDouble(byte[] value, int startIndex)
        {
            long longValue = ToInt64(value, startIndex);
            return *(((double*)&longValue));
        }

        [SecuritySafeCritical]
        public static unsafe short ToInt16(byte[] value, int startIndex)
        {
            if (value == null)
            {
                throw new ArgumentNullException("value");
            }
            if (startIndex >= value.Length)
            {
                throw new ArgumentOutOfRangeException("startIndex");
            }
            if (startIndex > (value.Length - 2))
            {
                throw new ArgumentException("TooSmall", "startIndex");
            }
            fixed (byte* numRef = &(value[startIndex]))
            {
                if ((startIndex % 2) == 0)
                {
                    return *(((short*)numRef));
                }
                return (short)(numRef[0] | (numRef[1] << 8));
            }
        }

        [SecuritySafeCritical]
        public static unsafe int ToInt32(byte[] value, int startIndex)
        {
            if (value == null)
            {
                throw new ArgumentOutOfRangeException("value");
            }
            if (startIndex >= value.Length)
            {
                throw new ArgumentOutOfRangeException("startIndex");
            }
            if (startIndex > (value.Length - 4))
            {
                throw new ArgumentException("TooSmall", "startIndex");
            }
            fixed (byte* numRef = &(value[startIndex]))
            {
                if ((startIndex % 4) == 0)
                {
                    return *(((int*)numRef));
                }
                return (((numRef[0] | (numRef[1] << 8)) | (numRef[2] << 0x10)) | (numRef[3] << 0x18));
            }
        }

        [SecuritySafeCritical]
        public static unsafe long ToInt64(byte[] value, int startIndex)
        {
            if (value == null)
            {
                throw new ArgumentOutOfRangeException("value");
            }
            if (startIndex >= value.Length)
            {
                throw new ArgumentOutOfRangeException("startIndex");
            }
            if (startIndex > (value.Length - 8))
            {
                throw new ArgumentException("TooSmall", "startIndex");
            }
            fixed (byte* numRef = &(value[startIndex]))
            {
                if ((startIndex % 8) == 0)
                {
                    return *(((long*)numRef));
                }
                return (((long)((ulong)(((numRef[0] | (numRef[1] << 8)) | (numRef[2] << 0x10)) | (numRef[3] << 0x18)))) | ((((numRef[4] | (numRef[5] << 8)) | (numRef[6] << 0x10)) | (numRef[7] << 0x18)) << 0x20));
            }
        }

        [SecuritySafeCritical]
        public static unsafe float ToSingle(byte[] value, int startIndex)
        {
            long longValue = ToInt32(value, startIndex);
            return *(((float*)&longValue));
        }

        public static string ToString(byte[] value)
        {
            if (value == null)
            {
                throw new ArgumentNullException("value");
            }
            return ToString(value, 0, value.Length);
        }

        public static string ToString(byte[] value, int startIndex)
        {
            if (value == null)
            {
                throw new ArgumentNullException("value");
            }
            return ToString(value, startIndex, value.Length - startIndex);
        }

        public static string ToString(byte[] value, int startIndex, int length)
        {
            if (value == null)
            {
                throw new ArgumentNullException("value");
            }
            int num = value.Length;
            if ((startIndex < 0) || ((startIndex >= num) && (startIndex > 0)))
            {
                throw new ArgumentOutOfRangeException("startIndex");
            }
            int num2 = length;
            if (num2 < 0)
            {
                throw new ArgumentOutOfRangeException("length");
            }
            if (startIndex > (num - num2))
            {
                throw new ArgumentException("Arg_ArrayPlusOffTooSmall", "startIndex");
            }
            if (num2 == 0)
            {
                return string.Empty;
            }
            if (num2 > 0x2aaaaaaa)
            {
                throw new ArgumentOutOfRangeException("length", "ArgumentOutOfRange_LengthTooLarge");
            }
            int num3 = num2 * 3;
            char[] chArray = new char[num3];
            int num4 = startIndex;
            for (int i = 0; i < num3; i += 3)
            {
                byte num6 = value[num4++];
                chArray[i] = GetHexValue(num6 / 0x10);
                chArray[i + 1] = GetHexValue(num6 % 0x10);
                chArray[i + 2] = '-';
            }
            return new string(chArray, 0, chArray.Length - 1);
        }

        public static ushort ToUInt16(byte[] value, int startIndex)
        {
            return (ushort)ToInt16(value, startIndex);
        }

        public static uint ToUInt32(byte[] value, int startIndex)
        {
            return (uint)ToInt32(value, startIndex);
        }

        public static ulong ToUInt64(byte[] value, int startIndex)
        {
            return (ulong)ToInt64(value, startIndex);
        }
    }
}
