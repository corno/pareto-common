import type * as d_prose from "pareto-fountain-pen/interface/data/prose"
import type * as d_text from "pareto-fountain-pen/interface/data/text"
import type * as d_list_of_characters from "pareto-fountain-pen/interface/data/list_of_characters"


export type Result = {
    'data': d_list_of_characters.List_of_Characters
}

export type Error = d_prose.Phrase

export type Parameters = {
    'data': d_text.Text
}