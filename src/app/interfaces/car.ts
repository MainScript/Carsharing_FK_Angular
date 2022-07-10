export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    fuel: string;
    price: number;
    from: Date;
    to: Date;
}

export interface CarRaw extends Omit<Car, 'from' | 'to'> {
    from: string;
    to: string;
}

export interface FuelSelection {
    electric: boolean;
    petrol: boolean;
    diesel: boolean;
}