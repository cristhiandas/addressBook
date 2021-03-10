import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactListResponse } from './contact-list-response';

@Injectable({
  providedIn: 'root'
})
export class DataGatheringService {
  constructor(private http: HttpClient) {}

  jsonHeaders = {
    'conten-type': 'application/json',
    'accept': 'application/json'
  }
  
  //I did it this way thinking that it could be reused in the future, since it is generic it can call to different endpoints of the same API
  async getData(path: string, headers: any): Promise<any> {
    const httpHeaders = new HttpHeaders(headers);
    //this await is to avoid finishing the function before it resolves, that way I ensure I always return the body
    //I've turned it into a promise because this should be a single call, if the architecture was based on event,
    //I would have had the service with an observable
    const response = await this.http.get(`http://127.0.0.1:8081/${path}`, {
    headers: httpHeaders,
    observe: 'response'}).toPromise();
    return response.body;
  }

  //This is assuming that there is a orchestration/persitance API data handles the data storage
  //In reallity, this is doing nothing at the moment hehe, but though it was fun to build :)
  //Finally, I am using post even though the real operation for update is PUT, 
  //I am a practical person and prefer to use post for both creation and update.
  updateData(path: string, headers: any, dataToUpdate: any) {
    const httpHeaders = new HttpHeaders(headers);
    this.http.post(`http://127.0.0.1:8081/${path}`, dataToUpdate, {
                  headers: httpHeaders,
                  observe: 'response'}).toPromise();
  }

  getContactList(): Promise<ContactListResponse> {
    return this.getData('contact-list', this.jsonHeaders);
  }

  updateContactList(contactList: any[]) {
    this.updateData('contact-list', this.jsonHeaders, contactList);
  }
}
