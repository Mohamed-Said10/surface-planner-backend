
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    accounts: AccountPayload<ExtArgs>[]
    bookings: BookingPayload<ExtArgs>[]
    assignedBookings: BookingPayload<ExtArgs>[]
    payments: PaymentPayload<ExtArgs>[]
    bookingStatusHistories: BookingStatusHistoryPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified: Date | null
    image: string | null
    verificationToken: string | null
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * 
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type AccountPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Account"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
  }, ExtArgs["result"]["account"]>
  composites: {}
}

/**
 * Model Account
 * 
 */
export type Account = runtime.Types.DefaultSelection<AccountPayload>
export type VerificationTokenPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "VerificationToken"
  objects: {}
  scalars: $Extensions.GetResult<{
    identifier: string
    token: string
    expires: Date
  }, ExtArgs["result"]["verificationToken"]>
  composites: {}
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = runtime.Types.DefaultSelection<VerificationTokenPayload>
export type PackagePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Package"
  objects: {
    bookings: BookingPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    name: string
    price: number
    description: string
    features: string[]
    pricePerExtra: number | null
  }, ExtArgs["result"]["package"]>
  composites: {}
}

/**
 * Model Package
 * 
 */
export type Package = runtime.Types.DefaultSelection<PackagePayload>
export type BookingPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Booking"
  objects: {
    client: UserPayload<ExtArgs>
    photographer: UserPayload<ExtArgs> | null
    statusHistories: BookingStatusHistoryPayload<ExtArgs>[]
    package: PackagePayload<ExtArgs>
    addOns: AddOnPayload<ExtArgs>[]
    payments: PaymentPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    createdAt: Date
    updatedAt: Date
    clientId: string
    photographerId: string | null
    status: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections: string | null
    additionalRequests: string | null
    isPaid: boolean
  }, ExtArgs["result"]["booking"]>
  composites: {}
}

/**
 * Model Booking
 * 
 */
export type Booking = runtime.Types.DefaultSelection<BookingPayload>
export type BookingStatusHistoryPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "BookingStatusHistory"
  objects: {
    booking: BookingPayload<ExtArgs>
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    bookingId: string
    userId: string
    status: BookingStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["bookingStatusHistory"]>
  composites: {}
}

/**
 * Model BookingStatusHistory
 * 
 */
export type BookingStatusHistory = runtime.Types.DefaultSelection<BookingStatusHistoryPayload>
export type AddOnPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "AddOn"
  objects: {
    booking: BookingPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    bookingId: string
    addonId: string
    name: string
    price: number
  }, ExtArgs["result"]["addOn"]>
  composites: {}
}

/**
 * Model AddOn
 * 
 */
export type AddOn = runtime.Types.DefaultSelection<AddOnPayload>
export type PaymentPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Payment"
  objects: {
    user: UserPayload<ExtArgs>
    booking: BookingPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    createdAt: Date
    userId: string
    bookingId: string
    amount: number
    paymentMethod: string | null
    transactionId: string | null
    status: PaymentStatus
  }, ExtArgs["result"]["payment"]>
  composites: {}
}

/**
 * Model Payment
 * 
 */
export type Payment = runtime.Types.DefaultSelection<PaymentPayload>

/**
 * Enums
 */

