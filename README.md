# Parcial 1: API REST

## 1. Descripción del Problema

Se solicita diseñar e implementar una **API REST** para un sistema centralizado de gestión y seguimiento de tareas. La plataforma maneja usuarios con diferentes niveles de responsabilidad y un flujo estricto de asignación y resolución de tareas según el grupo al que pertenecen.

## 2. Dominio y Modelo de Datos

### Entidad `usuarios`

Representa a las personas registradas en la plataforma:

- **`id_usuario`**: Identificador único del usuario.
- **`username`**: Nombre de usuario único utilizado para iniciar sesión.
- **`nombres`** y **`apellidos`**: Datos identificatorios.
- **`fecha_nacimiento`**: Fecha de nacimiento del usuario.
- **`nombre_completo`**: Campo generado automáticamente mediante la concatenación de nombres y apellidos.
- **`roles`**: Arreglo de roles asociados al usuario. Puede contener uno o más de los siguientes valores: `'user'`, `'admin'`, `'superadmin'`. Nunca puede estar vacío.
- **`activo`**: Indicador booleano que define si el usuario se encuentra habilitado en el sistema.

> **Seguridad:** Las contraseñas no deben guardarse en la tabla de usuarios. Deben residir en una tabla separada (`credenciales`) utilizando un mecanismo de hashing seguro (`pgcrypto`).

### Entidad `tareas`

Representa las unidades de trabajo o pendientes del sistema:

- **`id_tarea`**: Identificador único de la tarea.
- **`id_creador`**: Usuario autor que dio de alta la tarea.
- **`grupo`**: Grupo destinatario para resolver la tarea (`'user'`, `'admin'` o `'superadmin'`).
- **`titulo`**: Título descriptivo.
- **`descripcion`**: Detalle ampliado de la tarea.
- **`prioridad`**: Escala de prioridad con los valores exactos: `'0:baja'`, `'1:media'`, `'2:alta'`.
- **`creada`**: Marca de tiempo (`TIMESTAMPTZ`) de creación de la tarea.
- **`terminada`**: Marca de tiempo (`TIMESTAMPTZ`) en que la tarea se da por completada (`NULL` mientras permanezca abierta).
- **`estado`**: Campo generado automáticamente (`'Cerrada'` si `terminada` posee un valor, o `'Abierta'` en caso contrario).

## 3. Reglas de Negocio y Autorización

La API debe hacer cumplir de forma estricta las siguientes reglas de permiso e identidad:

1. **Consulta de Tareas:** Cualquier usuario que se encuentre autenticado puede visualizar la lista global de tareas.
2. **Creación de Tareas:** Únicamente los usuarios que posean el rol `admin` o `superadmin` tienen permitido crear tareas. El id_creador debe ser el usuario autenticado.
3. **Edición General:** Solamente el **creador original** de la tarea o un usuario con rol **`superadmin`** pueden modificar el `titulo`, la `descripcion`, el `grupo` asignado o la `prioridad`.
4. **Finalización / Resolución:** Un usuario únicamente puede dar por **finalizada/cerrada** una tarea si su perfil cuenta con el **grupo específico al que está dirigida la tarea**. El campo estado se calcula automáticamente en la base de datos en base a la fecha de **terminada**
5. **Eliminación:** Exclusivamente el **creador original** (y autenticado) de la tarea tiene permisos para borrarla. Ni siquiera un rol `admin` o `superadmin` puede eliminar una tarea si no es de su autoría.

## 4. Requerimientos Técnicos e Implementación

- **Rutas y Métodos HTTP:** Deberá definir la estructura de URIs, verbos HTTP y códigos de estado (`200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`) que mejor se adecúen a los principios REST y a las acciones requeridas por el dominio (autenticación, consulta, creación, actualización parcial/total, cierre y eliminación).
- **Tipado e Interfaces:** La API debe para todas las rutas realizar la validación de esquemas que correspondan según lo visto en clase.
- **Persistencia:** La interacción con la base de datos PostgreSQL debe modularizarse mediante el patrón **Repository**.
- **Manejo de Errores:** Se debe contar con una gestión centralizada de excepciones para transformar los fallos de base de datos y validaciones en respuestas JSON claras para el cliente.

## 5. Criterios de Evaluación

- **Modelado REST:** Elección apropiada de recursos, sustantivos, verbos HTTP y códigos de estado.
- **Seguridad y Autorización:** Correcta verificación de los permisos según la matriz de roles y la autoría de cada recurso.
- **Arquitectura y Limpieza de Código:** Separación adecuada de capas (rutas, esquemas, repositorios y utilidades de base de datos).
- **Robustez:** Correcto manejo de casos de borde (recursos no encontrados, accesos no autorizados y violaciones de restricciones en base de datos).
