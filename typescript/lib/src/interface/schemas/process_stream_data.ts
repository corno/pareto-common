import type * as s_prose from "pareto-fountain-pen/interface/data/prose"
import type * as s_text from "pareto-fountain-pen/interface/data/text"
import type * as s_list_of_characters from "pareto-fountain-pen/interface/data/list_of_characters"


export type Result = {
    'data': s_list_of_characters.List_of_Characters
}

export type Error = s_prose.Phrase

export type Parameters = {
    'data': s_text.Text
}