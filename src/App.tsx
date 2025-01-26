import { Provider } from "react-redux";
import RouterData from "./Routes";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./Store/Index";
import { PersistGate } from "redux-persist/integration/react";

// const App = () => {
//   return (
//     <>
//       <Provider store={Store} >
//         <RouterData />
//         <ToastContainer />
//       </Provider>
//     </>
//   );
// };

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <QueryClientProvider client={queryClient}> */}
          <RouterData />
          {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
          {/* </QueryClientProvider> */}
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
