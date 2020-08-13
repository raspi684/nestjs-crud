import { Controller, Get, Param, Post, Put, Delete, Body, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // GET /users
    @Get()
    async index() {
        return this.usersService.findAll();
    }
    
    // GET /users/:id
    @Get(':id')
    async show(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
    
    // POST /users
    @Post()
    async store(@Body() data: CreateUserDto) {
        return this.usersService.store(data);
    }
    
    // PUT /users/:id
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateUserDto) {
        return this.usersService.update(id, data);
    }
    
    // DELETE /users/:id
    @Delete(':id')
    @HttpCode(204)
    async destroy(@Param('id') id: string) {
        return this.usersService.destroy(id);
    }

}
