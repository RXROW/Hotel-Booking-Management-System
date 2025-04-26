export interface adsDetails {
    _id: string,
    isActive: boolean,
    room: {
        _id: string,
        roomNumber: string,
        price: number,
        capacity: number,
        discount: number,
        facilities: [
            string
        ],
        createdBy: string,
        images: [
            string
        ],
        createdAt: string,
        updatedAt: string
    },
    createdBy: {
        _id: string,
        userName: string
    },
    createdAt: string,
    updatedAt: string
}


export interface adsResponse {


    success: boolean,
    message: string,
    data: {
        'ads': adsDetails[], 'totalCount': number
    }
}