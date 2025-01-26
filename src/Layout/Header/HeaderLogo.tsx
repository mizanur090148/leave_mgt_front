import { Link } from "react-router-dom";
import Image from "../../CommonElements/Media";
import { dynamicImage } from "../../Service";

const HeaderLogo = () => {
  return (
    <div className="header-logo-wrapper col-auto">
        <div className="logo-wrapper">
            <Link to={"/"}>
                <Image className="img-fluid for-light" src={dynamicImage("logo/logo.png")} alt="logo"/>
                <Image className="img-fluid for-dark" src={dynamicImage("logo/logo_light.png")} alt="logo"/>
            </Link>
        </div>
    </div>
  );
};

export default HeaderLogo;
