import * as d_prose from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_text from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"


export type Result = {
    'data': d_prose.Paragraph
}

export type Error = d_prose.Phrase

export type Parameters = {
    'data': d_text.Text
}