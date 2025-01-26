import moment from "moment"
import { WebsiteDesignType } from "../../Types/DashboardType/ProjectType"
import { CryptoDashboard, DeliveryFoodApp, Href, NFTillustrationPackage, PodcastWebdesign, PodcastlandingPage, SocialPostDesign, WebsiteDesign } from "../../utils/Constant"
import { radialChart_1, radialChart_2, radialChart_3, radialChart_4 } from "./DefaultChartData"

export const projectStatusData = [
    {
        img:"calendar.png",
        title:"Upcomings",
        detail:"5 Projects",
        color:"primary"
    },
    {
        img:"processing.png",
        title:"Completed",
        detail:"27 Projects",
        color:"secondary"
    },
    {
        img:"calendar.png",
        title:"In Progress",
        detail:"13 Projects",
        color:"warning",
        class:"mb-0"
    },{
        img:"total.png",
        title:"Total",
        detail:"47 Projects",
        color:"tertiary",
        class:"mb-0"
    }
]

export const recentTableBodyData = [
    {
        name:"Behance Post",
        images:[
            {
                img:"1.png"
            },
            {
                img:"2.png"
            },
            {
                img:""
            }
        ],
        date:"05Jan23",
        endDate:"12Jan23",
        chartId:"widgetsChart1",
        option: radialChart_1,
        link:Href
    },
    {
        name:"Figma Design",
        images:[
            {
                img:"4.png"
            },
            {
                img:"6.png"
            },
            {
                img:"5.png"
            }
        ],
        date:"11Feb23",
        endDate:"24Feb23",
        chartId:"widgetsChart2",
        option: radialChart_2,
        link:Href
    },
    {
        name:"Web Page",
        images:[
            {
                img:"7.png"
            },
            {
                img:"8.png"
            },
            {
                img:""
            }
        ],
        date:"17Mar23",
        endDate:"08Mar23",
        chartId:"widgetsChart3",
        option: radialChart_3,
        link:Href
    },
    {
        name:"CRM Admin",
        images:[
            {
                img:"12.png"
            },
            {
                img:"11.png"
            },
            {
                img:"12.png"
            }
        ],
        date:"05Sep23",
        endDate:"13Sep23",
        chartId: "widgetsChart4",
        option: radialChart_4,
        link:Href
    }
]

export const totalProjectData=[
    {
        color:"primary",
        title:"Completed"
    },
    {
        color:"secondary",
        title:"In Progress"
    },
    {
        color:"warning",
        title:"Terminated"
    },
]

export const clientActivityTableData =[ 
    {
        img:"1.png",
        link:Href,
        title:"Redesign Layout",
        name:"Anna Catmire",
        date:"Sep 20 - Oct 26",
        images:[
            "1.png","12.png","3.png",""
        ],
        type:"UI/UX Design",
        progressValue:"40",
        color:"primary"
    },
    {
        img:"2.png",
        link:Href,
        title:"Login & Sign Up Ui",
        name:"John Elliot",
        date:"Mar 16 - Apr 10",
        images:[
            "4.png","5.png","6.png"
        ],
        type:"Designer",
        progressValue:"70",
        color:"secondary"
    },
    {
        img:"3.png",
        link:Href,
        title:"Redesign CRM",
        name:"Ashley Hart",
        date:"May 09 - Jun 02",
        images:[
            "7.png","8.png","9.png",""
        ],
        type:"UI/UX Design",
        progressValue:"50",
        color:"warning"
    },
    {
        img:"4.png",
        link:Href,
        title:"Front-End Website",
        name:"Dana Lemon",
        date:"Jul 12 - Aug 20",
        images:[
            "10.png","11.png","12.png"
        ],
        type:"Developer",
        progressValue:"50",
        color:"tertiary"
    },
    {
        img:"2.png",
        link:Href,
        title:"Login & Sign Up Ui",
        name:"John Elliot",
        date:"Mar 16 - Apr 10",
        images:[
            "4.png","5.png","6.png"
        ],
        type:"Designer",
        progressValue:"70",
        color:"secondary"
    }
]

