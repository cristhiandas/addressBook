import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  @Input() contactName: string;
  @Input() contactSurname: string;
  @Input() contactPhoneNumber: string;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
