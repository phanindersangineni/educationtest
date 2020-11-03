import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultiesMessagePage } from './faculties-message.page';

describe('FacultiesMessagePage', () => {
  let component: FacultiesMessagePage;
  let fixture: ComponentFixture<FacultiesMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultiesMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultiesMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
