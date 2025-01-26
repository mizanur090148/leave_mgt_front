import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  handleEnvelope,
  handleInterview,
  removeItems,
} from "../../../../../Store/Slices/LetterBoxSlice";
import { Input, Label } from "reactstrap";
import { Badges, Image, P, SVG } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";
import { CommonDataType } from "../../../../../Types/Application/LetterBox/LetterBox";

const InboxEmailContent: React.FC<CommonDataType> = ({ data, i }) => {
  const { faIcon } = useSelector((state: any) => state.letterBox);
  const dispatch = useDispatch();
  const handleValue = () => dispatch(handleInterview(true));
  const handleRemoveEmail = (id: number) => {
    dispatch(removeItems(id));
  };
  return (
    <>
      <div className="inbox-user">
        <div className="form-check form-check-inline m-0">
          <Input
            className={`checkbox-${data.color}`}
            name="emailCheckbox"
            id={`emailCheckbox${i}`}
            type="checkbox"
          />
          <Label check for={`emailCheckbox${i}`} />
        </div>
        <SVG
          className={`important-mail ${data.star ? "active" : ""}`}
          iconId="fill-star"
          onClick={() => dispatch(addToFavorites(data))}
        />
        <div className="rounded-border">
          {data.image && (
            <Image src={dynamicImage(`user/${data.image}`)} alt="user" />
          )}
          {data.shortName && (
            <div className={data.color === "success" ? "circle-success" : ""}>
              <P className={`txt-${data.color}`}>{data.shortName}</P>
            </div>
          )}
        </div>
        <P>{data.name}</P>
      </div>
      <div className="inbox-message">
        <div className="email-data">
          <span>
            {data.message}
            <span>{data.subMessage}</span>
          </span>
          {data.badge &&
            data.badge.map((item: any, i: number) => (
              <Badges
                color=""
                className={`badge-light-${item.color}`}
                key={i}
                onClick={handleValue}
              >
                {" "}
                {item.title}{" "}
              </Badges>
            ))}
        </div>
        <div className="email-timing">
          <span>{data.time}</span>
        </div>
        <div className="email-options">
          <i
            className={`fa fa-envelope-o envelope-1 ${
              !faIcon ? "show" : "hide"
            }`}
            onClick={() => dispatch(handleEnvelope(true))}
          />
          <i
            className={`fa fa-envelope-open-o envelope-2 ${
              faIcon ? "show" : "hide"
            }`}
            onClick={() => dispatch(handleEnvelope(false))}
          />
          <i
            className="fa fa-trash-o trash-3"
            onClick={() => handleRemoveEmail(data.id)}
          />
          <i className="fa fa-print" />
        </div>
      </div>
    </>
  );
};

export default InboxEmailContent;
