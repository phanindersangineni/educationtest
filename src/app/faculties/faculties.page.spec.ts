import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultiesPage } from './faculties.page';

describe('FacultiesPage', () => {
  let component: FacultiesPage;
  let fixture: ComponentFixture<FacultiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
