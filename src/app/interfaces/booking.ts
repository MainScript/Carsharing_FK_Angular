export interface Booking {
    _id?: string;
    customer_id: string;
    car_id: string;
    date: string;
    from_time: string;
    to_time: string;
    price: number;
}
