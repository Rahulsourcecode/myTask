import * as React from 'react';

import { useState } from 'react'
import PageHeader from '../common/PageHeader';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { setRoles } from '../../utils/api';
import data from '../Data/menu.json'

const Roles = () => {

    const options = data.menu.map(x => x.name)
    const [permissions, setPermissions] = useState([])
    const [role, setRole] = useState({
        role: "",
        description: "",
        permissions: []
    });
    const [errors, setErrors] = useState({
        role: false,
        description: false,
        permissions: false,
    });
    function handleChange(e) {
        setRole({ ...role, [e.target.name]: e.target.value })
    }

    function handlePermissionsChange(event, value) {
        setPermissions(value)
        const access = value.map(item => data?.menu.filter(x => x.name === item).map(x => ({ [x.name]: x.routerLink }))).map(x => x[0])
        setRole({ ...role, permissions: access })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const hasErrors =
            !role.role.trim() || !role.description.trim() || permissions.length === 0;

        setErrors({
            role: !role.role.trim(),
            description: !role.description.trim(),
            permissions: permissions.length === 0,
        });

        if (!hasErrors) {
            setRoles(role)
                .then(() => {
                    setRole({
                        role: "",
                        description: "",
                        permissions: [],
                    })
                    setPermissions([]);
                })

        }
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
                                    <input type="text" name='role' className={`form-control ${errors.role ? "parsley-error" : ""}`} value={role?.role} onChange={handleChange} />
                                    {errors.role && (<span className="text-danger">Please fill input field</span>)}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label">Role description:</label>
                                    <textarea name="description" className={`form-control ${errors.description ? "parsley-error" : ""}`} rows="5" cols="30" value={role?.description} onChange={handleChange} data-parsley-id="33" ></textarea>
                                    {errors.description && (<span className="text-danger">Please fill input field</span>)}
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
                                        value={permissions}
                                        options={options}
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
                                    {errors.permissions && (<span className="text-danger">Please select at least one option</span>)}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-5" >Add Role</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Roles