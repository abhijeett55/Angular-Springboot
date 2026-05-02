import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontbarComponent } from './frontbar.component';

describe('FrontbarComponent', () => {
  let component: FrontbarComponent;
  let fixture: ComponentFixture<FrontbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
