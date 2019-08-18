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
        const self = this;

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

        $('.js-filter-icon').on('click', function() {

        });

        $('body').on('click', function() {
            $(this).find('.js-filter-icon').click(function() {
                const bridgechain = $(this).attr('data-bridgechain');
                $('.js-filter').show();
                $('.js-filter').not('[data-bridgechain="' + bridgechain + '"]').hide();
                self.ngxSmartModalService.close('multiFilterModal');
            });

            $(this).find('.clear').click(function() {
                $('.js-filter').show();
                self.ngxSmartModalService.close('multiFilterModal');
            });
        });
    }

    showMultiFilters() {
        this.ngxSmartModalService.open('multiFilterModal', true);
    }

    showCopyright() {
        this.ngxSmartModalService.open('copyrightModal', true);
    }

}
