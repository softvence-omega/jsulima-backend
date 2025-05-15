// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PlanService } from './plan.service';
// import { CreatePlanDto, UpdatePlanDto } from './create-plan.dto';


// @Controller('subscriptions')
// export class PlanController {
//   constructor(private readonly service: PlanService) {}

//   @Post()
//   create(@Body() dto: CreatePlanDto) {
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
//   update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
//     return this.service.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.service.remove(id);
//   }
// }




import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto, UpdatePlanDto } from './create-plan.dto';



@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.planService.create(dto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.planService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
