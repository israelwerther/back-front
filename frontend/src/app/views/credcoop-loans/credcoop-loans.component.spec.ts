import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredcoopLoansComponent } from './credcoop-loans.component';

describe('CredcoopLoansComponent', () => {
  let component: CredcoopLoansComponent;
  let fixture: ComponentFixture<CredcoopLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredcoopLoansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredcoopLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
