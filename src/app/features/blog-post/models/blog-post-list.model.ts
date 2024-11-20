import { Category } from "../../category/models/category.model";

export interface BlogPostList {
    id: string;
    title: string;
    shortDescription: string;
    isVisible: boolean;
    categories: Category[];
}