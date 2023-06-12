import { PartialType } from '@nestjs/swagger';
import { CreatePdiActionDto } from './create-pdi-action.dto';

export class UpdatePdiActionDto extends PartialType(CreatePdiActionDto) {}
