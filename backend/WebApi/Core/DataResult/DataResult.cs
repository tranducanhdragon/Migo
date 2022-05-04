using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public interface IDataResult
    {
        string Message { get; set; }
        string Error { get; set; }
        bool Success { get; set; }

    }

    public class DataResult : IDataResult
    {
        public string Message { get; set; }
        public string Error { get; set; }
        public bool Success { get; set; } = true;


        public static DataResult ResultSuccess(string message) => new DataResult()
        {
            Message = message,
            Success = true
        };

        public static DataResult ResultError(string err, string message) => new DataResult()
        {
            Error = err,
            Message = message,
            Success = false
        };
    }

    public interface IDataResult<T>
    {
        string Message { get; set; }
        string Error { get; set; }
        bool Success { get; set; }
        object Data { get; set; }
    }


    public class DataResult<T> : IDataResult<T>
    {
        public string Message { get; set; }
        public string Error { get; set; }
        public bool Success { get; set; } = true;
        public object Data { get; set; }

        public static DataResult<T> ResultSuccess(object data, string message) => new DataResult<T>()
        {
            Data = data,
            Message = message,
            Success = true
        };

        public static DataResult<T> ResultError(string err, string message) => new DataResult<T>()
        {
            Error = err,
            Message = message,
            Success = false
        };
    }
    public class DataResultCommon : IDataResult
    {
        public string Message { get; set; }
        public string Error { get; set; }
        public bool Success { get; set; } = true;
        public object Data { get; set; }
        public int? TotalRecords { get; set; }

        public static DataResultCommon ResultSuccess(object data, string message) => new DataResultCommon()
        {
            Data = data,
            Message = message,
            Success = true

        };
        public static DataResultCommon ResultSuccess(object data, string message, int totalReCords) => new DataResultCommon()
        {
            Data = data,
            Message = message,
            Success = true,
            TotalRecords = totalReCords

        };

        public static DataResultCommon ResultError(string err, string message) => new DataResultCommon()
        {
            Error = err,
            Message = message,
            Success = false
        };

        public static DataResultCommon ResultSuccess(string message) => new DataResultCommon()
        {
            Message = message,
            Success = true
        };

        public static DataResultCommon ResultFail(string message) => new DataResultCommon()
        {
            Message = message,
            Success = false
        };

    }
}
