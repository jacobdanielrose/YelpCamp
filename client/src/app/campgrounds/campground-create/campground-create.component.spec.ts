import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundCreateComponent } from './campground-create.component';

describe('CampgroundCreateComponent', () => {
  let component: CampgroundCreateComponent;
  let fixture: ComponentFixture<CampgroundCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampgroundCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
