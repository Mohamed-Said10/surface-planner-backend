
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
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber: string | null
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
export type BookingPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Booking"
  objects: {
    selectedPackage: SelectedPackagePayload<ExtArgs> | null
    propertyAddress: PropertyAddressPayload<ExtArgs> | null
    addOns: AddOnPayload<ExtArgs>[]
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: number
    selectedPackageId: number | null
    propertyAddressId: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo: string | null
    additionalRequests: string | null
    status: BookingStatus
    createdAt: Date
    updatedAt: Date
    userId: string
  }, ExtArgs["result"]["booking"]>
  composites: {}
}

/**
 * Model Booking
 * 
 */
export type Booking = runtime.Types.DefaultSelection<BookingPayload>
export type SelectedPackagePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "SelectedPackage"
  objects: {
    bookings: BookingPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
  }, ExtArgs["result"]["selectedPackage"]>
  composites: {}
}

/**
 * Model SelectedPackage
 * 
 */
export type SelectedPackage = runtime.Types.DefaultSelection<SelectedPackagePayload>
export type PropertyAddressPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "PropertyAddress"
  objects: {
    bookings: BookingPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    buildingName: string
    unitNumber: string
    floor: string
    street: string
  }, ExtArgs["result"]["propertyAddress"]>
  composites: {}
}

/**
 * Model PropertyAddress
 * 
 */
