import { Dog } from './dog';

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  role: string;
  firstName: string;
  lastName: string;
  dateOption: boolean;
  profilePhotoUrl: string;
  bio: string;
  dogs: Dog[];
  friendList: User[];
  // TODO address, createDate, profilePrivate, locationPrivate
  // TODO relationships?

  constructor(
    id?: number,
    username?: string,
    password?: string,
    email?: string,
    enabled?: boolean,
    role?: string,
    firstName?: string,
    lastName?: string,
    dateOption?: boolean,
    profilePhotoUrl?: string,
    bio?: string,
    dogs?: Dog[],
    friendList?: User[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.enabled = enabled;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOption = dateOption;
    this.profilePhotoUrl = profilePhotoUrl;
    this.bio = bio;
    this.dogs = dogs;
    this.friendList = friendList;
  }
}
