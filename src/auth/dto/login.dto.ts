import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
    
    @IsEmail()
    readonly email: string;
    
    @MinLength(8)
    @MaxLength(20)
    readonly password: string;
    
}