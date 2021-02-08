// Package XIR provides Go language bindings to the MergeTB eXperiment
// Intermediate Representation. XIR is a simple network represenatation where
//
// The primary components are:
//   - (sub)networks
//   - nodes
//   - links
//
// Everything is extensible through a property map member called Props.
//
// Interconnection model supports node-neighbor traversal as well as
// link-endpoint traversal.
//
// Endpoints are the glue that bind nodes to links. Everything is also
// upwards traversable. You can follow pointers from an endpoint to a
// parent node, and then to a parent network, and then to another parent
// network etc...
//
// Serialization to json is inherent. It does not include the traversal
// mechanisims as this would create recursively repeditive output.
//
// Properties are represented as map[string]interface{} objects and follow
// the general notion of being JSON blobs. For Example
//
//   {
//     "construction": {
//       "procs": [
//         {
//           "cores": {"constraint__": ">", "value__": 2}
//         }
//      ]
//    },
//    "configuration": {
//      "os": {"constraint": "=", "value__": "ubuntu-18.04"}
//    }
//  }
//
// Every XIR element has a construction and a configuration. Construction
// contains the fundamental properites of an element and configuration
// contains and elements soft configuration.
//
// XIR is used in two contexts:
//
//   1. Experiment specification
//   2. Resource specification
//
// For experiment sepcification, properties map to constraints that
// define what a valid resource is for the given element. For resource
// specification properties map to simple values over which constraints
// can be evaluated.
package xir
