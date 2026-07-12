import type * as s_prose from "./prose.js"
import type * as s_list_of_characters from "./list_of_characters.js"
import type * as s_path from "./fs_unrestricted_path.js"
import type * as s_directory_content from "./directory_content.js"

export type Result = {
    'data': s_directory_content.Directory
}

export type Error = s_prose.Phrase

export type Parameters = {
    'path': s_path.Node_Path
    'data': s_list_of_characters.List_of_Characters
}