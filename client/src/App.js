import React from "react";
import { Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AuthIndex from "./screens/AuthIndex";
import MainIndex from "./screens/MainIndex";
import { ReactNotifications } from "react-notifications-component";
function App(props) {
  const location = useLocation();
  console.log(props)

  function activekey() {
    const path = location.pathname;
    console.log(path);
    return path
    // var res = window.location.pathname
    // var baseUrl = process.env.PUBLIC_URL
    // baseUrl = baseUrl.split("/");
    // res = res.split("/");
    // res = res.length > 0 ? res[baseUrl.length] : "/";
    // res = res ? "/" + res : "/";;
    // const activeKey1 = res;
    // return activeKey1
  }

  if (activekey() === "/template/my-task/react/sign-in" || activekey() === "/template/my-task/react/sign-up" || activekey() === "/template/my-task/react/password-reset" || activekey() === "/template/my-task/react/2-step-authentication" || activekey() === "/template/my-task/react/page-404") {
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
