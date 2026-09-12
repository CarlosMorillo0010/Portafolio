# Dónde va tu avatar

Guarda aquí tu avatar con el nombre **`avatar`** y una de estas extensiones:
`.avif`, `.webp`, `.png`, `.jpg` o `.jpeg`. La página lo detecta sola: no hay
que tocar ni una línea de código.

    src/assets/avatar.webp   ← el actual

Si hay más de un formato, **gana el más liviano** en ese mismo orden.
Mientras no haya ninguno, el hero muestra el avatar en ASCII.

## Peso: importa más de lo que parece

El export original de Ready Player Me pesaba **713 KB**. Convertido a WebP a 700px
de ancho quedó en **47 KB**: la misma imagen, 93% menos. Esa diferencia es la que
separa un hero que aparece al instante de uno que tarda en pintar.

El PNG original está guardado como `avatar-original.png`. No se publica (el
detector solo busca `avatar.*`), así que puedes borrarlo sin romper nada.

Para repetir la conversión con un avatar nuevo:

```bash
npx sharp-cli --input src/assets/avatar.png               --output src/assets/avatar.webp               --format webp --quality 82 resize 700
```

## Cómo exportarlo en Ready Player Me

1. Entra a https://readyplayer.me y crea tu avatar
   (puedes subir una foto tuya como referencia).
2. Elige el encuadre **de cuerpo entero**.
3. Descárgalo como **PNG con fondo transparente**.
4. Conviértelo a WebP con el comando de arriba y déjalo en esta carpeta.

La imagen se ajusta con `object-fit: contain` y el marco toma su altura del
render, así que no se recorta ni se deforme cual sea su proporción.
