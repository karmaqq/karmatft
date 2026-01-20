@echo off
setlocal
:: Renk Kodları (Windows 10 ve sonrası için)
set "green=[92m"
set "yellow=[93m"
set "cyan=[96m"
set "white=[0m"

cls
echo %cyan%====================================================
echo    TFT BUILDER - OTOMATIK GUNCELLEME SISTEMI
echo ====================================================%white%

echo %yellow%[1/4]%white% Sunucudaki son degisiklikler kontrol ediliyor...
git pull origin main --quiet

echo %yellow%[2/4]%white% Yeni dosyalar listeye ekleniyor...
git add .
echo %green%      =^> Yeni dosyalar basariyla eklendi!%white%

echo %yellow%[3/4]%white% Otomatik mesaj olusturuluyor...
set "msg=Guncelleme: %date% %time%"
git commit -m "%msg%" --quiet
echo %green%      =^> Veriler esitlendi ve commit atildi!%white%

echo %yellow%[4/4]%white% Kodlar GitHub'a gonderiliyor...
git push origin main --quiet

echo.
echo %cyan%====================================================
echo    ISLEM BASARILI: Tum kodlar buluta ucuruldu!
echo    Mesaj: %msg%
echo ====================================================%white%
echo.
pause