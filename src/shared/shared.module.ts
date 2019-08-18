
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { SharedRoutingModule } from './shared-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnComponent } from './components/column/column.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
    declarations: [
        ColumnComponent,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        NgxAudioPlayerModule,
        DragDropModule
    ],
    exports: [
        ColumnComponent
    ],
    providers: [
        SafeHtmlPipe
    ]
})
export class SharedModule { }
