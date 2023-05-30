using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using u0459837_HW01_API.ViewModel;

namespace u0459837_HW01_API.Models
{
    public class CourseRepository : ICourseRepository
    {
        private readonly AppDbContext _appDbContext;

        public CourseRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Course[]> GetAllCourseAsync()
        {
            IQueryable<Course> query = _appDbContext.Courses;
            return await query.ToArrayAsync();
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }

        public async Task<Course> GetCourseById(int corsId)
        {

            IQueryable<Course> query = _appDbContext.Courses.Where(c => c.CourseId == corsId);
            return await query.FirstOrDefaultAsync();
        }

        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }
    }


}
