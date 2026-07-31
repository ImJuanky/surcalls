# Design review — SURCALLS
### Revisión interna de diseño de producto · nivel senior (15+ años SaaS/IA)

Metodología: no he juzgado capturas de pantalla. He auditado el código real (`styles.css`, cada componente, cada valor de color, padding y tipografía) y he calculado el contraste WCAG real de los tokens de color que usáis. Todo lo que sigue está atado a líneas de código concretas, no a impresiones.

Veredicto de arranque, para que no haya ambigüedad: esto **no** es una landing de plantilla — hay dirección de arte real y decisiones deliberadas sección a sección, cosa que el 90% de las landings de "agencia de IA" no tiene. Pero tampoco es una web que yo dejaría pasar en una review de Linear o Stripe tal cual está. Hay un problema de fondo que atraviesa toda la web y tres o cuatro bugs/lagunas concretas que hay que resolver antes de publicar.

---

## 1. El hallazgo más importante: tenéis un logo real y no lo estáis usando

**Qué está mal.** En `/public/favicon.png` existe un logotipo real — una marca en forma de flecha/diamante metálico con el wordmark "CALLS" — con calidad de diseño de marca de verdad. Pero: (a) en `index.html` el `<link rel="icon">` apunta a `favicon.ico`, un archivo que **no existe** en el proyecto (el real es `favicon.png`), así que el favicon probablemente no carga en la mayoría de navegadores; y (b) ese logo no aparece en ningún otro sitio — ni en el navbar, ni en el footer, ni en el hero. El navbar y el footer usan texto plano estilizado ("Sur**Calls**" en Space Grotesk), no el logo real.

**Por qué está mal.** Un favicon roto es lo primero que un visitante técnico nota al abrir una pestaña nueva — comunica descuido antes de que hayan leído una sola palabra. Y tener un activo de marca de calidad sin usar en el 95% de los puntos de contacto (navbar, footer, redes, favicon) significa que estáis construyendo reconocimiento de marca sobre texto genérico en vez de sobre vuestra propia identidad visual.

**Qué sensación genera.** Inconsistencia. Da la impresión de que hay dos equipos trabajando en paralelo sin comunicarse: uno hizo un logo, otro construyó la web y no se enteró.

**Cómo lo solucionaría un senior.** Corregir la referencia rota del favicon en una línea. Después, decisión de marca real: o bien integráis ese logomark metálico en el navbar (como icono junto al wordmark, a 28-32px) y generáis el set completo de favicons (16/32/180/512px, `apple-touch-icon`, manifest), o si ese logo ya no representa la dirección visual actual (el metálico/cromado choca un poco con el minimalismo oscuro+verde que habéis construido) lo descartáis conscientemente y diseñáis un logomark nuevo coherente con el sistema actual — pero no lo dejáis en el limbo.

**Ejemplos reales.** Linear, Vercel y Raycast tienen un logomark simple (una forma geométrica, no texto) que aparece idéntico en favicon, navbar, og:image y redes sociales — repetición es lo que construye reconocimiento.

**Impacto de arreglarlo.** Alto y barato. Es la corrección de mayor relación impacto/esfuerzo de toda esta review: un `href` mal escrito.

---

## 2. Ritmo vertical: seguís teniendo el problema que yo mismo detecté y solo lo resolví a medias

**Qué está mal.** Revisé el padding vertical de las 9 secciones de contenido principales. **7 de 9 usan exactamente `140px`** de padding superior/inferior: `what-we-do`, `services`, `ai-voice-agents`, `use-cases`, `benefits`, `testimonials`, `tech-stack`. `how-it-works` usa `140px/120px`. Solo el Hero y Contacto rompen el patrón.

**Por qué está mal.** En la revisión anterior señalé que "el ritmo vertical es monótono porque todas las secciones comparten el mismo padding" y cambié el sistema interno de cada sección (grids, tipografía, composición) — pero dejé el metrónomo de espaciado intacto. Es un error real mío: resolví la variedad de *contenido* pero no la de *cadencia*. El ojo humano detecta patrones de repetición de espaciado aunque el contenido cambie.

**Qué sensación genera.** Un scroll que se siente uniforme incluso cuando cada sección individualmente es interesante — como leer un libro donde cada capítulo tiene exactamente el mismo número de páginas independientemente de lo que cuente.

