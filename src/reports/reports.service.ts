import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate({
    make, model, lng, lat, year, mileage
  }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng BETWEEN :lngMin AND :lngMax', { 
        lngMin: lng - 5,
        lngMax: lng + 5 
      })
      .andWhere('lat BETWEEN :latMin AND :latMax', { 
        latMin: lat - 5,
        latMax: lat + 5 
      })
      .andWhere('year BETWEEN :yearMin AND :yearMax', {
        yearMin: year - 3,
        yearMax: year + 3
      })
      .andWhere('approved = :approved', { approved: true })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) }});
    if (!report) throw new NotFoundException('report not found');

    report.approved = approved;
    return this.repo.save(report);
  }
}
