using System.Threading.Tasks;
using u0459837_HW01_API.ViewModel;

namespace u0459837_HW01_API.Models
{
    public interface ICourseRepository
    {
        // Course
        Task<bool> SaveChangesAsync();
        Task<Course[]> GetAllCourseAsync();

        Task<Course> GetCourseById(int courseId);

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;


    }
}
