import { designerCategoryData } from "../../../../../../Data/Learning/Learning";
import { Link } from "react-router-dom";
import { DesignLearning, Href } from "../../../../../../utils/Constant";
import { Badges, LI, UL } from "../../../../../../AbstractElements";

const DesignCategories = () => {
  return (
    <div className="categories pt-2">
      <div className="learning-header">
        <span className="f-w-700">{DesignLearning}</span>
      </div>
      <UL className="simple-list">
        {designerCategoryData.map((data: any, index: any) => (
          <LI className="border-0" key={index}>
            <Link to={Href}>{data.learningHeading}</Link>
            <Badges color="primary" className="pull-right">
              {data.badgeNumber}
            </Badges>
          </LI>
        ))}
      </UL>
    </div>
  );
};

export default DesignCategories;