**Cómo lo solucionaría un senior.** Definir una escala de ritmo (p.ej. 96 / 120 / 160 / 200px) y asignarla según el peso narrativo de cada sección, no de forma uniforme: Hero y Contacto ya son extremos (aperture/cierre), pero en medio, secciones como "Casos de uso" (contenido denso, 6 filas) deberían respirar más (180-200px) que "Tech stack" (una cinta ligera, podría vivir en 96-110px). El objetivo es que el usuario sienta aceleración y desaceleración al bajar, no un tempo fijo.

**Ejemplos reales.** En la landing de Linear, el espaciado entre secciones varía deliberadamente entre ~80px y ~200px según si la sección es una transición rápida o un momento de detenerse a leer.

**Impacto de arreglarlo.** Medio-alto en percepción de calidad, coste de implementación bajo (son valores CSS, no rediseño estructural).

---

## 3. Tipografía: 8 de 9 secciones comparten literalmente el mismo H2

**Qué está mal.** El componente `app-section-title` (kicker + `h2` a `clamp(2rem,5vw,2.5rem)`≈32-40px/700 + descripción) se usa sin variación en Services, AI Voice Agents, How it works, Use cases, Benefits, Tech stack, Testimonials y Contact. Solo Hero (`--display-xl`, 51-112px) y "Qué hacemos" (`--display-lg`, 38-72px) tienen tipografía de sección propia.

**Por qué está mal.** Reutilizar un componente para consistencia es correcto — reutilizarlo *sin ninguna variación* en el 89% de las secciones no lo es. Es exactamente el mismo problema que el del punto 2 pero en tipografía: variedad de layout, cero variedad de voz tipográfica.

**Qué sensación genera.** Cada vez que aparece un título nuevo, el cerebro ya sabe qué tamaño y peso va a tener antes de leerlo. Eso mata la sorpresa — y la sorpresa controlada es lo que hace "premium" a Stripe o Apple.

**Cómo lo solucionaría un senior.** Dar a `SectionTitle` una prop `scale` (`sm` / `md` / `lg`) y usarla con criterio: "Casos de uso" o "Servicios" (secciones con más peso comercial) podrían llevar el título más grande; "Tech stack" o "Garantías" (secciones más ligeras) uno más pequeño. Coste: 20 minutos, cero riesgo.

**Ejemplos reales.** En Stripe.com, el tamaño de H2 varía notablemente entre la sección de producto principal y las secciones de soporte/ecosistema más abajo en la misma página.

**Impacto de arreglarlo.** Medio. No es visible de forma aislada, pero se nota en el scroll completo.

---

## 4. Contraste de color: hay un fallo real de WCAG, no una opinión

**Qué está mal.** Calculé la ratio de contraste real (fórmula WCAG de luminancia relativa) de `--color-text-tertiary` (`#5C6478`) sobre `--color-bg` (`#0A0E17`): **3.26:1**. El mínimo AA para texto normal es **4.5:1**. Este token se usa en: labels de formulario (`contact__field label`), `footer__nav-title`, `hero__stat-label`, `benefits__stat-label`, `testimonials__ticket-label`, `contact__intro-label`, timers y microcopy en el mockup del hero — más de 10 usos distintos en la web.

**Por qué está mal.** No es una preferencia estética, es un fallo objetivo de accesibilidad. Un usuario con baja visión o en una pantalla con brillo bajo (típico en móvil al sol) puede directamente no leer las etiquetas de los campos del formulario de contacto — la sección que existe para generar ingresos.

**Qué sensación genera.** Para la mayoría de usuarios, ninguna consciente — pero para un porcentaje real (baja visión, luz ambiental fuerte, pantallas mal calibradas), fricción o abandono silencioso justo en el formulario.

**Cómo lo solucionaría un senior.** Subir `--color-text-tertiary` de `#5C6478` a algo como `#7B8299` (ratio ≈4.6:1, pasa AA) para todo texto que transmita información necesaria (labels, timers, nav). Reservar el tono más apagado solo para elementos verdaderamente decorativos que ya tienen `aria-hidden="true"`.

**Ejemplos reales.** El sistema de diseño de Stripe define explícitamente niveles de texto "primary/secondary/disabled" con ratios mínimos documentados — nunca por debajo de AA salvo en texto marcado como disabled/decorativo.

**Impacto de arreglarlo.** Alto en riesgo legal/accesibilidad, bajo coste (cambiar un valor hexadecimal en `styles.css` corrige las 10+ instancias de golpe, gracias a que sí usasteis variables CSS correctamente).

---

## 5. Iconografía: el emoji es el mayor enemigo de la percepción premium que tenéis

