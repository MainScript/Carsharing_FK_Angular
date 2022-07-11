export interface Car {
    _id?: string;
    make: string;
    model: string;
    year: number;
    fuel: string;
    price: number;
    ppm: number;
    max_duration: number;
    from_time: Date;
    to_time: Date;
}

export interface CarRaw extends Omit<Car, 'from_time' | 'to_time'> {
    from_time: string;
    to_time: string;
}

export interface FuelSelection {
    electric: boolean;
    petrol: boolean;
    diesel: boolean;
}