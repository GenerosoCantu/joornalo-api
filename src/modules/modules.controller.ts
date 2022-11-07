import { Controller, Request, Get, Post, Put, Patch, Delete, Body, Param, Header, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModulesService } from './modules.service';
import { Module } from './interfaces/module.interface';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Module[]> {
    return this.modulesService.findAll();
  }

}
