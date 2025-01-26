import { Link } from "react-router-dom";
import { H5, Image, P } from "../../../../AbstractElements";
import { activeTableData } from "../../../../Data/Dashboard/DefaultData";
import { dynamicImage } from "../../../../Service";

const ActiveMembersTableBody = () => {
  return (
    <>
      <tbody>
        {activeTableData.map((data: any, i: number) => (
          <tr key={i}>
            <td>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Image
                    src={dynamicImage(`dashboard/user/${data.img}`)}
                    alt="userImage"
                  />
                </div>
                <div className="flex-grow-1">
                  <Link to={data.link}>
                    <H5>{data.name}</H5>
                  </Link>
                  <span>{data.position}</span>
                </div>
              </div>
            </td>
            <td> {data.status}</td>
            <td>
              <P
                className={`members-box background-light-${data.color} text-center b-light-${data.color} font-${data.color}`}
              >
                {" "}
                {data.btnName}
              </P>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default ActiveMembersTableBody;
