import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationListModel } from '../models/organization-list.model';
import { OrganizationDetailedModel } from '../models/organization-detailed.model';
import { RepositoryListModel } from '../models/repository-list.model';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {

    public getOrganizations(): Observable<Array<OrganizationListModel>> {
        //TODO: mock helyett bekötni
        const organizations = new Array<OrganizationListModel>();
        organizations.push(new OrganizationListModel('Szoftvertechnikák 2019 őszi félév', 'sznikak-19F2', 335));
        organizations.push(new OrganizationListModel('Mobil és webes szoftverek 2019 őszi félév', 'mobweb-19F2', 332));
        organizations.push(new OrganizationListModel('Adatvezérelt rendszerek 2019 őszi félév', 'adatvez-19F2', 181));
        organizations.push(new OrganizationListModel('Kliensoldali technológiák 2019 őszi félév', 'klitech-19F2', 147));
        organizations.push(new OrganizationListModel('Szoftverfejlesztés laboratórium 1 2019 őszi félév', 'szoftlab1-19F2', 173));
        organizations.push(new OrganizationListModel('Szoftverfejlesztés laboratórium 2 2019 őszi félév', 'szoftlab2-19F2', 166));
        return of(organizations);
    }

    public getOrganization(id: string): Observable<OrganizationDetailedModel> {
        //TODO: mock helyett bekötni
        const organization = new OrganizationDetailedModel();
        organization.name = 'sznikak-19F2';
        organization.repositories = new Array<RepositoryListModel>();

        const rep1 = new RepositoryListModel();
        rep1.name = 'sznikak-kbela';
        rep1.id = 'sznikak-kbela';
        rep1.branchCount = 8;
        rep1.pointCount = 6;
        organization.repositories.push(rep1);

        const rep2 = new RepositoryListModel();
        rep2.name = 'sznikak-kovjani';
        rep2.id = 'sznikak-kovjani';
        rep2.branchCount = 17;
        rep2.pointCount = 6;
        organization.repositories.push(rep2);

        const rep3 = new RepositoryListModel();
        rep3.name = 'sznikak-markusandras';
        rep3.id = 'sznikak-markusandras';
        rep3.branchCount = 5;
        rep3.pointCount = 1;
        organization.repositories.push(rep3);

        const rep4 = new RepositoryListModel();
        rep4.name = 'sznikak-nagykrisztina';
        rep4.id = 'sznikak-nagykrisztina';
        rep4.branchCount = 2;
        rep4.pointCount = 2;
        organization.repositories.push(rep4);

        const rep5 = new RepositoryListModel();
        rep5.name = 'peldakodok';
        rep5.id = 'peldakodok';
        rep5.branchCount = 14;
        rep5.pointCount = 0;
        organization.repositories.push(rep5);

        const localOrganization = this.loadOrganizationFromLocalStorage(organization.name);
        if (localOrganization && localOrganization.prefix) {
            organization.prefix = localOrganization.prefix;
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
