import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from '../http-service.service';
import { StateService } from '../pages/hlbparser/common/state-service.service';
@Injectable({
  providedIn: 'root'
})
export class InitUserService {

  login:boolean=false;
  constructor(protected http: HttpService,protected authService:AuthService,private state:StateService){}
  user:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  getUser():Observable<any>{return this.user.asObservable();}
  initCurrentUser(){
  
    var fullName = this.authService.getCookie("fullName");
    var emailId = this.authService.getCookie("emailId");
    var img = this.authService.getCookie("img");
    var givenName = this.authService.getCookie("givenName");
    var lastName = this.authService.getCookie("lastName");
    var userId = this.authService.getCookie("userId");
    var result ={
      fullName:fullName,
      emailId:emailId,
      img:img,
      givenName:givenName,
      lastName:lastName,
      userId:userId
    }
    if(fullName==undefined || fullName==null ||fullName==''
      || emailId==undefined || emailId==null || emailId==''
      || givenName==undefined || givenName==null ||givenName==''
      || lastName==undefined || lastName==null || lastName==''
      || userId==undefined || userId==null || userId==''
      || img==undefined || img==null || img==''
      ){

    var param = {
      token:this.authService.getToken()
    }
    this.state.enableLoader();
     this.http.post('/api/v1/user/getuserinfo/',param).subscribe(data=>{
       console.log(data);
       
       this.authService.setCookie("emailId",data.emailId,3599);
       this.authService.setCookie("givenName",data.givenName,3599);
       this.authService.setCookie("lastName",data.lastName,3599);
       this.authService.setCookie("img",data.img,3599);
       this.authService.setCookie("fullName",data.fullName,3599);
       this.authService.setCookie("userId",data.userId,3599);

       this.user.next(data);
       this.state.disableLoader();
     });
    }else{
        this.user.next(result);
    }

    
  }
}