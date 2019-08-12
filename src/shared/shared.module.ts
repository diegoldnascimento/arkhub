import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
    declarations: [
        ColumnComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    exports: [
        ColumnComponent
    ]
})
export class SharedModule { }
