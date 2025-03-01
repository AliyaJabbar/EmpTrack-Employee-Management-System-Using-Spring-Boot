package com.empman.EmpManage.mapper;

import com.empman.EmpManage.dto.EmployeeDto;
import com.empman.EmpManage.entity.Employee;

public class EmployeeMapper {

    // Convert Employee entity to EmployeeDto
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    // Convert EmployeeDto to Employee entity
    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
