import { Component, OnInit, Input } from '@angular/core';
import { MediumService } from '../../services/medium.service';
import { SteemitService } from './../../services/steemit.service';
import { RedditService } from './../../services/reddit.service';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
    providers: [
        MediumService
    ]
})
export class ColumnComponent implements OnInit {
    @Input() bridgechain: string = "Ark";
    @Input() bridgechainLogo: string = "";
    @Input() bridgechainUrl: string = "";
    @Input() headerTitle: string;
    @Input() headerIcon: string;
    @Input() headerUsername: string
    @Input() headerLinks = [];
    @Input() stream: string = "";
    @Input() streams;
    @Input() reference = "";

    constructor(
        private mediumService: MediumService,
        private steemitService: SteemitService,
        private redditService: RedditService
    ) { }

    ngOnInit() {
        this.fetchStream();
    }

    fetchStream() {
        switch(this.getStream()) {
            case 'medium':
                if (this.bridgechain === 'nOS') {
                    this.mediumService.api = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/nos-io';
                }
                this.mediumService.bridgechain = this.bridgechain;
                this.mediumService.fetchPosts();
                this.streams = this.mediumService.getPosts();
                break;
            case 'steemit':
                this.steemitService.fetchPosts();
                this.streams = this.steemitService.getPosts();
                break;
            case 'reddit':
                this.redditService.fetchPosts();
                this.streams = this.redditService.getPosts();
                break;
        }
    }

    getStream() {
        return this.stream;
    }

    get isSteemit() {
        return this.stream === 'steemit';
    }

    get isMedium() {
        return this.stream === 'medium';
    }

    redirect(url: string) {
        window.open(url, '_blank');
    }

}
