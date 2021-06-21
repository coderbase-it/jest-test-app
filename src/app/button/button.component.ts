import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonTitle: string;
  @Output() buttonClicked = new EventEmitter()

  private privateProperty = false;
  constructor() { }

  ngOnInit(): void {
  }

  clickOnButton(){
    //console.log('hello')
    this.buttonClicked.emit()
  }

  private privateMethod(){
    return false
  }
}
