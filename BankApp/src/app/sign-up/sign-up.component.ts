import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

   //property
   acno:any;
   pswd:any;
   uname:any;
   userDetails:any;
  //  userDetails:any={
  //    1000:{acno:1000,username:"Pranav",password:1000,balance:2000},
  //    1001:{acno:1001,username:"Abhinand",password:1001,balance:3000},
  //    1002:{acno:1002,username:"Adwaith",password:1002,balance:4000}
  //  }

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) {

  }
  ngOnInit(): void {

  }

  aim="Your perfect banking partner"

  //model for register
  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  //control passes through html page

 

  reg(){
    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;
    if(this.registerForm.valid){
    const result=this.ds.reg(acno,uname,pswd).subscribe(
      (result:any)=>{
        alert(result.message);
        this.router.navigateByUrl('');
      },
      result=>{
        alert(result.error.message)
      }
    )
    }
    // if(this.registerForm.valid){      getting result without using this 
      
      else{
        alert("Registration failed")
        console.log(this.registerForm.get('uname')?.errors);
      }
    // }
  }
}
