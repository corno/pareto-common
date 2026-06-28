
import * as d_fp from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', d_fp.Phrase]
    | ['could not write to stdout', null]