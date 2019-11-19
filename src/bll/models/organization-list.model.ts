export class OrganizationListModel {

    public name: string;
    public id: string;
    public repositoryCount: number;

    public constructor(name: string, id: string, repositoryCount: number) {
        this.name = name;
        this.id = id;
        this.repositoryCount = repositoryCount;
    }

}
