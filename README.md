# BioMisterio

Sistema estático de seis cuestionarios de bioquímica. Cada partida contiene 10 preguntas, vale hasta 100 puntos y no solicita ni guarda información del estudiante.

## Archivos

- `index.html`: entrada al sistema.
- `questions.js`: 60 preguntas, opciones, claves y retroalimentaciones extraídas literalmente del Anexo A de Guia_Codex_BioMisterio.docx.
- `game-engine.js`: reglas compartidas y validación del banco.
- `app.js`: menú, temas e interfaz.
- `styles.css`: diseño adaptable y colores.
- `favicon.svg`: recursos visuales locales.
- `tests/engine.cjs`: prueba automática del motor.
- `QA.md`: comprobaciones y límites de la verificación.

## Uso local

Abre `index.html` en un navegador con JavaScript. No necesita instalar paquetes ni conectarse a servicios para jugar. Para probar mediante servidor, instala Python y ejecuta desde la carpeta del proyecto:

```sh
python -m http.server 8000 
```

Abre `http://localhost:8000/`. Las rutas usan `?tema=carbohidratos`, `?tema=lipidos`, `?tema=proteinas`, `?tema=nucleotidos`, `?tema=acidos-nucleicos` y `?tema=vitaminas`.

## Modificar preguntas

Haz una copia antes de editar. Abre `questions.js` con un editor de texto UTF-8. Busca el identificador de la pregunta (por ejemplo CAR-01). `question` contiene el enunciado; cada opción conserva una `key` A/B/C/D y su `text`; `correct` señala la clave y `feedback` contiene la explicación. Modifica contenido científico solo después de una revisión humana. No cambies una clave sin revisar las opciones. Conserva 10 preguntas por tema, cuatro opciones distintas por clave y una sola respuesta correcta. El orden visual es fijo en esta versión.

Ejecuta `node tests/engine.cjs` si tienes Node.js. Abre los seis temas y prueba respuestas correctas e incorrectas. El programa impide comenzar cuando el banco no pasa su validación.

## Publicar cambios en GitHub Pages

El sitio se sirve desde la raíz de la rama main. En Settings → Pages selecciona Deploy from a branch, rama main y carpeta / (root). Guarda. Cada cambio confirmado en main vuelve a publicar el sitio. Espera a que GitHub confirme el despliegue antes de probar los enlaces.

Para actualizar, edita los archivos desde GitHub o con un editor local y sube los cambios. Conserva juntos index.html, styles.css, app.js, game-engine.js, questions.js y favicon.svg.

## Recuperar desde el ZIP

1. Descomprime el respaldo y conserva juntas las carpetas.
2. Prueba `index.html` o el servidor local anterior.
3. Sube los archivos a un repositorio nuevo y configura Pages según las instrucciones anteriores, o vuelve a publicar la carpeta completa en un alojamiento estático.
4. Si cambia el dominio, actualiza los seis enlaces en la ficha 75.

No se incluyen credenciales ni dependencias de Quizizz, Wayground o Educaplay. La aplicación no envía resultados, no usa almacenamiento local ni APIs. El proveedor de alojamiento puede mantener sus registros técnicos habituales de solicitudes HTTP.

## Enlaces

Consulta `ENTREGA.md` para los enlaces de publicación y su estado. Consulta `QA.md` para distinguir pruebas de escritorio, pantalla móvil y teléfono físico.

