

//dependencies
import type * as s_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/schema"
import type * as s_write_directory from "pareto-filesystem-unrestricted-api/modules/helpers/schemas/write_directory_content/schema"
import type * as p_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

import type * as s_file_to_file_cla from "../refining/schema.js"

export type Error =
    | ['processing', {
        'message': p_paragraph.Phrase
    }]
    | ['command line arguments', s_file_to_file_cla.Error]
    | ['reading file', s_read_file.Error]
    | ['deserializing', string]
    | ['writing directory', s_write_directory.Error]
