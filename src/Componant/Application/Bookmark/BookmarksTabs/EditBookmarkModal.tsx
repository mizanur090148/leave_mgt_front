import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  setEditModal,
  setEditRow,
  updateBookMark,
} from "../../../../Store/Slices/BookmarkTabSlice";
import { AddNewBookMarkInterFace } from "../../../../Types/Application/Bookmark/Bookmark";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { EditBookmark } from "../../../../utils/Constant";
import EditBookmarkModalForm from "./EditBookmarkModalForm";

const EditBookmarkModal = () => {
  const { editRow, editModal } = useSelector((state: any) => state.bookmarkTab);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddNewBookMarkInterFace>();

  useEffect(() => {
    if (editRow) {
      setValue("url", editRow.website_url || "");
      setValue("title", editRow.title || "");
      setValue("desc", editRow.desc || "");
    }
  }, [editRow, setValue]);

  const editToggle = () => {
    dispatch(setEditModal());
    dispatch(setEditRow({}));
  };

  const updateNewBookmark = (
    id: number | undefined,
    data: AddNewBookMarkInterFace
  ) => {
    dispatch(updateBookMark({ id: id, data: data }));
  };

  const updateBookMarkData: SubmitHandler<AddNewBookMarkInterFace> = (
    data: any
  ) => {
    dispatch(setEditModal());
    updateNewBookmark(editRow?.id, data);
  };
  return (
    <Modal
      isOpen={editModal}
      toggle={editToggle}
      size="lg"
      className="modal-bookmark"
    >
      <ModalHeader toggle={editToggle}>{EditBookmark}</ModalHeader>
      <ModalBody>
        <EditBookmarkModalForm
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          editToggle={editToggle}
          updateBookMarkData={updateBookMarkData}
        />
      </ModalBody>
    </Modal>
  );
};

export default EditBookmarkModal;
