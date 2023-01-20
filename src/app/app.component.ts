import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userActivated =false;
  constructor(private user:UserService) {}

  ngOnInit() {

    this.user.activatedEmitter.subscribe(
      data =>{
        this.userActivated=data;
      }
    )
  }
}
