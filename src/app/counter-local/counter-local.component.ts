import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-local',
  standalone: false,
  templateUrl: './counter-local.component.html',
  styleUrl: './counter-local.component.css'
})
export class CounterLocalComponent {
  counter = 0;

  increment() {
    this.counter++;
  }

  reset() {
    this.counter = 0;
  }

  decrement() {
    this.counter--;
  }
}
