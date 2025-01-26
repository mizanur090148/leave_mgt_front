import { useEffect, useState } from "react";
import {
  ProductItemInterface,
  ProductModalInterfaceType,
} from "../../../../../Types/Application/Ecommerce/Product";
import { useSelector } from "react-redux";
import { Col, Modal, Row } from "reactstrap";
import { Btn, Image } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";
import ModalProductDetails from "./ModalProductDetails";
import ModalQuantity from "./ModalQuantity";
import ModalButtons from "./ModalButtons";

const ProductModal = ({
  value,
  setOpenModal,
  dataId,
}: ProductModalInterfaceType) => {
  const [open, setOpen] = useState(value);
  const { productItem } = useSelector((state: any) => state.product);
  const [quantity, setQuantity] = useState<number>(1);
  const [singleProduct, setSingleProduct] = useState<
    ProductItemInterface | undefined | [] | any
  >([]);

  useEffect(() => {
    productItem.forEach((product: ProductItemInterface) => {
      if (product.id === dataId) setSingleProduct(product);
    });
  }, [productItem, dataId]);

  const onCloseModal = () => {
    setOpen(false);
    setOpenModal(false);
  };
  return (
    <Modal
      wrapClassName="product-box"
      fade
      centered
      size="lg"
      isOpen={open}
      toggle={onCloseModal}
    >
      <div className="modal-header">
        <Row className="product-box">
          <Col lg="6" className="product-img">
            <Image
              className="img-fluid"
              src={
                singleProduct.image
                  ? dynamicImage(`ecommerce/${singleProduct.image}`)
                  : ""
              }
              alt="product"
            />
          </Col>
          <Col lg="6" className="product-details text-start">
            <ModalProductDetails singleProduct={singleProduct} />
            <div className="product-qnty">
              <ModalQuantity quantity={quantity} setQuantity={setQuantity} />
              <ModalButtons singleProduct={singleProduct} quantity={quantity} />
            </div>
          </Col>
        </Row>
        <Btn
          color="transparent"
          className="btn-close modal-button"
          onClick={onCloseModal}
        ></Btn>
      </div>
    </Modal>
  );
};

export default ProductModal;
