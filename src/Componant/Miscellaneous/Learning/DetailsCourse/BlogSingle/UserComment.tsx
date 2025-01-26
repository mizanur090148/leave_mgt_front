import { blogSingleData } from '../../../../../Data/Learning/Learning'
import { LI, UL } from '../../../../../AbstractElements'
import BlogComment from './BlogComment'

const UserComment = () => {
  return (
    <>
        {blogSingleData.map((data,i)=>(
            <LI key={i}>
                {data.id !== 2 ?
                <BlogComment data={data} /> : 
                <UL className='simple-list flex-row'>
                    <LI>
                        <BlogComment data={data} />
                    </LI>
                </UL>
                }
            </LI>
        ))}
    </>
  )
}

export default UserComment