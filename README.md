# TrabajoTallerWeb
Este trabajo consta de una API ReST, realizada con MongoDB y NodeJS.

## El modelo del problema es el siguiente:
- Llevamos un registro de los clientes de una empresa y podemos hacer cotizaciones para cada cliente.
- Las cotizaciones comprenden el listado de materiales para realizar el trabajo y el margen de ganancia planteado para el listado de materiales.
- A su vez, cada material del listado, debe poseer:
  - **cantidad**: Número de unidades del material a usar.
  - **material**: El material en sí, el cual posee las siguientes propiedades:
    - **tipo**: Será el nombre o descripción corta del material.
    - **udm**: Unidad de medida del material, pueden ser _kilogramo_, _litro_, etc o cualquier otra presentación del material, como _bolsa x 50Kg_, o _balde x 20L_, etc.
    - **costo**: Costo unitario del material, relacionado a la unidad de medida.

Obviamente, una cotización real debería llevar más información, como tareas, fechas estimadas, costo de la mano de obra, etc. Pero este modelo está reducido a fin de comprender el funcionamiento de una API ReST y las operaciones CRUD en una base de datos no relacional
