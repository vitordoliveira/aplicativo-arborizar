// src/usuarios/entities/admin.entity.ts

import { ChildEntity } from 'typeorm';
import { Usuario } from './usuario.entity';

@ChildEntity('admin')
export class Admin extends Usuario {}
