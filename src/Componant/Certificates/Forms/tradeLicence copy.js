import React, { memo, useRef } from "react";
import { getCurrentDate } from "../../utils/helpers";
import { Editor } from "@tinymce/tinymce-react";
import { numberArray, financeYears } from "../../utils/helpers";

const TradeLicence = ({
  setValue,
  isNid,
  setIsNid,
  register,
  watch,
  errors,
  serverError,
  taxesAndFees,
  setTaxesAndFees,
  financeYear,
  setFinanceYear,
  register,
  errors,
  serverError,
}) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setCertificateNote(editorRef.current.getContent());
    }
  };

  const handleRow = (action, key) => {
    if (action === "add") {
      setTaxesAndFees([...taxesAndFees, { item: "", amount: "" }]);
    } else {
      setTaxesAndFees(
        taxesAndFees.filter((item: any, index: number) => index !== key)
      );
    }
  };

  const taxAndFeeRows = () => {
    const taxesData = details?.taxesAndFees
      ? details.taxesAndFees
      : taxesAndFees;
    return (
      taxesData?.length &&
      taxesData?.map((data, key) => {
        let count = key;
        return (
          <tr key={key}>
            <td>{numberArray[count]}</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={data?.item}
                onChange={(e) =>
                  handleTaxesAndFees("item", key, e.target.value)
                }
              />
            </td>
            <td style={{ width: "220px" }}>
              <input
                type="number"
                className="form-control"
                defaultValue={data?.amount}
                onChange={(e) =>
                  handleTaxesAndFees("amount", key, e.target.value)
                }
              />
            </td>
            <td className="certificate-action text-center">
              <i
                className="fa-solid fa-circle-plus custom-design"
                onClick={() => handleRow("add")}
              ></i>
              {taxesAndFees.length > 1 && (
                <i
                  className="fa-solid fa-circle-xmark custom-design text-danger"
                  style={{ paddingLeft: "6px" }}
                  onClick={() => handleRow("delete", key)}
                ></i>
              )}
            </td>
          </tr>
        );
      })
    );
  };

  const handleTaxesAndFees = (filedName, key, val) => {
    taxesAndFees[key][filedName] = val;
    setTaxesAndFees([...taxesAndFees]);
  };

  return (
    <>
      <div className="pb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            লাইসেন্স নং:
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
                This field cannot exceed 30 characters
              </span>
            )}
            {serverError && <span className="error-msg">{serverError}</span>}
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            অর্থ বছর:
          </label>
          <div>
            <select
              //{...register("details.financeYear")}
              className="form-control"
              onChange={(e) => setFinanceYear(e.target.value)}
              defaultValue={financeYear}
            >
              {financeYears.map((data, key) => {
                return (
                  <option key={key} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </select>
            {errors?.details?.financeYear === "required" && (
              <span className="error-msg">This field is required</span>
            )}
          </div>
        </div>
      </div>
      <div className="pb-2 row">
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
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            বৈধতার মেয়াদ:
          </label>
          <div>
            <input
              type="date"
              className="form-control"
              defaultValue={details?.validDate}
              {...register("details.validDate", {
                maxLength: {
                  value: 60,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
            {errors?.validDate?.type === "required" && (
              <span className="error-msg">This field is required</span>
            )}
          </div>
        </div>
      </div>
      <div className="pb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            ব্যবসা প্রতিষ্ঠানের নাম:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.instituteName}
              {...register("details.instituteName", {
                maxLength: {
                  value: 60,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
            {errors?.instituteName?.type === "required" && (
              <span className="error-msg">This field is required</span>
            )}
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            ব্যবসার ধরন:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.typeOfBusiness}
              {...register("details.typeOfBusiness", {
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="pb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            কর অঞ্চল:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.tax_region}
              {...register("details.tax_region", {
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            ওয়ার্ড নং:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.ward_no}
              {...register("details.ward_no", {
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="pb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            আবেদনকারীর নাম:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.applicantName}
              // onChange={(e) =>
              //   setDetails({
              //     ...details,
              //     applicantName: e.target.value,
              //   })
              // }
              {...register("details.applicantName", {
                required: "This field is required",
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
            {errors?.details?.applicantName && (
              <span className="error-msg">
                {errors.details.applicantName.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            আবেদনকারীর পিতার নাম:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.fathersName}
              // onChange={(e) =>
              //   setDetails({
              //     ...details,
              //     fathersName: e.target.value,
              //   })
              // }
              {...register("details.fathersName", {
                required: "This field is required",
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="mb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            আবেদনকারীর মাতার নাম:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.mothersName}
              {...register("details.mothersName", {
                required: "This field is required",
                // maxLength: {
                //   value: 40,
                //   message: "Maximum length is 40 characters",
                // },
              })}
              // onChange={(e) =>
              //   setDetails({
              //     ...details,
              //     mothersName: e.target.value,
              //   })
              // }
              // {...register("details.mothersName", {
              //   maxLength: {
              //     value: 30,
              //     message: "Maximum length is 30 characters",
              //   },
              // })}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            স্বামী/স্ত্রীর নাম (প্রযোজ্য ক্ষেত্রে):
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.husbandOrWife}
              {...register("details.husbandOrWife", {
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="pb-2 row">
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            মোবাইল/টেলিফোন:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.mobileNo}
              {...register("details.mobileNo", {
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            ই-মেইল:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.email}
              {...register("details.email", {
                required: "This field is required",
                // maxLength: {
                //   value: 40,
                //   message: "Maximum length is 40 characters",
                // },
              })}
            />
            {errors?.details?.email && (
              <span className="error-msg">{errors.details.email.message}</span>
            )}
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-6">
          <label htmlFor="issue-date" className="col-form-label">
            জাতীয় পরিচয় পত্র নম্বর/পাসপোর্ট নম্বর:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.nid_passport_birth_reg_no}
              {...register("details.nid_passport_birth_reg_no", {
                required: "This field is required",
                maxLength: {
                  value: 17,
                  message: "Maximum length is 17 characters",
                },
              })}
            />
            {errors?.details?.nid && (
              <span className="error-msg">{errors.details.nid.message}</span>
            )}
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="issue-text" className="col-form-label">
            ই-টিন:
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              defaultValue={details?.tin}
              {...register("details.tin", {
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="issue-text" className="col-sm-2 col-form-label">
          প্রতিষ্ঠানের ঠিকানা:
        </label>
        <div className="col-sm-10">
          <textarea
            rows={2}
            className="form-control"
            defaultValue={details?.instituteAddress}
            {...register("details.instituteAddress", {
              maxLength: {
                value: 200,
                message: "Maximum length is 30 characters",
              },
            })}
          ></textarea>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="issue-text" className="col-sm-2 col-form-label">
          আবেদনকারীর বর্তমান ঠিকানা:
        </label>
        <div className="col-sm-10">
          <textarea
            rows={2}
            className="form-control"
            defaultValue={details?.presentAddress}
            {...register("details.presentAddress", {
              maxLength: {
                value: 200,
                message: "Maximum length is 30 characters",
              },
            })}
          ></textarea>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="issue-text" className="col-sm-2 col-form-label">
          আবেদনকারীর স্থায়ী ঠিকানা:
        </label>
        <div className="col-sm-10">
          <textarea
            rows={2}
            className="form-control"
            defaultValue={details?.permanentAddress}
            {...register("details.permanentAddress", {
              maxLength: {
                value: 200,
                message: "Maximum length is 30 characters",
              },
            })}
          ></textarea>
        </div>
      </div>
      <div className="pb-3 row">
        <label htmlFor="issue-text" className="col-sm-2 col-form-label">
          মূলধন:
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            defaultValue={details?.capital}
            {...register("details.capital", {
              maxLength: {
                value: 200,
                message: "Maximum length is 30 characters",
              },
            })}
          />
        </div>
      </div>
      <div className="pb-2 row">
        <label htmlFor="issue-text" className="col-sm-2 col-form-label">
          ফি ও করের পরিমান:
        </label>
        <div className="col-sm-10">
          <table className="table table-hover my-0">
            <thead>
              <tr>
                <th>ক্রমিক নং</th>
                <th>আইটেমের নাম</th>
                <th>পরিমান</th>
                <th className="d-none d-md-table-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody>{taxAndFeeRows()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default memo(TradeLicence);
