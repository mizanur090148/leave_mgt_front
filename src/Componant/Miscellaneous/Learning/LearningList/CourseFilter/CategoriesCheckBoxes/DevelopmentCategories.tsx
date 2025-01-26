import { DevelopmentTitle, Href } from "../../../../../../utils/Constant";
import { developmentData } from "../../../../../../Data/Learning/Learning";
import { Link } from "react-router-dom";
import { Badges, LI, UL } from "../../../../../../AbstractElements";

const DevelopmentCategories = () => {
  return (
    <div className="categories pt-1">
      <div className="learning-header">
        <span className="f-w-700">{DevelopmentTitle}</span>
      </div>
      <UL className="simple-list">
        {developmentData.map((data: any, index: any) => (
          <LI className="border-0" key={index}>
            <Link to={Href}>{data.DevelopmentHeading}</Link>
            <Badges color="primary" className="pull-right">
              {data.badgeNumber}
            </Badges>
          </LI>
        ))}
      </UL>
    </div>
  );
};

export default DevelopmentCategories;
