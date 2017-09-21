import { Injectable } from '@angular/core';

@Injectable()
export class RouterService {
    baseUrl = null;
    constructor() {
        this.baseUrl = '/api/';
    }


}
