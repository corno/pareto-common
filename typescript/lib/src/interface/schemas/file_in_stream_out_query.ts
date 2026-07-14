import * as p_prose from 'pareto-core/temp/fountain_pen/prose'


import type * as s_list_of_characters from "./list_of_characters.js"
import type * as s_path from "./fs_unrestricted_path.js"


export type Result = {
    'data': p_prose.Paragraph
}

export type Error = p_prose.Phrase

export type Parameters = {
    'path': s_path.Node_Path
    'data': s_list_of_characters.List_Of_Characters
}