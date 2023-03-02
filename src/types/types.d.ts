import { OutputData } from "@editorjs/editorjs";

export type Author = {
    name: string;
    email: string;
    date: string;
    address: string;
    description: string;
    img: string;
    articles?: ArticleType[];
    findName?: string
};

export type ArticleType = {
    authorAddress: string;
    authorName: string;
    authorDesc: string;
    authorImg: string;
    title: string;
    content: OutputData | undefined;
    coverImg: string;
    readTime: number;
    createdAt: string;
    id: string;
    likes: number;
    price: number;
}

export type ArticleForIPFS = {
    authorAddress: string;
    authorName: string;
    authorDesc: string;
    authorImg: string;
    title: string;
    content: string;
    coverImg: string;
    readTime: number;
    createdAt: string;
    id: string;
    likes: number;
    price: number;
}
