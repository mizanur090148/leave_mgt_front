import { H6, Image, LI, P, UL } from "../../../../AbstractElements";
import { variationTimeLineDataList } from "../../../../Data/BonusUi/Timeline/Timeline";
import { dynamicImage } from "../../../../Service";

const DynamicVariationTimeline = () => {
  return (
    <>
      {variationTimeLineDataList.map((data: any, index: any) => (
        <LI className={`d-flex ${data.className}`} key={index}>
          <div className={`activity-dot-${data.color}`}></div>
          <div className="w-100 ms-3">
            <P className="d-flex justify-content-between">
              <span className="date-content light-background">{data.date}</span>
              <span>{data.time}</span>
            </P>
            <H6 className="f-w-700">
              {data.title}
              <span className="dot-notification"></span>
            </H6>
            <span className={data.subTitleClass ? data.subTitleClass : ""}>
              {data.subTitle}
            </span>
            {data.image && (
              <div className="recent-images mb-2">
                <UL className="flex-row">
                  {data.image.map((item: any, index: number) => (
                    <LI key={index}>
                      <div className="recent-img-wrap">
                        <Image
                          src={dynamicImage(`${item}`)}
                          className="me-0"
                          alt="chair"
                        />
                      </div>
                    </LI>
                  ))}
                </UL>
              </div>
            )}
          </div>
        </LI>
      ))}
    </>
  );
};

export default DynamicVariationTimeline;
