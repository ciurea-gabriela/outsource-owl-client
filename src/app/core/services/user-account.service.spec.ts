import {TestBed} from '@angular/core/testing';

import {UserAccountService} from './user-account.service';

describe('UsserAccountService', () => {
    let service: UserAccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserAccountService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
