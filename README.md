<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Descripción

Desarrollador Junior en NestJS - Prueba de Habilidades (Facturación)
> Desarrollar una API con NestJS que gestionará un sistema de facturación. El objetivo principal es crear una plataforma que permita la creación, consulta, actualización y eliminación de terceros facturados, facturas, conceptos y detalles de factura.

## Clonacion del repositorio

Ejecute este comando en su terminal

```bash
$ git clone https://github.com/albertogonzalezm/Facturacion.git
```

## Instalar dependencias

Para instalar las dependencias, ejecute el siguiente comando en la raiz del proyecto
```bash
$ npm install
```

## Configurar TypeORM

Para configurar la base de datos, abra el archivo `database.provider.ts` en `src/database` y actualice los detalles de conexión según sea necesario.


## Ejecutar aplicación

Para que la aplicación funcione correctamente, es necesario crear la base de datos en MySQL con el nombre de `facturacion` antes de ejecutar la aplicación.

```bash
# development
$ npm run start

# development and watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Para ver los endpoints de la API, simplemente abra su navegador web y vaya a la siguiente dirección: http://localhost:3000/api/doc. Asegúrese de que la aplicación esté en ejecución antes de intentar acceder a la documentación.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
