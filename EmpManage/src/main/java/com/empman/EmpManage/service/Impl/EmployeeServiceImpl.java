package com.empman.EmpManage.service.Impl;

import com.empman.EmpManage.dto.EmployeeDto;
import com.empman.EmpManage.entity.Employee;
import com.empman.EmpManage.exception.ResourceNotFoundException;
import com.empman.EmpManage.mapper.EmployeeMapper;
import com.empman.EmpManage.repository.EmployeeRepository;
import com.empman.EmpManage.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    // Constructor-based dependency injection
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
      Employee employee =  employeeRepository.findById(employeeId)
        .orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeeId));
     return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees= employeeRepository.findAll();
        return employees.stream().map((employee)->
                EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
     Employee employee=  employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeeId));
       employee.setFirstName(updatedEmployee.getFirstName());
       employee.setLastName(updatedEmployee.getLastName());
       employee.setEmail(updatedEmployee.getEmail());
       Employee updatedEmployeeObj=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=  employeeRepository.findById(employeeId).
                orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeeId));
       employeeRepository.deleteById(employeeId);
    }
}
