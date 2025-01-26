import { Link } from "react-router-dom";
import { H6, Image, LI, P, UL } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { CheckAll, Href } from "../../../../utils/Constant";
import { messageData } from "../../../../Data/LayoutData/HeaderData";

const MessageBox = () => {
  return (
    <UL className="messages simple-list">
        {messageData.map((data,index) => (
            <LI className="d-flex b-light1-primary gap-2" key={index}>
                <div className="flex-shrink-0">
                    <Image src={dynamicImage(`dashboard-2/user/${data.img}`)} alt="Graph" />
                </div>
                <div className="flex-grow-1">
                    <Link to={Href}>
                        <H6 className={`font-${data.color} f-w-600`}>{data.userName}</H6>
                    </Link>
                    <P>{data.statusClass}</P>
                </div>
                <span>{data.time}</span>
            </LI>
        ))}
        <LI>
            <Link className="f-w-700" to={"/email/letter_box"}>{CheckAll}</Link>
        </LI>
    </UL>
  );
};

export default MessageBox;
