import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class HungarianDateFormatter extends NgbDateParserFormatter {

    public parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('.');
            return {
                year: this.stringToNumber(dateParts[0]),
                month: this.stringToNumber(dateParts[1]),
                day: this.stringToNumber(dateParts[2]),
            };
        }
        return null;
    }

    public format(date: NgbDateStruct): string {
        return date ?
            `${this.numberToString(date.year)}.${this.numberToString(date.month)}.${this.numberToString(date.day)}.` :
            null;
    }

    private numberToString(num: number): string {
        return num < 10 ? '0' + num : '' + num;
    }

    private stringToNumber(str: string): number {
        return str.startsWith('0') ? Number(str.substring(1)) : Number(str);
    }

}
