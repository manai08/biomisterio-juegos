# Verificación de BioMisterio

Fecha: 25 de septiembre de 2026.

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

No hay formularios de identificación, almacenamiento de puntuaciones, backend ni solicitudes de la aplicación a APIs externas. HTML, CSS, JavaScript e icono se cargan localmente desde el mismo alojamiento. No hay recursos de Quizizz/Wayground/Educaplay. Los motivos de progreso son abstractos y no representan estructuras moleculares.
