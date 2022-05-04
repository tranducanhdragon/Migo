import { Component, OnInit } from '@angular/core';
import { Community } from 'src/model/community/Community';
import { appModuleAnimation } from 'src/route-animation/animation';
import { CommunityService } from 'src/service/community/community.service';

@Component({
  selector: 'app-community-booking',
  templateUrl: './community-booking.component.html',
  styleUrls: ['./community-booking.component.scss'],
  animations: [appModuleAnimation()]
})
export class CommunityBookingComponent implements OnInit {
  communities:Community[]=[];
  constructor(private communityService:CommunityService) { }

  ngOnInit(): void {
    this.getAllCommunities();
  }
  getAllCommunities(){
    this.communityService.getAllData('/api/Community/getall').subscribe(
      (res:any) => {
        if(res && res.success){
          this.communities = res.data;
        }
      }
    )
  }
}
