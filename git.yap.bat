@echo off
git add .
git commit -m "Otomatik guncelleme: %date% %time%"
git push origin main
pause