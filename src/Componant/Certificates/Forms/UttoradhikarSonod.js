import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { numberArray, getCurrentDate } from "../../utils/helpers";

const UttoradhikarSonod = ({
  certificateNo,
  certificateId,
  issueDate,
  certificateNote,
  setCertificateNote,
  relatives,
  details,
  isNid,
  setIsNid,
  setDetails,
  setRelatives,
  register,
  errors,
  serverError,
}) => {
  const handleRow = (action, key) => {
    if (action === "add") {
      setRelatives([...relatives, { name: "", relationship: "" }]);
    } else {
      setRelatives(
        relatives.filter((item: any, index: number) => index !== key)
      );
    }
  };
  console.log(details, "detailsdetails");
  const relationshipRows =
    relatives.length &&
    relatives.map((data, key) => {
      let count = key;
      return (
        <tr key={key}>
          <td>{numberArray[count]}</td>
          <td>
            <input
              type="text"
              className="form-control"
              defaultValue={data.name}
              onChange={(e) => handleRelatives("name", key, e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              defaultValue={data.relationship}
              onChange={(e) =>
                handleRelatives("relationship", key, e.target.value)
              }
            />
          </td>
          <td className="certificate-action">
            <i
              className="fa-solid fa-circle-plus custom-design"
              onClick={() => handleRow("add")}
            ></i>
            {relatives.length > 1 && (
              <i
                className="fa-solid fa-circle-xmark custom-design text-danger"
                style={{ paddingLeft: "6px" }}
                onClick={() => handleRow("delete", key)}
              ></i>
            )}
          </td>
        </tr>
      );
    });

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setCertificateNote(editorRef.current.getContent());
    }
  };

  const handleRelatives = (filedName, key, val) => {
    relatives[key][filedName] = val;
    setRelatives([...relatives]);
  };

  const { name, fatherOrHunsbandName, address } = details;
  let defaultData = `<p>স্থানীয় ___ নং ওয়ার্ড সদস্য কর্তৃক সুপারিশক্রমে এই মর্মে উত্তরাধিকার সনদপত্র প্রদান করা যাচ্ছে যে,
   ${name ?? "__________________"}, পিতা/স্বামী: ${
    fatherOrHunsbandName ?? "__________________"
  }, মৃত্যু সনদ- _______, মৃত্যুর তারিখ: - - - ইং, ঠিকানা: 
    ${address ?? "__________________________"}, অত্র ইউনিয়নের; ___ নং 
   ওয়ার্ডের স্থায়ী বাসিন্দা ছিলেন। মৃত্যু কালে তিনি নিন্মে লিখিত উত্তরাধিকারগণকে রেখে যান।</p>`;

  return (
    <>
      <div className="pb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            সনদ নং:
          </label>
          <div>
            <input
              type="number"
              disabled={true}
              className="form-control"
              defaultValue={certificateNo}
              value={certificateNo}
              placeholder="Enter certificate no"
              {...register("certificateNo", {
                //required: true,
                minLength: {
                  value: 5,
                  message: "Certificate must have at least 5 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Certificate must have at least 20 characters",
                },
              })}
            />
            {errors?.certificateNo?.type === "required" && (
              <span className="error-msg">This field is required</span>
            )}
            {errors?.certificateNo?.type === "maxLength" && (
              <span className="error-msg">
                This field cannot exceed 15 characters
              </span>
            )}
            {errors?.certificateNo?.type === "pattern" && (
              <span className="error-msg">Only numbers are allowed</span>
            )}
            {serverError && <span className="error-msg">{serverError}</span>}
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            ইস্যু তারিখ:
          </label>
          <div>
            <input
              type="date"
              className="form-control"
              defaultValue={issueDate ? issueDate : getCurrentDate()}
              {...register("issueDate", {
                required: true,
              })}
            />
            {errors?.issueDate?.type === "required" && (
              <span className="error-msg">This field is required</span>
            )}
          </div>
        </div>
      </div>
      <div className="mb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            নাম:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.name}
              onChange={(e) =>
                setDetails({
                  ...details,
                  name: e.target.value,
                })
              }
              // {...register("details.name", {
              //   required: "This field is required",
              //   maxLength: {
              //     value: 30,
              //     message: "Maximum length is 30 characters",
              //   },
              // })}
            />
            {errors?.details?.name && (
              <span className="error-msg">
                {errors?.details?.name?.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            পিতার/স্বামীর নাম:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.fatherOrHunsbandName}
              // {...register("details.fatherOrHunsbandName", {
              //   required: "This field is required",
              //   maxLength: {
              //     value: 30,
              //     message: "Maximum length is 30 characters",
              //   },
              // })}
              onChange={(e) =>
                setDetails({
                  ...details,
                  fatherOrHunsbandName: e.target.value,
                })
              }
            />
            {errors?.details?.fatherOrHunsbandName && (
              <span className="error-msg">
                {errors?.details?.fatherOrHunsbandName?.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="issue-date" className="col-form-label">
          আবেদনকারীর ঠিকানা:
        </label>
        <div>
          <textarea
            rows={2}
            className="form-control"
            defaultValue={details?.address}
            // {...register("details.presentAddress", {
            //   maxLength: {
            //     value: 200,
            //     message: "Maximum length is 30 characters",
            //   },
            // })}
            onChange={(e) =>
              setDetails({
                ...details,
                address: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>
      <div className="row pb-3">
        <div className="col-sm-12">
          <Editor
            apiKey="znqnzwbnr2tiqjq9vvcm2u1tl6b6qtjcqr2rmr3b28tz127g"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={certificateId ? certificateNote : defaultData}
            onEditorChange={log}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            // {...register("initialValue", {
            //   required: true,
            // })}
          />
          {/* {errors?.initialValue?.type === "required" && (
            <p className="error-msg">This field is required</p>
          )} */}
        </div>
      </div>
      <table className="table table-hover my-0">
        <thead>
          <tr>
            <th>ক্রমিক নং</th>
            <th>নাম</th>
            <th>সম্পর্ক</th>
            <th className="d-none d-md-table-cell">Action</th>
          </tr>
        </thead>
        <tbody>{relationshipRows}</tbody>
      </table>
    </>
  );
};

export default UttoradhikarSonod;
