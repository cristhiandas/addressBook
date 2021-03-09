import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElement, getElementText } from 'src/app/utils/testing';
import { ContactComponent } from '../contact/contact.component';
import { HeaderComponent } from '../header/header.component';

import { AddressBookComponent } from './address-book.component';

describe('AddressBookComponent', () => {
  let component: AddressBookComponent;
  let fixture: ComponentFixture<AddressBookComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressBookComponent, HeaderComponent, ContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header', () => {
    expect(getElementText(nativeElement,'address book heading text')).toBe("A-Book");
    expect(getElementText(nativeElement,'address book heading sub text')).toBe("It is not a book, is your Address Book");
  });

  it('should have multiple contacts', () => {
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
  });
});
