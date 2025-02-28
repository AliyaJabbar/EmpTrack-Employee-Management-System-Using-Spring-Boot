import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams(); // Get employee ID from URL
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch employee details for editing
      getEmployeeById(id)
        .then((response) => {
          const employee = response.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmail(employee.email);
        })
        .catch((error) => {
          console.error('Error fetching employee:', error);
          alert('Error fetching employee details');
        });
    }
  }, [id]);

  function validateForm() {
    let valid = true;
    const errorsCopy = { firstName: '', lastName: '', email: '' };

    if (!firstName.trim()) {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }
    if (!lastName.trim()) {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }
    if (!email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      if (id) {
        // Update existing employee
        updateEmployee(id, employee)
          .then(() => {
            alert('Employee updated successfully!');
            navigate('/update-employee/:id');
          })
          .catch((error) => {
            console.error('Error updating employee:', error);
            alert('Failed to update employee.');
          });
      } else {
        // Create new employee
        createEmployee(employee)
          .then(() => {
            alert('Employee added successfully!');
            navigate('/employees');
          })
          .catch((error) => {
            console.error('Error adding employee:', error);
            alert('Failed to add employee.');
          });
      }
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='card col-md-6'>
          <h2 className='text-center'>{id ? 'Update Employee' : 'Add Employee'}</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-3'>
                <label className='form-label'>First Name</label>
                <input
                  type='text'
                  placeholder='Enter first name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Last Name</label>
                <input
                  type='text'
                  placeholder='Enter last name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <button type='submit' className='btn btn-primary' onClick={saveEmployee}>
                {id ? 'Update Employee' : 'Add Employee'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent; 