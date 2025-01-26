import { Image, LI, UL } from "../../../../AbstractElements";
import { groupingImageThird } from "../../../../Data/Ui-Kits/Avtar/Avtar";
import { dynamicImage } from "../../../../Service";

const GroupInThird = () => {
  return (
    <div className="customers d-inline-block avatar-group">
      <UL className="simple-list flex-row">
        <LI className="d-inline-block">
          <Image
            width={36}
            height={36}
            className="img-40 rounded-circle"
            src={dynamicImage(`user/3.jpg`)}
            alt="image"
          />
        </LI>
        {groupingImageThird.map((item: any, index: number) => (
          <LI className="d-inline-block" key={index}>
            <Image
              width={36}
              height={36}
              className="img-40 rounded-circle"
              src={dynamicImage(`${item}`)}
              alt="image"
            />
          </LI>
        ))}
      </UL>
    </div>
  );
};

export default GroupInThird;
