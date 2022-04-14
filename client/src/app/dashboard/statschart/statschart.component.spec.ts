import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatschartComponent } from './statschart.component';

describe('StatschartComponent', () => {
  let component: StatschartComponent;
  let fixture: ComponentFixture<StatschartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatschartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
