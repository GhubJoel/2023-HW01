import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/courseclass';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-edit',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class CourseEditComponent implements OnInit {

  constructor(private data:DataService, private router : Router , private activated:ActivatedRoute) { }

  editCourse: Course = new Course();

  updateModuleForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

     
    this.activated.params.subscribe(params => { 


   
     this.data.GetCourse(params['id']).subscribe(response => { 

      this.editCourse = response as Course;

      
      this.updateModuleForm.controls['name'].setValue(this.editCourse.name);
      this.updateModuleForm.controls['duration'].setValue(this.editCourse.duration);
      this.updateModuleForm.controls['description'].setValue(this.editCourse.description);
     })

    })
 }

  editModule()
  {
    let course = new Course();
    course.name = this.updateModuleForm.value.name;
    course.description = this.updateModuleForm.value.description;
    course.duration = this.updateModuleForm.value.duration;

   this.data.UpdateCourse(this.editCourse.courseId,course).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
      this.router.navigate(['/'])
    }
    else
    {
      alert("Course Uodated Successfully");
      this.router.navigate(['/courses'])
    }
   });

  }

}
