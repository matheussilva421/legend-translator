@echo off
echo ====================================
echo   Legend Translator - Iniciando...
echo ====================================
echo.

cd /d "%~dp0"

echo Verificando node_modules...
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    echo.
)

echo Iniciando servidor de desenvolvimento...
echo.
echo O aplicativo sera aberto em: http://localhost:5173
echo Pressione Ctrl+C para parar o servidor
echo.

call npm run dev
