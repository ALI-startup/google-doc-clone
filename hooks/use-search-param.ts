import { parseAsString, useQueryState } from "nuqs";

export function useSearchParam() {
    // similar to useState but it automatically synchronizes with the url search params, like ?url=123..
    return useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({ clearOnDefault: true }) // clearondefault makes sure that we don't pass anything to the query params
    );
}