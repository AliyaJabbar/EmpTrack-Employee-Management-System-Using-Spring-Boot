import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/EmployeeService';

const UpdateEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({ firstName: '', lastName: '', email: '' });

    useEffect(() => {
        getEmployeeById(id)
            .then(response => setEmployee(response.data))
            .catch(error => console.error("Error fetching employee details:", error));
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(id, employee)
            .then(() => navigate('/employees'))  // ✅ Redirect after update
            .catch(error => console.error("Error updating employee:", error));
    };

    return (
        <div className="container">
            <h2 className="text-center">Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={employee.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={employee.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Update</button>
                <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/employees')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployeeComponent;
