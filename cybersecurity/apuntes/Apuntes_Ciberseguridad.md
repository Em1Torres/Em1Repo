# Conceptos Fundamentales de Ciberseguridad y Gestión de Riesgos

---

## 1. Gestión de Contraseñas (Password Security)

### 1.1 Tipos de Contraseñas según su Nivel de Seguridad

*   **Contraseña Débil (Weak Password):** Es fácil de adivinar o descifrar mediante ataques automatizados.
    *   *Razones principales de debilidad:*
        *   Longitud muy corta.
        *   Uso de palabras comunes (ej. `password`, `12345678`, `admin`, `welcome`).
        *   Inclusión de información personal (nombres, fechas de nacimiento, mascotas).
        *   Patrones simples o secuenciales en el teclado.
*   **Contraseña Intermedia (Intermediate Password):** Utiliza una combinación de mayúsculas, minúsculas, números y símbolos, pero sigue basada en un patrón predecible.
*   **Contraseña Fuerte (Strong Password):** Es larga, única y difícil de adivinar.
    *   *Ejemplo:* `River!Cloud7-Mango$Train`

### 1.2 Buenas Prácticas para Crear Contraseñas Fuertes
*   **Longitud:** Mínimo de 14 caracteres o más.
*   **Palabras no relacionadas:** Combinar varias palabras aleatorias y sin relación lógica entre sí (passphrases).
*   **Mezcla de caracteres:** Incluir letras mayúsculas, minúsculas, números y caracteres especiales/símbolos.
*   **Evitar datos personales:** No incluir información personal identificable.
*   **Evitar patrones comunes:** Evitar secuencias numéricas o de teclado.
*   **Unicidad:** Usar una contraseña única para cada cuenta o servicio.

---

## 2. Métodos y Ataques a Contraseñas

### 2.1 Adivinación vs. Descifrado (Guessing vs. Cracking)

| Concepto | Descripción |
| :--- | :--- |
| **Password Guessing** | Enfoque de prueba y error en tiempo real (*online*). El atacante intenta adivinar la contraseña intentando iniciar sesión directamente en la interfaz del sitio web o aplicación. |
| **Password Cracking** | Proceso sistemático u automatizado (*offline* u *online*) para descubrir una contraseña procesando hashes o datos almacenados. |

### 2.2 Métodos de Descifrado (Cracking Methods)
1.  **Ataque de Fuerza Bruta (Brute Force):** Prueba todas las combinaciones posibles de caracteres hasta encontrar la correcta. Es altamente efectivo contra contraseñas cortas.
2.  **Ataque de Diccionario (Dictionary Attack):** Prueba una lista predefinida de palabras comunes, diccionarios de idiomas y contraseñas habituales.
3.  **Relleno de Credenciales (Credential Stuffing):** Utiliza pares de usuarios y contraseñas filtrados de otros sitios web previamente vulnerados; aprovecha la reutilización de contraseñas por parte de los usuarios.
4.  **Descifrado de Hashes (Password Hash Cracking):** Las aplicaciones suelen almacenar contraseñas transformadas mediante algoritmos de hash (ej. `*#@a32fg`), no en texto plano (`12345678`). Si un atacante roba la base de datos de hashes, calcula los hashes de múltiples contraseñas candidatas y los compara con los robados.

### 2.3 Ataques Comunes a Contraseñas
*   **Predicciones Aleatorias (Random Guesses):** Intentos al azar sin metodología compleja.
*   **Phishing:** Correos electrónicos fraudulentos con malware o enlaces a páginas falsas de inicio de sesión idénticas a las legítimas para capturar credenciales.
*   **Ataques de Fuerza Bruta (Brute Force Attacks).**
*   **Password Spraying:** Probar una contraseña muy común (ej. `Autumn2024!`) contra un gran número de cuentas diferentes para evitar el bloqueo de cuentas.
*   **Ataques con Tablas Rainbow (Rainbow Table Attacks):** Uso de tablas precalculadas con pares de texto plano y sus respectivos hashes para acelerar la búsqueda de contraseñas.

---

## 3. Ciberseguridad, Privacidad y Cumplimiento

