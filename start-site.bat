@echo off
REM Double-click this file anytime to start the Udayarun website.
cd /d "%~dp0"
echo Starting Udayarun on http://localhost:3000 ...
set HOSTNAME=::
node.exe .next\standalone\server.js
pause
