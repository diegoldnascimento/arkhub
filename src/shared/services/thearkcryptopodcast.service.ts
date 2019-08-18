import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TheArkCryptoPodcastService {

    private api = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.simplecast.com/Vf_ExE7Y';
    private posts = new BehaviorSubject([]);

    constructor(
        private httpClient: HttpClient,
        private utils: UtilsService
    ) { }

    fetchPosts() {
        return this.httpClient.get(this.api).subscribe(async (res: any) => {
            if (res.status === 'ok' && res.items.length > 0) {
                const posts = [];

                for (const [i, item] of res.items.entries()) {
                    item.description = this.utils.wordTrim(this.utils.strip(item.description), 150, '...');
                    item.logo = 'https://thearkcryptopodcast.com/wp-content/uploads/2018/10/arkhead.png';
                    item.pubDate = this.utils.time2TimeAgo(moment(item.pubDate).format('X'));
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

    refresh() {}
}