**Qué está mal.** Contactos con Servicios, Casos de uso, Beneficios, Qué hacemos, Trust-bar, Tech stack y Garantías usan emoji nativo del sistema operativo (🍽️🏥🏠🔧🏨💼📞💬⚙️💻📲⭐🎙️✅📈💸🌙📊🎧🔓🎯...) como único sistema de iconografía de toda la web.

**Por qué está mal.** Dos problemas, uno estético y uno técnico. Estético: ningún producto que citáis como referencia (Linear, Stripe, Vercel, Raycast, Arc, ElevenLabs, Vapi) usa emoji como iconografía de producto — todos usan sets de iconos de trazo fino, monocromos, dibujados a medida o de una librería consistente (Phosphor, Lucide, iconos propios). Técnico: el emoji **no lo renderiza vuestra web, lo renderiza el sistema operativo del visitante**. El mismo 🎙️ se ve como un micro 3D con sombra en Windows, plano y minimalista en macOS, y con otro estilo distinto en Android — no tenéis ningún control sobre vuestra propia marca visual en ese punto.

**Qué sensación genera.** Es el patrón #1 que un diseñador senior identifica en dos segundos como "esto lo ha construido alguien sin presupuesto de diseño de icons" — exactamente lo contrario del posicionamiento de "agencia premium valorada en millones" que pedisteis desde el primer mensaje de este proyecto.

**Cómo lo solucionaría un senior.** Sustituir todos los emoji por un único set de iconos SVG de trazo (stroke 1.5-1.75px, esquinas redondeadas, mismo grosor en todos), ya sea dibujados a medida (ideal, ~20 iconos, encajaría en un par de horas de un diseñador) o de una librería coherente como Lucide o Phosphor tintados con vuestro verde de marca. Esto ya lo señalé en la review anterior y sigue sin resolverse — es la deuda de diseño más visible que arrastra el proyecto.

**Ejemplos reales.** ElevenLabs y Vapi usan iconos de línea propios en toda su iconografía de producto; ninguno de los dos usa un solo emoji en su marketing site.

**Impacto de arreglarlo.** Muy alto en percepción premium, coste medio (hay que producir o integrar un set de iconos, y sustituir ~25 usos en el código).

---

## 6. Cero fotografía o imaginería real de producto

**Qué está mal.** Fuera del mockup del Hero (construido íntegramente en CSS/HTML) no hay ni una sola imagen real en toda la web: ni captura de la interfaz real del producto, ni foto de equipo, ni nada que ancle la marca al mundo físico.

**Por qué está mal.** El mockup del Hero es una *aproximación* de cómo se vería el producto, no el producto. Empresas como Vapi o Retell AI enseñan capturas reales de su dashboard porque eso es lo que de verdad genera confianza — "esto existe y funciona", no "así nos imaginamos que se vería si existiera".

**Qué sensación genera.** Un usuario técnico que compara mentalmente con Vapi/Retell nota la ausencia. Genera la duda silenciosa: "¿esto es un producto real o una landing de validación de idea?"

**Cómo lo solucionaría un senior.** En cuanto exista un dashboard/panel real (aunque sea interno, en desarrollo), sustituir el mockup del Hero por una captura real recortada con el mismo tratamiento visual (mismo marco, misma sombra). Mientras tanto, es válido seguir con el mockup ilustrativo — pero yo lo marcaría explícitamente como deuda a resolver en cuanto haya producto, no como decisión final.

**Ejemplos reales.** La home de Vapi.ai muestra literalmente su consola de llamadas en tiempo real, no una ilustración de una.

**Impacto de arreglarlo.** Alto pero depende de tener producto real que enseñar — no accionable hoy, solo señalado.

---

## 7. Credibilidad: hay una contradicción real entre lo que decís y lo que podéis demostrar

**Qué está mal.** El trust-bar dice literalmente *"Sectores que ya automatizan su atención con SurCalls"*, listando 6 sectores como si ya tuvierais clientes activos en todos ellos. A la vez, la sección de Garantías fue diseñada explícitamente (con una nota mía en el propio código) para **evitar** inventar testimonios porque SURCALLS es una empresa nueva sin clientes confirmados todavía.

**Por qué está mal.** Es una inconsistencia real de honestidad publicitaria: en un sitio se es cuidadoso de no fingir prueba social, y a quince segundos de scroll se afirma tener clientes activos en 6 sectores distintos. Un visitante que lea ambas secciones (y los compradores B2B cuidadosos lo hacen) detecta la contradicción.

