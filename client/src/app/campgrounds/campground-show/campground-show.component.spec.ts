import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundShowComponent } from './campground-show.component';

describe('CampgroundShowComponent', () => {
  let component: CampgroundShowComponent;
  let fixture: ComponentFixture<CampgroundShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampgroundShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
