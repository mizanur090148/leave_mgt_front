import { H5, LI, P, UL } from '../../../../../AbstractElements'
import { Comments, Hits } from '../../../../../utils/Constant';

const UserBlogDetails = () => {
  const MarkJecnoBlog = "People just dont do it anymore. We have to change that. Sometimes the simplest things are the most profound.";
  return (
    <div className="blog-details">
      <P>25 July 2024</P>
      <H5 className='text-white'>{MarkJecnoBlog}</H5>
      <UL className="blog-social flex-row d-block simple-list">
        <LI><i className="icofont icofont-user" />Mark Jecno</LI>
        <LI className="digits"><i className="icofont icofont-thumbs-up" />02 {Hits}</LI>
        <LI className="digits"><i className="icofont icofont-ui-chat" />598 {Comments}</LI>
      </UL>
    </div>
  )
}

export default UserBlogDetails