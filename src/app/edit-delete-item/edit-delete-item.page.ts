import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-delete-item',
  templateUrl: './edit-delete-item.page.html',
  styleUrls: ['./edit-delete-item.page.scss'],
})
export class EditDeleteItemPage implements OnInit {
  items: any[] = [];
  searchName: string = '';
  searchCategory: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.http.get<any[]>('http://localhost/server/get-item.php') // Adjust this URL as needed
      .subscribe(
        (response) => {
          this.items = response;
        },
        (error) => {
          console.error('Error loading items:', error);
        }
      );
  }

  searchItems() {
    let url = 'http://localhost/server/get-item.php';
    if (this.searchName || this.searchCategory) {
      url += `?name=${this.searchName}&category=${this.searchCategory}`;
    }

    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.items = response;
        },
        (error) => {
          console.error('Error searching items:', error);
        }
      );
  }

  editItem(itemId: string) {
    this.router.navigate([`/edit-item/${itemId}`]);
  }

  deleteItem(itemId: string) {
    if (itemId) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.http.delete(`http://localhost/server/delete-item.php?id=${itemId}`)
          .subscribe(
            () => {
              console.log('Item deleted successfully');
              this.loadItems(); // Reload items after deletion
            },
            (error) => {
              console.error('Error deleting item:', error);
            }
          );
      }
    } else {
      console.error('No item ID provided');
    }
  }

  goToHomePage() {
    this.router.navigate(['/home']); // Adjust the path if needed
  }
}
