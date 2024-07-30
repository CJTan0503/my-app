import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  templateUrl: './addItem.page.html',
  styleUrls: ['./addItem.page.scss'],
})
export class AddItemPage implements OnInit {
  item: any = {
    name: '',
    type: '',
    description: '',
    location: '',
    time: '',
    recorder: '',
    photo: ''
  };
  photoFile: File | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // No need for generateItemId() anymore
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.photoFile = event.target.files[0];
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.item.name);
    formData.append('type', this.item.type);
    formData.append('description', this.item.description);
    formData.append('location', this.item.location);
    formData.append('time', this.item.time);
    formData.append('recorder', this.item.recorder);
    if (this.photoFile) {
      formData.append('photo', this.photoFile, this.photoFile.name);
    }
  
    this.http.post('http://localhost/server/add-item.php', formData)
      .subscribe(
        (response: any) => {
          console.log('Item added successfully:', response);
          this.router.navigate(['/home'], { queryParams: { refresh: true } });
        },
        (error) => {
          console.error('Error adding item:', error);
        }
      );
  }

  goToHomePage() {
    this.router.navigate(['/home']); // Adjust the path if needed
  }
}
