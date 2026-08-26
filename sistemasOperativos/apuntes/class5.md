# Arquitectura de Aplicaciones y Bases de Datos NoSQL

## 1. Arquitectura de Aplicación

- **Flujo de datos continuo:** Manejo e intercambio constante de información entre clientes y servidor.
- **Backend:** 
  - Se encarga de la comunicación directa y gestión con las bases de datos.
  - Almacena y ejecuta la lógica de autenticación y autorización.
- **Load Balancer (Balanceador de Carga):**
  - Redirige y distribuye el tráfico de peticiones entre múltiples instancias o servidores de la aplicación.
  - Optimizado para aplicaciones de alto uso para asegurar alta disponibilidad y prevenir cuellos de botella.
- **Data Warehouse:**
  - Almacena y organiza grandes volúmenes de datos consolidados y estructurados provenientes de distintas fuentes, optimizados para análisis y Business Intelligence (BI).
- **Caching Service (Servicio de Caché - ej. Redis):**
  - Guarda copias de datos de acceso frecuente en memoria para acelerar la velocidad de respuesta.
  - Funciona también como capa de respaldo o contingencia en caso de caídas o alta latencia de la base de datos principal.

---

## 2. SQL vs NoSQL

### Bases de Datos Relacionales (SQL)
- Estructura basada en **tablas**, filas y columnas.
- Utilizan claves primarias (**PK**) y claves foráneas (**FK**) para definir relaciones $1:1$, $1:M$ y $M:M$.
- **Relaciones Muchos a Muchos ($M:M$):** Generalmente requieren tablas intermedias (de unión), lo que puede volverse complejo y costoso en consultas de gran escala.

### Bases de Datos No Relacionales (NoSQL)
Diseñadas para almacenar datos no estructurados o semiestructurados, ofreciendo flexibilidad de esquema y escalabilidad horizontal.

- **Basadas en Documentos (MongoDB, DocumentDB):**
  - Guardan la información en formato **BSON** (*Binary JSON*).
  - Los archivos BSON se almacenan en el disco duro. Se guardan en formato binario para lograr un acceso rápido y reducir el espacio de almacenamiento en comparación con el texto plano.
- **Orientadas a Grafos (Neo4j):**
  - Diseñadas específicamente para modelar y consultar **relaciones complejas $M:M$**.
  - *Ejemplo:* Redes sociales o mapas de ciudades donde las personas tienen múltiples relaciones interconectadas con otras personas o lugares. En SQL, estas consultas requerirían múltiples `JOIN`s complejos y costosos.
- **Clave-Valor (Redis):**
  - Almacena datos mediante pares de `llave: valor` (similar a un diccionario).
  - Mantiene los datos directamente en la **memoria RAM** para ofrecer consultas de velocidad ultra rápida con volúmenes de datos pequeños.

---

## 3. MongoDB: Conceptos y Operaciones Básicas

- **Demonio (`mongod`):** Proceso o servicio que corre en segundo plano (similar a un servicio de Windows) encargado de gestionar el servicio de la base de datos.
- **Colección:** Equivalente a una tabla en bases de datos relacionales.
- **Documento:** Equivalente a una fila o registro en una tabla. Cada documento es una estructura en formato JSON/BSON y puede tener campos diferentes a otros documentos de la misma colección.

### Comandos y Operaciones Básicas (CRUD)

- `use <nombre_bd>`: Selecciona o crea la base de datos a utilizar.
- `db.createCollection("nombre_coleccion")`: Crea explícitamente una nueva colección.
- `db.<coleccion>.insertOne({ ... })`: Agrega un documento en formato JSON a la colección.

#### Ejemplo de sintaxis en consola de MongoDB:

```javascript
// 1. Seleccionar o crear la base de datos
use mi_base_datos;

// 2. Crear explícitamente una colección (tabla)
db.createCollection("usuarios");

// 3. Insertar un documento (fila) en formato JSON
db.usuarios.insertOne({
  nombre: "Carlos",
  edad: 20,
  carrera: "Ingeniería en Software",
  habilidades: ["Python", "SQL", "MongoDB"]
});

// 4. Consultar los documentos de la colección
db.usuarios.find();
```