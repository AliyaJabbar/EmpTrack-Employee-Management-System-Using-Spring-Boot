import React, { useState, useEffect } from 'react';
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listEmployees()
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    }, []);

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/update-employee/${id}`);  // ✅ FIXED NAVIGATION
    }
   
    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th> 
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-warning' onClick={() => updateEmployee(employee.id)}>
                                    Update
                                </button> 
                                
    
    <button className='btn btn-danger mx-2' onClick={() => 
        navigate(`/delete-employee/${employee.id}`)}>
        Delete
    </button>
</td>
             
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
