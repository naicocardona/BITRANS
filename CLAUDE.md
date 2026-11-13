# BITRANS · memoria de trabajo (leer siempre al iniciar)

## Primer paso de cada sesión
1. Ejecutar `bash tools/restaurar.sh`. Instala la verificación de voz (Whisper) y la voz local (Kokoro, con sherpa-onnx < 2, porque la 2.x rompe el español). Crea el taller en `/home/user/bitrans_work`.
2. Trabajar desde `/home/user/bitrans_work`. Todos los armadores lo usan, o `BITRANS_WORK` si está definida.
3. Nunca dejar herramientas, voces, guiones ni proyectos solo en carpetas temporales. Las herramientas van en `tools/`. Las voces originales (mp3 de ElevenLabs), los `words.json`, los guiones y las entregas van en `entregas/<proyecto>/`.
4. Hacer commit y push al terminar cada entrega en la rama `claude/dazzling-johnson-ezan3b`.

## Persona y forma de trabajar
- Lady, cofundadora. Responder en español con tono colombiano y lenguaje neutro de género.
- Sus palabras: «no podemos tener errores», «que no se te olvide nada», «siempre mejorar cada video», «que sea más automático». Ella edita al final; la idea es que todo salga bien a la primera.
- Proyectos independientes, cada uno con sus reglas: TITÁN HOLDING, NAS100 EDGE LAB, LUKAS, NUVA.
- **Este equipo es solo para hacer videos**, cuando Lady trae una idea (7 nov 2026). El resto del trabajo de LUKAS y NUVA (app, guías, prototipos, anuncios) lo hace ella desde su computador: no pedirlo, rescatarlo ni archivarlo aquí.
- No inventar datos: cifras exactas y con fuente. Los ejemplos hipotéticos se marcan como tales.
- **Peso:** los videos para redes se exportan en máxima calidad (crf 18), aunque pesen más de 30 MB; Lady lo autorizó el 7 nov 2026. Límite práctico: menos de 100 MB por archivo, que es el máximo de GitHub.
- No clonar ni imitar voces reales. No activar servicios de pago, no enviar grabaciones de Lady a terceros y no aceptar analítica por ella. ElevenLabs sí está autorizado (plan pago).
- No copiar el estilo de creadores o canales específicos; TITÁN tiene identidad propia.
- Videos de referencia que trae Lady (12 nov 2026): son solo para entender de qué trata el tema; todo se hace con el estilo propio de TITÁN, nada de copias (ni look, ni personajes, ni frases).
- La comunidad de TITÁN compra acciones de EE. UU.: los temas de impuestos y reglas de EE. UU. (IRS, retenciones, herencias) sí aplican; se explican para quien invierte desde Colombia y con fuente.
- El correo de Lady solo sirve para identificarla; nunca se envía a servicios.

## TITÁN HOLDING
- Bases oficiales: `entregas/titan/TITAN_BASES_DE_CONTENIDO.md`.
- **Estilo oficial desde el 3 nov 2026:** animación plana ilustrada con personas genéricas que caminan, hacen cosas y reaccionan. Nunca personas reales ni el avatar de TITÁN.
  - Paleta: navy, marfil, dorado, lavanda y violeta.
  - Cada frase es una escena con acción.
  - Transiciones: zoom hacia pantallas, ventanas o pines; círculo dorado; barrido; periódicos volando; sacudida.
  - Siempre hay vida en pantalla y se usan contornos de mapas reales.
- **Voz:** ElevenLabs Juan, `voice_id FA1FBP9TKxnBiw45fHmS`, modelo `eleven_v4`.
  - Una toma por guion (`generations_count` 1). Calcular antes los créditos (~1 por carácter).
  - Verificar con `tools/asr.py`.
  - Acortar pausas con `tools/tighten.py` (0,32). Nunca acelerar la voz.
  - Escribir los números en palabras para la voz y en cifras en pantalla.
- **Formato:** vertical 1080×1920 a 30 fps. TikTok de 60–90 s y Shorts de 35–60 s; el Short es una edición propia, no un recorte.
  - Titular desde el primer cuadro, sin intro de logo.
  - Subtítulos sincronizados de 3 palabras.
  - CTA y «Contenido educativo. No es una recomendación de inversión.»
  - −14 LUFS.
