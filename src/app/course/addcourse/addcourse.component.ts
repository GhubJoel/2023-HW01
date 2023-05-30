import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/courseclass';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class CourseAddComponent implements OnInit {

  constructor(private data:DataService, private router : Router) { }


  addModuleForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }

  addModule()
  {
     Object.values(this.addModuleForm.controls).forEach(control => {
       if (control.invalid) 
       {
        control.markAsDirty(); 
        control.updateValueAndValidity({ onlySelf: true });
      }
 });

   
   
    let course = new Course();
    course.name = this.addModuleForm.value.name;
    course.description = this.addModuleForm.value.description;
    course.duration = this.addModuleForm.value.duration;

   this.data.AddCourse(course).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
      this.router.navigate(['/'])
    }
    else
    {
      alert("Added Successfully");
      this.router.navigate(['/courses'])
    }
   });

  }


}
