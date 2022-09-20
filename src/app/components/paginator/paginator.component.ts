import { Router } from '@angular/router';
import { DataService } from './../../data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  repoPerPage: number = 2;
  totalNoOfRepos: number;
  noOfPage: number;
  currentPageNumber: number = 1;
  userName: string;
  errorMessage: string;
  pageNumbers: number[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.publicRepoCount.subscribe((res) => {
      this.totalNoOfRepos = res;
      this.noOfPage = Math.ceil(this.totalNoOfRepos / this.repoPerPage);
      const numbers = [];
      for (let i = 1; i <= this.noOfPage; i++) {
        numbers.push(i);
      }
      this.pageNumbers = numbers;
    });
    this.userName = this.dataService.userName.getValue();
    if (!this.userName) {
      this.errorMessage =
        'oOps!! You forgot to search .... please search then come to this page';
      return;
    }
    this.fetchRepoFromServer();
  }

  //this method will run every time when any paginator event
  fetchRepoFromServer(key?: string) {
    if (key == 'prev') {
      //go to next page
      this.currentPageNumber = this.currentPageNumber - 1;
    } else if (key == 'next') {
      //go to next page
      this.currentPageNumber = this.currentPageNumber + 1;
    }
    this.dataService.fetchRepoFromServer(
      this.userName,
      this.repoPerPage,
      this.currentPageNumber
    );
  }

  repoPerPageChange() {
    this.noOfPage = Math.ceil(this.totalNoOfRepos / this.repoPerPage);
    const numbers = [];
    for (let i = 1; i <= this.noOfPage; i++) {
      numbers.push(i);
    }
    this.pageNumbers = numbers;
    this.currentPageNumber = 1;
    this.fetchRepoFromServer();
  }

  goToPageNo(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.fetchRepoFromServer();
  }
}
