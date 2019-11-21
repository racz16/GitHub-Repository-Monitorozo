import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDetailedModel } from 'src/bll/models/organization-detailed.model';
import { OrganizationService } from 'src/bll/services/organization-service';
import { TokenService } from 'src/bll/services/token-service';
import { ExportService } from 'src/bll/services/export-service';
import { RepositoryListModel } from 'src/bll/models/repository-list.model';
import { TaskModel } from 'src/bll/models/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditTaskModalComponent } from '../create-edit-task-modal/create-edit-task-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'grm-organization-detailed',
  templateUrl: './organization-detailed.component.html',
  styleUrls: ['./organization-detailed.component.scss']
})
export class OrganizationDetailedComponent implements OnInit {

  @ViewChild('prefixInput', { static: false })
  public prefixInput: ElementRef<HTMLInputElement>;
  @ViewChild('exportButton', { static: false })
  public exportButton: ElementRef<HTMLAnchorElement>;
  public organization: OrganizationDetailedModel;
  private exportButtonDisabled = true;
  public exportInfoTitle = 'Eredmények exportálása';
  public exportInfoContent =
    '<p>Az eredmények exportálása lehetséges egy CSV kiterjesztésű fájlba, melynek (az első, fejléc sorát kivéve) minden sora a ' +
    'következő mintára illeszkedik:</p>' +
    '<p class="text-center">&lt;Neptun-kód&gt;;&lt;Pontszám&gt;</p>' +
    '<p>Az exportálás megkezdéséhez azonban előbb egy CSV kiterjesztésű fájlt kell feltölteni, a tallozás gombra kattintva, ' +
    'melynek(az első, fejléc sorát kivéve) minden sora a következő mintára illeszkedik:</p>' +
    '<p class="text-center">&lt;Neptun-kód&gt;;&lt;GitHub Repository név&gt;</p>' +
    '<p>A feltöltést követően az eredmények exportálása gombra kattintva letöltheted a fájlt.</p>';
  public repoInfoTitle = 'Repository lista';
  public repoInfoContent = 'Az Organizationben megtalálható Repositoryk. Minden hallgatónak létre kell hoznia egy ' +
    'Repositoryt a projektje számára. Ha az Organization-ön belül egyéb (pl. példakódokat tartalmazó) Repositoryk ' +
    'is megtalálhatók, akkor érdemes a hallgatói Repositorykat egy prefixel létrehozni, majd erre a prefixre rászűrni.';
  public taskInfoTitle = 'Feladatok';
  public taskInfoContent = 'Minden Organizationhöz fel lehet venni feladatokat. Ezekhez meg lehet adni egy név mellett ' +
    'opcionálisan egy határidőt és egy comment mintát. Ez utóbbi úgy működik, hogy amennyiben egy Pull Requesthez ' +
    'a mintára illeszkedő commentet hagysz, a rendszer felismeri, hogy hány pontot adtál a feladatra.';

  public constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private tokenService: TokenService,
    private exportService: ExportService,
    private modalService: NgbModal
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('organizationId');
    this.organizationService.getOrganization(id).subscribe((odm) => this.organization = odm);
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

  public isExportButtonDisabled(): boolean {
    return this.exportButtonDisabled;
  }

  public filterKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.setPrefix();
    }
  }

  public setPrefix(): void {
    const prefix = this.prefixInput.nativeElement.value;
    this.organization.prefix = prefix;
    this.organizationService.saveOrganizationToLocalStorage(this.organization);
  }

  public async fileChanged(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files[0];
    const blob = await this.exportService.createExportBlob(file, this.organization.repositories);
    this.exportButton.nativeElement.href = URL.createObjectURL(blob);
    this.exportButton.nativeElement.download = `${this.organization.name}_export.csv`;
    this.exportButtonDisabled = false;
  }

  public isVisible(repository: RepositoryListModel): boolean {
    return !this.organization.prefix || repository.name.startsWith(this.organization.prefix);
  }

  public areThereTasks(): boolean {
    return this.organization && this.organization.tasks && this.organization.tasks.length !== 0;
  }

  public moveUp(task: TaskModel): void {
    const index = this.organization.tasks.indexOf(task);
    if (index !== 0) {
      const otherTask = this.organization.tasks[index - 1];
      this.organization.tasks[index] = otherTask;
      this.organization.tasks[index - 1] = task;
      this.organizationService.saveOrganizationToLocalStorage(this.organization);
    }
  }

  public moveDown(task: TaskModel): void {
    const index = this.organization.tasks.indexOf(task);
    if (index !== this.organization.tasks.length - 1) {
      const otherTask = this.organization.tasks[index + 1];
      this.organization.tasks[index] = otherTask;
      this.organization.tasks[index + 1] = task;
      this.organizationService.saveOrganizationToLocalStorage(this.organization);
    }
  }

  public removeTask(task: TaskModel): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = `Feladat törlése (${task.name})`;
    modalRef.componentInstance.content = 'Biztos vagy benne, hogy törlöd a feladatot? ' +
      'Ezt a lépést később nem tudod visszavonni.';
    modalRef.componentInstance.confirmButtonText = 'Törlés';
    modalRef.result.then((result: string) => {
      if (result === 'confirm') {
        const index = this.organization.tasks.indexOf(task);
        this.organization.tasks.splice(index, 1);
        this.organizationService.saveOrganizationToLocalStorage(this.organization);
      }
    }).catch(() => { });
  }

  public removeAllTasks(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Összes feladat törlése';
    modalRef.componentInstance.content = 'Biztos vagy benne, hogy az Organization összes feladatát törlöd? ' +
      'Ezt a lépést később nem tudod visszavonni.';
    modalRef.componentInstance.confirmButtonText = 'Törlés';
    modalRef.result.then((result: string) => {
      if (result === 'confirm') {
        this.organization.tasks = [];
        this.organizationService.saveOrganizationToLocalStorage(this.organization);
      }
    }).catch(() => { });
  }

  public openCreateEditTaskModal(task?: TaskModel): void {
    const index = this.organization.tasks.indexOf(task);
    const modalRef = this.modalService.open(CreateEditTaskModalComponent, { size: 'lg' });
    if (task) {
      modalRef.componentInstance.task = Object.assign(new TaskModel(), task);
      modalRef.componentInstance.taskIndex = index;
    }
    modalRef.componentInstance.tasks = this.organization.tasks;
    modalRef.result.then((result: TaskModel) => {
      if (task) {
        this.organization.tasks[index] = result;
      } else {
        this.organization.tasks.push(result);
      }
      this.organizationService.saveOrganizationToLocalStorage(this.organization);
    }).catch(() => { });
  }

}
