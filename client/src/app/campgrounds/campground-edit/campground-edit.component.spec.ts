import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundEditComponent } from './campground-edit.component';

describe('CampgroundEditComponent', () => {
  let component: CampgroundEditComponent;
  let fixture: ComponentFixture<CampgroundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampgroundEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
