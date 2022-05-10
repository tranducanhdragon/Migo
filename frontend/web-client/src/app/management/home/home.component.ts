import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { TourService } from 'src/service/community/community.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("carousel", { static: true }) carousel: NgbCarousel | any;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  images = ["/assets/image/home/slide2.png", "assets/image/home/slide2.png"];

  menus = [
    {
      title:'Food & Drinks', 
      image:'/assets/image/home/story-bar1.png', 
      isActive:true,
      width:'102px'
    },
    {
      title:'City & Culture', 
      image:'/assets/image/home/story-bar2.png', 
      isActive:false,
      width:'100px'
    },
    {
      title:'Gateway & Resort', 
      image:'/assets/image/home/story-bar3.png', 
      isActive:false,
      width:'150px'
    },
    {
      title:'Nature & Adventure', 
      image:'/assets/image/home/story-bar4.png', 
      isActive:false,
      width:'160px'
    }
  ]

  intros = [
    { 
      title:'Topas Ecolodge - Service and comfort in the clouds', 
      image:'/assets/image/home/intro1.png', 
      location:'Phú Quốc, Việt Nam'
    },
    {
      title:'Topas Ecolodge - Service and comfort in the clouds', 
      image:'/assets/image/home/intro2.png', 
      location:'Phú Quốc, Việt Nam'},
    {
      title:'Experience travelling 4 days 3 nights in Quang Ngai pearl island', 
      image:'/assets/image/home/intro3.png', 
      location:'Quảng Nam, Việt Nam'
    },
  ]

  constructor(private tourService: TourService){
    
  }

  ngOnInit(): void {
    this.getAllTours()
    this.getAllEvents()
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
  tours: any
  getAllTours() {
    this.tourService.getAllData('/api/Tour/getalltour').subscribe(
      (res: any) => {
        if (res.success) {
          console.log('tour', res.data);
          this.tours = res.data;
        }
      }
    );
  }

  events: any
  getAllEvents() {
    this.tourService.getAllData('/api/Tour/getallevent').subscribe(
      (res: any) => {
        if (res.success) {
          console.log('events', res.data);
          this.events = res.data;
        }
      }
    );
  }
  isExpandCardTour: boolean = false
  expandCardTour() {
    this.isExpandCardTour = !this.isExpandCardTour
  }
}
