'use client';

import { ServiceColumns } from "./columns/serviceColumns";


export function getColumns(resource:string){
  if (resource === "services") return ServiceColumns
}