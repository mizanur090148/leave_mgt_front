import { Nav, NavItem, NavLink } from "reactstrap";
import { Badges, SVG } from "../../../../AbstractElements";
import { letterBoxSidebar } from "../../../../Data/Application/LetterBox/LetterBox";
import { useDispatch, useSelector } from "react-redux";
import AddLabel from "./AddLabel";
import { Href, Inbox } from "../../../../utils/Constant";
import { LetterBoxNavType } from "../../../../Types/Application/LetterBox/LetterBox";

const EmailNavMenu: React.FC<LetterBoxNavType> = ({ navId, setNavId }) => {
  const { inboxEmail } = useSelector((state: any) => state.letterBox);
  let starBadges = inboxEmail.filter((data: any) => data.star === true && 1);
  const dispatch = useDispatch();
  return (
    <Nav pills tabs className="main-menu email-category">
      {letterBoxSidebar.map((data: any, i: number) => (
        <NavItem key={i}>
          <NavLink
            className={navId === data.id ? "active" : ""}
            id={data.id}
            onClick={() => setNavId(data.id)}
            href={Href}
          >
            <SVG
              className={`stroke-icon ${
                data.color ? `stroke-${data.color}` : ""
              }`}
              iconId={data.icon}
            />
            <div>
              {data.title}
              {data.badge && (
                <Badges color="">
                  {data.title === Inbox ? inboxEmail.length : starBadges.length}
                </Badges>
              )}
            </div>
          </NavLink>
        </NavItem>
      ))}
      <AddLabel />
    </Nav>
  );
};

export default EmailNavMenu;
