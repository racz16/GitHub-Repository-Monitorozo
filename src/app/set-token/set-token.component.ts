import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'grm-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.scss']
})
export class SetTokenComponent implements OnInit {

  @Output()
  public tokenChanged = new EventEmitter<void>();
  @Input()
  public removeTokenButton = true;
  @ViewChild('tokenTextArea', { static: false })
  public tokenTextArea: ElementRef<HTMLTextAreaElement>;
  public token: string;

  public constructor(private tokenService: TokenService, private modalService: NgbModal) { }

  public ngOnInit(): void {
    this.refreshToken();
  }

  public setToken(): void {
    this.token = this.tokenTextArea.nativeElement.value;
    this.tokenService.saveTokenToLocalStorage(this.token);
    this.tokenChanged.emit();
  }

  public removeToken(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Token törlése';
    modalRef.componentInstance.content = 'Biztos vagy benne, hogy törlöd a tokent? ' +
      'Vigyázat, ez a művelet nem visszavonható és a token törlését követően nem leszel képes használni az oldalt.';
    modalRef.componentInstance.confirmButtonText = 'Törlés';
    modalRef.result.then((result: string) => {
      if (result === 'confirm') {
        this.tokenService.removeTokenFromLocalStorage();
        this.refreshToken();
        this.tokenChanged.emit();
      }
    }).catch(() => { });
  }

  public isRemoveTokenButtonDisabled(): boolean {
    return !this.tokenService.isTokenSavedInLocalStorage();
  }

  private refreshToken(): void {
    this.token = this.tokenService.getTokenFromLocalStorage();
  }

}
