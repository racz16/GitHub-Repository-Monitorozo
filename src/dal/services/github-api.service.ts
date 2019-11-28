import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../bll/services/token-service';
import { Injectable } from '@angular/core';
import { OrganizationDto } from '../dtos/organization-dto';
import { RepositoryDto } from '../dtos/repository-dto';
import { PullRequestDto } from '../dtos/pull-request-dto';
import { CommitDto } from '../dtos/commit-dto';
import { CommentDto } from '../dtos/comment-dto';

@Injectable({ providedIn: 'root', })

export class GitHubApiService {

    private apiUrl = 'https://api.github.com';

    public constructor(private tokenservice: TokenService, private httpClient: HttpClient) { }

    public async getOrganizations(): Promise<Array<OrganizationDto>> {
        const header = this.createAuthorizationHeader();
        return this.httpClient
            .get<Array<OrganizationDto>>(`${this.apiUrl}/user/orgs`, header)
            .toPromise();
    }

    public async getRepositories(organizationName: string): Promise<Array<RepositoryDto>> {
        const header = this.createAuthorizationHeader();
        return this.httpClient
            .get<Array<RepositoryDto>>(`${this.apiUrl}/orgs/${organizationName}/repos`, header)
            .toPromise();
    }

    public async getPullRequests(owner: string, repositoryName: string): Promise<Array<PullRequestDto>> {
        const header = this.createAuthorizationHeader();
        return this.httpClient
            .get<Array<PullRequestDto>>(`${this.apiUrl}/repos/${owner}/${repositoryName}/pulls`, header)
            .toPromise();
    }

    public async getPullRequestComments(owner: string, repository: string, pullNumber: number): Promise<Array<CommentDto>> {
        const header = this.createAuthorizationHeader();
        return this.httpClient
            .get<Array<CommentDto>>(`${this.apiUrl}/repos/${owner}/${repository}/issues/${pullNumber}/comments`, header)
            .toPromise();
    }

    public async getPullRequestCommits(owner: string, repositoryName: string, pullNumber: number): Promise<Array<CommitDto>> {
        const header = this.createAuthorizationHeader();
        return this.httpClient
            .get<Array<CommitDto>>(`${this.apiUrl}/repos/${owner}/${repositoryName}/pulls/${pullNumber}/commits`, header)
            .toPromise();
    }

    private createAuthorizationHeader() {
        return {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.tokenservice.getTokenFromLocalStorage()
            })
        };
    }

}
