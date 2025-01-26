import { H5, H6, Image, LI, P, UL } from "../../../../AbstractElements";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { todayTasksData } from "../../../../Data/Dashboard/ProjectData";

const TodayTasksBody = () => {
  return (
    <>
      {todayTasksData.map((data: any, i: number) => (
        <LI className="bg-light" key={i}>
          <div className="d-flex align-items-center justify-content-between">
            <H6 className={`font-${data.color} f-w-500`}>{data.header}</H6>
            <CardHeaderDropDown
              mainTitle={true}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="flex-shrink-0">
              {!data.img1 ? (
                <Image
                  src={dynamicImage(`dashboard-2/user/${data.img}`)}
                  alt="user"
                />
              ) : (
                <div className="customers social-group">
                  <UL className="simple-list flex-row">
                    <LI className="d-inline-block">
                      <Image
                        className="rounded-circle border-0"
                        src={dynamicImage(`dashboard-2/user/${data.img}`)}
                        alt="users"
                      />
                    </LI>
                    <LI className="d-inline-block">
                      <Image
                        className="rounded-circle"
                        src={dynamicImage(`dashboard-2/user/${data.img1}`)}
                        alt="users"
                      />
                    </LI>
                  </UL>
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <P className="mb-0">{data.assign}</P>
              <Link to={data.link}>
                <H5>{data.name} </H5>
              </Link>
            </div>
          </div>
        </LI>
      ))}
    </>
  );
};

export default TodayTasksBody;
