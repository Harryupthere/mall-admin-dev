import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dasboardheader'
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';


const AdminList = () => {

    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        callApi()
    }, [])
    const callApi = async () => {
        try {
            const adminRes = await fetchData(API_ENDPOINTS.getAdmin, navigate, "GET", {});
            if (adminRes?.success) {
                setList(adminRes?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            text: "S. No.",
            cell: (item, row) => { return (<>{row + 1}</>) }
        },
        {
            key: "username",
            text: "Username",
            className: "username",
            align: "left",
            sortable: true,
        },
        {
            key: "email",
            text: "Email",
            sortable: true,
        },
        {
            key: "role_name",
            text: "Role Name",
        },

        {
            key: "role_description",
            text: "Description",
            className: "role_description",
        },
        {
            key: "created_at",
            text: "Created At",
            sortable: true,
        },
        {
            key: "updated_at",
            text: "Updated At",
        },
        {
            text: 'Permissions',
            cell: (item) => {
                return (<>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        {item?.role?.permissions?.length > 0 ? (
                            item.role.permissions.map((permission, idx) => (
                                <li key={idx}>{permission.name}</li>
                            ))
                        ) : (
                            <li>-</li>
                        )}
                    </ul></>)
            }
        },
    ]

    const configForTable = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: "advance",
        button: {
            excel: true,
            print: false,
        },
    };
    return (
        <>
            <DashboardHeader heading="Users" />
            <div className='main'>
                <div className='customer-table'>
                    <div className='data-table-wrapped'>
                        <div className='data-table-container'>
                            <ReactDatatable
                                columns={columns}
                                records={list}
                                config={configForTable}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default AdminList