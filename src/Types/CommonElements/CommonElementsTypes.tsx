export interface PropsTypes  {
    headClass?: string;
    title: string;
    titleClass?: string;
    firstItem?: string;
    secondItem?: string;
    thirdItem?: string;
    mainTitle?: boolean;
    subClass?:string
};

export interface CardHeaderDropDownProps {
    firstItem: string | undefined;
    secondItem: string | undefined;
    thirdItem: string | undefined;
    mainTitle?: boolean | undefined;
    menuTitle?:string | undefined | JSX.Element
}