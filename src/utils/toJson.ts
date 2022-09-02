// Does JSON.stringify, with support for BigInt:
export function toJson(data: any) {
    return JSON.parse(JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v));
}
