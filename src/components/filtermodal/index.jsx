import React, { useState } from 'react'
import { CrossIcon, IconDropDown } from '../../icons/icons';
import { Autocomplete, TextField } from "@mui/material";
import { Modal } from 'react-bootstrap';
import './filtermodal.scss'
const FilterModal = ({ openModal, closeModal }) => {
    const size = [
        { title: '8000' },
        { title: '15000' },
        { title: '25000' },
        { title: '5000' },
        { title: '100,000' },
    ];
    const [formData, setFormData] = useState({
        size: '',
        name: '',
        email: '',
        date: '',
        level: '',
    });
    const handleInputChange = (event, newValue) => {
        if (newValue) {
            setFormData((prevData) => ({
                ...prevData,
                gender: newValue.title,
            }));
        }
    };
    return (
        <Modal show={openModal} centered className='fairbay_modals'>
            <div className='filtermodal'>
                <div className='modal_header'>
                    <div className='main_heading'><h2>Filter</h2></div>
                    <button type='button' onClick={closeModal} className='cancel-btn'><CrossIcon /></button>
                </div>
                <div className='modal_body'>
                    <div className='content'>
                        <form>
                            <div className='input-main-data select-mui-vs'>
                                <div className='label_fieild'>
                                    <label>Account Size</label>
                                </div>
                                <div className='input_field'>
                                    <Autocomplete
                                        fullWidth
                                        className='automcomplete_select_info'
                                        autoComplete={false}
                                        id='free-solo-demo'
                                        options={size}
                                        getOptionLabel={(option) => option.title}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='All' />
                                        )}
                                        popupIcon={<IconDropDown />}
                                        value={size.find((g) => g.title === formData.size) || null}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='input-main-data'>
                                <div className='label_fieild'>
                                    <label>Name</label>
                                </div>
                                <div className='input_field'>
                                    <input
                                        type='text'
                                        name='Name'
                                        value={formData.age}
                                        placeholder='Enter Name'
                                    />
                                </div>
                            </div>
                            <div className='input-main-data'>
                                <div className='label_fieild'>
                                    <label>Email</label>
                                </div>
                                <div className='input_field'>
                                    <input
                                        type='text'
                                        name='email'
                                        value={formData.email}
                                        placeholder='Enter Email'
                                    />
                                </div>
                            </div>
                            <div className='input-main-data'>
                                <div className='label_fieild'>
                                    <label>Date</label>
                                </div>
                                <div className='input_field'>
                                    <input
                                        type='date'
                                        name='date'
                                        value={formData.date}
                                        placeholder='Enter Date'
                                    />
                                </div>
                            </div>
                            <div className='input-main-data'>
                                <div className='label_fieild'>
                                    <label>Referral Level</label>
                                </div>
                                <div className='input_field'>
                                    <input
                                        type='text'
                                        name='email'
                                        value={formData.level}
                                        placeholder='Enter Level'
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='modal_footer'>
                    <div className='action_btn'>
                        <button type='button' className='orange_border_btn' onClick={closeModal}>
                            Cancel
                        </button>
                        <button type='button' className='modal_okay' onClick={closeModal}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FilterModal
