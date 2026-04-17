# Blooming Web — UI/UX Brief para Peter

**Documento de trabajo · Abril 2026**

Este documento cubre el estado actual de la web de Blooming Group: lo que ya está construido, lo que funciona, lo que no alcanza el nivel top 1% que buscamos, y las prioridades de mejora. El objetivo es que sirva como base para que Peter defina referencias visuales y dirección de diseño que luego se implementan en código.

---

## 1. Contexto del proyecto

**Producto:** Web corporativa de Blooming Group, firma de consultoría estratégica y tecnológica para el mid-market europeo.

**Stack técnico:**

- Next.js 15, App Router, TypeScript estricto
- Tailwind CSS v4 + custom properties (design tokens)
- Framer Motion v12 para animaciones
- Sanity v3 CMS (sección Thinking/artículos)
- Deploy en Vercel

**Páginas existentes:** Home, Services, About, Diagnostic, Manifesto, Thinking (index + artículo), Contact (9 páginas en total)

**Rama activa:** `feature/visual-fx` — en preview de Vercel, aún no en producción.

---

## 2. Design tokens actuales

```
Fondo base:        #09090e  (navy casi negro)
Texto principal:   #f2eee6  (ivory cálido)
Texto secundario:  #6a6a72  (gris neutro)
Acento primario:   #4a7c6f  (teal apagado)
Acento secundario: #c8a96e  (oro cálido)

Tipografía:        DM Sans  (pesos 300–700)
                   clamp responsive: display hasta 6rem, H1 hasta 4rem
```

---

## 3. Lo que ya está construido (visual-fx branch)

Esto ya existe y funciona:

| Componente               | Descripción                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **CursorFollower**       | Logomark animado que sigue el cursor con spring physics. Solo en desktop (pointer:fine).                                             |
| **ParticleField**        | Canvas con ~120 partículas: logomarks mini, puntos, líneas, flores. Physics de repulsión con el mouse. Dos variantes: home y footer. |
| **BloomingMarkAnimated** | SVG con 4 anillos orbitales rotativos + sparks + halo pulsante. Usado en footer y cursor.                                            |
| **MagneticWrapper**      | Spring attraction en botones al acercar el cursor.                                                                                   |
| **Button**               | Sweep animation bottom-to-top en hover.                                                                                              |
| **Marquee**              | Scroll infinito horizontal con fade en bordes.                                                                                       |
| **Section reveals**      | useInView con fade + slide-up, stagger por elemento. Todos los sections del home.                                                    |
| **Hero**                 | Dot grid de fondo, radial glow verde, headline word-by-word con stagger, scroll indicator animado.                                   |

---

## 4. Lo que falta o no alcanza nivel top 1%

### 4.1 Transiciones entre páginas — **crítico**

**Estado actual:** Cero. Cada cambio de ruta es un corte abrupto. Haces click en "About" y la página aparece instantáneamente sin ninguna transición. En un sitio de este nivel esto se siente barato.

**Qué necesitamos:** Una transición de salida + entrada entre rutas. Las opciones más elegantes para este tipo de marca son:

- Fade suave (0.3–0.4s) entre páginas
- Wipe horizontal con el color base
- Un overlay que se expande y colapsa con el logomark

Esta es la mejora individual con mayor impacto percibido sobre la calidad del sitio.

---

### 4.2 Imágenes y textura visual — **crítico**

**Estado actual:** El sitio es 100% texto + vectores + CSS. No hay ninguna imagen fotográfica, ninguna textura, ningún elemento visual que no sea tipografía o el logomark.

**El problema:** Para una firma de consultoría top, la ausencia total de imagen puede funcionar si el sistema tipográfico y espacial es impecable (ver: Linear, Loom, algunos sitios de boutique). Pero el riesgo es que el sitio se lea como "inacabado" o "demo" antes que como "minimalismo intencional".

**Lo que necesita Peter decidir:**

- ¿Seguimos sin fotografía? Si es así, necesitamos más peso visual: gradientes más fuertes, texturas sutiles, tratamiento más dramático del espacio negativo.
- ¿Añadimos fotografía? Si es así: ¿qué tipo? (abstracta, arquitectural, operacional, sin personas). El tono de la marca pide nada corporativo, nada de stock visible.
- ¿Ilustración o elementos gráficos abstractos complementarios al logomark?

---

### 4.3 El hero section — **necesita más peso**

**Estado actual:** Headline con word-by-word animation, dot grid, radial glow verde sutil. El logomark animado NO aparece en el hero, solo en cursor y footer.

