import { PartialType } from '@nestjs/mapped-types';
import { CreateMifielDto } from './create-mifiel.dto';

export class UpdateMifielDto extends PartialType(CreateMifielDto) {}
