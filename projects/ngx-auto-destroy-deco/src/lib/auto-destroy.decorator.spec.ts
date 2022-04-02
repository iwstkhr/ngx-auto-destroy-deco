/* eslint @typescript-eslint/dot-notation: off */

import { Component, OnDestroy } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { AutoDestroy } from './auto-destroy.decorator';

@Component({template: ``})
@AutoDestroy()
class Test1Component {}

@Component({template: ``})
@AutoDestroy()
class Test2Component {private readonly onDestroy$ = new Subject<void>();}

@Component({template: ``})
@AutoDestroy()
class Test3Component implements OnDestroy {
  spy = jasmine.createSpy('ngOnDestroy');
  ngOnDestroy() {this.spy();};
}

describe('AutoDestroy', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Test1Component, Test2Component, Test3Component],
    }).compileComponents();
  }));

  /**
   * AutoDestroy
   *
   * @conditions
   * onDestroy$ not defined
   *
   * @expectations
   * `console.warn` called
   */
  it('AutoDestroy - 1', () => {
    const fixture = TestBed.createComponent(Test1Component);
    spyOn(console, 'warn');
    fixture.destroy();
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  /**
   * AutoDestroy
   *
   * @conditions
   * onDestroy$ defined
   *
   * @expectations
   * `onDestroy$.next` called
   */
  it('AutoDestroy - 2', () => {
    const fixture = TestBed.createComponent(Test2Component);
    const component = fixture.componentInstance;
    component['onDestroy$'].next = jasmine.createSpy('next');

    fixture.destroy();
    expect(component['onDestroy$'].next).toHaveBeenCalledTimes(1);
  });

  /**
   * AutoDestroy
   *
   * @conditions
   * ngOnDestroy defined
   *
   * @expectations
   * `ngOnDestroy` called
   */
  it('AutoDestroy - 3', () => {
    const fixture = TestBed.createComponent(Test3Component);
    const component = fixture.componentInstance;

    fixture.destroy();
    expect(component.spy).toHaveBeenCalledTimes(1);
  });

});
