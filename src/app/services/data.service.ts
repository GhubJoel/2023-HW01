import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Course } from '../shared/course';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:5116/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }

  GetCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
  }

  AddCourse(course:Course)
  {
    return this.httpClient.post(this.apiUrl+ `Course/AddCourse`, course);
  }

  GetCourse(courseId:Number) {
    return this.httpClient.get(this.apiUrl + `Course/GetCourseById/${courseId}`);
  }

  UpdateCourse(courseId:Number,course:Course) {
    return this.httpClient.put(this.apiUrl + `Course/EditCourse/${courseId}`, course);
  }

  DeleteCourse(courseId:Number) {
    return this.httpClient.delete(this.apiUrl + `Course/DeleteCourse/${courseId}`);
  }

}


