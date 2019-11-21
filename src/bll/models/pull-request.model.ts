export class PullRequestModel {
    public name: string;
    public branch: string;
    public creationTime: Date;
    public lastCommitTime: Date;
    public taskDeadline: Date;
    public commitCount: number;
    public pointCount: number;

    public isCreationLate(): boolean {
        return this.isLate(this.taskDeadline, this.creationTime);
    }

    public isLastCommitLate(): boolean {
        return this.isLate(this.taskDeadline, this.lastCommitTime);
    }

    private isLate(deadline: Date, date: Date): boolean {
        return !deadline ||
            deadline.getFullYear() < date.getFullYear() ||
            (deadline.getFullYear() === date.getFullYear() &&
                deadline.getMonth() < date.getMonth()) ||
            (deadline.getFullYear() === date.getFullYear() &&
                deadline.getMonth() === date.getMonth() &&
                deadline.getDay() < date.getDay());
    }

    public isCommitCountNotEnough(): boolean {
        return this.commitCount < 2;
    }

    public isEvaluated(): boolean {
        return this.pointCount !== -1;
    }

}
