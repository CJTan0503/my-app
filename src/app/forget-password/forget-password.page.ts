import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage {
  username: string = '';
  secretnum: number | null = null;
  newPassword: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  resetPassword() {
    if (this.secretnum === null || this.secretnum.toString().length !== 4) {
      alert('Secret number must be 4 digits.');
      return;
    }

    const resetData = { 
      username: this.username, 
      secretnum: this.secretnum,
      newPassword: this.newPassword 
    };

    this.http.post('http://localhost/server/forget-password.php', resetData)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Password reset successful');
          this.router.navigate(['/login']);
        } else {
          alert('Password reset failed: ' + response.error);
        }
      }, error => {
        console.error('An error occurred:', error);
        alert('An error occurred');
      });
  }
}
