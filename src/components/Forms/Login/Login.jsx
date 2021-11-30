import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form, Field } from 'react-final-form'
import labels from './Labels';
import { Redirect } from 'react-router';
import { authUser } from '../../Auth/auth-reducer';
import { FORM_ERROR } from 'final-form'

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const validate = values => {
  const errors = {}
  const requiredFields = [
    'login',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = labels.validate.required
    }
  })
  
  return errors
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: theme.spacing(3, 0, 2),
  }
}));

const Login = props => {
  const classes = useStyles();
  const isAuth = useSelector(state => state.auth.isAuth)
  let dispatch = useDispatch()
  if (isAuth) 
    return <Redirect to="/orders" />
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {labels.signIn}
        </Typography>
        <Form 
          validate={ validate } 
          onSubmit={ 
            async (data) => {
              const res = await dispatch(authUser(data.login, data.password))
              if (res && !res.success) return { [FORM_ERROR]: res._error }
            } 
          }
        >
          { ({ handleSubmit, pristine, submitting, form, submitError }) => (<form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Field 
              name="login" 
              component={renderTextField} 
              label={labels.login}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              autoComplete="login"
              autoFocus
            />
            <Field
              component={renderTextField} 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={labels.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pristine || submitting}
            >
              {labels.signIn}
            </Button>
            <Typography className={classes.error} component="h1" variant="h6">
              {submitError}
            </Typography>
          </form>) }
        </Form>
      </div>
    </Container>
  );
}

export default Login