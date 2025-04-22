import { LanguageOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'

export default function Navbar() {
  const { i18n } = useTranslation()
  return (
    <IconButton
      onClick={() => {
        if (i18n.language === 'en') {
          i18n.changeLanguage('ar')
          localStorage.setItem('lng', 'ar')
        } else {
          i18n.changeLanguage('en')
          localStorage.setItem('lng', 'en')
        }
      }}
    >
      <LanguageOutlined style={{ fontSize: '36px', color: 'black' }} />
    </IconButton>
  )
}
