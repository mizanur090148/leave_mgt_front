import { DailyOrders, DailyRevenue, Desktop, Href, Keyboard, Laptops, Mouse, OrdersValue, TotalSell } from "../../utils/Constant";
import { admissionRatioChart, dailyOrderChart, dailyRevenueChart, orderValueChart } from "./DefaultChartData";

export const topSellData = [
    {
        class:"total-sells",
        title:TotalSell,
        image:"coin1.png",
        count:"12,463",
        icon:"fa-arrow-up",
        color:"success",
        percentage:"+ 20.08%",
        detail:"Compared to Jan 2024",
        chartId:"admissionRatio",
        chart:admissionRatioChart
    },
    {
        class:"total-sells-2",
        title:OrdersValue,
        image:"shopping1.png",
        count:"78,596",
        icon:"fa-arrow-down",
        color:"danger",
        percentage:"-   10.02%",
        detail:"Compared to Aug 2024",
        chartId:"order-value",
        chart:orderValueChart
    },
    {
        class:"total-sells-3",
        title:DailyOrders,
        image:"sent1.png",
        count:"95,789",
        icon:"fa-arrow-up",
        color:"success",
        percentage:"+ 13.23%",
        detail:"Compared to may 2024",
        chartId:"daily-value",
        chart:dailyOrderChart
    },
    {
        class:"total-sells-4",
        title:DailyRevenue,
        image:"sent1.png",
        count:"95,789",
        icon:"fa-arrow-down",
        color:"danger",
        percentage:"- 17.06%",
        detail:"Compared to july 2024",
        chartId:"daily-revenue",
        chart:dailyRevenueChart
    }
]

export const recentCustomerData = [
    {
        image:"1.png",
        link:Href,
        name:"Junsung Park",
        id:"32449",
        status:"Paid",
        color:"success",
        amount:"8282.13",
        time:"50 min ago"
    },
    {
        image:"2.png",
        link:Href,
        name:"Yongjae Choi",
        id:"95460",
        status:"Pending",
        color:"danger",
        amount:"9546.84",
        time:"34 min ago"
    },
    {
        image:"3.png",
        link:Href,
        name:"Seonil Jang",
        id:"95468",
        status:"Paid",
        color:"success",
        amount:"2354.16",
        time:"30 min ago"
    },
    {
        image:"4.png",
        link:Href,
        name:"Joohee Min",
        id:"95462",
        status:"Pending",
        color:"danger",
        amount:"3254.35",
        time:"25 min ago"
    },
    {
        image:"5.png",
        link:Href,
        name:"Soojung Kin",
        id:"34586",
        status:"Paid",
        color:"success",
        amount:"3654.32",
        time:"23 min ago"
    }
]

export const userContinentData =[
    {
        title:Keyboard,
        number:"651",
        color:"primary"
    },
    {
        title:Laptops,
        number:"345",
        color:"secondary"
    },
    {
        title:Desktop,
        number:"654",
        color:"warning"
    },
    {
        title:Mouse,
        number:"954",
        color:"tertiary"
    },
]

export const allOverCountriesData = [
    {
        color:"primary",
        title:"United States",
        percentage:"53.23%"
    },
    {
        color:"secondary",
        title:"Romania",
        percentage:"31.85%"
    },
    {
        color:"warning",
        title:"Austalia",
        percentage:"12.98%"
    },
    {
        color:"tertiary",
        title:"Germany",
        percentage:"45.23%"
    },
    {
        color:"success",
        title:"Africa",
        percentage:"23.15%"
    },
    {
        color:"danger",
        title:"Europe",
        percentage:"95.75%"
    }
]

export const sliderImgData = ["1", "2", "3"]

export const topSellerTableData = [
    {
        image:"9.png",
        name:"Gary Waters",
        link:Href,
        brand:"Adidas",
        product:"Clothes",
        sold:"650",
        price:"$37.50",
        earning:"$24375"
    },
    {
        image:"10.png",
        name:"Edwin Hogan",
        link:Href,
        brand:"Nike",
        product:"Shoes",
        sold:"956",
        price:"$24.75",
        earning:"$23661"
    },
    {
        image:"11.png",
        name:"Aaron Hogan",
        link:Href,
        brand:"Sony",
        product:"Electronics",
        sold:"348",
        price:"$184.50",
        earning:"$64206"
    },
    {
        image:"12.png",
        name:"Ralph Waters",
        link:Href,
        brand:"i Phone",
        product:"Mobile",
        sold:"100",
        price:"$150.25",
        earning:"$15025"
    },
    {
        image:"9.png",
        name:"Gary Waters",
        link:Href,
        brand:"Adidas",
        product:"Clothes",
        sold:"650",
        price:"$37.50",
        earning:"$24375"
    },
]

export const recentOrdersData = [
    {
        image:"1.png",
        order:"Decorative Plants",
        date:"20 Sep - 03.00AM",
        quantity:"12",
        image1:"6.png",
        name:"Leonie Green",
        amount:"637.30",
        status:"Succeed",
        color:"success"
    },
    {
        image:"2.png",
        order:"Sticky Calender",
        date:"12 Mar - 08.12AM",
        quantity:"14",
        image1:"8.png",
        name:"Peter White",
        amount:"637.30",
        status:"Waiting",
        color:"warning"
    },
    {
        image:"3.png",
        order:"Crystal Mug",
        date:"Feb 15 - 10.00AM",
        quantity:"19",
        image1:"7.png",
        name:"Ruby Yang",
        amount:"637.30",
        status:"Succeed",
        color:"success"
    },
    {
        image:"4.png",
        order:"Motion Table Lamp",
        date:"Jun 10 - 12.30AM",
        quantity:"17",
        image1:"8.png",
        name:"Visha Long",
        amount:"637.30",
        status:"Canceled",
        color:"danger"
    },
    {
        image:"2.png",
        order:"Sticky Calender",
        date:"12 Mar - 08.12AM",
        quantity:"14",
        image1:"8.png",
        name:"Peter White",
        amount:"637.30",
        status:"Waiting",
        color:"warning"
    }
]