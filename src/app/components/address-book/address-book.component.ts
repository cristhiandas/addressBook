import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGatheringService } from 'src/app/services/data-gathering.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.sass']
})
export class AddressBookComponent implements OnInit {
  //I know this could have been done with a for array, but I couldn't make it work to make it access in the HTML.
  //Made it like this to avoid wasting more time
  contactForm: FormGroup;
  contactListForm: FormGroup;
  newContactMode: boolean = false;
  filteredValues: any;
  filterMode: boolean;
  
  constructor(private dataGatheringService: DataGatheringService) { }

  ngOnInit(): void {
    this.contactListForm = this.buildContactListForm();
    this.dataGatheringService.getContactList().then(responseBody => {
      responseBody.contactList.forEach(contact => {
        this.getContactListArray().push(this.buildForm(contact.name, contact.surname, contact.phoneNumber));
      });
    })
  }
  getContactListArray() {
    return this.contactListForm.get('contactList') as FormArray;
  }

  buildContactListForm() {
    return new FormGroup({
      contactList: new FormArray([])
    });
  }

  buildForm(name:string, lastname:string, phoneNumber:string): FormGroup {
      return new FormGroup({
        name: new FormControl(name, Validators.required),
        surname: new FormControl(lastname, Validators.required),
        phoneNumber: new FormControl(phoneNumber, Validators.pattern('^(0[0-9]{10})$'))
      });
  }

  setNewContactMode() {
    this.contactForm = this.buildForm('', '', '');
    this.newContactMode = true;
  }

  //I get it this way instead of passing the function because this way it does not have
  //syncronization issues
  //I could also subscribe to the value change, but it seems like an overkill
  getNewContactMode() {
    return this.newContactMode;
  }

  sortByName() {
    this.getContactListArray().value.sort((contactA, contactB) => contactA.name.localeCompare(contactB.name));
  }

  sortBySurname() {
    this.getContactListArray().value.sort((contactA, contactB) => contactA.surname.localeCompare(contactB.surname));
  }

  updateNewContact() {
    let contactListArray = this.getContactListArray();
    contactListArray.push(this.contactForm);
    this.dataGatheringService.updateContactList(contactListArray.value);
    this.newContactMode = false;
  }

  filterNames(event){
    if(event.target.value) {
      this.filteredValues = this.getContactListArray().value
      .filter(contact => contact.name.toLowerCase().startsWith(event.target.value.toLowerCase()));
      this.filterMode = true;
    } else {
      this.filterMode = false;
    }
  }

  deleteContact(index) {
    this.getContactListArray().removeAt(index);
  }
}