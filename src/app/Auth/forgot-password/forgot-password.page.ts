/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;
  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async resetPassword(){
    if(this.email){
      const loading = await this.loadingCtrl.create({
        message: 'Envoi de lien de reinitialisation de mot de passe',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afauth.sendPasswordResetEmail(this.email).then(()=>{
        loading.dismiss();
        this.toast(`Message de recuperation de compte bien envoyer a ${this.email}, verifier votre email SVP`,'success');
        this.router.navigate(['/login']);
      }).catch(err=>{
        this.toast(`Erreur de reinitialisation de votre compte ${err}`,'danger');
      });
    }else{
      this.toast(`Entrer votre email SVP`,'warning');
    }

  }

  async toast(message, status){
    const toast = await this.toastCtrl.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
