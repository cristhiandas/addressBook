import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Input() dataQa: string;
  @Input() primaryText: string;
  @Input() subText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
