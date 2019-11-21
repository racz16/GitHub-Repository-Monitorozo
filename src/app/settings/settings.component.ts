import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'grm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public constructor(private tokenService: TokenService, private modalService: NgbModal) { }

  public clearLocalStorage(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Adatok törlése';
    modalRef.componentInstance.content = 'Biztos vagy benne, hogy törlöd az adatokat a local storage-ból? ' +
      'Ez törli az összes Organization-höz felvett feladatot és prefixet, de a tokent nem. ' +
      'Vigyázat, ez a művelet nem visszavonható.';
    modalRef.componentInstance.confirmButtonText = 'Törlés';
    modalRef.result.then((result: string) => {
      if (result === 'confirm') {
        const token = this.tokenService.getTokenFromLocalStorage();
        window.localStorage.clear();
        this.tokenService.saveTokenToLocalStorage(token);
      }
    }).catch(() => { });
  }

}
