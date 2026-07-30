
import type * as s_list_of_characters from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/list_of_characters/schema"
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_directory_content from "pareto-filesystem-unrestricted-api/modules/helpers/schemas/to_be_written_directory_content/schema"
import type * as p_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"


export type Result = {
    'data': s_directory_content.Directory
}

export type Error = {
        'message': p_paragraph.Phrase
}

export type Parameters = {
    'path': s_path.Node_Path
    'data': s_list_of_characters.List_Of_Characters
}