export type BarbersList = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

export type UserRegister = {
  status: string;
};

export type Session = {
  email: string;
  token: string;
  role: string;
}
