import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LanguagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
})
export class LanguagesPage {
  @Input('select-language')
  selectedLanguage: any;

  languages: any = {
    'ar': {
      espanol: "español",
      portugues: "portugués",
      ingles: "inglés",
      aleman: "alemán"
    },
    'en': {
      espanol: "spanish",
      portugues: "portuguese",
      ingles: "english",
      aleman: "german"
    },
    'ger': {
      espanol: "spanisch",
      portugues: "portugiesisch",
      ingles: "englisch",
      aleman: "deutsch"
    },
    'por': {
      espanol: "espanhol",
      portugues: "portugues",
      ingles: "inglês",
      aleman: "alemão"
    },
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagesPage');
  }

  flagClick(languaje) {
    this.selectedLanguage.abreviacion = languaje;
  }

}
