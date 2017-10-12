import { Injectable } from '@angular/core';

@Injectable()
export class RouterService {
    baseUrl = null;
    upLoadFile: string;
    constructor() {
        this.baseUrl = '/api/';  
        // this.baseUrl = 'http://192.168.1.4:10016/api/';
        this.upLoadFile = this.baseUrl + 'task/uploadFile';
    }
}