import { Category, Customer, Order } from "@prisma/client";

export type OrderWithCustomer = Order & {
 Customer: Customer;
};

export type CustomerWithOrders = Customer & {
 orders: OrderWithCustomer[];
};

export type CartItem = {
 id: string;
 name: string;
 category: Category;
 price: number;
 requireLink: boolean;
 selected?: boolean;
 accountLink?: string;
 additionalInfo?: string;
};
