// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PromoCodeService } from './promo-code.service';
// import { CreatePromoCodeDto, UpdatePromoCodeDto } from './promo-code.dto';


// @Controller('promo-codes')
// export class PromoCodeController {
//   constructor(private readonly service: PromoCodeService) {}

//   @Post()
//   create(@Body() dto: CreatePromoCodeDto) {
//     return this.service.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdatePromoCodeDto) {
//     return this.service.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.service.remove(id);
//   }
// }



import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { CreatePromoCodeDto, UpdatePromoCodeDto } from './promo-code.dto';


@Controller('promo-codes')
export class PromoCodeController {
  constructor(private readonly service: PromoCodeService) {}

  @Post()
  create(@Body() dto: CreatePromoCodeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePromoCodeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('/validate/:code')
  validate(@Param('code') code: string) {
    return this.service.validatePromoCode(code);
  }
}
