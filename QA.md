# Verificación de BioMisterio

Fecha: 25 de septiembre de 2026.

## Actualización: aventuras animadas

- Seis escenas vectoriales locales, con resultado visual de acierto y de error: 12 casos comprobados en Chrome a 390 × 844 px.
- En cada caso: estado visual esperado, animaciones CSS correspondientes, cuatro opciones bloqueadas, retroalimentación científica intacta y sin desbordamiento horizontal.
- Carbohidratos: el personaje aterriza en la segunda roca al acertar; al errar surge una llamarada central y el personaje permanece en la primera roca.
- El botón de animaciones desactiva todos los movimientos sin cambiar puntos ni resultado; la preferencia se conserva al avanzar y repetir durante esa partida. También se incluye `prefers-reduced-motion`.
- Comprobada selección de respuesta con Enter.
- Banco de preguntas idéntico al anterior: SHA-256 C33B7A997DA75D91C697A9FEDBD1F3C14B6ABD263AE3F5B2161F274F86FB9229.
- Las 18 partidas automáticas del motor siguen pasando.
- La comprobación desde un teléfono físico sigue pendiente; estas pruebas utilizan tamaño móvil en una computadora.

## Banco y motor — aprobados

- 60 preguntas extraídas del documento mediante XML; diez por tema. Enunciados, alternativas, claves y retroalimentaciones conservados, separando únicamente los rótulos del formato original.
- Cuatro opciones A/B/C/D por pregunta y una clave válida.
- 18 partidas automáticas: resultados de 100, 0 y 50 puntos en cada tema.
- Bloqueo de respuestas repetidas y de avance antes de responder.
- Reinicio de puntaje, índice, respuestas y estado final.
- 60 comprobaciones de clave al invertir el orden de opciones.
- Rechazo de bancos incompletos y claves inválidas.
- Prueba reproducible: `node tests/engine.cjs`.

## Navegador

Se verificaron los seis enlaces locales a 390 × 844 píxeles en Chrome mediante su modo de tamaño de pantalla: tema y primera pregunta correspondientes, cuatro opciones, retroalimentación, bloqueo de las cuatro respuestas y ausencia de desbordamiento horizontal. Se probaron tanto respuestas correctas como incorrectas. Se revisó visualmente la primera pregunta y la explicación de Carbohidratos. El puntaje permanece fijo al desplazarse.

La aplicación incluye controles nativos aptos para teclado, áreas de respuesta de al menos 60 px, símbolos y texto además del color, y desactivación de transiciones con `prefers-reduced-motion`.

## Límites de la comprobación móvil

La prueba de tamaño móvil se ejecutó en una computadora. **No equivale a una prueba desde un teléfono Android o iPhone físico. Esa comprobación queda pendiente.** No se dispone de un teléfono controlable en esta sesión. Para completarla, abrir desde el teléfono el menú y los seis enlaces de ENTREGA.md, responder una pregunta en cada tema y completar/repetir una partida. Registrar modelo, navegador, fecha y resultado.

## Datos y recursos

No hay formularios de identificación, almacenamiento de puntuaciones, backend ni solicitudes de la aplicación a APIs externas. HTML, CSS, JavaScript, icono y escenas SVG se cargan localmente desde el mismo alojamiento. No hay recursos de Quizizz/Wayground/Educaplay. Las escenas son ambientación lúdica y no simulan procesos moleculares.
