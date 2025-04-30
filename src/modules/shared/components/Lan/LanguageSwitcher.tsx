import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <LanguageIcon color="primary" />
      <Typography variant="body1">{t("common.selectLanguage")}:</Typography>
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={() => changeLanguage("en")}
          variant={i18n.language === "en" ? "contained" : "outlined"}
        >
          English
        </Button>
        <Button
          onClick={() => changeLanguage("ar")}
          variant={i18n.language === "ar" ? "contained" : "outlined"}
        >
          العربية
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;
