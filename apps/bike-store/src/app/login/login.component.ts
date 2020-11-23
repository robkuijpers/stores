import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    title = 'Login';

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

}
