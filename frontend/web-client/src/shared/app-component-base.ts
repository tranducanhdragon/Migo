import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '../environments/AppConsts';
import { MessageService as MessageServiceP } from 'primeng/api';

export abstract class AppComponentBase {

    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
    elementRef: ElementRef;
    messageP: MessageServiceP

    constructor(injector: Injector) {
        this.elementRef = injector.get(ElementRef);
        this.messageP = injector.get(MessageServiceP);
    }
}
