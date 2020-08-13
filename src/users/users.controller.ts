import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    private readonly usersService = new UsersService();
    
    // GET /users
    @Get()
    async index() {
        return this.usersService.findAll();
    }
    
    // GET /users/:id
    @Get(':id')
    async show(@Param('id') id) {
        return this.usersService.findOne(id);
    }
    
    // POST /users
    @Post()
    async store(@Body() data: CreateUserDto) {
        return this.usersService.store(data);
    }
    
    // PUT /users/:id
    @Put(':id')
    async update(@Param('id') id, @Body() data) {
        return this.usersService.update(id, data);
    }
    
    // DELETE /users/:id
    @Delete(':id')
    async destroy(@Param('id') id) {
        return this.usersService.destroy(id);
    }

}
