import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-rate-purchase',
    templateUrl: './rate-purchase.component.html',
    styleUrls: ['./rate-purchase.component.scss']
})
export class RatePurchaseComponent implements OnInit {

    public starsPositions = [1, 2, 3, 4, 5];
    public hoveredStar = 0;
    @Output() ratingEvent = new EventEmitter<number>();
    @Input() isSelectable: boolean;

    constructor() {
    }

    public updateHoveredStar(position: number): void {
        if (this.isSelectable) {
            this.hoveredStar = position;
        }
    }

    public emitRatingEvent(rating: number) {
        if (this.isSelectable) {
            this.ratingEvent.emit(rating);
            this.isSelectable = false;
        }
    }

    ngOnInit(): void {
    }

    public updateHoveredStars(rating: number): void {
        this.hoveredStar = rating;
    }

}
