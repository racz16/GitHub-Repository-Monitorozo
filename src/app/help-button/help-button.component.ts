import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'grm-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss']
})
export class HelpButtonComponent {

  @Input()
  public title = 'Cím';
  @Input()
  public content = 'Tartalom';
  @Input()
  public closeButtonText = 'Bezárás';

  public constructor(public modalService: NgbModal) { }

  public createModal(): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.content = this.content;
    modalRef.componentInstance.closeButtonText = this.closeButtonText;
    modalRef.result.finally(() => { });
  }

}
