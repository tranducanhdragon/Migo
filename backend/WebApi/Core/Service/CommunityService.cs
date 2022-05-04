using AutoMapper;
using Core.Properties;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface ICommunityService : IBaseService<Community>
    {
        DataResult CreateBookingDetail(BookingDetail dto);
        DataResult<IEnumerable<BookingDetail>> GetAllBookingDetailsByService(BookingDetailDto serviceId);
        DataResult<IEnumerable<BookingRevenueDto>> GetRevenueByTime(int month, int year);
        DataResult<IEnumerable<BookingDetailDto>> GetAllBookingForAdmin(BookingDetailDto bookingDto);
    }
    public class CommunityService : BaseService<Community>, ICommunityService
    {
        private IBookingDetailRepository _bookingDetailRepos;
        private readonly IMapper _mapper;
        public CommunityService(
            ICommunityRepository communityRepo,
            IBookingDetailRepository bookingDetailRepos,
            IMapper mapper) 
            : base(communityRepo)
        {
            _bookingDetailRepos = bookingDetailRepos;
            _mapper = mapper;
        }
        public DataResult CreateBookingDetail(BookingDetail dto)
        {
            try
            {
                _bookingDetailRepos.Create(dto);
                return DataResult.ResultSuccess(Resources.Insert_Success);
            }
            catch (Exception e)
            {
                return DataResult.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public DataResult<IEnumerable<BookingDetail>> GetAllBookingDetailsByService(BookingDetailDto bookingDto)
        {
            try
            {
                var data = _bookingDetailRepos.GetMany(b => b.CommunityId == bookingDto.CommunityId && b.UserId == bookingDto.UserId);
                return DataResult<IEnumerable<BookingDetail>>.ResultSuccess(data,Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<BookingDetail>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public DataResult<IEnumerable<BookingDetailDto>> GetAllBookingForAdmin(BookingDetailDto bookingDto)
        {
            try
            {
                var data = _bookingDetailRepos.GetBookingForAdmin(bookingDto);
                return DataResult<IEnumerable<BookingDetailDto>>.ResultSuccess(data, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<BookingDetailDto>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public DataResult<IEnumerable<BookingRevenueDto>> GetRevenueByTime(int month, int year)
        {
            try
            {
                var data = _bookingDetailRepos.GetRevenueByTime(month, year);
                return DataResult<IEnumerable<BookingRevenueDto>>.ResultSuccess(data, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<BookingRevenueDto>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
    }
}
