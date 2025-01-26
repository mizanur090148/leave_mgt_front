import { H4 } from '../../../../../../AbstractElements'
import { CategoryHeading, NewProducts, Price } from '../../../../../../utils/Constant'
import BrandFilter from './BrandFilter'
import ColorsFilter from './ColorsFilter'
import GenderFilter from './GenderFilter'
import RangeSlider from './RangeSlider'

const Category = () => {
  return (
    <>
      <div className="product-filter">
        <H4 className="f-w-600">{CategoryHeading}</H4>
        <GenderFilter />
      </div>
      <BrandFilter />
      <ColorsFilter />
      <div className="product-filter pb-0">
        <H4 className="f-w-600">{Price}</H4>
        <RangeSlider />
        <H4 className="f-w-600">{NewProducts}</H4>
      </div>
    </>
  )
}

export default Category