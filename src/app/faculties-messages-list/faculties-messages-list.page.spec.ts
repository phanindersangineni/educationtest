import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultiesMessagesListPage } from './faculties-messages-list.page';

describe('FacultiesMessagesListPage', () => {
  let component: FacultiesMessagesListPage;
  let fixture: ComponentFixture<FacultiesMessagesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultiesMessagesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultiesMessagesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
