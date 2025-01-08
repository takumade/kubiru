import { ResourceItems, Service, ServiceRaw } from "@/types"

function formatNodes(data: ResourceItems[] ){
    return data.map((node:ResourceItems) => ({
        name: node.metadata.name,
        status: node?.status?.conditions[node.status.conditions.length - 1].type,
        version: node?.status?.nodeInfo.kubeletVersion
      }))
}

function formatPods(data: ResourceItems[]) {
    return data.map((pod: ResourceItems) => ({
        name: pod.metadata?.generateName,
        namespace: pod.metadata?.namespace,
        labels: pod.metadata?.labels.app,
        kind: pod.metadata?.ownerReferences?.map((reference:any) => reference.kind),
        status: pod.status?.phase,
        hostIP: pod.status?.hostIP,
        podIP: pod.status?.podIP,   
        createdAt: pod.metadata?.creationTimestamp
    }))
}

function formatDeployments(data: ResourceItems[]) {
    return data.map((deployment: ResourceItems) => ({
        name: deployment.metadata?.name,
        namespace: deployment.metadata?.namespace,
        labels: deployment.metadata?.labels?.app,
        replicas: deployment.spec?.replicas,
        strategy: deployment.spec?.strategy.type,
        createdAt: deployment.metadata?.creationTimestamp
    }))
}

function formatVolumes(data: ResourceItems[]) {
    return data.map((volume: ResourceItems) => ({
        name: volume.metadata?.name,
        capacity: volume.spec?.capacity?.storage,
        type: volume.spec?.hostPath?.type,
        accessModes: volume.spec?.accessModes?.storage,
        volumeMode: volume.spec?.volumeMode,
        phase: volume.status.phase,
        createdAt: volume.metadata?.creationTimestamp
    }))
}

function formatNamespaces(data: ResourceItems[]) {
    return data.map((namespace: ResourceItems) => ({
        uid: namespace.metadata?.uid,
        name: namespace.metadata?.name,
        status: namespace.status?.phase,
        createdAt: namespace.metadata?.creationTimestamp
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
    if (resource == "pods") return formatPods(data as ResourceItems[])
    if (resource == "deployments") return formatDeployments(data as ResourceItems[])
    if (resource == "namespaces") return formatNamespaces(data as ResourceItems[])
    if (resource == "persistentvolumes") return formatVolumes(data as ResourceItems[])

    return data
}