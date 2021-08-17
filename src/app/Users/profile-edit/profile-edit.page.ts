/* eslint-disable object-shorthand */
/* eslint-disable quote-props */

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  userId: string;
  name: string;
  email: string;
  phone: string;
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user=>{
      this.userId = user.userId;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
    });
  }

  async updateProfile(){
    const loading = await this.loadingCtrl.create({
      message: 'Modification...',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afs.collection('user').doc(this.userId).set({
      'userName': this.name,
      'userEmail': this.email,
      'userPhone': this.phone,
      'editAt': Date.now()
    },{merge: true}).then(()=>{
      this.toast('Modification effectuer avec success', 'success');
      this.router.navigate(['/profile']);
      loading.dismiss();
    }).catch(err=>{
      loading.dismiss();
      this.toast(err.message, 'danger');
    });
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
