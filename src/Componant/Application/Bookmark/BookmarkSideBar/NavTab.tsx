import { Nav } from "reactstrap";
import { Btn, LI } from "../../../../AbstractElements";
import { Href, NewBookmark, Tags, Views } from "../../../../utils/Constant";
import { Bookmark, PlusCircle } from "react-feather";
import {
  sideBarData,
  sideBarData2,
} from "../../../../Data/Application/Bookmark/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddModal,
  setTagModal,
  updateActiveTabs,
} from "../../../../Store/Slices/BookmarkTabSlice";
import BookmarkModal from "./BookmarkModal";
import ModalTag from "./ModalTag";
import { Link } from "react-router-dom";

const NavTab = () => {
  const { activeTabs } = useSelector((state: any) => state.bookmarkTab);
  const dispatch = useDispatch();
  const onHandleClick = (id: string) => {
    dispatch(updateActiveTabs(id));
  };
  return (
    <Nav className="main-menu" role="tablist">
      <LI className="nav-item">
        <Btn
          className="badge-light-primary d-block w-100 btn-mail txt-primary"
          color="transparent"
          onClick={() => dispatch(setAddModal())}
        >
          <Bookmark className="me-2" />
          {NewBookmark}
          <BookmarkModal />
        </Btn>
      </LI>
      <LI className="nav-item">
        <span className="main-title">{Views}</span>
      </LI>
      {sideBarData.map((data: any, index: any) => (
        <LI key={index}>
          <Link
            className={`show ${activeTabs === data.value ? "active" : ""}`}
            onClick={() => onHandleClick(data.value)}
            to={Href}
          >
            <span className="title"> {data.tittle}</span>
          </Link>
        </LI>
      ))}
      <LI>
        <hr />
      </LI>
      <LI>
        <span className="main-title f-w-700">
          {Tags}
          <span className="pull-right" onClick={() => dispatch(setTagModal())}>
            <a href={Href}>
              <PlusCircle />
            </a>
          </span>
        </span>
      </LI>
      <ModalTag />
      {sideBarData2.map((data: any, index: any) => (
        <LI key={index}>
          <Link
            className={`show ${activeTabs === data.value ? "active" : ""}`}
            onClick={() => onHandleClick(data.value)}
            to={Href}
          >
            <span className="title"> {data.tittle}</span>
          </Link>
        </LI>
      ))}
    </Nav>
  );
};

export default NavTab;
