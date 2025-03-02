export class CreateUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;

  constructor(name: string, email: string, phoneNumber: string, username: string, password: string) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.password = password;
  }
}
