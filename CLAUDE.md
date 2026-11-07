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
- Cada archivo debe pesar menos de 30 MB; solo el video largo de YouTube de TITÁN puede superarlo.
- No clonar ni imitar voces reales. No activar servicios de pago, no enviar grabaciones de Lady a terceros y no aceptar analítica por ella. ElevenLabs sí está autorizado (plan pago).
- No copiar el estilo de creadores o canales específicos; TITÁN tiene identidad propia.
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
- Mejoras aprobadas por evaluar (inspiradas en la skill claude-animated-shorts, solo técnicas, MIT):
  - QA cuadro por cuadro (negro, blanco, congelado, saltos, volumen);
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

## QC automático antes de entregar (obligatorio)
- Nada fuera del encuadre y nada tapando caras; textos arriba, subtítulos abajo y personajes en la franja media.
- Nada quieto más de 2 s y ningún cuadro vacío entre escenas. Revisar las transiciones en el video final con ffmpeg, no solo con snapshots.
- Los lugares clave se muestran de cerca.
- En NAS, el dinero y los lotes quedan tapados desde el primer cuadro.
- Verificar cifras, fechas, voz (ASR), LUFS, duración con el audio final y peso de cada archivo.
- `npx hyperframes check` sin errores.

## Notas
- Las voces originales de «demócratas» ya están en `entregas/titan/democratas_wallstreet/voz/`. Desde ahora, guardar siempre los mp3 de ElevenLabs en `entregas/.../voz/` el mismo día: sus enlaces de descarga vencen.
- Las voces de NU solo están en el flujo de ElevenLabs «TITÁN · NU y las elecciones · Narraciones».
- Auditoría del 7 nov 2026: `AUDITORIA_RESPALDO.md`. Revisar sus pendientes al inicio de cada sesión hasta que estén cerrados.
- Hay que avisarle a Lady en cuanto algo requiera una acción suya desde el computador; ella lo pidió así.
- El repositorio `naicocardona/lukas-app` es el código de la app LUKAS (otro equipo); no guardar videos ahí.
- `tools/sfx_mix.py` y `tools/tts_local_any.py` se reconstruyeron el 7 nov 2026 con la misma interfaz (las originales se perdieron en una carpeta temporal). Las demás herramientas se recuperaron textuales. Las fuentes, el logo y GSAP están en `tools/kit/tq-3d/`.
