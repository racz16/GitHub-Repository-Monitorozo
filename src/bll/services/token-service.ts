import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {

    private static readonly TOKEN_KEY = 'TOKEN_KEY';

    public saveTokenToLocalStorage(token: string): void {
        if (!token) {
            this.removeTokenFromLocalStorage();
        } else {
            window.localStorage.setItem(TokenService.TOKEN_KEY, token);
        }
    }

    public getTokenFromLocalStorage(): string {
        return window.localStorage.getItem(TokenService.TOKEN_KEY);
    }

    public isTokenSavedInLocalStorage(): boolean {
        return !!this.getTokenFromLocalStorage();
    }

    public removeTokenFromLocalStorage(): void {
        window.localStorage.removeItem(TokenService.TOKEN_KEY);
    }

}
