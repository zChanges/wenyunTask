import { Injectable } from "@angular/core";

@Injectable()
export class PublicMethodService {
  constructor() {}

  /**
   * new Data 转时间戳
   * @param date 时间
   */
  dateUTC(date:any){
    if(date =='' || date == 0){ return '' };
    const str = String(Date.parse(date));
    return Number(str.substr(0,str.length - 3));
  }

  /**
   * base64转Blob
   * @param dataurl base64
   */
  base64TransformBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bbb = encodeURI(arr[1])
    var bstr = window.atob(bbb), 
        n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }



}
