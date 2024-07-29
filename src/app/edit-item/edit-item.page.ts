import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  item: any = {
    id: '',
    name: '',
    type: '',
    description: '',
    location: '',
    time: '',
    recorder: '',
    photo: ''
  };
  photoFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.loadItem(itemId);
    });
  }

  loadItem(itemId: string) {
    this.http.get<any>(`http://localhost/server/get-item.php?id=${itemId}`)
      .subscribe(
        (response) => {
          this.item = response;
        },
        (error) => {
          console.error('Error loading item:', error);
        }
      );
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.photoFile = event.target.files[0];
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('id', this.item.id);
    formData.append('name', this.item.name);
    formData.append('type', this.item.type);
    formData.append('description', this.item.description);
    formData.append('location', this.item.location);
    formData.append('time', this.item.time);
    formData.append('recorder', this.item.recorder);
    if (this.photoFile) {
      formData.append('photo', this.photoFile, this.photoFile.name);
    }

    this.http.post('http://localhost/server/update-item.php', formData)
      .subscribe(
        (response) => {
          console.log('Item updated successfully:', response);
          this.router.navigate(['/home'], { queryParams: { refresh: true } });
        },
        (error) => {
          console.error('Error updating item:', error);
        }
      );
  }
}
