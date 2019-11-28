import { Injectable } from '@angular/core';
import { OrganizationListModel } from '../models/organization-list.model';
import { OrganizationDetailedModel } from '../models/organization-detailed.model';
import { RepositoryListModel } from '../models/repository-list.model';
import { TaskModel } from '../models/task.model';
import { Deadline } from '../models/deadline.model';
import { RepositoryDetailedModel } from '../models/repository-detailed.model';
import { PullRequestModel } from '../models/pull-request.model';
import { GitHubApiService } from '../../dal/services/github-api.service';
import { CommitDto } from 'src/dal/dtos/commit-dto';
import { CommentDto } from 'src/dal/dtos/comment-dto';
import { OrganizationDto } from 'src/dal/dtos/organization-dto';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {

    public constructor(private githubApiService: GitHubApiService) { }

    public async getOrganizations(): Promise<Array<OrganizationListModel>> {
        const organizationDtoArray = await this.githubApiService.getOrganizations();
        const organizationArray = new Array<OrganizationListModel>();
        this.addOrganizations(organizationArray, organizationDtoArray);
        return organizationArray;
    }

    private addOrganizations(organizationArray: Array<OrganizationListModel>, organizationDtoArray: Array<OrganizationDto>): void {
        for (const organizationDto of organizationDtoArray) {
            const organization = new OrganizationListModel();
            organization.name = organizationDto.login;
            organizationArray.push(organization);
        }
    }

    public async getOrganization(organizationName: string): Promise<OrganizationDetailedModel> {
        const repositoryDtoArray = await this.githubApiService.getRepositories(organizationName);
        const organization = new OrganizationDetailedModel();
        organization.name = organizationName;
        organization.url = `https://www.github.com/${organizationName}`;
        this.addDetailsToOrganizationFromLocalStorage(organization);
        organization.repositories = new Array<RepositoryListModel>();
        for (const repositoryDto of repositoryDtoArray) {
            const repository = new RepositoryListModel();
            repository.name = repositoryDto.name;
            repository.pointCount = await this.getPointCountForRepository(organizationName, repository.name, organization.tasks);
            organization.repositories.push(repository);
        }
        return organization;
    }

    private addDetailsToOrganizationFromLocalStorage(organization: OrganizationDetailedModel): void {
        const localOrganization = this.loadOrganizationFromLocalStorage(organization.name);
        organization.prefix = localOrganization ? localOrganization.prefix : '';
        organization.tasks = localOrganization && localOrganization.tasks ? localOrganization.tasks : new Array<TaskModel>();
    }

    public async getRepository(organizationName: string, repositoryName: string): Promise<RepositoryDetailedModel> {
        const tasks = this.getTasks(organizationName);
        const repository = new RepositoryDetailedModel();
        repository.name = repositoryName;
        repository.organization = organizationName;
        repository.url = `https://www.github.com/${organizationName}/${repositoryName}`;
        repository.pullRequests = new Array<PullRequestModel>();
        const pullRequestDtoArray = await this.githubApiService.getPullRequests(organizationName, repositoryName);
        for (const pullRequestDto of pullRequestDtoArray) {
            const commitDtoArray = await this.githubApiService.getPullRequestCommits(organizationName, repositoryName, pullRequestDto.number);
            const commentDtoArray = await this.githubApiService.getPullRequestComments(organizationName, repositoryName, pullRequestDto.number);
            const pullRequest = new PullRequestModel();
            pullRequest.branch = pullRequestDto.head.ref;
            pullRequest.commitCount = commitDtoArray.length;
            pullRequest.creationTime = new Date(pullRequestDto.created_at);
            pullRequest.lastCommitTime = this.getLatestCommitDate(commitDtoArray);
            pullRequest.name = pullRequestDto.title;
            pullRequest.brachUrl = `https://www.github.com/${organizationName}/${repositoryName}/tree/${pullRequest.branch}`;
            pullRequest.pointCount = -1;
            pullRequest.url = pullRequestDto.html_url;
            for (const task of tasks) {
                const points = this.countPointsForPullrequest(task, commentDtoArray);
                if (points !== -1) {
                    if (task.deadline) {
                        pullRequest.taskDeadline = task.deadline.toDate();
                    }
                    pullRequest.pointCount = points;
                    break;
                }
            }
            repository.pullRequests.push(pullRequest);
        }
        return repository;
    }

    private async getPointCountForRepository(organizationName: string, repositoryName: string, tasks: Array<TaskModel>): Promise<number> {
        let pointCount = 0;
        const pullRequestDtoArray = await this.githubApiService.getPullRequests(organizationName, repositoryName);
        for (const pullRequestDto of pullRequestDtoArray) {
            const commentDtoArray = await this.githubApiService.getPullRequestComments(organizationName, repositoryName, pullRequestDto.number);
            for (const task of tasks) {
                const points = this.countPointsForPullrequest(task, commentDtoArray);
                if (points !== -1) {
                    pointCount += points;
                    break;
                }
            }
        }
        return pointCount;
    }

    private getLatestCommitDate(commitDtoArray: Array<CommitDto>): Date {
        let latestCommitDate: Date;
        for (const commitDto of commitDtoArray) {
            const commitDtoDate = new Date(commitDto.commit.committer.date);
            if (!latestCommitDate || latestCommitDate < commitDtoDate) {
                latestCommitDate = commitDtoDate;
            }
        }
        return latestCommitDate;
    }

    public saveOrganizationToLocalStorage(organization: OrganizationDetailedModel): void {
        const json = JSON.stringify(organization, (k, v) => {
            return k === 'repositories' ? undefined : v;
        });
        window.localStorage.setItem(organization.name, json);
    }

    private getTasks(organizationName: string): Array<TaskModel> {
        const localOrganization = this.loadOrganizationFromLocalStorage(organizationName);
        return localOrganization && localOrganization.tasks ? localOrganization.tasks : new Array<TaskModel>();
    }

    private loadOrganizationFromLocalStorage(name: string): OrganizationDetailedModel {
        const json = window.localStorage.getItem(name);
        const organization: OrganizationDetailedModel = JSON.parse(json);
        if (organization && organization.tasks) {
            for (const task of organization.tasks) {
                if (task.deadline) {
                    task.deadline = Object.assign(new Deadline(), task.deadline);
                }
            }
        }
        return organization;
    }

    private countPointsForPullrequest(task: TaskModel, commentArrayDto: Array<CommentDto>) {
        for (const comment of commentArrayDto) {
            const prefix = task.commentPrefix ? task.commentPrefix : '';
            const postfix = task.commentPostfix ? task.commentPostfix : '';
            if (comment.body.startsWith(prefix) && comment.body.endsWith(postfix)) {
                const points = comment.body.substring(prefix.length, comment.body.length - postfix.length);
                return Number(points);
            }
        }
        return -1;
    }

}
