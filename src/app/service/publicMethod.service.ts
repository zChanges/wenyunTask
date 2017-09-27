import { Injectable } from "@angular/core";

@Injectable()
export class PublicMethodService {
  constructor() {}

  dateUTC(date){
    return Date.parse(date);
  }
}