export type PropertyAddress = runtime.Types.DefaultSelection<PropertyAddressPayload>
export type AddOnPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "AddOn"
  objects: {
    bookings: BookingPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
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
  CREATED: 'CREATED',
  PHOTOGRAPHER_ASSIGNED: 'PHOTOGRAPHER_ASSIGNED',
  SHOOTING: 'SHOOTING',
  EDITING: 'EDITING',
  COMPLETED: 'COMPLETED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


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
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.selectedPackage`: Exposes CRUD operations for the **SelectedPackage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SelectedPackages
    * const selectedPackages = await prisma.selectedPackage.findMany()
    * ```
    */
  get selectedPackage(): Prisma.SelectedPackageDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.propertyAddress`: Exposes CRUD operations for the **PropertyAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyAddresses
    * const propertyAddresses = await prisma.propertyAddress.findMany()
    * ```
    */
  get propertyAddress(): Prisma.PropertyAddressDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.addOn`: Exposes CRUD operations for the **AddOn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddOns
    * const addOns = await prisma.addOn.findMany()
    * ```
    */
  get addOn(): Prisma.AddOnDelegate<GlobalReject, ExtArgs>;
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
    Booking: 'Booking',
    SelectedPackage: 'SelectedPackage',
    PropertyAddress: 'PropertyAddress',
    AddOn: 'AddOn'
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
      modelProps: 'user' | 'account' | 'verificationToken' | 'booking' | 'selectedPackage' | 'propertyAddress' | 'addOn'
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
      SelectedPackage: {
        payload: SelectedPackagePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.SelectedPackageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SelectedPackageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>
          }
          findFirst: {
            args: Prisma.SelectedPackageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SelectedPackageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>
          }
          findMany: {
            args: Prisma.SelectedPackageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>[]
          }
          create: {
            args: Prisma.SelectedPackageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>
          }
          createMany: {
            args: Prisma.SelectedPackageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SelectedPackageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>
          }
          update: {
            args: Prisma.SelectedPackageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>
          }
          deleteMany: {
            args: Prisma.SelectedPackageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SelectedPackageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SelectedPackageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SelectedPackagePayload>
          }
          aggregate: {
            args: Prisma.SelectedPackageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSelectedPackage>
          }
          groupBy: {
            args: Prisma.SelectedPackageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SelectedPackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SelectedPackageCountArgs<ExtArgs>,
            result: $Utils.Optional<SelectedPackageCountAggregateOutputType> | number
          }
        }
      }
      PropertyAddress: {
        payload: PropertyAddressPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.PropertyAddressFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyAddressFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>
          }
          findFirst: {
            args: Prisma.PropertyAddressFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyAddressFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>
          }
          findMany: {
            args: Prisma.PropertyAddressFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>[]
          }
          create: {
            args: Prisma.PropertyAddressCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>
          }
          createMany: {
            args: Prisma.PropertyAddressCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PropertyAddressDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>
          }
          update: {
            args: Prisma.PropertyAddressUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>
          }
          deleteMany: {
            args: Prisma.PropertyAddressDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyAddressUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PropertyAddressUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PropertyAddressPayload>
          }
          aggregate: {
            args: Prisma.PropertyAddressAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePropertyAddress>
          }
          groupBy: {
            args: Prisma.PropertyAddressGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PropertyAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyAddressCountArgs<ExtArgs>,
            result: $Utils.Optional<PropertyAddressCountAggregateOutputType> | number
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
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
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
   * Count Type BookingCountOutputType
   */


  export type BookingCountOutputType = {
    addOns: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    addOns?: boolean | BookingCountOutputTypeCountAddOnsArgs
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
  export type BookingCountOutputTypeCountAddOnsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AddOnWhereInput
  }



  /**
   * Count Type SelectedPackageCountOutputType
   */


  export type SelectedPackageCountOutputType = {
    bookings: number
  }

  export type SelectedPackageCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | SelectedPackageCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes

  /**
   * SelectedPackageCountOutputType without action
   */
  export type SelectedPackageCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackageCountOutputType
     */
    select?: SelectedPackageCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * SelectedPackageCountOutputType without action
   */
  export type SelectedPackageCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }



  /**
   * Count Type PropertyAddressCountOutputType
   */


  export type PropertyAddressCountOutputType = {
    bookings: number
  }

  export type PropertyAddressCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | PropertyAddressCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes

  /**
   * PropertyAddressCountOutputType without action
   */
  export type PropertyAddressCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddressCountOutputType
     */
    select?: PropertyAddressCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * PropertyAddressCountOutputType without action
   */
  export type PropertyAddressCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }



  /**
   * Count Type AddOnCountOutputType
   */


  export type AddOnCountOutputType = {
    bookings: number
  }

  export type AddOnCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | AddOnCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes

  /**
   * AddOnCountOutputType without action
   */
  export type AddOnCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddOnCountOutputType
     */
    select?: AddOnCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * AddOnCountOutputType without action
   */
  export type AddOnCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
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
    phoneNumber: string | null
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
    phoneNumber: string | null
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
    phoneNumber: number
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
    phoneNumber?: true
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
    phoneNumber?: true
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
    phoneNumber?: true
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
    phoneNumber: string | null
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
    phoneNumber?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    verificationToken?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    phoneNumber?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    verificationToken?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
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
    id: number | null
    selectedPackageId: number | null
    propertyAddressId: number | null
  }

  export type BookingSumAggregateOutputType = {
    id: number | null
    selectedPackageId: number | null
    propertyAddressId: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: number | null
    selectedPackageId: number | null
    propertyAddressId: number | null
    isLoading: boolean | null
    propertyType: string | null
    propertySize: string | null
    date: Date | null
    timeSlot: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    email: string | null
    additionalInfo: string | null
    additionalRequests: string | null
    status: BookingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type BookingMaxAggregateOutputType = {
    id: number | null
    selectedPackageId: number | null
    propertyAddressId: number | null
    isLoading: boolean | null
    propertyType: string | null
    propertySize: string | null
    date: Date | null
    timeSlot: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    email: string | null
    additionalInfo: string | null
    additionalRequests: string | null
    status: BookingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    selectedPackageId: number
    propertyAddressId: number
    isLoading: number
    propertyType: number
    propertySize: number
    date: number
    timeSlot: number
    firstName: number
    lastName: number
    phoneNumber: number
    email: number
    additionalInfo: number
    additionalRequests: number
    status: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    id?: true
    selectedPackageId?: true
    propertyAddressId?: true
  }

  export type BookingSumAggregateInputType = {
    id?: true
    selectedPackageId?: true
    propertyAddressId?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    selectedPackageId?: true
    propertyAddressId?: true
    isLoading?: true
    propertyType?: true
    propertySize?: true
    date?: true
    timeSlot?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    email?: true
    additionalInfo?: true
    additionalRequests?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    selectedPackageId?: true
    propertyAddressId?: true
    isLoading?: true
    propertyType?: true
    propertySize?: true
    date?: true
    timeSlot?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    email?: true
    additionalInfo?: true
    additionalRequests?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    selectedPackageId?: true
    propertyAddressId?: true
    isLoading?: true
    propertyType?: true
    propertySize?: true
    date?: true
    timeSlot?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    email?: true
    additionalInfo?: true
    additionalRequests?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
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
    id: number
    selectedPackageId: number | null
    propertyAddressId: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo: string | null
    additionalRequests: string | null
    status: BookingStatus
    createdAt: Date
    updatedAt: Date
    userId: string
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
    selectedPackageId?: boolean
    propertyAddressId?: boolean
    isLoading?: boolean
    propertyType?: boolean
    propertySize?: boolean
    date?: boolean
    timeSlot?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    email?: boolean
    additionalInfo?: boolean
    additionalRequests?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    selectedPackage?: boolean | SelectedPackageArgs<ExtArgs>
    propertyAddress?: boolean | PropertyAddressArgs<ExtArgs>
    addOns?: boolean | Booking$addOnsArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    selectedPackageId?: boolean
    propertyAddressId?: boolean
    isLoading?: boolean
    propertyType?: boolean
    propertySize?: boolean
    date?: boolean
    timeSlot?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    email?: boolean
    additionalInfo?: boolean
    additionalRequests?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    selectedPackage?: boolean | SelectedPackageArgs<ExtArgs>
    propertyAddress?: boolean | PropertyAddressArgs<ExtArgs>
    addOns?: boolean | Booking$addOnsArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
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

    selectedPackage<T extends SelectedPackageArgs<ExtArgs> = {}>(args?: Subset<T, SelectedPackageArgs<ExtArgs>>): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    propertyAddress<T extends PropertyAddressArgs<ExtArgs> = {}>(args?: Subset<T, PropertyAddressArgs<ExtArgs>>): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    addOns<T extends Booking$addOnsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$addOnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AddOnPayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * Model SelectedPackage
   */


  export type AggregateSelectedPackage = {
    _count: SelectedPackageCountAggregateOutputType | null
    _avg: SelectedPackageAvgAggregateOutputType | null
    _sum: SelectedPackageSumAggregateOutputType | null
    _min: SelectedPackageMinAggregateOutputType | null
    _max: SelectedPackageMaxAggregateOutputType | null
  }

  export type SelectedPackageAvgAggregateOutputType = {
    id: number | null
    price: number | null
    pricePerExtra: number | null
  }

  export type SelectedPackageSumAggregateOutputType = {
    id: number | null
    price: number | null
    pricePerExtra: number | null
  }

  export type SelectedPackageMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    description: string | null
    features: string | null
    pricePerExtra: number | null
  }

  export type SelectedPackageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    description: string | null
    features: string | null
    pricePerExtra: number | null
  }

  export type SelectedPackageCountAggregateOutputType = {
    id: number
    name: number
    price: number
    description: number
    features: number
    pricePerExtra: number
    _all: number
  }


  export type SelectedPackageAvgAggregateInputType = {
    id?: true
    price?: true
    pricePerExtra?: true
  }

  export type SelectedPackageSumAggregateInputType = {
    id?: true
    price?: true
    pricePerExtra?: true
  }

  export type SelectedPackageMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    features?: true
    pricePerExtra?: true
  }

  export type SelectedPackageMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    features?: true
    pricePerExtra?: true
  }

  export type SelectedPackageCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    description?: true
    features?: true
    pricePerExtra?: true
    _all?: true
  }

  export type SelectedPackageAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which SelectedPackage to aggregate.
     */
    where?: SelectedPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SelectedPackages to fetch.
     */
    orderBy?: Enumerable<SelectedPackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SelectedPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SelectedPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SelectedPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SelectedPackages
    **/
    _count?: true | SelectedPackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SelectedPackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SelectedPackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SelectedPackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SelectedPackageMaxAggregateInputType
  }

  export type GetSelectedPackageAggregateType<T extends SelectedPackageAggregateArgs> = {
        [P in keyof T & keyof AggregateSelectedPackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSelectedPackage[P]>
      : GetScalarType<T[P], AggregateSelectedPackage[P]>
  }




  export type SelectedPackageGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SelectedPackageWhereInput
    orderBy?: Enumerable<SelectedPackageOrderByWithAggregationInput>
    by: SelectedPackageScalarFieldEnum[]
    having?: SelectedPackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SelectedPackageCountAggregateInputType | true
    _avg?: SelectedPackageAvgAggregateInputType
    _sum?: SelectedPackageSumAggregateInputType
    _min?: SelectedPackageMinAggregateInputType
    _max?: SelectedPackageMaxAggregateInputType
  }


  export type SelectedPackageGroupByOutputType = {
    id: number
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
    _count: SelectedPackageCountAggregateOutputType | null
    _avg: SelectedPackageAvgAggregateOutputType | null
    _sum: SelectedPackageSumAggregateOutputType | null
    _min: SelectedPackageMinAggregateOutputType | null
    _max: SelectedPackageMaxAggregateOutputType | null
  }

  type GetSelectedPackageGroupByPayload<T extends SelectedPackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<SelectedPackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SelectedPackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SelectedPackageGroupByOutputType[P]>
            : GetScalarType<T[P], SelectedPackageGroupByOutputType[P]>
        }
      >
    >


  export type SelectedPackageSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    description?: boolean
    features?: boolean
    pricePerExtra?: boolean
    bookings?: boolean | SelectedPackage$bookingsArgs<ExtArgs>
    _count?: boolean | SelectedPackageCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["selectedPackage"]>

  export type SelectedPackageSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    description?: boolean
    features?: boolean
    pricePerExtra?: boolean
  }

  export type SelectedPackageInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | SelectedPackage$bookingsArgs<ExtArgs>
    _count?: boolean | SelectedPackageCountOutputTypeArgs<ExtArgs>
  }


  type SelectedPackageGetPayload<S extends boolean | null | undefined | SelectedPackageArgs> = $Types.GetResult<SelectedPackagePayload, S>

  type SelectedPackageCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SelectedPackageFindManyArgs, 'select' | 'include'> & {
      select?: SelectedPackageCountAggregateInputType | true
    }

  export interface SelectedPackageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SelectedPackage'], meta: { name: 'SelectedPackage' } }
    /**
     * Find zero or one SelectedPackage that matches the filter.
     * @param {SelectedPackageFindUniqueArgs} args - Arguments to find a SelectedPackage
     * @example
     * // Get one SelectedPackage
     * const selectedPackage = await prisma.selectedPackage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SelectedPackageFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SelectedPackageFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'SelectedPackage'> extends True ? Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one SelectedPackage that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SelectedPackageFindUniqueOrThrowArgs} args - Arguments to find a SelectedPackage
     * @example
     * // Get one SelectedPackage
     * const selectedPackage = await prisma.selectedPackage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SelectedPackageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SelectedPackageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first SelectedPackage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageFindFirstArgs} args - Arguments to find a SelectedPackage
     * @example
     * // Get one SelectedPackage
     * const selectedPackage = await prisma.selectedPackage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SelectedPackageFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SelectedPackageFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'SelectedPackage'> extends True ? Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first SelectedPackage that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageFindFirstOrThrowArgs} args - Arguments to find a SelectedPackage
     * @example
     * // Get one SelectedPackage
     * const selectedPackage = await prisma.selectedPackage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SelectedPackageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SelectedPackageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more SelectedPackages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SelectedPackages
     * const selectedPackages = await prisma.selectedPackage.findMany()
     * 
     * // Get first 10 SelectedPackages
     * const selectedPackages = await prisma.selectedPackage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const selectedPackageWithIdOnly = await prisma.selectedPackage.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SelectedPackageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SelectedPackageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a SelectedPackage.
     * @param {SelectedPackageCreateArgs} args - Arguments to create a SelectedPackage.
     * @example
     * // Create one SelectedPackage
     * const SelectedPackage = await prisma.selectedPackage.create({
     *   data: {
     *     // ... data to create a SelectedPackage
     *   }
     * })
     * 
    **/
    create<T extends SelectedPackageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SelectedPackageCreateArgs<ExtArgs>>
    ): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many SelectedPackages.
     *     @param {SelectedPackageCreateManyArgs} args - Arguments to create many SelectedPackages.
     *     @example
     *     // Create many SelectedPackages
     *     const selectedPackage = await prisma.selectedPackage.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SelectedPackageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SelectedPackageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SelectedPackage.
     * @param {SelectedPackageDeleteArgs} args - Arguments to delete one SelectedPackage.
     * @example
     * // Delete one SelectedPackage
     * const SelectedPackage = await prisma.selectedPackage.delete({
     *   where: {
     *     // ... filter to delete one SelectedPackage
     *   }
     * })
     * 
    **/
    delete<T extends SelectedPackageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SelectedPackageDeleteArgs<ExtArgs>>
    ): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one SelectedPackage.
     * @param {SelectedPackageUpdateArgs} args - Arguments to update one SelectedPackage.
     * @example
     * // Update one SelectedPackage
     * const selectedPackage = await prisma.selectedPackage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SelectedPackageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SelectedPackageUpdateArgs<ExtArgs>>
    ): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more SelectedPackages.
     * @param {SelectedPackageDeleteManyArgs} args - Arguments to filter SelectedPackages to delete.
     * @example
     * // Delete a few SelectedPackages
     * const { count } = await prisma.selectedPackage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SelectedPackageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SelectedPackageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SelectedPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SelectedPackages
     * const selectedPackage = await prisma.selectedPackage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SelectedPackageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SelectedPackageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SelectedPackage.
     * @param {SelectedPackageUpsertArgs} args - Arguments to update or create a SelectedPackage.
     * @example
     * // Update or create a SelectedPackage
     * const selectedPackage = await prisma.selectedPackage.upsert({
     *   create: {
     *     // ... data to create a SelectedPackage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SelectedPackage we want to update
     *   }
     * })
    **/
    upsert<T extends SelectedPackageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SelectedPackageUpsertArgs<ExtArgs>>
    ): Prisma__SelectedPackageClient<$Types.GetResult<SelectedPackagePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of SelectedPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageCountArgs} args - Arguments to filter SelectedPackages to count.
     * @example
     * // Count the number of SelectedPackages
     * const count = await prisma.selectedPackage.count({
     *   where: {
     *     // ... the filter for the SelectedPackages we want to count
     *   }
     * })
    **/
    count<T extends SelectedPackageCountArgs>(
      args?: Subset<T, SelectedPackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SelectedPackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SelectedPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SelectedPackageAggregateArgs>(args: Subset<T, SelectedPackageAggregateArgs>): Prisma.PrismaPromise<GetSelectedPackageAggregateType<T>>

    /**
     * Group by SelectedPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SelectedPackageGroupByArgs} args - Group by arguments.
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
      T extends SelectedPackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SelectedPackageGroupByArgs['orderBy'] }
        : { orderBy?: SelectedPackageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SelectedPackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSelectedPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for SelectedPackage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SelectedPackageClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    bookings<T extends SelectedPackage$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, SelectedPackage$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * SelectedPackage base type for findUnique actions
   */
  export type SelectedPackageFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * Filter, which SelectedPackage to fetch.
     */
    where: SelectedPackageWhereUniqueInput
  }

  /**
   * SelectedPackage findUnique
   */
  export interface SelectedPackageFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SelectedPackageFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SelectedPackage findUniqueOrThrow
   */
  export type SelectedPackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * Filter, which SelectedPackage to fetch.
     */
    where: SelectedPackageWhereUniqueInput
  }


  /**
   * SelectedPackage base type for findFirst actions
   */
  export type SelectedPackageFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * Filter, which SelectedPackage to fetch.
     */
    where?: SelectedPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SelectedPackages to fetch.
     */
    orderBy?: Enumerable<SelectedPackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SelectedPackages.
     */
    cursor?: SelectedPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SelectedPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SelectedPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SelectedPackages.
     */
    distinct?: Enumerable<SelectedPackageScalarFieldEnum>
  }

  /**
   * SelectedPackage findFirst
   */
  export interface SelectedPackageFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SelectedPackageFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SelectedPackage findFirstOrThrow
   */
  export type SelectedPackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * Filter, which SelectedPackage to fetch.
     */
    where?: SelectedPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SelectedPackages to fetch.
     */
    orderBy?: Enumerable<SelectedPackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SelectedPackages.
     */
    cursor?: SelectedPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SelectedPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SelectedPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SelectedPackages.
     */
    distinct?: Enumerable<SelectedPackageScalarFieldEnum>
  }


  /**
   * SelectedPackage findMany
   */
  export type SelectedPackageFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * Filter, which SelectedPackages to fetch.
     */
    where?: SelectedPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SelectedPackages to fetch.
     */
    orderBy?: Enumerable<SelectedPackageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SelectedPackages.
     */
    cursor?: SelectedPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SelectedPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SelectedPackages.
     */
    skip?: number
    distinct?: Enumerable<SelectedPackageScalarFieldEnum>
  }


  /**
   * SelectedPackage create
   */
  export type SelectedPackageCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * The data needed to create a SelectedPackage.
     */
    data: XOR<SelectedPackageCreateInput, SelectedPackageUncheckedCreateInput>
  }


  /**
   * SelectedPackage createMany
   */
  export type SelectedPackageCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SelectedPackages.
     */
    data: Enumerable<SelectedPackageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * SelectedPackage update
   */
  export type SelectedPackageUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * The data needed to update a SelectedPackage.
     */
    data: XOR<SelectedPackageUpdateInput, SelectedPackageUncheckedUpdateInput>
    /**
     * Choose, which SelectedPackage to update.
     */
    where: SelectedPackageWhereUniqueInput
  }


  /**
   * SelectedPackage updateMany
   */
  export type SelectedPackageUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SelectedPackages.
     */
    data: XOR<SelectedPackageUpdateManyMutationInput, SelectedPackageUncheckedUpdateManyInput>
    /**
     * Filter which SelectedPackages to update
     */
    where?: SelectedPackageWhereInput
  }


  /**
   * SelectedPackage upsert
   */
  export type SelectedPackageUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * The filter to search for the SelectedPackage to update in case it exists.
     */
    where: SelectedPackageWhereUniqueInput
    /**
     * In case the SelectedPackage found by the `where` argument doesn't exist, create a new SelectedPackage with this data.
     */
    create: XOR<SelectedPackageCreateInput, SelectedPackageUncheckedCreateInput>
    /**
     * In case the SelectedPackage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SelectedPackageUpdateInput, SelectedPackageUncheckedUpdateInput>
  }


  /**
   * SelectedPackage delete
   */
  export type SelectedPackageDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
    /**
     * Filter which SelectedPackage to delete.
     */
    where: SelectedPackageWhereUniqueInput
  }


  /**
   * SelectedPackage deleteMany
   */
  export type SelectedPackageDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which SelectedPackages to delete
     */
    where?: SelectedPackageWhereInput
  }


  /**
   * SelectedPackage.bookings
   */
  export type SelectedPackage$bookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
   * SelectedPackage without action
   */
  export type SelectedPackageArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SelectedPackage
     */
    select?: SelectedPackageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SelectedPackageInclude<ExtArgs> | null
  }



  /**
   * Model PropertyAddress
   */


  export type AggregatePropertyAddress = {
    _count: PropertyAddressCountAggregateOutputType | null
    _avg: PropertyAddressAvgAggregateOutputType | null
    _sum: PropertyAddressSumAggregateOutputType | null
    _min: PropertyAddressMinAggregateOutputType | null
    _max: PropertyAddressMaxAggregateOutputType | null
  }

  export type PropertyAddressAvgAggregateOutputType = {
    id: number | null
  }

  export type PropertyAddressSumAggregateOutputType = {
    id: number | null
  }

  export type PropertyAddressMinAggregateOutputType = {
    id: number | null
    buildingName: string | null
    unitNumber: string | null
    floor: string | null
    street: string | null
  }

  export type PropertyAddressMaxAggregateOutputType = {
    id: number | null
    buildingName: string | null
    unitNumber: string | null
    floor: string | null
    street: string | null
  }

  export type PropertyAddressCountAggregateOutputType = {
    id: number
    buildingName: number
    unitNumber: number
    floor: number
    street: number
    _all: number
  }


  export type PropertyAddressAvgAggregateInputType = {
    id?: true
  }

  export type PropertyAddressSumAggregateInputType = {
    id?: true
  }

  export type PropertyAddressMinAggregateInputType = {
    id?: true
    buildingName?: true
    unitNumber?: true
    floor?: true
    street?: true
  }

  export type PropertyAddressMaxAggregateInputType = {
    id?: true
    buildingName?: true
    unitNumber?: true
    floor?: true
    street?: true
  }

  export type PropertyAddressCountAggregateInputType = {
    id?: true
    buildingName?: true
    unitNumber?: true
    floor?: true
    street?: true
    _all?: true
  }

  export type PropertyAddressAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyAddress to aggregate.
     */
    where?: PropertyAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyAddresses to fetch.
     */
    orderBy?: Enumerable<PropertyAddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyAddresses
    **/
    _count?: true | PropertyAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyAddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyAddressMaxAggregateInputType
  }

  export type GetPropertyAddressAggregateType<T extends PropertyAddressAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyAddress[P]>
      : GetScalarType<T[P], AggregatePropertyAddress[P]>
  }




  export type PropertyAddressGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PropertyAddressWhereInput
    orderBy?: Enumerable<PropertyAddressOrderByWithAggregationInput>
    by: PropertyAddressScalarFieldEnum[]
    having?: PropertyAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyAddressCountAggregateInputType | true
    _avg?: PropertyAddressAvgAggregateInputType
    _sum?: PropertyAddressSumAggregateInputType
    _min?: PropertyAddressMinAggregateInputType
    _max?: PropertyAddressMaxAggregateInputType
  }


  export type PropertyAddressGroupByOutputType = {
    id: number
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    _count: PropertyAddressCountAggregateOutputType | null
    _avg: PropertyAddressAvgAggregateOutputType | null
    _sum: PropertyAddressSumAggregateOutputType | null
    _min: PropertyAddressMinAggregateOutputType | null
    _max: PropertyAddressMaxAggregateOutputType | null
  }

  type GetPropertyAddressGroupByPayload<T extends PropertyAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PropertyAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyAddressGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyAddressGroupByOutputType[P]>
        }
      >
    >


  export type PropertyAddressSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingName?: boolean
    unitNumber?: boolean
    floor?: boolean
    street?: boolean
    bookings?: boolean | PropertyAddress$bookingsArgs<ExtArgs>
    _count?: boolean | PropertyAddressCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["propertyAddress"]>

  export type PropertyAddressSelectScalar = {
    id?: boolean
    buildingName?: boolean
    unitNumber?: boolean
    floor?: boolean
    street?: boolean
  }

  export type PropertyAddressInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | PropertyAddress$bookingsArgs<ExtArgs>
    _count?: boolean | PropertyAddressCountOutputTypeArgs<ExtArgs>
  }


  type PropertyAddressGetPayload<S extends boolean | null | undefined | PropertyAddressArgs> = $Types.GetResult<PropertyAddressPayload, S>

  type PropertyAddressCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<PropertyAddressFindManyArgs, 'select' | 'include'> & {
      select?: PropertyAddressCountAggregateInputType | true
    }

  export interface PropertyAddressDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyAddress'], meta: { name: 'PropertyAddress' } }
    /**
     * Find zero or one PropertyAddress that matches the filter.
     * @param {PropertyAddressFindUniqueArgs} args - Arguments to find a PropertyAddress
     * @example
     * // Get one PropertyAddress
     * const propertyAddress = await prisma.propertyAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PropertyAddressFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PropertyAddressFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PropertyAddress'> extends True ? Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one PropertyAddress that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PropertyAddressFindUniqueOrThrowArgs} args - Arguments to find a PropertyAddress
     * @example
     * // Get one PropertyAddress
     * const propertyAddress = await prisma.propertyAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PropertyAddressFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PropertyAddressFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first PropertyAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressFindFirstArgs} args - Arguments to find a PropertyAddress
     * @example
     * // Get one PropertyAddress
     * const propertyAddress = await prisma.propertyAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PropertyAddressFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PropertyAddressFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PropertyAddress'> extends True ? Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first PropertyAddress that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressFindFirstOrThrowArgs} args - Arguments to find a PropertyAddress
     * @example
     * // Get one PropertyAddress
     * const propertyAddress = await prisma.propertyAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PropertyAddressFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PropertyAddressFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more PropertyAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyAddresses
     * const propertyAddresses = await prisma.propertyAddress.findMany()
     * 
     * // Get first 10 PropertyAddresses
     * const propertyAddresses = await prisma.propertyAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyAddressWithIdOnly = await prisma.propertyAddress.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PropertyAddressFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PropertyAddressFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a PropertyAddress.
     * @param {PropertyAddressCreateArgs} args - Arguments to create a PropertyAddress.
     * @example
     * // Create one PropertyAddress
     * const PropertyAddress = await prisma.propertyAddress.create({
     *   data: {
     *     // ... data to create a PropertyAddress
     *   }
     * })
     * 
    **/
    create<T extends PropertyAddressCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PropertyAddressCreateArgs<ExtArgs>>
    ): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many PropertyAddresses.
     *     @param {PropertyAddressCreateManyArgs} args - Arguments to create many PropertyAddresses.
     *     @example
     *     // Create many PropertyAddresses
     *     const propertyAddress = await prisma.propertyAddress.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PropertyAddressCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PropertyAddressCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PropertyAddress.
     * @param {PropertyAddressDeleteArgs} args - Arguments to delete one PropertyAddress.
     * @example
     * // Delete one PropertyAddress
     * const PropertyAddress = await prisma.propertyAddress.delete({
     *   where: {
     *     // ... filter to delete one PropertyAddress
     *   }
     * })
     * 
    **/
    delete<T extends PropertyAddressDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PropertyAddressDeleteArgs<ExtArgs>>
    ): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one PropertyAddress.
     * @param {PropertyAddressUpdateArgs} args - Arguments to update one PropertyAddress.
     * @example
     * // Update one PropertyAddress
     * const propertyAddress = await prisma.propertyAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PropertyAddressUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PropertyAddressUpdateArgs<ExtArgs>>
    ): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more PropertyAddresses.
     * @param {PropertyAddressDeleteManyArgs} args - Arguments to filter PropertyAddresses to delete.
     * @example
     * // Delete a few PropertyAddresses
     * const { count } = await prisma.propertyAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PropertyAddressDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PropertyAddressDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyAddresses
     * const propertyAddress = await prisma.propertyAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PropertyAddressUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PropertyAddressUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PropertyAddress.
     * @param {PropertyAddressUpsertArgs} args - Arguments to update or create a PropertyAddress.
     * @example
     * // Update or create a PropertyAddress
     * const propertyAddress = await prisma.propertyAddress.upsert({
     *   create: {
     *     // ... data to create a PropertyAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyAddress we want to update
     *   }
     * })
    **/
    upsert<T extends PropertyAddressUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PropertyAddressUpsertArgs<ExtArgs>>
    ): Prisma__PropertyAddressClient<$Types.GetResult<PropertyAddressPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of PropertyAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressCountArgs} args - Arguments to filter PropertyAddresses to count.
     * @example
     * // Count the number of PropertyAddresses
     * const count = await prisma.propertyAddress.count({
     *   where: {
     *     // ... the filter for the PropertyAddresses we want to count
     *   }
     * })
    **/
    count<T extends PropertyAddressCountArgs>(
      args?: Subset<T, PropertyAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyAddressAggregateArgs>(args: Subset<T, PropertyAddressAggregateArgs>): Prisma.PrismaPromise<GetPropertyAddressAggregateType<T>>

    /**
     * Group by PropertyAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAddressGroupByArgs} args - Group by arguments.
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
      T extends PropertyAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyAddressGroupByArgs['orderBy'] }
        : { orderBy?: PropertyAddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PropertyAddressClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    bookings<T extends PropertyAddress$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, PropertyAddress$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * PropertyAddress base type for findUnique actions
   */
  export type PropertyAddressFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * Filter, which PropertyAddress to fetch.
     */
    where: PropertyAddressWhereUniqueInput
  }

  /**
   * PropertyAddress findUnique
   */
  export interface PropertyAddressFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PropertyAddressFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PropertyAddress findUniqueOrThrow
   */
  export type PropertyAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * Filter, which PropertyAddress to fetch.
     */
    where: PropertyAddressWhereUniqueInput
  }


  /**
   * PropertyAddress base type for findFirst actions
   */
  export type PropertyAddressFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * Filter, which PropertyAddress to fetch.
     */
    where?: PropertyAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyAddresses to fetch.
     */
    orderBy?: Enumerable<PropertyAddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyAddresses.
     */
    cursor?: PropertyAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyAddresses.
     */
    distinct?: Enumerable<PropertyAddressScalarFieldEnum>
  }

  /**
   * PropertyAddress findFirst
   */
  export interface PropertyAddressFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PropertyAddressFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PropertyAddress findFirstOrThrow
   */
  export type PropertyAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * Filter, which PropertyAddress to fetch.
     */
    where?: PropertyAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyAddresses to fetch.
     */
    orderBy?: Enumerable<PropertyAddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyAddresses.
     */
    cursor?: PropertyAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyAddresses.
     */
    distinct?: Enumerable<PropertyAddressScalarFieldEnum>
  }


  /**
   * PropertyAddress findMany
   */
  export type PropertyAddressFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * Filter, which PropertyAddresses to fetch.
     */
    where?: PropertyAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyAddresses to fetch.
     */
    orderBy?: Enumerable<PropertyAddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyAddresses.
     */
    cursor?: PropertyAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyAddresses.
     */
    skip?: number
    distinct?: Enumerable<PropertyAddressScalarFieldEnum>
  }


  /**
   * PropertyAddress create
   */
  export type PropertyAddressCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyAddress.
     */
    data: XOR<PropertyAddressCreateInput, PropertyAddressUncheckedCreateInput>
  }


  /**
   * PropertyAddress createMany
   */
  export type PropertyAddressCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyAddresses.
     */
    data: Enumerable<PropertyAddressCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PropertyAddress update
   */
  export type PropertyAddressUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyAddress.
     */
    data: XOR<PropertyAddressUpdateInput, PropertyAddressUncheckedUpdateInput>
    /**
     * Choose, which PropertyAddress to update.
     */
    where: PropertyAddressWhereUniqueInput
  }


  /**
   * PropertyAddress updateMany
   */
  export type PropertyAddressUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyAddresses.
     */
    data: XOR<PropertyAddressUpdateManyMutationInput, PropertyAddressUncheckedUpdateManyInput>
    /**
     * Filter which PropertyAddresses to update
     */
    where?: PropertyAddressWhereInput
  }


  /**
   * PropertyAddress upsert
   */
  export type PropertyAddressUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyAddress to update in case it exists.
     */
    where: PropertyAddressWhereUniqueInput
    /**
     * In case the PropertyAddress found by the `where` argument doesn't exist, create a new PropertyAddress with this data.
     */
    create: XOR<PropertyAddressCreateInput, PropertyAddressUncheckedCreateInput>
    /**
     * In case the PropertyAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyAddressUpdateInput, PropertyAddressUncheckedUpdateInput>
  }


  /**
   * PropertyAddress delete
   */
  export type PropertyAddressDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
    /**
     * Filter which PropertyAddress to delete.
     */
    where: PropertyAddressWhereUniqueInput
  }


  /**
   * PropertyAddress deleteMany
   */
  export type PropertyAddressDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyAddresses to delete
     */
    where?: PropertyAddressWhereInput
  }


  /**
   * PropertyAddress.bookings
   */
  export type PropertyAddress$bookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
   * PropertyAddress without action
   */
  export type PropertyAddressArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyAddress
     */
    select?: PropertyAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PropertyAddressInclude<ExtArgs> | null
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
    id: number | null
    price: number | null
  }

  export type AddOnSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type AddOnMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
  }

  export type AddOnMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
  }

  export type AddOnCountAggregateOutputType = {
    id: number
    name: number
    price: number
    _all: number
  }


  export type AddOnAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type AddOnSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type AddOnMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
  }

  export type AddOnMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
  }

  export type AddOnCountAggregateInputType = {
    id?: true
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
    id: number
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
    name?: boolean
    price?: boolean
    bookings?: boolean | AddOn$bookingsArgs<ExtArgs>
    _count?: boolean | AddOnCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["addOn"]>

  export type AddOnSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
  }

  export type AddOnInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    bookings?: boolean | AddOn$bookingsArgs<ExtArgs>
    _count?: boolean | AddOnCountOutputTypeArgs<ExtArgs>
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

    bookings<T extends AddOn$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, AddOn$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<BookingPayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * AddOn.bookings
   */
  export type AddOn$bookingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
    phoneNumber: 'phoneNumber',
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


  export const BookingScalarFieldEnum: {
    id: 'id',
    selectedPackageId: 'selectedPackageId',
    propertyAddressId: 'propertyAddressId',
    isLoading: 'isLoading',
    propertyType: 'propertyType',
    propertySize: 'propertySize',
    date: 'date',
    timeSlot: 'timeSlot',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    email: 'email',
    additionalInfo: 'additionalInfo',
    additionalRequests: 'additionalRequests',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const SelectedPackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    description: 'description',
    features: 'features',
    pricePerExtra: 'pricePerExtra'
  };

  export type SelectedPackageScalarFieldEnum = (typeof SelectedPackageScalarFieldEnum)[keyof typeof SelectedPackageScalarFieldEnum]


  export const PropertyAddressScalarFieldEnum: {
    id: 'id',
    buildingName: 'buildingName',
    unitNumber: 'unitNumber',
    floor: 'floor',
    street: 'street'
  };

  export type PropertyAddressScalarFieldEnum = (typeof PropertyAddressScalarFieldEnum)[keyof typeof PropertyAddressScalarFieldEnum]


  export const AddOnScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price'
  };

  export type AddOnScalarFieldEnum = (typeof AddOnScalarFieldEnum)[keyof typeof AddOnScalarFieldEnum]


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
    phoneNumber?: StringNullableFilter | string | null
    role?: EnumRoleFilter | Role
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    verificationToken?: StringNullableFilter | string | null
    accounts?: AccountListRelationFilter
    bookings?: BookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    role?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    verificationToken?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
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
    phoneNumber?: SortOrderInput | SortOrder
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
    phoneNumber?: StringNullableWithAggregatesFilter | string | null
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

  export type BookingWhereInput = {
    AND?: Enumerable<BookingWhereInput>
    OR?: Enumerable<BookingWhereInput>
    NOT?: Enumerable<BookingWhereInput>
    id?: IntFilter | number
    selectedPackageId?: IntNullableFilter | number | null
    propertyAddressId?: IntNullableFilter | number | null
    isLoading?: BoolFilter | boolean
    propertyType?: StringFilter | string
    propertySize?: StringFilter | string
    date?: DateTimeFilter | Date | string
    timeSlot?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    phoneNumber?: StringFilter | string
    email?: StringFilter | string
    additionalInfo?: StringNullableFilter | string | null
    additionalRequests?: StringNullableFilter | string | null
    status?: EnumBookingStatusFilter | BookingStatus
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    selectedPackage?: XOR<SelectedPackageRelationFilter, SelectedPackageWhereInput> | null
    propertyAddress?: XOR<PropertyAddressRelationFilter, PropertyAddressWhereInput> | null
    addOns?: AddOnListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    selectedPackageId?: SortOrderInput | SortOrder
    propertyAddressId?: SortOrderInput | SortOrder
    isLoading?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalInfo?: SortOrderInput | SortOrder
    additionalRequests?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    selectedPackage?: SelectedPackageOrderByWithRelationInput
    propertyAddress?: PropertyAddressOrderByWithRelationInput
    addOns?: AddOnOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = {
    id?: number
  }

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    selectedPackageId?: SortOrderInput | SortOrder
    propertyAddressId?: SortOrderInput | SortOrder
    isLoading?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalInfo?: SortOrderInput | SortOrder
    additionalRequests?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
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
    id?: IntWithAggregatesFilter | number
    selectedPackageId?: IntNullableWithAggregatesFilter | number | null
    propertyAddressId?: IntNullableWithAggregatesFilter | number | null
    isLoading?: BoolWithAggregatesFilter | boolean
    propertyType?: StringWithAggregatesFilter | string
    propertySize?: StringWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    timeSlot?: StringWithAggregatesFilter | string
    firstName?: StringWithAggregatesFilter | string
    lastName?: StringWithAggregatesFilter | string
    phoneNumber?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    additionalInfo?: StringNullableWithAggregatesFilter | string | null
    additionalRequests?: StringNullableWithAggregatesFilter | string | null
    status?: EnumBookingStatusWithAggregatesFilter | BookingStatus
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringWithAggregatesFilter | string
  }

  export type SelectedPackageWhereInput = {
    AND?: Enumerable<SelectedPackageWhereInput>
    OR?: Enumerable<SelectedPackageWhereInput>
    NOT?: Enumerable<SelectedPackageWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    price?: FloatFilter | number
    description?: StringFilter | string
    features?: StringFilter | string
    pricePerExtra?: FloatFilter | number
    bookings?: BookingListRelationFilter
  }

  export type SelectedPackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type SelectedPackageWhereUniqueInput = {
    id?: number
  }

  export type SelectedPackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrder
    _count?: SelectedPackageCountOrderByAggregateInput
    _avg?: SelectedPackageAvgOrderByAggregateInput
    _max?: SelectedPackageMaxOrderByAggregateInput
    _min?: SelectedPackageMinOrderByAggregateInput
    _sum?: SelectedPackageSumOrderByAggregateInput
  }

  export type SelectedPackageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SelectedPackageScalarWhereWithAggregatesInput>
    OR?: Enumerable<SelectedPackageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SelectedPackageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    price?: FloatWithAggregatesFilter | number
    description?: StringWithAggregatesFilter | string
    features?: StringWithAggregatesFilter | string
    pricePerExtra?: FloatWithAggregatesFilter | number
  }

  export type PropertyAddressWhereInput = {
    AND?: Enumerable<PropertyAddressWhereInput>
    OR?: Enumerable<PropertyAddressWhereInput>
    NOT?: Enumerable<PropertyAddressWhereInput>
    id?: IntFilter | number
    buildingName?: StringFilter | string
    unitNumber?: StringFilter | string
    floor?: StringFilter | string
    street?: StringFilter | string
    bookings?: BookingListRelationFilter
  }

  export type PropertyAddressOrderByWithRelationInput = {
    id?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type PropertyAddressWhereUniqueInput = {
    id?: number
  }

  export type PropertyAddressOrderByWithAggregationInput = {
    id?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
    _count?: PropertyAddressCountOrderByAggregateInput
    _avg?: PropertyAddressAvgOrderByAggregateInput
    _max?: PropertyAddressMaxOrderByAggregateInput
    _min?: PropertyAddressMinOrderByAggregateInput
    _sum?: PropertyAddressSumOrderByAggregateInput
  }

  export type PropertyAddressScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PropertyAddressScalarWhereWithAggregatesInput>
    OR?: Enumerable<PropertyAddressScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PropertyAddressScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    buildingName?: StringWithAggregatesFilter | string
    unitNumber?: StringWithAggregatesFilter | string
    floor?: StringWithAggregatesFilter | string
    street?: StringWithAggregatesFilter | string
  }

  export type AddOnWhereInput = {
    AND?: Enumerable<AddOnWhereInput>
    OR?: Enumerable<AddOnWhereInput>
    NOT?: Enumerable<AddOnWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    price?: FloatFilter | number
    bookings?: BookingListRelationFilter
  }

  export type AddOnOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type AddOnWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type AddOnOrderByWithAggregationInput = {
    id?: SortOrder
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
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    price?: FloatWithAggregatesFilter | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
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
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
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
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type BookingCreateInput = {
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    selectedPackage?: SelectedPackageCreateNestedOneWithoutBookingsInput
    propertyAddress?: PropertyAddressCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingsInput
    user: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateInput = {
    id?: number
    selectedPackageId?: number | null
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingsInput
  }

  export type BookingUpdateInput = {
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectedPackage?: SelectedPackageUpdateOneWithoutBookingsNestedInput
    propertyAddress?: PropertyAddressUpdateOneWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingsNestedInput
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    selectedPackageId?: NullableIntFieldUpdateOperationsInput | number | null
    propertyAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    addOns?: AddOnUncheckedUpdateManyWithoutBookingsNestedInput
  }

  export type BookingCreateManyInput = {
    id?: number
    selectedPackageId?: number | null
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type BookingUpdateManyMutationInput = {
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    selectedPackageId?: NullableIntFieldUpdateOperationsInput | number | null
    propertyAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SelectedPackageCreateInput = {
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
    bookings?: BookingCreateNestedManyWithoutSelectedPackageInput
  }

  export type SelectedPackageUncheckedCreateInput = {
    id?: number
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
    bookings?: BookingUncheckedCreateNestedManyWithoutSelectedPackageInput
  }

  export type SelectedPackageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    pricePerExtra?: FloatFieldUpdateOperationsInput | number
    bookings?: BookingUpdateManyWithoutSelectedPackageNestedInput
  }

  export type SelectedPackageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    pricePerExtra?: FloatFieldUpdateOperationsInput | number
    bookings?: BookingUncheckedUpdateManyWithoutSelectedPackageNestedInput
  }

  export type SelectedPackageCreateManyInput = {
    id?: number
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
  }

  export type SelectedPackageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    pricePerExtra?: FloatFieldUpdateOperationsInput | number
  }

  export type SelectedPackageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    pricePerExtra?: FloatFieldUpdateOperationsInput | number
  }

  export type PropertyAddressCreateInput = {
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    bookings?: BookingCreateNestedManyWithoutPropertyAddressInput
  }

  export type PropertyAddressUncheckedCreateInput = {
    id?: number
    buildingName: string
    unitNumber: string
    floor: string
    street: string
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyAddressInput
  }

  export type PropertyAddressUpdateInput = {
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    bookings?: BookingUpdateManyWithoutPropertyAddressNestedInput
  }

  export type PropertyAddressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    bookings?: BookingUncheckedUpdateManyWithoutPropertyAddressNestedInput
  }

  export type PropertyAddressCreateManyInput = {
    id?: number
    buildingName: string
    unitNumber: string
    floor: string
    street: string
  }

  export type PropertyAddressUpdateManyMutationInput = {
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyAddressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
  }

  export type AddOnCreateInput = {
    name: string
    price: number
    bookings?: BookingCreateNestedManyWithoutAddOnsInput
  }

  export type AddOnUncheckedCreateInput = {
    id?: number
    name: string
    price: number
    bookings?: BookingUncheckedCreateNestedManyWithoutAddOnsInput
  }

  export type AddOnUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    bookings?: BookingUpdateManyWithoutAddOnsNestedInput
  }

  export type AddOnUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    bookings?: BookingUncheckedUpdateManyWithoutAddOnsNestedInput
  }

  export type AddOnCreateManyInput = {
    id?: number
    name: string
    price: number
  }

  export type AddOnUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
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

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    phoneNumber?: SortOrder
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
    phoneNumber?: SortOrder
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
    phoneNumber?: SortOrder
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

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EnumBookingStatusFilter = {
    equals?: BookingStatus
    in?: Enumerable<BookingStatus>
    notIn?: Enumerable<BookingStatus>
    not?: NestedEnumBookingStatusFilter | BookingStatus
  }

  export type SelectedPackageRelationFilter = {
    is?: SelectedPackageWhereInput | null
    isNot?: SelectedPackageWhereInput | null
  }

  export type PropertyAddressRelationFilter = {
    is?: PropertyAddressWhereInput | null
    isNot?: PropertyAddressWhereInput | null
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
    selectedPackageId?: SortOrder
    propertyAddressId?: SortOrder
    isLoading?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalInfo?: SortOrder
    additionalRequests?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    id?: SortOrder
    selectedPackageId?: SortOrder
    propertyAddressId?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    selectedPackageId?: SortOrder
    propertyAddressId?: SortOrder
    isLoading?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalInfo?: SortOrder
    additionalRequests?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    selectedPackageId?: SortOrder
    propertyAddressId?: SortOrder
    isLoading?: SortOrder
    propertyType?: SortOrder
    propertySize?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    additionalInfo?: SortOrder
    additionalRequests?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    id?: SortOrder
    selectedPackageId?: SortOrder
    propertyAddressId?: SortOrder
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

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
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

  export type SelectedPackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type SelectedPackageAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type SelectedPackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type SelectedPackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    description?: SortOrder
    features?: SortOrder
    pricePerExtra?: SortOrder
  }

  export type SelectedPackageSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    pricePerExtra?: SortOrder
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

  export type PropertyAddressCountOrderByAggregateInput = {
    id?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
  }

  export type PropertyAddressAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PropertyAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
  }

  export type PropertyAddressMinOrderByAggregateInput = {
    id?: SortOrder
    buildingName?: SortOrder
    unitNumber?: SortOrder
    floor?: SortOrder
    street?: SortOrder
  }

  export type PropertyAddressSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AddOnCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type AddOnAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type AddOnMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type AddOnMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type AddOnSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type BookingCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BookingCreateWithoutUserInput>, Enumerable<BookingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutUserInput>
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BookingCreateWithoutUserInput>, Enumerable<BookingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutUserInput>
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type BookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutUserInput>, Enumerable<BookingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BookingCreateManyUserInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
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

  export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutUserInput>, Enumerable<BookingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BookingCreateManyUserInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
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

  export type SelectedPackageCreateNestedOneWithoutBookingsInput = {
    create?: XOR<SelectedPackageCreateWithoutBookingsInput, SelectedPackageUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: SelectedPackageCreateOrConnectWithoutBookingsInput
    connect?: SelectedPackageWhereUniqueInput
  }

  export type PropertyAddressCreateNestedOneWithoutBookingsInput = {
    create?: XOR<PropertyAddressCreateWithoutBookingsInput, PropertyAddressUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PropertyAddressCreateOrConnectWithoutBookingsInput
    connect?: PropertyAddressWhereUniqueInput
  }

  export type AddOnCreateNestedManyWithoutBookingsInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingsInput>, Enumerable<AddOnUncheckedCreateWithoutBookingsInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingsInput>
    connect?: Enumerable<AddOnWhereUniqueInput>
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type AddOnUncheckedCreateNestedManyWithoutBookingsInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingsInput>, Enumerable<AddOnUncheckedCreateWithoutBookingsInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingsInput>
    connect?: Enumerable<AddOnWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: BookingStatus
  }

  export type SelectedPackageUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<SelectedPackageCreateWithoutBookingsInput, SelectedPackageUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: SelectedPackageCreateOrConnectWithoutBookingsInput
    upsert?: SelectedPackageUpsertWithoutBookingsInput
    disconnect?: boolean
    delete?: boolean
    connect?: SelectedPackageWhereUniqueInput
    update?: XOR<SelectedPackageUpdateWithoutBookingsInput, SelectedPackageUncheckedUpdateWithoutBookingsInput>
  }

  export type PropertyAddressUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<PropertyAddressCreateWithoutBookingsInput, PropertyAddressUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PropertyAddressCreateOrConnectWithoutBookingsInput
    upsert?: PropertyAddressUpsertWithoutBookingsInput
    disconnect?: boolean
    delete?: boolean
    connect?: PropertyAddressWhereUniqueInput
    update?: XOR<PropertyAddressUpdateWithoutBookingsInput, PropertyAddressUncheckedUpdateWithoutBookingsInput>
  }

  export type AddOnUpdateManyWithoutBookingsNestedInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingsInput>, Enumerable<AddOnUncheckedCreateWithoutBookingsInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingsInput>
    upsert?: Enumerable<AddOnUpsertWithWhereUniqueWithoutBookingsInput>
    set?: Enumerable<AddOnWhereUniqueInput>
    disconnect?: Enumerable<AddOnWhereUniqueInput>
    delete?: Enumerable<AddOnWhereUniqueInput>
    connect?: Enumerable<AddOnWhereUniqueInput>
    update?: Enumerable<AddOnUpdateWithWhereUniqueWithoutBookingsInput>
    updateMany?: Enumerable<AddOnUpdateManyWithWhereWithoutBookingsInput>
    deleteMany?: Enumerable<AddOnScalarWhereInput>
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AddOnUncheckedUpdateManyWithoutBookingsNestedInput = {
    create?: XOR<Enumerable<AddOnCreateWithoutBookingsInput>, Enumerable<AddOnUncheckedCreateWithoutBookingsInput>>
    connectOrCreate?: Enumerable<AddOnCreateOrConnectWithoutBookingsInput>
    upsert?: Enumerable<AddOnUpsertWithWhereUniqueWithoutBookingsInput>
    set?: Enumerable<AddOnWhereUniqueInput>
    disconnect?: Enumerable<AddOnWhereUniqueInput>
    delete?: Enumerable<AddOnWhereUniqueInput>
    connect?: Enumerable<AddOnWhereUniqueInput>
    update?: Enumerable<AddOnUpdateWithWhereUniqueWithoutBookingsInput>
    updateMany?: Enumerable<AddOnUpdateManyWithWhereWithoutBookingsInput>
    deleteMany?: Enumerable<AddOnScalarWhereInput>
  }

  export type BookingCreateNestedManyWithoutSelectedPackageInput = {
    create?: XOR<Enumerable<BookingCreateWithoutSelectedPackageInput>, Enumerable<BookingUncheckedCreateWithoutSelectedPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutSelectedPackageInput>
    createMany?: BookingCreateManySelectedPackageInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutSelectedPackageInput = {
    create?: XOR<Enumerable<BookingCreateWithoutSelectedPackageInput>, Enumerable<BookingUncheckedCreateWithoutSelectedPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutSelectedPackageInput>
    createMany?: BookingCreateManySelectedPackageInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookingUpdateManyWithoutSelectedPackageNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutSelectedPackageInput>, Enumerable<BookingUncheckedCreateWithoutSelectedPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutSelectedPackageInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutSelectedPackageInput>
    createMany?: BookingCreateManySelectedPackageInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutSelectedPackageInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutSelectedPackageInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutSelectedPackageNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutSelectedPackageInput>, Enumerable<BookingUncheckedCreateWithoutSelectedPackageInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutSelectedPackageInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutSelectedPackageInput>
    createMany?: BookingCreateManySelectedPackageInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutSelectedPackageInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutSelectedPackageInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingCreateNestedManyWithoutPropertyAddressInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPropertyAddressInput>, Enumerable<BookingUncheckedCreateWithoutPropertyAddressInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPropertyAddressInput>
    createMany?: BookingCreateManyPropertyAddressInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutPropertyAddressInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPropertyAddressInput>, Enumerable<BookingUncheckedCreateWithoutPropertyAddressInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPropertyAddressInput>
    createMany?: BookingCreateManyPropertyAddressInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUpdateManyWithoutPropertyAddressNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPropertyAddressInput>, Enumerable<BookingUncheckedCreateWithoutPropertyAddressInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPropertyAddressInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutPropertyAddressInput>
    createMany?: BookingCreateManyPropertyAddressInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutPropertyAddressInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutPropertyAddressInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutPropertyAddressNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutPropertyAddressInput>, Enumerable<BookingUncheckedCreateWithoutPropertyAddressInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutPropertyAddressInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutPropertyAddressInput>
    createMany?: BookingCreateManyPropertyAddressInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutPropertyAddressInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutPropertyAddressInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingCreateNestedManyWithoutAddOnsInput = {
    create?: XOR<Enumerable<BookingCreateWithoutAddOnsInput>, Enumerable<BookingUncheckedCreateWithoutAddOnsInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutAddOnsInput>
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutAddOnsInput = {
    create?: XOR<Enumerable<BookingCreateWithoutAddOnsInput>, Enumerable<BookingUncheckedCreateWithoutAddOnsInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutAddOnsInput>
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUpdateManyWithoutAddOnsNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutAddOnsInput>, Enumerable<BookingUncheckedCreateWithoutAddOnsInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutAddOnsInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutAddOnsInput>
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutAddOnsInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutAddOnsInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutAddOnsNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutAddOnsInput>, Enumerable<BookingUncheckedCreateWithoutAddOnsInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutAddOnsInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutAddOnsInput>
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutAddOnsInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutAddOnsInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
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

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumBookingStatusFilter = {
    equals?: BookingStatus
    in?: Enumerable<BookingStatus>
    notIn?: Enumerable<BookingStatus>
    not?: NestedEnumBookingStatusFilter | BookingStatus
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

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
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

  export type BookingCreateWithoutUserInput = {
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    selectedPackage?: SelectedPackageCreateNestedOneWithoutBookingsInput
    propertyAddress?: PropertyAddressCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutUserInput = {
    id?: number
    selectedPackageId?: number | null
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingsInput
  }

  export type BookingCreateOrConnectWithoutUserInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateManyUserInputEnvelope = {
    data: Enumerable<BookingCreateManyUserInput>
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

  export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type BookingScalarWhereInput = {
    AND?: Enumerable<BookingScalarWhereInput>
    OR?: Enumerable<BookingScalarWhereInput>
    NOT?: Enumerable<BookingScalarWhereInput>
    id?: IntFilter | number
    selectedPackageId?: IntNullableFilter | number | null
    propertyAddressId?: IntNullableFilter | number | null
    isLoading?: BoolFilter | boolean
    propertyType?: StringFilter | string
    propertySize?: StringFilter | string
    date?: DateTimeFilter | Date | string
    timeSlot?: StringFilter | string
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    phoneNumber?: StringFilter | string
    email?: StringFilter | string
    additionalInfo?: StringNullableFilter | string | null
    additionalRequests?: StringNullableFilter | string | null
    status?: EnumBookingStatusFilter | BookingStatus
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
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
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SelectedPackageCreateWithoutBookingsInput = {
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
  }

  export type SelectedPackageUncheckedCreateWithoutBookingsInput = {
    id?: number
    name: string
    price: number
    description: string
    features: string
    pricePerExtra: number
  }

  export type SelectedPackageCreateOrConnectWithoutBookingsInput = {
    where: SelectedPackageWhereUniqueInput
    create: XOR<SelectedPackageCreateWithoutBookingsInput, SelectedPackageUncheckedCreateWithoutBookingsInput>
  }

  export type PropertyAddressCreateWithoutBookingsInput = {
    buildingName: string
    unitNumber: string
    floor: string
    street: string
  }

  export type PropertyAddressUncheckedCreateWithoutBookingsInput = {
    id?: number
    buildingName: string
    unitNumber: string
    floor: string
    street: string
  }

  export type PropertyAddressCreateOrConnectWithoutBookingsInput = {
    where: PropertyAddressWhereUniqueInput
    create: XOR<PropertyAddressCreateWithoutBookingsInput, PropertyAddressUncheckedCreateWithoutBookingsInput>
  }

  export type AddOnCreateWithoutBookingsInput = {
    name: string
    price: number
  }

  export type AddOnUncheckedCreateWithoutBookingsInput = {
    id?: number
    name: string
    price: number
  }

  export type AddOnCreateOrConnectWithoutBookingsInput = {
    where: AddOnWhereUniqueInput
    create: XOR<AddOnCreateWithoutBookingsInput, AddOnUncheckedCreateWithoutBookingsInput>
  }

  export type UserCreateWithoutBookingsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string
    email: string
    password: string
    firstname: string
    lastname: string
    phoneNumber?: string | null
    role: Role
    emailVerified?: Date | string | null
    image?: string | null
    verificationToken?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type SelectedPackageUpsertWithoutBookingsInput = {
    update: XOR<SelectedPackageUpdateWithoutBookingsInput, SelectedPackageUncheckedUpdateWithoutBookingsInput>
    create: XOR<SelectedPackageCreateWithoutBookingsInput, SelectedPackageUncheckedCreateWithoutBookingsInput>
  }

  export type SelectedPackageUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    pricePerExtra?: FloatFieldUpdateOperationsInput | number
  }

  export type SelectedPackageUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    pricePerExtra?: FloatFieldUpdateOperationsInput | number
  }

  export type PropertyAddressUpsertWithoutBookingsInput = {
    update: XOR<PropertyAddressUpdateWithoutBookingsInput, PropertyAddressUncheckedUpdateWithoutBookingsInput>
    create: XOR<PropertyAddressCreateWithoutBookingsInput, PropertyAddressUncheckedCreateWithoutBookingsInput>
  }

  export type PropertyAddressUpdateWithoutBookingsInput = {
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyAddressUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    buildingName?: StringFieldUpdateOperationsInput | string
    unitNumber?: StringFieldUpdateOperationsInput | string
    floor?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
  }

  export type AddOnUpsertWithWhereUniqueWithoutBookingsInput = {
    where: AddOnWhereUniqueInput
    update: XOR<AddOnUpdateWithoutBookingsInput, AddOnUncheckedUpdateWithoutBookingsInput>
    create: XOR<AddOnCreateWithoutBookingsInput, AddOnUncheckedCreateWithoutBookingsInput>
  }

  export type AddOnUpdateWithWhereUniqueWithoutBookingsInput = {
    where: AddOnWhereUniqueInput
    data: XOR<AddOnUpdateWithoutBookingsInput, AddOnUncheckedUpdateWithoutBookingsInput>
  }

  export type AddOnUpdateManyWithWhereWithoutBookingsInput = {
    where: AddOnScalarWhereInput
    data: XOR<AddOnUpdateManyMutationInput, AddOnUncheckedUpdateManyWithoutAddOnsInput>
  }

  export type AddOnScalarWhereInput = {
    AND?: Enumerable<AddOnScalarWhereInput>
    OR?: Enumerable<AddOnScalarWhereInput>
    NOT?: Enumerable<AddOnScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    price?: FloatFilter | number
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
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookingCreateWithoutSelectedPackageInput = {
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyAddress?: PropertyAddressCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingsInput
    user: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutSelectedPackageInput = {
    id?: number
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingsInput
  }

  export type BookingCreateOrConnectWithoutSelectedPackageInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutSelectedPackageInput, BookingUncheckedCreateWithoutSelectedPackageInput>
  }

  export type BookingCreateManySelectedPackageInputEnvelope = {
    data: Enumerable<BookingCreateManySelectedPackageInput>
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutSelectedPackageInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutSelectedPackageInput, BookingUncheckedUpdateWithoutSelectedPackageInput>
    create: XOR<BookingCreateWithoutSelectedPackageInput, BookingUncheckedCreateWithoutSelectedPackageInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutSelectedPackageInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutSelectedPackageInput, BookingUncheckedUpdateWithoutSelectedPackageInput>
  }

  export type BookingUpdateManyWithWhereWithoutSelectedPackageInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type BookingCreateWithoutPropertyAddressInput = {
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    selectedPackage?: SelectedPackageCreateNestedOneWithoutBookingsInput
    addOns?: AddOnCreateNestedManyWithoutBookingsInput
    user: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutPropertyAddressInput = {
    id?: number
    selectedPackageId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    addOns?: AddOnUncheckedCreateNestedManyWithoutBookingsInput
  }

  export type BookingCreateOrConnectWithoutPropertyAddressInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPropertyAddressInput, BookingUncheckedCreateWithoutPropertyAddressInput>
  }

  export type BookingCreateManyPropertyAddressInputEnvelope = {
    data: Enumerable<BookingCreateManyPropertyAddressInput>
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutPropertyAddressInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPropertyAddressInput, BookingUncheckedUpdateWithoutPropertyAddressInput>
    create: XOR<BookingCreateWithoutPropertyAddressInput, BookingUncheckedCreateWithoutPropertyAddressInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPropertyAddressInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPropertyAddressInput, BookingUncheckedUpdateWithoutPropertyAddressInput>
  }

  export type BookingUpdateManyWithWhereWithoutPropertyAddressInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type BookingCreateWithoutAddOnsInput = {
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    selectedPackage?: SelectedPackageCreateNestedOneWithoutBookingsInput
    propertyAddress?: PropertyAddressCreateNestedOneWithoutBookingsInput
    user: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutAddOnsInput = {
    id?: number
    selectedPackageId?: number | null
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type BookingCreateOrConnectWithoutAddOnsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutAddOnsInput, BookingUncheckedCreateWithoutAddOnsInput>
  }

  export type BookingUpsertWithWhereUniqueWithoutAddOnsInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutAddOnsInput, BookingUncheckedUpdateWithoutAddOnsInput>
    create: XOR<BookingCreateWithoutAddOnsInput, BookingUncheckedCreateWithoutAddOnsInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutAddOnsInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutAddOnsInput, BookingUncheckedUpdateWithoutAddOnsInput>
  }

  export type BookingUpdateManyWithWhereWithoutAddOnsInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
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

  export type BookingCreateManyUserInput = {
    id?: number
    selectedPackageId?: number | null
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
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

  export type BookingUpdateWithoutUserInput = {
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectedPackage?: SelectedPackageUpdateOneWithoutBookingsNestedInput
    propertyAddress?: PropertyAddressUpdateOneWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    selectedPackageId?: NullableIntFieldUpdateOperationsInput | number | null
    propertyAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addOns?: AddOnUncheckedUpdateManyWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    selectedPackageId?: NullableIntFieldUpdateOperationsInput | number | null
    propertyAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddOnUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type AddOnUncheckedUpdateManyWithoutAddOnsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
  }

  export type BookingCreateManySelectedPackageInput = {
    id?: number
    propertyAddressId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type BookingUpdateWithoutSelectedPackageInput = {
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyAddress?: PropertyAddressUpdateOneWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingsNestedInput
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutSelectedPackageInput = {
    id?: IntFieldUpdateOperationsInput | number
    propertyAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    addOns?: AddOnUncheckedUpdateManyWithoutBookingsNestedInput
  }

  export type BookingCreateManyPropertyAddressInput = {
    id?: number
    selectedPackageId?: number | null
    isLoading: boolean
    propertyType: string
    propertySize: string
    date: Date | string
    timeSlot: string
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    additionalInfo?: string | null
    additionalRequests?: string | null
    status?: BookingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type BookingUpdateWithoutPropertyAddressInput = {
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectedPackage?: SelectedPackageUpdateOneWithoutBookingsNestedInput
    addOns?: AddOnUpdateManyWithoutBookingsNestedInput
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutPropertyAddressInput = {
    id?: IntFieldUpdateOperationsInput | number
    selectedPackageId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    addOns?: AddOnUncheckedUpdateManyWithoutBookingsNestedInput
  }

  export type BookingUpdateWithoutAddOnsInput = {
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    selectedPackage?: SelectedPackageUpdateOneWithoutBookingsNestedInput
    propertyAddress?: PropertyAddressUpdateOneWithoutBookingsNestedInput
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutAddOnsInput = {
    id?: IntFieldUpdateOperationsInput | number
    selectedPackageId?: NullableIntFieldUpdateOperationsInput | number | null
    propertyAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    isLoading?: BoolFieldUpdateOperationsInput | boolean
    propertyType?: StringFieldUpdateOperationsInput | string
    propertySize?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    additionalRequests?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | BookingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
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