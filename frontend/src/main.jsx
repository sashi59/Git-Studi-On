import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import { LectureContextProvider } from "./context/LectureContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <LectureContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LectureContextProvider>
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>
);
