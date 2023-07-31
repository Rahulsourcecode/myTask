import * as React from 'react';

import { useState } from 'react'
import PageHeader from '../common/PageHeader';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, ButtonBase } from '@mui/material';
import { showNotification } from '../../utils/notifications';
import { Axios } from '../../utils/Axios';


const Roles = () => {
    const options = ["Dashboard", "User management", "Projects", "Tickets", "Clients", "Employees", "Accounts", "Payroll", "App", "Other Pages", "Ui components"]
    const [role, setRole] = useState({
        role: "",
        description: "",
        permissions: []
    });
    function handleChange(e) {
        setRole({ ...role, [e.target.name]: e.target.value })
        console.log(role)
    }
    function handlePermissionsChange(event, value) {
        setRole({ ...role, permissions: value });
    }
    function handleSubmit(e) {
        e.preventDefault()
        Axios.post("/admin/addRoles", role)
            .then((res) => showNotification(res.data.message))
            .catch((error) => {
                const errorMessage = error?.response?.data?.message || error.message
                showNotification(errorMessage)
                console.log(errorMessage)
            })
    }
    return (
        <div>
            <PageHeader headerTitle="Role mangement" />
            <div className="card mb-3">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                </div>
                <div className="card-body">
                    <form id="basic-form" onSubmit={handleSubmit}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label">Role name:</label>
                                    <input type="text" name='role' className="form-control parsley-error" value={role.role} onChange={handleChange} required />
                                    {role.name === "" ? (<span className="text-danger">Please fill input filed</span>) : ("")}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label">Role description:</label>
                                    <textarea name="description" className="form-control parsley-error" rows="5" cols="30" value={role.description} onChange={handleChange} required data-parsley-id="33" ></textarea>
                                    {role.description === "" ? (<span className="text-danger">Please fill input filed</span>) : ("")}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label">select an option:</label>

                                    <Autocomplete
                                        multiple
                                        id="tags-filled"
                                        name="permissions"
                                        onChange={handlePermissionsChange} // Use the new handler function for permissions
                                        value={role.permissions}
                                        options={options}
                                        defaultValue={[options[1]]}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                label="choose access"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary mt-5 me-1" onClick={() => { showNotification("added"); }}>Go home</button>
                        <button type="submit" className="btn btn-primary mt-5" >Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Roles
