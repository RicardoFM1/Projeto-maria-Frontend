import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    
  <StrictMode>
    <BrowserRouter>
    <ToastContainer
      autoClose={3000}
      position="top-center"
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      draggable
      theme="light"
      transition={Bounce}
      limit={1}
    />
    
    <App />
    </BrowserRouter>
  </StrictMode>
 
);
