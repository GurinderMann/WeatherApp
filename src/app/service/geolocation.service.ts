import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private baseURL = "http://api.openweathermap.org/geo/1.0/direct?";
  private apiKey = "";

  constructor(private http:HttpClient) { }
// decleared the query and taking the value from the search
  getGeoLocation(query: string): Observable<any>{
    const url = `${this.baseURL}q=${query}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
