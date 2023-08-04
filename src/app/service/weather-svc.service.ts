import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherSvcService {
  private baseURL = "https://api.openweathermap.org/data/2.5/weather";
  private apiKey = "";

  constructor(private http: HttpClient) { }

  getWeatherData(lat: number, lon: number): Observable<any> {
    const url = `${this.baseURL}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
