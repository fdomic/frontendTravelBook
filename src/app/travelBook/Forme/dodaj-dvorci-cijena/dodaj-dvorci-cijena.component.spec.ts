import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajDvorciCijenaComponent } from './dodaj-dvorci-cijena.component';

describe('DodajDvorciCijenaComponent', () => {
  let component: DodajDvorciCijenaComponent;
  let fixture: ComponentFixture<DodajDvorciCijenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajDvorciCijenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajDvorciCijenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
