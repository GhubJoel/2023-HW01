import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './course/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseAddComponent } from './course/addcourse/addcourse.component';
import { CourseEditComponent } from './course/editcourse/editcourse.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseAddComponent,
    CourseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
