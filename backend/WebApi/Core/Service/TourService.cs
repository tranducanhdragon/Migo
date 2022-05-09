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
    public interface ITourService : IBaseService<Tour>
    {
        DataResult<IEnumerable<Tour>> GetAllTour();
        DataResult<IEnumerable<TourGuide>> GetAllTourGuide();
    }
    public class TourService : BaseService<Tour>, ITourService
    {
        private ITourGuideRepository _tourGuideRepository;
        private IMapper _mapper;
        public TourService(
            ITourRepository tourRepo,
            ITourGuideRepository tourGuideRepository,
            IMapper mapper) 
            : base(tourRepo)
        {
            _tourGuideRepository = tourGuideRepository;
            _mapper = mapper;
        }
        public DataResult<IEnumerable<Tour>> GetAllTour()
        {
            try
            {
                var result = (from tours in base._repository.GetAll()
                              select tours).ToList();
                return DataResult<IEnumerable<Tour>>.ResultSuccess(result, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<Tour>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public DataResult<IEnumerable<TourGuide>> GetAllTourGuide()
        {
            try
            {
                var result = (from tourGuides in _tourGuideRepository.GetAll()
                              select tourGuides).ToList();
                return DataResult<IEnumerable<TourGuide>>.ResultSuccess(result, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<TourGuide>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
    }
}
