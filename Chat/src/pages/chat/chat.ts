import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerProvider } from "../../providers/spinner/spinner";
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { HomePage } from "../home/home";
import { Aula4aProvider } from "../../providers/aula4a/aula4a";
import { Aula4BProvider } from "../../providers/aula4-b/aula4-b";


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  myColor = '';
  title: string = "";
  aulaTipo: string = "";
  allChats: any;
  chatsLista: any;
  showMensaje: boolean = false;
  mensaje: string = "";
  chatService: any;
  usuario:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private spinner:SpinnerProvider,
    private aula4AService: Aula4aProvider,
    private aula4B: Aula4BProvider,
    private miAuth:AngularFireAuth, ) {
      this.chatsLista= new Array();
      let spiner = this.spinner.getAllPageSpinner();
      spiner.present();
    if (navParams.data && navParams.data.nombre) {
      this.aulaTipo = navParams.data.nombre;
      if (this.aulaTipo == "4A") {
        this.myColor="aula4a";
          this.title = "PPS - 4A";
          this.aula4AService.getChat().subscribe(chats => {
            this.chatsLista=chats;
            this.chatsLista.sort(function (a,b) {
              if (a.fecha > b.fecha) {
                return 1;
              }
              if (a.fecha < b.fecha) {
                return -1;
              }
              
              return 0;
            })
            spiner.dismiss();
            console.log(this.chatsLista);
          });
      } else {
          this.title = "PPS - 4B";
          this.myColor="aula4b";
          this.aula4B.getChat().subscribe(chats => {
            this.chatsLista=chats;
            this.chatsLista.sort(function (a,b) {
              if (a.fecha > b.fecha) {
                return 1;
              }
              if (a.fecha < b.fecha) {
                return -1;
              }
              
              return 0;
            })
            spiner.dismiss();
            console.log(this.chatsLista);
          });
      }
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.usuario=this.miAuth.auth.currentUser.email;
    console.log(this.usuario);
  }

  back() {
    this.navCtrl.setRoot(HomePage);
  }

  enviarMensaje() {
    let spiner = this.spinner.getAllPageSpinner();
    spiner.present();
    var fechaAhora = new Date();
    let stringFecha = fechaAhora.toLocaleString();
    let model = {
        usuario: this.usuario, 
        mensaje: this.mensaje, fecha: stringFecha,
    }
    if (this.aulaTipo == "4A") {
        this.aula4AService.guardar(model)
            .then(response => {
                spiner.dismiss();
                this.mensaje = "";                    
            }, error => {
                spiner.dismiss();
                this.error.mostrarErrorLiteral("Error al enviar el mensaje");
            });
    } else {
        this.aula4B.guardar(model)
        .then(response => {
            spiner.dismiss();
            this.mensaje = "";                    
        }, error => {
            spiner.dismiss();
            this.error.mostrarErrorLiteral("Error al enviar el mensaje");
        });
    }
  }

  onChange(event){    
    if(this.mensaje.length > 21){
        var text = this.mensaje.slice(0, 21);
        this.mensaje = text;
    }
  }

}
