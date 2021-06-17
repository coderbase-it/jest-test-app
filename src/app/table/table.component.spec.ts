import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TableComponent } from './table.component';


@Component({
  selector: 'app-test',
  template: `<app-table [headers]="testHeaders">
    <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
  </app-table>`
})
class TestComponent {
  testHeaders = ['col1', 'col2']
}


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent, TestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it( `To check how many headers is create based on the input array provide Also check the title of each header`, () => {
    component.headers =  ['col1', 'col2']
    fixture.detectChanges();
    const columns = fixture.nativeElement.querySelectorAll('th')
    expect(columns.length).toEqual(2)
    expect(columns[0].textContent).toContain(component.headers[0])
    expect(columns[1].textContent).toContain(component.headers[1])
    console.log(fixture.nativeElement.innerHTML)

  })

  /**
   * Snapshot Jest Testing
   */

  it('snapshot test', () => {
    component.headers =  ['col1', 'col2']
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot()
  })

  it(`to test the project content on tbody part `, ()=> {
    const fixtureTest = TestBed.createComponent(TestComponent);
    const componentTest = fixtureTest.componentInstance;
    fixtureTest.detectChanges();

    const template = fixtureTest.debugElement.query(By.css('app-table')).nativeElement
    const instanceTable = fixtureTest.debugElement.query(By.css('app-table')).componentInstance

    expect(instanceTable.headers).toStrictEqual(componentTest.testHeaders)

    const lines = fixtureTest.nativeElement.querySelectorAll('tbody tr')
    expect(lines.length).toEqual(2)





  })
})

