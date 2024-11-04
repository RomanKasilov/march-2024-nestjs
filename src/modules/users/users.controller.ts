import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entities-id.type';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UsersService } from './services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: UserID) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: UserID, @Body() dto: UpdateUserReqDto) {
    return this.usersService.update(id, dto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: UserID) {
    return this.usersService.remove(id);
  }
}
