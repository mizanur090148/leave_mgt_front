import { useDispatch } from "react-redux";
import { setGridView } from "../../../../Store/Slices/BookmarkTabSlice";
import { LI, UL } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";
import { Grid, List } from "react-feather";

const ViewBookmark = () => {
  const dispatch = useDispatch();
  //const gridBookmark = () => dispatch(() => dispatch(setGridView(true)));
  //const listBookmark = () => dispatch(() => dispatch(setGridView(false)));
  return (
    <UL className="simple-list flex-row">
      <LI>
        <Link className="grid-bookmark-view" to={Href}>
          {/* <Grid onClick={gridBookmark} /> */}
        </Link>
      </LI>
      <LI>
        <Link className="list-layout-view" to={Href}>
          {/* <List onClick={listBookmark} /> */}
        </Link>
      </LI>
    </UL>
  );
};

export default ViewBookmark;
