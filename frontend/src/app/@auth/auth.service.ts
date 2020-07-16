import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service.service';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
 
 
  constructor(protected http:HttpService){}

  login:boolean=false;
  token:String;
  expiry:Number;

  startSession(id): Observable<any> {
    
      var param = {
        token:id
      }
     return this.http.post('/api/v1/p/user/validateUser/',param,{withCredential:true});

  }
  authenticate(arg0: string):Observable<any> {
   // //console.log(window.location.hash.substr(1));
    var params = {}
    window.location.hash.substr(1).split('&').map(hk => { 
      let temp = hk.split('='); 
        params[temp[0]] = temp[1] 
    });
   // //console.log(params);
  
    
    this.token = params["access_token"];
    this.expiry = Number(params["expires_in"]);
    return this.startSession(params["access_token"]);
  }

  enableAuthentication(){
    this.isAuthenticate.next(true);
    this.setCookie("token",this.token,this.expiry);
  }
  getToken() {
    return this.token;
  }
  onAuthenticationChange():Observable<any> {
    throw new Error("Method not implemented.");
  }
    isAuthenticate:BehaviorSubject<boolean> = new BehaviorSubject(false);

  isAuthenticated():Observable<boolean>{
   return  of(this.checkAuthentication())
  }
  checkAuthentication(): boolean {
    //console.log("check");
    if(!this.isAuthenticate.value){
      var token = this.getCookie("token");
      //console.log(token);
       if(token!=""){
         this.isAuthenticate.next(true);
         this.token =token;
         return true;
       }else{
         return false;
       }
    }else{
      return true;
  }
}

   setCookie(key, value, seconds) {
     //console.log(key+"::"+value);
    var date = new Date();
    date.setTime(date.getTime() + (seconds *1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  }

  getCookie(key) {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  loginWithGoogle(){
    //  var redirect = 'http://dew.isi.edu/auth/googleoauth2callback';
    // var redirect = 'http://localhost:4200/auth/googleoauth2callback';
    var redirect = environment.authRedirectUrl
    var client_id = '789341153375-qeeo9deuouq9ea3ke4ou0ipqr2gjd0vr.apps.googleusercontent.com';
    var url = [];
  //  var apuUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    var apiurl = "https://accounts.google.com/o/oauth2/auth";
    url.push(apiurl);
    url.push("?redirect_uri="+encodeURIComponent( redirect));
    url.push("&response_type=token");
    url.push("&scope=email%20profile%20openid%20"+encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile")+"&fetch_basic_profile=true");
    url.push("&client_id="+client_id);
   // url.push("&ss_domain=https%3A%2F%2Fdevelopers-dot-devsite-v2-prod.appspot.com&gsiwebsdk=2");
    //console.log(url.join(""));
    window.location.href = url.join("");
  }

  authorizeGoogleDrive(experiment_id){
    const scopes = [
      "email",
      "profile",
      "openid",
      encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile"),
      encodeURIComponent("https://www.googleapis.com/auth/drive.file")
    ]
    var apiurl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.googleClientId}&response_type=token&state=${experiment_id}&scope=${scopes.join("%20")}&redirect_uri=${encodeURIComponent(environment.googleDriveRedirectUrl)}&include_granted_scopes=true`
    var popupWindow = window.open(apiurl, 'authorize')
    var prom = (resolve) => {  
      if(popupWindow.closed)
      {
        resolve();
      } else {
        setTimeout(_ => prom(resolve), 1000)
      }
    }
    return new Promise(prom)
  }

  logout() {
   //console.log("logout");
   this.isAuthenticate.next(false);
   this.login = false;
   this.token="";
   this.setCookie("token","",0);
   this.setCookie("emailId","",0);
   this.setCookie("fullName","",0);
   this.setCookie("givenName","",0);
   this.setCookie("lastName","",0);
   this.setCookie("img","",0);
   this.setCookie("userHandle","",0);
   

  }
}