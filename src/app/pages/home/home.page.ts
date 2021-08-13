import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private ppverCtrl: PopoverController
  ) {}

  async lanchPopover(events){
    const popover = await this.ppverCtrl.create({
      component: PopoverComponent,
      event: events,
      mode: 'ios',
      backdropDismiss: true,
    });
    await popover.present();

    // const {data} = await popover.onDidDismiss();
  }

}