**Qué sensación genera.** Desconfianza — la misma que intentaba evitar la sección de Garantías, pero introducida por otra puerta.

**Cómo lo solucionaría un senior.** Cambiar el copy del trust-bar a una afirmación defendible hoy: *"Sectores en los que SurCalls puede automatizar tu atención"* o *"Diseñado para estos sectores"* — mantiene el mismo layout y la misma fuerza visual sin prometer algo no verificable.

**Ejemplos reales.** OpenAI, en sus páginas de casos de uso antes de tener grandes clientes públicos, siempre habló de "capacidades" y "casos de uso posibles", nunca de clientes activos no nombrados.

**Impacto de arreglarlo.** Alto en riesgo de marca (y legal, por publicidad engañosa en España), coste de implementación: cambiar una frase.

---

## 8. CTA y flujo de conversión: un único embudo para toda la web

**Qué está mal.** Casi todos los CTA de la web (Servicios, navbar, CTA final de cada sección) apuntan al mismo sitio: `#contact`, un formulario de alta intención ("Solicitar demo"). No existe ningún punto de conversión de baja fricción intermedio (descargar un caso de uso, ver una demo grabada, suscribirse a novedades).

**Por qué está mal.** No todo visitante llega listo para pedir una demo comercial. Un embudo de una sola puerta de entrada pierde a todo el tráfico que está en fase de investigación — que en B2B suele ser la mayoría en primera visita.

**Qué sensación genera.** Para el visitante que "solo está mirando": nada que hacer salvo irse, porque la única acción disponible es comprometerse a hablar con ventas.

**Cómo lo solucionaría un senior.** Añadir un segundo camino de conversión de bajo compromiso: p.ej. un vídeo/demo interactiva sin formulario, o capturar email a cambio de una guía ("Cómo automatizar la atención telefónica de tu negocio"). El botón "Ver una llamada en acción" del Hero ya apunta en esta dirección (ancla a la sección de Agentes IA) — es un buen instinto, pero se queda corto: hoy solo hace scroll, no muestra nada que no se vea igualmente bajando con el dedo.

**Ejemplos reales.** Linear ofrece "Log in" (bajo compromiso) junto a "Start building" (alto compromiso) en cada CTA visible — dos puertas, no una.

**Impacto de arreglarlo.** Alto en volumen de leads capturados, coste medio (requiere decidir y construir el segundo camino).

---

## 9. Navegación: funcional pero sin memoria de estado

**Qué está mal.** El navbar no indica en qué sección de la página está el usuario mientras hace scroll (sin scroll-spy); el menú móvil, al abrirse, no atrapa el foco de teclado ni se cierra con `Esc`, y no tiene `role="dialog"`.

**Por qué está mal.** Sin indicador de sección activa, el navbar es solo una lista de atajos, no una herramienta de orientación — en una página larga (12 secciones) eso importa. Y la falta de gestión de foco en el menú móvil es un fallo real de accesibilidad de teclado: un usuario que navega con `Tab` puede "escaparse" del menú hacia contenido que está detrás y visualmente oculto.

**Qué sensación genera.** Para el usuario medio, ligera desorientación en scroll largo. Para un usuario de teclado/lector de pantalla, el menú móvil puede resultar directamente confuso o inutilizable.

**Cómo lo solucionaría un senior.** Scroll-spy con `IntersectionObserver` sobre las secciones (mismo mecanismo que ya usáis para `appScrollReveal`, reutilizable) para subrayar el enlace activo. Para el menú móvil: `role="dialog"`, `aria-modal="true"`, atrapar el foco dentro mientras está abierto, cerrar con `Esc`.

**Ejemplos reales.** Cualquier documentación de Vercel o Stripe resalta la sección activa en la navegación lateral mientras haces scroll.

**Impacto de arreglarlo.** Medio en UX general, alto en accesibilidad real, coste bajo-medio.

---

## 10. Animaciones: coherentes pero monocordes

**Qué está mal.** Prácticamente toda animación de entrada de la web usa el mismo patrón: opacidad 0→1 + `translateY(28px)→0`, vía la directiva `appScrollReveal`, con la única variación siendo el retraso (`delay`).

**Por qué está mal.** Es consistente, que es bueno — pero cuando *toda* la web se mueve igual, el movimiento deja de comunicar nada específico de cada sección. Es el equivalente en animación al problema de tipografía del punto 3.

