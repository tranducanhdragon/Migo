using Core;
using Core.Base;
using Core.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service.Base
{
    public interface IBaseService<TEntity>
    {
        DataResult<TEntity> GetAll();
        DataResult<TEntity> GetById(long id);
        DataResult CreateEntity(TEntity entity);
        DataResult UpdateEntity(TEntity entity);
        DataResult DeleteEntity(TEntity entity);
    }
    public abstract class BaseService<TEntity> : IBaseService<TEntity>
        where TEntity : class
    {
        public IBaseRepository<TEntity> _repository;
        public BaseService(IBaseRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public DataResult DeleteEntity(TEntity entity)
        {
            try
            {
                _repository.Delete(entity);
                return DataResult.ResultSuccess(Resources.Delete_Success);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataResult<TEntity> GetAll()
        {
            try
            {
                var data = _repository.GetAll();
                return DataResult<TEntity>.ResultSuccess(data, Resources.Get_All_Success);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataResult<TEntity> GetById(long id)
        {
            try
            {
                var data = _repository.GetById(id);
                return DataResult<TEntity>.ResultSuccess(data, Resources.Get_Success);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataResult CreateEntity(TEntity entity)
        {
            try
            {
                _repository.Create(entity);
                return DataResult.ResultSuccess(Resources.Insert_Success);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataResult UpdateEntity(TEntity entity)
        {
            try
            {
                _repository.Update(entity);
                return DataResult.ResultSuccess(Resources.Update_Success);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
