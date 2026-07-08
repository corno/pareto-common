import type * as d_prose from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_text from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"
import type * as d_list_of_characters from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"


export type Result = {
    'data': d_list_of_characters.List_of_Characters
}

export type Error = d_prose.Phrase

export type Parameters = {
    'data': d_text.Text
}