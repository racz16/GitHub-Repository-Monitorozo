import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/bll/models/task.model';
import { Deadline } from 'src/bll/models/deadline.model';
import { HungarianDateFormatter } from '../hungarian-date-formatter';
import { HungarianDateLocalization } from '../hungarian-date-localization';

@Component({
  selector: 'grm-create-edit-task-modal',
  templateUrl: './create-edit-task-modal.component.html',
  styleUrls: ['./create-edit-task-modal.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: HungarianDateFormatter },
    { provide: NgbDatepickerI18n, useClass: HungarianDateLocalization }
  ]
})
export class CreateEditTaskModalComponent {

  @Input()
  public task = new Task();

  public constructor(public activeModal: NgbActiveModal) { }

  public save(): void {
    if (this.task.deadline) {
      this.task.deadline = Object.assign(new Deadline(), this.task.deadline);
    }
    this.activeModal.close(this.task);
  }

}
