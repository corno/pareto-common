import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

//dependencies
import * as ser from "../serializers.js"
import * as t_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/serializers"

//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

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
                    sh.ph.text(ser.Error($))
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