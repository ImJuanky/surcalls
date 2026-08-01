# Lo que falta por tu parte

Todo lo que la review de diseño señaló y podía resolverse con código ya está aplicado y verificado con build limpio: favicon roto, contraste AA, copy del trust-bar, iconografía emoji → SVG propio, ritmo vertical, escala tipográfica de títulos, scroll-spy + accesibilidad del menú móvil, el indicador deslizante de Servicios (ahora se mide del DOM real en vez de asumir alturas iguales), el hueco del hero en tablet, 2-3 secciones con su propio gesto de animación, y el tono de copy de "Qué hacemos" (ahora habla de beneficio, no de arquitectura, como el resto de la web).

Quedan cuatro cosas que no puedo resolver yo solo porque requieren una decisión tuya, un activo que no tengo, o una verificación que solo se puede hacer en un dispositivo real.

## 1. Logo metálico — ya integrado en el navbar, footer pendiente

Recorté solo la marca (el diamante/flecha, sin el texto "CALLS" para no duplicar el wordmark "SurCalls") en `/public/logo-mark.png`, con transparencia real, y la integré en el navbar junto al texto, con una animación de flotación permanente y un efecto 3D que sigue al cursor al pasar el ratón por encima. El footer todavía usa solo el texto estilizado — dime si quieres que lleve el mismo logomark ahí también (sin el efecto 3D, sería una versión estática).

## 2. Segundo camino de conversión de baja fricción

Ahora mismo todos los CTA de la web llevan al mismo sitio: el formulario de "Solicitar demo", que es de alta intención. No hay ninguna opción para el visitante que solo está mirando.

Para construir esto necesito que decidas **qué** ofrecer como puerta de entrada más ligera. Algunas opciones típicas:

- Un vídeo/grabación real de una llamada gestionada por el agente de IA (necesitaría el archivo o un enlace).
- Una guía descargable a cambio del email ("Cómo automatizar la atención telefónica de tu negocio") — necesitaría que redactemos ese contenido.
- Un chat de WhatsApp directo y visible tipo widget, sin formulario.

Dime cuál te interesa (o si prefieres otra) y lo construyo.

## 3. Fotografía o capturas reales del producto

Fuera del mockup del Hero (hecho en CSS/HTML), no hay ninguna imagen real de producto en la web — ni una captura del panel/dashboard real, ni fotos de equipo. El mockup actual es una ilustración de cómo se vería, no el producto en sí.

En cuanto tengas un panel real (aunque sea una versión interna en desarrollo), pásame una captura y sustituyo el mockup ilustrativo por la real, con el mismo tratamiento visual (marco, sombra, proporciones). Hasta entonces, el mockup ilustrativo es una solución válida — pero queda marcado como pendiente, no como decisión final.

## 4. Verificación en dispositivos reales

He revisado el responsive por código (breakpoints, min-heights, indicador de Servicios ya corregido) pero no he podido renderizar la web en un navegador real dentro de este entorno de trabajo. Antes de publicar, te recomiendo un pase rápido en:

- Chrome DevTools con los presets de iPhone SE, iPhone 14, iPad y un Android de gama media.
- Idealmente, un móvil físico tuyo, sobre todo en la sección de Servicios (el indicador deslizante) y el Hero (el mockup de producto) en el rango 768-1023px.

Si me dices qué ves roto (si es que ves algo), lo arreglo directamente.

## 5. Página legal (privacidad) — no estaba en la review, pero es necesaria

El formulario de contacto recoge nombre, teléfono, email y empresa. Al operar desde España, esto entra dentro del RGPD/LOPDGDD y legalmente necesitáis una política de privacidad enlazada desde el formulario (con al menos: qué datos se recogen, para qué, cuánto se conservan y cómo se puede pedir su borrado). No es un consejo de diseño, es un requisito legal — y no soy abogado, así que si quieres que redacte un borrador te lo dejo hecho, pero te recomiendo que lo revise alguien con conocimiento legal antes de publicarlo.

---

Nota: **no** es accionable hoy, y la review ya lo señalaba así: sustituir el mockup del Hero por producto real (punto 3) depende de que exista ese producto, no de trabajo de diseño pendiente.
