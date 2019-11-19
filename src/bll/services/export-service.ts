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
        const rows = importFileContent.split(ExportService.NEW_LINE);
        rows.splice(0, 1);
        const repositoryNeptunCodeMap = new Map<string, string>();
        for (const row of rows) {
            const splitRow = row.split(';');
            const neptunCode = splitRow[0];
            const repository = splitRow[1];
            repositoryNeptunCodeMap.set(repository, neptunCode);
        }
        let result = 'Neptun-kód;Pontszám' + ExportService.NEW_LINE;
        for (const repository of repositories) {
            const neptunCode = repositoryNeptunCodeMap.get(repository.name);
            if (neptunCode) {
                result += `${neptunCode};${repository.pointCount}${ExportService.NEW_LINE}`;
            }
        }
        return result;
    }

}
