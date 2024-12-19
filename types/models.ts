export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
  
export enum PaymentMethod {
    QRIS = 'QRIS',
    BANK_TRANSFER = 'BANK_TRANSFER'
}

export interface User {
    username: string;
    password: string;
    role: Role;
}

export interface InvoiceHistory {
    bill: number;
    created_at: Date;
}

export interface Payment {
    total_bill: number;
    payment_method: PaymentMethod;
    rent_periods: number; // 3 or 6 months
}

export interface DamageReporting {
    user: User;
    message: string;
}

export interface UserReport {
    message: string;
}

export interface RoomOccupancy {
    empty: number;
    filled: number;
}

export interface UserDetail {
    user: User;
    invoice_history: InvoiceHistory;
}