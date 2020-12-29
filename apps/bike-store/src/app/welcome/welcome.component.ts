import { Component } from '@angular/core';
import { fadeSlideInOut } from '../animations';
@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [fadeSlideInOut],
})
export class WelcomeComponent {
  constructor() {}
}
