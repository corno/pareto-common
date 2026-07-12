
import type * as s_path from "./fs_unrestricted_path.js"

import type * as s_read_file from "./fs_unrestricted_read_file.js"

import type * as s_prose from "./prose.js"

export type Error =
    | ['processing', s_prose.Phrase]
    | ['command line arguments', Error_x]
    | ['reading file', s_read_file.Error]
    | ['deserializing', string]
    | ['writing to stream', null]

export type Error_x =
    | ['unexpected', {
        'expected': Expected,
    }]
    | ['invalid source path', null]
    | ['too many arguments', null]


export type Expected =
    | ['source path', null]

export type Parameters = {
    'in': s_path.Node_Path,
}

export type Path = s_path.Node_Path