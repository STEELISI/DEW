import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class InitUserService {

  login:boolean=false;
  constructor(protected http: HttpService,protected authService:AuthService){}
  user:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  getUser():Observable<any>{return this.user.asObservable();}
  initCurrentUser(){
  
    var fullName = this.authService.getCookie("fullName");
    var emailId = this.authService.getCookie("emailId");
    var img = this.authService.getCookie("img");
    var givenName = this.authService.getCookie("givenName");
    var lastName = this.authService.getCookie("lastName");
    var result ={
      fullName:fullName,
      emailId:emailId,
      img:img,
      givenName:givenName,
      lastName:lastName
    }
    if(fullName==undefined || fullName==null ||fullName==''
      || emailId==undefined || emailId==null || emailId==''
      || givenName==undefined || givenName==null ||givenName==''
      || lastName==undefined || lastName==null || lastName==''
      || img==undefined || img==null || img==''
      ){

    var param = {
      token:this.authService.getToken()
    }
     this.http.post('/api/v1/user/getuserinfo/',param).subscribe(data=>{
       console.log(data);
       this.authService.setCookie("emailId",data.emailId,3599);
       this.authService.setCookie("givenName",data.givenName,3599);
       this.authService.setCookie("lastName",data.lastName,3599);
       this.authService.setCookie("img",data.img,3599);
       this.authService.setCookie("fullName",data.fullName,3599);
       this.user.next(data);
     });
    }else{
        this.user.next(result);
    }

    
  }
}