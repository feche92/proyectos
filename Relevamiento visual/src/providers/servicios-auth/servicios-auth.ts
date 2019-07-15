import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';


@Injectable()
export class ServiciosAuthProvider {

  constructor(private auth: AngularFireAuth) {
  }
  
  login (email:string,pass:string) {
    return this.auth.auth.signInWithEmailAndPassword(email,pass);
  }

  logOut(){
    this.auth.auth.signOut();
  }

}
