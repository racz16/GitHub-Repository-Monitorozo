import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class HungarianDateLocalization extends NgbDatepickerI18n {

    public getWeekdayShortName(weekday: number): string {
        switch (weekday) {
            case 1: return 'Hét';
            case 2: return 'Kedd';
            case 3: return 'Szer';
            case 4: return 'Csüt';
            case 5: return 'Pén';
            case 6: return 'Szom';
            case 7: return 'Vas';
            default: return '';
        }
    }

    public getMonthShortName(month: number, year?: number): string {
        switch (month) {
            case 1: return 'Jan';
            case 2: return 'Feb';
            case 3: return 'Már';
            case 4: return 'Ápr';
            case 5: return 'Máj';
            case 6: return 'Jún';
            case 7: return 'Júl';
            case 8: return 'Aug';
            case 9: return 'Sze';
            case 10: return 'Okt';
            case 11: return 'Nov';
            case 12: return 'Dec';
            default: return '';
        }
    }

    public getMonthFullName(month: number, year?: number): string {
        switch (month) {
            case 1: return 'Január';
            case 2: return 'Február';
            case 3: return 'Március';
            case 4: return 'Április';
            case 5: return 'Május';
            case 6: return 'Június';
            case 7: return 'Július';
            case 8: return 'Augusztus';
            case 9: return 'Szeptember';
            case 10: return 'Október';
            case 11: return 'November';
            case 12: return 'December';
            default: return '';
        }
    }

    public getDayAriaLabel(date: NgbDateStruct): string {
        return '';
    }

}