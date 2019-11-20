import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { OrganizationListModel } from 'src/bll/models/organization-list.model';
import { OrganizationService } from 'src/bll/services/organization-service';

@Component({
  selector: 'grm-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  public organizations: Array<OrganizationListModel>;
  public infoTitle = 'Organization lista';
  public infoContent = 'A rendszerben minden tantárgyat egy GitHub Organization jelképez. ' +
    'Az Organization-ön belül minden hallgatónak létre kell hoznia egy Repositoryt a projektje számára.';

  public constructor(
    private tokenService: TokenService,
    private organizationService: OrganizationService
  ) { }

  public ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((olm) => this.organizations = olm);
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

}
