import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { TourService } from 'src/service/community/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css', './community.component.scss']
})
export class CommunityComponent implements OnInit {
  @ViewChild("carousel", { static: true }) carousel: NgbCarousel | any;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  images = ["/assets/image/community/slide.png", "assets/image/community/slide.png"];

 responsiveOptions:any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vps: ViewportScroller,
    private tourService:TourService)
  {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  scrollFn(anchor: string): void{
  	this.vps.scrollToAnchor(anchor);
  }

  ngOnInit(): void {
    this.getAllTours()
    this.getAllTourGuides()
  }

  tours:any
  getAllTours(){
    this.tourService.getAllData('/api/Tour/getalltour').subscribe(
      (res:any) => {
        if(res.success){
          console.log('tour', res.data);
          this.tours = res.data;
        }
      }
    );
  }
  tourGuides:any
  getAllTourGuides(){
    this.tourService.getAllData('/api/Tour/getalltourguide').subscribe(
      (res:any) => {
        if(res.success){
          console.log('tour', res.data);
          this.tourGuides = res.data;
        }
      }
    );
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
  isExpandCardTour:boolean=false
  expandCardTour(){
    this.isExpandCardTour = !this.isExpandCardTour
  }

  trendings=[
    "Events Hanoi",
    "Best restaurants Saigon",
    "Phuquoc",
    "Mở cửa du lịch",
    "Border open"
  ]
}
