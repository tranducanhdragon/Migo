using Core;
using Core.Service.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers.Base
{
    public class BaseController<TEntity> : ControllerBase
        where TEntity : class
    {
        public IBaseService<TEntity> _service;
        public ILogger<BaseController<TEntity>> _log;
        public BaseController(IBaseService<TEntity> service,
            ILogger<BaseController<TEntity>> log)
        {
            _service = service;
            _log = log;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            try
            {
                var result = _service.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _log.LogInformation("GetAll_Failed_"+ex.Message);
                return Ok(ex);
            }
        }

        [HttpPost("insert")]
        public IActionResult Insert([FromBody] TEntity entity)
        {
            try
            {
                var result = _service.CreateEntity(entity);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _log.LogInformation("Insert_Failed_" + ex.Message);
                return Ok(ex);
            }
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(long id)
        {
            try
            {
                var result = _service.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _log.LogInformation("GetById_Failed_" + ex.Message);
                return Ok(ex);
            }
        }

        [HttpPut("update")]
        public IActionResult Update([FromBody] TEntity item)
        {
            try
            {
                var result = _service.UpdateEntity(item);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _log.LogInformation("Update_Failed_" + ex.Message);
                return Ok(ex);
            }
        }

        [HttpDelete("delete")]
        public IActionResult Delete([FromBody] TEntity entity)
        {
            try
            {
                var result = _service.DeleteEntity(entity);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _log.LogInformation("Delete_Failed_" + ex.Message);
                return Ok(ex);
            }
        }
    }
}
