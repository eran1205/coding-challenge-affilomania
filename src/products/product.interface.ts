export interface Product {
    "id": string,
    "name": string,
    "description": string|number,
    "price": number,
    "quantity": number,
    "sold": number,
    "pending_orders": number,
    "created_at": string,
    "updated_at": string
}

export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
}