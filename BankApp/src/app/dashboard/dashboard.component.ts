import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  acno:any
  pswd:any
  amount:any
  user:any;
  sdate:any;

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router,private http:HttpClient){
    if(localStorage.getItem('currentUser'))
      this.user=JSON.parse(localStorage.getItem('currentUser')||'')
      this.sdate= Date()
      console.log(localStorage);
  }
  
  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
  }

 //model for register
  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  //control passes through html page

  deposit(){
    var acno=this.depositForm.value.acno;
    var password=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    if(this.depositForm.valid){
      this.ds.deposit(acno,password,amount).subscribe(
        (result:any)=>{
           alert(result.message);
        },
        result=>{
           alert(result.error.message);
        }
      )
    }
    // const result=this.ds.deposit(acno,pswd,amount)
    // if(result){
    //   alert(`${amount} is credited to ${acno} and balance is ${result}`)
    // }
    // else{
    //   alert("invalid details")
    // }
  }

  //model for register
  withdrawForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  //control passes through html page

  withdraw(){
    var acno=this.withdrawForm.value.acno;
    var password=this.withdrawForm.value.pswd;
    var amount=this.withdrawForm.value.amount;
    if(this.withdrawForm.valid){
      this.ds.withdraw(acno,password,amount).subscribe(
        (result:any)=>{
          alert(result.message);
        },
        result=>{
          alert(result.error.message);
        }
      )
    }
    // this.ds.withdraw(acno,password,amount)
    // if(result){
    //   alert(`${amount} is debited from ${acno} and balance is ${result}`)
    // }
    // else{
    //   alert("invalid details")
    // }
  }

  logout(){
    // alert('Log out')
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    this.router.navigateByUrl('')
  }

  delete(){
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
  }
  onCancel(){
    this.acno="";
  }
  onDelete(event:any){
    this.ds.deleteAcc(event).subscribe(
      (result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      }
    )
  }
}
