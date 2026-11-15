#!/bin/bash
# Lista ventanas/pestañas del navegador: V<ventana>.<pestaña> | título | URL (URL recortada a 110 chars)
# Navegador: BROWSER_APP="Brave Browser" (por defecto "Google Chrome")
APP=${BROWSER_APP:-Google Chrome}
sed "s/__APP__/$APP/" <<'AS' | osascript
on cut(s)
  if (length of s) > 110 then return (text 1 thru 110 of s) & "…"
  return s
end cut
tell application "__APP__"
  set out to ""
  set w to 0
  repeat with win in windows
    set w to w + 1
    set t to 0
    repeat with tb in tabs of win
      set t to t + 1
      set out to out & "V" & w & "." & t & " | " & (title of tb) & " | " & (my cut(URL of tb)) & linefeed
    end repeat
  end repeat
  return out
end tell
AS
