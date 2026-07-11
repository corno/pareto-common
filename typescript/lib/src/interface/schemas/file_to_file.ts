
import type * as d_path from "pareto-resources/interface/data/fs_unrestricted_path"

import type * as d_read_file from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_read_file"
import type * as d_write_file from "pareto-filesystem-unrestricted-api/interface/data/fs_unrestricted_write_file"

import type * as d_prose from "pareto-fountain-pen/interface/data/prose"

export type Error_yy =
    | ['processing', d_prose.Phrase]
    | ['file in file out', Command_Error]

export type Error =
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
    | ['command line arguments', Error]
    | ['reading file', d_read_file.Error]
    | ['deserializing', string]
    | ['writing file', d_write_file.Error]

export type Parameters = {
    'in': d_path.Node_Path,
    'out': d_path.Node_Path,
}

export type Path = d_path.Node_Path