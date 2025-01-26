import moment from "moment";
//import { confirmAlert } from "react-confirm-alert";
import Liabilities from './../Componant/Application/past-returns/components/Liabilities';

interface PastReturnData {
  partnershipBusiness?: number;
  businessAsset?: number;
  directoryShare?: number;
  nonAgriLand?: number;
  agriLand?: number;
  motorVehicle?: number;
  jewellery?: number;
  furniture?: number;
}

export const pastReturnTotalData = (data: PastReturnData): number => {
  return (
    Number(data?.partnershipBusiness || 0) +
    Number(data?.businessAsset || 0) +
    Number(data?.directoryShare || 0) +
    Number(data?.nonAgriLand || 0) +
    Number(data?.agriLand || 0) +
    Number(data?.motorVehicle || 0) +
    Number(data?.jewellery || 0) +
    Number(data?.furniture || 0)
  );
};

export const incomeTotalData = (data: any): number => {
  return (
    Number(data?.salary_income || 0) +
    Number(data?.capital_gain || 0) + 
    Number(data?.financial_assets_income || 0) + 
    Number(data?.income_from_minor_spouse || 0) +
    Number(data?.other_sources_of_income || 0) 
  );
};

export const assetEntryTotalData = (data: PastReturnData): number => {
  return (
    Number(data?.partnershipBusiness || 0) +
    Number(data?.businessAsset || 0) +
    Number(data?.directoryShare || 0) +
    Number(data?.nonAgriLand || 0) +
    Number(data?.agriLand || 0) +
    Number(data?.motorVehicle || 0) +
    Number(data?.jewellery || 0) +
    Number(data?.furniture || 0)
  );
};

export const liabilitiesTotalData = (data: any): number => {
  return (
    Number(data?.institutional || 0) +
    Number(data?.nonInstitutional || 0) +
    Number(data?.otherLiabilities || 0)
  );
};

export const expenseTotalData = (data: any): number => {
  return (
    Number(data?.self_and_family || 0) +
    Number(data?.housing || 0) +
    Number(data?.transport || 0) +
    Number(data?.utility || 0) + 
    Number(data?.education || 0) +
    Number(data?.vacation_festival || 0) +
    Number(data?.finance || 0) +
    Number(data?.tax_paid_refund || 0)
  );
};

export const ASSESMENT_YEARS = [
  {name: "2023-24", value: "2023-24"},
  {name: "2024-25", value: "2024-25"},
  {name: "2025-26", value: "2025-26"},
  {name: "2026-27", value: "2026-27"},
  {name: "2027-28", value: "2027-28"},
];

export const FURNITURE_AND_EQUIPMENTS = [
  { id: 1, name: "Bed" },
  { id: 2, name: "Almirah" },
  { id: 3, name: "Chair" },
  { id: 4, name: "Table" },
  { id: 5, name: "Sofa" },
  { id: 6, name: "Decoration" },
  { id: 7, name: "Shelf" },
  { id: 8, name: "Air Conditioner" },
  { id: 9, name: "Fridge" },
  { id: 10, name: "Television" },
  { id: 11, name: "Sound System" },
  { id: 12, name: "Washing Machine" },
  { id: 13, name: "Oven" },
  { id: 14, name: "Personal Computer" },
  { id: 15, name: "Other Furnitures" },
  { id: 16, name: "Other Equipments" },
];

export const numberArray = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

export const capitalizeFirst = (str: string) => {
  if (!str?.length) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const serialPadding = (serial: number) =>
  (serial + 1).toString().padStart(2, "0");

export const sonodTypes = () => {
  return [
    { id: 1, name: "নাগরিকত্ব সনদ" },
    { id: 2, name: "চারিত্রিক সনদ" },
    { id: 3, name: "ট্রেড লাইসেন্স" },
    { id: 4, name: "উত্তরাধিকার সনদ" },
    { id: 5, name: "মৃত্যু সনদ" },
    { id: 6, name: "বেকারত্ব সনদ" },
    { id: 7, name: "অবিবাহিত সনদ" },
    { id: 8, name: "বিবাহিত সনদ" },
    { id: 9, name: "বিধবা সনদ" },
    { id: 10, name: "প্রত্যয়ন পত্র" },
    { id: 11, name: "নতুন ভোটার সনদ" },
    { id: 12, name: "ভোটার এলাকা স্থানান্তর সনদ" },
    { id: 13, name: "অভিভাবক সম্মতি সনদ" },
    { id: 14, name: "মাসিক আয়ের সনদ" },
    { id: 15, name: "বার্ষিক আয়ের সনদ" },
    { id: 16, name: "অনাপত্তি পত্র" },
    { id: 17, name: "খামারি প্রত্যয়ন পত্র" },
    { id: 18, name: "ভোটার সংশোধনের প্রত্যয়ন পত্র" },
    { id: 19, name: "যৌতুক বিহীন সনদ" },
  ];
};

export const propertyTypes = () => {
  return [
    { id: "land", name: "Land" },
    { id: "building", name: "Building" },
    { id: "apartment", name: "Apartment" },
    { id: "land_share", name: "Land Share" },
    { id: "house", name: "House" },
  ];
};

export const userTypes = () => {
  return [
    { id: "user", name: "User" },
    { id: "chairman", name: "Chairman" },
    { id: "admin", name: "Admin" },
  ];
};

export const getCurrentDate = (): string => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();
  // Pad single-digit month and day with leading zeros
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
};

