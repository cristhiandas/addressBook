import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElement, getElementText } from 'src/app/utils/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    setContact(1, 'Joan', 'D\'arc', '07111111111');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the contacts with their index', () => {
    expect(getElement(nativeElement, 'contact 1 section')).toBeTruthy();
    expect(getElementText(nativeElement, 'contact 1 name')).toBe("Joan");
    expect(getElementText(nativeElement, 'contact 1 surname')).toBe("D'arc");
    expect(getElementText(nativeElement, 'contact 1 phone number')).toBe("07111111111");
  });

  function setContact(index: number, name: string, surname: string, phoneNumber: string) {
    component.contactName = name;
    component.contactSurname = surname;
    component.contactPhoneNumber = phoneNumber;
    component.index = index;
  }
});
