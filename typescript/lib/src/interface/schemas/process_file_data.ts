import type * as d_prose from "pareto-fountain-pen/interface/data/prose"
import type * as d_list_of_characters from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as d_path from "pareto-resources/interface/data/fs_unrestricted_path"


export type Result = {
    'data': d_list_of_characters.List_of_Characters
}

export type Error = d_prose.Phrase

export type Parameters = {
    'path': d_path.Node_Path
    'data': d_list_of_characters.List_of_Characters
}