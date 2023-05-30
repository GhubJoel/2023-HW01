import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses.component';
import { CourseAddComponent} from './course/addcourse/addcourse.component';
import { CourseEditComponent } from './course/editcourse/editcourse.component';

const routes: Routes = [
  {path: 'courses', component: CoursesComponent},  
  {path: '', redirectTo: '/courses', pathMatch: 'full'},
  {path: 'addcourse' , component:CourseAddComponent},
  {path: 'editcourse' , component:CourseEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
