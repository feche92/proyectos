import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

export interface credito {
  usuario:string,
  id:string,
  credito10:number,
  credito50:number,
  credito100:number
}

@Injectable()
export class CreditoProvider {

  constructor(private db:AngularFirestore) {

  }

  obtenerCredito() {
    return this.db.collection('credito').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as credito;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  guardarCredito(id,usuario,credito10,credito50,credito100) {
    let model= {
      "usuario":usuario,"credito10":credito10,
      "credito50":credito50,"credito100":credito100
    }
    return this.db.collection('credito').doc(id).update(model);
  }

}
