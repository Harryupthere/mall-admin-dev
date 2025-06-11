import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dasboardheader'
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

const AddOns = () => {
    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        callApi()
    }, [])

    const callApi = async () => {
        try {
            const tradeRes = await fetchData(API_ENDPOINTS.getAddOns, navigate, "GET", {});
            if (tradeRes?.success) {
                setList(tradeRes?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            text: "S. No.",
            cell: (item, row) => (<>{row + 1}</>)
        },
        {
            key: "name",
            text: "Name",
            sortable: true,
        },
        {
            key: "icon",
            text: "Icon",
        },
        {
            key: "percentage",
            text: "Percentage",
            sortable: true,
        },
        {
            key: "created_by",
            text: "Created By",
        },
        {
            key: "updated_by",
            text: "Updated By",
        },
        {
            key: "created_at",
            text: "Created At",
        },
        {
            key: "updated_at",
            text: "Updated At",
        },
        {
            key: 'status',
            text: 'Status',
        },
        {
            text: 'Actions',
            cell: (item) => (
                <button onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}edit-add-ons/${item.id}`)}>Edit</button>
            )
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
            <DashboardHeader heading="Add Ons" />
            <div className='main'>
                <div className='d-flex justify-content-end mb-3'>
                    <button className='btn btn-primary' onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}add-add-ons`)}>Add AddOns</button>
                </div>
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

export default AddOns
