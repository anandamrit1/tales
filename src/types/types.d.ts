
export type Author = {
    name: string;
    email: string;
    date: string;
    address: string;
    description: string;
    img: string;
    articles: Article[];
};

export type Article = {
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
}
