import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

/*
  Generated class for the ServiciosAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosAuthProvider {

  constructor(private auth: AngularFireAuth) {
    
  }

  login (email:string,pass:string) {
    return this.auth.auth.signInWithEmailAndPassword(email,pass);
  }

  logOut() {
    this.auth.auth.signOut();
    //this.logoutFromDatabase();
}



}
