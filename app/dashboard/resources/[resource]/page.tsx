import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ResourcesClient } from '@/components/tables/resource-tables/client';
import { getResource } from '@/repositories/k8Repository';


export default async function page({
  params
}: {
  params: { resource: string }
}) {


  let result = await getResource(params.resource)

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: params.resource[0].toUpperCase() + params.resource.substring(1), 
      link: `/dashboard/resources/${params.resource}` }
  ];


  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ResourcesClient resource={params.resource} data={result as any[] | undefined} />

      </div>
    </PageContainer>
  );
}
