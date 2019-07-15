import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

export interface foto {
  fecha:string,
  foto:string,
  like:number,
  usuario:string,
  id:string
}

export interface voto {
  usuario:string,
  idFoto:string,
  id:string
}
@Injectable()
export class FotosProvider {

  constructor(private db:AngularFirestore, private miAuth:AngularFireAuth) {
 
  }

  guardarFoto(tipo, foto, like) {
    let date = new Date();
    let stringFecha = date.toLocaleString();
    let model = {
        "usuario": this.miAuth.auth.currentUser.email,
        "foto": foto, "like": like, "fecha": stringFecha
    };
    return this.db.collection(tipo).add(model);
  }

  guardarVoto(id,usuario) {
    let model = {
      "usuario":usuario,"idFoto":id
    };
    return this.db.collection('votos').add(model);
  }

  getLista(tipo:string) {
    return this.db.collection(tipo).snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as foto;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  editarFoto(tipo,data) {
    let model = {
      "usuario":data.usuario,"foto":data.foto,
      "like":data.like,"fecha":data.fecha
    };
    return this.db.collection(tipo).doc(data.id).update(model);
  }

  getVotos() {
    return this.db.collection('votos').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as voto;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

}
