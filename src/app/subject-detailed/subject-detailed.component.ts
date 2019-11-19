import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDetailedModel } from 'src/bll/models/organization-detailed.model';
import { OrganizationService } from 'src/bll/services/organization-service';
import { TokenService } from 'src/bll/services/token-service';
import { ExportService } from 'src/bll/services/export-service';
import { RepositoryListModel } from 'src/bll/models/repository-list.model';

@Component({
  selector: 'grm-subject-detailed',
  templateUrl: './subject-detailed.component.html',
  styleUrls: ['./subject-detailed.component.scss']
})
export class SubjectDetailedComponent implements OnInit {

  @ViewChild('prefixInput', { static: false })
  public prefixInput: ElementRef<HTMLInputElement>;
  @ViewChild('exportButton', { static: false })
  public exportButton: ElementRef<HTMLAnchorElement>;
  public organization: OrganizationDetailedModel;
  private exportButtonDisabled = true;

  public constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private tokenService: TokenService,
    private exportService: ExportService
  ) { }

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.organizationService.getOrganization(id).subscribe((odm) => {
      this.organization = odm;
    });
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

  public isExportButtonDisabled(): boolean {
    return this.exportButtonDisabled;
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
    this.exportButton.nativeElement.download = 'export.csv';
    this.exportButtonDisabled = false;
  }

  public isVisible(repository: RepositoryListModel): boolean {
    return !this.organization.prefix || repository.name.startsWith(this.organization.prefix);
  }

}
