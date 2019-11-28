import { RepositoryListModel } from './repository-list.model';
import { TaskModel } from './task.model';

export class OrganizationDetailedModel {
    public name: string;
    public url: string;
    public prefix: string;
    public repositories: Array<RepositoryListModel>;
    public tasks: Array<TaskModel>;
}
