@echo off
chcp 65001 >nul
setlocal

set "green=[92m"
set "yellow=[93m"
set "cyan=[96m"
set "white=[0m"

cls
echo %cyan%====================================================
echo    KARMA TFT VERİ GÜNCELLEME İŞLEMİ
echo ====================================================%white%

echo %yellow%[1/4]%white% Sunucudaki son değişiklikler kontrol ediliyor...
git pull origin main --quiet

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .
echo %green%      =^> Yeni dosyalar başarıyla eklendi!%white%

echo %yellow%[3/4]%white% Otomatik mesaj oluşturuluyor...
:: Tarih ve saat bilgisini içeren mesaj
set "msg=Otomatik Güncelleme: %date% %time%"
git commit -m "%msg%" --quiet
echo %green%      =^> Veriler eşitlendi ve açıklama yapıldı!%white%

echo %yellow%[4/4]%white% Kodlar GitHub'a gönderiliyor...
git push origin main --quiet

echo.
echo %cyan%====================================================
echo    İŞLEM BAŞARILI: Tüm kodlar başarıyla güncellendi!
echo    Mesaj: %msg%
echo ====================================================%white%
echo.
pause