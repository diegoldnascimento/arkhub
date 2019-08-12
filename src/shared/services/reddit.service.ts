import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Medium } from '../models/medium.model';
import { UtilsService } from './utils.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

    private api = 'https://www.reddit.com/r/arkecosystem/hot/.json';
    private posts = new BehaviorSubject([]);
    private refreshTime = 30;

    constructor(
        private httpClient: HttpClient,
        private utils: UtilsService
    ) {}

    fetchPosts() {
        return this.httpClient.get(this.api + '?count=100').subscribe(async (res: any) => {

            if (res.kind === 'Listing' && res.data.children.length > 0) {
                const posts = [];

                for (const [i, item] of res.data.children.entries()) {
                    const payload = {
                        logo: 'http://i.imgur.com/sdO8tAw.png',
                        author: `/r/ArkEcosystem`,
                        title: item.data.title,
                        description: this.utils.strip(this.utils.wordTrim(item.data.selftext, 150, '...')),
                        link: `https://www.reddit.com/${item.data.permalink}`,
                        thumbnail: item.data.thumbnail,
                        pubDate: this.utils.time2TimeAgo(item.data.created)
                    };

                    posts.push(payload);
                }

                this.posts.next(posts);

                return this.posts.asObservable;
            }

        });
    }

    getPosts() {
        return this.posts.asObservable();
    }

    refresh() {
        /* setInterval(() => {
            this.fetchPosts();
        }, this.refreshTime * 1000); */
    }
}
