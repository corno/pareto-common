
//dependencies
import type * as s_read_file from "./fs_unrestricted_read_file.js"
import type * as s_write_directory from "./write_directory.js"

import type * as s_prose from "./prose.js"
import type * as s_file_to_file_cla from "./file_in_directory_out_refiner.js"

export type Error =
    | ['processing', s_prose.Phrase]
    | ['command line arguments', s_file_to_file_cla.Error]
    | ['reading file', s_read_file.Error]
    | ['deserializing', string]
    | ['writing directory', s_write_directory.Error]
