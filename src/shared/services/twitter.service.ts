import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Medium } from '../models/medium.model';
import { UtilsService } from './utils.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

    private posts = new BehaviorSubject([]);
    private refreshTime = 30;

    constructor(
        private httpClient: HttpClient,
        private utils: UtilsService
    ) {}

    init() {}

    fetchPosts() {}

    getPosts() {
        return this.posts.asObservable();
    }

    refresh() {}
}
