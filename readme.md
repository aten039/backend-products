crear variable de entorno DBURL con la url para conectarse a la base de datos
Api rest
endpoint
get /api/products return products[]
get /api/products/:id return products
post /api/products return { data:{}}
put /api/products/:id return { data:{}}
delete /api/products/:id return { data:{}}
en caso de error return { errors: [\{msg:'string'}] | {msg:'string'}} array con errores o un solo error
posee verificación.


testing
ejecutar solo con una base de datos de prueba! npm test ya que se agrego el script posttest para vaciar la base de datos 