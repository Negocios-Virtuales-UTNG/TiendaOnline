import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000";

  constructor(private http:HttpClient) {

   }

   registerUser(user: User) {
    return this.http.post(`${this.baseUrl}/users`, user);
   }

   getUserByEmail(email:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
   }
}
