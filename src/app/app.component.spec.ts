import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';


/**
 * ISOLATED TESTING EXAMPLE
 */

describe('App component test suite', () => {
  let component: AppComponent;
  beforeEach(  () => {
     component = new AppComponent()
  })

  it('my component is working', () => {
    //const component = new AppComponent()
    expect(component).toBeTruthy()

  })

 // it.todo('check that method gotoNextPage exist ')
 it('check that method gotoNextPage exist ', ()=> {
  //const component = new AppComponent()
  expect(component.goToNextPage).toBeDefined();
 })


 it('should have a title with string jest-test-app  ', ()=> {
  //const component = new AppComponent()
  expect(component.title).toEqual('jest-test-app')
 })
})

/**
 * Shallow testing
 */


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
       // RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA] // this is link with shallow testing
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jest-test-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jest-test-app');
  });

  it('Check template  contain h1 and app-button tag ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h1')).toBeTruthy()
    expect(compiled.querySelector('app-button')).toBeTruthy()
    //expect(compiled.querySelector('.content span').textContent).toContain('jest-test-app app is running!');
  });
});


/**
 * Integrated Testing
 */


 describe('AppComponent', () => {
   let fixture: ComponentFixture<AppComponent>
   let component : AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
       RouterTestingModule
      ],
      declarations: [
        AppComponent, ButtonComponent, TableComponent
      ]
    }).compileComponents();
  });
  beforeEach(( ) => {
    fixture = TestBed.createComponent(AppComponent);
    component  =  fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'jest-test-app'`, () => {

    expect(component.title).toEqual('jest-test-app');
  });

  it(`should have router-outlet'`, () => {
    const routeroutLet = fixture.debugElement.query(By.directive(RouterOutlet));

		expect(routeroutLet).toBeDefined()
  });

  it('Check template  contain h1 and app-button tag ', () => {
    const compiled = fixture.nativeElement;
    console.log(compiled.innerHTML)
    // expect(compiled.querySelector('h1')).toBeTruthy()
    // expect(compiled.querySelector('app-button')).toBeTruthy()
    //expect(compiled.querySelector('.content span').textContent).toContain('jest-test-app app is running!');
  });
});
