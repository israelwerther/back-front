import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from './entities/rate.entity';

@Injectable()
export class RateService {

  constructor(
    @InjectRepository(RateEntity)
    private ratesRepository: Repository<RateEntity>,
  ) { }

  async createRate(createRateDto: CreateRateDto) {
    const rates = new RateEntity();
    Object.assign(rates, createRateDto);
    const createdRates = await this.ratesRepository.save(rates)
    return createdRates;
  }

  findAll() {
    return `This action returns all rate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return `This action updates a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}
