import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Crop } from './crops/entities/crop.entity';
import { Farm } from './farms/entities/farm.entity';
import { Listing, ListingStatus } from './marketplace/entities/listing.entity';
import { AdvisoryRequest } from './advisory/entities/advisory-request.entity';
import { Role, RequestStatus } from '@kilimosmart/shared-types';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource: DataSource = app.get(getDataSourceToken());

  console.log('🌱 Starting Database Seeding...');

  // 1. Clear existing data to avoid conflicts
  console.log('Clearing existing data...');
  await dataSource.query(`TRUNCATE TABLE listings CASCADE;`);
  await dataSource.query(`TRUNCATE TABLE recommendations CASCADE;`);
  await dataSource.query(`TRUNCATE TABLE weather_records CASCADE;`);
  await dataSource.query(`TRUNCATE TABLE farms CASCADE;`);
  await dataSource.query(`TRUNCATE TABLE crops CASCADE;`);
  await dataSource.query(`TRUNCATE TABLE users CASCADE;`);

  // 2. Seed Users
  console.log('Seeding users...');
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const userRepository = dataSource.getRepository(User);
  const farmer = await userRepository.save({
    email: 'farmer@example.com',
    phone: '+255700000001',
    passwordHash,
    role: Role.FARMER,
    name: 'Joseph Mkulima',
  });

  const buyer = await userRepository.save({
    email: 'buyer@example.com',
    phone: '+255700000002',
    passwordHash,
    role: Role.BUYER,
    name: 'Bakhresa Group',
  });

  const officer = await userRepository.save({
    email: 'officer@example.com',
    phone: '+255700000003',
    passwordHash,
    role: Role.OFFICER,
    name: 'Officer Juma',
  });

  const admin = await userRepository.save({
    email: 'admin@example.com',
    phone: '+255700000004',
    passwordHash,
    role: Role.ADMIN,
    name: 'Admin System',
  });

  // 3. Seed Crops (FAO mock data)
  console.log('Seeding crops...');
  const cropRepository = dataSource.getRepository(Crop);
  const crops = await cropRepository.save([
    {
      name: 'Mahindi',
      faoCropCode: 'C001',
      temperatureRangeMin: 18,
      temperatureRangeMax: 32,
      rainfallRangeMin: 500,
      rainfallRangeMax: 1200,
      marketRank: 1,
    },
    {
      name: 'Alizeti',
      faoCropCode: 'C002',
      temperatureRangeMin: 20,
      temperatureRangeMax: 35,
      rainfallRangeMin: 400,
      rainfallRangeMax: 800,
      marketRank: 2,
    },
    {
      name: 'Maharagwe',
      faoCropCode: 'C003',
      temperatureRangeMin: 15,
      temperatureRangeMax: 27,
      rainfallRangeMin: 300,
      rainfallRangeMax: 900,
      marketRank: 3,
    },
    {
      name: 'Sesame',
      faoCropCode: 'C004',
      temperatureRangeMin: 25,
      temperatureRangeMax: 35,
      rainfallRangeMin: 300,
      rainfallRangeMax: 600,
      marketRank: 4,
    }
  ]);

  // 4. Seed Farms
  console.log('Seeding farms...');
  const farmRepository = dataSource.getRepository(Farm);
  const farm1 = await farmRepository.save({
    farmerId: farmer.id,
    name: 'Kitalu A - Dodoma Central',
    latitude: -6.173,
    longitude: 35.738,
    sizeHectares: 2.5,
    soilNotes: 'Loamy soil, good drainage',
  });

  const farm2 = await farmRepository.save({
    farmerId: farmer.id,
    name: 'Kitalu B - Kongwa',
    latitude: -6.2,
    longitude: 36.416,
    sizeHectares: 1.0,
    soilNotes: 'Sandy loam, requires frequent watering',
  });

  // 5. Seed Marketplace Listings
  console.log('Seeding marketplace listings...');
  const listingRepository = dataSource.getRepository(Listing);
  const listings: Partial<Listing>[] = [];
  
  // Helper to get random price around a base
  const getRandomPrice = (base: number, variance: number) => {
    return Math.floor(base + (Math.random() * variance * 2 - variance));
  };

  // Seed Mahindi (Base 450/kg)
  for (let i = 0; i < 150; i++) {
    listings.push({
      farmerId: farmer.id,
      cropId: crops[0].id, // Mahindi
      quantity: Math.floor(Math.random() * 1000) + 100,
      unit: 'Kilo',
      pricePerUnit: getRandomPrice(450, 50),
      currency: 'TZS',
      status: ListingStatus.ACTIVE,
    });
  }

  // Seed Alizeti (Base 1200/kg)
  for (let i = 0; i < 120; i++) {
    listings.push({
      farmerId: farmer.id,
      cropId: crops[1].id, // Alizeti
      quantity: Math.floor(Math.random() * 500) + 50,
      unit: 'Kilo',
      pricePerUnit: getRandomPrice(1200, 100),
      currency: 'TZS',
      status: ListingStatus.ACTIVE,
    });
  }

  // Seed Maharagwe (Base 2100/kg)
  for (let i = 0; i < 100; i++) {
    listings.push({
      farmerId: farmer.id,
      cropId: crops[2].id, // Maharagwe
      quantity: Math.floor(Math.random() * 300) + 20,
      unit: 'Kilo',
      pricePerUnit: getRandomPrice(2100, 150),
      currency: 'TZS',
      status: ListingStatus.ACTIVE,
    });
  }
  
  // Seed Sesame (Base 3500/kg)
  for (let i = 0; i < 80; i++) {
    listings.push({
      farmerId: farmer.id,
      cropId: crops[3].id, // Sesame
      quantity: Math.floor(Math.random() * 200) + 10,
      unit: 'Kilo',
      pricePerUnit: getRandomPrice(3500, 200),
      currency: 'TZS',
      status: ListingStatus.ACTIVE,
    });
  }

  // Chunk array to avoid inserting too many at once if needed, but 450 is fine for TypeORM in one go.
  await listingRepository.save(listings);

  // 6. Seed Advisory Requests
  console.log('Seeding advisory requests...');
  const advisoryRepository = dataSource.getRepository(AdvisoryRequest);
  await advisoryRepository.save([
    {
      farmerId: farmer.id,
      farmId: farm1.id,
      cropId: crops[0].id, // Mahindi
      description: 'Majani ya mahindi yanageuka manjano na kuwa na madoa madogo madogo. Naomba ushauri.',
      status: RequestStatus.PENDING,
      photoUrl: 'https://images.unsplash.com/photo-1599579085609-8b835bc4578b?auto=format&fit=crop&q=80&w=200',
    },
    {
      farmerId: farmer.id,
      farmId: farm2.id,
      cropId: crops[1].id, // Alizeti
      description: 'Mashina yanaoza kutoka chini, na wadudu weupe wanaonekana chini ya majani. Nifanye nini?',
      status: RequestStatus.PENDING,
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkdJagav-xZ9I7vpOHvlLfCZh8F3PPnIEAui1KD4Xo1Q6wzTbiyAPoFUvMwlTUXqArJKQYLNJG-1xKoPoQSBrfAkdviFpgKET_wxDx66wJXqZzdplnBDjUleOpg4iiR85FAATZIWFoBt-pl7_1mqzVx6cCLKVEbPpIueAPxIsSPd3DA7JkfirMqEDuU41UCH-_W6-Nl0ivgY-LuhFyKRF3BX2Hzo704mchYz7gpLPfuJUBJskRpR7r',
    }
  ]);

  console.log('✅ Seeding complete!');
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
