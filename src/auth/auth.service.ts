import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private jwtService: JwtService
    ) {}

  async register(createAuthDto: CreateAuthDto) {
      try{
        const { password } = createAuthDto;
        const plainToHash = await hash(password, 10);
        createAuthDto = {
            ...createAuthDto,
            password: plainToHash
        }

        return await this.userModel.create(createAuthDto);
    }catch(err){
        if(err.code === 11000) {
            throw new HttpException('DUPLICATED_KEY', 422)
        }
        throw err;
    }
  }

  async login(loginUserDto: LoginDto): Promise<any> {
      const { email, password } = loginUserDto;
      
      const findUser = await this.userModel.findOne({email});

      console.log(findUser);
      if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);

      const checkPassword = await compare(password, findUser.password);
      if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

      const payload = {
          id: findUser._id,
          email: findUser.email
      }

      const token = this.jwtService.sign(payload);

      const data = {
          user: findUser,
          token,
      }

      return data;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
