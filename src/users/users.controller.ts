import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserCreateReqDto } from './dto/req/user-create.req.dto';
import { UserQueryListReqDto } from './dto/req/user-query-list.req.dto';
import { UserUpdateReqDto } from './dto/req/user-update.req.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  create(@Body() dto: UserCreateReqDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(@Query() query: UserQueryListReqDto) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UserUpdateReqDto) {
    return this.usersService.update(+id, dto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
