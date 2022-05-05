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
    public class TourController : BaseController<Tour>
    {
        private ITourService _tourService;
        public TourController(ITourService tourService,
            ILogger<TourController> logger) 
            : base(tourService, logger)
        {
            _tourService = tourService;
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
