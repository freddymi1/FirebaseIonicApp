/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }

  async signIn(email, password){
    const loading = await this.loadingCtrl.create({
      message: 'Authentification...',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=>{
      this.afauth.signInWithEmailAndPassword(email, password).then((data)=>{
        if(!data.user.emailVerified){
          loading.dismiss();
          this.toast('Verifier votre adresse email SVP', 'warning');
          this.afauth.signOut();
        }else{
          loading.dismiss();
          this.router.navigate(['/home']);
        }
      })
      .catch(error=>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    })
    .catch(error=>{
      loading.dismiss();
      this.toast(error.message, 'danger');
    });
  } // Fin signin

  async signOut(){
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    this.afauth.signOut().then(()=>{
      loading.dismiss();
      this.router.navigate(['/login']);
    });
  } // Fin SignOut

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
