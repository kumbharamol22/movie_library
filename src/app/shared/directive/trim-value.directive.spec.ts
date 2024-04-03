import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TrimValueDirective } from './trim-value.directive';

@Component({
  template: `<input type="text" appTrimValue [(ngModel)]="value" />`
})
class TestComponent {
  value: string = '';
}

describe('TrimValueDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TrimValueDirective],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should trim value on blur', () => {
    const inputValue = '   Harray          Potter   ';
    const expectedValue = 'Harray Potter';

    inputEl.nativeElement.value = inputValue;
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputEl.triggerEventHandler('blur', {});

    expect(component.value).toEqual(expectedValue);
  });
});