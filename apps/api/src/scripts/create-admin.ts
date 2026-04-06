import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { Role } from '../common/enums/role.enum';
import { SignupDto } from '../auth/dto/signup.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  const adminDto: SignupDto = {
    email: 'admin@help2home.com',
    password: 'Password123!',
    firstName: 'System',
    lastName: 'Admin',
    phone: '+2348000000000',
    roles: [Role.ADMIN, Role.SUPER_ADMIN],
  };

  try {
    console.log(`Creating admin account for ${adminDto.email}...`);
    const result = await authService.signup(adminDto);
    console.log('Admin account created successfully!');
    console.log('User ID:', result.user.id);
  } catch (error) {
    if (error.status === 409) {
      console.error('Error: Admin account with this email already exists.');
    } else {
      console.error('Error creating admin account:', error.message);
    }
  } finally {
    await app.close();
  }
}

bootstrap();
