import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDetailedModel } from 'src/bll/models/organization-detailed.model';
import { OrganizationService } from 'src/bll/services/organization-service';
import { TokenService } from 'src/bll/services/token-service';
import { ExportService } from 'src/bll/services/export-service';
import { RepositoryListModel } from 'src/bll/models/repository-list.model';

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

  public constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private tokenService: TokenService,
    private exportService: ExportService
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

}