export const Role: {
  CLIENT: 'CLIENT',
  PHOTOGRAPHER: 'PHOTOGRAPHER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const BookingStatus: {
  BOOKING_CREATED: 'BOOKING_CREATED',
  PHOTOGRAPHER_ASSIGNED: 'PHOTOGRAPHER_ASSIGNED',
  SHOOTING: 'SHOOTING',
  EDITING: 'EDITING',
  COMPLETED: 'COMPLETED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.package`: Exposes CRUD operations for the **Package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Packages
    * const packages = await prisma.package.findMany()
    * ```
    */
  get package(): Prisma.PackageDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.bookingStatusHistory`: Exposes CRUD operations for the **BookingStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookingStatusHistories
    * const bookingStatusHistories = await prisma.bookingStatusHistory.findMany()
    * ```
    */
  get bookingStatusHistory(): Prisma.BookingStatusHistoryDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.addOn`: Exposes CRUD operations for the **AddOn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddOns
    * const addOns = await prisma.addOn.findMany()
    * ```
    */
  get addOn(): Prisma.AddOnDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    VerificationToken: 'VerificationToken',
    Package: 'Package',
    Booking: 'Booking',
    BookingStatusHistory: 'BookingStatusHistory',
    AddOn: 'AddOn',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'account' | 'verificationToken' | 'package' | 'booking' | 'bookingStatusHistory' | 'addOn' | 'payment'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: UserPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: AccountPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>,
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: VerificationTokenPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>,
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>,
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Package: {
        payload: PackagePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.PackageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>
          }
          findFirst: {
            args: Prisma.PackageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>
          }
          findMany: {
            args: Prisma.PackageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>[]
          }
          create: {
            args: Prisma.PackageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>
          }
          createMany: {
            args: Prisma.PackageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PackageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>
          }
          update: {
            args: Prisma.PackageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>
          }
          deleteMany: {
            args: Prisma.PackageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PackageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PackageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PackagePayload>
          }
          aggregate: {
            args: Prisma.PackageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePackage>
          }
          groupBy: {
            args: Prisma.PackageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageCountArgs<ExtArgs>,
            result: $Utils.Optional<PackageCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: BookingPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>,
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      BookingStatusHistory: {
        payload: BookingStatusHistoryPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.BookingStatusHistoryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingStatusHistoryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.BookingStatusHistoryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingStatusHistoryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.BookingStatusHistoryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.BookingStatusHistoryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.BookingStatusHistoryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.BookingStatusHistoryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>
          }
          update: {
            args: Prisma.BookingStatusHistoryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.BookingStatusHistoryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.BookingStatusHistoryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.BookingStatusHistoryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<BookingStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.BookingStatusHistoryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBookingStatusHistory>
          }
          groupBy: {
            args: Prisma.BookingStatusHistoryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BookingStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingStatusHistoryCountArgs<ExtArgs>,
            result: $Utils.Optional<BookingStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      AddOn: {
        payload: AddOnPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.AddOnFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddOnFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>
          }
          findFirst: {
            args: Prisma.AddOnFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddOnFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>
          }
          findMany: {
            args: Prisma.AddOnFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>[]
          }
          create: {
            args: Prisma.AddOnCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>
          }
          createMany: {
            args: Prisma.AddOnCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AddOnDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>
          }
          update: {
            args: Prisma.AddOnUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>
          }
          deleteMany: {
            args: Prisma.AddOnDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AddOnUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AddOnUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AddOnPayload>
          }
          aggregate: {
            args: Prisma.AddOnAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAddOn>
          }
          groupBy: {
            args: Prisma.AddOnGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AddOnGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddOnCountArgs<ExtArgs>,
            result: $Utils.Optional<AddOnCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: PaymentPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>,
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    bookings: number
    assignedBookings: number
    payments: number
    bookingStatusHistories: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
    assignedBookings?: boolean | UserCountOutputTypeCountAssignedBookingsArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    bookingStatusHistories?: boolean | UserCountOutputTypeCountBookingStatusHistoriesArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingStatusHistoriesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingStatusHistoryWhereInput
  }



  /**
   * Count Type PackageCountOutputType
   */


  export type PackageCountOutputType = {
    bookings: number
  }

  export type PackageCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | PackageCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes

  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageCountOutputType
     */
    select?: PackageCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }



  /**
   * Count Type BookingCountOutputType
   */


  export type BookingCountOutputType = {
    statusHistories: number
    addOns: number
    payments: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    statusHistories?: boolean | BookingCountOutputTypeCountStatusHistoriesArgs
    addOns?: boolean | BookingCountOutputTypeCountAddOnsArgs
    payments?: boolean | BookingCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountStatusHistoriesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingStatusHistoryWhereInput
  }


  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountAddOnsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AddOnWhereInput
  }


  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstname: string | null
    lastname: string | null
    role: Role | null
    emailVerified: Date | null
    image: string | null
    verificationToken: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstname: string | null
    lastname: string | null
    role: Role | null
    emailVerified: Date | null
    image: string | null
    verificationToken: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstname: number
    lastname: number
    role: number
    emailVerified: number
    image: number
    verificationToken: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstname?: true
    lastname?: true
    role?: true
    emailVerified?: true
    image?: true
    verificationToken?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstname?: true
    lastname?: true
    role?: true
    emailVerified?: true
    image?: true
    verificationToken?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstname?: true
    lastname?: true
    role?: true
    emailVerified?: true
    image?: true
    verificationToken?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified: Date | null
    image: string | null
    verificationToken: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    verificationToken?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    assignedBookings?: boolean | User$assignedBookingsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    bookingStatusHistories?: boolean | User$bookingStatusHistoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    verificationToken?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    assignedBookings?: boolean | User$assignedBookingsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    bookingStatusHistories?: boolean | User$bookingStatusHistoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findMany', never>| Null>;

    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>| Null>;

    assignedBookings<T extends User$assignedBookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>| Null>;

    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findMany', never>| Null>;

    bookingStatusHistories<T extends User$bookingStatusHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingStatusHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BookingScalarFieldEnum>
  }


  /**
   * User.assignedBookings
   */
  export type User$assignedBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BookingScalarFieldEnum>
  }


  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * User.bookingStatusHistories
   */
  export type User$bookingStatusHistoriesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    where?: BookingStatusHistoryWhereInput
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithRelationInput>
    cursor?: BookingStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BookingStatusHistoryScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Account
   */


  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithAggregationInput>
    by: AccountScalarFieldEnum[]
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }


  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type AccountGetPayload<S extends boolean | null | undefined | AccountArgs> = $Types.GetResult<AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Account'> extends True ? Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Account'> extends True ? Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccountFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
    **/
    create<T extends AccountCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Accounts.
     *     @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const account = await prisma.account.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccountCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
    **/
    delete<T extends AccountDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
    **/
    upsert<T extends AccountUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Account base type for findUnique actions
   */
  export type AccountFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUnique
   */
  export interface AccountFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AccountFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account base type for findFirst actions
   */
  export type AccountFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: Enumerable<AccountScalarFieldEnum>
  }

  /**
   * Account findFirst
   */
  export interface AccountFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AccountFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: Enumerable<AccountCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }


  /**
   * Account without action
   */
  export type AccountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
  }



  /**
   * Model VerificationToken
   */


  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: Enumerable<VerificationTokenOrderByWithAggregationInput>
    by: VerificationTokenScalarFieldEnum[]
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }


  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }


  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenArgs> = $Types.GetResult<VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VerificationTokenFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one VerificationToken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VerificationTokenFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
    **/
    findMany<T extends VerificationTokenFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
    **/
    create<T extends VerificationTokenCreateArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many VerificationTokens.
     *     @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     *     @example
     *     // Create many VerificationTokens
     *     const verificationToken = await prisma.verificationToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VerificationTokenCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
    **/
    delete<T extends VerificationTokenDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VerificationTokenUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VerificationTokenDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VerificationTokenUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
    **/
    upsert<T extends VerificationTokenUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VerificationToken base type for findUnique actions
   */
  export type VerificationTokenFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUnique
   */
  export interface VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends VerificationTokenFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken base type for findFirst actions
   */
  export type VerificationTokenFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }

  /**
   * VerificationToken findFirst
   */
  export interface VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends VerificationTokenFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: Enumerable<VerificationTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
  }



  /**
   * Model Package
   */


  export type AggregatePackage = {
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  export type PackageAvgAggregateOutputType = {
    id: number | null
    price: number | null
    pricePerExtra: number | null
  }

  export type PackageSumAggregateOutputType = {
    id: number | null
    price: number | null
    pricePerExtra: number | null
  }

  export type PackageMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    description: string | null
    pricePerExtra: number | null
  }

  export type PackageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    description: string | null
    pricePerExtra: number | null
  }

  export type PackageCountAggregateOutputType = {
    id: number
    name: number
    price: number
    description: number
    features: number
    pricePerExtra: number
    _all: number
  }


  export type PackageAvgAggregateInputType = {
    id?: true
    price?: true
    pricePerExtra?: true
  }

  export type PackageSumAggregateInputType = {
    id?: true
    price?: true
    pricePerExtra?: true
  }

  export type PackageMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    pricePerExtra?: true
  }

  export type PackageMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    pricePerExtra?: true
  }

  export type PackageCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    features?: true
    pricePerExtra?: true
    _all?: true
  }

  export type PackageAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Package to aggregate.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: Enumerable<PackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Packages
    **/
    _count?: true | PackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageMaxAggregateInputType
  }

  export type GetPackageAggregateType<T extends PackageAggregateArgs> = {
        [P in keyof T & keyof AggregatePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackage[P]>
      : GetScalarType<T[P], AggregatePackage[P]>
  }




  export type PackageGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
    orderBy?: Enumerable<PackageOrderByWithAggregationInput>
    by: PackageScalarFieldEnum[]
    having?: PackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageCountAggregateInputType | true
    _avg?: PackageAvgAggregateInputType
    _sum?: PackageSumAggregateInputType
    _min?: PackageMinAggregateInputType
    _max?: PackageMaxAggregateInputType
  }


  export type PackageGroupByOutputType = {
    id: number
    name: string
    price: number
    description: string
    features: string[]
    pricePerExtra: number | null
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  type GetPackageGroupByPayload<T extends PackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageGroupByOutputType[P]>
            : GetScalarType<T[P], PackageGroupByOutputType[P]>
        }
      >
    >


  export type PackageSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    description?: boolean
    features?: boolean
    pricePerExtra?: boolean
    bookings?: boolean | Package$bookingsArgs<ExtArgs>
    _count?: boolean | PackageCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    description?: boolean
    features?: boolean
    pricePerExtra?: boolean
  }

  export type PackageInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | Package$bookingsArgs<ExtArgs>
    _count?: boolean | PackageCountOutputTypeArgs<ExtArgs>
  }


  type PackageGetPayload<S extends boolean | null | undefined | PackageArgs> = $Types.GetResult<PackagePayload, S>

  type PackageCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<PackageFindManyArgs, 'select' | 'include'> & {
      select?: PackageCountAggregateInputType | true
    }

  export interface PackageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Package'], meta: { name: 'Package' } }
    /**
     * Find zero or one Package that matches the filter.
     * @param {PackageFindUniqueArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PackageFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PackageFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Package'> extends True ? Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Package that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PackageFindUniqueOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PackageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PackageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PackageFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PackageFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Package'> extends True ? Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Package that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PackageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PackageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Packages
     * const packages = await prisma.package.findMany()
     * 
     * // Get first 10 Packages
     * const packages = await prisma.package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageWithIdOnly = await prisma.package.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PackageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PackageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Package.
     * @param {PackageCreateArgs} args - Arguments to create a Package.
     * @example
     * // Create one Package
     * const Package = await prisma.package.create({
     *   data: {
     *     // ... data to create a Package
     *   }
     * })
     * 
    **/
    create<T extends PackageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PackageCreateArgs<ExtArgs>>
    ): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Packages.
     *     @param {PackageCreateManyArgs} args - Arguments to create many Packages.
     *     @example
     *     // Create many Packages
     *     const package = await prisma.package.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PackageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PackageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Package.
     * @param {PackageDeleteArgs} args - Arguments to delete one Package.
     * @example
     * // Delete one Package
     * const Package = await prisma.package.delete({
     *   where: {
     *     // ... filter to delete one Package
     *   }
     * })
     * 
    **/
    delete<T extends PackageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PackageDeleteArgs<ExtArgs>>
    ): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Package.
     * @param {PackageUpdateArgs} args - Arguments to update one Package.
     * @example
     * // Update one Package
     * const package = await prisma.package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PackageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PackageUpdateArgs<ExtArgs>>
    ): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Packages.
     * @param {PackageDeleteManyArgs} args - Arguments to filter Packages to delete.
     * @example
     * // Delete a few Packages
     * const { count } = await prisma.package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PackageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PackageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PackageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PackageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Package.
     * @param {PackageUpsertArgs} args - Arguments to update or create a Package.
     * @example
     * // Update or create a Package
     * const package = await prisma.package.upsert({
     *   create: {
     *     // ... data to create a Package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Package we want to update
     *   }
     * })
    **/
    upsert<T extends PackageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PackageUpsertArgs<ExtArgs>>
    ): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageCountArgs} args - Arguments to filter Packages to count.
     * @example
     * // Count the number of Packages
     * const count = await prisma.package.count({
     *   where: {
     *     // ... the filter for the Packages we want to count
     *   }
     * })
    **/
    count<T extends PackageCountArgs>(
      args?: Subset<T, PackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageAggregateArgs>(args: Subset<T, PackageAggregateArgs>): Prisma.PrismaPromise<GetPackageAggregateType<T>>

    /**
     * Group by Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageGroupByArgs['orderBy'] }
        : { orderBy?: PackageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PackageClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    bookings<T extends Package$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Package$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Package base type for findUnique actions
   */
  export type PackageFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findUnique
   */
  export interface PackageFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PackageFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Package findUniqueOrThrow
   */
  export type PackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }


  /**
   * Package base type for findFirst actions
   */
  export type PackageFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: Enumerable<PackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: Enumerable<PackageScalarFieldEnum>
  }

  /**
   * Package findFirst
   */
  export interface PackageFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PackageFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Package findFirstOrThrow
   */
  export type PackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: Enumerable<PackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: Enumerable<PackageScalarFieldEnum>
  }


  /**
   * Package findMany
   */
  export type PackageFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Packages to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: Enumerable<PackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    distinct?: Enumerable<PackageScalarFieldEnum>
  }


  /**
   * Package create
   */
  export type PackageCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to create a Package.
     */
    data: XOR<PackageCreateInput, PackageUncheckedCreateInput>
  }


  /**
   * Package createMany
   */
  export type PackageCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Packages.
     */
    data: Enumerable<PackageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Package update
   */
  export type PackageUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to update a Package.
     */
    data: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
    /**
     * Choose, which Package to update.
     */
    where: PackageWhereUniqueInput
  }


  /**
   * Package updateMany
   */
  export type PackageUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
  }


  /**
   * Package upsert
   */
  export type PackageUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The filter to search for the Package to update in case it exists.
     */
    where: PackageWhereUniqueInput
    /**
     * In case the Package found by the `where` argument doesn't exist, create a new Package with this data.
     */
    create: XOR<PackageCreateInput, PackageUncheckedCreateInput>
    /**
     * In case the Package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
  }


  /**
   * Package delete
   */
  export type PackageDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter which Package to delete.
     */
    where: PackageWhereUniqueInput
  }


  /**
   * Package deleteMany
   */
  export type PackageDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Packages to delete
     */
    where?: PackageWhereInput
  }


  /**
   * Package.bookings
   */
  export type Package$bookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BookingScalarFieldEnum>
  }


  /**
   * Package without action
   */
  export type PackageArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PackageInclude<ExtArgs> | null
  }



  /**
   * Model Booking
   */


  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    packageId: number | null
  }

  export type BookingSumAggregateOutputType = {
    packageId: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clientId: string | null
    photographerId: string | null
    status: BookingStatus | null
    packageId: number | null
    propertyType: string | null
    propertySize: string | null
    buildingName: string | null
    unitNumber: string | null
    floor: string | null
    street: string | null
    appointmentDate: Date | null
    timeSlot: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    email: string | null
    additionalDirections: string | null
    additionalRequests: string | null
    isPaid: boolean | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clientId: string | null
    photographerId: string | null
    status: BookingStatus | null
    packageId: number | null
    propertyType: string | null
    propertySize: string | null
    buildingName: string | null
    unitNumber: string | null
    floor: string | null
    street: string | null
    appointmentDate: Date | null
    timeSlot: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    email: string | null
    additionalDirections: string | null
    additionalRequests: string | null
    isPaid: boolean | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    clientId: number
    photographerId: number
    status: number
    packageId: number
    propertyType: number
    propertySize: number
    buildingName: number
    unitNumber: number
    floor: number
    street: number
    appointmentDate: number
    timeSlot: number
    firstName: number
    lastName: number
    phoneNumber: number
    email: number
    additionalDirections: number
    additionalRequests: number
    isPaid: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    packageId?: true
  }

  export type BookingSumAggregateInputType = {
    packageId?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    clientId?: true
    photographerId?: true
    status?: true
    packageId?: true
    propertyType?: true
    propertySize?: true
    buildingName?: true
    unitNumber?: true
    floor?: true
    street?: true
    appointmentDate?: true
    timeSlot?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    email?: true
    additionalDirections?: true
    additionalRequests?: true
    isPaid?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    clientId?: true
    photographerId?: true
    status?: true
    packageId?: true
    propertyType?: true
    propertySize?: true
    buildingName?: true
    unitNumber?: true
    floor?: true
    street?: true
    appointmentDate?: true
    timeSlot?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    email?: true
    additionalDirections?: true
    additionalRequests?: true
    isPaid?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    clientId?: true
    photographerId?: true
    status?: true
    packageId?: true
    propertyType?: true
    propertySize?: true
    buildingName?: true
    unitNumber?: true
    floor?: true
    street?: true
    appointmentDate?: true
    timeSlot?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    email?: true
    additionalDirections?: true
    additionalRequests?: true
    isPaid?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: Enumerable<BookingOrderByWithAggregationInput>
    by: BookingScalarFieldEnum[]
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }


  export type BookingGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    clientId: string
    photographerId: string | null
    status: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections: string | null
    additionalRequests: string | null
    isPaid: boolean
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clientId?: boolean
    photographerId?: boolean
    status?: boolean
    packageId?: boolean
    propertyType?: boolean
    propertySize?: boolean
    buildingName?: boolean
    unitNumber?: boolean
    floor?: boolean
    street?: boolean
    appointmentDate?: boolean
    timeSlot?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    email?: boolean
    additionalDirections?: boolean
    additionalRequests?: boolean
    isPaid?: boolean
    client?: boolean | UserArgs<ExtArgs>
    photographer?: boolean | UserArgs<ExtArgs>
    statusHistories?: boolean | Booking$statusHistoriesArgs<ExtArgs>
    package?: boolean | PackageArgs<ExtArgs>
    addOns?: boolean | Booking$addOnsArgs<ExtArgs>
    payments?: boolean | Booking$paymentsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clientId?: boolean
    photographerId?: boolean
    status?: boolean
    packageId?: boolean
    propertyType?: boolean
    propertySize?: boolean
    buildingName?: boolean
    unitNumber?: boolean
    floor?: boolean
    street?: boolean
    appointmentDate?: boolean
    timeSlot?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    email?: boolean
    additionalDirections?: boolean
    additionalRequests?: boolean
    isPaid?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    client?: boolean | UserArgs<ExtArgs>
    photographer?: boolean | UserArgs<ExtArgs>
    statusHistories?: boolean | Booking$statusHistoriesArgs<ExtArgs>
    package?: boolean | PackageArgs<ExtArgs>
    addOns?: boolean | Booking$addOnsArgs<ExtArgs>
    payments?: boolean | Booking$paymentsArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeArgs<ExtArgs>
  }


  type BookingGetPayload<S extends boolean | null | undefined | BookingArgs> = $Types.GetResult<BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<BookingFindManyArgs, 'select' | 'include'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BookingFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Booking'> extends True ? Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Booking that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BookingFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Booking'> extends True ? Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Booking that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BookingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
    **/
    create<T extends BookingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BookingCreateArgs<ExtArgs>>
    ): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Bookings.
     *     @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     *     @example
     *     // Create many Bookings
     *     const booking = await prisma.booking.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BookingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
    **/
    delete<T extends BookingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>
    ): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BookingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>
    ): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BookingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BookingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
    **/
    upsert<T extends BookingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>
    ): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    client<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    photographer<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    statusHistories<T extends Booking$statusHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, Booking$statusHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findMany', never>| Null>;

    package<T extends PackageArgs<ExtArgs> = {}>(args?: Subset<T, PackageArgs<ExtArgs>>): Prisma__PackageClient<$Types.GetResult<PackagePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    addOns<T extends Booking$addOnsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$addOnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findMany', never>| Null>;

    payments<T extends Booking$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Booking base type for findUnique actions
   */
  export type BookingFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUnique
   */
  export interface BookingFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends BookingFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }


  /**
   * Booking base type for findFirst actions
   */
  export type BookingFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: Enumerable<BookingScalarFieldEnum>
  }

  /**
   * Booking findFirst
   */
  export interface BookingFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends BookingFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: Enumerable<BookingScalarFieldEnum>
  }


  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: Enumerable<BookingScalarFieldEnum>
  }


  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }


  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: Enumerable<BookingCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }


  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
  }


  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }


  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }


  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
  }


  /**
   * Booking.statusHistories
   */
  export type Booking$statusHistoriesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    where?: BookingStatusHistoryWhereInput
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithRelationInput>
    cursor?: BookingStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BookingStatusHistoryScalarFieldEnum>
  }


  /**
   * Booking.addOns
   */
  export type Booking$addOnsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    where?: AddOnWhereInput
    orderBy?: Enumerable<AddOnOrderByWithRelationInput>
    cursor?: AddOnWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AddOnScalarFieldEnum>
  }


  /**
   * Booking.payments
   */
  export type Booking$paymentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * Booking without action
   */
  export type BookingArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingInclude<ExtArgs> | null
  }



  /**
   * Model BookingStatusHistory
   */


  export type AggregateBookingStatusHistory = {
    _count: BookingStatusHistoryCountAggregateOutputType | null
    _min: BookingStatusHistoryMinAggregateOutputType | null
    _max: BookingStatusHistoryMaxAggregateOutputType | null
  }

  export type BookingStatusHistoryMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    userId: string | null
    status: BookingStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingStatusHistoryMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    userId: string | null
    status: BookingStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingStatusHistoryCountAggregateOutputType = {
    id: number
    bookingId: number
    userId: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingStatusHistoryMinAggregateInputType = {
    id?: true
    bookingId?: true
    userId?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingStatusHistoryMaxAggregateInputType = {
    id?: true
    bookingId?: true
    userId?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingStatusHistoryCountAggregateInputType = {
    id?: true
    bookingId?: true
    userId?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingStatusHistoryAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingStatusHistory to aggregate.
     */
    where?: BookingStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingStatusHistories to fetch.
     */
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookingStatusHistories
    **/
    _count?: true | BookingStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingStatusHistoryMaxAggregateInputType
  }

  export type GetBookingStatusHistoryAggregateType<T extends BookingStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateBookingStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookingStatusHistory[P]>
      : GetScalarType<T[P], AggregateBookingStatusHistory[P]>
  }




  export type BookingStatusHistoryGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingStatusHistoryWhereInput
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithAggregationInput>
    by: BookingStatusHistoryScalarFieldEnum[]
    having?: BookingStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingStatusHistoryCountAggregateInputType | true
    _min?: BookingStatusHistoryMinAggregateInputType
    _max?: BookingStatusHistoryMaxAggregateInputType
  }


  export type BookingStatusHistoryGroupByOutputType = {
    id: string
    bookingId: string
    userId: string
    status: BookingStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingStatusHistoryCountAggregateOutputType | null
    _min: BookingStatusHistoryMinAggregateOutputType | null
    _max: BookingStatusHistoryMaxAggregateOutputType | null
  }

  type GetBookingStatusHistoryGroupByPayload<T extends BookingStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<BookingStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], BookingStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type BookingStatusHistorySelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    userId?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["bookingStatusHistory"]>

  export type BookingStatusHistorySelectScalar = {
    id?: boolean
    bookingId?: boolean
    userId?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingStatusHistoryInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
  }


  type BookingStatusHistoryGetPayload<S extends boolean | null | undefined | BookingStatusHistoryArgs> = $Types.GetResult<BookingStatusHistoryPayload, S>

  type BookingStatusHistoryCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<BookingStatusHistoryFindManyArgs, 'select' | 'include'> & {
      select?: BookingStatusHistoryCountAggregateInputType | true
    }

  export interface BookingStatusHistoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookingStatusHistory'], meta: { name: 'BookingStatusHistory' } }
    /**
     * Find zero or one BookingStatusHistory that matches the filter.
     * @param {BookingStatusHistoryFindUniqueArgs} args - Arguments to find a BookingStatusHistory
     * @example
     * // Get one BookingStatusHistory
     * const bookingStatusHistory = await prisma.bookingStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BookingStatusHistoryFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BookingStatusHistoryFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'BookingStatusHistory'> extends True ? Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one BookingStatusHistory that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BookingStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a BookingStatusHistory
     * @example
     * // Get one BookingStatusHistory
     * const bookingStatusHistory = await prisma.bookingStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BookingStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first BookingStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryFindFirstArgs} args - Arguments to find a BookingStatusHistory
     * @example
     * // Get one BookingStatusHistory
     * const bookingStatusHistory = await prisma.bookingStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BookingStatusHistoryFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BookingStatusHistoryFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'BookingStatusHistory'> extends True ? Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first BookingStatusHistory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a BookingStatusHistory
     * @example
     * // Get one BookingStatusHistory
     * const bookingStatusHistory = await prisma.bookingStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BookingStatusHistoryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingStatusHistoryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more BookingStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookingStatusHistories
     * const bookingStatusHistories = await prisma.bookingStatusHistory.findMany()
     * 
     * // Get first 10 BookingStatusHistories
     * const bookingStatusHistories = await prisma.bookingStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingStatusHistoryWithIdOnly = await prisma.bookingStatusHistory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BookingStatusHistoryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingStatusHistoryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a BookingStatusHistory.
     * @param {BookingStatusHistoryCreateArgs} args - Arguments to create a BookingStatusHistory.
     * @example
     * // Create one BookingStatusHistory
     * const BookingStatusHistory = await prisma.bookingStatusHistory.create({
     *   data: {
     *     // ... data to create a BookingStatusHistory
     *   }
     * })
     * 
    **/
    create<T extends BookingStatusHistoryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BookingStatusHistoryCreateArgs<ExtArgs>>
    ): Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many BookingStatusHistories.
     *     @param {BookingStatusHistoryCreateManyArgs} args - Arguments to create many BookingStatusHistories.
     *     @example
     *     // Create many BookingStatusHistories
     *     const bookingStatusHistory = await prisma.bookingStatusHistory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BookingStatusHistoryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingStatusHistoryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BookingStatusHistory.
     * @param {BookingStatusHistoryDeleteArgs} args - Arguments to delete one BookingStatusHistory.
     * @example
     * // Delete one BookingStatusHistory
     * const BookingStatusHistory = await prisma.bookingStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one BookingStatusHistory
     *   }
     * })
     * 
    **/
    delete<T extends BookingStatusHistoryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BookingStatusHistoryDeleteArgs<ExtArgs>>
    ): Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one BookingStatusHistory.
     * @param {BookingStatusHistoryUpdateArgs} args - Arguments to update one BookingStatusHistory.
     * @example
     * // Update one BookingStatusHistory
     * const bookingStatusHistory = await prisma.bookingStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BookingStatusHistoryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BookingStatusHistoryUpdateArgs<ExtArgs>>
    ): Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more BookingStatusHistories.
     * @param {BookingStatusHistoryDeleteManyArgs} args - Arguments to filter BookingStatusHistories to delete.
     * @example
     * // Delete a few BookingStatusHistories
     * const { count } = await prisma.bookingStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BookingStatusHistoryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BookingStatusHistoryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookingStatusHistories
     * const bookingStatusHistory = await prisma.bookingStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BookingStatusHistoryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BookingStatusHistoryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BookingStatusHistory.
     * @param {BookingStatusHistoryUpsertArgs} args - Arguments to update or create a BookingStatusHistory.
     * @example
     * // Update or create a BookingStatusHistory
     * const bookingStatusHistory = await prisma.bookingStatusHistory.upsert({
     *   create: {
     *     // ... data to create a BookingStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookingStatusHistory we want to update
     *   }
     * })
    **/
    upsert<T extends BookingStatusHistoryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BookingStatusHistoryUpsertArgs<ExtArgs>>
    ): Prisma__BookingStatusHistoryClient<$Types.GetResult<BookingStatusHistoryPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of BookingStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryCountArgs} args - Arguments to filter BookingStatusHistories to count.
     * @example
     * // Count the number of BookingStatusHistories
     * const count = await prisma.bookingStatusHistory.count({
     *   where: {
     *     // ... the filter for the BookingStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends BookingStatusHistoryCountArgs>(
      args?: Subset<T, BookingStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookingStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingStatusHistoryAggregateArgs>(args: Subset<T, BookingStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetBookingStatusHistoryAggregateType<T>>

    /**
     * Group by BookingStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: BookingStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for BookingStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BookingStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    booking<T extends BookingArgs<ExtArgs> = {}>(args?: Subset<T, BookingArgs<ExtArgs>>): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * BookingStatusHistory base type for findUnique actions
   */
  export type BookingStatusHistoryFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BookingStatusHistory to fetch.
     */
    where: BookingStatusHistoryWhereUniqueInput
  }

  /**
   * BookingStatusHistory findUnique
   */
  export interface BookingStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends BookingStatusHistoryFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BookingStatusHistory findUniqueOrThrow
   */
  export type BookingStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BookingStatusHistory to fetch.
     */
    where: BookingStatusHistoryWhereUniqueInput
  }


  /**
   * BookingStatusHistory base type for findFirst actions
   */
  export type BookingStatusHistoryFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BookingStatusHistory to fetch.
     */
    where?: BookingStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingStatusHistories to fetch.
     */
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingStatusHistories.
     */
    cursor?: BookingStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingStatusHistories.
     */
    distinct?: Enumerable<BookingStatusHistoryScalarFieldEnum>
  }

  /**
   * BookingStatusHistory findFirst
   */
  export interface BookingStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends BookingStatusHistoryFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BookingStatusHistory findFirstOrThrow
   */
  export type BookingStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BookingStatusHistory to fetch.
     */
    where?: BookingStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingStatusHistories to fetch.
     */
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingStatusHistories.
     */
    cursor?: BookingStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingStatusHistories.
     */
    distinct?: Enumerable<BookingStatusHistoryScalarFieldEnum>
  }


  /**
   * BookingStatusHistory findMany
   */
  export type BookingStatusHistoryFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BookingStatusHistories to fetch.
     */
    where?: BookingStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingStatusHistories to fetch.
     */
    orderBy?: Enumerable<BookingStatusHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookingStatusHistories.
     */
    cursor?: BookingStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingStatusHistories.
     */
    skip?: number
    distinct?: Enumerable<BookingStatusHistoryScalarFieldEnum>
  }


  /**
   * BookingStatusHistory create
   */
  export type BookingStatusHistoryCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a BookingStatusHistory.
     */
    data: XOR<BookingStatusHistoryCreateInput, BookingStatusHistoryUncheckedCreateInput>
  }


  /**
   * BookingStatusHistory createMany
   */
  export type BookingStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookingStatusHistories.
     */
    data: Enumerable<BookingStatusHistoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * BookingStatusHistory update
   */
  export type BookingStatusHistoryUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a BookingStatusHistory.
     */
    data: XOR<BookingStatusHistoryUpdateInput, BookingStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which BookingStatusHistory to update.
     */
    where: BookingStatusHistoryWhereUniqueInput
  }


  /**
   * BookingStatusHistory updateMany
   */
  export type BookingStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookingStatusHistories.
     */
    data: XOR<BookingStatusHistoryUpdateManyMutationInput, BookingStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which BookingStatusHistories to update
     */
    where?: BookingStatusHistoryWhereInput
  }


  /**
   * BookingStatusHistory upsert
   */
  export type BookingStatusHistoryUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the BookingStatusHistory to update in case it exists.
     */
    where: BookingStatusHistoryWhereUniqueInput
    /**
     * In case the BookingStatusHistory found by the `where` argument doesn't exist, create a new BookingStatusHistory with this data.
     */
    create: XOR<BookingStatusHistoryCreateInput, BookingStatusHistoryUncheckedCreateInput>
    /**
     * In case the BookingStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingStatusHistoryUpdateInput, BookingStatusHistoryUncheckedUpdateInput>
  }


  /**
   * BookingStatusHistory delete
   */
  export type BookingStatusHistoryDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which BookingStatusHistory to delete.
     */
    where: BookingStatusHistoryWhereUniqueInput
  }


  /**
   * BookingStatusHistory deleteMany
   */
  export type BookingStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingStatusHistories to delete
     */
    where?: BookingStatusHistoryWhereInput
  }


  /**
   * BookingStatusHistory without action
   */
  export type BookingStatusHistoryArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingStatusHistory
     */
    select?: BookingStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BookingStatusHistoryInclude<ExtArgs> | null
  }



  /**
   * Model AddOn
   */


  export type AggregateAddOn = {
    _count: AddOnCountAggregateOutputType | null
    _avg: AddOnAvgAggregateOutputType | null
    _sum: AddOnSumAggregateOutputType | null
    _min: AddOnMinAggregateOutputType | null
    _max: AddOnMaxAggregateOutputType | null
  }

  export type AddOnAvgAggregateOutputType = {
    price: number | null
  }

  export type AddOnSumAggregateOutputType = {
    price: number | null
  }

  export type AddOnMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    addonId: string | null
    name: string | null
    price: number | null
  }

  export type AddOnMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    addonId: string | null
    name: string | null
    price: number | null
  }

  export type AddOnCountAggregateOutputType = {
    id: number
    bookingId: number
    addonId: number
    name: number
    price: number
    _all: number
  }


  export type AddOnAvgAggregateInputType = {
    price?: true
  }

  export type AddOnSumAggregateInputType = {
    price?: true
  }

  export type AddOnMinAggregateInputType = {
    id?: true
    bookingId?: true
    addonId?: true
    name?: true
    price?: true
  }

  export type AddOnMaxAggregateInputType = {
    id?: true
    bookingId?: true
    addonId?: true
    name?: true
    price?: true
  }

  export type AddOnCountAggregateInputType = {
    id?: true
    bookingId?: true
    addonId?: true
    name?: true
    price?: true
    _all?: true
  }

  export type AddOnAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddOn to aggregate.
     */
    where?: AddOnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddOns to fetch.
     */
    orderBy?: Enumerable<AddOnOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddOnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddOns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddOns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddOns
    **/
    _count?: true | AddOnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddOnAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddOnSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddOnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddOnMaxAggregateInputType
  }

  export type GetAddOnAggregateType<T extends AddOnAggregateArgs> = {
        [P in keyof T & keyof AggregateAddOn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddOn[P]>
      : GetScalarType<T[P], AggregateAddOn[P]>
  }




  export type AddOnGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AddOnWhereInput
    orderBy?: Enumerable<AddOnOrderByWithAggregationInput>
    by: AddOnScalarFieldEnum[]
    having?: AddOnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddOnCountAggregateInputType | true
    _avg?: AddOnAvgAggregateInputType
    _sum?: AddOnSumAggregateInputType
    _min?: AddOnMinAggregateInputType
    _max?: AddOnMaxAggregateInputType
  }


  export type AddOnGroupByOutputType = {
    id: string
    bookingId: string
    addonId: string
    name: string
    price: number
    _count: AddOnCountAggregateOutputType | null
    _avg: AddOnAvgAggregateOutputType | null
    _sum: AddOnSumAggregateOutputType | null
    _min: AddOnMinAggregateOutputType | null
    _max: AddOnMaxAggregateOutputType | null
  }

  type GetAddOnGroupByPayload<T extends AddOnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AddOnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddOnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddOnGroupByOutputType[P]>
            : GetScalarType<T[P], AddOnGroupByOutputType[P]>
        }
      >
    >


  export type AddOnSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    addonId?: boolean
    name?: boolean
    price?: boolean
    booking?: boolean | BookingArgs<ExtArgs>
  }, ExtArgs["result"]["addOn"]>

  export type AddOnSelectScalar = {
    id?: boolean
    bookingId?: boolean
    addonId?: boolean
    name?: boolean
    price?: boolean
  }

  export type AddOnInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingArgs<ExtArgs>
  }


  type AddOnGetPayload<S extends boolean | null | undefined | AddOnArgs> = $Types.GetResult<AddOnPayload, S>

  type AddOnCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AddOnFindManyArgs, 'select' | 'include'> & {
      select?: AddOnCountAggregateInputType | true
    }

  export interface AddOnDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddOn'], meta: { name: 'AddOn' } }
    /**
     * Find zero or one AddOn that matches the filter.
     * @param {AddOnFindUniqueArgs} args - Arguments to find a AddOn
     * @example
     * // Get one AddOn
     * const addOn = await prisma.addOn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AddOnFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AddOnFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AddOn'> extends True ? Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one AddOn that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AddOnFindUniqueOrThrowArgs} args - Arguments to find a AddOn
     * @example
     * // Get one AddOn
     * const addOn = await prisma.addOn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AddOnFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AddOnFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first AddOn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnFindFirstArgs} args - Arguments to find a AddOn
     * @example
     * // Get one AddOn
     * const addOn = await prisma.addOn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AddOnFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AddOnFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AddOn'> extends True ? Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first AddOn that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnFindFirstOrThrowArgs} args - Arguments to find a AddOn
     * @example
     * // Get one AddOn
     * const addOn = await prisma.addOn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AddOnFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AddOnFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more AddOns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddOns
     * const addOns = await prisma.addOn.findMany()
     * 
     * // Get first 10 AddOns
     * const addOns = await prisma.addOn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addOnWithIdOnly = await prisma.addOn.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AddOnFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AddOnFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a AddOn.
     * @param {AddOnCreateArgs} args - Arguments to create a AddOn.
     * @example
     * // Create one AddOn
     * const AddOn = await prisma.addOn.create({
     *   data: {
     *     // ... data to create a AddOn
     *   }
     * })
     * 
    **/
    create<T extends AddOnCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AddOnCreateArgs<ExtArgs>>
    ): Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many AddOns.
     *     @param {AddOnCreateManyArgs} args - Arguments to create many AddOns.
     *     @example
     *     // Create many AddOns
     *     const addOn = await prisma.addOn.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AddOnCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AddOnCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AddOn.
     * @param {AddOnDeleteArgs} args - Arguments to delete one AddOn.
     * @example
     * // Delete one AddOn
     * const AddOn = await prisma.addOn.delete({
     *   where: {
     *     // ... filter to delete one AddOn
     *   }
     * })
     * 
    **/
    delete<T extends AddOnDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AddOnDeleteArgs<ExtArgs>>
    ): Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one AddOn.
     * @param {AddOnUpdateArgs} args - Arguments to update one AddOn.
     * @example
     * // Update one AddOn
     * const addOn = await prisma.addOn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AddOnUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AddOnUpdateArgs<ExtArgs>>
    ): Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more AddOns.
     * @param {AddOnDeleteManyArgs} args - Arguments to filter AddOns to delete.
     * @example
     * // Delete a few AddOns
     * const { count } = await prisma.addOn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AddOnDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AddOnDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddOns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddOns
     * const addOn = await prisma.addOn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AddOnUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AddOnUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddOn.
     * @param {AddOnUpsertArgs} args - Arguments to update or create a AddOn.
     * @example
     * // Update or create a AddOn
     * const addOn = await prisma.addOn.upsert({
     *   create: {
     *     // ... data to create a AddOn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddOn we want to update
     *   }
     * })
    **/
    upsert<T extends AddOnUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AddOnUpsertArgs<ExtArgs>>
    ): Prisma__AddOnClient<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of AddOns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnCountArgs} args - Arguments to filter AddOns to count.
     * @example
     * // Count the number of AddOns
     * const count = await prisma.addOn.count({
     *   where: {
     *     // ... the filter for the AddOns we want to count
     *   }
     * })
    **/
    count<T extends AddOnCountArgs>(
      args?: Subset<T, AddOnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddOnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddOn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddOnAggregateArgs>(args: Subset<T, AddOnAggregateArgs>): Prisma.PrismaPromise<GetAddOnAggregateType<T>>

    /**
     * Group by AddOn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddOnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddOnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddOnGroupByArgs['orderBy'] }
        : { orderBy?: AddOnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddOnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddOnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AddOn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AddOnClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    booking<T extends BookingArgs<ExtArgs> = {}>(args?: Subset<T, BookingArgs<ExtArgs>>): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AddOn base type for findUnique actions
   */
  export type AddOnFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * Filter, which AddOn to fetch.
     */
    where: AddOnWhereUniqueInput
  }

  /**
   * AddOn findUnique
   */
  export interface AddOnFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AddOnFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AddOn findUniqueOrThrow
   */
  export type AddOnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * Filter, which AddOn to fetch.
     */
    where: AddOnWhereUniqueInput
  }


  /**
   * AddOn base type for findFirst actions
   */
  export type AddOnFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * Filter, which AddOn to fetch.
     */
    where?: AddOnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddOns to fetch.
     */
    orderBy?: Enumerable<AddOnOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddOns.
     */
    cursor?: AddOnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddOns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddOns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddOns.
     */
    distinct?: Enumerable<AddOnScalarFieldEnum>
  }

  /**
   * AddOn findFirst
   */
  export interface AddOnFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AddOnFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AddOn findFirstOrThrow
   */
  export type AddOnFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * Filter, which AddOn to fetch.
     */
    where?: AddOnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddOns to fetch.
     */
    orderBy?: Enumerable<AddOnOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddOns.
     */
    cursor?: AddOnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddOns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddOns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddOns.
     */
    distinct?: Enumerable<AddOnScalarFieldEnum>
  }


  /**
   * AddOn findMany
   */
  export type AddOnFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * Filter, which AddOns to fetch.
     */
    where?: AddOnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddOns to fetch.
     */
    orderBy?: Enumerable<AddOnOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddOns.
     */
    cursor?: AddOnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddOns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddOns.
     */
    skip?: number
    distinct?: Enumerable<AddOnScalarFieldEnum>
  }


  /**
   * AddOn create
   */
  export type AddOnCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * The data needed to create a AddOn.
     */
    data: XOR<AddOnCreateInput, AddOnUncheckedCreateInput>
  }


  /**
   * AddOn createMany
   */
  export type AddOnCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddOns.
     */
    data: Enumerable<AddOnCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AddOn update
   */
  export type AddOnUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * The data needed to update a AddOn.
     */
    data: XOR<AddOnUpdateInput, AddOnUncheckedUpdateInput>
    /**
     * Choose, which AddOn to update.
     */
    where: AddOnWhereUniqueInput
  }


  /**
   * AddOn updateMany
   */
  export type AddOnUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddOns.
     */
    data: XOR<AddOnUpdateManyMutationInput, AddOnUncheckedUpdateManyInput>
    /**
     * Filter which AddOns to update
     */
    where?: AddOnWhereInput
  }


  /**
   * AddOn upsert
   */
  export type AddOnUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * The filter to search for the AddOn to update in case it exists.
     */
    where: AddOnWhereUniqueInput
    /**
     * In case the AddOn found by the `where` argument doesn't exist, create a new AddOn with this data.
     */
    create: XOR<AddOnCreateInput, AddOnUncheckedCreateInput>
    /**
     * In case the AddOn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddOnUpdateInput, AddOnUncheckedUpdateInput>
  }


  /**
   * AddOn delete
   */
  export type AddOnDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
    /**
     * Filter which AddOn to delete.
     */
    where: AddOnWhereUniqueInput
  }


  /**
   * AddOn deleteMany
   */
  export type AddOnDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddOns to delete
     */
    where?: AddOnWhereInput
  }


  /**
   * AddOn without action
   */
  export type AddOnArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOn
     */
    select?: AddOnSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddOnInclude<ExtArgs> | null
  }



  /**
   * Model Payment
   */


  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    bookingId: string | null
    amount: number | null
    paymentMethod: string | null
    transactionId: string | null
    status: PaymentStatus | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    bookingId: string | null
    amount: number | null
    paymentMethod: string | null
    transactionId: string | null
    status: PaymentStatus | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    bookingId: number
    amount: number
    paymentMethod: number
    transactionId: number
    status: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    bookingId?: true
    amount?: true
    paymentMethod?: true
    transactionId?: true
    status?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    bookingId?: true
    amount?: true
    paymentMethod?: true
    transactionId?: true
    status?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    bookingId?: true
    amount?: true
    paymentMethod?: true
    transactionId?: true
    status?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: Enumerable<PaymentOrderByWithAggregationInput>
    by: PaymentScalarFieldEnum[]
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }


  export type PaymentGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    bookingId: string
    amount: number
    paymentMethod: string | null
    transactionId: string | null
    status: PaymentStatus
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    bookingId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    transactionId?: boolean
    status?: boolean
    user?: boolean | UserArgs<ExtArgs>
    booking?: boolean | BookingArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    bookingId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    transactionId?: boolean
    status?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    booking?: boolean | BookingArgs<ExtArgs>
  }


  type PaymentGetPayload<S extends boolean | null | undefined | PaymentArgs> = $Types.GetResult<PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PaymentFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Payment'> extends True ? Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PaymentFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Payment'> extends True ? Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PaymentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
    **/
    create<T extends PaymentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Payments.
     *     @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     *     @example
     *     // Create many Payments
     *     const payment = await prisma.payment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PaymentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
    **/
    delete<T extends PaymentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PaymentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PaymentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PaymentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
    **/
    upsert<T extends PaymentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    booking<T extends BookingArgs<ExtArgs> = {}>(args?: Subset<T, BookingArgs<ExtArgs>>): Prisma__BookingClient<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Payment base type for findUnique actions
   */
  export type PaymentFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUnique
   */
  export interface PaymentFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PaymentFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment base type for findFirst actions
   */
  export type PaymentFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }

  /**
   * Payment findFirst
   */
  export interface PaymentFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PaymentFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }


  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: Enumerable<PaymentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }


  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }


  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }


  /**
   * Payment without action
   */
  export type PaymentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstname: 'firstname',
    lastname: 'lastname',
    role: 'role',
    emailVerified: 'emailVerified',
    image: 'image',
    verificationToken: 'verificationToken'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const PackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    description: 'description',
    features: 'features',
    pricePerExtra: 'pricePerExtra'
  };

  export type PackageScalarFieldEnum = (typeof PackageScalarFieldEnum)[keyof typeof PackageScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    clientId: 'clientId',
    photographerId: 'photographerId',
    status: 'status',
    packageId: 'packageId',
    propertyType: 'propertyType',
    propertySize: 'propertySize',
    buildingName: 'buildingName',
    unitNumber: 'unitNumber',
    floor: 'floor',
    street: 'street',
    appointmentDate: 'appointmentDate',
    timeSlot: 'timeSlot',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    email: 'email',
    additionalDirections: 'additionalDirections',
    additionalRequests: 'additionalRequests',
    isPaid: 'isPaid'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const BookingStatusHistoryScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    userId: 'userId',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingStatusHistoryScalarFieldEnum = (typeof BookingStatusHistoryScalarFieldEnum)[keyof typeof BookingStatusHistoryScalarFieldEnum]


  export const AddOnScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    addonId: 'addonId',
    name: 'name',
    price: 'price'
  };

  export type AddOnScalarFieldEnum = (typeof AddOnScalarFieldEnum)[keyof typeof AddOnScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    bookingId: 'bookingId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    transactionId: 'transactionId',
    status: 'status'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    password?: StringFilter | string
    firstname?: StringFilter | string
    lastname?: StringFilter | string
    role?: EnumRoleFilter | Role
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    verificationToken?: StringNullableFilter | string | null
    accounts?: AccountListRelationFilter
    bookings?: BookingListRelationFilter
    assignedBookings?: BookingListRelationFilter
    payments?: PaymentListRelationFilter
    bookingStatusHistories?: BookingStatusHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    verificationToken?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    assignedBookings?: BookingOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    bookingStatusHistories?: BookingStatusHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    verificationToken?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    firstname?: StringWithAggregatesFilter | string
    lastname?: StringWithAggregatesFilter | string
    role?: EnumRoleWithAggregatesFilter | Role
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    verificationToken?: StringNullableWithAggregatesFilter | string | null
  }

  export type AccountWhereInput = {
    AND?: Enumerable<AccountWhereInput>
    OR?: Enumerable<AccountWhereInput>
    NOT?: Enumerable<AccountWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = {
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
  }

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    providerAccountId?: StringWithAggregatesFilter | string
    refresh_token?: StringNullableWithAggregatesFilter | string | null
    access_token?: StringNullableWithAggregatesFilter | string | null
    expires_at?: IntNullableWithAggregatesFilter | number | null
    token_type?: StringNullableWithAggregatesFilter | string | null
    scope?: StringNullableWithAggregatesFilter | string | null
    id_token?: StringNullableWithAggregatesFilter | string | null
  }

  export type VerificationTokenWhereInput = {
    AND?: Enumerable<VerificationTokenWhereInput>
    OR?: Enumerable<VerificationTokenWhereInput>
    NOT?: Enumerable<VerificationTokenWhereInput>
    identifier?: StringFilter | string
    token?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = {
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
  }

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    identifier?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type PackageWhereInput = {
    AND?: Enumerable<PackageWhereInput>
    OR?: Enumerable<PackageWhereInput>
    NOT?: Enumerable<PackageWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    price?: FloatFilter | number
    description?: StringFilter | string
    features?: StringNullableListFilter
    pricePerExtra?: FloatNullableFilter | number | null
    bookings?: BookingListRelationFilter
  }

  export type PackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrderInput | SortOrder
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type PackageWhereUniqueInput = {
    id?: number
  }

  export type PackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrderInput | SortOrder
    _count?: PackageCountOrderByAggregateInput
    _avg?: PackageAvgOrderByAggregateInput
    _max?: PackageMaxOrderByAggregateInput
    _min?: PackageMinOrderByAggregateInput
    _sum?: PackageSumOrderByAggregateInput
  }

  export type PackageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PackageScalarWhereWithAggregatesInput>
    OR?: Enumerable<PackageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PackageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    price?: FloatWithAggregatesFilter | number
    description?: StringWithAggregatesFilter | string
    features?: StringNullableListFilter
    pricePerExtra?: FloatNullableWithAggregatesFilter | number | null
  }

  export type BookingWhereInput = {
    AND?: Enumerable<BookingWhereInput>
    OR?: Enumerable<BookingWhereInput>
    NOT?: Enumerable<BookingWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    clientId?: StringFilter | string
    photographerId?: StringNullableFilter | string | null
    status?: EnumBookingStatusFilter | BookingStatus
    packageId?: IntFilter | number
    propertyType?: StringFilter | string
    propertySize?: StringFilter | string
    buildingName?: StringFilter | string
    unitNumber?: StringFilter | string
    floor?: StringFilter | string
    street?: StringFilter | string
    appointmentDate?: DateTimeFilter | Date | string
    timeSlot?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    phoneNumber?: StringFilter | string
    email?: StringFilter | string
    additionalDirections?: StringNullableFilter | string | null
    additionalRequests?: StringNullableFilter | string | null
    isPaid?: BoolFilter | boolean
    client?: XOR<UserRelationFilter, UserWhereInput>
    photographer?: XOR<UserRelationFilter, UserWhereInput> | null
    statusHistories?: BookingStatusHistoryListRelationFilter
    package?: XOR<PackageRelationFilter, PackageWhereInput>
    addOns?: AddOnListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientId?: SortOrder
    photographerId?: SortOrderInput | SortOrder
    status?: SortOrder
    packageId?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    appointmentDate?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalDirections?: SortOrderInput | SortOrder
    additionalRequests?: SortOrderInput | SortOrder
    isPaid?: SortOrder
    client?: UserOrderByWithRelationInput
    photographer?: UserOrderByWithRelationInput
    statusHistories?: BookingStatusHistoryOrderByRelationAggregateInput
    package?: PackageOrderByWithRelationInput
    addOns?: AddOnOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type BookingWhereUniqueInput = {
    id?: string
  }

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientId?: SortOrder
    photographerId?: SortOrderInput | SortOrder
    status?: SortOrder
    packageId?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    appointmentDate?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalDirections?: SortOrderInput | SortOrder
    additionalRequests?: SortOrderInput | SortOrder
    isPaid?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BookingScalarWhereWithAggregatesInput>
    OR?: Enumerable<BookingScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BookingScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    clientId?: StringWithAggregatesFilter | string
    photographerId?: StringNullableWithAggregatesFilter | string | null
    status?: EnumBookingStatusWithAggregatesFilter | BookingStatus
    packageId?: IntWithAggregatesFilter | number
    propertyType?: StringWithAggregatesFilter | string
    propertySize?: StringWithAggregatesFilter | string
    buildingName?: StringWithAggregatesFilter | string
    unitNumber?: StringWithAggregatesFilter | string
    floor?: StringWithAggregatesFilter | string
    street?: StringWithAggregatesFilter | string
    appointmentDate?: DateTimeWithAggregatesFilter | Date | string
    timeSlot?: StringWithAggregatesFilter | string
    firstName?: StringWithAggregatesFilter | string
    lastName?: StringWithAggregatesFilter | string
    phoneNumber?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    additionalDirections?: StringNullableWithAggregatesFilter | string | null
    additionalRequests?: StringNullableWithAggregatesFilter | string | null
    isPaid?: BoolWithAggregatesFilter | boolean
  }

  export type BookingStatusHistoryWhereInput = {
    AND?: Enumerable<BookingStatusHistoryWhereInput>
    OR?: Enumerable<BookingStatusHistoryWhereInput>
    NOT?: Enumerable<BookingStatusHistoryWhereInput>
    id?: StringFilter | string
    bookingId?: StringFilter | string
    userId?: StringFilter | string
    status?: EnumBookingStatusFilter | BookingStatus
    notes?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BookingStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type BookingStatusHistoryWhereUniqueInput = {
    id?: string
  }

  export type BookingStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingStatusHistoryCountOrderByAggregateInput
    _max?: BookingStatusHistoryMaxOrderByAggregateInput
    _min?: BookingStatusHistoryMinOrderByAggregateInput
  }

  export type BookingStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BookingStatusHistoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<BookingStatusHistoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BookingStatusHistoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    bookingId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    status?: EnumBookingStatusWithAggregatesFilter | BookingStatus
    notes?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type AddOnWhereInput = {
    AND?: Enumerable<AddOnWhereInput>
    OR?: Enumerable<AddOnWhereInput>
    NOT?: Enumerable<AddOnWhereInput>
    id?: StringFilter | string
    bookingId?: StringFilter | string
    addonId?: StringFilter | string
    name?: StringFilter | string
    price?: FloatFilter | number
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }

  export type AddOnOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    addonId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type AddOnWhereUniqueInput = {
    id?: string
  }

  export type AddOnOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    addonId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    _count?: AddOnCountOrderByAggregateInput
    _avg?: AddOnAvgOrderByAggregateInput
    _max?: AddOnMaxOrderByAggregateInput
    _min?: AddOnMinOrderByAggregateInput
    _sum?: AddOnSumOrderByAggregateInput
  }

  export type AddOnScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AddOnScalarWhereWithAggregatesInput>
    OR?: Enumerable<AddOnScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AddOnScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    bookingId?: StringWithAggregatesFilter | string
    addonId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    price?: FloatWithAggregatesFilter | number
  }

  export type PaymentWhereInput = {
    AND?: Enumerable<PaymentWhereInput>
    OR?: Enumerable<PaymentWhereInput>
    NOT?: Enumerable<PaymentWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    bookingId?: StringFilter | string
    amount?: FloatFilter | number
    paymentMethod?: StringNullableFilter | string | null
    transactionId?: StringNullableFilter | string | null
    status?: EnumPaymentStatusFilter | PaymentStatus
    user?: XOR<UserRelationFilter, UserWhereInput>
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    user?: UserOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = {
    id?: string
  }

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PaymentScalarWhereWithAggregatesInput>
    OR?: Enumerable<PaymentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PaymentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringWithAggregatesFilter | string
    bookingId?: StringWithAggregatesFilter | string
    amount?: FloatWithAggregatesFilter | number
    paymentMethod?: StringNullableWithAggregatesFilter | string | null
    transactionId?: StringNullableWithAggregatesFilter | string | null
    status?: EnumPaymentStatusWithAggregatesFilter | PaymentStatus
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutClientInput
    assignedBookings?: BookingCreateNestedManyWithoutPhotographerInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
    assignedBookings?: BookingUncheckedCreateNestedManyWithoutPhotographerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUncheckedUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageCreateInput = {
    name: string
    price: number
    description: string
    features?: PackageCreatefeaturesInput | Enumerable<string>
    pricePerExtra?: number | null
    bookings?: BookingCreateNestedManyWithoutPackageInput
  }

  export type PackageUncheckedCreateInput = {
    id?: number
    name: string
    price: number
    description: string
    features?: PackageCreatefeaturesInput | Enumerable<string>
    pricePerExtra?: number | null
    bookings?: BookingUncheckedCreateNestedManyWithoutPackageInput
  }

  export type PackageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: PackageUpdatefeaturesInput | Enumerable<string>
    pricePerExtra?: NullableFloatFieldUpdateOperationsInput | number | null
    bookings?: BookingUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: PackageUpdatefeaturesInput | Enumerable<string>
    pricePerExtra?: NullableFloatFieldUpdateOperationsInput | number | null
    bookings?: BookingUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type PackageCreateManyInput = {
    id?: number
    name: string
    price: number
    description: string
    features?: PackageCreatefeaturesInput | Enumerable<string>
    pricePerExtra?: number | null
  }

  export type PackageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: PackageUpdatefeaturesInput | Enumerable<string>
    pricePerExtra?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PackageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: PackageUpdatefeaturesInput | Enumerable<string>
    pricePerExtra?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BookingCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    client: UserCreateNestedOneWithoutBookingsInput
    photographer?: UserCreateNestedOneWithoutAssignedBookingsInput
    statusHistories?: BookingStatusHistoryCreateNestedManyWithoutBookingInput
    package: PackageCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingInput
    payments?: PaymentCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    statusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    client?: UserUpdateOneRequiredWithoutBookingsNestedInput
    photographer?: UserUpdateOneWithoutAssignedBookingsNestedInput
    statusHistories?: BookingStatusHistoryUpdateManyWithoutBookingNestedInput
    package?: PackageUpdateOneRequiredWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingNestedInput
    payments?: PaymentUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    statusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput
    addOns?: AddOnUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BookingStatusHistoryCreateInput = {
    id?: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutStatusHistoriesInput
    user: UserCreateNestedOneWithoutBookingStatusHistoriesInput
  }

  export type BookingStatusHistoryUncheckedCreateInput = {
    id?: string
    bookingId: string
    userId: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutStatusHistoriesNestedInput
    user?: UserUpdateOneRequiredWithoutBookingStatusHistoriesNestedInput
  }

  export type BookingStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingStatusHistoryCreateManyInput = {
    id?: string
    bookingId: string
    userId: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddOnCreateInput = {
    id?: string
    addonId: string
    name: string
    price: number
    booking: BookingCreateNestedOneWithoutAddOnsInput
  }

  export type AddOnUncheckedCreateInput = {
    id?: string
    bookingId: string
    addonId: string
    name: string
    price: number
  }

  export type AddOnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    booking?: BookingUpdateOneRequiredWithoutAddOnsNestedInput
  }

  export type AddOnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnCreateManyInput = {
    id?: string
    bookingId: string
    addonId: string
    name: string
    price: number
  }

  export type AddOnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type PaymentCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
    user: UserCreateNestedOneWithoutPaymentsInput
    booking: BookingCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    bookingId: string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    booking?: BookingUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
  }

  export type PaymentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    bookingId: string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type BookingStatusHistoryListRelationFilter = {
    every?: BookingStatusHistoryWhereInput
    some?: BookingStatusHistoryWhereInput
    none?: BookingStatusHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    verificationToken?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    verificationToken?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    verificationToken?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type PackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type PackageAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type PackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type PackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type PackageSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type EnumBookingStatusFilter = {
    equals?: BookingStatus
    in?: Enumerable<BookingStatus>
    notIn?: Enumerable<BookingStatus>
    not?: NestedEnumBookingStatusFilter | BookingStatus
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type PackageRelationFilter = {
    is?: PackageWhereInput | null
    isNot?: PackageWhereInput | null
  }

  export type AddOnListRelationFilter = {
    every?: AddOnWhereInput
    some?: AddOnWhereInput
    none?: AddOnWhereInput
  }

  export type AddOnOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientId?: SortOrder
    photographerId?: SortOrder
    status?: SortOrder
    packageId?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    appointmentDate?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalDirections?: SortOrder
    additionalRequests?: SortOrder
    isPaid?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    packageId?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientId?: SortOrder
    photographerId?: SortOrder
    status?: SortOrder
    packageId?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    appointmentDate?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalDirections?: SortOrder
    additionalRequests?: SortOrder
    isPaid?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientId?: SortOrder
    photographerId?: SortOrder
    status?: SortOrder
    packageId?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    appointmentDate?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalDirections?: SortOrder
    additionalRequests?: SortOrder
    isPaid?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    packageId?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter = {
    equals?: BookingStatus
    in?: Enumerable<BookingStatus>
    notIn?: Enumerable<BookingStatus>
    not?: NestedEnumBookingStatusWithAggregatesFilter | BookingStatus
    _count?: NestedIntFilter
    _min?: NestedEnumBookingStatusFilter
    _max?: NestedEnumBookingStatusFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type BookingRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type BookingStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddOnCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    addonId?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type AddOnAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type AddOnMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    addonId?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type AddOnMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    addonId?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type AddOnSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumPaymentStatusFilter = {
    equals?: PaymentStatus
    in?: Enumerable<PaymentStatus>
    notIn?: Enumerable<PaymentStatus>
    not?: NestedEnumPaymentStatusFilter | PaymentStatus
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    bookingId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter = {
    equals?: PaymentStatus
    in?: Enumerable<PaymentStatus>
    notIn?: Enumerable<PaymentStatus>
    not?: NestedEnumPaymentStatusWithAggregatesFilter | PaymentStatus
    _count?: NestedIntFilter
    _min?: NestedEnumPaymentStatusFilter
    _max?: NestedEnumPaymentStatusFilter
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type BookingCreateNestedManyWithoutClientInput = {
    create?: XOR<Enumerable<BookingCreateWithoutClientInput>, Enumerable<BookingUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutClientInput>
    createMany?: BookingCreateManyClientInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingCreateNestedManyWithoutPhotographerInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPhotographerInput>, Enumerable<BookingUncheckedCreateWithoutPhotographerInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPhotographerInput>
    createMany?: BookingCreateManyPhotographerInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type BookingStatusHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutUserInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutUserInput>
    createMany?: BookingStatusHistoryCreateManyUserInputEnvelope
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<Enumerable<BookingCreateWithoutClientInput>, Enumerable<BookingUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutClientInput>
    createMany?: BookingCreateManyClientInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutPhotographerInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPhotographerInput>, Enumerable<BookingUncheckedCreateWithoutPhotographerInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPhotographerInput>
    createMany?: BookingCreateManyPhotographerInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type BookingStatusHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutUserInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutUserInput>
    createMany?: BookingStatusHistoryCreateManyUserInputEnvelope
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type BookingUpdateManyWithoutClientNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutClientInput>, Enumerable<BookingUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutClientInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutClientInput>
    createMany?: BookingCreateManyClientInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutClientInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutClientInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingUpdateManyWithoutPhotographerNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPhotographerInput>, Enumerable<BookingUncheckedCreateWithoutPhotographerInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPhotographerInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutPhotographerInput>
    createMany?: BookingCreateManyPhotographerInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutPhotographerInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutPhotographerInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type BookingStatusHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutUserInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BookingStatusHistoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BookingStatusHistoryCreateManyUserInputEnvelope
    set?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    disconnect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    delete?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    update?: Enumerable<BookingStatusHistoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BookingStatusHistoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BookingStatusHistoryScalarWhereInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutClientInput>, Enumerable<BookingUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutClientInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutClientInput>
    createMany?: BookingCreateManyClientInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutClientInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutClientInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutPhotographerNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPhotographerInput>, Enumerable<BookingUncheckedCreateWithoutPhotographerInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPhotographerInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutPhotographerInput>
    createMany?: BookingCreateManyPhotographerInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutPhotographerInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutPhotographerInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type BookingStatusHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutUserInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BookingStatusHistoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BookingStatusHistoryCreateManyUserInputEnvelope
    set?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    disconnect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    delete?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    update?: Enumerable<BookingStatusHistoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BookingStatusHistoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BookingStatusHistoryScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PackageCreatefeaturesInput = {
    set: Enumerable<string>
  }

  export type BookingCreateNestedManyWithoutPackageInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPackageInput>, Enumerable<BookingUncheckedCreateWithoutPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPackageInput>
    createMany?: BookingCreateManyPackageInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutPackageInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPackageInput>, Enumerable<BookingUncheckedCreateWithoutPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPackageInput>
    createMany?: BookingCreateManyPackageInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PackageUpdatefeaturesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookingUpdateManyWithoutPackageNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPackageInput>, Enumerable<BookingUncheckedCreateWithoutPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPackageInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutPackageInput>
    createMany?: BookingCreateManyPackageInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutPackageInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutPackageInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookingUncheckedUpdateManyWithoutPackageNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPackageInput>, Enumerable<BookingUncheckedCreateWithoutPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPackageInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutPackageInput>
    createMany?: BookingCreateManyPackageInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutPackageInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutPackageInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedBookingsInput = {
    create?: XOR<UserCreateWithoutAssignedBookingsInput, UserUncheckedCreateWithoutAssignedBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type BookingStatusHistoryCreateNestedManyWithoutBookingInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutBookingInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutBookingInput>
    createMany?: BookingStatusHistoryCreateManyBookingInputEnvelope
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
  }

  export type PackageCreateNestedOneWithoutBookingsInput = {
    create?: XOR<PackageCreateWithoutBookingsInput, PackageUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PackageCreateOrConnectWithoutBookingsInput
    connect?: PackageWhereUniqueInput
  }

  export type AddOnCreateNestedManyWithoutBookingInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingInput>, Enumerable<AddOnUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingInput>
    createMany?: AddOnCreateManyBookingInputEnvelope
    connect?: Enumerable<AddOnWhereUniqueInput>
  }

  export type PaymentCreateNestedManyWithoutBookingInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutBookingInput>, Enumerable<PaymentUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutBookingInput>
    createMany?: PaymentCreateManyBookingInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutBookingInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutBookingInput>
    createMany?: BookingStatusHistoryCreateManyBookingInputEnvelope
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
  }

  export type AddOnUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingInput>, Enumerable<AddOnUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingInput>
    createMany?: AddOnCreateManyBookingInputEnvelope
    connect?: Enumerable<AddOnWhereUniqueInput>
  }

  export type PaymentUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutBookingInput>, Enumerable<PaymentUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutBookingInput>
    createMany?: PaymentCreateManyBookingInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: BookingStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateOneWithoutAssignedBookingsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedBookingsInput, UserUncheckedCreateWithoutAssignedBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedBookingsInput
    upsert?: UserUpsertWithoutAssignedBookingsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAssignedBookingsInput, UserUncheckedUpdateWithoutAssignedBookingsInput>
  }

  export type BookingStatusHistoryUpdateManyWithoutBookingNestedInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutBookingInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutBookingInput>
    upsert?: Enumerable<BookingStatusHistoryUpsertWithWhereUniqueWithoutBookingInput>
    createMany?: BookingStatusHistoryCreateManyBookingInputEnvelope
    set?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    disconnect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    delete?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    update?: Enumerable<BookingStatusHistoryUpdateWithWhereUniqueWithoutBookingInput>
    updateMany?: Enumerable<BookingStatusHistoryUpdateManyWithWhereWithoutBookingInput>
    deleteMany?: Enumerable<BookingStatusHistoryScalarWhereInput>
  }

  export type PackageUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<PackageCreateWithoutBookingsInput, PackageUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PackageCreateOrConnectWithoutBookingsInput
    upsert?: PackageUpsertWithoutBookingsInput
    connect?: PackageWhereUniqueInput
    update?: XOR<PackageUpdateWithoutBookingsInput, PackageUncheckedUpdateWithoutBookingsInput>
  }

  export type AddOnUpdateManyWithoutBookingNestedInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingInput>, Enumerable<AddOnUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingInput>
    upsert?: Enumerable<AddOnUpsertWithWhereUniqueWithoutBookingInput>
    createMany?: AddOnCreateManyBookingInputEnvelope
    set?: Enumerable<AddOnWhereUniqueInput>
    disconnect?: Enumerable<AddOnWhereUniqueInput>
    delete?: Enumerable<AddOnWhereUniqueInput>
    connect?: Enumerable<AddOnWhereUniqueInput>
    update?: Enumerable<AddOnUpdateWithWhereUniqueWithoutBookingInput>
    updateMany?: Enumerable<AddOnUpdateManyWithWhereWithoutBookingInput>
    deleteMany?: Enumerable<AddOnScalarWhereInput>
  }

  export type PaymentUpdateManyWithoutBookingNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutBookingInput>, Enumerable<PaymentUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutBookingInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutBookingInput>
    createMany?: PaymentCreateManyBookingInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutBookingInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutBookingInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<Enumerable<BookingStatusHistoryCreateWithoutBookingInput>, Enumerable<BookingStatusHistoryUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<BookingStatusHistoryCreateOrConnectWithoutBookingInput>
    upsert?: Enumerable<BookingStatusHistoryUpsertWithWhereUniqueWithoutBookingInput>
    createMany?: BookingStatusHistoryCreateManyBookingInputEnvelope
    set?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    disconnect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    delete?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    connect?: Enumerable<BookingStatusHistoryWhereUniqueInput>
    update?: Enumerable<BookingStatusHistoryUpdateWithWhereUniqueWithoutBookingInput>
    updateMany?: Enumerable<BookingStatusHistoryUpdateManyWithWhereWithoutBookingInput>
    deleteMany?: Enumerable<BookingStatusHistoryScalarWhereInput>
  }

  export type AddOnUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingInput>, Enumerable<AddOnUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingInput>
    upsert?: Enumerable<AddOnUpsertWithWhereUniqueWithoutBookingInput>
    createMany?: AddOnCreateManyBookingInputEnvelope
    set?: Enumerable<AddOnWhereUniqueInput>
    disconnect?: Enumerable<AddOnWhereUniqueInput>
    delete?: Enumerable<AddOnWhereUniqueInput>
    connect?: Enumerable<AddOnWhereUniqueInput>
    update?: Enumerable<AddOnUpdateWithWhereUniqueWithoutBookingInput>
    updateMany?: Enumerable<AddOnUpdateManyWithWhereWithoutBookingInput>
    deleteMany?: Enumerable<AddOnScalarWhereInput>
  }

  export type PaymentUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutBookingInput>, Enumerable<PaymentUncheckedCreateWithoutBookingInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutBookingInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutBookingInput>
    createMany?: PaymentCreateManyBookingInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutBookingInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutBookingInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type BookingCreateNestedOneWithoutStatusHistoriesInput = {
    create?: XOR<BookingCreateWithoutStatusHistoriesInput, BookingUncheckedCreateWithoutStatusHistoriesInput>
    connectOrCreate?: BookingCreateOrConnectWithoutStatusHistoriesInput
    connect?: BookingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBookingStatusHistoriesInput = {
    create?: XOR<UserCreateWithoutBookingStatusHistoriesInput, UserUncheckedCreateWithoutBookingStatusHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingStatusHistoriesInput
    connect?: UserWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutStatusHistoriesNestedInput = {
    create?: XOR<BookingCreateWithoutStatusHistoriesInput, BookingUncheckedCreateWithoutStatusHistoriesInput>
    connectOrCreate?: BookingCreateOrConnectWithoutStatusHistoriesInput
    upsert?: BookingUpsertWithoutStatusHistoriesInput
    connect?: BookingWhereUniqueInput
    update?: XOR<BookingUpdateWithoutStatusHistoriesInput, BookingUncheckedUpdateWithoutStatusHistoriesInput>
  }

  export type UserUpdateOneRequiredWithoutBookingStatusHistoriesNestedInput = {
    create?: XOR<UserCreateWithoutBookingStatusHistoriesInput, UserUncheckedCreateWithoutBookingStatusHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingStatusHistoriesInput
    upsert?: UserUpsertWithoutBookingStatusHistoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBookingStatusHistoriesInput, UserUncheckedUpdateWithoutBookingStatusHistoriesInput>
  }

  export type BookingCreateNestedOneWithoutAddOnsInput = {
    create?: XOR<BookingCreateWithoutAddOnsInput, BookingUncheckedCreateWithoutAddOnsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutAddOnsInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutAddOnsNestedInput = {
    create?: XOR<BookingCreateWithoutAddOnsInput, BookingUncheckedCreateWithoutAddOnsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutAddOnsInput
    upsert?: BookingUpsertWithoutAddOnsInput
    connect?: BookingWhereUniqueInput
    update?: XOR<BookingUpdateWithoutAddOnsInput, BookingUncheckedUpdateWithoutAddOnsInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentsInput
    connect?: BookingWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: PaymentStatus
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type BookingUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentsInput
    upsert?: BookingUpsertWithoutPaymentsInput
    connect?: BookingWhereUniqueInput
    update?: XOR<BookingUpdateWithoutPaymentsInput, BookingUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type NestedEnumBookingStatusFilter = {
    equals?: BookingStatus
    in?: Enumerable<BookingStatus>
    notIn?: Enumerable<BookingStatus>
    not?: NestedEnumBookingStatusFilter | BookingStatus
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumBookingStatusWithAggregatesFilter = {
    equals?: BookingStatus
    in?: Enumerable<BookingStatus>
    notIn?: Enumerable<BookingStatus>
    not?: NestedEnumBookingStatusWithAggregatesFilter | BookingStatus
    _count?: NestedIntFilter
    _min?: NestedEnumBookingStatusFilter
    _max?: NestedEnumBookingStatusFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedEnumPaymentStatusFilter = {
    equals?: PaymentStatus
    in?: Enumerable<PaymentStatus>
    notIn?: Enumerable<PaymentStatus>
    not?: NestedEnumPaymentStatusFilter | PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter = {
    equals?: PaymentStatus
    in?: Enumerable<PaymentStatus>
    notIn?: Enumerable<PaymentStatus>
    not?: NestedEnumPaymentStatusWithAggregatesFilter | PaymentStatus
    _count?: NestedIntFilter
    _min?: NestedEnumPaymentStatusFilter
    _max?: NestedEnumPaymentStatusFilter
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: Enumerable<AccountCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutClientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    photographer?: UserCreateNestedOneWithoutAssignedBookingsInput
    statusHistories?: BookingStatusHistoryCreateNestedManyWithoutBookingInput
    package: PackageCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingInput
    payments?: PaymentCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutClientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    statusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutClientInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput>
  }

  export type BookingCreateManyClientInputEnvelope = {
    data: Enumerable<BookingCreateManyClientInput>
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutPhotographerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    client: UserCreateNestedOneWithoutBookingsInput
    statusHistories?: BookingStatusHistoryCreateNestedManyWithoutBookingInput
    package: PackageCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingInput
    payments?: PaymentCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPhotographerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    statusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPhotographerInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPhotographerInput, BookingUncheckedCreateWithoutPhotographerInput>
  }

  export type BookingCreateManyPhotographerInputEnvelope = {
    data: Enumerable<BookingCreateManyPhotographerInput>
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
    booking: BookingCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    bookingId: string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: Enumerable<PaymentCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type BookingStatusHistoryCreateWithoutUserInput = {
    id?: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutStatusHistoriesInput
  }

  export type BookingStatusHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    bookingId: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingStatusHistoryCreateOrConnectWithoutUserInput = {
    where: BookingStatusHistoryWhereUniqueInput
    create: XOR<BookingStatusHistoryCreateWithoutUserInput, BookingStatusHistoryUncheckedCreateWithoutUserInput>
  }

  export type BookingStatusHistoryCreateManyUserInputEnvelope = {
    data: Enumerable<BookingStatusHistoryCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutAccountsInput>
  }

  export type AccountScalarWhereInput = {
    AND?: Enumerable<AccountScalarWhereInput>
    OR?: Enumerable<AccountScalarWhereInput>
    NOT?: Enumerable<AccountScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
  }

  export type BookingUpsertWithWhereUniqueWithoutClientInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutClientInput, BookingUncheckedUpdateWithoutClientInput>
    create: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutClientInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutClientInput, BookingUncheckedUpdateWithoutClientInput>
  }

  export type BookingUpdateManyWithWhereWithoutClientInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type BookingScalarWhereInput = {
    AND?: Enumerable<BookingScalarWhereInput>
    OR?: Enumerable<BookingScalarWhereInput>
    NOT?: Enumerable<BookingScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    clientId?: StringFilter | string
    photographerId?: StringNullableFilter | string | null
    status?: EnumBookingStatusFilter | BookingStatus
    packageId?: IntFilter | number
    propertyType?: StringFilter | string
    propertySize?: StringFilter | string
    buildingName?: StringFilter | string
    unitNumber?: StringFilter | string
    floor?: StringFilter | string
    street?: StringFilter | string
    appointmentDate?: DateTimeFilter | Date | string
    timeSlot?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    phoneNumber?: StringFilter | string
    email?: StringFilter | string
    additionalDirections?: StringNullableFilter | string | null
    additionalRequests?: StringNullableFilter | string | null
    isPaid?: BoolFilter | boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutPhotographerInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPhotographerInput, BookingUncheckedUpdateWithoutPhotographerInput>
    create: XOR<BookingCreateWithoutPhotographerInput, BookingUncheckedCreateWithoutPhotographerInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPhotographerInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPhotographerInput, BookingUncheckedUpdateWithoutPhotographerInput>
  }

  export type BookingUpdateManyWithWhereWithoutPhotographerInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutAssignedBookingsInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutPaymentsInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: Enumerable<PaymentScalarWhereInput>
    OR?: Enumerable<PaymentScalarWhereInput>
    NOT?: Enumerable<PaymentScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    bookingId?: StringFilter | string
    amount?: FloatFilter | number
    paymentMethod?: StringNullableFilter | string | null
    transactionId?: StringNullableFilter | string | null
    status?: EnumPaymentStatusFilter | PaymentStatus
  }

  export type BookingStatusHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingStatusHistoryWhereUniqueInput
    update: XOR<BookingStatusHistoryUpdateWithoutUserInput, BookingStatusHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<BookingStatusHistoryCreateWithoutUserInput, BookingStatusHistoryUncheckedCreateWithoutUserInput>
  }

  export type BookingStatusHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingStatusHistoryWhereUniqueInput
    data: XOR<BookingStatusHistoryUpdateWithoutUserInput, BookingStatusHistoryUncheckedUpdateWithoutUserInput>
  }

  export type BookingStatusHistoryUpdateManyWithWhereWithoutUserInput = {
    where: BookingStatusHistoryScalarWhereInput
    data: XOR<BookingStatusHistoryUpdateManyMutationInput, BookingStatusHistoryUncheckedUpdateManyWithoutBookingStatusHistoriesInput>
  }

  export type BookingStatusHistoryScalarWhereInput = {
    AND?: Enumerable<BookingStatusHistoryScalarWhereInput>
    OR?: Enumerable<BookingStatusHistoryScalarWhereInput>
    NOT?: Enumerable<BookingStatusHistoryScalarWhereInput>
    id?: StringFilter | string
    bookingId?: StringFilter | string
    userId?: StringFilter | string
    status?: EnumBookingStatusFilter | BookingStatus
    notes?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    bookings?: BookingCreateNestedManyWithoutClientInput
    assignedBookings?: BookingCreateNestedManyWithoutPhotographerInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
    assignedBookings?: BookingUncheckedCreateNestedManyWithoutPhotographerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: BookingUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUncheckedUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingCreateWithoutPackageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    client: UserCreateNestedOneWithoutBookingsInput
    photographer?: UserCreateNestedOneWithoutAssignedBookingsInput
    statusHistories?: BookingStatusHistoryCreateNestedManyWithoutBookingInput
    addOns?: AddOnCreateNestedManyWithoutBookingInput
    payments?: PaymentCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPackageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    statusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPackageInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPackageInput, BookingUncheckedCreateWithoutPackageInput>
  }

  export type BookingCreateManyPackageInputEnvelope = {
    data: Enumerable<BookingCreateManyPackageInput>
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutPackageInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPackageInput, BookingUncheckedUpdateWithoutPackageInput>
    create: XOR<BookingCreateWithoutPackageInput, BookingUncheckedCreateWithoutPackageInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPackageInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPackageInput, BookingUncheckedUpdateWithoutPackageInput>
  }

  export type BookingUpdateManyWithWhereWithoutPackageInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type UserCreateWithoutBookingsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    assignedBookings?: BookingCreateNestedManyWithoutPhotographerInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    assignedBookings?: BookingUncheckedCreateNestedManyWithoutPhotographerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type UserCreateWithoutAssignedBookingsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutClientInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignedBookingsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignedBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedBookingsInput, UserUncheckedCreateWithoutAssignedBookingsInput>
  }

  export type BookingStatusHistoryCreateWithoutBookingInput = {
    id?: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBookingStatusHistoriesInput
  }

  export type BookingStatusHistoryUncheckedCreateWithoutBookingInput = {
    id?: string
    userId: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingStatusHistoryCreateOrConnectWithoutBookingInput = {
    where: BookingStatusHistoryWhereUniqueInput
    create: XOR<BookingStatusHistoryCreateWithoutBookingInput, BookingStatusHistoryUncheckedCreateWithoutBookingInput>
  }

  export type BookingStatusHistoryCreateManyBookingInputEnvelope = {
    data: Enumerable<BookingStatusHistoryCreateManyBookingInput>
    skipDuplicates?: boolean
  }

  export type PackageCreateWithoutBookingsInput = {
    name: string
    price: number
    description: string
    features?: PackageCreatefeaturesInput | Enumerable<string>
    pricePerExtra?: number | null
  }

  export type PackageUncheckedCreateWithoutBookingsInput = {
    id?: number
    name: string
    price: number
    description: string
    features?: PackageCreatefeaturesInput | Enumerable<string>
    pricePerExtra?: number | null
  }

  export type PackageCreateOrConnectWithoutBookingsInput = {
    where: PackageWhereUniqueInput
    create: XOR<PackageCreateWithoutBookingsInput, PackageUncheckedCreateWithoutBookingsInput>
  }

  export type AddOnCreateWithoutBookingInput = {
    id?: string
    addonId: string
    name: string
    price: number
  }

  export type AddOnUncheckedCreateWithoutBookingInput = {
    id?: string
    addonId: string
    name: string
    price: number
  }

  export type AddOnCreateOrConnectWithoutBookingInput = {
    where: AddOnWhereUniqueInput
    create: XOR<AddOnCreateWithoutBookingInput, AddOnUncheckedCreateWithoutBookingInput>
  }

  export type AddOnCreateManyBookingInputEnvelope = {
    data: Enumerable<AddOnCreateManyBookingInput>
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutBookingInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutBookingInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
  }

  export type PaymentCreateOrConnectWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type PaymentCreateManyBookingInputEnvelope = {
    data: Enumerable<PaymentCreateManyBookingInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    assignedBookings?: BookingUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    assignedBookings?: BookingUncheckedUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutAssignedBookingsInput = {
    update: XOR<UserUpdateWithoutAssignedBookingsInput, UserUncheckedUpdateWithoutAssignedBookingsInput>
    create: XOR<UserCreateWithoutAssignedBookingsInput, UserUncheckedCreateWithoutAssignedBookingsInput>
  }

  export type UserUpdateWithoutAssignedBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingStatusHistoryUpsertWithWhereUniqueWithoutBookingInput = {
    where: BookingStatusHistoryWhereUniqueInput
    update: XOR<BookingStatusHistoryUpdateWithoutBookingInput, BookingStatusHistoryUncheckedUpdateWithoutBookingInput>
    create: XOR<BookingStatusHistoryCreateWithoutBookingInput, BookingStatusHistoryUncheckedCreateWithoutBookingInput>
  }

  export type BookingStatusHistoryUpdateWithWhereUniqueWithoutBookingInput = {
    where: BookingStatusHistoryWhereUniqueInput
    data: XOR<BookingStatusHistoryUpdateWithoutBookingInput, BookingStatusHistoryUncheckedUpdateWithoutBookingInput>
  }

  export type BookingStatusHistoryUpdateManyWithWhereWithoutBookingInput = {
    where: BookingStatusHistoryScalarWhereInput
    data: XOR<BookingStatusHistoryUpdateManyMutationInput, BookingStatusHistoryUncheckedUpdateManyWithoutStatusHistoriesInput>
  }

  export type PackageUpsertWithoutBookingsInput = {
    update: XOR<PackageUpdateWithoutBookingsInput, PackageUncheckedUpdateWithoutBookingsInput>
    create: XOR<PackageCreateWithoutBookingsInput, PackageUncheckedCreateWithoutBookingsInput>
  }

  export type PackageUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: PackageUpdatefeaturesInput | Enumerable<string>
    pricePerExtra?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PackageUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: PackageUpdatefeaturesInput | Enumerable<string>
    pricePerExtra?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AddOnUpsertWithWhereUniqueWithoutBookingInput = {
    where: AddOnWhereUniqueInput
    update: XOR<AddOnUpdateWithoutBookingInput, AddOnUncheckedUpdateWithoutBookingInput>
    create: XOR<AddOnCreateWithoutBookingInput, AddOnUncheckedCreateWithoutBookingInput>
  }

  export type AddOnUpdateWithWhereUniqueWithoutBookingInput = {
    where: AddOnWhereUniqueInput
    data: XOR<AddOnUpdateWithoutBookingInput, AddOnUncheckedUpdateWithoutBookingInput>
  }

  export type AddOnUpdateManyWithWhereWithoutBookingInput = {
    where: AddOnScalarWhereInput
    data: XOR<AddOnUpdateManyMutationInput, AddOnUncheckedUpdateManyWithoutAddOnsInput>
  }

  export type AddOnScalarWhereInput = {
    AND?: Enumerable<AddOnScalarWhereInput>
    OR?: Enumerable<AddOnScalarWhereInput>
    NOT?: Enumerable<AddOnScalarWhereInput>
    id?: StringFilter | string
    bookingId?: StringFilter | string
    addonId?: StringFilter | string
    name?: StringFilter | string
    price?: FloatFilter | number
  }

  export type PaymentUpsertWithWhereUniqueWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUpdateManyWithWhereWithoutBookingInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutPaymentsInput>
  }

  export type BookingCreateWithoutStatusHistoriesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    client: UserCreateNestedOneWithoutBookingsInput
    photographer?: UserCreateNestedOneWithoutAssignedBookingsInput
    package: PackageCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingInput
    payments?: PaymentCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutStatusHistoriesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutStatusHistoriesInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutStatusHistoriesInput, BookingUncheckedCreateWithoutStatusHistoriesInput>
  }

  export type UserCreateWithoutBookingStatusHistoriesInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutClientInput
    assignedBookings?: BookingCreateNestedManyWithoutPhotographerInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingStatusHistoriesInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
    assignedBookings?: BookingUncheckedCreateNestedManyWithoutPhotographerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingStatusHistoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingStatusHistoriesInput, UserUncheckedCreateWithoutBookingStatusHistoriesInput>
  }

  export type BookingUpsertWithoutStatusHistoriesInput = {
    update: XOR<BookingUpdateWithoutStatusHistoriesInput, BookingUncheckedUpdateWithoutStatusHistoriesInput>
    create: XOR<BookingCreateWithoutStatusHistoriesInput, BookingUncheckedCreateWithoutStatusHistoriesInput>
  }

  export type BookingUpdateWithoutStatusHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    client?: UserUpdateOneRequiredWithoutBookingsNestedInput
    photographer?: UserUpdateOneWithoutAssignedBookingsNestedInput
    package?: PackageUpdateOneRequiredWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingNestedInput
    payments?: PaymentUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutStatusHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    addOns?: AddOnUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type UserUpsertWithoutBookingStatusHistoriesInput = {
    update: XOR<UserUpdateWithoutBookingStatusHistoriesInput, UserUncheckedUpdateWithoutBookingStatusHistoriesInput>
    create: XOR<UserCreateWithoutBookingStatusHistoriesInput, UserUncheckedCreateWithoutBookingStatusHistoriesInput>
  }

  export type UserUpdateWithoutBookingStatusHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingStatusHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUncheckedUpdateManyWithoutPhotographerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingCreateWithoutAddOnsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    client: UserCreateNestedOneWithoutBookingsInput
    photographer?: UserCreateNestedOneWithoutAssignedBookingsInput
    statusHistories?: BookingStatusHistoryCreateNestedManyWithoutBookingInput
    package: PackageCreateNestedOneWithoutBookingsInput
    payments?: PaymentCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutAddOnsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    statusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutAddOnsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutAddOnsInput, BookingUncheckedCreateWithoutAddOnsInput>
  }

  export type BookingUpsertWithoutAddOnsInput = {
    update: XOR<BookingUpdateWithoutAddOnsInput, BookingUncheckedUpdateWithoutAddOnsInput>
    create: XOR<BookingCreateWithoutAddOnsInput, BookingUncheckedCreateWithoutAddOnsInput>
  }

  export type BookingUpdateWithoutAddOnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    client?: UserUpdateOneRequiredWithoutBookingsNestedInput
    photographer?: UserUpdateOneWithoutAssignedBookingsNestedInput
    statusHistories?: BookingStatusHistoryUpdateManyWithoutBookingNestedInput
    package?: PackageUpdateOneRequiredWithoutBookingsNestedInput
    payments?: PaymentUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutAddOnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    statusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutClientInput
    assignedBookings?: BookingCreateNestedManyWithoutPhotographerInput
    bookingStatusHistories?: BookingStatusHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
    assignedBookings?: BookingUncheckedCreateNestedManyWithoutPhotographerInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type BookingCreateWithoutPaymentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    client: UserCreateNestedOneWithoutBookingsInput
    photographer?: UserCreateNestedOneWithoutAssignedBookingsInput
    statusHistories?: BookingStatusHistoryCreateNestedManyWithoutBookingInput
    package: PackageCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPaymentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
    statusHistories?: BookingStatusHistoryUncheckedCreateNestedManyWithoutBookingInput
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPaymentsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUpdateManyWithoutPhotographerNestedInput
    bookingStatusHistories?: BookingStatusHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
    assignedBookings?: BookingUncheckedUpdateManyWithoutPhotographerNestedInput
    bookingStatusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingUpsertWithoutPaymentsInput = {
    update: XOR<BookingUpdateWithoutPaymentsInput, BookingUncheckedUpdateWithoutPaymentsInput>
    create: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
  }

  export type BookingUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    client?: UserUpdateOneRequiredWithoutBookingsNestedInput
    photographer?: UserUpdateOneWithoutAssignedBookingsNestedInput
    statusHistories?: BookingStatusHistoryUpdateManyWithoutBookingNestedInput
    package?: PackageUpdateOneRequiredWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    statusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput
    addOns?: AddOnUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
  }

  export type BookingCreateManyClientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    photographerId?: string | null
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
  }

  export type BookingCreateManyPhotographerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    status?: BookingStatus
    packageId: number
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    bookingId: string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
  }

  export type BookingStatusHistoryCreateManyUserInput = {
    id?: string
    bookingId: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    photographer?: UserUpdateOneWithoutAssignedBookingsNestedInput
    statusHistories?: BookingStatusHistoryUpdateManyWithoutBookingNestedInput
    package?: PackageUpdateOneRequiredWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingNestedInput
    payments?: PaymentUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    statusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput
    addOns?: AddOnUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BookingUpdateWithoutPhotographerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    client?: UserUpdateOneRequiredWithoutBookingsNestedInput
    statusHistories?: BookingStatusHistoryUpdateManyWithoutBookingNestedInput
    package?: PackageUpdateOneRequiredWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingNestedInput
    payments?: PaymentUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPhotographerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    statusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput
    addOns?: AddOnUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutAssignedBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    packageId?: IntFieldUpdateOperationsInput | number
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
    booking?: BookingUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
  }

  export type PaymentUncheckedUpdateManyWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
  }

  export type BookingStatusHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutStatusHistoriesNestedInput
  }

  export type BookingStatusHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingStatusHistoryUncheckedUpdateManyWithoutBookingStatusHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyPackageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientId: string
    photographerId?: string | null
    status?: BookingStatus
    propertyType: string
    propertySize: string
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    appointmentDate: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalDirections?: string | null
    additionalRequests?: string | null
    isPaid?: boolean
  }

  export type BookingUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    client?: UserUpdateOneRequiredWithoutBookingsNestedInput
    photographer?: UserUpdateOneWithoutAssignedBookingsNestedInput
    statusHistories?: BookingStatusHistoryUpdateManyWithoutBookingNestedInput
    addOns?: AddOnUpdateManyWithoutBookingNestedInput
    payments?: PaymentUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientId?: StringFieldUpdateOperationsInput | string
    photographerId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalDirections?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    statusHistories?: BookingStatusHistoryUncheckedUpdateManyWithoutBookingNestedInput
    addOns?: AddOnUncheckedUpdateManyWithoutBookingNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingStatusHistoryCreateManyBookingInput = {
    id?: string
    userId: string
    status: BookingStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddOnCreateManyBookingInput = {
    id?: string
    addonId: string
    name: string
    price: number
  }

  export type PaymentCreateManyBookingInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    amount: number
    paymentMethod?: string | null
    transactionId?: string | null
    status?: PaymentStatus
  }

  export type BookingStatusHistoryUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookingStatusHistoriesNestedInput
  }

  export type BookingStatusHistoryUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingStatusHistoryUncheckedUpdateManyWithoutStatusHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddOnUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnUncheckedUpdateManyWithoutAddOnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    addonId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type PaymentUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | PaymentStatus
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}