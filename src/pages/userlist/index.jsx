import React,{useState,useEffect} from 'react'
import DashboardHeader from '../dasboardheader'
import TableFilter from '../../components/layout/tablefilters'
import useApiRequest from "../../hooks/useApiRequest";
import { successMsg, errorMsg } from "../../utils/customFn";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import ReactDatatable from '@ashvin27/react-datatable';

const userTable = [
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        size: '5000',
        date: '2025-03-15',
        price: '149',
        referralLevel: 1,
        commission: '17,88'
    },

]


const UserList = () => {

    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        callApi()
    }, [])

const callApi = async () => {
    try {
        const UsersRes = await fetchData(API_ENDPOINTS.getUsers, navigate, "GET", {});
        if(UsersRes.success){
            setList(UsersRes.data)
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
            sortable: true,
        },
        {
            key: "image",
            text: "Image",
        },
        {
            key: "status",
            text: "Status",
            sortable: true,
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
                 <div className='d-flex justify-content-end mb-3'>
                                    <button className='btn btn-primary' onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}add-role`)}>Add Roles</button>
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

export default UserList