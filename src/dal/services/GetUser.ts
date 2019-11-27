import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from '../../bll/services/token-service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root',})

export class GetUser{

    apiUrl = 'https://api.github.com/'

    public constructor(private tokenservice: TokenService,private httpClient:HttpClient){
        
    }
    public GetOrganizations(){
    
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':'Bearer '+this.tokenservice.getTokenFromLocalStorage()
            })
        };
        console.log(httpOptions)
        return this.httpClient.get(this.apiUrl+"user/orgs",httpOptions);
       
    }
}