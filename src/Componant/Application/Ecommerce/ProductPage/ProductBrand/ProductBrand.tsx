import { Card, CardBody } from 'reactstrap'
import { H4, LI, UL } from '../../../../../AbstractElements'
import { Brand } from '../../../../../utils/Constant'

const ProductBrand = () => {
  return (
    <Card>
      <CardBody>
        <div className="filter-block">
          <H4>{Brand}</H4>
          <UL className="simple-list">
            <LI className="pt-3">{'Clothing'}</LI>
            <LI className="pt-3">{'Bags'}</LI>
            <LI className="pt-3">{'Footwear'}</LI>
            <LI className="pt-3">{'Watches'}</LI>
            <LI className="pt-3">{'ACCESSORIES'}</LI>
          </UL>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductBrand