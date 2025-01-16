import { Breadcrumbs } from '@/components/breadcrumbs';
import { ClusterForm } from '@/components/forms/cluster.form';
import { ProductForm } from '@/components/forms/product-form';
import { ResourceForm } from '@/components/forms/resource-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Resource', link: '/dashboard/resources' },
  { title: 'Edit', link: '/dashboard/resources/edit' }
];

export default function Page({
    params
}: {
    params: { resourceId: string }
}): React.JSX.Element {

    console.log("params: ", params)
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ResourceForm
          initialData={params}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
