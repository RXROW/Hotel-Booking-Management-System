import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface TitleAuthProps {
  title: string
}
const TitleAuth = ({ title }: TitleAuthProps) => {
  const [compara, setCompara] = useState(null)
  const theme = useTheme()
  useEffect(() => {
    if (title === 'Sign In' || title === 'تسجيل الدخول') {
      setCompara(true)
    } else {
      setCompara(false)
    }
  }, [title])
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleClick = () => {
    if (compara) navigate('/auth/register')
    else navigate('/auth/login')
  }
  console.log(compara)
  return (
    <>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {compara
          ? t('Authentication.description.register')
          : title === 'Change Password'
            ? t('Authentication.description.changePassword')
            : t('Authentication.description.login')}
        <br />
        {t('Authentication.text.youCan')}
        <Box
          component="a"
          onClick={handleClick}
          sx={{
            color: compara
              ? theme.palette.mode === 'light'
                ? '#152C5B'
                : '#1976d2'
              : 'red',
            fontWeight: 'bold',
            cursor: 'pointer',
            paddingLeft: '10px',
          }}
        >
          {compara
            ? t('Authentication.link.register')
            : t('Authentication.link.login')}
        </Box>
      </Typography>
    </>
  )
}
export default TitleAuth
