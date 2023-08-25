import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//
const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  //to hold current username
  currentUser:any;
  //to hold current acno
  currentAcno:any;
  
  userDetails:any={
    1000:{acno:1000,username:"Pranav",password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,username:"Abhinand",password:1001,balance:3000,transaction:[]},
    1002:{acno:1002,username:"Adwaith",password:1002,balance:4000,transaction:[]}
  }
  constructor(private http:HttpClient) {
      // this.getDetails();
   }

  saveDetails(){
    //database
    if(this.userDetails){
      localStorage.setItem('Database',JSON.stringify(this.userDetails))
    }

     //currentUser
     if(this.userDetails){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }

     //currentAcno
     if(this.userDetails){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }

  // getDetails(){
  //   //database
  //   if(localStorage.getItem('Database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('Database')||'')
  //   }
    
  //   //currentAcno
  //   if(localStorage.getItem('currentAcno')){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')
  //   }

  //   //currentUser
  //   if(localStorage.getItem('currentUser')){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'')
  //   }
  // }


  reg(acno:any,username:any,password:any){
    const body={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register',body)



    // var userDetails=this.userDetails;
    // if(acno in this.userDetails){
    //   return false;
    // }
    // else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   this.saveDetails();
    //   return true;
    // }
  }


  Login(acno:any,password:any){
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',body)
    // var userDetails=this.userDetails;
    // if(acno in this.userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     this.currentUser=userDetails[acno]['username'];
    //     this.currentAcno=acno;
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     alert('Password incorrect')
    //     return false;
    //   }
    // }
    // else{
    //   alert('User not found')

    //   return false;
    // }
  }

  getToken(){
    //fetch the token from localstorage
    const token = JSON.parse(localStorage.getItem('token')||'')
    //generate header
    let headers = new HttpHeaders()
    //append token inside the header
    if(token){
      options.headers=headers.append('x-access-token',token);
    }
    return options
  }

//deposit call

  deposit(acno:any,password:any,amt:any){
    const body={
      acno,
      password,
      amount:amt
    }
    return this.http.post('http://localhost:3000/deposit',body,this.getToken())

    // var amount=parseInt(amt)
    // let userDetails=this.userDetails;
    // if(acno in this.userDetails){
    //   if(pswd==this.userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       type:'Credit',
    //       amount
    //     })
    //     this.saveDetails();
    //     return userDetails[acno]['balance']
    //   }
    //   else{
    //     alert("incorrect password")
    //     return false;
    //   }
    // }
    // else{
    //   alert("invalid acc no.")
    //   return false;
    // }
  }

  withdraw(acno:any,password:any,amt:any){
    const body={
      acno,
      password,
      amount:amt
    }
    return this.http.post('http://localhost:3000/withdraw',body,this.getToken())

    // var amount=parseInt(amt)
    // let userDetails=this.userDetails;
    // if(acno in this.userDetails){
    //   if(password==this.userDetails[acno]['password']){
    //     if(userDetails[acno]['balance']>amount){
    //       userDetails[acno]['balance']-=amount;
    //       userDetails[acno]['transaction'].push({
    //         type:'Debit',
    //         amount
    //       })
    //       this.saveDetails();
    //       return userDetails[acno]['balance']
    //     }
    //   }
    //   else{
    //     alert("incorrect password")
    //     return false;
    //   }
    // }
    // else{
    //   alert("invalid acc no.")
    //   return false;
    // }
  }

  getTransaction(acno:any){
    const body={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',body,this.getToken())
    // this.saveDetails();
    // return this.userDetails[acno]['transaction']
  }

  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }
}
