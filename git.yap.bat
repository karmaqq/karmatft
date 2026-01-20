@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set "green=[92m"
set "yellow=[93m"
set "cyan=[96m"
set "white=[0m"
set "magenta=[95m"

cls
echo %cyan%====================================================
echo    KARMA TFT PROJESİ - OTOMATİK GÜNCELLEME İŞLEMİ
echo ====================================================%white%
echo.
set "user_msg="
set /p "user_msg=Yapılan değişikliği yaz: "


if "!user_msg!"=="" (
    set "final_msg=Otomatik Güncelleme: %date% %time%"
) else (
    set "final_msg=!user_msg! (%date% %time%)"
)

echo.
echo %yellow%[1/4]%white% Sunucudaki veriler eşitleniyor...
git pull origin main --quiet

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .
echo %green%      =^> Yeni dosyalar başarıyla eklendi!%white%

echo %yellow%[3/4]%white% Kayıt oluşturuluyor...
git commit -m "!final_msg!" --quiet
echo %green%      =^> "!final_msg!" mesajı eklendi!%white%

echo %yellow%[4/4]%white% Kodlar GitHub'a gönderiliyor...
git push origin main --quiet

echo.
echo %cyan%====================================================
echo    İŞLEM BAŞARILI: Tüm kodlar başarıyla güncellendi!
echo ====================================================%white%
echo.
pause