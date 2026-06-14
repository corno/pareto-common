import * as p_pi from 'pareto-core/dist/production/interface'

//data types
import * as d_file_in_file_out from "../../../../interface/to_be_generated/file_to_file"

//dependencies
import * as r_node_path_to_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"

export const Path: p_pi.Production<
    d_file_in_file_out.Path,
    d_file_in_file_out.Path_Error,
    string,
    null
> = (iterator, abort) => r_node_path_to_text.Node_Path(
    iterator.consume(
        ($) => $,
        () => abort(['missing', null])
    ),
    ($) => abort(['not valid', null]),
    {
        'pedantic': true,
    },
)