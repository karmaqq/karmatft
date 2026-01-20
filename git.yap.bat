@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set "green=[92m"
set "yellow=[93m"
set "cyan=[96m"
set "white=[0m"
set "magenta=[95m"
set "red=[91m"

set "current_time=%time:~0,8%"
set "timestamp=%date% !current_time!"

cls
echo %cyan%====================================================
echo    KARMA TFT PROJESİ - OTOMATİK GÜNCELLEME İŞLEMİ
echo ====================================================%white%
echo.

set "user_msg="
set /p "user_msg=Yapılan değişikliği yaz: "

if "!user_msg!"=="" (set "msg_text=Otomatik Güncelleme") else (set "msg_text=!user_msg!")
set "final_msg=!msg_text! !timestamp!"
echo.

echo %yellow%[1/4]%white% Sunucudaki veriler eşitleniyor...
git pull origin main --quiet 2>nul
if %errorlevel% equ 0 (
    echo %green%      [OK] Sunucu ile bağlantı güncel.%white%
) else (
    echo %red%      [HATA] Sunucudan veri çekilemedi.%white%
)

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .
if %errorlevel% equ 0 (
    echo %green%      [OK] Tüm dosyalar başarıyla kuyruğa alındı.%white%
) else (
    echo %red%      [HATA] Dosyalar eklenirken bir sorun oluştu.%white%
)

echo %yellow%[3/4]%white% Kayıt mesajı oluşturuluyor...
git commit -m "!final_msg!" >nul 2>&1
if %errorlevel% equ 0 (
    echo %green%      [OK] Değişiklikler yerel hafızaya kaydedildi.%white%
) else (
    echo %yellow%      [BİLGİ] Kaydedilecek yeni bir değişiklik bulunamadı.%white%
)

echo %yellow%[4/4]%white% Kodlar GitHub'a gönderiliyor...
git push origin main --quiet 2>nul
if %errorlevel% equ 0 (
    echo %green%      [OK] Yükleme başarılı.%white%
) else (
    echo %red%      [HATA] Yükleme başarısız.%white%
)

echo.
echo %cyan%====================================================
echo    İŞLEM TAMAMLANDI: Tüm veriler eşitlendi
echo    %magenta%Mesaj: %green%!msg_text! %white%!timestamp!
echo %cyan%====================================================%white%
echo.
pause