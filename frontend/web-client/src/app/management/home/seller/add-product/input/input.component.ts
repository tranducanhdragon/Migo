import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

export interface AdComponent {
  data: any;
}


@Component({
  template: `
  <br>
  <div class="card">
    
    <div class="card-body" style=" margin: 20px;">
      <h2 >Thông tin chi tiết</h2>
      <br>
      
      <div class="row" style="margin: 40px;">
         <ng-container  *ngFor="let detail of itemView">
          <div class="col-sm-6">
            <div class="row">
               <div class="col-3">{{detail.property.name}} : </div>
               <div class="col-8">
                 <div class="p-inputgroup" *ngIf="detail.property.inputType === 1" >
                   <input type="text" pInputText placeholder="Nhập vào">  
                 </div>
                </div>
            </div>
            <br>
          </div>
         </ng-container>
                
      </div>
      <br>       
     
    </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HeroJobAdComponent implements OnInit  {
 
  @Input() itemView: any;

  ngOnInit(): void {
    console.log('dynamic', this.itemView);
  }
  selectedCity1: any;
}

