export interface ImagePreview {
  url: string;
  name: string;
  file: File;
}
export interface Room {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  capacity: number;
  createdBy: {
    userName: string;
    _id: string;
  };
}
