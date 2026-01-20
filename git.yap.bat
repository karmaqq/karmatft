@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: Renk Kodları
set "green=[92m"
set "yellow=[93m"
set "cyan=[96m"
set "white=[0m"
set "magenta=[95m"

:: Saat ayarı (Salisesiz)
set "current_time=%time:~0,8%"

cls
echo %cyan%====================================================
echo    KARMA TFT PROJESİ - OTOMATİK GÜNCELLEME İŞLEMİ
echo ====================================================%white%
echo.

:: 1. Mesaj Alma
set "user_msg="
set /p "user_msg=Yapılan değişikliği yaz: "

if "!user_msg!"=="" (
    set "final_msg=Otomatik Güncelleme %date% %current_time%"
) else (
    set "final_msg=!user_msg! %date% %current_time%"
)

echo.
echo %yellow%[1/4]%white% Sunucudaki veriler eşitleniyor...
git pull origin main --quiet

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .

echo %yellow%[3/4]%white% Kayıt (Commit) oluşturuluyor...
git commit -m "!final_msg!" --quiet

echo %yellow%[4/4]%white% Kodlar GitHub'a gönderiliyor...
git push origin main --quiet

echo.
echo %cyan%====================================================
echo    İŞLEM BAŞARILI: Veriler Buluta İşlendi
echo    %magenta%Mesaj: %green%!final_msg!%white%
echo %cyan%====================================================%white%
echo.
pause