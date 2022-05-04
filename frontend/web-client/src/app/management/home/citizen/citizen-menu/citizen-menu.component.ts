import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from 'src/route-animation/animation';

@Component({
  selector: 'app-citizen-menu',
  templateUrl: './citizen-menu.component.html',
  styleUrls: ['./citizen-menu.component.scss'],
  animations: [appModuleAnimation()]
})
export class CitizenMenuComponent implements OnInit {

  constructor()
  { }

  ngOnInit(): void {}

}
