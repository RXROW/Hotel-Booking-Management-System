// @ts-nocheck
import ReusableForm from '../../../shared/components/Resuableform/ReusableForm'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '../../../shared/components/FormInput/FormInput'
import ButtonForm from '../../../shared/components/ButtonForm/ButtonForm'
import { useEffect  } from 'react'
import { publicInstance } from '../../../../services/apis/apisConfig'
import { USERS_URL } from '../../../../services/apis/apisUrls'
import { useNavigate, useLocation } from 'react-router-dom'
import { ResetData } from '../../../../interfaces/authInterfaces'
import TitleAuth from '../../../shared/components/TitleAuth/TitleAuth'
import CustomSnackbar from '../../../shared/components/Snackbar/Snackbar'
import useSnackbar from '../../../../hooks/useSnackbar'
import usePasswordToggle from '../../../../hooks/PasswordToggle'
import { getValidationRules } from '../../../../services/vaildation/validations'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
  const { showPasswords, getPasswordAdornment } = usePasswordToggle()
  const { snackbarState, showSnackbar, hideSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const methods = useForm<ResetData>({
    defaultValues: {
      email: location?.state || '',
      password: '',
      confirmPassword: '',
      seed: '',
    },
  })
  const { trigger, watch } = methods
  const Password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const validationRules = getValidationRules(watch)
  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword')
    }
  }, [confirmPassword, trigger, Password])
  const onSubmitHandler = async (data: ResetData) => {
    try {
      const response = await publicInstance.post(USERS_URL.RESET_PASSWORD, data)
      showSnackbar(
        response?.data?.message || 'Password reset successfully!',
        'success',
      )
      navigate('/auth/login', { state: data.email })
    } catch (error: any) {
      showSnackbar(
        error?.response?.data?.message ||
          'Something went wrong please try again',
        'error',
      )
    }
  }
  return (
    <>
      <TitleAuth title={t('Authentication.title.resetPassword')} />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <FormInput
            name="email"
            rules={validationRules.email}
            placeholder={t('Authentication.form.emailPlaceholder')}
            type="email"
            label={t('Authentication.form.emailLabel')}
            disabled
          />
          <FormInput
            name="seed"
            rules={{ required: 'OTP is required' }}
            placeholder={t('Authentication.form.otpPlaceholder')}
            type="text"
            label={t('Authentication.form.otpLabel')}
          />
          <FormInput
            name="password"
            rules={validationRules.password}
            placeholder={t('Authentication.form.passwordPlaceholder')}
            showpassword={showPasswords.password}
            type="password"
            label={t('Authentication.form.passwordLabel')}
            iconeye={getPasswordAdornment('password')}
          />
          <FormInput
            name="confirmPassword"
            rules={validationRules.confirmPassword}
            placeholder={t('Authentication.form.ConfirmpasswordPlaceholder')}
            showpassword={showPasswords.confirmPassword}
            type="password"
            label={t('Authentication.form.Confirm PasswordLabel')}
            iconeye={getPasswordAdornment('confirmPassword')}
          />
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            {t('Authentication.button.reset')}
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
export default ResetPassword
