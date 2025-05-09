// @ts-nocheck
import { Box, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'

import TitleAuth from '../../../shared/components/TitleAuth/TitleAuth'
import ReusableForm from '../../../shared/components/Resuableform/ReusableForm'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/FormInput/FormInput'
import { LoginData } from '../../../../interfaces/authInterfaces'
import ButtonForm from '../../../shared/components/ButtonForm/ButtonForm'
import usePasswordToggle from '../../../../hooks/PasswordToggle'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
import { USERS_URL } from '../../../../services/apis/apisUrls'
import { publicInstance } from '../../../../services/apis/apisConfig'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import useSnackbar from '../../../../hooks/useSnackbar.js'
import CustomSnackbar from '../../../shared/components/Snackbar/Snackbar.js'
import { getValidationRules } from '../../../../services/vaildation/validations.js'
import { useTranslation } from 'react-i18next'
const Login = () => {
  const { t } = useTranslation()
  const { saveLoginData } = useContext(AuthContext)
  const theme = useTheme()
  const navigate = useNavigate()
  const validationRules = getValidationRules()
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { showPasswords, getPasswordAdornment } = usePasswordToggle()
  const { snackbarState, showSnackbar, hideSnackbar } = useSnackbar()
  const onSubmit = async (data: LoginData) => {
    try {
      const response = await publicInstance.post(USERS_URL.LOGIN, data)
      localStorage.setItem('token', response?.data?.data?.token.split(' ')[1])
      saveLoginData()
      showSnackbar(response?.data?.message || 'Login successful', 'success')
      const token = response?.data?.data?.token
      const isUser = response?.data?.data?.user?.role
      navigate(isUser === 'user' ? '/' : '/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showSnackbar(error.response?.data?.message || 'Cannot Log in', 'error')
      }
    }
  }

  return (
    <>
      <TitleAuth title={t('Authentication.title.signIn')} />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            label={t('Authentication.form.emailLabel')}
            name="email"
            rules={validationRules.email}
            placeholder={t('Authentication.form.emailPlaceholder')}
            type="email"
          />
          <FormInput
            label={t('Authentication.form.passwordLabel')}
            name="password"
            type="password"
            showpassword={showPasswords.password}
            rules={validationRules.password}
            placeholder={t('Authentication.form.passwordPlaceholder')}
            iconeye={getPasswordAdornment('password')}
          />
          <Box sx={{ textAlign: 'right', my: 2 }}>
            <Link
              to={'/auth/forget-password'}
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              {t('Authentication.form.forgotPasswordLink')}
            </Link>
          </Box>
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            {t('Authentication.button.login')}
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
      <CustomSnackbar
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={hideSnackbar}
      />
    </>
  )
}

export default Login
