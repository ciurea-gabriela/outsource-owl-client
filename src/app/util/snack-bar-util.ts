import {MatSnackBar} from '@angular/material/snack-bar';

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class SnackBarUtil {
    private constructor(private snackBar: MatSnackBar) {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
            panelClass: ['snackbar']
        });
    }
}
