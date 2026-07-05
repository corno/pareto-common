
import * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"

import * as d_read_file from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_read_file/data"

import * as d_prose from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export type Error =
    | ['processing', d_prose.Phrase]
    | ['file in stream out', Command_Error]

export type Error_x =
    | ['unexpected', {
        'expected': Expected,
    }]
    | ['invalid source path', null]
    | ['too many arguments', null]


export type Expected =
    | ['source path', null]
    
export type Command_Error =
    | ['command line arguments', Error_x]
    | ['reading file', d_read_file.Error]
    | ['deserializing', string]
    | ['writing to stream', null]

export type Parameters = {
    'in': d_path.Node_Path,
}

export type Path = d_path.Node_Path