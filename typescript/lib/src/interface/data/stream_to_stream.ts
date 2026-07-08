
import type * as d_prose from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', d_prose.Phrase]
    | ['could not write to stdout', null]