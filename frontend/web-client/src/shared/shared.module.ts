import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {GalleriaModule} from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ShortDescriptionPipe, MediumDescriptionPipe } from 'src/pipes/description.pipe';
import { UserTokenService } from './observable-service/user/user-token.service';
import { RolePipe } from 'src/pipes/role.pipe';
import { GenderPipe, WorkStatusPipe } from 'src/pipes/citizen.pipe';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CarouselModule,
        ButtonModule,
        ToastModule,
        CalendarModule,
        GalleriaModule,
    ],
    declarations: [
        //pipe
        ShortDescriptionPipe,
        MediumDescriptionPipe,
        RolePipe,
        GenderPipe,
        WorkStatusPipe,
    ],
    exports: [
        //pipe
        ShortDescriptionPipe,
        MediumDescriptionPipe,
        RolePipe,
        GenderPipe,
        WorkStatusPipe,
    ],
    providers:[
        UserTokenService,
    ]
})
export class SharedModule {
    
}
