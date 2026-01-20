@echo off
:: Terminali UTF-8 moduna geçirir
chcp 65001 >nul
setlocal enabledelayedexpansion

:: Renk Kodları
set "green=[92m"
set "yellow=[93m"
set "cyan=[96m"
set "white=[0m"
set "magenta=[95m"

:: Saat formatını düzenle (Saliseleri keser: 01:40:45)
set "current_time=%time:~0,8%"

cls
echo %cyan%====================================================
echo    KARMA TFT PROJESİ - OTOMATİK GÜNCELLEME İŞLEMİ
echo ====================================================%white%
echo.
set "user_msg="
set /p "user_msg=Yapılan değişikliği yaz: "

:: Mesaj kontrolü ve Zaman damgası (Salisesiz)
if "!user_msg!"=="" (
    set "final_msg=Otomatik Güncelleme: %date% %current_time%"
) else (
    set "final_msg=!user_msg! (%date% %current_time%)"
)

echo.
echo %yellow%[1/4]%white% Sunucudaki veriler eşitleniyor...
git pull origin main --quiet

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .
echo %green%      =^> Yeni dosyalar başarıyla eklendi!%white%

echo %yellow%[3/4]%white% Kayıt oluşturuluyor...
git commit -m "!final_msg!" --quiet
echo %green%      =^> %magenta%"!final_msg!"%green% mesajı eklendi!%white%

echo %yellow%[4/4]%white% Kodlar GitHub'a gönderiliyor...
:: Gönderim sırasında mesajı farklı renkte gösteriyoruz
echo %magenta%      =^> Mesaj: !final_msg!%white%
git push origin main --quiet

echo.
echo %cyan%====================================================
echo    İŞLEM BAŞARILI: Tüm kodlar başarıyla güncellendi!
echo    %magenta%Final: !final_msg!%cyan%
echo ====================================================%white%
echo.
pause