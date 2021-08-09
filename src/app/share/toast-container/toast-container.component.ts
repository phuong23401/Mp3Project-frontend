import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]

})
export class ToastContainerComponent implements OnInit {
  currentRate = 6;
  constructor() { }

  ngOnInit(): void {
  }

}
