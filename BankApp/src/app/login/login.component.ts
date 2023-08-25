import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ //3rd executed
        //class is a collection of properties and methods
    constructor(private router:Router,private ds:DataService,private fb:FormBuilder,private http:HttpClient) { //1st executed
        //used for object initialization
        //It automatically invokes when an object is created
    }
    ngOnInit(): void { //2nd executed
        //Initial process of a component
        //when a component is created, at same time it initialize or authorize
        //when acomponent is created, there is alifecycle for it
    }

    //properties

    aim="Your perfect banking partner"

    accountNo="Account Number"

    acno:any;
    pswd:any;
    userDetails:any;
    // userDetails:any={
    //   1000:{acno:1000,username:"Pranav",password:1000,balance:2000},
    //   1001:{acno:1001,username:"Abhinand",password:1001,balance:3000},
    //   1002:{acno:1002,username:"Adwaith",password:1002,balance:4000}
    // }
    //userdefined function //4th executed
    // Login(a:any, p:any){
    //   var acno=a.value;
    //   var pswd=p.value;
    //   var userDetails=this.userDetails;

    //   if(acno in userDetails){
    //     if(pswd==userDetails[acno].password){
    //       alert('Login successful')
    //     }
    //     else{
    //       alert('Incorrect Password')
    //     }
    //   }
    //   else{
    //     alert('user not found')
    //   }
    // }

  //model for register
    loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
  //control passes through html page

    Login(){
      var acno=this.loginForm.value.acno;
      var pswd=this.loginForm.value.pswd;
      if(this.loginForm.valid){
        this.ds.Login(acno,pswd).subscribe(
          (result:any)=>{
            localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
            localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
            localStorage.setItem('token',JSON.stringify(result.token))
            alert(result.message);
            this.router.navigateByUrl('dashboard');
          },
          result=>{
            alert(result.error.message)
          }
        )
      }
    } 


}
