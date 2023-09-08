export interface Faq {
    id: number;
    question: string;
    answer: string;
}

export type Data = Faq[] | { message: string }