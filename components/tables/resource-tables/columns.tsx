'use client';

import { DeploymentColumns } from "./columns/deploymentColumns";
import { NamespaceColumns } from "./columns/namespacesColumns";
import { NodeColumns } from "./columns/nodeColumns";
import { PodColumns } from "./columns/podColumns";
import { ServiceColumns } from "./columns/serviceColumns";
import { VolumeColumns } from "./columns/volumeColumns";


export function getColumns(resource:string){
  if (resource === "services") return ServiceColumns
  if (resource === "nodes") return NodeColumns
  if (resource === "pods") return PodColumns
  if (resource === "deployments") return DeploymentColumns
  if (resource === "namespaces") return NamespaceColumns
  if (resource === "persistentvolumes") return VolumeColumns
}