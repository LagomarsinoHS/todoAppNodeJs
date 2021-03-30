# Intro
    Aplicación que permite crear notas y las almacena en una BD de Mongo

# Modulos/Dependencias utilizados
* express -> Marco de aplicacion web para el backend en nodejs
* express-handlebars -> Ayuda a crear ciertos eventos que son vistas html
* express-session -> guardar datos desde la memoria del servidor
* mongoose -> para manejar la bd de mongo
* connect-flash -> Permite enviar mensajes entre vistas (cuando hago un delete por ej: me mostrara un mensaje)
* bcryptjs -> Cifra información
* method-override -> enviar peticiones put, delete, etc desde la vista, puedo sobreescribirlas, por ejemplo un post que sea un delete
* passport -> permite autenticar al usuario
* passport-local

# Modulos para Desarrollo
* dotenv -> para utilizar variables de entorno
* nodemon -> para reiniciar el servidor automaticamente, es decir, tiene listeners activos
* handlebars 
* npm-check-updates -> para estar al tanto si hay actualizaciones