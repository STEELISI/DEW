import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpService } from "../http-service.service";
import { StateService } from "../state-service.service";

@Injectable({
  providedIn: "root",
})
export class InitUserService {
  login: boolean = false;
  constructor(
    protected http: HttpService,
    protected authService: AuthService,
    private state: StateService
  ) {}
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  getUserDetailForRegistration(id): Promise<any> {
    return new Promise((resolve, reject) => {
      var param = {
        token: id,
      };
      this.http
        .post("/api/v1/user/getgoogleuserinfo/", param)
        .subscribe((data) => {
          // console.log(data);
          resolve(data);
        });
    });
  }
  initCurrentUser() {
    var fullName = this.authService.getCookie("fullName");
    var emailId = this.authService.getCookie("emailId");
    var img = this.authService.getCookie("img");
    var givenName = this.authService.getCookie("givenName");
    var lastName = this.authService.getCookie("lastName");
    var userId = this.authService.getCookie("userId");
    var result = {
      fullName: fullName,
      emailId: emailId,
      img: img,
      givenName: givenName,
      lastName: lastName,
      userId: userId,
    };
    if (
      fullName == undefined ||
      fullName == null ||
      fullName == "" ||
      emailId == undefined ||
      emailId == null ||
      emailId == "" ||
      givenName == undefined ||
      givenName == null ||
      givenName == "" ||
      lastName == undefined ||
      lastName == null ||
      lastName == "" ||
      userId == undefined ||
      userId == null ||
      userId == "" ||
      img == undefined ||
      img == null ||
      img == ""
    ) {
      var param = {
        token: this.authService.getToken(),
      };
      this.state.enableLoader();
      this.http.post("/api/v1/user/getuserinfo/", param).subscribe((data) => {
        console.log(data);

        this.authService.setCookie("emailId", data.emailId, 3599);
        this.authService.setCookie("givenName", data.givenName, 3599);
        this.authService.setCookie("lastName", data.lastName, 3599);
        this.authService.setCookie("img", data.img, 3599);
        this.authService.setCookie("fullName", data.fullName, 3599);
        this.authService.setCookie("userId", data.userId, 3599);
        this.state.disableLoader();
        this.user.next(data);
      });
    } else {
      this.user.next(result);
    }
  }

  registerUser(params): Observable<any> {
    var t = new Subject();
    this.http.post("api/v1/user/registerUser/", params).subscribe(data=>{

      if(data.message!=undefined && data.message!=null){
        this.authService.setCookie("token",params.token, 3599);   t.next(true);
      }else{
        t.next(false);
      }
   
      this.state.disableLoader();
    });

    return t;
  }
  checkHandle(params): Observable<any> {

    var t = new Subject();
    this.state.enableLoader();
    this.http.post("api/v1/user/validateUserHandle/", params).subscribe(data=>{
      t.next(data);
      this.state.disableLoader();
    });
    return t ; 
  }
}
