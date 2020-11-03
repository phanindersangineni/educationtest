import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyllabusTopicsPage } from './syllabus-topics.page';

describe('SyllabusTopicsPage', () => {
  let component: SyllabusTopicsPage;
  let fixture: ComponentFixture<SyllabusTopicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllabusTopicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyllabusTopicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
