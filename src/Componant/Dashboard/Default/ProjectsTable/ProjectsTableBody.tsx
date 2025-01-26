import { Input, Label } from "reactstrap";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { projectsTableBodyData } from "../../../../Data/Dashboard/DefaultData";
import { H6, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";

const ProjectsTableBody = () => {
  return (
    <tbody>
      {projectsTableBodyData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="form-check">
              <Input className="form-check-input" type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image
                  src={dynamicImage(`dashboard/project/${data.img}`)}
                  alt="project"
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <Link to={Href}>
                  <H6>{data.title}</H6>
                </Link>
              </div>
            </div>
          </td>
          <td className="project-dot">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <span className={`bg-${data.color}`} />
              </div>
              <div className="flex-grow-1">
                <H6>{data.type}</H6>
              </div>
            </div>
          </td>
          <td> {data.date}</td>
          <td> {data.size}</td>
          <td>{data.author}</td>
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

export default ProjectsTableBody;
