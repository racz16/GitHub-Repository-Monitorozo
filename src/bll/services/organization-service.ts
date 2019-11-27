import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationListModel } from '../models/organization-list.model';
import { OrganizationDetailedModel } from '../models/organization-detailed.model';
import { RepositoryListModel } from '../models/repository-list.model';
import { TaskModel } from '../models/task.model';
import { Deadline } from '../models/deadline.model';
import { RepositoryDetailedModel } from '../models/repository-detailed.model';
import { PullRequestModel } from '../models/pull-request.model';
import { GetUser } from 'src/dal/services/GetUser';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {

    public constructor(private getUser: GetUser) {

    }

    public async getOrganizations(): Promise<Array<OrganizationListModel>> {
        const result = await this.getUser.GetOrganizations().toPromise();
        const organizations = new Array<OrganizationListModel>();
        for (const organization of result) {
            //TODO: repok számát vagy lekérni vagy törölni
            organizations.push(new OrganizationListModel(organization.login, 0));
        }
        return organizations;
    }

    public getOrganization(organizationName: string): Observable<OrganizationDetailedModel> {
        //TODO: mock helyett bekötni
        const organization = new OrganizationDetailedModel();
        organization.name = 'Sznikak-19F2';
        organization.repositories = new Array<RepositoryListModel>();
        organization.tasks = new Array<TaskModel>();

        const rep1 = new RepositoryListModel();
        rep1.name = 'sznikak-kbela';
        rep1.pointCount = 6;
        organization.repositories.push(rep1);

        const rep2 = new RepositoryListModel();
        rep2.name = 'sznikak-kovjani';
        rep2.pointCount = 6;
        organization.repositories.push(rep2);

        const rep3 = new RepositoryListModel();
        rep3.name = 'sznikak-markusandras';
        rep3.pointCount = 1;
        organization.repositories.push(rep3);

        const rep4 = new RepositoryListModel();
        rep4.name = 'sznikak-nagykrisztina';
        rep4.pointCount = 2;
        organization.repositories.push(rep4);

        const rep5 = new RepositoryListModel();
        rep5.name = 'peldakodok';
        rep5.pointCount = 0;
        organization.repositories.push(rep5);

        const localOrganization = this.loadOrganizationFromLocalStorage(organization.name);
        if (localOrganization) {
            organization.prefix = localOrganization.prefix;
            organization.tasks = localOrganization.tasks;
            for (const task of organization.tasks) {
                if (task.deadline) {
                    task.deadline = Object.assign(new Deadline(), task.deadline);
                }
            }
        }

        return of(organization);
    }

    public getRepository(organizationName: string, repositoryName: string): Observable<RepositoryDetailedModel> {
        const repository = new RepositoryDetailedModel();
        repository.name = 'sznikak-kbela';
        repository.organization = 'Sznikak-19F2';
        repository.pullRequests = new Array<PullRequestModel>();
        for (let i = 1; i < 7; i++) {
            const pr = new PullRequestModel();
            pr.name = `${i}. feladat PR`;
            pr.branch = `${i}-feladat-brach`;
            pr.commitCount = i;
            pr.pointCount = 5 - i;
            pr.creationTime = new Date();
            pr.lastCommitTime = new Date();
            pr.taskDeadline = new Date();
            if (i === 2) {
                pr.taskDeadline = new Date(2019, 10, 20);
            }
            repository.pullRequests.push(pr);
        }
        return of(repository);
    }

    public saveOrganizationToLocalStorage(organization: OrganizationDetailedModel): void {
        const json = JSON.stringify(organization, (k, v) => {
            return k === 'repositories' ? undefined : v;
        });
        window.localStorage.setItem(organization.name, json);
    }

    private loadOrganizationFromLocalStorage(name: string): OrganizationDetailedModel {
        const json = window.localStorage.getItem(name);
        return JSON.parse(json);
    }

}
