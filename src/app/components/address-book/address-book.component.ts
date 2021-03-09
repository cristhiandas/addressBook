import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.sass']
})
export class AddressBookComponent implements OnInit {
  contactList: Contact[];
  constructor() { }

  ngOnInit(): void {
    this.contactList = new Array();
    let firstContact = new Contact();
    firstContact.name = 'Rodrigo';
    firstContact.surname = 'Diaz De Vivar';
    firstContact.phoneNumber = '07000000000';
    this.contactList.push(firstContact);
    let secondContact = new Contact();
    secondContact.name = 'Marco';
    secondContact.surname = 'Polo';
    secondContact.phoneNumber = '07222222222';
    this.contactList.push(secondContact);
  }

}
