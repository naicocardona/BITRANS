# Auditoría de respaldo · 7 nov 2026

## Qué está a salvo (en GitHub, rama `claude/dazzling-johnson-ezan3b`)

| Elemento | Dónde |
|---|---|
| TITÁN: todas las entregas (NU, ¿Quién manda?, Demócratas, Internet bajo el mar, Mundo en una caja, La nube) y las bases | `entregas/titan/` (556 MB) |
| NAS100 EDGE LAB: semanas 09–11, trades 023–027, proyectos editables, avatar y Prompt Maestro | `entregas/nas100edgelab/` (433 MB) |
| Herramientas de armado, plantillas, kit de fuentes/logo/GSAP, mapas y restaurador | `tools/` (`bash tools/restaurar.sh`) |
| Reglas de trabajo y memoria | `CLAUDE.md` (se carga sola en cada sesión) |
| Voces originales: ¿Quién manda? (dentro del zip editable) y Demócratas | `entregas/titan/.../voz` |

## Riesgos encontrados y acción

| # | Riesgo | Quién | Estado |
|---|---|---|---|
| 1 | El repositorio BITRANS es **público**: cualquiera puede ver las entregas, el avatar y las muestras de voz. | Lady (GitHub → BITRANS → Settings → General → Danger Zone → Change visibility → Private) | Pendiente |
| 2 | Las entregas de **LUKAS** (videos 11–40, guías, prototipo y fichas) y de **NUVA** (anuncios Meta y video de unboxing) no aparecen en ningún repositorio. Lo más probable es que solo existan como archivos enviados en el chat. | Lady: descargarlos desde la conversación en el computador y volver a subirlos aquí para archivarlos | Pendiente |
| 3 | Las voces originales de **NU** solo están en ElevenLabs. | Lady: ElevenLabs → Flows → «TITÁN · NU y las elecciones · Narraciones», descargar los audios y subirlos aquí | Pendiente |
| 4 | Todo vive en una rama de trabajo; la rama principal (`master`) solo tiene código viejo. Si alguien borra la rama, se pierde lo visible en la página principal. | Decisión de Lady: unir la rama a `master` con un pull request | Pendiente de autorización |
| 5 | Herramientas guardadas en carpetas temporales se perdieron al cambiar de equipo. | Claude | **Resuelto:** todo está en `tools/` con `restaurar.sh` |
| 6 | Las voces de ElevenLabs de demócratas no estaban guardadas. | Claude | **Resuelto:** recuperadas |
| 7 | La voz local del Explorador (NAS) fallaba con sherpa-onnx 2.x. | Claude | **Resuelto:** versión fijada en < 2 y probada |
| 8 | Las sesiones nuevas arrancaban sin herramientas. | Lady: elegir el entorno «BITRANS» al abrir una sesión | Creado, falta usarlo |
| 9 | El repositorio pesa 1,1 GB y crecerá con cada video. GitHub admite archivos de hasta 100 MB y recomienda menos de 5 GB por repositorio. | Claude vigila; si pasa de ~3 GB, proponer guardar los videos finales en Drive | En seguimiento |

## Verificado
- Sin claves ni contraseñas en el repositorio.
- Ningún archivo supera 100 MB (el mayor tiene 53 MB).
- La cadena completa (voz → alineación → composición → revisión → mezcla a −14 LUFS) se probó de nuevo con las herramientas restauradas.