- **Armado:** `tools/build_dem.py` + `tools/dem.js` + `tools/dem_scenes.py` son la plantilla más reciente.
  - Personajes: `tools/flat_scenes.py:fig()`.
  - Subtítulos y anclas: `tools/tq_anchors.py`.
  - Música original: `tools/bed_music.py`. Efectos: `tools/sfx_mix.py`. Mezcla: `tools/mix_dem.py`.
  - Portadas: `tools/cover_dem.py`.
- **Plantilla para paquetes (largo 1920×1080 + verticales con escenas compartidas), desde el paquete Nasdaq (nov 2026):**
  - `tools/nq_scenes.py`: escenas 1080×1080 reutilizables.
  - `tools/nq_voice.py`: une la voz, añade pausas de lectura y genera el texto en cifras.
  - `tools/build_nq.py`: planes por formato con anclas, más un QC de tiempos que detiene el armado.
  - `tools/nq.js`: motor de efectos por datos con cámara por tramos.
  - `tools/mix_nq.py`, `tools/cover_nq.py`, `tools/srt_nq.py`.
  - Si un brief pide su propia paleta o firma (sin logo), se respeta.
- **Lecciones del paquete Nasdaq:**
  - Las anclas de una palabra pueden repetirse («Primera:» coincide con «por primera vez»): usar el parámetro `after`.
  - Nada puede dibujarse encima de las cifras (por ejemplo, un piso tapando la píldora +25 %).
  - Las tarjetas de cada escena deben llegar junto con la transición; nada de escenarios vacíos mientras la voz arranca.
  - Las etiquetas «hipotético» se mantienen visibles toda la escena, aunque la cámara se acerque.
  - Verificar siempre los datos del brief: el S&P de 2022–2023 daba +0,08 %, no −0,18 %.
- **Pedido de Lady (7 nov 2026) para TODOS los videos nuevos:** más movimiento para la retención, con más animaciones, más transiciones y más cosas impactantes que generen curiosidad («morbo en el buen sentido»).
  - Cada 1–2 s debe pasar algo: un golpe visual, un zoom con sacudida, una cifra que estalla, un objeto que vuela o un personaje que reacciona.
  - Variar las transiciones y que no se repitan seguidas.
  - Ganchos visuales fuertes en los primeros 3 s.
- **Sincronía de subtítulos:**
  - Alinear con `tools/align_asr.py`, que usa Whisper por tramos; `nq_voice.py` ya lo usa. El reparto por letras se desvía en secciones largas.
  - Verificar siempre con `python3 tools/sync_check.py voz.wav words.json`: la coincidencia media debe ser de 0,85 o más y sin ventanas desfasadas.
  - Al insertar pausas, cada palabra se corre solo con las pausas anteriores a su tiempo original. Antes había doble conteo, y eso causó el desfase del YouTube Nasdaq desde el 4:40.
