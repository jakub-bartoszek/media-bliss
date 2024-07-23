import {
 Customer,
 Order,
 ServiceCategory,
 ServiceType
} from "@prisma/client";

export type ServiceWithDecimalPrice = {
 id: number;
 name: string;
 description: string;
 list: string[];
 image: string;
 price: number;
 category: ServiceCategory;
 type: ServiceType;
 requireLink: string;
};

export type CartItem = ServiceWithDecimalPrice & {
 cartId: string;
};

export type CartItemWithAccountLink = CartItem & {
 accountLink: string;
};

export type OrderWithCustomer = Order & {
 customer: Customer | null;
};
