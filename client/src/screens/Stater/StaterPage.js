import React from "react";
import PageHeader from "../../components/common/PageHeader";
import imag1 from "../../assets/images/no-data.svg";


function StaterPage() {
    return (
        <div className="container-xxl">
            <PageHeader headerTitle="Role mangement" />
            <div className="col-12">
                <div className="card mb-3">
                    <div className="card-body text-center p-5">
                        <label>Role Description: </label>
                        <input
                            name="rolename"
                            required
                        />

                        <label>    Role Description:</label>
                        <input
                            name="roleDiscription"
                            required
                        />
                        <select
                            name="selectedPermission"
                            required
                        >
                        <option value="">Select a permission</option>
                        </select>

                        <div className="mt-4 mb-2">
                        </div>
                        <button type="button" className="btn btn-white border lift mt-1">Back to home</button>
                        <button type="button" className="btn btn-primary border lift mt-1">Create Role</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default StaterPage;