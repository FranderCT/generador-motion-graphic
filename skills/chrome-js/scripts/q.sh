#!/bin/bash
# q.sh: atajos compactos sobre cjs.sh. Salida corta = menos tokens.
# Uso: q.sh <v.p> <cmd> [args]      (v.p = ventana.pestaña, p. ej. 1.2)
#   text [N]            texto visible (main o body), colapsado, máx N chars (def. 800)
#   ui [filtro]         controles interactivos en 1 línea c/u: tag|name/id|texto (filtro regex opcional)
#   click "texto"       clic en button/a/[role=button|option|tab|menuitem] con ese texto (exacto, luego contiene)
#   set "selector" val  escribe en input/textarea (setter nativo, compatible React)
#   go URL [N] [seg]    navega, espera seg (def. 4) y devuelve text N
#   js "expr"           ejecuta JS corto en línea
#   wait "regex" [seg]  espera (máx seg, def. 15) a que el texto visible cumpla regex
S=$(dirname "$0")
IFS=. read -r V P <<<"$1"; shift
CMD=$1; shift
run() { "$S/cjs.sh" "$V" "$P" -; }
case "$CMD" in
  text)
    N=${1:-800}
    run <<EOF
(function(){var t=((document.querySelector('main')||document.body).innerText||'').replace(/\s+/g,' ').trim();return t.slice(0,$N)+(t.length>$N?' …['+t.length+']':'');})()
EOF
    ;;
  ui)
    F=${1:-.}
    run <<EOF
(function(){var re=new RegExp('$F','i');return [].slice.call(document.querySelectorAll('input:not([type=hidden]),select,textarea,button,a[href],[role=button],[role=tab],[role=option],[role=combobox]')).filter(function(e){return !/captcha/.test(e.name||'')&&e.offsetParent!==null}).map(function(e){var t=(e.innerText||e.value||e.placeholder||e.getAttribute('aria-label')||'').replace(/\s+/g,' ').trim().slice(0,40);var k=(e.name||e.id||e.type||'');return e.tagName.toLowerCase()+'|'+k.slice(0,30)+'|'+t}).filter(function(s){return re.test(s)}).slice(0,60).join('\n');})()
EOF
    ;;
  click)
    T=${1//\'/\\\'}
    run <<EOF
(function(){var s='button,a,[role=button],[role=option],[role=tab],[role=menuitem],label,li';var all=[].slice.call(document.querySelectorAll(s));var n=function(e){return (e.innerText||'').replace(/\s+/g,' ').trim()};var b=all.find(function(e){return n(e)==='$T'})||all.find(function(e){return n(e).indexOf('$T')>=0});if(!b)return 'NO ENCONTRADO';b.click();return 'clic: '+n(b).slice(0,40);})()
EOF
    ;;
  set)
    SEL=${1//\'/\\\'}; VAL=${2//\\/\\\\}; VAL=${VAL//\'/\\\'}
    run <<EOF
(function(){var i=document.querySelector('$SEL');if(!i)return 'NO ENCONTRADO';var s=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(i),'value').set;s.call(i,'$VAL');i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));return 'len='+i.value.length;})()
EOF
    ;;
  go)
    "$S/cjs.sh" --goto "$V" "$P" "$1"; sleep "${3:-4}"
    "$0" "$V.$P" text "${2:-800}"
    ;;
  js)
    printf '%s' "$1" | run
    ;;
  wait)
    MAX=${2:-15}; i=0
    while [ $i -lt "$MAX" ]; do
      r=$(printf '%s' "(/$1/i).test(document.body.innerText)" | run)
      [ "$r" = "true" ] && { echo ok; exit 0; }
      sleep 1; i=$((i+1))
    done
    echo timeout; exit 1
    ;;
  *) echo "cmd desconocido: $CMD"; exit 2;;
esac
