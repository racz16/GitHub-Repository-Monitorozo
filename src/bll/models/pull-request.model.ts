export class PullRequestModel {
    public name: string;
    public url: string;
    public branch: string;
    public brachUrl: string;
    public creationTime: Date;
    public lastCommitTime: Date;
    public taskDeadline: Date;
    public commitCount: number;
    public pointCount: number;

    public isCreationLate(): boolean {
        return this.taskDeadline && this.taskDeadline < this.creationTime;
    }

    public isLastCommitLate(): boolean {
        return this.taskDeadline && this.taskDeadline < this.lastCommitTime;
    }

    public isCommitCountNotEnough(): boolean {
        return this.commitCount < 2;
    }

    public isEvaluated(): boolean {
        return this.pointCount !== -1;
    }

}
