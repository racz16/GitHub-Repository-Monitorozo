import { RepositoryListModel } from './repository-list.model';
import { Task } from './task.model';

export class OrganizationDetailedModel {
    public name: string;
    public prefix: string;
    public repositories: Array<RepositoryListModel>;
    public tasks: Array<Task>;
}
