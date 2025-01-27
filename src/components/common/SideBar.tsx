import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ isSidebarVisible }: { isSidebarVisible: boolean }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<boolean>();

  const menuItems = [
    {
      label: "Dashboard",
      icon: "mdi mdi-view-dashboard-outline",
      path: "/",
    },
    {
      label: "Vendors / Store",
      icon: "mdi mdi-account-group-outline",
      path: "/vendors",
    },
    {
      label: "Users",
      icon: "mdi mdi-account-group",
      path: "/users",
    },
    {
      label: "Categories",
      icon: "mdi mdi-dns-outline",
      subMenu: [
        { label: "Main Category", path: "/category" },
        { label: "Sub Category", path: "/sub-category" },
      ],
    },
    {
      label: "Products",
      icon: "mdi mdi-palette-advanced",
      subMenu: [
        { label: "Add Product", path: "/product-form" },
        { label: "List Product", path: "/product-list" },
        { label: "Grid Product", path: "/product-grid" },
      ],
    },
    {
      label: "Orders",
      icon: "mdi mdi-cart",
      path: "/orders",
    },
    {
      label: "Reviews",
      icon: "mdi mdi-star-half",
      path: "/review-list",
    },
    {
      label: "Banners",
      icon: "mdi mdi-billboard",
      path: "/banners",
    },

    {
      label: "Coupons",
      icon: "mdi mdi-ticket-percent",
      path: "/coupons",
    },
  ];

  // State to manage collapsed sections and sidebar visibility
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  const handleToggleCollapse = (label: string) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div
      className="sidebar-container overflow-y-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ec-left-sidebar ec-bg-sidebar">
        <div id="sidebar" className="sidebar ec-sidebar-footer">
          <div className="ec-brand">
            <Link to="/" title="Vastrafit">
              <img
                className="ec-brand-icon"
                src={"/assets/img/logo/ec-site-logo.png"}
                alt="Vastrafit"
              />
              <span className="ec-brand-name text-truncate">Vastrafit</span>
            </Link>
          </div>

          {/* Sidebar Scrollable Navigation */}
          <div className="ec-navigation" data-simplebar>
            <ul className="nav sidebar-inner" id="sidebar-menu">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`has-sub ${
                    item.subMenu &&
                    item.subMenu.some((sub) => isActive(sub.path))
                      ? "active"
                      : isActive(item.path!)
                  }`}
                >
                  <Link
                    className="sidenav-item-link"
                    to={item.path || "#"}
                    onClick={() =>
                      item.subMenu && handleToggleCollapse(item.label)
                    }
                  >
                    <i className={item.icon}></i>
                    <span className="nav-text">{item.label}</span>
                    {item.subMenu && (
                      <motion.b
                        initial={{ rotate: 0 }}
                        animate={{
                          rotate: collapsed[item.label] ? 90 : 0,
                        }}
                        exit={{ rotate: 0 }}
                        className="caret"
                      ></motion.b>
                    )}
                  </Link>
                  {(!isSidebarVisible || isHovered) && item.subMenu && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: collapsed[item.label] ? "auto" : 0,
                        opacity:
                          isHovered && collapsed[item.label]
                            ? 1
                            : isSidebarVisible
                              ? 0
                              : collapsed[item.label]
                                ? 1
                                : 0,
                      }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`collapse `}
                    >
                      <ul
                        className="sub-menu"
                        id={item.label.toLowerCase()}
                        data-parent="#sidebar-menu"
                      >
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex} className={isActive(subItem.path)}>
                            <Link
                              className="sidenav-item-link"
                              to={subItem.path}
                            >
                              <span className="nav-text">{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
