export class UserDto {
  id;
  username;
  email;
  phone;
  fullname;

  constructor(user) {
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.fullname = user.fullname;
  }
}
