import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  registerForm(values: any){
    console.log(values)
    return true;
  }
}
