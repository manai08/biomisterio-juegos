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



## Ampliación de Carbohidratos: revisión local del 12 de octubre de 2026

Estado: código editado localmente; no publicado ni desplegado.

### Pruebas ejecutadas

- `node tests/engine.cjs`: 66 preguntas totales; 16 de Carbohidratos y 10 en cada uno de los cinco temas restantes; 18 partidas completas con 100/0/50 puntos; bloqueo de doble respuesta, avance y reinicio; claves estables tras invertir opciones; 24 feedback específicos; rechazo de bancos incompletos. Checksum de los 60 objetos originales conservado.
- `node tests/interface.cjs`: contrato de interfaz con DOM simulado, 16 pantallas, 24 feedback, bloqueo de opciones, resultado, reinicio, cierre del diálogo y retorno del foco. Cinco fallos simulados de imagen muestran una descripción estructural equivalente, por lo que los reactivos siguen disponibles y no se registran como errores de carga del estudiante. Los otros cinco temas conservan 10 preguntas y +10 puntos por acierto.
- Sintaxis JavaScript verificada con `node --check`.
- Los estilos originales y las seis escenas decorativas se conservan; únicamente se añade un bloque CSS para las nuevas figuras y el ajuste de la ruta de 16 pasos. Los recursos de RA no se han modificado.

### Puntaje

`100 × aciertos / preguntas disponibles`, redondeado a dos decimales. Los 16 reactivos siempre tienen representación visual o descripción equivalente. Se muestra 6,25 puntos por acierto; no se introduce umbral de aprobado.

### Comprobaciones pendientes antes de publicación

La revisión visual de la interfaz en un navegador real está pendiente. Chromium no pudo iniciarse desde el entorno de ejecución por restricción de sockets; el navegador cloud no pudo abrir el servidor local y su política no permite URLs file://. No se publicó el código para sortear estas limitaciones.

Quedan pendientes las capturas finales, legibilidad y desbordamientos de las nuevas figuras en escritorio y pantalla móvil, interacción real con teclado y cierre Escape, navegación atrás/adelante y prueba en teléfono físico. Las pruebas DOM no sustituyen estas comprobaciones. Abrir localmente index.html o ejecutar el servidor explicado en README.md y completar esa revisión antes de aprobar publicación.


## Revisión final de 71 preguntas: 12 octubre 2026

- Banco: carbohidratos16, lípidos15 y cuatro temas10. 59 objetos originales idénticos; LÍP-04 solo campos aprobados. C11–C16 idénticos al paquete confirmado. Orden fijo.
- Motor: 18 partidas, bloqueo/reinicio, 71 claves y 48 feedback. Lípidos8/15=53,33; 15/15=100.
- DOM: 16 pantallas de carbohidratos, 15 de lípidos, 48 feedback, siete fallos de figura con descripción equivalente, diálogo/foco.
- Chrome390×844: carbohidratos16/16=100; lípidos14/15=93,33 con error deliberado en LÍP-14. Figuras cargadas, opciones bloqueadas, teclado, Escape, retorno de foco y reinicio a pregunta1 y 0 puntos.
- Chrome1366×900: C12 y LÍP-15 revisados; lípidos15/15=100. Sin desbordamiento en pantallas medidas:375/390 móvil,1366/1366 escritorio. Sin errores de consola en recorridos registrados.
- Dos SVG nuevos: valencias C4/O2/N3; ambas cadenas C18H34O2; geometrías Z/E. Sin nombres de soluciones en rótulos/texto accesible.
- Capturas en ../capturas y revisión global ../revision-final.html.
- Teléfono físico y RA con cámara/tarjeta: pendientes. Sin publicar.
