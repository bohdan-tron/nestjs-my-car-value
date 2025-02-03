import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

// scrypt is a callback function, so we need to promisify it
// promisify is a function that takes a callback function and returns a promise
const scrypt = promisify<string, string, number, Buffer>(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('email in use');

    // hash the password
    // create a salt
    const salt = randomBytes(8).toString('hex');
    // hash the salt and the pass 
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    const user = await this.usersService.create(email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) throw new BadRequestException('wrong credentials');

    return user;
  }
}
