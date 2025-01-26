import { Fragment } from "react";
import { P } from "../../../../AbstractElements";
import { websiteDesignData } from "../../../../Data/Dashboard/ProjectData";
import { RattingType, WebsiteDesignType } from "../../../../Types/DashboardType/ProjectType";

const WebsiteRatting = () => {
  return (
    <div className="ratting-button">
      {websiteDesignData.slice(0, 1).map((data: WebsiteDesignType,i:number) => (
        <Fragment key={i}>
          {data.ratting.map((item:RattingType, i:number) => (
            <div key={i}>
              <div className="d-flex align-items-center gap-2 mb-0">
                <div className="flex-shrink-0">
                  <P className="f-w-500">{item.total}</P>
                </div>
                <div className="flex-grow-1">
                  <span className="f-w-500">{item.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default WebsiteRatting;
