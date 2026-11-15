#!/bin/bash
# Utilidades de audio para la narración. Requiere ffmpeg.
#   audio.sh speed  <in.mp3> <out.mp3> [factor]   acelera (def. 1.1; atempo admite 0.5–2.0)
#   audio.sh dur    <in.mp3>                      duración en segundos
#   audio.sh cuts   <in.mp3> [ruido_dB] [seg]     silencios (def. -30dB, 0.25 s) → sirven para cuadrar escenas
set -e
case "$1" in
  speed) ffmpeg -y -loglevel error -i "$2" -filter:a "atempo=${4:-1.1}" "$3" && echo "ok → $3" ;;
  dur)   ffprobe -v error -show_entries format=duration -of csv=p=0 "$2" ;;
  cuts)  ffmpeg -i "$2" -af "silencedetect=noise=${3:--30}dB:d=${4:-0.25}" -f null - 2>&1 | grep -E "silence_(start|end)" ;;
  *) sed -n '2,6p' "$0"; exit 1 ;;
esac
