import { combineReducers } from "redux";
import AuthSlice from "./AuthSlice";
import PastReturnTotalSlice from "./PastReturnTotalSlice";
//import AddProductSlice from "./AddProductSlice";
//import BookmarkHeaderSlice from "./BookmarkHeaderSlice";
//import BookmarkTabSlice from "./BookmarkTabSlice";
//import CartSlice from "./CartSlice";
//import ChatSlice from "./ChatSlice";
//import ContactSlice from "./ContactSlice";
//import FilterSlice from "./FilterSlice";
import FormWizardTwoSlice from "./FormWizardTwoSlice";
import LayoutSlice from "./LayoutSlice";
//import LetterBoxSlice from "./LetterBoxSlice";
//import NumberingWizardSlice from "./NumberingWizardSlice";
//import ProductSlice from "./ProductSlice";
//import ProjectSlice from "./ProjectSlice";
//import StudentWizardSlice from "./StudentWizardSlice";
//import TasksSlice from "./TasksSlice";
import ThemeCustomizerSlice from "./ThemeCustomizerSlice";
//import ToDoSlice from "./ToDoSlice";
import TwoFactorSlice from "./TwoFactorSlice";
import VerticalWizardSlice from "./VerticalWizardSlice";

export default combineReducers({
  auth: AuthSlice,
  pastReturn: PastReturnTotalSlice,
  layout: LayoutSlice,
  twoFactor: TwoFactorSlice,
  formWizardTwo: FormWizardTwoSlice,
  //numberingWizard: NumberingWizardSlice,
  //studentWizard: StudentWizardSlice,
  verticalWizard: VerticalWizardSlice,
  //product: ProductSlice,
  //chat: ChatSlice,
  //contact: ContactSlice,
  //tasks: TasksSlice,
  //bookmarkTab: BookmarkTabSlice,
  //filterData: FilterSlice,
  //cartData: CartSlice,
  //todo: ToDoSlice,
  //project: ProjectSlice,
  //addProduct: AddProductSlice,
  themeCustomizer: ThemeCustomizerSlice,
  //letterBox: LetterBoxSlice,
  //bookmarkHeader: BookmarkHeaderSlice,
});