**El problema:** Para la sección más importante del sitio, el impacto visual es moderado. El dot grid y el glow son muy sutiles. El hero ocupa 100vh pero se siente vacío en la mitad inferior.

**Oportunidades:**

- El BloomingMarkAnimated debería tener protagonismo en el hero (grande, en el lado derecho, o como background element)
- El fondo necesita más profundidad: el radial glow podría ser más pronunciado, o añadir una segunda capa de movimiento
- El espacio vacío debajo del CTA (antes del scroll indicator) necesita intención visual

---

### 4.4 Experiencia de artículos (Thinking) — **funcional pero genérico**

**Estado actual:** Layout de artículo es texto plano con Portable Text. Funciona pero no tiene ningún elemento editorial diferenciador.

**Lo que falta:**

- **Reading progress indicator** — barra de progreso en el top mientras scrolleas el artículo
- **Drop cap en el primer párrafo** — detalle tipográfico editorial que eleva inmediatamente la percepción de calidad
- **Pull quotes** — citas extraídas del texto en formato visual destacado
- **Estimated read time progress** — "3 min remaining" dinámico
- **Sticky metadata lateral** — en desktop, el título/categoría/fecha podría flotar en una columna lateral mientras lees
- **Transición de entrada del artículo** — el header del artículo podría tener una animación de entrada más trabajada que el reveal genérico actual

El article index (Thinking) también es básico: los cards de artículos son bordered boxes sin mucha personalidad. El featured article en particular debería tener más peso visual.

---

### 4.5 Página Contact — **la más débil visualmente**

**Estado actual:** Hero con texto + BloomingMark estático + formulario. La sección "What happens next" es lista numerada simple. Sin animaciones de entrada. Sin tratamiento visual especial.

**El problema:** Contact es la página de conversión más importante. Cuando alguien llega aquí está considerando seriamente trabajar con Blooming. La experiencia visual debería reforzar la confianza y la calidad, no ser la página más austera del sitio.

**Oportunidades:**

- El BloomingMarkAnimated (con anillos y sparks) en lugar del static BloomingMark
- El formulario podría tener micro-animaciones en los campos (focus states más ricos)
- El "What happens next" podría ser una timeline visual en lugar de una lista
- Posibilidad de un fondo sutil diferenciado (el particle field u otro tratamiento)

---

### 4.6 Inconsistencia técnica en componentes de tipografía

**Estado actual:** Algunas páginas usan los componentes tipográficos (`<H1>`, `<H2>`, `<Body>`) y otras usan elementos HTML raw con inline styles `style={{ color: 'var(--color-ivory)' }}`.

**Páginas afectadas con inconsistencias:** `manifesto/page.tsx`, `contact/page.tsx` (mezcla de ambos), `thinking/[slug]/page.tsx`.

**El problema técnico:** Cuando se quiera cambiar la tipografía globalmente, habrá que editar en dos lugares. Más importante: los estilos inline con opacity no respetan el sistema de tokens.

**Para Peter:** Esto no es visible al usuario, pero antes de escalar más el sitio hay que estandarizar.

---

### 4.7 Ausencia de una intro / loading screen

**Estado actual:** El sitio carga directamente en el hero sin ninguna pantalla de entrada.

**Consideración:** No todos los sitios necesitan esto, y un mal splash screen es peor que ninguno. Pero para una firma con un logomark tan trabajado como el de Blooming, un intro de 1.2–1.5 segundos que muestre el mark animándose antes de revelar el hero podría ser muy poderoso.

**Decisión para Peter:** ¿Sí o no? Si sí, es importante que sea rápido, que respete `prefers-reduced-motion`, y que no bloquee indexing.

---

### 4.8 Experiencia móvil — animaciones sin equivalente touch

**Estado actual:** CursorFollower y MagneticWrapper están correctamente desactivados en móvil/touch. El ParticleField tiene una versión reducida. Sin embargo, la experiencia de scroll en móvil no tiene ningún elemento visual especial que lo compense.

**El problema:** En móvil el sitio se convierte en un sitio de texto bien formateado sin ninguna de las capas visuales que hacen el desktop especial. No está roto, pero está por debajo del nivel al que aspira.

**Oportunidades:**

- Animaciones de entrada más teatrales en móvil para compensar la ausencia del cursor/magnetic
- Tratamiento de fondo alternativo para móvil (sin canvas pesado)
- El hero en móvil necesita un elemento visual propio

---

### 4.9 Hover states en cards — demasiado sutiles

**Estado actual:** Los service cards, los article cards, y los navigation items tienen `hover:border-[--color-border-accent]` como único estado hover. El cambio es muy sutil.

**Oportunidades:**

