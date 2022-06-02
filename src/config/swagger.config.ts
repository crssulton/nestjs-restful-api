import {
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Books API')
  .setDescription('Documentation books API')
  .setVersion('1.2')
  .addBearerAuth()
  .build();

export const configCustomSwagger: SwaggerCustomOptions = {
  swaggerOptions: { docExpansion: 'none' },
};
