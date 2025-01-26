import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Href } from "../../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../../Store/Slices/LetterBoxSlice";

const MailPagination = () => {
  const { page } = useSelector((state: any) => state.letterBox);
  const dispatch = useDispatch();
  const handlePagination = (value: boolean) => {
    dispatch(setPage(value));
  };
  return (
    <Pagination className="mail-pagination">
      <PaginationItem>
        <PaginationLink href={Href} previous />
      </PaginationItem>
      <PaginationItem
        active={!page ? true : false}
        onClick={() => handlePagination(false)}
      >
        <PaginationLink href={Href}>1</PaginationLink>
      </PaginationItem>
      <PaginationItem
        active={page ? true : false}
        onClick={() => handlePagination(true)}
      >
        <PaginationLink href={Href}>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href={Href} next />
      </PaginationItem>
    </Pagination>
  );
};

export default MailPagination;
