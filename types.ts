import { ServiceCategory, ServiceType } from "@prisma/client";

export interface ServiceWithDecimalPrice {
 id: number;
 name: string;
 description: string;
 list: string[];
 image: string;
 price: number;
 category: ServiceCategory;
 type: ServiceType;
 requireLink: boolean;
}

export interface CartItem extends ServiceWithDecimalPrice {
 cartId: string;
}

export interface CartItemWithAccountLink extends CartItem {
 accountLink: string;
}
