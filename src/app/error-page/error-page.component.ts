import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  //151 устанавливаем errorMessage с типом string по умолчанию
  errorMessage!: string

  //151 внедряем route: ActivatedRoute
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    //151 первый способ передачи сообщения
    // this.errorMessage = this.route.snapshot.data['message'];
    //151 второй способ - правильный
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

}