export const sonodTitle = (type: any) => {
  const sonod = sonodTypes().find((item) => item.id === type);
  return sonod?.name ?? "";
};

export const getStatuses = () => {
  return [
    { id: "pending", name: "Pending" },
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
    { id: "blocked", name: "Blocked" },
    { id: "suspend", name: "Suspend" },
  ];
};

export const englishToBanglaNumber = (number: string): string =>
  number.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

export const financeYears = [
  { id: "2022-2023", name: "২০২২-২৩" },
  { id: "2023-24", name: " ২০২৩-২৪" },
  { id: "2024-25", name: " ২০২৪-২৫" },
];

// export const deleteConfirmation = (
//   removeClickAction,
//   id,
//   message = "Are you sure want to delete?"
// ) => {
//   const options = {
//     top: 0,
//     bottom: 100,
//     left: 0,
//     title: "Delete",
//     message: "message",
//     buttons: [
//       {
//         label: "Yes",
//         onClick: () => removeClickAction(id),
//       },
//       {
//         label: "No",
//         onClick: () => console.log("No delete"),
//       },
//     ],
//     closeOnEscape: true,
//     closeOnClickOutside: true,
//     keyCodeForClose: [8, 32],
//     willUnmount: () => {},
//     afterClose: () => {},
//     onClickOutside: () => {},
//     onKeypress: () => {},
//     onKeypressEscape: () => {},
//     overlayClassName: "overlay-custom-class-name",
//   };
//   confirmAlert(options);
// };

