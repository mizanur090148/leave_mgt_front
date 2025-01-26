import { FeatherIcons, H5, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { featuredCourseData } from "../../../../Data/Dashboard/EducationData";
import { Link } from "react-router-dom";

const FeaturedCoursesBody = () => {
  return (
    <tbody>
      {featuredCourseData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image
                  src={dynamicImage(`dashboard-4/featured/${data.image}`)}
                  alt="featured"
                />
              </div>
              <div className="flex-grow-1">
                <Link to={data.link}>
                  <H5>{data.title}</H5>
                </Link>
                <span>{data.name}</span>
              </div>
            </div>
          </td>
          <td>{data.date}</td>
          <td>
            <span className="d-flex align-item-center gap-2 font-primary">
              <FeatherIcons className="font-primary" iconName="Star" />
              {data.ratting}
            </span>
          </td>
          <td>{data.type}</td>
          <td className="initial-color" id={data.id}>
            <FeatherIcons iconName="Bookmark" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default FeaturedCoursesBody;
