import React, { useState } from 'react'
import { Breadcrumbs, MenuItems, ProfileAndSetting, Title } from '../../components';
import './dashboardheader.scss'
import Drawer from "react-modern-drawer";
import { MenuIcon } from '../../icons/icons';

const DashboardHeader = ({ heading, breadcrumbdata }) => {
  const [showMenu, setShowMeu] = useState(false);
  const toggleMenu = () => {
    setShowMeu((prevState) => !prevState)
  }
    return (<>
            <div className='dashboardheader'>
              <div className='divide-components'>
                  <div className='left-side'>
                      <button className="toggle-button" onClick={toggleMenu}>
                        <MenuIcon />
                      </button>
                    <div className='name-and-details'>
                    <Title heading={heading} />
                    <Breadcrumbs breadcrumbdata={breadcrumbdata} />
                  </div>
                </div>
                <div className='right-side profile-setting'>
                  <ProfileAndSetting />
                </div>
              </div>
            </div>
              <Drawer
                open={showMenu}
                onClose={toggleMenu}
                direction='left'
                className='mobile-menu'
                style={{ width: "200px" }}>
                <MenuItems />
              </Drawer>
              </>
      )
  }

export default DashboardHeader;
