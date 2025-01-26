import { Input, Label } from "reactstrap";
import {
  H5,
  Image,
  LI,
  P,
  Progressbar,
  UL,
} from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { clientActivityTableData } from "../../../../Data/Dashboard/ProjectData";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";

const ClientActivityTableBody = () => {
  return (
    <tbody>
      {clientActivityTableData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="form-check">
              <Input type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td>
          <td className="px-0">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image
                  src={dynamicImage(`dashboard-2/svg-icon/${data.img}`)}
                  alt="icons"
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <Link to={data.link}>
                  <H5>{data.title}</H5>
                </Link>
                <p>{data.name}</p>
              </div>
            </div>
          </td>
          <td className="px-0">{data.date}</td>
          <td className="customers text-center social-group">
            <UL className="simple-list flex-row">
              {data.images.map((item: any, i: number) => (
                <LI className="d-inline-block" key={i}>
                  {item !== "" ? (
                    <Image
                      className="img-30 rounded-circle"
                      src={dynamicImage(`dashboard-2/user/${item}`)}
                      alt="user"
                    />
                  ) : (
                    <P className="bg-light rounded-circle">5+</P>
                  )}
                </LI>
              ))}
            </UL>
          </td>
          <td> {data.type} </td>
          <td>
            <div className="progress-showcase">
              <Progressbar
                className={`sm-progress-bar progress-border-${data.color}`}
                value={data.progressValue}
              />
            </div>
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

export default ClientActivityTableBody;
