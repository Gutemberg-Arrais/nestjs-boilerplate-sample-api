import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail({}, { message: 'Esse Email não é válido.' })
  @IsNotEmpty({ message: 'Email é obrigatório(a).' })
  email: string;

  @IsNotEmpty({ message: 'Nome é obrigatório(a).' })
  name: string;

  @IsNotEmpty({ message: 'Idade é obrigatório(a).' })
  @IsNumber({}, { message: 'Idade deve ser um número.' })
  age: number;
}
