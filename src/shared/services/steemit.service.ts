import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import * as moment from 'moment';
import { Medium } from '../models/medium.model';
declare let steem: any;

@Injectable({
  providedIn: 'root'
})
export class SteemitService {

    private api = 'https://api.rss2json.com/v1/api.json?rss_url=https://blog.ark.io/feed';
    private posts = new BehaviorSubject([]);
    private refreshTime = 30;

    constructor(
        private httpClient: HttpClient,
        private utils: UtilsService
    ) { }

    fetchPosts(tag: string = 'ark', limit: number = 30) {
        const posts = [];
        const query = {
            tag: tag,
            limit: 30
        };

        return new Observable((observer) => {
            steem.api.getDiscussionsByCreated(query, (err, result: any) => {
                if (result.length > 0 && !err) {
                    observer.next(result);
                    observer.complete();
                }
            });
        }).subscribe(async (result: any) => {
            for (const post of result) {
                const item = {
                    logo: 'https://steemitimages.com/DQmX2GQsxyaVnqaEFgYygvB6ABUXbpKSsRCupdXu5onAt9y/2017-11-01%2006.28.27.jpg',
                    title: post.title,
                    author: post.author,
                    description: this.utils.wordTrim(post.body, 150, '...'),
                    pubDate: this.utils.time2TimeAgo(moment(post.created).format('X')),
                    link: `https://steemit.com${post.url}`
                };

                /* this.httpClient.get(item.permalink).subscribe((res) => {
                    console.log(res);
                }); */

                posts.push(item);
            }

            this.posts.next(posts);
        });
    }

    getPosts() {
        return this.posts.asObservable();
    }

    refresh() {
        /* setTimeout(() => {
            this.fetchPosts();
        }, this.refreshTime * 1000); */
    }
}
