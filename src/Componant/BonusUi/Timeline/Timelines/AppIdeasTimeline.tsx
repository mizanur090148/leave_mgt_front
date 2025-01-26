import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { AppIdeas,EstablishedNewTheAppIdeaRepository, ViewItOnGithub} from "../../../../utils/Constant";
import { Badges, H4, H5, P } from "../../../../AbstractElements";

const AppIdeasTimeline = () => {
  const AppIdeaText: string =
    "developers who are just beginning their learning process. those who often concentrate on developing programmes with a user interface.";

  return (
    <VerticalTimelineElement
      className="cd-timeline-block"
      date="February 02 2024"
      icon={<i className="icon-pencil-alt"></i>}
      iconClassName="cd-timeline-img cd-picture bg-primary"
    >
        <div className="cd-timeline-content">
            <div className="timeline-wrapper">
              <Badges color="warning">{AppIdeas}</Badges>
            </div>
            <H4 className="m-0 vertical-timeline-element-subtitle">
              {EstablishedNewTheAppIdeaRepository}
            </H4>
            <P className="mb-0">{AppIdeaText}</P>
            <div className="time-content pt-2">
              <i className="icon-github"></i>
              <H5>{ViewItOnGithub}</H5>
            </div>
        </div>
    </VerticalTimelineElement>
  );
};

export default AppIdeasTimeline;
