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
set "timestamp=%date% !current_time!"

cls
echo %cyan%====================================================
echo    KARMA TFT PROJESİ - OTOMATİK GÜNCELLEME İŞLEMİ
echo ====================================================%white%
echo.

:: 1. Mesaj Alma
set "user_msg="
set /p "user_msg=Yapılan değişikliği yaz: "

:: Mantık: Eğer boşsa "Otomatik Güncelleme" yaz, değilse kullanıcının mesajını al
if "!user_msg!"=="" (
    set "msg_text=Otomatik Güncelleme"
) else (
    set "msg_text=!user_msg!"
)

:: Git'e gidecek tam mesaj (Mesaj + Tarih)
set "final_msg=!msg_text! !timestamp!"

echo.
echo %yellow%[1/4]%white% Sunucudaki veriler eşitleniyor...
git pull origin main --quiet

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .

echo %yellow%[3/4]%white% Kayıt (Commit) oluşturuluyor...
git commit -m "!final_msg!" --quiet

echo %yellow%[4/4]%white% Kodlar GitHub'a gönderiliyor...
git push origin main --quiet

:: Final Ekranı - Mesaj YEŞİL, Tarih BEYAZ
echo.
echo %cyan%====================================================
echo    İŞLEM BAŞARILI: Veriler Buluta İşlendi
echo    %magenta%Mesaj: %green%!msg_text! %white%!timestamp!
echo %cyan%====================================================%white%
echo.
pause