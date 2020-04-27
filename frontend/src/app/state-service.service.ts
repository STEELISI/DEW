import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class StateService {
  
  
  loaderSwitch: BehaviorSubject<boolean> = new BehaviorSubject(false);
  actors: BehaviorSubject<any> = new BehaviorSubject(null);
  behavior: BehaviorSubject<any> = new BehaviorSubject(null);
  constraints: BehaviorSubject<any> = new BehaviorSubject(null);
  bindings: BehaviorSubject<any> = new BehaviorSubject(null);
  experimentName: BehaviorSubject<String> = new BehaviorSubject("");
  experimentDescription: BehaviorSubject<String> = new BehaviorSubject("");
  tokenList: BehaviorSubject<any> = new BehaviorSubject("");
  userDetails: any;
  currentBehaviorWord: String;
  currentConstraintWord: String;
  tokenLevel: String;
  getTokenLevel():String {return this.tokenLevel;}
  setTokenLevel(tokenLevel) {this.tokenLevel=tokenLevel;}
  setTokenList(data: any) {
    this.tokenList.next(data);
  }
  getTokenList():Observable<any> {
    return this.tokenList.asObservable();
  }
  enableLoader(): void {
    this.loaderSwitch.next(true);
  }
  disableLoader(): void {
    this.loaderSwitch.next(false);
  }
  isLoaderEnabled(): Observable<boolean> {
    return this.loaderSwitch.asObservable();
  }

  getExperimentName(): Observable<any> {
    return this.experimentName.asObservable();
  }
  getExperimentDescription(): Observable<any> {
    return this.experimentDescription.asObservable();
  }
  getUserDetails(): any {
    return this.userDetails;
  }
  setUserDetails(user) {
    this.userDetails = user;
  }
  getBindings(): Observable<any> {
    return this.bindings.asObservable();
  }
  getActors(): Observable<any> {
    return this.actors.asObservable();
  }
  setCurrentBehaviorWord(word: any) {
    this.currentBehaviorWord = word;
  }
  getCurrentBehaviorWord(): String {
    return this.currentBehaviorWord;
  }
  setCurrentConstraintWord(word: any) {
    this.currentConstraintWord = word;
  }
  getCurrentConstraintWord(): String {
    return this.currentConstraintWord;
  }
  getBehavior(): Observable<any> {
    return this.behavior.asObservable();
  }
  getConstraints(): Observable<any> {
    return this.constraints.asObservable();
  }
  setBindings(Bindings: any) {
    this.bindings.next(Bindings);
  }
  setActors(data: any) {
    this.actors.next(data);
  }
  setBehavior(data: any) {
    this.behavior.next(data);
  }
  setConstraints(data: any) {
    this.constraints.next(data);
  }
  setExperimentName(data: String) {
    this.experimentName.next(data);
  }
  setExperimentDescription(data: String) {
    this.experimentDescription.next(data);
  }
}
