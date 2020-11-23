import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    title = 'Main';

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

}
