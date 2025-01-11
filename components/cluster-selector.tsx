"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Cluster } from "@/constants/data"
import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"
import { addClusters, selectCluster } from "@/store/slices/clusterSlice"
import { setCurrentCluster } from "@/repositories/k8Repository"
import { getClusters } from "@/repositories/clusterRepository"





export function ClusterSelector() {
 const clusters = useSelector((state: any) => state.cluster.clusters)
  const selectedCluster = useSelector((state: any) => state.cluster.selectedCluster)
  const dispatch = useDispatch()

  const loadClusters = async () => {
    let clusters = await getClusters()
    dispatch(addClusters(clusters))
  }




  const handleChange = (value:string) => {
    console.log(value)

    let currentCluster:Cluster = clusters.find((cluster: Cluster) => cluster.id.toString() == value) as Cluster

    dispatch(selectCluster(currentCluster))
    setCurrentCluster(currentCluster as any)

  }

  
  React.useEffect(()=> {
    if (clusters.length == 0){
      loadClusters()
     }
  }, [])



  return (
    <div className="pl-4">

        <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Cluster" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cluster</SelectLabel>

          {
            clusters.map((cluster: Cluster, index:number) =>
                <SelectItem key={index} value={cluster.id.toString()}>{cluster.name}</SelectItem>
            )
          }

        </SelectGroup>
      </SelectContent>
    </Select>
    <hr className="mt-4"></hr>
    </div>
  )
}
