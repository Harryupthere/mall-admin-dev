import React from "react";
import { Menu, SubMenu } from "react-pro-sidebar";
import { images } from "../../../utils/customFn";
import './menuitems.scss'
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileAndSetting from "../dashboardheader/profileandsetting";
import { FileIcon, HomeIcon, NotificationsIcon, SettingIcon, UserIcon, WalletFilled } from "../../../icons/icons";
  const baseUrl = process.env.REACT_APP_BASE_URL

const MenuItems = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const SidebarItems = [
    {
      name: 'Home',
      link: `${baseUrl}`,
      imagepath: <HomeIcon />
    },
    {
      name: 'Admin List',
      link: `${baseUrl}admin-list`,
      imagepath: <HomeIcon />
    },
   
    {
      name: 'Roles',
      link: `${baseUrl}roles`,
      imagepath: <HomeIcon />
    },

    {
      name: 'Permissions',
      link: `${baseUrl}permissions`,
      imagepath: <HomeIcon />
    },

    {
      name: 'Payment-Types',
      link: `${baseUrl}payment-types`,
      imagepath: <HomeIcon />
    },
    {
      name: 'Product-Categories',
      link: `${baseUrl}product-categories`,
      imagepath: <HomeIcon />
    },
        {
      name: 'Product-Levels',
      link: `${baseUrl}product-levels`,
      imagepath: <HomeIcon />
    },
        {
      name: 'Product-Types',
      link: `${baseUrl}product-types`,
      imagepath: <HomeIcon />
    },
            {
      name: 'Products',
      link: `${baseUrl}products`,
      imagepath: <HomeIcon />
    },

                {
      name: 'Upload Files',
      link: `${baseUrl}upload-files`,
      imagepath: <HomeIcon />
    },
    
    //         {
    //   name: 'Add Ons',
    //   link: `${baseUrl}add-ons`,
    //   imagepath: <HomeIcon />
    // },
    //         {
    //   name: 'Coupon Codes',
    //   link: `${baseUrl}coupon-codes`,
    //   imagepath: <HomeIcon />
    // },
    {
      name: 'Affiliate Lounge',
      link: `${baseUrl}lounge`,
      imagepath: <FileIcon />
    },
    {
      name: 'User List',
      link: `${baseUrl}users`,
      imagepath: <UserIcon />
    },
    {
      name: 'Wallet',
      link: `${baseUrl}wallet`,
      imagepath: <WalletFilled />
    },
    {
      name: 'Updates',
      link: `${baseUrl}updates`,
      imagepath: <NotificationsIcon />
    },

    {
      name: 'Settings',
      link: '#',
      imagepath: <SettingIcon />
    },

  ]

  // function handleNavigate(to) {
  //   navigate(to)
  // }
  return (
    <div className="sidebar-menus">
      <Link to="/">
        <div className="sidebarlogo">
          <img src={images['logo.png']} alt="logo" />
        </div>
      </Link>
      <div className="show-in-mobile">
        <ProfileAndSetting />
      </div>
      <Menu className="sidebar_icon_list ">
        {SidebarItems.map((item, index) => {
          // Check if the parent or any submenu link matches the current location
          const isActive = location.pathname === item.link;
          return (
            <SubMenu
              key={index}
              className={`${isActive ? 'active' : ''} main-menu-tab`}
              onClick={() => navigate(item.link)}
              label={
                <div className="sidebar_label">
                  <div className="icon">
                    {item.imagepath}
                  </div>
                  <div className="name">
                    {item.name}
                  </div>
                </div>
              }
            >
            </SubMenu>
          );
        })}

      </Menu>
    </div>
  );
};

export default MenuItems;
