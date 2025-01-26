export interface WebsiteDesignType {
    class: string;
    title: string;
    img: string;
    link: string;
    header: string;
    email: string;
    btn: {
        color: string;
        btnName: string;
    }[];
    ratting: RattingType[]
    task: string;
    color: string;
    value: string;
}

export interface RattingType{
    total: string;
    detail: string;
}