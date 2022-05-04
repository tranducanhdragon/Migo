using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Repository;
using Core.Service.Base;
using Core.Properties;
using System.Security.Cryptography;
using AutoMapper;
using System.Security.Claims;

namespace Core.Service
{
    public class UserDto
    {
        public string UserName { set; get; }
        public string FullName { get; set; }
        public string Email { set; get; }
        public string Password { set; get; }
        public string PhoneNumber { get; set; }
        public int RoleId { get; set; }
        public string UrlImage { get; set; }
        public string IdentityNumber { get; set; }
    }
    public class UserAuthenDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string IdentityNumber { get; set; }
        public int? RoleId { get; set; }
    }
    public interface IUserService : IBaseService<User>
    {
        DataResult<User> Register(UserDto registerDto);
        User Authenticate(UserAuthenDto authenDto);
    }
    public class UserService : BaseService<User>, IUserService
    {
        private IUserRepository _userRepo;
        private IRoleRepository _roleRepo;
        private readonly IMapper _mapper;
        public UserService(
            IUserRepository userRepo,
            IRoleRepository roleRepo,
            IMapper mapper) 
            :base(userRepo)
        {
            _userRepo = userRepo;
            _roleRepo = roleRepo;
            _mapper = mapper;
        }
        public DataResult<User> Register(UserDto registerDto)
        {
            try
            {
                var user = _userRepo.Get(u => u.UserName == registerDto.UserName);
                if(user == null)
                {
                    //create user
                    registerDto.Password = Encryption(registerDto.Password);
                    var register = _mapper.Map<User>(registerDto);
                    var result = _userRepo.Create(register);   
                    return DataResult<User>.ResultSuccess(result, Resources.Register_Success);
                }
                return DataResult<User>.ResultError(Resources.User_Existed, Resources.Register_Fail);
            }
            catch (Exception e)
            {
                return DataResult<User>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public User Authenticate(UserAuthenDto authenDto)
        {
            try
            {
                var user = _userRepo.Get(u => u.UserName == authenDto.UserName);
                if(user != null && user.Password == Encryption(authenDto.Password))
                {
                    return user;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public string Encryption(String password)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] encrypt;
            UTF8Encoding encode = new UTF8Encoding();
            //encrypt the given password string into Encrypted data  
            encrypt = md5.ComputeHash(encode.GetBytes(password));
            StringBuilder encryptdata = new StringBuilder();
            //Create a new string by using the encrypted data  
            for (int i = 0; i < encrypt.Length; i++)
            {
                encryptdata.Append(encrypt[i].ToString());
            }
            return encryptdata.ToString();
        }
    }
}
