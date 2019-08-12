import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor(public ngxSmartModalService: NgxSmartModalService) { }

    ngOnInit() {
        $('.js-column-nav-menu-item').on('click', function() {
            const reference = '#column-' + $(this).attr('id');

            $(reference).addClass('is-focused');

            const scrollTo = $(reference)
                .position().left;

            $('.scroller')
              .animate({'scrollLeft': scrollTo}, 500);

            setTimeout(() => {
                $(reference).removeClass('is-focused');
            }, 300);
        });
    }

    copyright() {
        this.ngxSmartModalService.open('copyrightModal', true);
    }

}
