import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    type: "groupHeader",
    groupTitle: "Component",
  },

  {
    id: "callhistory",
    title: "Call History",
    type: "item",
    icon: <Icon.Phone size={20} color="green" />,
    permissions: ["admin", "editor"],
    navLink: "/app/historycall/callhistory",
  },

  {
    id: "conversationintakeList",
    title: "Conversation Intake List",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/conversation/intakelist",
  },

  {
    id: "chatastro",
    title: "Astro-Chat",
    type: "item",
    icon: <Icon.MessageCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/astrochat/chatastro",
  },

  // {
  //   id: "videoastro",
  //   title: "Video Call",
  //   type: "item",

  //   icon: <Icon.Video size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/app/call/VideoCall",
  // },
  // {
  //   id: "livestreaming",
  //   title: "Live Streaming",
  //   type: "item",
  //   icon: <Icon.Video size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/app/live/liveAstro",
  // },
  {
    id: "addBalance",
    title: "Add Balance",
    type: "item",
    icon: <Icon.CreditCard size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/bank/AddBankDetails",
  },

  {
    id: "gallaryList",
    title: "GallaryList",
    type: "item",
    icon: <Icon.Upload size={16} />,
    navLink: "/gallaryList",
    permissions: ["admin", "editor"],
  },

  {
    id: "products",
    title: "Product",
    type: "collapse",
    icon: <Icon.Box size={20} />,
    children: [
      {
        id: "productlist",
        title: "Product List",
        type: "item",
        icon: <Icon.List size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/products/productlist",
      },
    ],
  },

  {
    id: "askuserquestion",
    title: "Users Ask Question",
    type: "item",
    icon: <Icon.HelpCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/askquestion/useraskqueslist",
  },
  {
    id: "waitqueuelist",
    title: "Wait Queue List",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/waitqueue/waitQueueList",
  },

  {
    id: "orderhistory",
    title: "Order History",
    type: "item",
    icon: <Icon.Box size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/orderhistory/orderhislist",
  },

  {
    id: "astroratings",
    title: " Ratings and Reviews",
    type: "item",
    icon: <Icon.Star size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/reviewrating/ratingreview",
  },

  {
    id: "reportstatus",
    title: "Report",
    type: "collapse",
    icon: <Icon.File size={20} />,
    children: [
      {
        id: "earning",
        title: "Earning",
        type: "item",

        icon: (
          <span
            style={{ fontSize: "20px", marginRight: "10px", fontWeight: "600" }}
          >
            ₹
          </span>
        ),
        permissions: ["admin", "editor"],
        navLink: "/app/report/earningreport",
      },
      {
        id: "callreport",
        title: "Call Report",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/report/callreport",
      },

      {
        id: "chat Report",
        title: "Chat Report",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/report/chatreport",
      },
      {
        id: "Video Call Report",
        title: "Video Call Report",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/report/videocallreport",
      },
    ],
  },

  {
    id: "withdrawalRequests",
    title: "Withdrawal Requests",
    type: "item",
    icon: <Icon.RefreshCcw size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/driver/withdrawalRequests",
  },

  {
    id: "transactionHistory",
    title: "Transaction History",
    type: "item",
    icon: (
      <span
        style={{ fontSize: "20px", marginRight: "10px", fontWeight: "600" }}
      >
        ₹
      </span>
    ),
    permissions: ["admin", "editor"],
    navLink: "/app/transaction/transactionHistory",
  },

  {
    id: "payoutrequest",
    title: "Payout Request",
    type: "item",
    icon: (
      <span
        style={{ fontSize: "20px", marginRight: "10px", fontWeight: "600" }}
      >
        ₹
      </span>
    ),
    permissions: ["admin", "editor"],
    navLink: "/app/report/payoutreport",
  },

  {
    id: "faquserlist",
    title: "User FAQ",
    type: "item",
    icon: <Icon.HelpCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/user/faquserlist",
  },
];
export default navigationConfig;
