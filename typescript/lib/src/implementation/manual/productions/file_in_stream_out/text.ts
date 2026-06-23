import * as p_pi from 'pareto-core/dist/interface/production'

//data types
import * as d_file_in_stream_out from "../../../../interface/data/file_to_stream"

//dependencies
import * as r_node_path_to_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"

export const Path: p_pi.Production<
    d_file_in_stream_out.Path,
    d_file_in_stream_out.Path_Error,
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