### 3.1 Definiciones Básicas
*   **Ciberseguridad:** Protección de los sistemas de información (hardware, software e infraestructura asociada), sus datos y los servicios que proveen frente a accesos no autorizados.
*   **Privacidad de la Información (Information Privacy):** Protección y gestión adecuada de los datos personales durante sus fases de recolección, uso, almacenamiento y distribución.
*   **Seguridad de la Información (Information Security):** Práctica orientada a proteger la información y los sistemas de información frente al acceso no autorizado, enfocándose en la **Triada CIA** mediante personas, procesos y tecnologías.
*   **Seguridad TI (IT Security):** Término global que abarca la seguridad cibernética, la seguridad física y la seguridad de la información.

### 3.2 Rol de la Privacidad de Datos
1.  **Protección de la Información Personal:** Resguarda la información confidencial frente al acceso no autorizado.
2.  **Control Individual:** Otorga a las personas el derecho y control sobre cómo se recopila y utiliza su información.
3.  **Prevención del Robo de Identidad y Fraude:** Protege datos sensibles que los criminales podrían explotar.
4.  **Mantenimiento de la Confianza y Reputación:** Fortalece la credibilidad e imagen de las organizaciones ante clientes y usuarios.
5.  **Cumplimiento Normativo:** Garantiza el acatamiento de leyes y regulaciones globales de protección de datos.

### 3.3 Cumplimiento Regulatorio (Regulatory Compliance)
Proceso mediante el cual una organización se adhiere a las leyes, regulaciones, políticas, procedimientos y estándares aplicables emitidos por entidades gubernamentales u organismos reguladores.

### 3.4 Impacto Económico y Activos de TI
*   **Seguridad Financiera:** Los ciberataques generan pérdidas multimillonarias (ej. en 2022 se registraron pérdidas masivas a nivel global).
*   **Datos Sensibles:** Las empresas e instituciones almacenan volúmenes masivos de datos confidenciales electrónicamente que requieren protección rigurosa.
*   **Activos de TI (IT Assets):** Elementos valiosos del sistema informático que deben ser protegidos:
    *   **Software:** DBMS, sistemas operativos, aplicaciones.
    *   **Hardware:** Servidores, routers, switches, endpoints.
    *   **Datos:** Información de clientes, ventas, personal, finanzas, código fuente, secretos industriales.
    *   **Otros:** Reputación pública, propiedad intelectual, credibilidad corporativa.
*   **Valor del Activo:** Se debe asignar un valor a cada activo según la perspectiva del propietario para determinar el nivel apropiado de protección.

---

## 4. Conceptos Clave de Amenazas y Vulnerabilidades

### 4.1 Vulnerabilidad (Vulnerabilities)
Debilidad en un sistema informático, procedimiento, diseño o implementación que un atacante puede explotar para causar daño, pérdida de datos o acceso no autorizado.
*   Funciona como la "puerta" que el atacante intentará abrir.
*   Permite a los atacantes ejecutar código, instalar malware, escalar privilegios a súperusuario/administrador y modificar o robar información.

### 4.2 Amenaza (Threats)
Conjunto de circunstancias o eventos con el potencial de causar pérdida o daño a un sistema.
*   *Ejemplo:*
    *   **Activo:** Información de pagos / tarjetas.
    *   **Amenaza:** Un cibercriminal robando los datos de las tarjetas de crédito.

### 4.3 La Triada CIA / Pilares de la Seguridad

```
           [ Confidencialidad ]
                  /                 /                  /     [ Integridad ] <------> [ Disponibilidad ]
```

*   **Confidencialidad (Confidentiality):** Garantiza que los activos e información sean accesibles únicamente por partes autorizadas.
*   **Integridad (Integrity):** Garantiza que la información y los activos solo puedan ser modificados por partes autorizadas.
*   **Disponibilidad (Availability):** Garantiza que los sistemas y activos estén disponibles y accesibles para los usuarios autorizados cuando los necesiten.

### 4.4 Ataque DDoS (Distributed Denial-of-Service)
Ataque donde se utilizan múltiples dispositivos comprometidos (botnets) para enviar un volumen masivo de tráfico hacia un servidor o sitio web.
*   *Objetivo:* Sobrecargar los recursos del servidor hasta dejarlo lento o inalcanzable.
*   *Flujo:* `Exceso de Tráfico` $ightarrow$ `Sobrecarga del Servidor` $ightarrow$ `Sitio Web No Disponible (Pérdida de Disponibilidad)`

