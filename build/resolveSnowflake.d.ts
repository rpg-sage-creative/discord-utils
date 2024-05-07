import { NIL_SNOWFLAKE, type Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/type-utils";
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
};
/** @deprecated */
type CanHaveSnowflakeDid = {
    did?: Snowflake;
};
type CanBeSnowflakeResolvable = CanHaveSnowflakeId | CanHaveSnowflakeDid;
export declare function resolveSnowflake(resolvable: SnowflakeResolvable): Snowflake;
export declare function resolveSnowflake(resolvable: Optional<CanBeSnowflakeResolvable>): Snowflake | undefined;
export declare function resolveSnowflake(resolvable: Optional<CanBeSnowflakeResolvable>, orNil: true): Snowflake | NIL_SNOWFLAKE;
export declare function resolveSnowflake(resolvable: Optional<SnowflakeResolvable>): Snowflake | undefined;
export declare function resolveSnowflake(resolvable: Optional<SnowflakeResolvable>, orNil: true): Snowflake | NIL_SNOWFLAKE;
export {};
