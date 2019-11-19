import { RepositoryListModel } from './repository-list.model';

export class OrganizationDetailedModel {
    public name: string;
    public prefix: string;
    public repositories: Array<RepositoryListModel>;
}
