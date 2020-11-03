import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutAcademyPage } from './about-academy.page';

describe('AboutAcademyPage', () => {
  let component: AboutAcademyPage;
  let fixture: ComponentFixture<AboutAcademyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAcademyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutAcademyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
