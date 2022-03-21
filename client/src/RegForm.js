import { useState } from "react";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {API_URL} from './globalconstant.js'
import {
  TextField,
  Radio,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  FormGroup,
} from "@mui/material";
import { EmployeeList } from "./EmployeeList";
import axios from "axios";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formValidationSchema = yup.object({
  fullname: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required("Name is Required"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phnoe number is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  dob: yup.string().required("DOB is required"),
  jobtype:yup.string().required("Please choose Job type")
});

export function RegForm() {
  const [profileImg, setProfileImg] = useState();

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        fullname: "",
        mobile: "",
        email: "", 
        jobtype: "",
        dob: "",
        location: "",
        profimg:profileImg,
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
      
      
        const updatedvalues={...values,profimg:profileImg}
        Register(updatedvalues);
      },
    });
  const Register = async (values) => {
    console.log(values,'values')

    const formData = new FormData();
    formData.append("fullname",values.fullname);
    formData.append("profimg", profileImg);
    formData.append("mobile",values.mobile);
    formData.append("email",values.email);
    formData.append('jobtype',values.jobtype);
    formData.append("dob",values.dob);
    formData.append("location",values.loation);
   
    console.log(formData,'fd')
  
    axios
      .post(`${API_URL}/employee`, formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
  };
  

  return (
    <div><form className="empForm" onSubmit={handleSubmit} encType='multipart/form-data'>
    <fieldset>
      <legend className="formLegend">Registration</legend>
      <TextField
        id="fullname"
        name="fullname"
        values={values.fullname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fullname && touched.fullname}
        label="Fullname"
        variant="filled"
        helperText={errors.fullname && touched.fullname && errors.fullname}
        sx={{ boxShadow: 5, borderRadius: 1.5, width: 250 }}
        required
      />
      <div className="imgContainer">
        <h5 style={{ color: "rgb(61, 58, 58)" }}>Profile Image</h5>
        <div className="image-holder">
          {profileImg && (
            <div>
              <img
                alt="not found"
                width={"100px"}
                src={URL.createObjectURL(profileImg)}
              />
              <br />
              <button onClick={() => setProfileImg(null)}>Remove</button>
            </div>
          )}
          <br />

          <br />
          <input
            id="profimg"
            type="file"
            name="profimg"
            value={values.profileImg}
            className="imgInput"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setProfileImg(event.target.files[0]);
            }}
          />
        </div>
      </div>
      <TextField
        id="mobile"
        name="mobile"
        value={values.mobile}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.mobile && touched.mobile}
        label="Mobile"
        variant="filled"
        helperText={errors.mobile && touched.mobile && errors.mobile}
        sx={{ boxShadow: 5, borderRadius: 1.5, width: 250 }}
        required
      />
      <TextField
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email && touched.email}
        label="Email ID"
        variant="filled"
        helperText={errors.email && touched.email && errors.email}
        sx={{ boxShadow: 5, borderRadius: 1.5, width: 250 }}
        required
      />
      <div>
        <FormControl>
          <FormLabel id="jobtype">Job Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            value={values.jobtype}
            onChange={handleChange}
            sx={{ flexWrap: "nowrap" }}
          >
            <FormControlLabel
              id="radio"
              name="jobtype"
              value="FT"
              defaultChecked
              control={<Radio  />}
              label="FT"
            />
            <FormControlLabel
              id="radio"
              name="jobtype"
              value="PT"
              control={<Radio />}
              label="PT"
            />
            <FormControlLabel
              id="radio"
              name="jobtype"
              value="Consultant"
              control={<Radio />}
              label="Consultant"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <TextField
        id="dob"
        name="dob"
        value={values.dob}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.dob && touched.dob}
        label="DOB"
        type="date"
        helperText={errors.dob && touched.dob && errors.dob}
        variant="filled"
        InputLabelProps={{ shrink: true }}
        sx={{ boxShadow: 5, borderRadius: 1.5, width: 250 }}
        required
      />
      <div>
        <FormLabel id="location" className="checkbox">
          Pref.Location
        </FormLabel>

        <FormGroup
          row
          sx={{ flexWrap: "nowrap" }}
          onChange={handleChange}
          value={values.location}
        >
          <FormControlLabel
            id="location"
            name="location"
            control={<Checkbox  />}
            label="Chennai"
            value="chennai"
          />
          <FormControlLabel
            id="location"
            name="location"
            control={<Checkbox />}
            label="Bangalore"
            value="Bangalore"
          />
          <FormControlLabel
            id="location"
            name="location"
            control={<Checkbox />}
            label="Pune"
            value="pune"
          />
        </FormGroup>
      </div>
      <Button
        variant="contained"
        type="submit"
        value="add"
        sx={{ borderRadius: 3, boxShadow: 13, backgroundColor: "skyblue" }}
      >
        ADD
      </Button>
    </fieldset>
  </form>
   <EmployeeList/>
  </div>
  );
}

