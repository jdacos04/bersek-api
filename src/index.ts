 import app from './app';

 app.listen(app.get('port'));
 console.log('el servidor esta en el puerto',app.get('port'));