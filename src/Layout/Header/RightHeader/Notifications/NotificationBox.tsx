import { Link } from "react-router-dom";
import { H6, Image, LI, P, UL } from "../../../../AbstractElements";
import { notificationData } from "../../../../Data/LayoutData/HeaderData";
import { dynamicImage } from "../../../../Service";
import { CheckAll, Href } from "../../../../utils/Constant";

const NotificationBox = () => {
  return (
    <UL className="notification-box simple-list">
      {notificationData.map((data: any, index: any) => (
        <LI className="d-flex" key={index}>
          <div className={`flex-shrink-0 bg-light-${data.color}`}>
            <Image
              src={dynamicImage(`dashboard/icon/${data.img}`)}
              alt="Wallet"
            />
          </div>
          <div className="flex-grow-1">
            <Link to={data.link}>
              <H6>{data.title}</H6>
            </Link>
            <P>{data.subTitle}</P>
          </div>
        </LI>
      ))}
      <LI>
        <Link className="f-w-700" to={"/chat/private_chat"}>
          {CheckAll}
        </Link>
      </LI>
    </UL>
  );
};

export default NotificationBox;
