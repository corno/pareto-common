import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/file_in_file_out_command.js"

//dependencies
import * as t_read_file from "pareto-filesystem-unrestricted-api/implementation/serializers/read_file"
import * as t_cli from "./file_in_file_out_refiner.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_simple/deprecated"

export const Error: p_.Phrase_Serializer<s_in.Error> = ($) => {
    return p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'processing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("processing error: "),
                    $
                ]))
                case 'command line arguments': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("error in command line arguments: "),
                    t_cli.Error($)
                ]))
                case 'reading file': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("error reading: "),
                    t_read_file.Error($)
                ]))
                case 'deserializing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("error deserializing: "),
                    sh.ph.literal($)
                ]))
                case 'writing file': return p_.option($, ($) => sh.ph.literal("error writing file"))
                default: return p_.exhaustive($[0])
            }
        })
}