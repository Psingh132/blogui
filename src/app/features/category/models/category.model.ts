import { Topic } from "src/app/shared/models/topic.model";

export interface Category {
    id: string;
    name: string;
    urlHandle: string;
    topic: Topic
}