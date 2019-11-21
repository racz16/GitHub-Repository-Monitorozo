export class Deadline {

    public year: number;
    public month: number;
    public day: number;

    public constructor() {
        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDay();
    }

    public toDate(): Date {
        return new Date(this.year, this.month - 1, this.day);
    }

}
