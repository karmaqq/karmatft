@echo off
echo Islem baslatiliyor...
:: 1. Once uzak sunucudaki degisiklikleri cek (Hata onleyici)
git pull origin main
:: 2. Tum yeni dosyalari ekle
git add .
:: 3. Otomatik mesajla kaydet
git commit -m "Otomatik guncelleme: %date% %time%"
:: 4. Kodlari gonder
git push origin main
echo Islem basariyla tamamlandi!
pause