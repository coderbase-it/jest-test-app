import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormService } from '../services/form.service';

import { TodoFormComponent } from './todo-form.component';

@Injectable()
class FormMockService{
  registerForm(values:any){
    return false
  }
}
/**
 * Integrated Test ( TDD Version )
 */
describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let formService: FormService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule],
      declarations: [ TodoFormComponent ],
      //providers: [ { provide: FormService, useClass: FormMockService}] // comment that to see real service use
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    formService = TestBed.inject(FormService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component contain a form', () => {
    expect(component.myForm).toBeDefined()
  })

  it('component form should have email and password field', () => {
    expect(component.myForm.contains('email')).toBeTruthy()
    expect(component.myForm.contains('password')).toBeTruthy();
  })

  it('component form should have email and password field on html', () => {
    const emailField = fixture.debugElement.query(By.css('#email-field-id'))
    const passwordField = fixture.debugElement.query(By.css('#password-field-id'))

    expect(emailField).toBeTruthy()
    expect(passwordField).toBeTruthy()

    expect(emailField.properties.type).toBe('text')
    expect(passwordField.properties.type).toBe('password')
  })

  it('password should not be display directly ***', ()=> {
    const emailField = fixture.debugElement.query(By.css('#email-field-id[formControlName=email]'))
    const passwordField = fixture.debugElement.query(By.css('#password-field-id[formControlName=password]'))

    expect(emailField.properties.type).toBe('text')
    expect(passwordField.properties.type).toBe('password')
  })





  it('button should be disable if form is invalid', () => {
    // myForm is invalid ?
    expect(component.myForm.invalid).toBeTruthy()
    // retrieve button from html with a particuliar id
    const button = fixture.debugElement.query(By.css('#button-id'))
    console.log(button)
    expect(button).not.toBeNull()
    expect(button.nativeElement.textContent).toContain('register')
    // check if the button is disabled
    expect(button.nativeElement.disabled).toBeTruthy()
  })


  it('email format should correspond to a valid email', ()=> {
    // setValue of email address field
    component.myForm.get('email').setValue('pierre@')
    // then we can check if field is valid
    expect(component.myForm.get('email').invalid).toBeTruthy()

    component.myForm.get('email').setValue('pierre@aol.com')
    expect(component.myForm.get('email').invalid).toBeFalsy()
  })

  it('email error should be display is email field is invalid and touched', () => {
    // set invalid the field email
    component.myForm.get('email').setValue('pierre@')
    // simulate touche of this field
    component.myForm.get('email').markAsTouched()
    fixture.detectChanges() // mandatory otherwise html is not update
    // check that error is display
    const emailErrors = fixture.debugElement.query(By.css('#error-email-id'))
    expect(emailErrors).not.toBeNull()

  })

  it('email error should not  be display if email field is untouched', () => {
    // set invalid the field email
    component.myForm.get('email').setValue('pierre@')
    // simulate touche of this field
    component.myForm.get('email').markAsUntouched()
    fixture.detectChanges()
    // check that error is display
    const emailErrors = fixture.debugElement.query(By.css('#error-email-id'))
    expect(emailErrors).toBeNull()

  })


  it('click on button should call register method', ()=> {
    component.myForm.get('email').setValue('pierre@aol.com')
    component.myForm.get('password').setValue('pierre')
    fixture.detectChanges()
    const button = fixture.debugElement.query(By.css('#button-id'))
    console.log(button)
    const spy = jest.spyOn(component, 'register')
    button.nativeElement.click()
    expect(spy).toHaveBeenCalledTimes(1)


  })

  it('register method should call service method with form values', ()=> {
    const spy = jest.spyOn(formService, 'registerForm')
    component.register()
    expect(spy).toHaveBeenCalledWith(component.myForm.value)
  })

  it('service test return true', ()=> {
    expect(formService.registerForm([])).toBeTruthy()
  })


  it.todo('email field value should in lowercase')






});
