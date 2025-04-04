export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  status: boolean;
  barber_id: number;
};

export type ServicesList = {
  items: Service[];
};

export type CreateService = {
  name: string;
  description: string;
  price: number;
  status: boolean;
  barber_id?: number;
};

export type ResponseCreateService = {
  status: string;
  data: Service
}
