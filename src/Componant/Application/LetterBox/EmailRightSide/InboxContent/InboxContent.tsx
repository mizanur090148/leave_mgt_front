import { TabPane } from "reactstrap";
import { LI, UL } from "../../../../../AbstractElements";
import { useSelector } from "react-redux";
import InboxEmailContent from "./InboxEmailContent";
import MailPagination from "./MailPagination";

const InboxContent = () => {
  const { page, inboxEmail } = useSelector((state: any) => state.letterBox);
  return (
    <TabPane tabId="1">
      <div className="mail-body-wrapper">
        <UL className="simple-list">
          {inboxEmail.map((data: any, i: number) => (
            <LI
              className={`inbox-data ${
                page ? (i < 7 ? "hidden" : "") : i < 7 ? "" : "hidden"
              }`}
              key={i}
            >
              <InboxEmailContent data={data} i={i} />
            </LI>
          ))}
        </UL>
      </div>
      <MailPagination />
    </TabPane>
  );
};

export default InboxContent;
