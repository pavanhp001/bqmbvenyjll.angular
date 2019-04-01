import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  title = "List of Courses";
  imageURL = "https://www.w3schools.com/w3images/lights.jpg";
  colspan = 2;
  isActive = true;
  emailData = "me@wipro.com";
  CustomPipetext = 'This text is Example for custom pipe';
  onSave($event){
    $event.stopPropagation;
    console.log("save1 button was clicked");
  }
  onDivClicked($event){
    console.log("save button was clicked like Event Bubling");
  }
  onKeyUp($event){
    console.log("onKeyUp event triggered");
  }
  onKeyUpemail(email){
    console.log("onKeyUpemail event triggered email "+email);
  }
}