- **Cámara sin trabas:** animar el `viewBox` del SVG, no el `transform` de un div; el desplazamiento lento del div salta de a un píxel. El motor `nq.js` también limita la cámara para que nunca salga del recuadro. Detector: `tools/stutter.py`.
- **Revisión cuadro por cuadro antes de entregar:** `python3 tools/qa_video.py video.mp4` detecta cuadros negros, momentos quietos de más de 2 s, volumen y silencios.
- **Skills de animación (desde el 7 nov 2026):** procedencia en `tools/skills/PROCEDENCIA.md`.
  - Para TITÁN se usa `hand-drawn-canvas-animation`: personajes y objetos dibujados a mano en Canvas, con lápiz, tinta o risografía.
  - Va como capa adicional sobre el pipeline actual, que se mantiene: voz de Juan, align_asr, sync_check, cámara viewBox, qa_video, −14 LUFS y cifras exactas.
  - Siempre en la paleta de TITÁN, con personas genéricas y sin mascotas de terceros (por ejemplo, Clawd de painted-animation).
  - Antes de animar el video completo, aprobar una toma piloto.
  - `motion-reel` aporta el ciclo de crítica: tira de cuadros consecutivos y hasta 3 rondas de corrección.
  - Plantilla del estilo dibujado (piloto interés compuesto): `tools/ic/`. `guion` → `voice.py` → `film.js` (escenas con anclas A(frase, after)) → `build.sh` → `tools/hd_render.cjs` → `mix.py`.
    - `tools/hd_render.cjs` renderiza en paralelo a 30 fps con Playwright. También genera grilla, cuadros sueltos y portada, y exporta los efectos.
    - Se detiene si hay anclas ambiguas.
    - El film corre a 24 fps lógicos estirados ×1,25 → 30 fps reales.
  - **Estilo híbrido aprobado por Lady (7 nov 2026, «interés compuesto»):** trazo dibujado más rasgos del plano anterior.
    - Tarjetas navy con cifras doradas (`pill`), rellenos planos, personas grandes y fondo con puntos y manchas en paralaje.
    - Escenas navy para tablas y cierres.
    - Plantilla: `tools/ic/film_final.js`, con constructores de escena con anclas por versión (TikTok y Short desde el mismo archivo), `build_final.sh`, `voice_final.py` y `mix_final.py`.
    - La mezcla tiene una segunda pasada a −14,0 LUFS exactos.
  - **Kit genérico del estilo híbrido (desde Nvidia, 9 nov 2026):** cada video nuevo solo escribe sus escenas.
    - `tools/hd_lib.js`: piezas comunes (trazo, tarjetas, personas, subtítulos y 6 transiciones, entre ellas «news», periódicos volando).
    - `tools/hd_build.sh`: arma el film.
    - `tools/hd_render.cjs`: render.
    - `tools/hd_mix.py`: voz + música + efectos, −14 LUFS en 2 pasadas, MP4 y SRT.
    - Ejemplo de escenas: `tools/nv/film.js`.
    - `tools/hd_voice.py <entrega> <sub>` (nov 2026): voz genérica; `guiones.py` define SH, TK, MAP y PAUSAS opcionales. Ejemplos: `tools/gota/`, `tools/arr/`.
    - `hd_mix.py` deja sus .wav temporales junto a la salida: mezclar en el taller y copiar a `entregas/` solo el mp4 y el srt.
    - `hd_render.cjs`: `--grid` y `--cover` son llamadas aparte (no generan el video).
  - **Reflexiones y videos emotivos (12 nov 2026):** Lady rechazó la versión «escalera» (persona pequeña y lejana: «no me identifico»). Aprobó el estilo «escenas de cerca»: `tools/ref2/` (`paint.js` con `closeFace`, `backView`, manos, lluvia, grano; `film.js`; `build.sh`). Personaje A1: pelo corto y camiseta básica negra. Antes de animar, mostrar 3 imágenes fijas para aprobar.
  - Mapas reales: `tools/geo/` (Natural Earth vía world-atlas, ISC). Ejemplo de uso: `tools/her/build.sh`, que inyecta `GEO`.
  - **Pronunciación de Juan (ElevenLabs):** escribir «Envidia» (Nvidia), «Yensen Huang» (Jensen Huang) y «ese ene pe quinientos» (S&P 500). En pantalla se corrigen con el MAP de `voice.py`.
  - Si un brief dice «no gastar créditos», igual se usa Juan de ElevenLabs. Lady lo confirmó el 9 nov 2026: «usa elevenlabs como siempre, con las de titan».
  - `align_asr.py` convierte las cifras de Whisper a palabras («10,800», decimales «4,3 %» y «SNP» → «ese ene pe»). Así `sync_check` deja de bajar en los videos con números.
- Mejoras aprobadas por evaluar (inspiradas en la skill claude-animated-shorts, solo técnicas, MIT):
  - QA cuadro por cuadro (negro, blanco, congelado, saltos, volumen): **hecho**;
  - cámara que nunca queda quieta y sacudidas en golpes;
  - profundidad (fondo desenfocado y capas con paralaje);
  - efectos de sonido sincronizados con eventos;
  - piloto 3D opcional de una escena.

