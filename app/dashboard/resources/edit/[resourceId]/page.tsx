import { Breadcrumbs } from '@/components/breadcrumbs';
import { ResourceForm } from '@/components/forms/resource-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getResourceDetails } from '@/repositories/k8Repository';
import { ResourceDetails } from '@/types';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Resource', link: '/dashboard/resources' },
  { title: 'Edit', link: '/dashboard/resources/edit' }
];

export default async function Page({
    params,
    searchParams
}: {
    params: { resourceId: string }
    searchParams: { type: string, namespace: string }
}): Promise<React.JSX.Element> {

    console.log("params: ", params)
    

    let details: ResourceDetails = {
      resource_type: searchParams.type,
      namespace: searchParams.namespace, 
      resource_name: params.resourceId
    }

    let response = await getResourceDetails(details)

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ResourceForm
          initialData={{
            name: params.resourceId, 
            manifest: JSON.stringify(response, null, 4)
          }}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
