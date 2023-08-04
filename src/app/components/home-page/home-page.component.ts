import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { GeolocationService } from 'src/app/service/geolocation.service';
import { WeatherSvcService } from 'src/app/service/weather-svc.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  title = 'WeatherApp';
  searchQuery: string = '';
  weatherData: any;
  loggedInUserName: string = '';
  addToFavoritesError: string = '';

  constructor(
    // service for the location
    private geoservice: GeolocationService,
    // weather service
    private weatherService: WeatherSvcService,
    // service for the login
    private authService: AuthService,

    private router: Router
  ) {
    this.loggedInUserName = this.authService.getLoggedInUserName();
  }

  ngOnInit() {}

  searchLocation() {
    if (this.searchQuery.trim() !== '') {
      // function for taking the lat and lon from the searchabar in base of the city
      this.geoservice.getGeoLocation(this.searchQuery).subscribe({
        next: (data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            // function for getting the weather in base of the lat and lon from the search
            this.weatherService.getWeatherData(lat, lon).subscribe({
              next: (weatherData) => {
                this.weatherData = weatherData;
                console.log(this.weatherData);
              },
              error: (error) => {
                console.error('Error fetching weather data:', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Error fetching geolocation data:', error);
        }
      });
    }
  }

  roundTemperature(temp: number): number {
    return Math.floor(temp);
  }

// function for getting the icons
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

// route to the login page
  toLoginPage() {
    this.router.navigate(['login']);
  }

// function for adding a location to the fav, only if u are logged in
  addToFavorites(locationName: string): void {
    if (this.authService.isLoggedIn()) {
      console.log(`Location '${locationName}' added to favorites.`);
      this.addToFavoritesError = '';
    } else {
      this.addToFavoritesError = 'Only logged-in users can add to favorites.';
    }
  }


}