---

## 5. El Triángulo de la Seguridad y Tipos de Controles

### 5.1 Componentes de la Seguridad
*   **Personas (People):** Empleados, usuarios, administradores y profesionales de seguridad.
*   **Procesos (Processes):** Políticas, procedimientos, normas y mejores prácticas que definen cómo se gestiona la seguridad.
*   **Tecnología (Technology):** Hardware, software, redes, firewalls, cifrado, antivirus y herramientas de seguridad.

### 5.2 Tipos de Respuesta/Acción de Control
Para reducir el riesgo (desactivar la amenaza o cerrar la vulnerabilidad) se aplican:
1.  **Prevención (Prevention):** Bloquear el ataque o cerrar la vulnerabilidad antes de que ocurra.
2.  **Disuasión (Deterrence):** Dificultar o encarecer el ataque para desalentar al atacante.
3.  **Desviación (Deflection):** Hacer que otros objetivos resulten más atractivos para el atacante.
4.  **Mitigación (Mitigation):** Reducir el impacto o los daños provocados por un ataque exitoso.
5.  **Detección (Detection):** Identificar la presencia del ataque en tiempo real o posterior a su ejecución.
6.  **Recuperación (Recovery):** Restablecer la operación de los sistemas y datos tras un incidente.

### 5.3 Ejemplos de Mecanismos de Control
*   Campañas de concienciación (Awareness Campaigns)
*   Respaldos de información (Backups)
*   Cámaras de seguridad física
*   Software Antimalware
*   Registros de auditoría / Logs del Sistema Operativo
*   Seguro contra incendios
*   Políticas de contraseñas robustas

---

## 6. Principios de Ciberseguridad

1.  **Defensa en Profundidad (Defense in Depth - DiD):** Implementación de múltiples capas de controles de seguridad basadas en el principio de redundancia (similar a un castillo con murallas sucesivas).
2.  **Principio del Menor Privilegio (Principle of Least Privilege):** Restringe los accesos de usuarios, procesos y sistemas al nivel mínimo estrictamente necesario para cumplir sus funciones.
3.  **Separación de Funciones (Separation of Duties):** Divide la autoridad o tareas críticas entre varias personas para evitar abusos de poder o fraudes.
    *   *Ejemplo (Compra de equipo):*
        *   Empleado 1: Envía la solicitud.
        *   Empleado 2: Aprueba el presupuesto.
        *   Empleado 3: Realiza el pago.
        *   Empleado 4: Recibe el equipo informático.
4.  **Seguridad por Diseño (Security by Design):** Integración de requisitos y controles de seguridad desde la fase inicial de concepción del desarrollo de software o arquitectura de sistemas.
5.  **Mantenerlo Simple (Keep It Simple / KISS):** Los sistemas complejos son difíciles de auditar, mantener y gestionar, lo cual incrementa el riesgo de vulnerabilidades y frustración del usuario.

---

## 7. Aplicación Práctica de la Triada CIA

### 7.1 Confidencialidad
*   **Control de Acceso:**
    *   *Autenticación:* ¿Quién eres? (Identidad).
    *   *Autorización:* ¿Tienes permiso para realizar esta acción?
*   **Cifrado (Encryption):** Transformación de datos legibles a formato ininteligible para partes no autorizadas.

### 7.2 Integridad
*   **Firma Digital (Digital Signature):** Garantiza autenticidad y no repudio.
*   **Código de Autenticación de Mensajes (MAC):** Verifica que el mensaje no haya sido alterado durante la transmisión.

### 7.3 Disponibilidad
*   **Web Application Firewall (WAF):** Bloquea direcciones IP maliciosas y patrones de tráfico anómalos.
*   **Rate Limiting:** Limita la cantidad de peticiones permitidas por usuario en un intervalo de tiempo.
*   **Balanceo de Carga (Load Balancing):** Distribuye el tráfico entrante entre múltiples servidores.
*   **Redundancia:** Servidores replicados, data centers secundarios y backups en la nube.
*   **Monitoreo de Tráfico:** Detección de picos inusuales de tráfico.

---

## 8. Firewalls

Un **Firewall** es un sistema de seguridad de red que monitorea y filtra el tráfico entrante y saliente basándose en reglas predefinidas. Funciona como un guardia de seguridad.

