
import type * as s_list_of_characters from "pareto-stream-api/schemas/list_of_characters/schema"
import type * as p_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"


export type Result = {
    'paragraph': p_paragraph.Paragraph
}

export type Error = {
        'message': p_paragraph.Phrase
}

export type Parameters = {
    'data': s_list_of_characters.List_Of_Characters
}