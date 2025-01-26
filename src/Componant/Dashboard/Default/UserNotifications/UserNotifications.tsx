import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Notifications } from "../../../../utils/Constant";
import { H5, Image, LI, P, UL } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { notificationsData } from "../../../../Data/Dashboard/DefaultData";

const UserNotifications = () => {
  return (
    <Col
      xxl="3"
      xl="6"
      md="5"
      className="box-col-6 proorder-xl-6 proorder-md-7"
    >
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={Notifications}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody>
          <UL className="notification-box simple-list">
            {notificationsData.map((data: any, i: number) => (
              <LI className="d-flex" key={i}>
                <div className={`flex-shrink-0 bg-light-${data.color}`}>
                  <Image
                    src={dynamicImage(`dashboard/icon/${data.img}`)}
                    alt="Wallet"
                  />
                </div>
                <div className="flex-grow-1">
                  <Link to={data.link}>
                    <H5>{data.title}</H5>
                  </Link>
                  <P className="text-truncate">{data.subTitle}</P>
                </div>
                <span>{data.date}</span>
              </LI>
            ))}
          </UL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserNotifications;
