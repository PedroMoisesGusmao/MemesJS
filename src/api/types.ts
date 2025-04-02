export interface GetMeme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface PostMeme {
    id: string,
    text: string[]
}