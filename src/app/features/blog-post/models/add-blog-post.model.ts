export interface AddBlogPost {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  author: string | undefined;
  publishedDate: Date;
  isVisible: boolean;
  categories: string[];
}
