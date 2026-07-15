import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  identifier: string; // can be email or phone

  @IsNotEmpty()
  @IsString()
  password: string;
}
