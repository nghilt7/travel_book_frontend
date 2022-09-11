import { ToastContainer } from "react-toastify";

import WebRoutes from "./routes/WebRoutes";

function App() {
  return (
    <div className="App">
      <WebRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
