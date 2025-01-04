'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';;
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Service } from '@/types';
import { getColumns } from './columns';
import { formatData } from './formatData';
import { ColumnDef } from '@tanstack/react-table';


interface ResourceClientProps {
  resource: string
  data: any[] | undefined
}

export const ResourcesClient: React.FC<ResourceClientProps> = ({resource,  data }) => {
  const router = useRouter();



  let cleanedData = formatData(resource, data)

  console.log("columns: ", getColumns(resource) as ColumnDef<any, unknown>[])

  let resourceName = resource[0].toUpperCase() + resource.substring(1)

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`${resourceName} (${data?.length})`}
          description={`Manage ${resource} (Client side table functionalities.)`}
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/resources/${resource}/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New {resourceName} </Button>
      </div>
      <Separator />
      <DataTable 
              searchKey="name" 
              columns={getColumns(resource) as ColumnDef<any, unknown>[]} 
              data={cleanedData as any[]} />
    </>
  );
};
