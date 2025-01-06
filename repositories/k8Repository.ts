'use server'

import fetch from 'node-fetch'
import https from 'https'
import { cookies } from 'next/headers'
import { Cluster } from '@/database/entities'


function generateHeaders(k8s_token:string) {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${k8s_token}`
    }
}


async function getClusterFromCookies(){

    let selectedCluster = cookies().get('selectedCluster')

    if (selectedCluster) {
        return JSON.parse(selectedCluster.value)
    }else {
        return null
    }
}

async function getNamespacesFromCookies(){
    
        let selectedNamespace = cookies().get('selectedNamespace')
    
        if (selectedNamespace) {
            return selectedNamespace.value
        }else {
            return null
        }
    }





export async function getResource(resource:string, api_type: string="api_v1" ) {
    let cluster: Cluster = await getClusterFromCookies()
    let namespace = await getNamespacesFromCookies()

    let headers = generateHeaders(cluster.token)

    console.log("headers: ", headers)

    let apiVersion = api_type

    if (api_type === "apps_v1" || resource === "deployments") {
        apiVersion = "apis/apps/v1"
    } else if (api_type === "batch_v1") {
        apiVersion = "apis/batch/v1"
    } else if (api_type === "extensions_v1beta1") {
        apiVersion = "apis/extensions/v1beta1"
    } else if (api_type === "api_v1") {
        apiVersion = "api/v1"
    }




    let resourceUrl = `${cluster.api}/${apiVersion}/${resource}`

    if (namespace) {
        resourceUrl = `${cluster.api}/${apiVersion}/namespaces/${namespace}/${resource}`
    }

    console.log("Resource URLs: ", resourceUrl)

    let results = await fetch(resourceUrl, {
        method: 'GET',
        headers: headers,
        agent: new https.Agent({
            rejectUnauthorized: false,
          })
        
    })

    let data:any = await results.json()

    console.log("Data x: ", data)

    if (data.items) {
        return data.items
    }

    return []
}


export async function setCurrentCluster(cluster: Cluster) {
    const headers = generateHeaders(cluster.token);
    cookies().set('selectedCluster', JSON.stringify(cluster));
    return headers;
}

export async function setCurrentNamespace(namespace: string) {
    cookies().set('selectedNamespace', namespace);
    return namespace;
}


export async function getNodes() {
    return await getResource('nodes')
}

export async function getServices() {
    return await getResource('services')
}


export async function getPods() {
    return await getResource('pods')
}

export async function getDeployments() {
    return await getResource('deployments',  'apps_v1')
}

export async function getNamespaces() {
    return await getResource('namespaces')
}

export async function getVolumes() {
    return await getResource('persistentvolumes')
}


