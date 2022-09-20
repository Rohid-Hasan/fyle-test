import { Router } from '@angular/router';
import { UserProfile } from './../../models/Github-User.model';
import { ProfileService } from './profile.service';
import { DataService } from './../../data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  errorMessage: string;
  userProfileData: UserProfile;
  isLoading: boolean;

  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfileValue();
  }

  getProfileValue() {
    this.isLoading = true;
    const userName = this.dataService.userName.getValue();
    if (!userName) {
      alert('please serach first to view the page');
      this.router.navigate(['/']);
      return;
    }
    this.profileService.getProfileData(userName).subscribe({
      next: (res: {
        name: string;
        location: string;
        public_repos: number;
        html_url: string;
        bio: string;
        twitter_username: string;
        avatar_url: string;
      }) => {
        this.isLoading = false;
        this.userProfileData = new UserProfile(
          res.name,
          res.bio,
          res.twitter_username,
          res.avatar_url,
          res.html_url,
          res.location
        );
        this.dataService.publicRepoCount.next(res.public_repos);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      },
    });
  }
}
