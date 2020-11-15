import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    title = 'Welcome';

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

}
