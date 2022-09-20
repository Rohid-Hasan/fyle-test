import { Router } from '@angular/router';
import { DataService } from './../data/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(private dataSerivce: DataService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.dataSerivce.userName.next(form.value.userName);
    this.router.navigate(['/profile']);
  }
}
