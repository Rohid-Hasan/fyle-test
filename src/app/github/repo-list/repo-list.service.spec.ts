/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RepoListService } from './repo-list.service';

describe('Service: RepoList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoListService]
    });
  });

  it('should ...', inject([RepoListService], (service: RepoListService) => {
    expect(service).toBeTruthy();
  }));
});
