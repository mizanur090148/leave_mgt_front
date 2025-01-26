import { useEffect, useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { TopRightToasts } from "../../../../../utils/Constant";
import { Btn, Image } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";

interface ToastCustomProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastCustom: React.FC<ToastCustomProps> = ({
  message,
  open,
  setOpen,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  return (
    <>
      <div className="toast-container position-fixed top-0 end-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <div className="d-flex justify-content-between alert-secondary align-items-center">
            <ToastBody>{message}</ToastBody>
            <Btn
              close
              className="btn-close-white me-2 m-auto"
              onClick={() => setOpen(false)}
            ></Btn>
          </div>
        </Toast>
      </div>
    </>
  );
};

export default ToastCustom;
