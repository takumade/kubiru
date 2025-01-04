import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ResourcesClient } from '@/components/tables/resource-tables/client';
import { getResource, getServices } from '@/repositories/k8Repository';
import { Service, ServiceRaw } from '@/types';


export default async function page({
  params
}: {
  params: { resource: string }
}) {


  let result = await getResource(params.resource)

  // let servicesResponse:ServiceRaw[] = await getServices()

  // let services: Service[] = servicesResponse.map((service: ServiceRaw) => ({
  //   name: service.metadata?.name,
  //   namespace: service.metadata?.namespace,
  //   type: service.spec?.type,
  //   clusterIP: service.spec?.clusterIP, 
  //   ports: service.spec?.ports.map((p:any) => p.port)
  // }))

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
