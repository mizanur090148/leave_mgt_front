import { Link } from "react-router-dom";
import { H5, Image, LI, P, UL } from "../../../../AbstractElements";
import { recentCustomerData } from "../../../../Data/Dashboard/Ecommerce";
import { dynamicImage } from "../../../../Service";

const RecentCustomersBody = () => {
  return (
    <UL className="recent-customers simple-list">
      {recentCustomerData.map((data: any, i: number) => (
        <LI className="d-flex align-items-center gap-2" key={i}>
          <div className="flex-shrink-0">
            <Image
              src={dynamicImage(`dashboard-3/user/${data.image}`)}
              alt="users"
            />
          </div>
          <div className="flex-grow-1">
            <Link to={data.link}>
              <H5>{data.name}</H5>
            </Link>
            <P className="text-truncate">
              ID #{data.id}
              <span className={`text-${data.color}`}>{data.status}</span>
            </P>
          </div>
          <div className="active-status active-online" />
          <div className="recent-text">
            <H5>${data.amount}</H5>
            <P>{data.time}</P>
          </div>
        </LI>
      ))}
    </UL>
  );
};

export default RecentCustomersBody;
