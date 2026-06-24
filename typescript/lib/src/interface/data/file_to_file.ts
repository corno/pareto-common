
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_file/data"
import * as d_write_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_write_file/data"

import * as d_fp from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export type Error =
    | ['processing', d_fp.Phrase]
    | ['file in file out', Command_Error]

export type Error_x =
    | ['unexpected', {
        'expected': Expected,
    }]
    | ['invalid source path', null]
    | ['invalid target path', null]
    | ['too many arguments', null]

export type Expected =
    | ['source path', null]
    | ['target path', null]

export type Command_Error =
    | ['command line arguments', Error_x]
    | ['reading file', d_read_file.Error]
    | ['deserializing', string]
    | ['writing file', d_write_file.Error]

export type Parameters = {
    'in': d_path.Node_Path,
    'out': d_path.Node_Path,
}

export type Path = d_path.Node_Path