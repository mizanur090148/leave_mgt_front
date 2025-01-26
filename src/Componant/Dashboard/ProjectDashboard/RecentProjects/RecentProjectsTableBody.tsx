import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { recentTableBodyData } from "../../../../Data/Dashboard/ProjectData";
import { Image, LI, P, UL } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import ReactApexChart from "react-apexcharts";

const RecentProjectsTableBody = () => {
  return (
    <tbody>
      {recentTableBodyData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="form-check">
              <Input type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td>
          <td className="px-0">
            <Link to={data.link}>{data.name} </Link>
          </td>
          <td className="customers text-center social-group">
            <UL>
              {data.images.map((item: any, i: number) => (
                <LI className="d-inline-block" key={i}>
                  {item.img !== "" ? (
                    <Image
                      className="img-30 rounded-circle"
                      src={dynamicImage(`dashboard-2/user/${item.img}`)}
                      alt="users"
                    />
                  ) : (
                    <P className="bg-light rounded-circle">5+</P>
                  )}
                </LI>
              ))}
            </UL>
          </td>
          <td> {data.date}</td>
          <td> {data.endDate}</td>
          <td className="radial-chart-wrap p-0">
            <ReactApexChart
              className="widgetsChart"
              id={data.chartId}
              options={data.option}
              series={data.option.series}
              height={90}
              type="radialBar"
            />
          </td>
          <td>
            <CardHeaderDropDown
              mainTitle={true}
              firstItem={"Weekly"}
              secondItem={"Monthly"}
              thirdItem={"Yearly"}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default RecentProjectsTableBody;
