import { Repo } from './../../models/Repo.model';
import { DataService } from './../../data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent implements OnInit {
  repos: Repo[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.repos.subscribe((res) => {
      this.repos = res;
    });
  }
}
