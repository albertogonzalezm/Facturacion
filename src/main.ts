import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.ALL }],
  });
  const config = new DocumentBuilder()
    .setTitle(
      'Desarrollador Junior en NestJS - Prueba de Habilidades (Facturación)',
    )
    .setDescription(
      'Desarrollar una API con NestJS que gestionará un sistema de facturación. El objetivo principal es crear una plataforma que permita la creación, consulta, actualización y eliminación de terceros facturados, facturas, conceptos y detalles de factura.',
    )
    .setVersion('1.0')
    .addTag('Tercero Facturado')
    .addTag('Factura')
    .addTag('Concepto')
    .addTag('Detalles De Factura')
    .addTag('Factura')
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
