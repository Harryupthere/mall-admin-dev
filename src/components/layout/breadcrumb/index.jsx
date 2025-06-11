import React from 'react'
import { Link } from 'react-router-dom';
import { DownIcon } from '../../../icons/icons';

const Breadcrumbs = ({ breadcrumbdata }) => {
    return (
        <div className='common_breadcrumbs'>
            <div className='breadcrumb_list'>
                <div className='list-item'>
                <span>
                    <Link to='/'>Home</Link>
                </span>
                <span className='icon'>
                    <DownIcon />
                </span>
                </div>
                {breadcrumbdata?.map((item,index) => (
                    <div key={index} className='list-item'>
                        <span>
                            <Link to={item.links}>{item.name}</Link>
                        </span>
                        <span className='icon'>
                            <DownIcon />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Breadcrumbs;
