import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.scss']
})
export class StarComponent {
    @Input() hoveredStar: number;
    @Input() starPosition: number;

    constructor() {
    }

    public isStarHovered(): boolean {
        return this.hoveredStar >= this.starPosition;
    }

}
