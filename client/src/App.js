import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AuthIndex from "./screens/AuthIndex";
import MainIndex from "./screens/MainIndex";
function App(props) {
  const location = useLocation();

  function activekey() {
    const path = location.pathname;
    return path

  }

  if (activekey() === "/template/my-task/react/sign-in" ||activekey() === "/" || activekey() === "/template/my-task/react/sign-up" || activekey() === "/template/my-task/react/password-reset" || activekey() === "/template/my-task/react/2-step-authentication" || activekey() === "/template/my-task/react/page-404") {
    return (
      <>
        <div id="mytask-layout" className="theme-indigo">
          <AuthIndex />
        </div>
      </>
    )
  }
  return (
    <>
      <div id="mytask-layout" className="theme-indigo">

        <Sidebar activekey={activekey()} history={props.history} />
        <MainIndex activekey={activekey()} />
      </div>
    </>
  );
}


export default App;
