import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the SpinnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpinnerProvider {

  constructor(public loadingCtrl: LoadingController) {
  }

  getAllPageSpinner(){
    let loader = this.loadingCtrl.create({
        spinner:'circles',
        showBackdrop:false,
        cssClass: 'small-spinner'
      });
    return loader;
}

getBigSpinner(){
    let loader = this.loadingCtrl.create({
        spinner:'circles',
        showBackdrop:false,
        cssClass: 'big-spinner'
      });
    return loader;
}

}
