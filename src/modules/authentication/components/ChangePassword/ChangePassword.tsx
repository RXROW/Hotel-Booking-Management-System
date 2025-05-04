import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'

import TitleAuth from '../../../shared/components/TitleAuth/TitleAuth'
import ReusableForm from '../../../shared/components/Resuableform/ReusableForm'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/FormInput/FormInput'
import { ChangeData } from '../../../../interfaces/authInterfaces'
import ButtonForm from '../../../shared/components/ButtonForm/ButtonForm'
import usePasswordToggle from '../../../../hooks/PasswordToggle'
import { useEffect } from 'react'
import { getValidationRules } from '../../../../services/vaildation/validations'
import { publicInstance } from '../../../../services/apis/apisConfig'
import { USERS_URL } from '../../../../services/apis/apisUrls.js'
import useSnackbar from '../../../../hooks/useSnackbar.js'
import { useNavigate } from 'react-router-dom'
import CustomSnackbar from '../../../shared/components/Snackbar/Snackbar'
import { useTranslation } from 'react-i18next'
const ChangePassword = () => {
  const methods = useForm<any>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })
  const { showPasswords, getPasswordAdornment } = usePasswordToggle()
  const { snackbarState, showSnackbar, hideSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { trigger, watch } = methods
  const newPassword = watch('newPassword')
  const confirmNewPassword = watch('confirmNewPassword')
  const validationRules = getValidationRules(watch)
  const handleSubmit = async (data: ChangeData) => {
    try {
      const response = await publicInstance.post(
        USERS_URL.CHANGE_PASSWORD,
        data,
      )
      showSnackbar(
        response?.data?.message || 'Change Password successfully!',
        'success',
      )
      navigate('/auth/login')
    } catch (error: any) {
      showSnackbar(
        error?.response?.data?.message ||
          'Something went wrong please try again',
        'error',
      )
    }
    console.log(data)
  }
  useEffect(() => {
    if (confirmNewPassword) {
      trigger('confirmNewPassword')
    }
  }, [confirmNewPassword, trigger, newPassword])

  return (
    <>
      <TitleAuth title={t('Authentication.title.changePassword')} />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(handleSubmit)}>
          <FormInput
            label={t('Authentication.form.oldpasswordLabel')}
            name="oldPassword"
            type="password"
            showpassword={showPasswords.currentPassword}
            rules={validationRules.password}
            placeholder={t('Authentication.form.oldpasswordPlaceholder')}
            iconeye={getPasswordAdornment('currentPassword')}
          />
          <FormInput
            label={t('Authentication.form.newpasswordLabel')}
            name="newPassword"
            type="password"
            showpassword={showPasswords.password}
            rules={validationRules.password}
            placeholder={t('Authentication.form.newconfirmpasswordPlaceholder')}
            iconeye={getPasswordAdornment('password')}
          />
          <FormInput
            label={t('Authentication.form.newconfirmpasswordLabel')}
            name=" confirmNewPassword"
            type="password"
            showpassword={showPasswords.confirmPassword}
            rules={validationRules.confirmPassword}
            placeholder={t('Authentication.form.newpasswordPlaceholder')}
            iconeye={getPasswordAdornment('confirmPassword')}
          />
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            {t('Authentication.button.changepassword')}
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

export default ChangePassword
