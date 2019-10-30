import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatButtonToggleModule, MatMenuModule, MatToolbarModule, MatRippleModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule, MatTreeModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseSidebarModule, FuseConfirmDialogModule } from '@fuse/components';
import { PlacesService } from './places.service';
import { PlacesComponent } from './places.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PagerService } from './pager.service';
import { Ng5SliderModule } from 'ng5-slider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const routes = [
    {
        path     : '**',
        component: PlacesComponent,
    },
];


@NgModule({
    declarations: [
        PlacesComponent,
        PlacesListComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        Ng5SliderModule,
        NgMultiSelectDropDownModule.forRoot(),
        //MDBBootstrapModule.forRoot(),
        NgxMaterialTimepickerModule,
        
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSidenavModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatTreeModule,


        FuseSharedModule,
        FuseSidebarModule,
        FuseConfirmDialogModule

    ],
    providers   : [
        PlacesService,
        PagerService,
    ],
    entryComponents: [PlacesComponent]
})
export class PlacesModule
{
}
