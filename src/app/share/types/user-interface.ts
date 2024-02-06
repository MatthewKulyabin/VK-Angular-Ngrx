export interface UserInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  birthDate: Date;
  description: string;
  mobile?: string;
  address?: string;
  photo?: any;
}
