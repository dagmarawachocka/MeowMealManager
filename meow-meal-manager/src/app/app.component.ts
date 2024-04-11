import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('hour') hour!: ElementRef;
  @ViewChild('min') min!: ElementRef;
  @ViewChild('breakTimeHour') breakTimeHour!: ElementRef;
  @ViewChild('breakTimeMin') breakTimeMin!: ElementRef;
  arrayOfHours: any[] = [];
  arrayOfMin: any[] = [];

  countTimeWithDate() {
    this.arrayOfHours = [];
    let hour = +this.hour.nativeElement.value;
    let min = +this.min.nativeElement.value;
    let breakTimeHour = +this.breakTimeHour.nativeElement.value;
    let breakTimeMin = +this.breakTimeMin.nativeElement.value;

    const basicDate = new Date(new Date().setHours(hour, min));
    const mili = 60000 * breakTimeMin + 3600000 * breakTimeHour;

    let arrOfFinalHours = [];
    let arrOfFinalMin = [];
    arrOfFinalHours.length = 5;
    arrOfFinalMin.length = 5;

    for (let i = 0; i < 5; i++) {
      if (i === 0) {
        let date = new Date(basicDate.getTime() + mili);
        arrOfFinalHours[i] = date.getHours();
        arrOfFinalMin[i] = date.getMinutes();
      } else {
        let hourToNumber: any = +arrOfFinalHours[i - 1];
        let minToNumber: any = +arrOfFinalMin[i - 1];
        let previousTimeEl: any = new Date(
          new Date().setHours(hourToNumber, minToNumber),
        );
        let timeInMili: any = new Date(previousTimeEl.getTime() + mili);
        arrOfFinalHours[i] = timeInMili.getHours();
        arrOfFinalMin[i] = timeInMili.getMinutes();
      }
    }

    this.arrayOfHours = arrOfFinalHours;
    this.arrayOfMin = arrOfFinalMin;

    console.log('Hours: ' + this.arrayOfHours);
    console.log('Min: ' + this.arrayOfMin);
  }
}
