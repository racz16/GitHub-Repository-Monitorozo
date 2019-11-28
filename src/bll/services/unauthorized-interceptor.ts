import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'src/app/info-modal/info-modal.component';
import { TokenService } from './token-service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    private static readonly UNAUTHORIZED_ERROR_CODE = 401;

    public constructor(private router: Router, private modalService: NgbModal, private tokenService: TokenService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(() => { }, (err: any) => {
            if (this.isRealUnauthorizedResponse(err)) {
                this.createModal();
            }
        }));
    }

    private isRealUnauthorizedResponse(err: any): boolean {
        return err instanceof HttpErrorResponse &&
            err.status === UnauthorizedInterceptor.UNAUTHORIZED_ERROR_CODE &&
            this.tokenService.isTokenSavedInLocalStorage();
    }

    private createModal(): void {
        const modalRef = this.modalService.open(InfoModalComponent);
        modalRef.componentInstance.title = 'Hiba történt';
        modalRef.componentInstance.content = 'A GitHub nem tudott authorizálni, ezért nem szolgálta ki a kérést. ' +
            'Ennek valószínűleg az az oka, hogy helytelen tokent adtál meg.';
        modalRef.componentInstance.closeButtonText = 'Token megadása';
        modalRef.result.finally(() => {
            this.router.navigate(['settings']);
        });
    }
}
