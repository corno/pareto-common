
//dependencies
import type * as i_path from "./fs_unrestricted_path.js"

export type Error =
    | ['unexpected', {
        'expected': Expected,
    }]
    | ['invalid source path', null]
    | ['too many arguments', null]

export type Expected =
    | ['source path', null]
    | ['target path', null]

export type Parameters = {
    'in': i_path.Node_Path,
    'out': i_path.Context_Path,
}

export type Path = i_path.Node_Path