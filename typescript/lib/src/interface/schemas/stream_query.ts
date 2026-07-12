import type * as s_prose from "./prose.js"
import type * as s_text from "./text.js"
import type * as s_list_of_characters from "./list_of_characters.js"


export type Result = {
    'data': s_list_of_characters.List_of_Characters
}

export type Error = s_prose.Phrase

export type Parameters = {
    'data': s_text.Text
}