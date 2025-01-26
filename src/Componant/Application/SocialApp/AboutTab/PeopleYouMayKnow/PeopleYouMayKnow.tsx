import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { AboutPropsType } from "../../../../../Types/Application/SocialApp/SocialApp";
import { Btn, H5, Image, LI, UL } from "../../../../../AbstractElements";
import { peopleYouMayKnowData } from "../../../../../Data/Application/SocialApp/SocialApp";
import { dynamicImage } from "../../../../../Service";
import { AddFriend } from "../../../../../utils/Constant";

const PeopleYouMayKnow = ({ Heading }: AboutPropsType) => {
  return (
    <Col sm="12">
      <Card>
        <CardHeader>
          <H5>{Heading}</H5>
        </CardHeader>
        <CardBody className="avatar-showcase">
          <div className="pepole-knows">
            <UL className="flex-wrap simple-list flex-row">
              {peopleYouMayKnowData.map((data: any, index: any) => (
                <LI key={index}>
                  <div className="add-friend text-center">
                    <Image
                      className="img-60 img-fluid rounded-circle"
                      alt="user"
                      src={dynamicImage(data.peopleImageName)}
                    />
                    <span className="d-block f-w-600">{data.peopleName}</span>
                    <Btn color="primary" size="xs">
                      {AddFriend}
                    </Btn>
                  </div>
                </LI>
              ))}
            </UL>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PeopleYouMayKnow;
