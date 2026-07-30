
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as p_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"
import type * as s_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/schema"

export type Error =
    | ['processing', {
            'message': p_paragraph.Phrase
    }]
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