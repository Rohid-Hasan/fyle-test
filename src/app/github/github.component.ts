import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
})
export class GithubComponent implements OnInit {
  constructor(private rotuer: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.rotuer.navigate(['/']);
  }
}
