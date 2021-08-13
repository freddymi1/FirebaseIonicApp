import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(
    private ppCtrl: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {}

  onClick1(){
    this.ppCtrl.dismiss();
    this.router.navigate(['/profile']);
  }

  onClick2(){
    this.ppCtrl.dismiss();
    this.router.navigate(['/login']);
  }

}
