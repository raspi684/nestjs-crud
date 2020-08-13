import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    findAll() {
        return [];
    }

    findOne(id) {
        return {id};
    }

    store(data){
        return data;
    }

    update(id, data) {
        return {id, ...data};
    }

    destroy(id) {
        return;
    }
}
