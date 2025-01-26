import { UL } from '../../../../../AbstractElements';
import { CommonProfileLikeType } from '../../../../../Types/Application/Users/UsersProfile';
import IconList from './IconList';

const CommonProfileLike = ({commentsNumber,likeNumber}:CommonProfileLikeType) => {
  return (
    <div className="like-comment mt-4 step7">
      <UL className="list-inline simple-list flex-row">
        <IconList endNumber={likeNumber} like />
        <IconList endNumber={commentsNumber}  />
      </UL>
    </div>
  )
}

export default CommonProfileLike