**Qué sensación genera.** Pulido pero predecible. Después de las primeras 3 secciones, el cerebro deja de registrar la animación como algo intencional y la trata como ruido de carga.

**Cómo lo solucionaría un senior.** Reservar 2-3 variaciones de movimiento para momentos concretos: el indicador deslizante de Servicios y el reveal en cascada de la transcripción del Hero ya son ejemplos correctos de esto (rompen el patrón porque tienen lógica propia) — habría que extender ese criterio a 1-2 secciones más en vez de que sea la excepción.

**Ejemplos reales.** Framer y Linear varían el tipo de easing y la dirección de entrada según el contenido: listas entran en cascada horizontal, tarjetas con escala, texto con blur-to-focus — no todo con el mismo `translateY`.

**Impacto de arreglarlo.** Bajo-medio, refinamiento más que corrección.

---

## 11. Mensaje y storytelling: correcto tras el rediseño del Hero, pero el resto de la web no continúa esa disciplina

**Qué está mal.** El Hero, tras el último rediseño, comunica el beneficio en menos de 3 segundos ("Nunca vuelvas a perder una llamada" + mockup con resultado de negocio visible). Pero bajando, "Qué hacemos" vuelve a un tono más descriptivo-técnico ("Convertimos procesos manuales en sistemas inteligentes") en vez de mantener el enfoque en beneficio del Hero.

**Por qué está mal.** El copywriting de conversión funciona mejor cuando el ángulo (beneficio, no característica) es consistente de arriba a abajo. Un salto de "nunca pierdas una llamada" a "convertimos procesos en sistemas inteligentes" es un cambio de registro — de hablarle al dueño del negocio a hablarle a alguien interesado en arquitectura de software.

**Qué sensación genera.** Pérdida leve de tensión narrativa justo después del mejor gancho de la página.

**Cómo lo solucionaría un senior.** Auditar el copy de cada H2 con la misma pregunta que ya aplicasteis al Hero: "¿esto habla de lo que hacemos o de lo que el cliente gana?". No hace falta reescribir todo, solo revisar los 2-3 títulos más descriptivos y llevarlos al mismo registro.

**Ejemplos reales.** Toda la página de Stripe Payments mantiene el mismo ángulo ("acepta pagos", "haz crecer tus ingresos") de arriba a abajo sin caer en lenguaje puramente técnico hasta la documentación.

**Impacto de arreglarlo.** Medio, coste muy bajo (es edición de copy, no de diseño).

---

## 12. Responsive (deducido del código, no probado en dispositivo)

**Qué está bien.** Los breakpoints están bien pensados y hay tratamientos específicos para móvil en casi todas las secciones (los chips flotantes del Hero se ocultan en `<1024px` en vez de amontonarse mal; el marquee de tech-stack sigue funcionando a cualquier ancho; el formulario colapsa a una columna).

**Qué está mal.** No hay evidencia en el código de que esto se haya probado en un dispositivo o emulador real — es "responsive por diseño de media queries", no "responsive verificado". Dos riesgos concretos que detecté por lectura de código: (1) `.hero__mockup` tiene `min-height: 560px` que solo se anula (`min-height: 0`) por debajo de 1024px — entre 768-1023px podría quedar con mucho espacio en blanco interno si el contenido no llena esa altura; (2) el layout interactivo de Servicios (indicador deslizante) depende de que las 6 filas tengan *exactamente* la misma altura — un salto de línea inesperado en un título largo en pantallas estrechas desalinearía el indicador con su fila.

**Sensación que genera (si ocurre).** Detalles rotos que solo ven los usuarios de un rango de pantalla concreto — invisibles en vuestro propio testeo si siempre revisáis en el mismo dispositivo.

**Cómo lo solucionaría un senior.** Pase de QA real en Chrome DevTools con los presets de iPhone SE, iPhone 14, iPad y un Android de gama media, más una pasada en un móvil físico antes de publicar.

**Impacto de arreglarlo.** Medio, coste bajo (es testeo, no rediseño) — pero es el único punto de esta review que no puedo verificar sin ver la web renderizada.

---

## Tabla de prioridades

