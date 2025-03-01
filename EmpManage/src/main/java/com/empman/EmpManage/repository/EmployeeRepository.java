package com.empman.EmpManage.repository;

import com.empman.EmpManage.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
