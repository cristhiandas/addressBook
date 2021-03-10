import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  @Input() contact: any;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
