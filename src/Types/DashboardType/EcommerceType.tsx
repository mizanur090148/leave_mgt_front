export interface TopSellsType {
    class: string;
    title: string;
    image: string;
    count: string;
    icon: string;
    color: string;
    percentage: string;
    detail: string;
    chartId: string;
    chart: ApexCharts.ApexOptions;
}

export interface DealOfTheDayType {
    days:number
    hours:number
    minutes:number
    seconds:number
    completed:boolean
}