# Smart-Box 4.0 — Plataforma Educativa Técnico-Profesional

Plataforma web estática (Single Page Application) diseñada para estudiantes de **2° Medio (15-16 años)** y docentes de enseñanza media técnico-profesional, enfocada en los fundamentos de **Industria 4.0** aplicados al proyecto transversal **"Smart-Box: Contenedor Inteligente de Transporte Controlado"**.

Integra de forma transversal 4 especialidades:
- **Química Industrial**
- **Elaboración Industrial de Alimentos**
- **Gastronomía**
- **Muebles y Terminaciones en Madera**

---

## Características Principales

- **100% Client-Side y Estática:** Funciona directamente en el navegador sin bases de datos externas ni APIs de pago.
- **Modo Docente / Academia Interactiva:** Tarjetas expandibles con modo proyector y demostraciones interactivas para explicar **PCC**, **Sensores**, **Controladores (ESP32/PLC)**, **Actuadores** y **Lazo Abierto vs. Lazo Cerrado**.
- **Simulador de Ruta Extrema:** Simulación física en tiempo real con sliders de clima exterior, escenarios rápidos (*Ruta Desierto Caluroso*, *Selva Húmeda*, *Falla de Sellado*), configuración de PCC, selector por especialidad y visualización animada del flujo de datos.
- **Roles por Especialidad:** Misión específica, PCC vigilados, hardware clave y checklist práctico con guardado automático en `localStorage`.
- **Desafío Ingeniero 4.0:** Mini-quiz gamificado de 5 preguntas situacionales con medalla descargable en PNG.

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado) y `npm`.

---

## Instalación y Desarrollo Local

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Genera la compilación estática de producción (carpeta `dist/`):
   ```bash
   npm run build
   ```

4. (Opcional) Previsualiza la compilación de producción localmente:
   ```bash
   npm run preview
   ```

---

## Despliegue Gratuito en GitHub Pages

El archivo `vite.config.js` ya está configurado con `base: './'`, lo que garantiza que todos los archivos JS, CSS y rutas funcionen correctamente sin importar el nombre de tu repositorio.

### Opción A: Despliegue usando la carpeta `/docs` (Sin ramas extra)

1. Ejecuta la compilación:
   ```bash
   npm run build
   ```
2. Renombra o copia el contenido de `dist/` dentro de una carpeta llamada `docs/` en la raíz del proyecto:
   - En Windows (PowerShell):
     ```powershell
     Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
     Copy-Item -Recurse dist docs
     ```
   - En Linux/macOS:
     ```bash
     rm -rf docs && cp -r dist docs
     ```
3. Sube los cambios a tu repositorio en GitHub (`git add .`, `git commit -m "Deploy Smart-Box"`, `git push`).
4. En GitHub, ve a **Settings → Pages**:
   - En **Source**, elige **Deploy from a branch**.
   - En **Branch**, selecciona `main` y la carpeta `/docs`, luego haz clic en **Save**.

### Opción B: Despliegue usando la rama `gh-pages`

1. Instala `gh-pages` como dependencia de desarrollo (opcional):
   ```bash
   npm install -D gh-pages
   ```
2. Publica la carpeta `dist/` en la rama `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```
3. En GitHub, ve a **Settings → Pages**, selecciona **Deploy from a branch** → rama `gh-pages` → carpeta `/ (root)` y guarda.

---

## Estructura del Proyecto

```text
plataforma/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js          # Configurado con base: './' para GitHub Pages
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── platformData.js # Datos pedagógicos, especialidades y quiz
    └── components/
        ├── Navbar.jsx
        ├── HeroSection.jsx
        ├── AcademySection.jsx
        ├── SimulatorSection.jsx
        ├── SpecialtiesSection.jsx
        ├── QuizSection.jsx
        └── Footer.jsx
```

