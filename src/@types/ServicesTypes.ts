export type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    status: boolean;
    barber_id: number;
  }
  
  export type ServicesList = {
    items: Service[];
  }
  