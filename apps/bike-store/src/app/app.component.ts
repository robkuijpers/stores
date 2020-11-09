import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { interval } from 'rxjs';

@Component({
  selector: 'stores-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'Bike Store';

  serviceStatus = false;

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.ping('http://localhost:3000/products');
    // interval(1000).subscribe((val) => {
    //   val % 5 === 0 ? this.serviceStatus = true : this.serviceStatus = false
    // });
  }

  private ping(target: string): void {
    this.httpClient.get(target).subscribe(
        data => this.serviceStatus = true,
        error => this.serviceStatus = false
    );
  }

}
