import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(
    private ppCtrl: PopoverController,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {}

  onClick1(){
    this.ppCtrl.dismiss();
    this.router.navigate(['/profile']);
  }

  logOut(){
    this.auth.signOut();
    this.ppCtrl.dismiss();
  }

}
