import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'grm-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  @Input()
  public title = 'Cím';
  @Input()
  public content = 'Tartalom';
  @Input()
  public cancelButtonText = 'Mégse';
  @Input()
  public confirmButtonText = 'Megerősítés';

  public constructor(public activeModal: NgbActiveModal) { }

}
