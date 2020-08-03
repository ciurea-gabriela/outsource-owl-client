import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
    @Input() isLogoFooter = false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    public goToHome(): void {
        this.router.navigate([`home`]);
    }

}
