import { Component } from '@angular/core';
import { appModuleAnimation } from 'src/route-animation/animation';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  animations: [appModuleAnimation()],
})
export class CommunityComponent {
}
