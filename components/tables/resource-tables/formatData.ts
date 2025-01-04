import { Service, ServiceRaw } from "@/types"



function formatServices(data: ServiceRaw[]) {
    return data.map((service: ServiceRaw) => ({
        name: service.metadata?.name,
        namespace: service.metadata?.namespace,
        type: service.spec?.type,
        clusterIP: service.spec?.clusterIP, 
        ports: service.spec?.ports.map((p:any) => p.port)
    }))
}


export function formatData(resource:string, data:any){

    if (resource == "services"){
        return formatServices(data as ServiceRaw[])
    }



    return data

}