import { MenuItem } from "../../Types/Layout/SidebarType";

export const MenuList: MenuItem[] = [
  {
    title: "সনদ",
    lanClass: "lan-1",
    Items: [
      {
        id: 1,
        path: `${process.env.PUBLIC_URL}/dashboard`,
        icon: "home",
        type: "link",
        active: false,
        title: "Dashboard",
      },
      {
        id: 1,
        path: `${process.env.PUBLIC_URL}/user/profile`,
        icon: "user",
        type: "link",
        active: false,
        title: "Profile",
      },
      {
        title: "Tax Return",
        id: 2,
        icon: "file",
        type: "sub",
        lanClass: "lan-3",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/user/last-returns`,
            title: "Last Return",
            type: "link",
            lanClass: "lan-4",
          },
          {
            path: `${process.env.PUBLIC_URL}/current-return`,
            title: "Current Return",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/user/asset-entries`,
            title: "Assets Entry",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/user/investment-credits`,
            title: "Investment Credit",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/user/liabilities-entries`,
            title: "Liabilities Entry",
            type: "link",
          },
          {
            path: `${process.env.PUBLIC_URL}/user/expense-entries`,
            title: "Expense Entry",
            type: "link",
          },
        ],
      },
      {
        id: 1,
        path: `${process.env.PUBLIC_URL}/user/tax-return-summary`,
        icon: "user",
        type: "link",
        active: false,
        title: "Tax Return Summary",
      },
      // {
      //   id: 1,
      //   path: `${process.env.PUBLIC_URL}/user/print-tax-summary`,
      //   icon: "pdf",
      //   type: "link",
      //   active: false,
      //   title: "Print Tax Summary",
      // },
      {
        id: 1,
        path: `${process.env.PUBLIC_URL}/user/clients`,
        icon: "user",
        type: "link",
        active: false,
        title: "My Clients",
      },
      {
        id: 2,
        path: `${process.env.PUBLIC_URL}/settings`,
        icon: "user",
        type: "link",
        active: false,
        title: "Settings",
      },
    ],
  },
  // {
  //   title: "রিপোর্ট",
  //   lanClass: "lan-1",
  //   Items: [
  //     {
  //       title: "রিপোর্ট",
  //       id: 2,
  //       icon: "file",
  //       type: "sub",
  //       lanClass: "lan-3",
  //       children: [
  //         {
  //           path: `${process.env.PUBLIC_URL}/certificate/report`,
  //           title: "সনদ রিপোর্ট",
  //           type: "link",
  //           lanClass: "lan-4",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "সেটিংস",
  //   lanClass: "lan-1",
  //   Items: [
  //     {
  //       title: "সেটিংস",
  //       id: 3,
  //       icon: "knowledgebase",
  //       type: "sub",
  //       lanClass: "lan-3",
  //       children: [
  //         {
  //           path: `${process.env.PUBLIC_URL}/settings/unions`,
  //           title: "ইউনিয়ন লিস্ট",
  //           type: "link",
  //           lanClass: "lan-4",
  //         },
  //         {
  //           path: `${process.env.PUBLIC_URL}/settings/users`,
  //           title: "ইউজার লিস্ট",
  //           type: "link",
  //           lanClass: "lan-4",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
