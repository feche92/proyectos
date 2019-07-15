import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { PrincipalPage } from '../principal/principal'



@IonicPage()
@Component({
  selector: 'page-colores',
  templateUrl: 'colores.html',
})
export class ColoresPage {
  selectedLanguage = { abreviacion: 'ar'};
  horizontal;
    listadoColores: any = [
        {
            nombre: "Rojo",
            imagen: "assets/imgs/colores/rojo.png",
            nombreAnimal: "assets/sonidos/colores/rojo"
        },
        {
            nombre: "Rosa",
            imagen: "assets/imgs/colores/rosa.png",
            nombreAnimal: "assets/sonidos/colores/rosa"
        },      
        {
            nombre: "Amarillo",
            imagen: "assets/imgs/colores/amarillo.png",
            nombreAnimal: "assets/sonidos/colores/amarillo"
        },
        {
            nombre: "Verde",
            imagen: "assets/imgs/colores/verde.png",
            nombreAnimal: "assets/sonidos/colores/verde"
        },
        {
            nombre: "Azul",
            imagen: "assets/imgs/colores/azul.png",
            nombreAnimal: "assets/sonidos/colores/azul"
        }, 
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
    console.log('ionViewDidLoad ColoresPage');
    this.horizontal=true;
  }
  goBack() {
    this.navCtrl.setRoot(PrincipalPage)
  }

  itemSoundClick(item){
    this.audio.src = item.nombreAnimal + '_' + this.selectedLanguage.abreviacion + ".m4a";
    this.audio.pause();
    this.audio.load();
    this.audio.play();
}


}
