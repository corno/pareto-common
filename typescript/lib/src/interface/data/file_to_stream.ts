
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_file/data"

import * as d_fp from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export type Error =
    | ['processing', d_fp.Phrase]
    | ['file in stream out', Command_Error]

export type Path_Error =
    | ['missing', null]
    | ['not valid', null]

export type Error_x =
    | ['in path', Path_Error]
    | ['too many arguments', null]


export type Command_Error =
    | ['command line arguments', Error_x]
    | ['reading file', d_read_file.Error]
    | ['deserializing', string]
    | ['writing to stream', null]

export type Parameters = {
    'in': d_path.Node_Path,
}

export type Path = d_path.Node_Path