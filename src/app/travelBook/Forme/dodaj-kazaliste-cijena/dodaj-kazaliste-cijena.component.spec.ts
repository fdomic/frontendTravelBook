import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajKazalisteCijenaComponent } from './dodaj-kazaliste-cijena.component';

describe('DodajKazalisteCijenaComponent', () => {
  let component: DodajKazalisteCijenaComponent;
  let fixture: ComponentFixture<DodajKazalisteCijenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajKazalisteCijenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajKazalisteCijenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
