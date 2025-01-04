'use client';

import { NodeColumns } from "./columns/nodeColumns";
import { ServiceColumns } from "./columns/serviceColumns";


export function getColumns(resource:string){
  if (resource === "services") return ServiceColumns
  if (resource === "nodes") return NodeColumns
}