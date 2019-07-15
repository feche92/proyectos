import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { SpinnerProvider } from "../../providers/spinner/spinner";
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { FotosProvider } from "../../providers/fotos/fotos";
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  listaLindas;
  listaFeas;
  myChart: Chart;
  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private spinner:SpinnerProvider,
    private fotos:FotosProvider,
    private alertCtrl : AlertController) {
    this.listaLindas= new Array();
    this.listaFeas=new Array();
    let spiner = this.spinner.getAllPageSpinner();
    spiner.present();
    this.fotos.getLista('cosasLindas').subscribe(lista => {
      this.listaLindas=lista;
      console.log(this.listaLindas);
    });
    this.fotos.getLista('cosasFeas').subscribe(lista => {
      this.listaFeas=lista;
      console.log(this.listaFeas);
      spiner.dismiss();
      this.useAnotherOneWithWebpack();
      this.dataCosasFeas();
    });
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
  }

  back() {
    this.navCtrl.setRoot(PrincipalPage);
  }

  useAnotherOneWithWebpack() {
    var ctx = (<any>document.getElementById('canvas-chart')).getContext('2d');
    var data = {
      labels: [
          
      ],
      datasets: [
          {
              data: [],
              backgroundColor: [
              ]
          }]
    };
    var newLegendClickHandler = function (e, legendItem) {
      var index = legendItem[0]._index;
      console.log(legendItem);

      console.log(legendItem[0]._index);
      let urlFoto = this.listaLindas[index].foto;
      let message = "<img style='height: 100%; width: 100%;' src='" + urlFoto + "'></img>";
      let alert = this.alertCtrl.create({
      title: this.listaLindas[index].usuario,
      buttons: ['Cerrar'],
      message: message,//`<img src="urlFoto"></img>`,
      cssClass: "foto-alert"
      });
      alert.present();
    }.bind(this);
    for(let i=0;i<this.listaLindas.length;i++) {
      if(this.listaLindas[i].like>0) {
        console.log(this.listaLindas[i].usuario)
        data.labels.push(this.listaLindas[i].usuario);
        data.datasets[0].backgroundColor.push(this.getColor());
        data.datasets[0].data.push(this.listaLindas[i].like);
      }
    }
    console.log(data);
    this.myChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: data,
        options: {
          onClick: newLegendClickHandler
        }
    });
    
  }

  dataCosasFeas() {
    var ctx = (<any>document.getElementById('canvas-feas')).getContext('2d');
    var data = {
      labels: [
          
      ],
      datasets: [
          {
              label: 'Feas',
              data: [],
              backgroundColor: [
              ]
          }],
    };
    var newLegendClickHandler = function (e, legendItem) {
      var index = legendItem[0]._index;
      console.log(legendItem);

      console.log(legendItem[0]._index);
      if(legendItem[0]._index!=null) {
        let urlFoto = this.listaFeas[index].foto;
        let message = "<img style='height: 100%; width: 100%;' src='" + urlFoto + "'></img>";
        let alert = this.alertCtrl.create({
        title: this.listaFeas[index].usuario,
        buttons: ['Cerrar'],
        message: message,//`<img src="urlFoto"></img>`,
        cssClass: "foto-alert"
      });
      alert.present();
      }
      
  }.bind(this);
    for(let i=0;i<this.listaFeas.length;i++) {
      if(this.listaFeas[i].like>0) {
        data.labels.push(this.listaFeas[i].usuario);
        data.datasets[0].backgroundColor.push(this.getColor());
        data.datasets[0].data.push(this.listaFeas[i].like);
      }
    }
    console.log(data);
    this.myChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: data,
        options:{
          scales: {
            yAxes: [{
              //barPercentage: 0.5,
              //barThickness: 6,
              //maxBarThickness: 8,
              //minBarLength: 0,
              
            }],
            xAxes : [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false,
          },
          tooltips : {
            enabled: false      
          },
          elements: {
            rectangle: {
              borderSkipped: 'left',
            }
          },
          onClick: newLegendClickHandler
        }
    });
  }

  private getColor(){
    var color = "rgb("+ Math.floor(Math.random() * 255) + ","+ Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ")";
    return color;
  }

  eventClick(legendItem) {
    var index = legendItem[0]._index;
    console.log(legendItem);
      
    console.log(legendItem[0]._index);
    //console.log(RankingPage);
  }

}
