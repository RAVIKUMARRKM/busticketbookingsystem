import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bus-Booking-System';
  isLoginForm: boolean = true;
  masterService = inject(MasterService);
  loggedUserData: any;
  registerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  }

  constructor() {
    const localUser = localStorage.getItem('busUser');
    if(localUser != null) {
      this.loggedUserData = JSON.parse(localUser);
    }
  }

  openModal() {
    const modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'none';
    }
  }

  onRegister() {
    this.masterService.onRegisterUser(this.registerObj).subscribe((res: any) => {
      alert("User Registered Successfully");
      localStorage.setItem('busUser', JSON.stringify(res.data));
      this.loggedUserData = res.data;
      this.closeModal();
    }, error => {
      alert(JSON.stringify(error));
    })
  }

  onLogout() {
    localStorage.removeItem('busUser');
    this.loggedUserData = undefined;
  }
}
