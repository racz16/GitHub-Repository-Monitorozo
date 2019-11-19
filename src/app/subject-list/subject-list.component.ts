import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { OrganizationListModel } from 'src/bll/models/organization-list.model';
import { OrganizationService } from 'src/bll/services/organization-service';

@Component({
  selector: 'grm-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  public organizations: Array<OrganizationListModel>;

  public constructor(private tokenService: TokenService, private organizationService: OrganizationService) { }

  public ngOnInit() {
    this.organizationService.getOrganizations().subscribe((olm) => this.organizations = olm);
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

}