export const certificateNoteText = (
  certificatetype: string,
  applicantName: string,
  fathersName: string,
  mothersName: string,
  husbandName: string,
  applicantAddress: string,
  nid: string,
  birthCertificateNo: string,
  isNid: boolean,
  isHusband: boolean,
  instituteName: string
): string => {
  let certificateNote = "";
  switch (parseInt(certificatetype)) {
    case 1:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "____________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তিনি আমার ব্যক্তিগতভাবে পরিচিত। তিনি জন্মসূত্রে বাংলাদেশের নাগরিক।
        আমার জানামতে, তিনি কোন প্রকার সমাজ বা রাষ্ট্র বিরোধী কর্মকান্ডের সহিত জড়িত নহে। সে উত্তম নৈতিক চরিত্রের অধিকারী।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
        </p>`;
      break;
    case 2:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তিনি আমার ব্যক্তিগতভাবে পরিচিত। সে বর্তমানে অত্র ইউনিয়নের __  নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। 
        আমার জানামতে, তিনি কোন প্রকার সমাজ বা রাষ্ট্র বিরোধী কর্মকান্ডের সহিত জড়িত নহে। সে উত্তম নৈতিক চরিত্রের অধিকারী।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 3:
      certificateNote = `<p>
        এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
          applicantName ?? "_______________"
        }, পিতা: ${fathersName ?? "_______________"}. মাতা: ${
        mothersName ?? "________________"
      }. । তিনি আমার ব্যক্তিগতভাবে পরিচিত।
        আমার জানামতে তিনি কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত
        হননি। তাহার স্বভাব ও চরিত্র ভাল।
        <br />
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 5:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার ${isNid ? "জাতীয় পরিচয় পত্র" : "জন্ম নিবন্ধন"} নাম্বার ${
        (isNid ? nid : birthCertificateNo) ?? "______________"
      } ।
        সে গত ____________  ইং তারিখে __________________________ মৃত্যু বরন করেছেন।
        <br/><br/>
        আমি তাহার আত্মার মাগফেরাত কামনা করছি।
      </p>`;
      break;
    case 6:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার ${isNid ? "জাতীয় পরিচয় পত্র" : "জন্ম নিবন্ধন"} নাম্বার ${
        (isNid ? nid : birthCertificateNo) ?? "______________"
      } । তিনি আমার ব্যক্তিগতভাবে পরিচিত। আমার জানামতে, সে একজন বেকার যুবক এবং কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত হননি। 
        তাহার স্বভাব ও চরিত্র ভাল।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
        </p>`;
      break;
    case 7:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার ${isNid ? "জাতীয় পরিচয় পত্র" : "জন্ম নিবন্ধন"} নাম্বার ${
        (isNid ? nid : birthCertificateNo) ?? "______________"
      } । সে বর্তমানে অত্র ইউনিয়নের __ নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। তিনি আমার ব্যক্তিগতভাবে পরিচিত। 
          আমার জানামতে সে ইতিপূর্বে কোন বিবাহ বন্ধনে আবদ্ধ হয় নাই এবং বর্তমানেও সে অবিবাহিত। তাহার স্বভাব চরিত্র ভাল এবং সৎ চরিত্রের অধিকারী ।
          <br/><br/>
          আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
        </p>`;
      break;
    case 8:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার ${isNid ? "জাতীয় পরিচয় পত্র" : "জন্ম নিবন্ধন"} নাম্বার ${
        (isNid ? nid : birthCertificateNo) ?? "______________"
      } । সে বর্তমানে অত্র ইউনিয়নের __ নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। তিনি আমার ব্যক্তিগতভাবে পরিচিত। 
          সে ____________, পিতাঃ _______________, মাতাঃ _______________,
          বগম, গ্রামঃ _____________, ডাক্ঘর ____________, উপজেলাঃ _____________, জেলাঃ _____________, কে ইসলামীক
          শরিয়ত মোতাবেক বিবাহ করে। আমি ব্যক্তিগতভাবে তাকে চিনি ও জানি।
          <br/><br/>
          আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 9:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার ${isNid ? "জাতীয় পরিচয় পত্র" : "জন্ম নিবন্ধন"} নাম্বার ${
        (isNid ? nid : birthCertificateNo) ?? "______________"
      } । সে বর্তমানে অএ ইউনিয়নের __ নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। তিনি আমার ব্যক্তিগতভাবে পরিচিত। 
        আমার জানামতে তিনি একজন বিধবা। তাহার স্বভাব চরিত্র ভাল এবং সৎ চরিত্রের অধিকারী ।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
        </p>`;
      break;
    case 10:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার ${isNid ? "জাতীয় পরিচয় পত্র" : "জন্ম নিবন্ধন"} নাম্বার ${
        (isNid ? nid : birthCertificateNo) ?? "______________"
      } । তিনি আমার ব্যক্তিগতভাবে পরিচিত। আমার জানামতে তিনি কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত হননি। 
        তাহার স্বভাব ও চরিত্র ভাল।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
        </p>`;
      break;
    case 11:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। তাহার জন্ম নিবন্ধন নাম্বার ${
        birthCertificateNo ?? "______________"
      } । তিনি আমার ব্যক্তিগতভাবে পরিচিত। আমার জানামতে তিনি কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত হননি। 
      তাহার স্বভাব ও চরিত্র ভাল।
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 12:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "_________________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "____________________"
      }, মাতা:  ${mothersName ?? "____________________"},  ${
        applicantAddress ?? "____________________________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${
        nid ?? "______________"
      } । তাহার জন্মস্থান অনুসারে সে পূর্বে ______________________, 
      এই ঠিকানার ভোটার ছিল। তাহার বর্তমান স্থায়ী ঠিকানা _________________, আমার ইউনিয়নে। এই ঠিকানায় ভোটার স্থানান্তর হওয়ার জন্য ইচ্ছুক ৷ 
      তাকে ভোটার স্থানান্তর করা যেতে পারে। 
      তিনি আমার ব্যক্তিগতভাবে পরিচিত। আমার জানামতে তিনি কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত হননি। 
      তাহার স্বভাব ও চরিত্র ভাল।
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 13:
      certificateNote = `<p>আমি _______________, এই মর্মে প্রত্যয়ন করছি যে, আমার ছেলে _______________ 
         একজন অবিবাহিত যুবক এবং জন্ম সূত্রে বাংলাদেশের একজন স্থায়ী নাগরিক। তাহার জন্ম নিবন্ধন নাম্বার _____________। 
      সে _____________  যোগদান করিতে ইচ্ছুক। আমি তাহাকে যোগদান করার অনুমতি প্রদান করিলাম।
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 14:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "___________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "_______________"
      }, মাতা:  ${mothersName ?? "______________"},  ${
        applicantAddress ?? "______________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${
        nid ?? "____________"
      } । সে বর্তমানে অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা। 
      তাহার মাসিক ইনকাম _____ টাকা। আমার জানামতে তিনি কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত হননি।
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 15:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "___________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "_______________"
      }, মাতা:  ${mothersName ?? "______________"},  ${
        applicantAddress ?? "______________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${
        nid ?? "____________"
      } । সে বর্তমানে অএ ইউনিয়নের একজন স্থায়ী বাসিন্দা। 
      তাহার মাসিক ইনকাম _____  টাকা এবং বাৎসরিক ইনকাম _____  টাকা। আমার জানামতে তিনি কখনো কোনো রাষ্ট্র বা সমাজ বিরোধী কর্মকান্ডে জড়িত হননি।
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 16:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "___________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "_______________"
      }, মাতা:  ${mothersName ?? "______________"},  ${
        applicantAddress ?? "______________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${nid ?? "____________"} । অত্র  ${
        instituteName ?? "_______________"
      } প্রতিষ্ঠানটি ইউনিয়নের __ নং ওয়ার্ডে ____________ গ্রামে অবস্থিত।
      এই প্রতিষ্ঠানটি স্থাপনে প্রতিবেশির কোন ক্ষতি করবে না এবং তাদের কোন আপত্তি নাই। 
      জনসাধারণের কোন সমস্যা হবেনা। উক্ত প্রতিষ্ঠানটি করার ব্যাপারে আমার কোন আপত্তি নাই। 
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 17:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "___________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "_______________"
      }, মাতা:  ${mothersName ?? "______________"},  ${
        applicantAddress ?? "______________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${
        nid ?? "____________"
      } । তিনি আমার ব্যক্তিগতভাবে পরিচিত। সে বর্তমানে অত্র ইউনিয়নের __ নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। 
      আমার জানামতে, তাহার _________________  আছে।
      আমার জানামতে, তিনি কোন প্রকার সমাজ বা রাষ্ট্র বিরোধী কর্মকান্ডের সহিত জড়িত নহে। 
      সে উত্তম নৈতিক চরিত্রের অধিকারী।
      <br/><br/>
      আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 18:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "___________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "_______________"
      }, মাতা:  ${mothersName ?? "______________"},  ${
        applicantAddress ?? "______________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${
        nid ?? "____________"
      }। তিনি আমার ব্যক্তিগতভাবে পরিচিত। তিনি জন্মসূত্রে বাংলাদেশের নাগরিক। ______________________________ ।
        আমার জানামতে, তিনি কোন প্রকার সমাজ বা রাষ্ট্র বিরোধী কর্মকান্ডের সহিত জড়িত নহে। সে উত্তম নৈতিক চরিত্রের অধিকারী।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
      </p>`;
      break;
    case 19:
      certificateNote = `<p>এই মর্মে প্রত্যয়ন করা যাইতেছে যে, ${
        applicantName ?? "___________"
      }, ${isHusband ? "স্বামী" : "পিতা"}: ${
        (isHusband ? husbandName : fathersName) ?? "_______________"
      }, মাতা:  ${mothersName ?? "______________"},  ${
        applicantAddress ?? "______________"
      }। জাতীয় পরিচয় পত্র নাম্বার ${
        nid ?? "____________"
      } । সে বর্তমানে অত্র ইউনিয়নের ___ নং ওয়ার্ডের একজন স্থায়ী বাসিন্দা। তিনি আমার ব্যক্তিগতভাবে পরিচিত। 
        সে ____________, পিতাঃ _______________, মাতাঃ _______________,
      বগম, গ্রামঃ _____________, ডাক্ঘর ____________, উপজেলাঃ _____________, জেলাঃ _____________, কে ইসলামীক
      শরিয়ত মোতাবেক যৌতুক বিহীন বিবাহ করেন। সে উত্তম নৈতিক চরিত্রের অধিকারী।
        <br/><br/>
        আমি তার ভবিষ্যত জীবনে সর্বাঙ্গীন উন্নতি ও মঙ্গল কামনা করি।
        </p>`;
      break;
  }
  return certificateNote;
};
