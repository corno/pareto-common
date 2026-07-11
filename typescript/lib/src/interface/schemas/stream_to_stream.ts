
import type * as s_prose from "pareto-fountain-pen/interface/data/prose"

export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', s_prose.Phrase]
    | ['could not write to stdout', null]