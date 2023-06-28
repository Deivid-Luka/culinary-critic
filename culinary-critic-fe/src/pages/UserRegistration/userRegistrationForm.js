import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography,IconButton  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './userRegistrationForm.css';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const styles = {
  center :{
    display: 'flex',
    justifyContent: 'center'
  }
};

const RegistrationForm = () => {
  const classes = useStyles();

  const initialValues = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    city: '',
    birthday: '',
    mobileNumber: '',
    email: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    birthday: Yup.date().required('Required'),
    mobileNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:8080/public/register/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registered Successfully"); // Display success toast notification
          setTimeout(() => {
            window.location.href = '/login'; // Redirect to login page after a delay
          }, 1000); 
        } else {
          throw new Error('Registration failed. Status: ' + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <Typography variant="h4" style={styles.center}>Register</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className={classes.root}>
            <Field
              name="username"
              as={TextField}
              label="Username"
              helperText={<ErrorMessage name="username" />}
              error={errors.username && touched.username}
            />
            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              helperText={<ErrorMessage name="password" />}
              error={errors.password && touched.password}
            />
            <Field
              name="firstName"
              as={TextField}
              label="First Name"
              helperText={<ErrorMessage name="firstName" />}
              error={errors.firstName && touched.firstName}
            />
            <Field
              name="lastName"
              as={TextField}
              label="Last Name"
              helperText={<ErrorMessage name="lastName" />}
              error={errors.lastName && touched.lastName}
            />
            <Field
              name="city"
              as={TextField}
              label="City"
              helperText={<ErrorMessage name="city" />}
              error={errors.city && touched.city}
            />
            <Field
              name="birthday"
              as={TextField}
              label="Birthday"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              helperText={<ErrorMessage name="birthday" />}
              error={errors.birthday && touched.birthday}
            />
            <Field
              name="mobileNumber"
              as={TextField}
              label="Mobile Number"
              helperText={<ErrorMessage name="mobileNumber" />}
              error={errors.mobileNumber && touched.mobileNumber}
            />
            <Field
              name="email"
              as={TextField}
              label="Email"
              helperText={<ErrorMessage name="email" />}
              error={errors.email && touched.email}
            />
            <div>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!(dirty && isValid)}
            >
              Register
            </Button>

            <Button
              className="Back"
              variant="contained"
              color="primary"
              onClick={goBack}
            >
              Back
            </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
