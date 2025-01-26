import { Container, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { getRequest } from "../../../utils/axiosRequests";
// import ProjectStatus from "./ProjectStatus/ProjectStatus";
// import RecentProjects from "./RecentProjects/RecentProjects";
import TotalProject from "./TotalProject/TotalProject";
// import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
// import ClientActivity from "./ClientActivity/ClientActivity";
// import WebsiteDesign from "./WebsiteDesign/WebsiteDesign";
// import TodayTasks from "./TodayTasks/TodayTasks";
// import RunningEvents from "./RunningEvents/RunningEvents";
// import OnlineCourseTimeline from "./OnlineCourseTimeline/OnlineCourseTimeline";

const ContainerProject = () => {
  return (
    <Container fluid className="dashboard-2">
      <Row>
        {/* <ProjectStatus />
        <RecentProjects /> */}
        <TotalProject />
        {/* <ProjectsOverview />
        <ClientActivity />
        <WebsiteDesign />
        <TodayTasks />
        <RunningEvents />
        <OnlineCourseTimeline /> */}
      </Row>
    </Container>
  );
};

export default ContainerProject;
