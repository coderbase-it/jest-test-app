import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  myForm: FormGroup;
  constructor(private formService: FormService) {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password:  new FormControl('', Validators.required)
    })
	}

  ngOnInit(): void {
  }

  register(){
    this.formService.registerForm(this.myForm.value)
  }

}
