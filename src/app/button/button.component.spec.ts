import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';


describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not render the button if buttonTitle is empty ', () => {
    const compiled = fixture.nativeElement

   expect(compiled.querySelector('button')).toBeFalsy()
  });

  it('should render the button if input is provide', () => {
    component.buttonTitle = "super-title"
    fixture.detectChanges() // if we not call detectChange , ts change won't be reflected on the html part
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('button')).toBeTruthy()

  });

  it('should call method clickOnButton once click is perform on html button', () => {
    component.buttonTitle = "super-title"
    fixture.detectChanges() // if we not call detectChange , ts change won't be reflected on the html part
    const compiled = fixture.nativeElement
    const button = compiled.querySelector('button')
    const spy = jest.spyOn(component, 'clickOnButton'  )

    button.click()

    expect(spy).toHaveBeenCalledTimes(1)

  });

  it('when clickOnButton method is call it should call emit method of Output', () => {
    const spy = jest.spyOn(component.buttonClicked, 'emit'  )
    component.clickOnButton()
    expect(spy).toHaveBeenCalledTimes(1)
  });


  it('should have privateProperty with false value', () => {
    expect(component['privateProperty']).toBeDefined()
    expect(component['privateProperty']).toBeFalsy()
  });


  it('should have privateMethod which return false value', () => {
    expect(component['privateMethod']).toBeDefined()
    expect(component['privateMethod']()).toBeFalsy()
  });

});
