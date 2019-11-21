import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TaskModel } from 'src/bll/models/task.model';
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
  public task = new TaskModel();
  @Input()
  public tasks: Array<TaskModel>;
  @Input()
  public taskIndex: number;

  public constructor(public activeModal: NgbActiveModal) { }

  public isCommentPatternValid(): boolean {
    const editedTaskCommentPattern = this.createCommentPattern(this.task);
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const taskCommentPattern = this.createCommentPattern(task);
      if (i !== this.taskIndex && editedTaskCommentPattern === taskCommentPattern) {
        return false;
      }
    }
    return true;
  }

  private createCommentPattern(task: TaskModel): string {
    const prefix = task.commentPrefix ? task.commentPrefix : '';
    const body = '<Pontszám>';
    const postfix = task.commentPostfix ? task.commentPostfix : '';
    return `${prefix}${body}${postfix}`;
  }

  public save(): void {
    if (this.task.deadline) {
      this.task.deadline = Object.assign(new Deadline(), this.task.deadline);
    }
    this.activeModal.close(this.task);
  }

}
