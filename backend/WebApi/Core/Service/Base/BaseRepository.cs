using EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PagedList;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Base
{
    public class Page
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public Page()
        {
            PageNumber = 1;
            PageSize = 10;
        }
        public Page(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
        public int Skip
        {
            get { return (PageNumber - 1) * PageSize; }
        }
    }
    public static class PagingExtensions
    {
        /// <summary>
        /// Extend IQueryable to simplify access to skip and take methods 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryable"></param>
        /// <param name="page"></param>
        /// <returns>IQueryable with Skip and Take having been performed</returns>
        public static IQueryable<T> GetPage<T>(this IQueryable<T> queryable, Page page)
        {
            return queryable.Skip(page.Skip).Take(page.PageSize);
        }
    }
    public interface IBaseRepository<T>
    {
        void Add(T entity);
        T Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Delete(Expression<Func<T, bool>> expression);
        T GetById(long id);
        T GetByCode(string code);
        T Get(Expression<Func<T, bool>> expression);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetMany(Expression<Func<T, bool>> expression);
        IPagedList<T> GetPage<TOrder>(Page page, Expression<Func<T, bool>> where, Expression<Func<T, TOrder>> order);
    }
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private MyDbContext _dbContext;
        private readonly DbSet<T> _dbset;
        protected BaseRepository(
            MyDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbset = _dbContext.Set<T>();
        }

        public virtual void Add(T entity)
        {
            _dbset.Add(entity);
            _dbContext.SaveChanges();
        }

        public virtual T Create(T entity)
        {
            var result = _dbset.Add(entity);
            _dbContext.SaveChanges();
            return result.Entity;
        }
        public virtual void Update(T entity)
        {
            _dbset.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
        public virtual void Delete(T entity)
        {
            _dbset.Remove(entity);
            _dbContext.SaveChanges();
        }
        public virtual void Delete(Expression<Func<T, bool>> expression)
        {
            IEnumerable<T> objects = _dbset.Where<T>(expression).AsEnumerable();
            foreach (T obj in objects)
            {
                _dbset.Remove(obj);
            }
            _dbContext.SaveChanges();
        }
        public virtual T GetById(long id)
        {
            return _dbset.Find(id);
        }
        public virtual T GetByCode(string code)
        {
            return _dbset.Find(code);
        }
        public virtual IEnumerable<T> GetAll()
        {
            return _dbset.ToList();
        }

        public virtual IEnumerable<T> GetMany(Expression<Func<T, bool>> expression)
        {
            return _dbset.Where(expression).ToList();
        }

        /// <summary>
        /// Return a paged list of entities
        /// </summary>
        /// <typeparam name="TOrder"></typeparam>
        /// <param name="page">Which page to retrieve</param>
        /// <param name="where">Where clause to apply</param>
        /// <param name="order">Order by to apply</param>
        /// <returns></returns>
        public virtual IPagedList<T> GetPage<TOrder>(Page page, Expression<Func<T, bool>> expression, Expression<Func<T, TOrder>> order)
        {
            var results = _dbset.OrderBy(order).Where(expression).GetPage(page).ToList();
            var total = _dbset.Count(expression);
            return new StaticPagedList<T>(results, page.PageNumber, page.PageSize, total);
        }

        public T Get(Expression<Func<T, bool>> express)
        {
            return _dbset.Where(express).FirstOrDefault<T>();
        }
        #region Command Text
        public List<T> RawSqlQuery<T>(string query, Func<DbDataReader, T> map)
        {
            var command = _dbContext.Database.GetDbConnection().CreateCommand();
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                _dbContext.Database.OpenConnection();
                using (var result = command.ExecuteReader())
                {
                    var entities = new List<T>();
                    while (result.Read())
                    {
                        entities.Add(map(result));
                    }
                    _dbContext.Database.CloseConnection();
                    return entities;
                }
            }
        }
        public void SqlCommandRaw(string sqlQuery)
        {
            using (var command = _dbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = string.Format(sqlQuery);
                _dbContext.Database.OpenConnection();
                using (var reader = command.ExecuteReader()) 
                {
                    _dbContext.Database.CloseConnection();
                }
            }
        }
        #endregion
    }
}
