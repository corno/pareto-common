
//dependencies
import type * as s_read_file from "../../../interface/schemas/fs_unrestricted_read_file.js"
import type * as s_write_file from "../../../interface/schemas/fs_unrestricted_write_file.js"

import type * as s_file_to_file_cla from "./refiner.js"
import type * as p_paragraph from "../../../interface/schemas/paragraph.js"

export type Error =
    | ['processing', {
            'message': p_paragraph.Phrase
    }]
    | ['command line arguments', s_file_to_file_cla.Error]
    | ['reading file', s_read_file.Error]
    | ['deserializing', string]
    | ['writing file', s_write_file.Error]
