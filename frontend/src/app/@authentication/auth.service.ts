import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    authenticated:BehaviorSubject<boolean> = new BehaviorSubject(false);

  isAuthenticated():boolean{
   return false;
  }
}