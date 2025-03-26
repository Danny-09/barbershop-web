interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    status: boolean;
    barber_id: number;
    created_at: string; 
    updated_at: string; 
  }
  
  interface ServicesResponse {
    items: Service[];
  }
  