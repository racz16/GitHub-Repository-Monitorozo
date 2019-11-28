import { Injectable } from '@angular/core';
import { RepositoryListModel } from '../models/repository-list.model';

@Injectable({
    providedIn: 'root',
})
export class ExportService {

    private static readonly NEW_LINE = '\r\n';

    public async createExportBlob(importFile: File, repsitories: Array<RepositoryListModel>): Promise<Blob> {
        return new Promise<Blob>((resolve: (blob: Blob) => void) => {
            const fileReader = new FileReader();
            fileReader.onload = (ev: ProgressEvent) => {
                const importFileContent = (ev.target as FileReader).result as string;
                const exportFileContent = this.createExportFieContent(importFileContent, repsitories);
                const blob = new Blob([exportFileContent], { type: 'text/csv' });
                resolve(blob);
            };
            fileReader.readAsText(importFile);
        });
    }

    private createExportFieContent(importFileContent: string, repositories: Array<RepositoryListModel>): string {
        const repositoryNeptunMap = this.createRepositoryNeptunMapFromImortFile(importFileContent);
        let result = 'Neptun-kód;Pontszám' + ExportService.NEW_LINE;
        for (const repository of repositories) {
            const neptunCode = repositoryNeptunMap.get(repository.name);
            result += `${neptunCode};${repository.pointCount}${ExportService.NEW_LINE}`;
        }
        return result;
    }

    private createRepositoryNeptunMapFromImortFile(importFileContent: string): Map<string, string> {
        const rows = importFileContent.split(ExportService.NEW_LINE);
        rows.splice(0, 1);
        const repositoryNeptunMap = new Map<string, string>();
        for (const row of rows) {
            const splitRow = row.split(';');
            const neptunCode = splitRow[0];
            const repository = splitRow[1];
            if (repository && neptunCode) {
                repositoryNeptunMap.set(repository, neptunCode);
            }
        }
        return repositoryNeptunMap;
    }

}