## NAS100 EDGE LAB
- Bases: `entregas/nas100edgelab/NAS100EDGELAB_Prompt_Maestro.md`.
- El Explorador siempre es el único personaje, sobre el fondo de laboratorio ilustrado (tubos de neón, consola con radar, piso escaneado).
- **Nunca mostrar dinero ($$$) ni lotes**, aunque el brief lo pida: van tapados con etiquetas de diseño desde el primer cuadro, también en portadas y miniaturas.
- Voz A: Kokoro em_alex, sid 29, velocidad 0,92 (`tools/tts_local_any.py 29 0.92 salida.wav "texto"`) más la cadena ffmpeg de `tools/t027/assemble.py`. TikTok a −16 LUFS y Shorts a −14 LUFS.
- No generar el siguiente trade hasta que Lady apruebe el anterior.
- Plantillas: `tools/build_t027.py`, `tools/t027.js`, `tools/t027.css`, `tools/mix_t027.py`, `tools/t027/`.
- **Plantilla más reciente para un trade (TRADE #028, 9 nov 2026):** `tools/t028/` (`script.py` y `assemble.py`), `tools/build_t028.py`, `tools/t028.js`, `tools/mix_t028.py` y `tools/cover_t028.py`.
  - Medidor de score con la marca del mínimo.
  - Tapas por comprobante: lote, dinero y Δ/%.
  - Render: `npx hyperframes render --fps 30 --output ...`.
- **Subtítulos NAS:** usar `nas_common.align_parts`, que ubica los cortes de línea con Whisper y cuenta las cifras como se pronuncian. El reparto por letras adelantaba casi 2 s las frases con números («446»).
- La voz del Explorador siempre es la voz A: Kokoro em_alex 0,92 más la cadena de voz. Lady lo recordó el 9 nov 2026.

## QC automático antes de entregar (obligatorio)
- Nada fuera del encuadre y nada tapando caras; textos arriba, subtítulos abajo y personajes en la franja media.
- Nada quieto más de 2 s y ningún cuadro vacío entre escenas. Revisar las transiciones en el video final con ffmpeg, no solo con snapshots.
- Los lugares clave se muestran de cerca.
- En NAS, el dinero y los lotes quedan tapados desde el primer cuadro.
- Verificar cifras, fechas, voz (ASR), LUFS, duración con el audio final y peso de cada archivo.
- `npx hyperframes check` sin errores.
- Portada: abrirla y mirarla antes de entregar. Ningún texto a medio escribir (tomarla después de que terminen las animaciones de texto) y con el momento más fuerte del video, no siempre el primer cuadro (lección de la reflexión, 12 nov 2026).

## Notas
- Short 2 del paquete Nasdaq: desfase leve de subtítulos (~1 s) entre los segundos 10 y 15. Lady decidió dejarlo así (7 nov 2026). En los videos siguientes, `sync_check.py` es obligatorio antes de entregar.
- Las voces originales de «demócratas» ya están en `entregas/titan/democratas_wallstreet/voz/`. Desde ahora, guardar siempre los mp3 de ElevenLabs en `entregas/.../voz/` el mismo día: sus enlaces de descarga vencen.
- Las voces de NU solo están en el flujo de ElevenLabs «TITÁN · NU y las elecciones · Narraciones».
- **Enfoque de contenido (13 nov 2026, Lady):** TITÁN es un fondo de inversión. El contenido se queda en inversiones y diversificación, sin salirse a temas de vivienda o consumo. Se mantiene el formato que funcionó en «¿Arrendar o comprar?» (1.000 visitas en 3 h en TikTok): una creencia popular, la cuenta con números reales y «depende, haz tu cuenta». Siempre educativo: sin prometer rentabilidades ni invitar a invertir en el fondo.
- **Pendiente:** serie «La cuenta que nadie hace» (inversión). Ideas: 1) ¿una sola acción o diversificado? (recomendada); 2) el costo de esperar el momento perfecto (días que te pierdes del S&P); 3) ¿100 dólares al mes o esperar a tener 5.000?; 4) la comisión del 1 % a 30 años; 5) ¿solo pesos o también dólares? (TRM, BanRep); 6) las más grandes del S&P hace 20 años vs. hoy. Preguntarle a Lady con cuál arranca.
- Auditoría del 7 nov 2026: `AUDITORIA_RESPALDO.md`. Revisar sus pendientes al inicio de cada sesión hasta que estén cerrados.
- Hay que avisarle a Lady en cuanto algo requiera una acción suya desde el computador; ella lo pidió así.
- El repositorio `naicocardona/lukas-app` es el código de la app LUKAS (otro equipo); no guardar videos ahí.
- `tools/sfx_mix.py` y `tools/tts_local_any.py` se reconstruyeron el 7 nov 2026 con la misma interfaz (las originales se perdieron en una carpeta temporal). Las demás herramientas se recuperaron textuales. Las fuentes, el logo y GSAP están en `tools/kit/tq-3d/`.
