import { FileText, Server, User } from "react-feather";
import { Href } from "../../utils/Constant";

export const notificationData = [
  {
    img: "wallet.png",
    link: Href,
    title: "New daily offer added",
    subTitle: "New user-only offer added",
    color: "primary",
  },
  {
    img: "shield-dne.png",
    link: Href,
    title: "Product Evaluation",
    subTitle: "Changed to a new workflow",
    color: "info",
  },
  {
    img: "graph.png",
    link: Href,
    title: "Return of a Product",
    subTitle: "452 items were returned",
    color: "warning",
  },
  {
    img: "ticket-star.png",
    link: Href,
    title: "Recently Paid",
    subTitle: "Mastercard payment of $343",
    color: "tertiary",
  },
];

export const messageData = [
  {
    img: "1.png",
    statusClass: "Hello Miss...😊",
    userName: "Hackett Yessenia",
    time: "10 min.",
    color: "primary",
  },
  {
    img: "2.png",
    statusClass: "Wishing You a Happy Birthday Dear.. 🥳🎊",
    userName: "schneider Adan",
    time: "25 min.",
    color: "secondary",
  },
  {
    img: "3.png",
    statusClass: "Hello Dear!! This Theme Is Very beautiful",
    userName: "Mahdi Gholizadeh",
    time: "1 hours",
    color: "success",
  },
];

export const cartsData = [
  {
    img: "cart-img.jpg",
    userName: "Furniture Chair for Home",
    amount: "500",
  },
  {
    img: "table-img.jpg",
    userName: "Furniture Table for Office",
    amount: "500",
  },
];
export interface profilesMessageType {
  name: string;
  icon: "User" | "Mail" | "FileText" | "Settings" | "LogOut";
  link: string;
}

export const profilesMessage: profilesMessageType[] = [
  {
    name: "Account",
    icon: "User",
    link: `${process.env.PUBLIC_URL}/user/profile`,
  },
  // {
  //     name: "Inbox",
  //     icon:"Mail",
  //     link: `${process.env.PUBLIC_URL}/email/letter_box`
  // },
  // {
  //     name: "Taskboard",
  //     icon:"FileText",
  //     link:`${process.env.PUBLIC_URL}/app/task`
  // },
  {
    name: "Settings",
    icon: "Settings",
    link: `${process.env.PUBLIC_URL}/user/settings`,
  },
  {
    name: "Log Out",
    icon: "LogOut",
    link: `${process.env.PUBLIC_URL}/login`,
  },
];

export const bookMarkData = [
  {
    icon: "form",
    path: `/forms/forms_controls/form_validation`,
    title: "Form",
    color: "primary",
  },
  {
    icon: "user",
    path: `/users/user_profile`,
    title: "Profile",
    color: "secondary",
  },
  {
    icon: "table",
    path: `/table/reactstrap_table/basic_table`,
    title: "Tables",
    color: "warning",
  },
];
