import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { NativeAudio } from '@ionic-native/native-audio';
import { ScreenOrientation } from "@ionic-native/screen-orientation";


@IonicPage()
@Component({
  selector: 'page-numeros',
  templateUrl: 'numeros.html',
})
export class NumerosPage {
  selectedLanguage = { abreviacion: 'ar' };
  horizontal;
    listadoNumeros: any = [
        {
            nombre: "Uno",
            imagen: "assets/imgs/numeros/uno.png",
            nombreAnimal: "assets/sonidos/numeros/uno"
        },
        {
            nombre: "Dos",
            imagen: "assets/imgs/numeros/dos.png",
            nombreAnimal: "assets/sonidos/numeros/dos"
        },
        {
            nombre: "Tres",
            imagen: "assets/imgs/numeros/tres.png",
            nombreAnimal: "assets/sonidos/numeros/tres"
        },
        {
            nombre: "Cuatro",
            imagen: "assets/imgs/numeros/cuatro.png",
            nombreAnimal: "assets/sonidos/numeros/cuatro"
        },
        {
            nombre: "Cinco",
            imagen: "assets/imgs/numeros/cinco.png",
            nombreAnimal: "assets/sonidos/numeros/cinco"
        }
    ]
    audio = new Audio();
    contador: any = "0";
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeAudio: NativeAudio,
    private screenOrientation: ScreenOrientation) {
      this.screenOrientation.onChange().subscribe(() => {
        if (this.screenOrientation.type == "landscape-primary") {
          this.horizontal=false;
        }
        else {
          this.horizontal=true;
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NumerosPage');
    this.horizontal=true;
  }
  goBack() {
    this.navCtrl.setRoot(PrincipalPage);
  }

  itemSoundClick(item) {
    this.audio.src = item.nombreAnimal + '_' + this.selectedLanguage.abreviacion + ".m4a";
    this.audio.pause();
    this.audio.load();
    this.audio.play();
}

}
