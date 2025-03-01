package com.empman.EmpManage.controller;

import com.empman.EmpManage.dto.EmployeeDto;
import com.empman.EmpManage.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    // Constructor-based dependency injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    //build get employee REST API
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    //build get All employee
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employeeDtos = employeeService.getAllEmployees();
        return new ResponseEntity<>(employeeDtos, HttpStatus.OK);
    }
     //build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
                                                      @RequestBody EmployeeDto updatedDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, updatedDto);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);

    } //Build delete employee Rest Api
        @DeleteMapping("{id}")
        public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
            employeeService.deleteEmployee(employeeId);
            return  ResponseEntity.ok("Employee deleted successfully");
        }
    }

