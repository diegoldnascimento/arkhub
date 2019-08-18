import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Medium } from '../models/medium.model';
import { UtilsService } from './utils.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

    api = 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.ark.io/feed';
    bridgechain = 'Ark';
    private posts = new BehaviorSubject([]);
    private refreshTime = 30;

    constructor(
        private httpClient: HttpClient,
        private utils: UtilsService
    ) {}

    fetchPosts() {
        return this.httpClient.get(this.api).subscribe(async (res: Medium) => {
            if (res.status === 'ok' && res.items.length > 0) {
                const posts = [];

                for (const [i, item] of res.items.entries()) {
                    item.description = this.utils.wordTrim(this.utils.strip(item.description), 150, '...');
                    item.logo = 'https://miro.medium.com/fit/c/48/48/1*6_fgYnisCa9V21mymySIvA.png';
                    if (this.bridgechain === 'nOS') {
                        item.logo = './assets/img/nOS/icon256x256.png';
                    } else if (this.bridgechain === 'Ark') {
                        item.logo = './assets/img/ark/icon256x256.png';
                    }
                    item.pubDate = this.utils.time2TimeAgo(moment(item.pubDate).format('X'));
                    // console.log(item);
                    posts.push(item);
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
        /*setInterval(() => {
            this.fetchPosts();
        }, this.refreshTime * 1000);*/
    }
}
