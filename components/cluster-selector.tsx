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
import { selectClusterAction } from "@/store/actions"



interface ClusterSelectorProps  {
  clusters: Cluster[]
}


export function ClusterSelector({clusters}: ClusterSelectorProps) {

  const dispatch = useDispatch()

  const handleChange = (value:string) => {
    console.log(value)

    let selectedCluster = clusters[parseInt(value)]

    console.log(selectedCluster)

    dispatch(selectClusterAction(selectedCluster))
  }





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
            clusters.map((cluster: Cluster, index) =>
                <SelectItem value={index.toString()}>{cluster.name}</SelectItem>
            )
          }

        </SelectGroup>
      </SelectContent>
    </Select>
    <hr className="mt-4"></hr>
    </div>
  )
}
