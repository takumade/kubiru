import { ResourceItems, Service, ServiceRaw } from "@/types"

function formatNodes(data: ResourceItems[] ){
    return data.map((node:ResourceItems) => ({
        name: node.metadata.name,
        status: node?.status?.conditions[node.status.conditions.length - 1].type,
        version: node?.status?.nodeInfo.kubeletVersion
      }))
}

function formatServices(data: ResourceItems[]) {
    return data.map((service: ResourceItems) => ({
        name: service.metadata?.name,
        namespace: service.metadata?.namespace,
        type: service.spec?.type,
        clusterIP: service.spec?.clusterIP, 
        ports: service.spec?.ports.map((p:any) => p.port)
    }))
}


export function formatData(resource:string, data:any){

    if (resource == "services") return formatServices(data as ResourceItems[])
    if (resource == "nodes") return formatNodes(data as ResourceItems[])
    



    return data

}