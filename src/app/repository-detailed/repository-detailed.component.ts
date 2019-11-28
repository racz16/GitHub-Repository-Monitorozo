import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { RepositoryDetailedModel } from 'src/bll/models/repository-detailed.model';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from 'src/bll/services/organization-service';

@Component({
  selector: 'grm-repository-detailed',
  templateUrl: './repository-detailed.component.html',
  styleUrls: ['./repository-detailed.component.scss']
})
export class RepositoryDetailedComponent implements OnInit {

  public repository: RepositoryDetailedModel;
  public infoTitle = 'Pull requestek';
  public infoContent = 'Itt láthatod a Repositoryhoz érkezett Pull requestek listáját. ' +
    'Amennyiben már pontoztad az adott Pull requestet, a jobb felső sarokban láthatod a pontszámot. ' +
    'Piros szín jelzi, ha egy hallgató nem készült el időre, vagy nem commitolt eleget. ' +
    'Vigyázat, a határidő leteltét csak a Pull request értékelését követően tudja jelezni a rendszer, hiszen csak innen ' +
    'tudhatja, hogy melyik feladathoz tartozik ez a Pull request.';

  public constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private tokenService: TokenService
  ) { }

  public async ngOnInit() {
    this.refresh();
  }

  private getOrganizationName(): string {
    return this.route.snapshot.paramMap.get('organizationName');
  }

  private getRepositoryName(): string {
    return this.route.snapshot.paramMap.get('repositoryName');
  }

  public async refresh(): Promise<void> {
    const organizationName = this.getOrganizationName();
    const repositoryName = this.getRepositoryName();
    this.repository = await this.organizationService.getRepository(organizationName, repositoryName);
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

}
