import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  @ViewChild('mySlides', { read: IonSlides, static:false }) slides: IonSlides;

  constructor() { }

  ngOnInit() {
    document.getElementById("append").innerHTML = `<p>A  person repeatedly tosses a fair dice. He gets two points for a throw of a  perfect square and one point otherwise. Let <math><mrow><msub><mi>P</mi><mi>n</mi></msub></mrow></math><xml>     </xml> denote the  probability that he reaches a score of exactly <i style='mso-bidi-font-style:  normal'>n</i>. </p>  <p>Question:  If <math><mrow><msub><mi>Δ</mi><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>=</mo><msub><mi>P</mi><mi>n</mi></msub><mo>−</mo><msub><mi>P</mi><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>,</mo></mrow></math><xml>     </xml> then</p>
    `;

    document.getElementById("choice1").innerHTML = `
    <math><mrow><msub><mi>Δ</mi><mn>1</mn></msub><mo>,</mo><msub><mi>Δ</mi><mn>2</mn></msub><mo>,</mo><msub><mi>Δ</mi><mn>3</mn></msub><mo>,</mo><mn>...</mn></mrow></math><xml>     </xml>are  in A.P
    `;
  }

  swipeNext() {
    this.slides.slideNext();
  }
  swipePrevious() {
    this.slides.slidePrev();
  }

}
