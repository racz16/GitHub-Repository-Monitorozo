import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../../bll/services/token-service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root',})

export class GetUser{

    apiUrl = 'https://api.github.com/'
    httpOptions = {
        headers: new HttpHeaders({
            'Authorization':'Bearer '+this.tokenservice.getTokenFromLocalStorage()
        })
    };

    public constructor(private tokenservice: TokenService,private httpClient:HttpClient){}

    public GetOrganizations(){
        
        console.log(this.httpOptions)
        return this.httpClient.get(this.apiUrl+"user/orgs",this.httpOptions);
    }

    


}