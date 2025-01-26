import { Link } from "react-router-dom";
import { H5, LI, P, UL } from "../../../../AbstractElements";
import { Href } from "../../../../utils/Constant";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { enrolledData } from "../../../../Data/Dashboard/EducationData";

const EnrolledClassesBody = () => {
  return (
    <UL className="enrolled-class simple-list">
      {enrolledData.map((data: any, i: number) => (
        <LI className="d-flex align-items-center gap-2" key={i}>
          <span className={`b-${data.color} bg-${data.color}`} />
          <div className="flex-grow-1">
            <Link to={Href}>
              <H5 className="text-truncate">{data.title} </H5>
            </Link>
            <P>{data.time}</P>
          </div>
          <div className="flex-shrink-0">
            <CardHeaderDropDown
              mainTitle={false}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
              menuTitle={<i className="icon-angle-right" />}
            />
          </div>
        </LI>
      ))}
    </UL>
  );
};

export default EnrolledClassesBody;
