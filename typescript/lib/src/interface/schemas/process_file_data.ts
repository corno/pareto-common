import type * as s_prose from "pareto-fountain-pen/interface/data/prose"
import type * as s_list_of_characters from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as s_path from "pareto-resources/interface/data/fs_unrestricted_path"


export type Result = {
    'data': s_list_of_characters.List_of_Characters
}

export type Error = s_prose.Phrase

export type Parameters = {
    'path': s_path.Node_Path
    'data': s_list_of_characters.List_of_Characters
}