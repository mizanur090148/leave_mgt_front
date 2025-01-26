import ReactApexChart from "react-apexcharts";
import { LI, P, UL } from "../../../../AbstractElements";
import { totalProjectData } from "../../../../Data/Dashboard/ProjectData";
import { totalProjectChart } from "../../../../Data/Dashboard/DefaultChartData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRequest } from "../../../../utils/axiosRequests";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const chartOptions = (
  axis: "y" | "x" | undefined, // Adjust the type of axis parameter
  labelPosition: "center" | "end" | "start",
  reportTitle: string
): ChartOptions<"bar"> => {
  // Adjust the return type
  return {
    indexAxis: axis,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Show legend
        labels: {
          color: "red", // Set the text color for legend labels
        },
      },
      title: {
        display: true,
        text: reportTitle,
      },
      datalabels: {
        anchor: "center",
        align: labelPosition,
        font: {
          weight: "bold",
        },
      },
    },
  };
};

export const todayOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Show legend
    },
    title: {
      display: true,
      text: "আজকের রিপোর্ট",
    },
    datalabels: {
      anchor: "end",
      align: "top",
      font: {
        weight: "bold",
      },
    },
  },
};

export const weeklyOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "This Weeks Report",
    },
  },
};

export const monthlyOptions = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "This Months Report",
    },
  },
};

export const yearlyOptions = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Yearly Report",
    },
  },
};

const labels = [
  "নাগরিকত্ব সনদ",
  "চারিত্রিক সনদ",
  "ট্রেড লাইসেন্স",
  "উত্তরাধিকার সনদ",
  "মৃত্যু সনদ",
  "বেকারত্ব সনদ",
  "অবিবাহিত সনদ",
  "বিবাহিত সনদ",
  "বিধবা সনদ",
  "প্রত্যয়ন পত্র",
  "নতুন ভোটার সনদ",
  "ভোটার এলাকা স্থানান্তর সনদ",
  "অভিভাবক সম্মতি সনদ",
  "মাসিক আয়ের সনদ",
  "বার্ষিক আয়ের সনদ",
  "অনাপত্তি পত্র",
  "খামারি প্রত্যয়ন পত্র",
  "ভোটার সংশোধনের প্রত্যয়ন পত্র",
  "যৌতুক বিহীন সনদ",
];

const backgroundColors = [
  "#AED6F1",
  "#48C9B0",
  "#2ECC71",
  "#00FF00",
  "#FF0000",
];

const TotalProjectChart = () => {
  const userInfo = useSelector((state: AppState) => state.auth.data);
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getChartData = (reportType: any) => {
    return {
      labels,
      datasets: [
        {
          data: Object.values(dashboardData?.[reportType]),
          backgroundColor: backgroundColors,
        },
      ],
    };
  };

  useEffect(() => {
    //getDashboardData();
  }, []);

  // const getDashboardData = () => {
  //   const url =
  //     userInfo?.userType === "admin"
  //       ? "dashboard"
  //       : `dashboard?unionId=${userInfo?.unionId?.id}`;
  //   getRequest(url)
  //     .then((data: any) => {
  //       setDashboardData(data);
  //       setIsLoading(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <>
      {/* <ReactApexChart
        id="total-project"
        options={totalProjectChart}
        series={totalProjectChart.series}
        type="bar"
        height={220}
      /> */}
      {/* {isLoading && (
        // <Bar
        //   options={chartOptions("x", "end", "আজকের রিপোর্ট")}
        //   data={getChartData("today")}
        //   plugins={[ChartDataLabels]}
        //   height={100}
        // />
        // <Bar
        //   options={chartOptions("x", "end", "আজকের রিপোর্ট")}
        //   data={getChartData("today")}
        //   plugins={[ChartDataLabels]}
        //   height={100}
        // />
      )} */}
      {/* <UL className="simple-list flex-row">
        {totalProjectData.map((data: any, i: number) => (
          <LI className="d-flex align-items-center gap-2" key={i}> 
            <span className={`bg-${data.color}`} />
            <P>{data.title}</P>
          </LI>
        ))}
      </UL> */}
    </>
  );
};

export default TotalProjectChart;
