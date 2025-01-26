import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { Btn } from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BdMonogramImg from '../../../../images/general/bdMonogram.png';
import { useSelector } from "react-redux";

const PrintTaxSummary = () => {

  const contentRef = useRef<HTMLDivElement>(null);
  const userInfo = useSelector((state: any) => state.auth.data);
  const { user_detail } = userInfo ?? {};

  console.log(user_detail, "userInfo")

  const reactToPrintFn = useReactToPrint({
    content: () => contentRef.current, // Correct property name and value
  });

  return (
    <Col xl="9">
      <Form className="theme-form">
        <UserDetailsInformation />
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Tax Return Summary"}
            tagClass={"card-title mb-0"}
          />
          <Row className="mb-3">
            <Col className="text-end">
              <span style={{ cursor: 'pointer', paddingRight: '15px', paddingTop: '10px', fontSize: '18px' }}>
                <i className="fa fa-print pointer" onClick={reactToPrintFn}>Print</i>
              </span>
            </Col>
          </Row>
          <CardBody>
            <div ref={contentRef}>
              <div className="first-page">
                <section className="first-top">
                  <div>
                    <img src={BdMonogramImg} alt="image" />
                  </div>
                  <div className="bd-name">
                    Government of the People's Republic of Bangladesh
                  </div>
                  <div className="national-board">
                    National Board of Revenue
                  </div>
                  <div className="income-tax">
                    (Income Tax Office)
                  </div>
                  <div className="ack-receipt">
                    <u>Acknowledgement Receipt/Certificate of Return of Income</u>
                  </div>
                </section>
                <Row>
                  <Col sm="3">
                    <Label>Assessment Year:</Label>
                  </Col>
                  <Col sm="9">
                    <span ></span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label>NID/Passport No (If No NID):</Label>
                  </Col>
                  <Col sm="9">
                    <span>{user_detail?.nid}</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="2">
                    <Label>TIN:</Label>
                  </Col>
                  <Col sm="9">
                    <table className="tin-table">
                      <tbody>
                        <tr>
                          {(user_detail?.etin_number
                            ? user_detail?.etin_number.toString().split("")
                            : Array(14).fill("")
                          ).map((item: string, index: number) => (
                            <td key={index}>{item}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label>Circle:</Label>
                  </Col>
                  <Col sm="3">
                    <span>{user_detail?.circle?.name}</span>
                  </Col>
                  <Col sm="3">
                    <Label>Zone:</Label>
                  </Col>
                  <Col sm="3">
                    <span>{user_detail?.zone?.name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label>Total Income Shown:</Label>
                  </Col>
                  <Col sm="9">
                    <span></span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <Label>Total Tax Paid:</Label>
                  </Col>
                  <Col sm="9">
                    <span ></span>
                  </Col>
                </Row>
                <table className="retrun-register-table">
                  <tbody>
                    <tr>
                      <td width="80%">Serial No. of Return Register</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Volume No. of Return Register</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Date of Return Submission</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <Row className="mt-5">
                  <Col sm="3">
                    Seal of Tax Office
                  </Col>
                  <Col sm="9">
                    <span>Signature and Seal of the Official Receiving of the Return</span>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col className="text-center">
                    Please Visit: "https://etaxnbr.gov.bd" website to get Income Tax Certificate in Online
                  </Col>
                </Row>
              </div>
              <div className="second-page">
                <div className="tax-return-form">
                  <h2>National Board of Revenue</h2>
                  <p className="text-center"><a href="https://www.nbr.gov.bd">www.nbr.gov.bd</a></p>
                  <h3 className="text-center">Return of Income</h3>
                  <h3 className="text-center">For Individual Person</h3>

                  <section className="official-use">
                    <table className="retrun-register-table">
                      <tbody>
                        <tr><td colSpan={2}><center><b>For Official Use</b></center></td></tr>
                        <tr>
                          <td width="80%">Serial No. of Return Register</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Volume No. of Return Register</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Date of Return Submission</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                  [Applicable for individual person having taxable income below Tk. 5,00,000 and total asset below Tk. 40,00,000]

                  <section className="taxpayer-info">
                    <Row>
                      <Col md={4}>1. Name of the Taxpayer</Col>
                      <Col>: </Col>
                    </Row>
                    <Row>
                      <Col md={4}>2. NID / Passport Number (if no NID)</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={1}>3. TIN</Col>
                      <Col>:
                        <table className="tin-table">
                          <tbody>
                            <tr>
                              {(user_detail?.etin_number
                                ? user_detail?.etin_number.toString().split("")
                                : Array(14).fill("")
                              ).map((item: string, index: number) => (
                                <td key={index}>{item}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2}>4. (a) Circle:</Col>
                      <Col md={4}>{user_detail?.circle?.name}</Col>
                      <Col md={2}>(b) Tax Zone:</Col>
                      <Col>{user_detail?.zone?.name}</Col>
                    </Row>
                    <Row>
                      <Col md={5}>6. Assessment Year: ..................</Col>
                      <Col md={5}>6. Residential Status: ................</Col>
                    </Row>

                    <Row>
                      <Col>7. Address of Contact / Employer / Name of Business Organization:</Col>
                    </Row>
                    <Row>
                      <Col md={1}></Col>
                      <Col>..................................................
                        ....................................................
                        .................................</Col>
                    </Row>
                    <Row>
                      <Col md={1}></Col>
                      <Col>Mobile/Phone..................................................
                        ....................................................
                        .................................</Col>
                    </Row>

                    <Row>
                      <Col md={4}>8. Source of Income:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>9. Total Asset:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>10. Total Income:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>11. Chargeable Tax:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>12. Tax Rebate:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>13. Tax Payable:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4} className="pr-0">14. Tax Deducted/Collected at Source (if any)</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>15. Tax Paid with this Return:</Col>
                      <Col>:</Col>
                    </Row>
                    <Row>
                      <Col md={4}>16. Lifestyle Expense:</Col>
                      <Col>:</Col>
                    </Row>
                  </section>

                  <section className="verification">
                    <Row>
                      <Col className="text-center fw-bold">Verification</Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>
                          I, ....................... (Father/Husband:
                          <br />
                          TIN <table className="tin-table">
                            <tbody>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                          declares that the information given in this retum, statement and attached evidences are correct and
                          complete to the best of my belief and knowledge. Besides I am not a Shareholder of any company,
                          I have no motor vehicle, I have no asset abroad and I do not own any house property or apartment
                          in any city corporation area.
                        </p>
                      </Col>
                    </Row>
                    <div>
                      <Col md={4}>Place:</Col>
                      <Col></Col>
                    </div>
                    <div>
                      <Col md={4}>Date:</Col>
                      <Col>:</Col>
                    </div>
                    <div>
                      <Col md={4}>Signature:</Col>
                      <Col></Col>
                    </div>
                  </section>
                  <section>
                    <div className="instructions-box">
                      <h3>Instructions:</h3>
                      <div className="instruction-item">
                        <span>1. </span>
                        <p>
                          This return of income shall be signed and verified by the individual person as prescribed by the Income Tax Act, 2023.
                        </p>
                      </div>
                      <div className="instruction-item">
                        <span>2. </span>
                        <p>
                          Enclose where applicable:
                          <div className="sub-section">
                            <p>
                              a. Salary statement for salary income; Bank statement for interest; Certificate for interest on savings instruments; Rent agreement, receipts of municipal tax and land revenue, statement of house property loan interest, insurance premium for house property income; Statement of professional income as per IT Rule-8; Copy of assessment/income statement and balance sheet for partnership income; Documents of capital gain; Dividend warrant for dividend income; Statement of other income; Documents in support of investments in savings certificates, LIP, DPS, Zakat, stock/share etc.;
                            </p>
                            <p>
                              b. Income and expenses account statement, production Accounts, commercial accounts, profit and loss accounts and balance sheet in case of business income;
                            </p>
                            <p>c. Computation of income according to Income Tax Act, 2023.</p>
                          </div>
                        </p>
                      </div>
                      <div className="instruction-item">
                        <span>3. </span>
                        <p>
                          Documents furnished to support the declaration should be signed by the taxpayer or his/her authorized representative.
                        </p>
                      </div>
                      <div className="instruction-item">
                        <span>4. </span>
                        <p>If needed, please use a separate sheet.</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default PrintTaxSummary;
