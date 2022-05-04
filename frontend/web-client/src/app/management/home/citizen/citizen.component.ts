import { Component } from '@angular/core';
import { appModuleAnimation } from 'src/route-animation/animation';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.scss'],
  animations: [appModuleAnimation()],
})
export class CitizenComponent {
}
