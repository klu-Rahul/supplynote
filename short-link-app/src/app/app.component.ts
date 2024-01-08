import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Your App';
  username: string = '';  // Add this line to declare 'username'
  password: string = '';  // Add this line to declare 'password'

  constructor(private http: HttpClient) {}

  login() {
    // Implement your login logic here
    this.http.post('/login', { username: this.username, password: this.password }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  logout() {
    // Implement your logout logic here
    this.http.get('/logout').subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}
