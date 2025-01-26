import { BlogWithoutDetailHeading } from '../../../../../utils/Constant'
import { H5, LI, P, UL } from '../../../../../AbstractElements'

const ListOfBlogWithoutDetails = () => {
  return (
    <div className="blog-details-main">
      <UL className="blog-social simple-list flex-row">
        <LI className="digits rounded-0">9 April 2024</LI>
        <LI className="digits rounded-0">by: Admin</LI>
        <LI className="digits rounded-0">0 Hits</LI>
      </UL>
      <hr />
      <H5 className="f-w-600">{BlogWithoutDetailHeading}</H5>
      <P className="blog-bottom-details mt-2">A huge part of it is the incomparable beauty you can encounter every day.People just anymore profound.</P>
    </div>
  )
}

export default ListOfBlogWithoutDetails