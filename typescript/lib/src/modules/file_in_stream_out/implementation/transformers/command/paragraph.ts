import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/command.js"
import type * as s_out from "../../../schemas/paragraph.js"

//dependencies
import * as t_file_in_stream_out_to_prose from "../../serializers/refiner.js"
import * as t_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/serializers/read_file"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/paragraph/deprecated"

export const Error: p_.Transformer<s_in.Error, s_out.Phrase> = ($) => {
    return p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'processing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("processing error: "),
                    $.message
                ]))
                case 'command line arguments': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("error in command line arguments: "),
                    sh.ph.text(t_file_in_stream_out_to_prose.Error($))
                ]))
                case 'reading file': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("error reading: "),
                    sh.ph.text(t_read_file.Error($))
                ]))
                case 'deserializing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("error deserializing: "),
                    sh.ph.text($)
                ]))
                case 'writing to stream': return p_.option($, ($) => sh.ph.text("error writing to stream"))
                default: return p_.exhaustive($[0])
            }
        })
}