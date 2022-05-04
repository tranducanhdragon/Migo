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
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommunityController : BaseController<Community>
    {
        private ICommunityService _communityService;
        private ITourService _tourService;
        public CommunityController(ICommunityService communityService,
            ITourService tourService,
            ILogger<CommunityController> logger) 
            : base(communityService, logger)
        {
            _communityService = communityService;
            _tourService = tourService;

        }
        [HttpGet("getallbookingforadmin")]
        public IActionResult GetAllBookingForAdmin([FromQuery] BookingDetailDto bookingDto)
        {
            try
            {
                var result = _communityService.GetAllBookingForAdmin(bookingDto);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllBookingNotApproved_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpPost("createdetail")]
        public IActionResult CreateBookingDetail(BookingDetail dto)
        {
            try
            {
                var result = _communityService.CreateBookingDetail(dto);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("CreateBookingDetail_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getalldetailbyservice")]
        public IActionResult GetAllDetailsByService([FromQuery] BookingDetailDto bookingDto)
        {
            try
            {
                var result = _communityService.GetAllBookingDetailsByService(bookingDto);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllDetailsByService_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getrevenuebytime")]
        public IActionResult GetRevenueByTime([FromQuery] int month, [FromQuery] int year)
        {
            try
            {
                var result = _communityService.GetRevenueByTime(month, year);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetRevenueByTime_Failed_" + e.Message);
                return Ok(e);
            }
        }
        [HttpGet("getalltour")]
        public IActionResult GetAllTour()
        {
            try
            {
                var result = _tourService.GetAllTour();
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("GetAllTour_Failed_" + e.Message);
                return Ok(e);
            }
        }
    }
}
