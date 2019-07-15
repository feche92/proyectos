import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

 export interface chat {
  usuario:string,
  mensaje:string,
  fecha:string,
  id:string
}

@Injectable()
export class Aula4aProvider {

  constructor(private db:AngularFirestore) {
    
  }

  getChat() {
    return this.db.collection('chatAula4A').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as chat;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  guardar(model) {
    return this.db.collection('chatAula4A').add(model);
  }

}
