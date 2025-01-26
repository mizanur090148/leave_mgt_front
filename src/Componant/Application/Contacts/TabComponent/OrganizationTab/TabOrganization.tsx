import { organizationList } from "../../../../../Data/Application/Contacts/Contacts";
import { TabPane } from "reactstrap";
import { H3, H4, H6, Image, LI, P, UL } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";
import { Link } from "react-router-dom";
import {
  EmailAddress,
  Gender,
  General,
  Href,
  Personal,
  Print,
} from "../../../../../utils/Constant";

const TabOrganization = () => {
  return (
    <>
      {organizationList.map((item: any, i: number) => (
        <TabPane tabId={item.activeTab} key={i}>
          <div className="profile-mail">
            <div className="d-flex">
              <Image
                className="p-0 img-100 img-fluid m-r-20 rounded-circle update_img_5"
                src={dynamicImage(`${item.image}`)}
                alt="images"
              />
              <div className="flex-grow-1">
                <H4>
                  <span className="first_name_5">{item.name}</span>
                </H4>
                <P className="email_add_5">{item.email}</P>
                <UL className="simple-list">
                  <LI>
                    <Link to={Href}>{Print}</Link>
                  </LI>
                </UL>
              </div>
            </div>
            <div className="email-general">
              <H6>{General}</H6>
              <P>
                {EmailAddress}:{" "}
                <span className="font-primary email_add_5">{item.email}</span>
              </P>
              <div className="gender">
                <H6>{Personal}</H6>
                <P>
                  {Gender}: <span>{item.gender}</span>
                </P>
              </div>
            </div>
          </div>
        </TabPane>
      ))}
    </>
  );
};

export default TabOrganization;
