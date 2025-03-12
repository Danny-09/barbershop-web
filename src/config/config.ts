type ConfigType = {
    API_URL: string
  }
  
  export const Config: ConfigType = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1/",
  }
