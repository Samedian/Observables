import { Component, OnDestroy, OnInit } from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs'
import {map,filter,reduce} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{

  private firstObsSub: Subscription;
  constructor() { }
  
  ngOnInit() {
    //new value every second
    // this.firstObsSub =  interval(1000).subscribe(
    //   count =>{
    //       console.log(count);
    //   }
    // )

    const customIntervalObservable = Observable.create(
      observer=>{
        let count =0;
        setInterval(
          () =>{
            observer.next(count);
            if(count===2){
              observer.complete();
            }
            if(count>3){
              observer.error( new Error("Count has reached max 3"));
              
            }
            count++;
          }
          ,1000)
      }
    )

    this.firstObsSub= customIntervalObservable.pipe(filter(

      (data:Number)=>{
        return data>0?true:false;
      }
    ), map((data:number)=>{
      return 'Round :' + (data+1);
    })).subscribe(data=>{
      console.log(data);
    },error =>{
      console.log(error);
      alert(error.message)
   },()=>{
    console.log("completed");
   })
  }

  ngOnDestroy() {
    this.firstObsSub.unsubscribe();
  }
}
