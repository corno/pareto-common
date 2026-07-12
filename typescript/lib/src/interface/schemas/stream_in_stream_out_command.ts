
import type * as s_prose from "./prose.js"

export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', s_prose.Phrase]
    | ['could not write to stdout', null]