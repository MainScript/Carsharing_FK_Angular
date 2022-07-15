import { Car } from "./car";

export interface Booking {
    _id?: string;
    customer_id: string;
    car_id: string;
    date: string;
    from_time: string;
    to_time: string;
    price: number;
}

export interface BookingWithCar {
    car: Car;
    booking: Booking;
}
