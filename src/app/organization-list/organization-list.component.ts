import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';
import { OrganizationListModel } from 'src/bll/models/organization-list.model';
import { OrganizationService } from 'src/bll/services/organization-service';
import { GetUser } from 'src/dal/services/GetUser';

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
    private organizationService: OrganizationService,
    private getuser: GetUser

  ) { 
    
    getuser.GetOrganizations().subscribe(resp=>{
      console.log(resp)
    })
    getuser.GetRepositories("hfclassroomtest").subscribe(resp=>{
      console.log(resp)
    })

    getuser.GetPullRequests("hfclassroomtest","test-repo").subscribe(resp=>{
      console.log(resp)
    })

   /* getuser.GetPullRequestComments("hfclassroomtest","test-repo","2").subscribe(resp=>{
      console.log(resp)
    })

    /*getuser.GetPullRequestCommits("hfclassroomtest","test-repo","3").subscribe(resp=>{
      console.log(resp)
    })*/
    
    console.log(this.organizationService.countPointsForPullrequest("3","Pont: ","","hfclassroomtest","test-repo"))
    console.log(this.organizationService.countTotalPoints("Pont: ","","hfclassroomtest","test-repo"))
  }

  public async ngOnInit(): Promise<void> {
    this.organizations = await this.organizationService.getOrganizations();
  }

  public isThereToken(): boolean {
    return this.tokenService.isTokenSavedInLocalStorage();
  }

}