### Flujo de Inspección del Firewall:
1.  **Paso 1:** El tráfico de red llega al firewall.
2.  **Paso 2:** El firewall examina los encabezados y datos del paquete:
    *   IP de Origen (Source IP)
    *   IP de Destino (Destination IP)
    *   Número de Puerto
    *   Protocolo (TCP, UDP, ICMP)
    *   Aplicación / Tipo de tráfico
3.  **Paso 3:** Compara el paquete con la tabla de reglas de seguridad y toma una decisión (`ALLOW` / `DENY`).

#### Ejemplo de Regla de Firewall para Servidor Web:
*   HTTPS (Puerto 443) $ightarrow$ **ACEPTADO (Accepted)**
*   HTTP (Puerto 80) $ightarrow$ **ACEPTADO (Accepted)**
*   Admin SSH (Puerto 22 desde IP Autorizada) $ightarrow$ **ACEPTADO (Accepted)**
*   Puerto Desconocido / No Reglado $ightarrow$ **DENEGADO (Denied)**

---

## 9. Análisis y Evaluación de Riesgos (Risk Management)

### 9.1 Definición y Fórmula del Riesgo
El riesgo es la expectativa de pérdida o daño derivada de la probabilidad de que una amenaza explote una vulnerabilidad sobre un activo.

$$	ext{Riesgo} = 	ext{Amenaza} 	imes 	ext{Vulnerabilidad} 	imes 	ext{Consecuencia (Impacto)}$$

$$	ext{Riesgo} = 	ext{Probabilidad de Ocurrencia (Likelihood)} 	imes 	ext{Impacto}$$

#### Ejemplo:
*   **Vulnerabilidad:** Contraseña débil.
*   **Amenaza:** Ataque a contraseñas.
*   **Probabilidad (Likelihood):** Alta.
*   **Impacto:** Alto.
*   **Riesgo Estimado:** **ALTO**.

### 9.2 Pasos para el Análisis de Riesgos
1.  **Identificar Activos:** Determinar qué elementos deben protegerse.
2.  **Determinar Vulnerabilidades y Amenazas:** Evaluar las debilidades y las amenazas potenciales que podrían explotarlas.
3.  **Estimar Probabilidad e Impacto:** Determinar la frecuencia potencial y la severidad del impacto.
4.  **Estimar y Evaluar el Nivel de Riesgo:** Combinar la probabilidad y el impacto para clasificar el riesgo.
5.  **Revisar y Aplicar Controles:** Seleccionar e implementar los controles de seguridad necesarios.

### 9.3 Impacto del Riesgo (Risk Impact)
Efecto negativo resultante de la materialización de un riesgo:
*   Compromiso de la seguridad / confidencialidad.
*   Pérdida de tiempo operacional.
*   Pérdida financiera.
*   Disminución de la calidad de los productos o servicios.
*   Daños a la reputación de la organización.
*   Penalizaciones legales y regulatorias.

### 9.4 Métodos de Evaluación de Riesgos (Risk Assessment)

| Método | Descripción |
| :--- | :--- |
| **Cuantitativo (Quantitative)** | Asigna valores numéricos precisos (financieros o probabilísticos). Rango de probabilidad de $0$ a $1$. El impacto se mide en moneda, días de inactividad, etc. |
| **Cualitativo (Qualitative)** | Utiliza categorías descriptivas (Alto, Medio, Bajo). Es más rápido y subjetivo, pero no refleja costos monetarios exactos. |

### 9.5 Fórmulas de Cálculo Cuantitativo
*   **Single Loss Expectancy (SLE):** Expectativa de pérdida única.
    $$	ext{SLE} = 	ext{Valor del Activo (AV)} 	imes 	ext{Factor de Exposición (EF)}$$
    *(Donde EF es el porcentaje del activo destruido o afectado).*
*   **Annual Loss Expectancy (ALE):** Expectativa de pérdida anualizada.
    $$	ext{ALE} = 	ext{SLE} 	imes 	ext{Tasa Anual de Ocurrencia (ARO)}$$

### 9.6 Probabilidad del Riesgo (Risk Likelihood)
*   Se mide en un rango de $0$ (imposible) a $1$ (certeza).
*   Cuando la probabilidad alcanza el valor $1$, deja de ser un riesgo teórico y se convierte en un **incidente/problema activo**.
