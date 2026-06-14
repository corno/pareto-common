import * as d_prose from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_list_of_characters from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"


export type Result = {
    'data': d_list_of_characters.List_of_Characters
}

export type Error = d_prose.Phrase

export type Parameters = {
    'path': d_path.Node_Path
    'data': d_list_of_characters.List_of_Characters
}