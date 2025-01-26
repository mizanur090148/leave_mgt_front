import { H6, Image, LI, P, UL } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Service'
import { Col, Row } from 'reactstrap'
import { BlogSingleDataType } from '../../../../../Types/Blog/BlogType'


const BlogComment = (props: { data: BlogSingleDataType }) => {
  const {data} = props
  return (
    <>
      <div className="d-flex align-self-center">
        <Image className="align-self-center" src={dynamicImage(data.src)} alt="Generic image" />
        <div className="flex-grow-1">
          <Row>
            <Col md="4">
                <H6 className="mt-0">{data.name}
                    <span>( {data.post} )</span>
                </H6>
            </Col>
            <Col md="8">
                <UL className="comment-social float-start float-md-end flex-row">
                    <LI>
                        <i className="icofont icofont-thumbs-up"> </i>{data.hits}
                    </LI>
                    <LI>
                        <i className="icofont icofont-ui-chat"></i>{data.comments}
                    </LI>
                </UL>
            </Col>
          </Row>
          <P>{data.detail}</P>
        </div>
      </div>
    </>
  )
}

export default BlogComment