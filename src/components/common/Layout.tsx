import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = ({ children }: { children?: ReactNode }) => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <div
      className={`ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light ${isSidebarVisible ? "sidebar-minified" : "sidebar-minified-out"}`}
      id="body"
    >
      <div className="wrapper">
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <Toaster />
        <div className="ec-page-wrapper">
          <Header toggleSidebar={toggleSidebar} />
          <div className="ec-content-wrapper">
            <div className="content">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
