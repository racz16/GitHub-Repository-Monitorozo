import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

}
