export interface SharedUser {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: string | number;
    profileImage: string;
    role: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  
  export interface getUsersResponse {
    data: {
      users: SharedUser[];
      totalCount: number;
    };
  }
  