import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentForm from "./StudentForm";
import { setStudentValidationForm } from "../../../../../Store/Slices/StudentWizardSlice";

const StudentValidationFormCardBody = () => {
  const { studentValidationForm, studentLevel } = useSelector(
    (state: any) => state.studentWizard
  );
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageLabelClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    if (name === "imageUpload") {
      const file = event.target.files?.[0];
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedImageUrl = reader.result as string;
        setImageUrl(uploadedImageUrl);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    const value =
      name === "agreeTerms" ||
      name === "informationCheckBox" ||
      name === "agreeConditions"
        ? event.target.checked
        : name === "imageUpload" || name === "studentFile"
        ? event.target.files && event.target.files[0].name
        : event.target.value;
    dispatch(
      setStudentValidationForm({ ...studentValidationForm, [name]: value })
    );
  };
  return (
    <StudentForm
      handleImageLabelClick={handleImageLabelClick}
      imageUrl={imageUrl}
      fileInputRef={fileInputRef}
      getUserData={getUserData}
      studentValidationForm={studentValidationForm}
      level={studentLevel}
    />
  );
};

export default StudentValidationFormCardBody;
