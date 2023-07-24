import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  registerUser(user: Array<any>) {
    return this.http.post(
      this.baseUrl,
      {
        firstName: user[0],
        lastName: user[1],
        email: user[2],
        number: user[3],
        gender: user[4],
        pwd: user[5],
        rpwd: user[6],
      },
      {
        responseType: 'text',
      }
    );
  }

  getDetails() {
    return this.http.get(this.baseUrl);
  }

  // getById(){

  // }

  removeDetails(code: any) {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }

  updateDetails(user: Array<any>, id: any) {
    return this.http.put(
      `${this.baseUrl}/update/${id}`,
      {
        firstName: user[0],
        lastName: user[1],
        email: user[2],
        number: user[3],
        gender: user[4],
        pwd: user[5],
        rpwd: user[6],
      },
      {
        responseType: 'text',
      }
    );
  }
}
