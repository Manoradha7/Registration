import { useState, useEffect } from "react";
import React from "react";
import{ IconButton} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {API_URL} from './globalconstant.js';
import {useHistory } from 'react-router';

export function EmployeeList() {
  const [employee, setEmployee] = useState();

  const getEmployee = () => {
    fetch(`${API_URL}/employee`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  };

  // eslint-disable-next-line
  useEffect(getEmployee, []);
  return employee ? <EmployeeTable employee={employee} setEmployee={setEmployee} /> : "";
}

function EmployeeTable({employee,setEmployee}){
  const history = useHistory();

  const getEmployees = () => {
    fetch(`${API_URL}/employee`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  };

  useEffect(getEmployees,[setEmployee]);

  const deleteEmployee = (id) => {
    fetch(`${API_URL}/employee/${id}`, {
      method: "DELETE",
    }).then(() => getEmployees());
  };
    console.log('employee',employee)
    return(
      <div className="tableContainer">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Job Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
          {employee.map(({ fullname,profimg, email, mobile, dob, jobtype,id}, index) => {
            return (
              <Employee
              id={id}
              key={id}
              index={index}
              fullname={fullname}
              profimg = {profimg}
              email={email}
              mobile={mobile}
              jobtype={jobtype}
              dob={dob}
              deleteButton={
                <IconButton
                  aria-label="delete movie"
                  onClick={() => {
                    deleteEmployee(id);
                  }}
                  color="secondary"
                  className="delete-button"
                >
                  <DeleteIcon />
                </IconButton>
              }
              editButton={
                <IconButton
                  aria-label="edit movie"
                  style={{ marginLeft: "auto" }}
                  color="error"
                  className="edit-button"
                  onClick={() => history.push("/employee/edit/" + id)}
                >
                  <EditIcon />
                </IconButton>
              }
            />
            );
          })}
          </tbody>
        </table>
      </div>
    )
  }
  
function Employee({
  id,
  fullname,
  email,
  mobile,
  profimg,
  jobtype,
  dob,
  deleteButton,
  editButton,
  index})
  {
return(
  <tr key={id} >
   <td>{index + 1}</td>
     <td><img src={profimg} alt='profimg' style={{width:80,height:100}}/></td>
     <td>{fullname}</td>
     <td>{email}</td>
     <td>{mobile}</td>
     <td>{dob}</td>
     <td>{jobtype}</td>
     <td><div className="btn">{editButton}{deleteButton}</div></td>
   </tr>
)
}