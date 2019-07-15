import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { PrincipalPage } from '../principal/principal'


@IonicPage()
@Component({
  selector: 'page-animales',
  templateUrl: 'animales.html',
})
export class AnimalesPage {
  selectedLanguage = { abreviacion: 'ar'};
  horizontal;
    listadoAnimales: any = [
        {
            nombre: "Vaca",
            imagen: "assets/imgs/animales/cow.png",
            sonidoAnimal: "assets/sonidos/animales/vaca.mp3",
            nombreAnimal: "assets/sonidos/animales/vaca"
        },
        {
            nombre: "Elefante",
            imagen: "assets/imgs/animales/elephant.png",
            sonidoAnimal: "assets/sonidos/animales/elefante.mp3",
            nombreAnimal: "assets/sonidos/animales/elefante"
        },
        {
            nombre: "León",
            imagen: "assets/imgs/animales/lion.png",
            sonidoAnimal: "assets/sonidos/animales/leon.mp3",
            nombreAnimal: "assets/sonidos/animales/leon"
        },
        {
            nombre: "Mono",
            imagen: "assets/imgs/animales/monkey.png",
            sonidoAnimal: "assets/sonidos/animales/mono.mp3",
            nombreAnimal: "assets/sonidos/animales/mono"
        },       
        {
            nombre: "Ballena",
            imagen: "assets/imgs/animales/ballena.png",
            sonidoAnimal: "assets/sonidos/animales/ballena.mp3",
            nombreAnimal: "assets/sonidos/animales/ballena"
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
    console.log('ionViewDidLoad AnimalesPage');
    this.horizontal=true;
  }

  goBack() {
    this.navCtrl.setRoot(PrincipalPage)
  }

  animalNameClick(animal) {
    this.audio.src = animal.nombreAnimal + '_' + this.selectedLanguage.abreviacion + ".m4a";
    this.audio.pause();
    this.audio.load();
    this.audio.play();
  }

  animalSoundClick(animal) {
    this.audio.src = animal.sonidoAnimal;
    this.audio.pause();
    this.audio.load();
    this.audio.play();
  }

}
