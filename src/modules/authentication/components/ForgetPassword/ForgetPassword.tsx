import { Box, Typography, Link, Snackbar, Alert } from '@mui/material'
import Grid from '@mui/material/Grid'
import ReusableForm from '../../../shared/components/Resuableform/ReusableForm'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/FormInput/FormInput'
import ButtonForm from '../../../shared/components/ButtonForm/ButtonForm'
import { publicInstance } from '../../../../services/apis/apisConfig'
import { USERS_URL } from '../../../../services/apis/apisUrls'
import { useNavigate } from 'react-router-dom'
import useSnackbar from '../../../../hooks/useSnackbar'
import TitleAuth from '../../../shared/components/TitleAuth/TitleAuth'
import axios from 'axios'
import CustomSnackbar from '../../../shared/components/Snackbar/Snackbar'
import { getValidationRules } from '../../../../services/vaildation/validations'
import { useTranslation } from 'react-i18next'
const ForgetPassword = () => {
  const { t } = useTranslation()
  const { snackbarState, showSnackbar, hideSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      email: '',
    },
  })
  const validationRules = getValidationRules()
  const onSubmitHandler = async (data: any) => {
    try {
      const response = await publicInstance.post(
        USERS_URL.FORGOT_PASSWORD,
        data,
      )
      showSnackbar(
        response?.data?.message || 'please check your email for OTP',
        'success',
      )
      navigate('/auth/reset-password', { state: data?.email })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showSnackbar(
          error.response?.data?.message ||
            'something went wrong please try again',
          'error',
        )
      }
    }
  }
  return (
    <>
      <TitleAuth title={t('Authentication.title.forgetPassword')} />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <FormInput
            label={t('Authentication.form.emailLabel')}
            rules={validationRules.email}
            placeholder={t('Authentication.form.emailPlaceholder')}
            type="email"
            name="email"
          />
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            {t('Authentication.button.sendmail')}
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

export default ForgetPassword
