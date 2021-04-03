import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTutorialComponent } from './canvas-tutorial.component';

describe('CanvasTutorialComponent', () => {
  let component: CanvasTutorialComponent;
  let fixture: ComponentFixture<CanvasTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
