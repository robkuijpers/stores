import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stores-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'Bike Store';

  serviceStatus = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

}
