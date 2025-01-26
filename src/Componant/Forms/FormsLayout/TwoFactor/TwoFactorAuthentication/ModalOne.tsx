import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Btn, P } from "../../../../../AbstractElements";
import { Cancel, ModalTitle, Next } from "../../../../../utils/Constant";
import { toast } from "react-toastify";
import ModalOneData from "./ModalOneData";
import ModalTwo from "./ModalTwo";
import {
  setModalTwo,
  setModalOne,
} from "../../../../../Store/Slices/TwoFactorSlice";
const ModalOne = () => {
  const { modalOne, selectAuthenticatorMethodName } = useSelector(
    (state: any) => state.twoFactor
  );
  const dispatch = useDispatch();

  const handleNextButton = () => {
    if (selectAuthenticatorMethodName !== "") {
      dispatch(setModalTwo());
      dispatch(setModalOne());
    } else {
      toast.error("Please fill all field after press next button");
    }
  };

  return (
    <>
      <Modal centered isOpen={modalOne} toggle={() => dispatch(setModalOne())}>
        <ModalHeader toggle={() => dispatch(setModalOne())}>
          {ModalTitle}
        </ModalHeader>
        <ModalBody>
          <div className="modal-toggle-wrapper">
            <P>
              To log into your account, you will also need to enter your
              username, password, and a code that was sent to you through SMS or
              an app.
            </P>
            <ModalOneData />
            <Btn
              color="dark"
              className="rounded-pill w-100 mt-3"
              onClick={handleNextButton}
            >
              {Next}
            </Btn>
            <Btn
              color="transparent"
              className="rounded-pill w-100 pb-0 dark-toggle-btn"
              onClick={() => dispatch(setModalOne())}
            >
              {Cancel}
            </Btn>
          </div>
        </ModalBody>
      </Modal>
      <ModalTwo />
    </>
  );
};

export default ModalOne;
