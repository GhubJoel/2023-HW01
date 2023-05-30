using u0459837_HW01_API.ViewModel;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using u0459837_HW01_API.Models;

namespace u0459837_HW01_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        [Route("GetAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            try
            {
                var results = await _courseRepository.GetAllCourseAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetCourseById/{corsId}")]

        public async Task<IActionResult> GetCourseById(int courseId)
        {
            try
            {
                var result = await _courseRepository.GetCourseById(courseId);
                if (result == null) return NotFound("Course not found");
                return Ok(result);
            }
            catch (Exception) 
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }   
        }

        [HttpPost]
        [Route("AddCourse")]
        public async Task<IActionResult> AddCourse(CourseViewModel cors)
        {
            var course = new Course { Name = cors.Name, Duration = cors.Duration, Description = cors.Description};

            try
            {
                _courseRepository.Add(course);
                await _courseRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(course);
        }

        [HttpPut]
        [Route("EditCourse/{corsId}")]
        public async Task<ActionResult<CourseViewModel>> EditCustomer(int courseId, CourseViewModel course)
        {
            try
            {
                var presentcourse = await _courseRepository.GetCourseById(courseId);
                if (presentcourse == null) return NotFound($"The Course does not exist");

                presentcourse.Name = course.Name;
                presentcourse.Duration = course.Duration;
                presentcourse.Description = course.Description;
                

                if (await _courseRepository.SaveChangesAsync())
                {
                    return Ok(presentcourse);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpDelete]
        [Route("DeleteCourse/{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            try
            {
                var presentcourse = await _courseRepository.GetCourseById(courseId);

                if (presentcourse == null) return NotFound($"The Course does not exist");

                _courseRepository.Delete(presentcourse);

                if (await _courseRepository.SaveChangesAsync()) return Ok(presentcourse);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }


    }
}
