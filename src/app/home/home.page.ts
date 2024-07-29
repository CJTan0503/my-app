import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var moment: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  items: any[] = [];
  itemsByMonth: { [key: string]: any[] } = {};
  loading: boolean = true;
  searchCategory: string = ''; // Search category by item name
  selectedCategory: string = ''; // Selected category for filtering
  filteredItemsByMonth: { [key: string]: any[] } = {};
  currentTime: string = '';
  weather: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUsername();
    this.updateCurrentTime();
    this.getLocationAndWeather();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshItemsIfNecessary(event.url);
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        this.refreshItems();
      }
    });
  }

  getUsername() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.http.get<any>(`http://localhost/server/get-user.php?user_id=${userId}`)
        .subscribe(
          (response: any) => {
            this.username = response.username || '';
            this.getItems(parseInt(userId, 10));
          },
          (error) => {
            console.error('Error fetching username:', error);
          }
        );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  getItems(userId: number) {
    this.loading = true; // Set loading indicator
    this.http.get<any[]>(`http://localhost/server/get-item.php?user_id=${userId}`)
      .subscribe(
        (response: any[]) => {
          this.items = response;
          this.itemsByMonth = this.groupItemsByMonth(response);
          this.filteredItemsByMonth = this.itemsByMonth;
          this.loading = false; // Update loading indicator
        },
        (error) => {
          console.error('Error fetching items:', error);
          this.loading = false; // Update loading indicator even on error
        }
      );
  }

  groupItemsByMonth(items: any[]): { [key: string]: any[] } {
    const grouped: { [key: string]: any[] } = {};
    items.forEach(item => {
      const date = new Date(item.time);
      const month = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(item);
    });
    return grouped;
  }

  getTotalItems(items: any[]): number {
    return items.length;
  }

  refreshItemsIfNecessary(url: string) {
    if (url.includes('/add-item') || url.includes('/edit-delete-item')) {
      this.refreshItems();
    }
  }

  filterItems() {
    const searchCategoryLower = this.searchCategory.toLowerCase();
    this.filteredItemsByMonth = {};
    Object.keys(this.itemsByMonth).forEach(month => {
      const filteredItems = this.itemsByMonth[month].filter(item =>
        item.name.toLowerCase().includes(searchCategoryLower) &&
        (this.selectedCategory ? item.type === this.selectedCategory : true)
      );
      if (filteredItems.length > 0) {
        this.filteredItemsByMonth[month] = filteredItems;
      }
    });
  }

  addItem() {
    this.router.navigate(['/addItem']);
  }

  editDeleteItem() {
    this.router.navigate(['/edit-delete-item']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  refreshItems() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getItems(parseInt(userId, 10));
    }
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  updateCurrentTime() {
    this.currentTime = moment().format('LLLL');
  }

  getLocationAndWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getWeather(lat: number, lon: number) {
    const apiKey = 'be1777d48d0c0bd17ae791468b7e1e80';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    this.http.get(url)
      .subscribe(
        (data: any) => {
          console.log('Weather API response:', data); // Log the API response
          if (data && data.main) {
            this.weather = {
              temperature: data.main.temp,
              condition: data.weather[0].description
            };
          } else {
            this.weather = null;
          }
        },
        (error) => {
          console.error('Error fetching weather:', error);
          this.weather = null;
        }
      );
  }
}
