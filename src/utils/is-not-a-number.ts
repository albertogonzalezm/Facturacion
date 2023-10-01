import { BadRequestException } from '@nestjs/common';

export function isNotANumber(id: string): void {
  if (isNaN(+id))
    throw new BadRequestException('El id debe ser un numero entero');
}
