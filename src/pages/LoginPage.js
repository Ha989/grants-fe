import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Alert, Container, Stack, Link, InputAdornment, IconButton } from '@mui/material';
import { FTextField, FormProvider, FCheckbox } from "../components/form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});


const defaultValues = {
  email: "viethanguyen0809@gmail.com",
  password: "sauriengxinhdep",
  remember: true
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit = async (data) => {
    let { email, password } = data;
  
    try {
      await auth.login({ email, password });
    } catch (error) {
      reset();
      setError("responseError", { message: error.message });
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity='error'>{errors.responseError.message}</Alert>
          )}
          <Alert severity='info'>Don't have an account?{" "}
            <Link variant='subtitle2' component={RouterLink} to="/auth/register">
              Get started
            </Link>
          </Alert>

          <FTextField name="email" label="Email address"/>
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2}}>
          <FCheckbox name="remember" label="Remember me"/>
          <Link component={RouterLink} variant='subtitle2' to="/"> 
             Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting}>
          Login
        </LoadingButton>
      </FormProvider>
    </Container>
  )
}

export default LoginPage;