| Prioridad | Problema | Impacto en conversión | Dificultad | Mejora esperada |
|---|---|---|---|---|
| **Alta** | Favicon roto (`.ico` inexistente) + logo real sin usar | Bajo directo, alto en credibilidad de marca | Muy baja | Corrección inmediata, coherencia de marca en todos los puntos de contacto |
| **Alta** | Contraste AA fallido en `--color-text-tertiary` (3.26:1) | Medio (afecta legibilidad del formulario) | Baja | Accesibilidad real + reduce riesgo legal |
| **Alta** | Iconografía 100% emoji | Medio (percepción premium) | Media | Salto directo en percepción de marca "seria" |
| **Alta** | Copy del trust-bar sobre-afirma clientes reales | Alto (confianza) | Muy baja | Elimina contradicción con la sección de Garantías |
| **Media** | Embudo de conversión de una sola puerta | Alto (volumen de leads) | Media-alta | Captura tráfico de baja intención que hoy se pierde |
| **Media** | Ritmo vertical uniforme (140px en 7/9 secciones) | Bajo-medio (percepción de calidad) | Baja | Scroll con más variación de tensión/pausa |
| **Media** | Escala tipográfica de H2 idéntica en 8/9 secciones | Bajo-medio | Baja | Jerarquía más rica sección a sección |
| **Media** | Sin scroll-spy / menú móvil sin gestión de foco | Bajo (UX), medio (accesibilidad) | Media | Orientación y navegación por teclado reales |
| **Baja** | Animaciones todas con el mismo patrón | Bajo | Baja | Refinamiento de percepción de detalle |
| **Baja** | Ausencia de imaginería/fotografía real | Alto a largo plazo, no accionable hoy | Alta (depende de tener producto) | Prueba real en vez de ilustrada |
| **Baja** | Responsive sin verificar en dispositivo real | Desconocido hasta probarlo | Baja (solo testeo) | Elimina riesgo de detalles rotos en producción |

---

## Si esto se presentara en una review de diseño en una startup top de Silicon Valley

**Qué críticas recibiría.** Las cuatro de prioridad Alta de la tabla, sin excepción — y especialmente el favicon roto, porque en una review real ese tipo de detalle ("¿nadie abrió esto en una pestaña nueva antes de enseñarlo?") genera más ruido del que su gravedad técnica merece, precisamente porque es fácil de evitar. La contradicción de credibilidad del trust-bar también se señalaría con dureza — en Silicon Valley, "no prometas lo que no puedes demostrar" no es una sugerencia de estilo, es una norma casi religiosa después de años de escándalos de startups que exageraron su tracción.

**Qué partes destacarían.** El sistema de dirección de arte por sección (Servicios como lista interactiva, Casos de uso como narrativa en filas en vez de grid, el formato "ticket" de Garantías) — eso es trabajo de verdad, no relleno, y se nota. El nuevo Hero con el mockup de producto y los resultados de negocio visibles ("Cita confirmada", "Cliente cualificado") también se destacaría como la decisión más acertada de toda la web: es exactamente el tipo de "mostrar, no contar" que un producto de IA necesita.

**Qué rehacerían completamente.** La iconografía, sin discusión — sería la única sección de "hay que rehacer esto entero, no iterar sobre ello". Todo lo demás es refinamiento, esto es sustitución completa.

**Puntuaciones sobre 10:**

- **Diseño:** 7/10 — dirección de arte real y ejecución sólida, penalizado por iconografía de emoji, ritmo/escala tipográfica repetitiva en la mayoría de secciones y contraste fallido.
- **Branding:** 5.5/10 — hay un logo real de calidad completamente sin usar, cero sistema de iconografía propio, paleta verde+oscuro que comparte lenguaje visual con decenas de startups de IA sin un elemento verdaderamente distintivo todavía.
- **UX:** 7/10 — navegación clara, formulario accesible y bien validado, componente de Servicios genuinamente bueno; penalizado por la falta de scroll-spy, gestión de foco en móvil y un embudo de conversión de una sola vía.
- **Percepción premium:** 6/10 — más cerca de "premium" que la inmensa mayoría de landings de agencia gracias al Hero nuevo y la dirección de arte por sección, pero el emoji y la ausencia de imaginería real bajan el techo alcanzable hasta que se resuelvan.
- **Conversión (CRO):** 5/10 — el formulario en sí está bien construido (validación, EmailJS conectado, estados de error/éxito), pero sin pricing, sin prueba social real, con una afirmación de clientes que no se sostiene, y sin ruta de conversión de baja fricción, el techo de conversión real está limitado independientemente de lo bien que se vea.

**La frase que resume esta review:** tenéis las piezas de una landing de primer nivel — el problema no es falta de talento de diseño, es que hay tres o cuatro decisiones sin terminar (el logo, el sistema de iconos, una frase de copy que se contradice con vuestra propia página) que están reteniendo una web de 7 en una de 8.5-9.
