export interface Product {
  id?: string;
  name: string;
  description: string;
  shortDesc?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sizes: string[];
  colors: string[];
  imageUrls: string[];
  status: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  stockStatus?: "inStock" | "outOfStock" | "limitedStock";
  mainCategoryId: string;
  subCategoryId: string;
  thumbnail: string;
  slug: string;
  weight?: string;
  dimensions?: string;
  productTags?: string[];
  soldQuantity?: number | 0;
  mainCategory?: Category;
  discountPercentage?: number;
  rating: number;
  shippingFee?: number;
  reviews?: Review[];
  relatedProducts?: Product[];
  userId?: string;
  storeId?: string;
  store?: Store;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  shortDesc?: string;
  fullDesc?: string;
  imageUrl?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  discount?: string; // Optional field
  buttonText: string;
  animation: "slideFromLeft" | "slideFromRight"; // Restrict to specific values
}

export interface Cart {
  id?: string;
  userId: string;
  createdAt: string; // ISO 8601 format for DateTime
  cartItems: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  selectedColor?: string;
  selectedSize?: string;
}

// CartItem Interface
export interface CartItem {
  id: string;
  quantity: number;
  productId: string;
  product: Product;
  cartId: string;
}

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber: string;
  profileImage?: string;
  role: UserRole;
  coverPhoto?: string;
  totalPurchases?: number;
  createdAt?: string;
}

export enum UserRole {
  customer = "customer",
  vendor = "vendor",
}
export interface Coupon {
  id?: string;
  code: string;
  description?: string;
  discountAmount: number;
  discountType: DiscountType;
  startDate: Date | string;
  endDate: Date | string;
  status: "active" | "inactive" | "expired";
  createdAt?: Date;
  updatedAt?: Date;
  storeId?: string;
  products?: Product[] | string[];
}

export enum DiscountType {
  Percentage = "percentage",
  FixedAmount = "fixedAmount",
}

export interface Address {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: AddressType;
}
export enum AddressType {
  BILLING = "billing",
  SHIPPING = "shipping",
}

export interface Wishlist {
  id: string; // Unique identifier for the wishlist
  userId: string; // User ID associated with the wishlist
  createdAt: Date; // Timestamp when the wishlist was created

  // Relations
  user: User; // The user associated with the wishlist
  wishlistItems: WishlistItem[]; // Array of items in the wishlist
}

export interface WishlistItem {
  id: string; // Unique identifier for the wishlist item
  productId: string; // Product ID associated with the item
  product: Product; // The product details

  // Relations
  wishlistId: string; // ID of the wishlist this item belongs to
  wishlist: Wishlist; // The wishlist containing this item
}

export enum OrderStatus {
  pending = "pending",
  processing = "processing",
  outForDelivery = "outForDelivery",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export interface Order {
  id?: string;
  userId?: string;
  status?: OrderStatus;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
  selectedAddress?: Address;
  selectedAddressId: string;
  selectedPaymentMethod: PaymentMethod;
  orderComment?: string | null;
  // Relations
  user?: User; // Assuming a User type exists
  orderItems?: OrderItem[];
  expectedDeliveryDays?: number;
  expectedDeliveryDate?: Date;
  storeIds: string[];
}

export interface OrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  quantity: number;
  price: number;

  // Relations
  order?: Order;
  product?: Product; // Assuming a Product type exists
}

export enum PaymentMethod {
  COD = "COD",
  RAZORPAY = "RAZORPAY",
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt?: string;
  productId: string;
  userId?: string;
  user?: User;
  product?: Product;
}

enum Status {
  active = "active",
  inactive = "inactive",
}
export interface Store {
  id: string; // Unique identifier for the store
  name: string; // Store name
  slug: string; // Unique slug for the store
  description?: string; // Optional store description
  logo?: string; // Optional URL or path to the store logo
  bannerImage?: string; // Optional URL or path to the store banner
  contactEmail: string; // Contact email for the store
  contactPhone?: string; // Optional contact phone for the store
  address?: string; // Optional store address
  createdAt: Date; // Timestamp of store creation
  updatedAt: Date; // Timestamp of last update
  status: Status; // Active or inactive status
  ownerId: string; // ID of the store owner
  owner: User; // User relation (store owner)
  rating?: number; // Average rating of the store (optional)
  reviewsCount: number; // Total number of reviews
  socialLinks?: SocialLinks; // Optional social media links for the store

  // Customization options
  themeColor?: string; // Optional hex code for the store's theme color
  isCustomizable: boolean; // Whether the store allows customization
  customFields?: Record<string, any>; // Optional custom fields for additional store options
  paymentMethods?: Record<string, any>; // Optional accepted payment methods (e.g., COD, Razorpay)
  shippingPolicies?: string; // Optional shipping policies of the store
  returnPolicies?: string; // Optional return policies of the store

  // Relations
  products: Product[]; // List of products related to the store
  coupons: Coupon[]; // List of coupons related to the store
  orders: Order[]; // List of orders related to the store
}

export interface SocialLinks {
  id: string; // Unique identifier for the social links
  storeId: string; // Unique identifier for the associated store
  store: Store; // Relation to the Store model
  facebook?: string; // Optional Facebook link
  instagram?: string; // Optional Instagram link
  twitter?: string; // Optional Twitter link
  linkedin?: string; // Optional LinkedIn link
  youtube?: string; // Optional YouTube link
  website?: string; // Optional website link for the store
}
