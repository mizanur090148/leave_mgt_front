import { Input, Label } from "reactstrap";
import { H6, Image, Progressbar } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { assignmentData } from "../../../../Data/Dashboard/EducationData";
import { Link } from "react-router-dom";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";

const AssignmentsTableBody = () => {
  return (
    <tbody>
      {assignmentData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="form-check">
              <Input type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td>
          <td>
            <span>{data.id}</span>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image
                  src={dynamicImage(`dashboard-4/user/${data.image}`)}
                  alt="user"
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <Link to={data.link}>
                  <H6>{data.name}</H6>
                </Link>
              </div>
              <div className="active-status active-online" />
            </div>
          </td>
          <td>{data.subjects}</td>
          <td>{data.startDate}</td>
          <td>{data.endDate} </td>
          <td>
            <Progressbar
              className={`sm-progress-bar progress-border-${data.color}`}
              value={data.value}
            />
          </td>
          <td className="text-center">
            <CardHeaderDropDown
              mainTitle={true}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AssignmentsTableBody;
