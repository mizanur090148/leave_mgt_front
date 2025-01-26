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
import moment from "moment";
import "../../../../print.scss"
import { capitalizeFirst } from "../../../../utils/helpers";

const PrintTaxSummary = () => {

  const contentRef = useRef<HTMLDivElement>(null);
  const userInfo = useSelector((state: any) => state.auth.data);
  const assessmentIncomeYear = useSelector((state: any) => state?.pastReturn?.assessmentIncomeYear);
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
          <CardBody className="tax-return-print">
            <div ref={contentRef} style={{ margin: '7px' }}>
              <div className="first-page">
                <div className="first-page-top">
                  <img src={BdMonogramImg} alt="image" />
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
                </div>
                <Row>
                  <Col sm="3">
                    <span className="title">Assessment Year</span>
                  </Col>
                  <Col>
                    <span className="colon">:</span>
                    <span className="value">{assessmentIncomeYear?.assessmentYear}</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <span className="title">Name of the Taxpayer</span>
                  </Col>
                  <Col>
                    <span className="colon">:</span>
                    <span className="value">{user_detail?.full_name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <span className="title"><span className="title">2. NID/Passport Number (if no NID)</span></span>
                  </Col>
                  <Col>
                    <span className="colon">:</span>
                    <span className="value">{user_detail?.nid ?? user_detail?.passport_no}</span>
                  </Col>
                </Row>
                <Row className="tin">
                  <Col sm="1">
                    <span className="title">TIN:</span>
                  </Col>
                  <Col>
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
                  <Col sm="1">
                    <span className="title">Circle:</span>
                  </Col>
                  <Col sm="3">
                    <span className="value">{user_detail?.circle?.name}</span>
                  </Col>
                  <Col sm="1">
                    <span className="title">Zone:</span>
                  </Col>
                  <Col sm="3">
                    <span className="value">{user_detail?.zone?.name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <span className="title">Total Income Shown</span>
                  </Col>
                  <Col>
                    <span className="colon">:</span>
                    <span className="value">500000 Tk.</span>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <span className="title">Total Tax Paid:</span>
                  </Col>
                  <Col>
                    <span className="colon">:</span>
                    <span className="value">600000 Tk.</span>
                  </Col>
                </Row>
                <table className="retrun-register-table">
                  <tbody>
                    <tr>
                      <td width="70%">Serial No. of Return Register</td>
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
                <Row className="seal-signature">
                  <Col sm="6">
                    Seal of Tax Office
                  </Col>
                  <Col sm="6">
                    <span>Signature and Seal of the Official Receiving the Return</span>
                  </Col>
                </Row>
                <div className="first-page-footer">
                  Please Visit: "https://etaxnbr.gov.bd" website to get Income Tax Certificate in Online
                </div>
              </div>

              {/* Page Break */}
              <div className="page-break"></div>

              <div className="second-page">
                <div className="second-page-top">
                  <div className="national-board">National Board of Revenue</div>
                  <div className="nbr-website">www.nbr.gov.bd</div>
                  <div className="return-income">RETURN OF INCOME</div>
                  <div className="individual-person">For Individual Person</div>
                </div>

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

                <div className="applicable-for">[Applicable for individual person having taxable income below Tk. 5,00,000 and total asset below Tk. 40,00,000]</div>

                <div className="taxpayer-info">
                  <Row>
                    <Col sm={5}>
                      <span className="title">1. Name of the Taxpayer</span>
                    </Col>
                    <Col>
                      <span className="colon">:</span>
                      <span className="value">{user_detail?.full_name}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={5} className="pr-0">
                      <span className="title">2. NID/Passport Number (if no NID)</span>
                    </Col>
                    <Col>
                      <span className="colon">:</span>
                      <span className="value">{user_detail?.nid ?? user_detail?.passport_no}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={1}>3. TIN</Col>
                    <Col>
                      <table className="tin-table">
                        <tbody>
                          <tr>
                            {(user_detail?.etin_number
                              ? user_detail?.etin_number?.toString().split("")
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
                    <Col sm={2}>4. (a) Circle:</Col>
                    <Col sm={4}>{user_detail?.circle?.name}</Col>
                    <Col sm={2}>(b) Tax Zone:</Col>
                    <Col>{user_detail?.zone?.name}</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>5. Assessment Year:  <span className="value">{`${moment()
                      .subtract(1, "year")
                      .format("YYYY")}-${moment().format("YY")}`}</span></Col>
                    <Col sm={5}>6. Residential Status:
                      <span className="value">{capitalizeFirst(user_detail?.residential_status)}</span>
                    </Col>
                  </Row>

                  <Row>
                    <Col>7. Address of Contact / Employer / Name of Business Organization:</Col>
                  </Row>
                  <Row>
                    <Col sm={1}></Col>
                    <Col>{user_detail?.present_address}</Col>
                  </Row>
                  <Row>
                    <Col sm={1}></Col>
                    <Col>Mobile/Phone: {user_detail?.phone_no}</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>8. Source of Income:</Col>
                    <Col><span>:</span> <span className="value">{capitalizeFirst(user_detail?.profession)}</span></Col>
                  </Row>
                  <Row>
                    <Col sm={5}>9. Total Asset:</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>10. Total Income:</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>11. Chargeable Tax:</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>12. Tax Rebate:</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>13. Tax Payable:</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5} className="pr-0">14. Tax Deducted/Collected at Source (if any)</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>15. Tax Paid with this Return:</Col>
                    <Col>:</Col>
                  </Row>
                  <Row>
                    <Col sm={5}>16. Lifestyle Expense:</Col>
                    <Col>:</Col>
                  </Row>
                  <section className="verification">
                    <Row>
                      <Col className="text-center fw-bold">Verification</Col>
                    </Row>
                    <div>
                      I, ....................... Father/Husband:
                    </div>
                    <div>
                      <table className="tin-table">
                        <tbody>
                          <tr>
                            <td style={{ border: 'none' }}>TIN </td>{(user_detail?.etin_number
                              ? user_detail?.etin_number?.toString().split("")
                              : Array(14).fill("")
                            ).map((item: string, index: number) => (
                              <td key={index}>{item}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                      <p className="declare-that">
                        declares that the information given in this retum, statement and attached evidences are correct and
                        complete to the best of my belief and knowledge. Besides I am not a Shareholder of any company,
                        I have no motor vehicle, I have no asset abroad and I do not own any house property or apartment
                        in any city corporation area.
                      </p>
                    </div>
                    <Row style={{ marginTop: 0 }}>
                      <Col sm={9}>Place:</Col>
                      <Col></Col>
                    </Row>
                    <Row style={{ marginTop: 0 }}>
                      <Col sm={9}>Date: ...........</Col>
                      <Col>Signature</Col>
                    </Row>
                    <Row>
                      <Col>
                        Optional: Please give short details of Tax calculation, statement of lifestyle expenses,
                        list of proof attached statement of asstes and liabilities.
                      </Col>
                    </Row>
                  </section>
                </div>
              </div>

              <div className="page-break"></div>

              <div className="third-page">
                <section className="instruction-area">
                  <div className="instructions-box">
                    <div className="instruction-title">Instructions:</div>
                    <div className="instruction-item">
                      <p>
                        (1) This return of income shall be signed and verified by the individual person as prescribed by the Income Tax Act, 2023.
                      </p>
                    </div>
                    <div className="instruction-item">
                      <span style={{ textDecoration: 'underline' }}>(2). Enclose where applicable:</span>
                      <p>
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
                      <p>
                        (3) Documents furnished to support the declaration should be signed by the taxpayer or his/her authorized representative.
                      </p>
                    </div>
                    <div className="instruction-item">
                      <p>(4) If needed, please use a separate sheet.</p>
                    </div>
                  </div>
                </section>
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