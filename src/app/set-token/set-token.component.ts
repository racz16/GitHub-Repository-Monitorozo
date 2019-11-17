import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TokenService } from 'src/bll/services/token-service';

@Component({
  selector: 'grm-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.scss']
})
export class SetTokenComponent implements OnInit {

  @Input()
  public removeTokenButton = true;
  @ViewChild('tokenTextArea', { static: false })
  public tokenTextArea: ElementRef;
  public token: string;

  public constructor(private tokenService: TokenService) { }

  public ngOnInit() {
    this.refreshToken();
  }

  public setToken(): void {
    this.token = (this.tokenTextArea.nativeElement as HTMLTextAreaElement).value;
    this.tokenService.saveTokenToLocalStorage(this.token);
  }

  public removeToken(): void {
    this.tokenService.removeTokenFromLocalStorage();
    this.refreshToken();
  }

  public disableRemoveTokenButton(): boolean {
    return !this.tokenService.isTokenSavedInLocalStorage();
  }

  private refreshToken(): void {
    this.token = this.tokenService.getTokenFromLocalStorage();
  }

}