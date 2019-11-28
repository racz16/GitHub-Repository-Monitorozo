import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'grm-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {

  @Input()
  public title = 'Cím';
  @Input()
  public content = 'Tartalom';
  @Input()
  public closeButtonText = 'Bezárás';

  public constructor(public activeModal: NgbActiveModal) { }

}
