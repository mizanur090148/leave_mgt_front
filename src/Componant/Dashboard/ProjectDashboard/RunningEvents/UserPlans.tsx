import { Btn, H5, LI, P, UL } from "../../../../AbstractElements";
import { UpgradePlan, ViewProject } from "../../../../utils/Constant";

const UserPlans = () => {
  return (
    <>
      <UL className="d-flex align-items-center gap-3 simple-list flex-row">
        <LI className="bg-light">
          <H5>$34,930</H5>
          <P>{"Disbursed Budget"}</P>
        </LI>
        <LI className="bg-light">
          <H5>$65,789</H5>
          <P>{"Planned"}</P>
        </LI>
      </UL>
      <div>
        <Btn color="primary me-1">{UpgradePlan}</Btn>
        <Btn color="secondary">{ViewProject}</Btn>
      </div>
    </>
  );
};

export default UserPlans;
