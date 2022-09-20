import { RepoListService } from './../github/repo-list/repo-list.service';
import { Repo } from './../models/Repo.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  userName: BehaviorSubject<string> = new BehaviorSubject('rohid-hasan');
  publicRepoCount: BehaviorSubject<number> = new BehaviorSubject(null);
  repos: BehaviorSubject<Repo[]> = new BehaviorSubject(null);

  constructor(private repoListService: RepoListService) {}

  fetchRepoFromServer(
    userName: string,
    itemPerPage: number,
    pageNumber: number
  ) {
    this.repos.next([]);
    this.repoListService.getRepos(userName, itemPerPage, pageNumber).subscribe({
      next: (
        res: { name: string; description: string; languages_url: string }[]
      ) => {
        for (let item of res) {
          this.repoListService
            .getLanguageListFromUrl(item.languages_url)
            .subscribe({
              next: (res: { [key: string]: string }) => {
                const languages = Object.keys(res);
                const repo = new Repo(item.name, item.description, languages);
                //fetching the previous one
                const repos = this.repos.getValue();
                //push
                this.repos.next([...repos, repo]);
              },
              error: (err) => {
                throw new Error(err);
              },
            });
        }
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
