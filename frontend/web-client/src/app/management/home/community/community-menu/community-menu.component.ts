import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from 'src/route-animation/animation';
import { CommunityService } from 'src/service/community/community.service';

@Component({
  selector: 'app-community-menu',
  templateUrl: './community-menu.component.html',
  styleUrls: ['./community-menu.component.scss'],
  animations: [appModuleAnimation()]
})
export class CommunityMenuComponent implements OnInit {

  constructor(
    private communityService:CommunityService)
  { }

  ngOnInit(): void {
  }
}
