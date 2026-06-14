
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_file/data"
import * as d_write_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_write_file/data"

import * as d_fp from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', d_fp.Phrase]
    | ['could not write to stdout', null]