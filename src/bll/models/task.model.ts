import { Deadline } from './deadline.model';

export class TaskModel {
    public name: string;
    public deadline: Deadline;
    public commentPrefix: string;
    public commentPostfix: string;
}
