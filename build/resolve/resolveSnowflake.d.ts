import { NIL_SNOWFLAKE, type Optional, type Snowflake } from "@rsc-utils/core-utils";
type HasSnowflakeId = {
    id: Snowflake;
};
/** @deprecated */
type HasSnowflakeDid = {
    did: Snowflake;
};
export type SnowflakeResolvable = Snowflake | HasSnowflakeId | HasSnowflakeDid;
type CanHaveSnowflakeId = {
    id?: Snowflake;
} | {
    id?: string;
};
/** @deprecated */
type CanHaveSnowflakeDid = {
    did?: Snowflake;
} | {
    did?: string;
};
export type CanBeSnowflakeResolvable = string | CanHaveSnowflakeId | CanHaveSnowflakeDid;
/** Assumes a valid snowflake resolvable. */
export declare function resolveSnowflake(resolvable: SnowflakeResolvable): Snowflake;
/** Returns undefined if the value is not resolvable. */
export declare function resolveSnowflake(resolvable: Optional<CanBeSnowflakeResolvable>): Snowflake | undefined;
/** Returns NIL_SNOWFLAKE if the value is not resolvable. */
export declare function resolveSnowflake(resolvable: Optional<CanBeSnowflakeResolvable>, orNil: true): Snowflake | NIL_SNOWFLAKE;
/** Returns undefined if the value is not resolvable. */
export declare function resolveSnowflake(resolvable: Optional<SnowflakeResolvable>): Snowflake | undefined;
/** Returns NIL_SNOWFLAKE if the value is not resolvable. */
export declare function resolveSnowflake(resolvable: Optional<SnowflakeResolvable>, orNil: true): Snowflake | NIL_SNOWFLAKE;
export {};
