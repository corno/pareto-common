import * as p_prose from 'pareto-core/temp/fountain_pen/prose'

//dependencies
import type * as s_read_file from "./fs_unrestricted_read_file.js"
import type * as s_write_file from "./fs_unrestricted_write_file.js"

import type * as s_file_to_file_cla from "./file_in_file_out_refiner.js"

export type Error =
    | ['processing', p_prose.Phrase]
    | ['command line arguments', s_file_to_file_cla.Error]
    | ['reading file', s_read_file.Error]
    | ['deserializing', string]
    | ['writing file', s_write_file.Error]