- Reveal de un elemento interno en hover (una línea, un color, un icono que aparece)
- Ligero parallax vertical del contenido del card en hover
- Background gradient shift sutil en hover
- El arrow/chevron podría animarse en hover (slide hacia la derecha)

---

### 4.10 Open Graph / social sharing — sin imágenes custom

**Estado actual:** No hay OG images custom. Cuando se comparte un link de Blooming en Slack, LinkedIn, o WhatsApp, aparece sin preview de imagen o con el default de Next.js.

**Para una firma de consultoría que aspira a credibilidad B2B**, esto es un gap visible. Cada artículo compartido y cada página deberían tener una OG image generada con el branding correcto.

Next.js tiene soporte nativo para esto con `opengraph-image.tsx` en cada ruta — es implementable sin una herramienta externa.

---

### 4.11 Scroll-driven animations — ausentes

**Estado actual:** Las animaciones son triggered por useInView (cuando el elemento entra en el viewport, la animación se dispara una vez). No hay ninguna animación que sea continua y esté ligada al scroll position.

**Lo que podría añadirse:**

- Parallax en elementos del hero (el glow o el dot grid se mueven lentamente al scrollear)
- Elementos que crecen/encogen basándose en el scroll progress
- El BloomingMarkAnimated en el footer que se escala ligeramente al acercarse

Framer Motion tiene `useScroll` y `useTransform` para esto. No requiere librerías adicionales.

---

### 4.12 Página 404 — no existe

**Estado actual:** Si alguien llega a una URL que no existe, probablemente muestra la página de error default de Next.js o una 404 genérica.

**Para una firma de este nivel:** La 404 es una oportunidad de brand. Un buen 404 mantiene la experiencia, tiene gracia, y redirige.

---

## 5. Prioridad sugerida

Esta es mi lectura técnica de qué tiene más impacto relativo al esfuerzo:

| Prioridad | Ítem                                                 | Impacto percibido | Esfuerzo   |
| --------- | ---------------------------------------------------- | ----------------- | ---------- |
| 1         | Transiciones entre páginas                           | Muy alto          | Medio      |
| 2         | Hero — más peso visual / logomark prominente         | Alto              | Bajo-Medio |
| 3         | Estrategia de imágenes (decisión de dirección)       | Muy alto          | Alto       |
| 4         | Contact page — elevar experiencia visual             | Alto              | Medio      |
| 5         | Artículo — reading progress + drop cap + pull quotes | Alto              | Medio      |
| 6         | Hover states en cards                                | Medio             | Bajo       |
| 7         | OG images                                            | Medio             | Bajo       |
| 8         | Intro/loading screen                                 | Medio             | Medio      |
| 9         | Scroll-driven parallax                               | Medio             | Medio      |
| 10        | 404 page                                             | Bajo              | Bajo       |
| 11        | Mobile visual compensation                           | Alto              | Alto       |
| 12        | Estandarizar componentes tipográficos                | Técnico           | Bajo       |

---

## 6. Lo que necesito de Peter

Para poder implementar:

1. **Referencias visuales** por categoría (ver sección de brechas). Especialmente para:
   - Transiciones de página (ejemplos de tipo de transición)
   - Estrategia de imágenes (¿foto? ¿textura? ¿ilustración? ejemplos)
   - Hero revisado (qué peso visual, cómo aparece el logomark)
   - Tratamiento editorial de artículos

2. **Decisión sobre intro screen** (sí/no y referencia)

3. **Decisión sobre fotografía** (sí/no/qué tipo)

4. **Cualquier cambio a los tokens de color o tipografía** — si la dirección visual cambia, los tokens son la base y hay que actualizarlos antes de tocar los componentes.

---

## 7. Lo que está bien y no hay que tocar

Para claridad, esto es lo que funciona y no necesita re-trabajo:

- **El logomark y su sistema de animación** — BloomingMarkAnimated es excelente
- **La paleta de color** — sobria, coherente, funciona bien en dark mode
- **DM Sans** — la elección tipográfica es correcta para este posicionamiento
- **Los design tokens** — el sistema de custom properties está bien estructurado
- **El sistema de layout** (Container, grid, spacing) — limpio y consistente
- **Las section reveals actuales** — hacen el trabajo correctamente
- **El Button y su sweep animation** — un detalle de calidad
- **El CursorFollower** — diferenciador fuerte en desktop
- **La arquitectura de rutas y SEO** — estructuralmente sólida

---

_Documento preparado por Stratum para uso interno de Blooming Group._
_Próximo paso: Peter añade referencias visuales → implementación en feature branch._
