import * as p_prose from 'pareto-core/temp/fountain_pen/prose'

import type * as s_list_of_characters from "./list_of_characters.js"


export type Result = {
    'data': p_prose.Paragraph
}

export type Error = {
    'phrase': p_prose.Phrase
}

export type Parameters = {
    'data': s_list_of_characters.List_Of_Characters
}