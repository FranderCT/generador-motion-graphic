#!/bin/bash
# Ejecuta JS en una pestaña del navegador sin extensión (AppleScript).
# Uso: cjs.sh <ventana> <pestaña> <archivo.js | ->     ('-' = JS por stdin)
# El valor de retorno de la última expresión del JS se imprime.
# Navegar:  cjs.sh --goto <ventana> <pestaña> <url>
# Navegador: BROWSER_APP="Brave Browser" (por defecto "Google Chrome")
APP=${BROWSER_APP:-Google Chrome}
if [ "$1" = "--goto" ]; then
  sed "s/__APP__/$APP/" <<'AS' | osascript - "$2" "$3" "$4"
on run argv
  tell application "__APP__" to set URL of tab ((item 2 of argv) as integer) of window ((item 1 of argv) as integer) to (item 3 of argv)
end run
AS
  exit $?
fi
W=${1:-1}; T=${2:-1}; F=${3:--}
if [ "$F" = "-" ]; then JS=$(cat); else JS=$(cat "$F"); fi
sed "s/__APP__/$APP/" <<'AS' | osascript - "$W" "$T" "$JS"
on run argv
  tell application "__APP__" to return (execute tab ((item 2 of argv) as integer) of window ((item 1 of argv) as integer) javascript (item 3 of argv))
end run
AS
