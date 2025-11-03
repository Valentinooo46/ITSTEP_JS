import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',

  template: `
    <h1>«Patience is a key element of success»</h1>
    <ul>
      <li>If you think your teacher is tough, wait till you get boss</li>
      <li>Life is not fair — get used to it!</li>
      <li>Success is a lousy teacher. Це seduces smart people in thinking they can't lose</li>
      <li>Be nice to nerds..</li>
      
    </ul>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfMo2vOf6CYdw6X8vEuV90VN8c2kBT_k1YzR1AewOCKJdkiIqEFszt5D1GqbuupB4XU4gkr00Yc2lcLVv2rF860W6nLMi5MOKD3yRn8Djc&s=10"/>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/Bill_Gates">Wiki</a></li>
      <li><a href="https://www.gatesfoundation.org/">Фонд</a></li>
      <li><a href="https://www.gatesnotes.com/">Notes</a></li>
      <li><a href="https://twitter.com/billgates">Twitter</a></li>
    </ul>
    `

})
export class App {
  protected readonly title = signal('my_angular');
}
