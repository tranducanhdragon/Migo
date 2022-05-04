using Core.Repository;
using Core.Service;
using EntityFramework.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Const;
using WebApi.Controllers.Base;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CitizenController : BaseController<Citizen>
    {
        private ICitizenService _citizenService;
        public CitizenController(ICitizenService citizenService, ILogger<CitizenController> logger) 
            : base(citizenService, logger)
        {
            _citizenService = citizenService;
        }
        [HttpGet("getallusernotfriend/{userId:long?}")]
        public IActionResult GetAllUserNotFriend(long? userId)
        {
            try
            {
                var result = _citizenService.GetAllUserNotFriend(userId);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllUserNotFriend_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getalluserfriend/{userId:long?}")]
        public IActionResult GetAllUserFriend(long? userId)
        {
            try
            {
                var result = _citizenService.GetAllUserFriend(userId);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllUserFriend_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getallcitizensfilter")]
        public IActionResult GetAllCitizensFilter([FromQuery] CitizenDto citizenDto)
        {
            try
            {
                var result = _citizenService.GetAllCitizensFilter(citizenDto);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllCitizensFilter_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getallusersfilter")]
        public IActionResult GetAllUsersFilter([FromQuery] UserDto userDto)
        {
            try
            {
                var result = _citizenService.GetAllUsersFilter(userDto);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllUsersFilter_Failed_" + e.Message);
                return Ok(e);
            }
        }
    }
}
