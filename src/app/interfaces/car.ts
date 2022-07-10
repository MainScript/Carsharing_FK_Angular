export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    fuel: string;
    price: number;
    ppm: number;
    max_duration: number;
    from_date: Date;
    to_date: Date;
    from_time: Date;
    to_time: Date;
}

export interface CarRaw extends Omit<Car, 'from_date' | 'to_date' | 'from_time' | 'to_time'> {
    from_date: string;
    to_date: string;
    from_time: string;
    to_time: string;
}

export interface FuelSelection {
    electric: boolean;
    petrol: boolean;
    diesel: boolean;
}