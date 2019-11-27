import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../bll/services/token-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })

export class GetUser {

    apiUrl = 'https://api.github.com/'
    httpOptions = {
        headers: new HttpHeaders({
            'Authorization':'Bearer '+this.tokenservice.getTokenFromLocalStorage()
        })
    };

    public constructor(private tokenservice: TokenService,private httpClient:HttpClient){}

    public GetOrganizations(){
        return this.httpClient.get(this.apiUrl+"user/orgs",this.httpOptions);
    }

    public GetRepositories(organization: string){
        return this.httpClient.get(this.apiUrl+"orgs/"+organization+"/repos",this.httpOptions);
    }

    public GetPullRequests(owner: string,repository: string){
        return this.httpClient.get(this.apiUrl+"repos/"+owner+"/"+repository+"/issues",this.httpOptions);
    }

    public GetPullRequestComments(owner: string,repository: string,number:string){
        return this.httpClient.get(this.apiUrl+"repos/"+owner+"/"+repository+"/issues/"+number+"/comments",this.httpOptions);
    }

    public GetPullRequestCommits(owner: string,repository: string,number:string){
        return this.httpClient.get(this.apiUrl+"repos/"+owner+"/"+repository+"/pulls/"+number+"/commits",this.httpOptions);
    }
}