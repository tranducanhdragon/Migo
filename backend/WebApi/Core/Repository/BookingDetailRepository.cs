using Core.Base;
using Core.Enum;
using EntityFramework.Context;
using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public class BookingRevenueDto
    {
        public long CommunityId { get; set; }
        public string ServiceName { get; set; }
        public int TotalBooks { get; set; }
        public int TotalMoney { get; set; }
    }
    public class BookingDetailDto {
        public long BookingDetailId { get; set; }
        public long? UserId { get; set; }
        public string IdentityNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public long? CommunityId { get; set; }
        public string ServiceName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Total { get; set; }
        public int? State { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public interface IBookingDetailRepository : IBaseRepository<BookingDetail>
    {
        IEnumerable<BookingRevenueDto> GetRevenueByTime(int month, int year);
        IEnumerable<BookingDetailDto> GetBookingForAdmin(BookingDetailDto bookingDto);
    }

    class BookingDetailRepository:BaseRepository<BookingDetail>, IBookingDetailRepository
    {
        private MyDbContext _myDbContext;
        public BookingDetailRepository(MyDbContext myDbContext) : base(myDbContext)
        {
            _myDbContext = myDbContext;
        }
        public IEnumerable<BookingRevenueDto> GetRevenueByTime(int month, int year)
        {
            var result = base.RawSqlQuery("select CommunityId, ServiceName, COUNT(*),SUM(Total) " +
                "from BookingDetail " +
                "where MONTH(StartTime) = " + month.ToString() +
                " and MONTH(EndTime) = " + month.ToString() +
                " and YEAR(StartTime) = " + year.ToString() +
                " and YEAR(EndTime) = " + year.ToString() +
                " group by CommunityId, ServiceName;",
                x => new BookingRevenueDto
                {
                    CommunityId = (long)x[0],
                    ServiceName = (string)x[1],
                    TotalBooks = (int)x[2],
                    TotalMoney = (int)x[3]
                });
            return result;
        }
        public IEnumerable<BookingDetailDto> GetBookingForAdmin(BookingDetailDto bookingDto)
        {

            var query = (from bookingDetails in _myDbContext.BookingDetails
                            //where bookingDetails.State == (int)CommunityEnum.STATE_BOOKING.PENDING
                            orderby bookingDetails.CreationTime descending
                            select new BookingDetailDto
                            {
                                BookingDetailId = bookingDetails.BookingDetailId,
                                CommunityId = bookingDetails.CommunityId,
                                FullName = bookingDetails.FullName,
                                IdentityNumber = bookingDetails.IdentityNumber,
                                PhoneNumber = bookingDetails.PhoneNumber,
                                ServiceName = bookingDetails.ServiceName,
                                Total = bookingDetails.Total,
                                UserId = bookingDetails.UserId,
                                StartTime = bookingDetails.StartTime,
                                EndTime = bookingDetails.EndTime,
                                State = bookingDetails.State,
                                CreationTime = bookingDetails.CreationTime
                            });
            if (bookingDto.UserId.HasValue)
            {
                query = query.Where(b => b.UserId == bookingDto.UserId);
            }
            if (bookingDto.CommunityId.HasValue)
            {
                query = query.Where(b => b.CommunityId == bookingDto.CommunityId);
            }
            return query.ToList();
        }
    }
}
