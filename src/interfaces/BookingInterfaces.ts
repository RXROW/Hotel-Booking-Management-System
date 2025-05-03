export interface Booking {
    _id: string;  
    room: {
      roomNumber: string;  
    };
    startDate: string;  
    endDate: string;  
    totalPrice: number;  
    status: string;  
    createdAt: string;  
    updatedAt: string;  
    user: {
      _id: string;  
      userName: string;  
    };
  }
  
  export interface getBookingsResponse {
    data: {
      booking: Booking[];  
      totalCount: number;   
    };
  }
  