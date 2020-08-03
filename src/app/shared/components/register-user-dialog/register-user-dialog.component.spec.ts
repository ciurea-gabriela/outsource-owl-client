import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterUserDialogComponent} from './register-user-dialog.component';

describe('RegisterUserDialogComponent', () => {
    let component: RegisterUserDialogComponent;
    let fixture: ComponentFixture<RegisterUserDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterUserDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterUserDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
