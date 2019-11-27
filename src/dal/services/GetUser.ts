import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../bll/services/token-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })

export class GetUser {

    apiUrl = 'https://api.github.com/'

    public constructor(private tokenservice: TokenService, private httpClient: HttpClient) {

    }
    public GetOrganizations(): Observable<Array<any>> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.tokenservice.getTokenFromLocalStorage()
            })
        };
        console.log(httpOptions)
        return this.httpClient.get<Array<any>>(this.apiUrl + "user/orgs", httpOptions);

    }
}