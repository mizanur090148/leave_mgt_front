import {
  Card,
  CardBody,
  CardFooter,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Government from "../SalaryIncome/Government";
import NonGovernment from "../SalaryIncome/NonGovernment";
import { getRequest } from "../../../../utils/axiosRequests";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
//import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import IncomeEntryTop from "./IncomeEntryTop";
import { incomeTotalData } from "../../../../utils/helpers";
import { incomeEntry } from "../../../../Store/Slices/PastReturnTotalSlice";

const SalaryIncome = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const incomeEntryData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
  const [isSalaryIncome, setIsSalaryIncome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [salaryIncome, setSalaryIncome] = useState<any>({});
  const [id, setId] = useState<string>("");
  const dispatch = useDispatch();

  const getSalaryIncome = async () => {
    setLoading(true);
    await getRequest(`income-entries/${userInfo.id}`)
      .then((res) => {
        setLoading(false);
        setId(res?.data?.id);
        setIsSalaryIncome(res?.data?.salary_income?.isSalaryIncome ?? true);
        setSalaryIncome(res?.data?.salary_income);
      })
      .catch((error) => {
        setLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  useEffect(() => {
    //if (isSalaryIncome) {
    getSalaryIncome();
    //}
  }, []);

  const employeeSalaryType = ()=>{
    const empType = userInfo?.user_detail?.type_of_profession;
    return (empType === "government" || empType ==="autonomous") ? 'Government' : 'Non-government';
  }

  const topDataUpdate = (totalSalaryIncome: Number) => {
    const updatedState = {
      ...incomeEntryData,
      salary_income: totalSalaryIncome,
      total: incomeTotalData({ ...incomeEntryData, salary_income: totalSalaryIncome })
    };
    dispatch(incomeEntry(updatedState));
  }

  return (
    <Col xl="9">
      <IncomeEntryTop
        title={"Total Salary Income"}
        itemName={'salary_income'}
      />
      <Card className="profile-right salary-income">
        <CardHeaderCommon
          title={"Salary Income"}
          tagClass={"card-title mb-0"}
        />
        <CardBody>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <Fragment>
              <Row className="mb-1">
                <Col sm="6" md="6">
                  <FormGroup>
                    <Label
                      className="d-block"
                      check
                      htmlFor="is_salary_income-no"
                    >
                      Do you have any salary income?
                    </Label>
                    <Input
                      className="radio_animated"
                      id="is_salary_income-no"
                      type="radio"
                      value="false"
                      checked={isSalaryIncome === false}
                      onChange={() => setIsSalaryIncome(false)}
                    />
                    <span className="radio-right-space">No</span>
                    <Input
                      className="radio_animated pl-5"
                      id="is_salary_income-yes"
                      type="radio"
                      value="true"
                      checked={isSalaryIncome === true}
                      onChange={() => setIsSalaryIncome(true)}
                    />
                    <span>Yes</span>
                  </FormGroup>
                </Col>
                {isSalaryIncome && (
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Employee Type</Label>
                      <Input
                        type="text"
                        readOnly
                        defaultValue={
                          employeeSalaryType()
                        }
                      />
                    </FormGroup>
                  </Col>
                )}
              </Row>
              {isSalaryIncome && employeeSalaryType() === "Government" ? (
                  <Government
                    isSalaryIncome={isSalaryIncome}
                    salaryIncome={salaryIncome}
                    id={id}
                    setId={setId}
                    topDataUpdate={topDataUpdate}
                  />
                ) : (
                  <NonGovernment
                    isSalaryIncome={isSalaryIncome}
                    salaryIncome={salaryIncome}
                    id={id}
                    setId={setId}
                    topDataUpdate={topDataUpdate}
                  />
                )}
            </Fragment>
          )}
        </CardBody>
        <CardFooter className="text-end"></CardFooter>
      </Card>
    </Col>
  );
};

export default SalaryIncome;
