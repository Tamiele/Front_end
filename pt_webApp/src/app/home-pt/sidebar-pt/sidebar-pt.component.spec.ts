import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPtComponent } from './sidebar-pt.component';

describe('SidebarPtComponent', () => {
  let component: SidebarPtComponent;
  let fixture: ComponentFixture<SidebarPtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarPtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
