import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/command.js"

namespace declarations {
    export type Error = p_.Serializer<s_in.Error_x>
}
export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'too many arguments': return p_.option($, ($) => p_.ph.literal("too many arguments"))
            case 'invalid source path': return p_.option($, ($) => p_.ph.composed([
                p_.ph.literal("invalid source path"),
            ]))
            case 'unexpected': return p_.option($, ($) => p_.ph.composed([
                p_.ph.literal("unexpected "),
                p_.ph.literal("expected:" + $['expected'][0]),
            ]))
            default: return p_.exhaustive($[0])
        }
    }
)
