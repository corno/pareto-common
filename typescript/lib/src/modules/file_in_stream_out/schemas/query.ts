

import type * as s_list_of_characters from "./list_of_characters.js"
import type * as s_path from "./fs_unrestricted_path.js"
import type * as p_paragraph from "./paragraph.js"


export type Result = {
    'data': p_paragraph.Paragraph
}

export type Error = {
        'message': p_paragraph.Phrase
}

export type Parameters = {
    'path': s_path.Node_Path
    'data': s_list_of_characters.List_Of_Characters
}