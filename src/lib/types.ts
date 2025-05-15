// Example: User Role Enum
export enum Role {
    CLIENT = "CLIENT",
    PHOTOGRAPHER = "PHOTOGRAPHER",
    ADMIN = "ADMIN",
  }
  
  // Example: Booking Type
  export interface Booking {
    id: string;
    name: string;
    email: string;
    date: string;
    time: string;
    propertyAddress: string;
    userId?: string; // Optional if user is authenticated
  }
  
 