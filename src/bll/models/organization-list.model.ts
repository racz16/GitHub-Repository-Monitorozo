export class OrganizationListModel {

    public name: string;
    public repositoryCount: number;

    public constructor(name: string, repositoryCount: number) {
        this.name = name;
        this.repositoryCount = repositoryCount;
    }

}
