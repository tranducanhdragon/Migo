using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace WebApi.Controllers
{
    public class FileController : ControllerBase
    {
        public IConfiguration _configuration { get; }
        
        public FileController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("downloadfile/{filePath}")]
        public IActionResult DownloadFile(string filePath)
        {
            try
            {
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound();
                }
                var FileType = "";
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, FileType, filePath);
            }
            catch (Exception ex)
            {
                return Ok("");
            }
        }

        [HttpPost]
        [Route("uploadfile")]
        public async Task<string> UploadFile()
        {
            try
            {
                var request = await Request.ReadFormAsync();
                //Check input
                var ufile = request.Files[0];
                if (ufile != null && ufile.Length > 0)
                {
                    //var userId = _session.UserId;
                    var fileName = Path.GetFileName(ufile.FileName);
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\files");
                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }
                    var filePath = Path.Combine(folderPath, fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await ufile.CopyToAsync(fileStream);
                    }
                    var result = _configuration["App:ServerRootAddress"].ToString() + @"files/" + fileName;
                    return JsonSerializer.Serialize(result);
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
