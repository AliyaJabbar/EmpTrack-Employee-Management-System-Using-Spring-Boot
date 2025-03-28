import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../services/EmployeeService';

const DeleteEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id)
                .then(() => {
                    alert("Employee deleted successfully.");
                    navigate('/employees'); // Redirect to employee list
                })
                .catch(error => {
                    console.error("Error deleting employee:", error);
                    alert("Failed to delete employee.");
                });
        } else {
            navigate('/employees'); // Redirect back if user cancels
        }
    }, [id, navigate]);

    return null; // No UI needed for this component
};

export default DeleteEmployeeComponent;
