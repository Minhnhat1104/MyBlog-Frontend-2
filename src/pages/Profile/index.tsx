import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '~/components/PasswordInput';
import userImagePlaceholder from '~/assets/img/UserPlaceholder.png';
import { validationRegex } from '~/tools/regexs';

type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: number;
};

function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mRegisterUser } = useAuthMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const res = await mRegisterUser.mutateAsync(
      {
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        password: data?.password,
      },
      {
        onSuccess: () => {
          navigate('/login');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'fit-content', margin: 'auto' }}>
      <Stack
        sx={{
          background: theme.palette.common.white,
          p: 3,
          borderRadius: 3,
          width: 600,
        }}
        spacing={3}
      >
        <Typography variant="h1" fontWeight={500} textAlign="center">
          Profile settings
        </Typography>

        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar
            alt="avatar"
            src={userImagePlaceholder}
            sx={{
              width: 60,
              height: 60,
            }}
          />

          <Button variant="contained">Change avatar</Button>
        </Stack>
        <Grid container spacing={3}>
          <Grid size={6}>
            <TextField
              fullWidth
              size="medium"
              label="First name"
              helperText={errors.firstName?.message}
              error={!!errors.firstName}
              {...register('firstName', { required: true, maxLength: 50 })}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              size="medium"
              label="Last name"
              helperText={errors.lastName?.message}
              error={!!errors.lastName}
              {...register('lastName', { required: true, maxLength: 50 })}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          size="medium"
          label="Email"
          helperText={errors.email?.message}
          error={!!errors.email}
          type="email"
          // placeholder="Enter your email"
          {...register('email', {
            required: true,
            pattern: validationRegex.email,
          })}
        />

        <TextField
          fullWidth
          size="medium"
          label="Phone"
          helperText={errors.email?.message}
          error={!!errors.email}
          // placeholder="Enter your email"
          {...register('phone', {
            required: true,
            pattern: validationRegex.phone,
          })}
        />
        {/* <PasswordInput
          label="Password"
          helperText={errors.password?.message}
          error={!!errors.password}
          {...register('password', { required: true, maxLength: 50 })}
        /> */}
        <Button type="submit" variant="contained">
          Save profile
        </Button>
      </Stack>
    </form>
  );
}

export default Register;
