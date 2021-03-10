import { TestBed } from '@angular/core/testing';
import { ContactListResponse } from './contact-list-response';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { DataGatheringService } from './data-gathering.service';
import { HttpHeaders } from '@angular/common/http';
import { Contact } from '../components/contact/contact';

describe('DataGatheringService', () => {
  let service: DataGatheringService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DataGatheringService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  const contactListResponse: ContactListResponse = {contactList: [
    {"name": "Malcom",
    "surname": "In The Middle",
    "phoneNumber": "01007007007"},
    {"name": "Justin",
    "surname": "Time",
    "phoneNumber": "01008008008"}]}

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of contacts', (done) => {
    service.getContactList().then(response => {
      const contactList = response.contactList;
      expect(contactList[0].name).toBe("Malcom");
      expect(contactList[0].surname).toBe("In The Middle");
      expect(contactList[0].phoneNumber).toBe("01007007007");
      expect(contactList[1].name).toBe("Justin");
      expect(contactList[1].surname).toBe("Time");
      expect(contactList[1].phoneNumber).toBe("01008008008");  
    });

    
    const mockRequest = httpMock.expectOne('http://127.0.0.1:8081/contact-list');
    mockRequest.flush(contactListResponse, {headers: new HttpHeaders({})})
    done();
  });

  //this test says that it has no expectations since it does not have anything comming from the promise,
  //however, if you modify the expected URL you will se it break normally :)
  it('should a store contact list', (done) => {
    service.updateContactList(buildContactList());
    
    const mockRequest = httpMock.expectOne('http://127.0.0.1:8081/contact-list');
    mockRequest.flush({headers: new HttpHeaders({}),
                      status: 200});
    done();
  });
});

function buildContactList() {
  let contactList = []
  let contact = new Contact;
  contact.name = 'Marco';
  contact.surname = 'Polo';
  contact.phoneNumber = '07222222222';
  contactList.push(contact);
  return contactList;
}