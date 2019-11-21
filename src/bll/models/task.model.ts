import { Deadline } from './deadline.model';

export class Task {
    public name: string;
    public deadline: Deadline;
    public commentPrefix: string;
    public commentPostfix: string;
}
