using AutoMapper;
using Core;
using Core.Service;
using EntityFramework.Entity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Controllers.Base;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<User>
    {
        private IUserService _userService;

        public UserController(
            IUserService userService,
            ILogger<UserController> logger)
            :base(userService, logger)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public IActionResult Register(UserDto dto)
        {
            try
            {
                var result = _userService.Register(dto);
                return Ok(result);
            }
            catch (Exception e)
            {
                base._log.LogInformation("Register_Failed_" + e.Message);
                return Ok(e);
            }
        }

        [HttpPost("login")]
        public IActionResult Login(UserAuthenDto authenDto)
        {
            try
            {
                var user = _userService.Authenticate(authenDto);
                if (user != null)
                {
                    //store UserId and RoleId in token for authenticate api
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                           new Claim("UserId", user.UserId.ToString()),
                           new Claim("RoleId", user.RoleId.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456")), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return Ok(DataResult<User>.ResultSuccess(token,"Login Success"));
                }   
                return Ok(DataResult.ResultError("", "Login Fail"));
            }
            catch (Exception e)
            {
                base._log.LogInformation("Login_Failed_" + e.Message);
                return Ok(e);
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            try
            {
                HttpContext.SignOutAsync();
                return Ok();
            }
            catch (Exception e)
            {
                base._log.LogInformation("Logout_Failed_" + e.Message);
                return Ok(e);
            }
        }
    }
}
