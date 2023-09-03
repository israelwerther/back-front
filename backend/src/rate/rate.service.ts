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
    private rateRepository: Repository<RateEntity>,
  ) { }

  async createRate(createRateDto: CreateRateDto) {
    const rates = new RateEntity();
    Object.assign(rates, createRateDto);
    const createdRates = await this.rateRepository.save(rates)
    return createdRates;
  }

  // Obtem a taxa mais recente cadastrada permitindo calcular os empréstimos sempre com a taxa atualizada
  async getLatestRate(): Promise<RateEntity> {
    const latestRate = await this.rateRepository.createQueryBuilder('rate').orderBy('rate.createdAt', 'DESC').getOne();
    if (!latestRate) {
      throw new Error("Nenhuma taxa para realizar o empréstimo.");
    }
    return latestRate;
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
