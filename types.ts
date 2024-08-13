import { Customer, Order, ServiceCategory, ServiceType } from "@prisma/client";

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
 selected?: boolean;
 accountLink?: string | null;
 additionalInfo?: string;
};

export type OrderWithCustomer = Order & {
 Customer: Customer;
};

export type CustomerWithOrders = Customer & {
 orders: OrderWithCustomer[];
};

export type AccountWithDecimalPrice = {
 id: number;
 category: ServiceCategory;
 price: number;
 followsCount: number;
 genderType: string;
 genderPercentage: number;
 polishFollowersPercentage: number;
 age18to24Percentage: number;
};
