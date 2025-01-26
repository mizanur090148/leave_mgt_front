import { Col } from 'reactstrap'
import { LossSupportTicket, ProfitSupportTicket } from '../../../../utils/Constant'
import { LI, UL } from '../../../../AbstractElements'

const ProfitAndLoss = () => {
  return (
    <Col xs="7">
      <div className="text-end">
        <UL className='simple-list'>
          <LI className="border-0">{ProfitSupportTicket}
            <span className="product-stts txt-primary ms-2">{8989}
              <i className="icon-angle-up f-12 ms-2 me-0"></i>
            </span>
          </LI>
          <LI className="border-0">{LossSupportTicket}
            <span className="product-stts txt-danger ms-2">{2560}
              <i className="icon-angle-down f-12 ms-2 me-0"></i>
            </span>
          </LI>
        </UL>
      </div>
    </Col>
  )
}

export default ProfitAndLoss