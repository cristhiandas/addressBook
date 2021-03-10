import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGatheringService } from 'src/app/services/data-gathering.service';
import { clickOnElement, getElement, getElementText, inputTextOnElement } from 'src/app/utils/testing';
import { Contact } from '../contact/contact';
import { ContactComponent } from '../contact/contact.component';
import { HeaderComponent } from '../header/header.component';

import { AddressBookComponent } from './address-book.component';

describe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let nativeElement: HTMLElement;
  let dataGatheringService: DataGatheringService;
  let getContactListSpy: jasmine.Spy;
  let updateContactListSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DataGatheringService],
      declarations: [ AddressBookComponent, HeaderComponent, ContactComponent ],
      imports:[HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    dataGatheringService = fixture.debugElement.injector.get(DataGatheringService);
    getContactListSpy = spyOn(dataGatheringService, 'getContactList');
    updateContactListSpy = spyOn(dataGatheringService, 'updateContactList');
    getContactListSpy.and.returnValue(Promise.resolve({ contactList: buildContactList()}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header', async () => {
    await fixture.whenStable();
    expect(getElementText(nativeElement,'address book heading text')).toBe("A-Book");
    expect(getElementText(nativeElement,'address book heading sub text')).toBe("It is not a book, is your Address Book");
  });

  it('should have multiple contacts', async (done) => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getElement(nativeElement, 'contact list section')).toBeTruthy();
    expect(getElement(nativeElement, 'contact 0 section')).toBeTruthy();
    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Rodrigo");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Diaz De Vivar");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07000000000");

    expect(getElement(nativeElement, 'contact list section')).toBeTruthy();
    expect(getElement(nativeElement, 'contact 1 section')).toBeTruthy();
    expect(getElementText(nativeElement, 'contact 1 name')).toBe("Marco");
    expect(getElementText(nativeElement, 'contact 1 surname')).toBe("Polo");
    expect(getElementText(nativeElement, 'contact 1 phone number')).toBe("07222222222");
    done();
  });

  it('should allow the customer to add more contacts and store it', async (done) => {
    await fixture.whenStable();
    fixture.autoDetectChanges();
    clickOnElement(nativeElement, 'add new contact button');
    
    expect(getElement(nativeElement, 'add new contact section')).toBeTruthy();

    inputTextOnElement(nativeElement, 'new contact first name', 'Yourname');
    inputTextOnElement(nativeElement, 'new contact surname', 'Goeshere');
    inputTextOnElement(nativeElement, 'new contact phone number', '01000000000');

    clickOnElement(nativeElement, 'confirm new contact button');

    expect(getElement(nativeElement, 'contact 3 section')).toBeTruthy();
    expect(getElementText(nativeElement, 'contact 3 name')).toBe("Yourname");
    expect(getElementText(nativeElement, 'contact 3 surname')).toBe("Goeshere");
    expect(getElementText(nativeElement, 'contact 3 phone number')).toBe("01000000000");

    expect(updateContactListSpy).toHaveBeenCalled();
    done();
  });

  it('should allow the customer to delete contacts', async (done) => {
    await fixture.whenStable();
    fixture.autoDetectChanges();
    clickOnElement(nativeElement, 'delete contact 0 button');
    
    expect(getElement(nativeElement, 'contact list section')).toBeTruthy();
    expect(getElement(nativeElement, 'contact 0 section')).toBeTruthy();
    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Marco");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Polo");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07222222222");

    clickOnElement(nativeElement, 'delete contact 0 button');
    clickOnElement(nativeElement, 'delete contact 0 button');
    expect(getElementText(nativeElement, 'empty list message')).toBe('You have 0 contacts :(');
    done();
  });

  it('should sort the contacts by name', async (done) => {
    await fixture.whenStable();
    fixture.autoDetectChanges();
    clickOnElement(nativeElement, 'sort by name button');

    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Marco");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Polo");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07222222222");
    done();
  });

  it('should sort the contacts by surname', async (done) => {
    await fixture.whenStable();
    fixture.autoDetectChanges();
    clickOnElement(nativeElement, 'sort by surname button');

    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Ye Fakename");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Asurname");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07111111111");
    done();
  });

  it('should filter the contacts by name and surname', async (done) => {
    await fixture.whenStable();
    fixture.autoDetectChanges();
    inputTextOnElement(nativeElement, 'filer by name', 'Y');

    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Ye Fakename");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Asurname");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07111111111");

    inputTextOnElement(nativeElement, 'filer by name', 'Mar');
    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Marco");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Polo");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07222222222");

    inputTextOnElement(nativeElement, 'filer by name', 'Ro');
    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Rodrigo");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Diaz De Vivar");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07000000000");

    inputTextOnElement(nativeElement, 'filer by name', 'Po');
    expect(getElementText(nativeElement, 'contact 0 name')).toBe("Marco");
    expect(getElementText(nativeElement, 'contact 0 surname')).toBe("Polo");
    expect(getElementText(nativeElement, 'contact 0 phone number')).toBe("07222222222");
    done();
  });
});

function buildContactList() {
  let contactList = []
  contactList.push(buildContact('Rodrigo', 'Diaz De Vivar', '07000000000'));
  contactList.push(buildContact('Marco', 'Polo', '07222222222'));
  contactList.push(buildContact('Ye Fakename', 'Asurname', '07111111111'));
  return contactList;
}

function buildContact(name: string, surname: string, phone: string) {
  let firstContact = new Contact;
  firstContact.name = name;
  firstContact.surname = surname;
  firstContact.phoneNumber = phone;
  return firstContact;
}

