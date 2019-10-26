import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected title = 'GitHubRepositoryMonitorozo';
  private array = new Array<string>();

  public get asd(): string {
    return this.title;
  }

  public constructor(ro: Router) {
    const a = 5;
  }

  public getTitle(asd: string): string {
    const a = 2;
    for (let i = 0; i < this.array.length; i++) {
      this.array[a * i] = 'asd';
    }

    // asd = 'asd';
    return this.title;
  }

}
