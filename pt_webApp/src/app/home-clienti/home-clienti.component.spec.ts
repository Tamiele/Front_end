import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClientiComponent } from './home-clienti.component';

describe('HomeClientiComponent', () => {
  let component: HomeClientiComponent;
  let fixture: ComponentFixture<HomeClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeClientiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
