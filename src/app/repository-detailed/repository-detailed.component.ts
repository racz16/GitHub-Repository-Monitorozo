import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { RepositoryDetailedModel } from 'src/bll/models/repository-detailed.model';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from 'src/bll/services/organization-service';
import { TaskModel } from 'src/bll/models/task.model';

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

  public ngOnInit() {
    const organizationId = this.route.snapshot.paramMap.get('organizationId');
    const repositoryId = this.route.snapshot.paramMap.get('repositoryId');
    this.organizationService.getRepository(organizationId, repositoryId).subscribe((rdm) => this.repository = rdm);
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

}
