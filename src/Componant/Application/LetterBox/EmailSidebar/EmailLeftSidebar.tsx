import { Card, CardBody } from "reactstrap";
import { Btn } from "../../../../AbstractElements";
import { ComposeEmail } from "../../../../utils/Constant";
import EmailNavMenu from "./EmailNavMenu";
import { useDispatch, useSelector } from "react-redux";
import { setComposeEmail } from "../../../../Store/Slices/LetterBoxSlice";
import { LetterBoxNavType } from "../../../../Types/Application/LetterBox/LetterBox";

const EmailLeftSidebar: React.FC<LetterBoxNavType> = ({ navId, setNavId }) => {
  const { composeEmail } = useSelector((state: any) => state.letterBox);
  const dispatch = useDispatch();
  return (
    <div className="email-left-aside">
      <Card>
        <CardBody>
          <div className="email-app-sidebar">
            <Btn
              color="primary"
              className="emailbox"
              onClick={() => dispatch(setComposeEmail(!composeEmail))}
            >
              <i className="fa fa-plus" />
              {ComposeEmail}
            </Btn>
            <EmailNavMenu navId={navId} setNavId={setNavId} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmailLeftSidebar;
