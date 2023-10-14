import { Account } from "./account";
import { Car } from "./car";

export class Reservation{
    id?:number;
    
    account?:Account;
    
    car?:Car;

    day?:Date;

    createOn?:Date;

    updateOn?:Date;
}