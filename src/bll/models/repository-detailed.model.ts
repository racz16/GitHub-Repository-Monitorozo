import { PullRequestModel } from './pull-request.model';

export class RepositoryDetailedModel {
    public name: string;
    public url: string;
    public organization: string;
    public pullRequests: Array<PullRequestModel>;

    public getTotalPointCount(): number {
        let totalPointCount = 0;
        for (const pr of this.pullRequests) {
            if (pr.isEvaluated()) {
                totalPointCount += pr.pointCount;
            }
        }
        return totalPointCount;
    }

}