export const websiteDesignData:WebsiteDesignType[] = [
    {
        class:"proorder-md-7",
        title:WebsiteDesign,
        img:"16.png",
        link:Href,
        header:"Square Dashboard",
        email:"karson123@gmail.com",
        btn:[
            {
                color:"primary",
                btnName:"UX Design"
            },
            {
                color:"secondary",
                btnName:"3D Deisgn"
            }
        ],
        ratting:[
            {
                total:"12",
                detail:"Issues"
            },
            {
                total:"5",
                detail:"Resolved"
            },
            {
                total:"7",
                detail:"Comment"
            }
        ],
        task:"6",
        color:"primary",
        value:"50"
    },
    {
        class:"proorder-md-8",
        title:SocialPostDesign,
        img:"18.png",
        link:Href,
        header:"Cronin Lewis",
        email:"cronin324@gmail.com",
        btn:[
            {
                color:"primary",
                btnName:"Illustration"
            },
            {
                color:"warning",
                btnName:"Video Editing"
            }
        ],
        ratting:[
            {
                total:"10",
                detail:"Issues"
            },
            {
                total:"9",
                detail:"Resolved"
            },
            {
                total:"5",
                detail:"Comment"
            }
        ],
        task:"4",
        color:"secondary",
        value:"40"
    },
    {
        class:"proorder-md-9",
        title:PodcastWebdesign,
        img:"17.png",
        link:Href,
        header:"Rau Foster",
        email:"raufoster23@gmail.com",
        btn:[
            {
                color:"tertiary",
                btnName:"2D Design"
            },
            {
                color:"secondary",
                btnName:"Dribbble Post"
            }
        ],
        ratting:[
            {
                total:"16",
                detail:"Issues"
            },
            {
                total:"10",
                detail:"Resolved"
            },
            {
                total:"7",
                detail:"Comment"
            }
        ],
        task:"8",
        color:"warning",
        value:"80"
    },
    {
        class:"proorder-md-10",
        title:CryptoDashboard,
        img:"19.png",
        link:Href,
        header:"Volkman Melisa",
        email:"volkman839@gmail.com",
        btn:[
            {
                color:"primary",
                btnName:"Design System"
            },
            {
                color:"secondary",
                btnName:"Branding"
            }
        ],
        ratting:[
            {
                total:"04",
                detail:"Issues"
            },
            {
                total:"5",
                detail:"Resolved"
            },
            {
                total:"7",
                detail:"Comment"
            }
        ],
        task:"2",
        color:"tertiary",
        value:"20"
    }
]

export const todayTasksData = [
    {
        color:"primary",
        header:NFTillustrationPackage,
        img:"17.png",
        name:"Hackett Yessenia",
        assign:"Assigned to",
        link:Href
    },
    {
        color:"secondary",
        header:PodcastlandingPage,
        img:"13.png",
        img1:"14.png",
        name:"schneider..",
        assign:"Assigned to",
        link:Href
    },
    {
        color:"warning",
        header:DeliveryFoodApp,
        img:"15.png",
        name:"Mahdi Gholizadeh",
        assign:"Assigned to",
        link:Href
    }
]

export const onlineTimelineGroup =[
    { id: 1, title: '12am' },
    { id: 2, title: '1am' },
    { id: 3, title: '2am' },
    { id: 4, title: '3am' },
    { id: 5, title: '4am' },
    { id: 6, title: '5am' },
    { id: 7, title: '6am' },
    { id: 8, title: '7am' },
    { id: 9, title: '8am' },
    { id: 10, title: '9am' },
    { id: 11, title: '10am' },
    { id: 12, title: '11am' },
    { id: 13, title: '12pm' },
    { id: 14, title: '1pm' },
    { id: 15, title: '2pm' },
    { id: 16, title: '3pm' },
    { id: 17, title: '4pm' },
    { id: 18, title: '5pm' },
    { id: 19, title: '6pm' },
    { id: 20, title: '7pm' },
    { id: 21, title: '8pm' },
    { id: 22, title: '9pm' },
    { id: 23, title: '10pm' },
    { id: 24, title: '11pm' },
] 

export const onlineTimelineItems = [
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: moment(),
      end_time: moment().add(1, 'hour')
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour')
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      start_time: moment().add(2, 'hour'),
      end_time: moment().add(3, 'hour')
    }
  ]

