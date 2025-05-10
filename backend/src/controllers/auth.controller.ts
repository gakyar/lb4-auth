import {get, post, requestBody, HttpErrors,del,param} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';

export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepo: UserRepository,
  ) {}

  @post('/signup')
  async signup(@requestBody() userData: User): Promise<User> {
    const user = await this.userRepo.findOne({where: {email: userData.email}});
    if (user) {
      throw new HttpErrors.BadRequest('Email already exists');
    }
    return this.userRepo.create(userData);
  }

  @post('/login')
  async login(@requestBody() credentials: {email: string; password: string}) {
    const user = await this.userRepo.findOne({
      where: {email: credentials.email, password: credentials.password},
    });
    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }
    return {message: 'Login successful'};
  }

  @get('/users')
  async getUsers(): Promise<User[]> {
    return this.userRepo.find();  // Veritabanındaki tüm kullanıcıları döndürür
  }

   @del('/delete/{id}')
  async deleteUser(@param.path.number('id') id: number): Promise<void> {
    try {
      // Try to find the user by id
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new HttpErrors.NotFound(`User with id ${id} not found`);
      }

      // If found, delete the user
      await this.userRepo.deleteById(id);
    } catch (error) {
      throw new HttpErrors.InternalServerError(`Error deleting user: ${error.message}`);
    }
  }

}


