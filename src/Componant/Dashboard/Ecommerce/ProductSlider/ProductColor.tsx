import { H5, LI, UL } from "../../../../AbstractElements";
import { Color } from "../../../../utils/Constant";

const ProductColor = () => {
  return (
    <>
      <H5>{Color}:</H5>
      <UL className="product-color flex-row">
        <LI className="border-primary">
          <span className="bg-primary">
            <i className="icon-check" />
          </span>
        </LI>
        <LI className="border-secondary">
          <span className="bg-secondary"> </span>
        </LI>
        <LI className="border-warning">
          <span className="bg-warning"> </span>
        </LI>
        <LI className="border-tertiary">
          <span className="bg-tertiary" />
        </LI>
      </UL>
    </>
  );
};

export default ProductColor;
