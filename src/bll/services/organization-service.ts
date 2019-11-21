import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationListModel } from '../models/organization-list.model';
import { OrganizationDetailedModel } from '../models/organization-detailed.model';
import { RepositoryListModel } from '../models/repository-list.model';
import { Task } from '../models/task.model';
import { Deadline } from '../models/deadline.model';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {

    public getOrganizations(): Observable<Array<OrganizationListModel>> {
        //TODO: mock helyett bekötni
        const organizations = new Array<OrganizationListModel>();
        organizations.push(new OrganizationListModel('Sznikak-19F1', 335));
        organizations.push(new OrganizationListModel('MobWeb-19F2', 332));
        organizations.push(new OrganizationListModel('Adatvez-19F2', 181));
        organizations.push(new OrganizationListModel('Klitech-19F1', 147));
        organizations.push(new OrganizationListModel('SzoftLab1-19F1', 173));
        organizations.push(new OrganizationListModel('SzoftLab2-19F2', 166));
        return of(organizations);
    }

    public getOrganization(id: string): Observable<OrganizationDetailedModel> {
        //TODO: mock helyett bekötni
        const organization = new OrganizationDetailedModel();
        organization.name = 'Sznikak-19F2';
        organization.repositories = new Array<RepositoryListModel>();
        organization.tasks = new Array<Task>();

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
