import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { TourService } from 'src/service/community/community.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css', './intro.component.scss']
})
export class IntroComponent implements OnInit {
  @ViewChild("carousel", { static: true }) carousel: NgbCarousel | any;
  currentYear: number = new Date().getFullYear();
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  images = ["/assets/image/slide.png", "assets/image/slide2.png"];

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
  wid:string='1200'
  lastScrollTop = 0;

  @HostListener('window:scroll', ['$event']) onScroll(event:any) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    let widt = +this.wid
    if (st > this.lastScrollTop && widt <= 1520){
      // downscroll code
      widt += 15
    } else if(st < this.lastScrollTop && widt >= 1200) {
      // upscroll code
      widt -= 15
    }
    this.wid = widt+''
    this.lastScrollTop = (st <= 0 ? 0 : st);

  }

  scrollFn(anchor: string): void{
  	this.vps.scrollToAnchor(anchor);
  }

  ngOnInit(): void {
    this.getAllTours()
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
}
