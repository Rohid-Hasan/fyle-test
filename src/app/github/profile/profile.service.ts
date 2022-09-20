import { DataService } from './../../data/data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileData(userName: string) {
    const url = 'https://api.github.com/users/' + userName;
    return this.http.get<{
      name: string;
      location: string;
      public_repos: number;
      html_url: string;
      bio: string;
      twitter_username: string;
      avatar_url: string;
    }>(url);
  }
}
