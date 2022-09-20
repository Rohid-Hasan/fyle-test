import { Repo } from './../../models/Repo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RepoListService {
  constructor(private http: HttpClient) {}

  getRepos(userName: string, itemPerPage: number, pageNumber: number) {
    return this.http.get<
      { name: string; description: string; languages_url: string }[]
    >(
      `https://api.github.com/users/rohid-hasan/repos?per_page=${itemPerPage}&page=${pageNumber}`
    );
  }

  getLanguageListFromUrl(url: string) {
    return this.http.get<{ [key: string]: string }>(url);
  }
}
