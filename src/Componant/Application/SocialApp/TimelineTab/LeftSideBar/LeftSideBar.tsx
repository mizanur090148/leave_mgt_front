import { Fragment } from 'react'
import { Col } from 'reactstrap'
import MyProfileClass from './MyProfileClass'
import MutualFriends from './MutualFriends'
import ActivityFeedClass from './ActivityFeedClass'

const LeftSideBar = () => {
  return (
    <Fragment>
      <Col xl="12">
        <MyProfileClass />
      </Col>
      <Col xl="12"> 
        <MutualFriends /> 
      </Col>
      <Col xl="12">
        <ActivityFeedClass />
      </Col>
    </Fragment>
  )
}

export default LeftSideBar