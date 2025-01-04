import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ServicesClient } from '@/components/tables/service-tables/client';
import { getServices } from '@/repositories/k8Repository';
import { Service, ServiceRaw } from '@/types';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Services', link: '/dashboard/resources/services' }
];
export default async function page() {

  let servicesResponse:ServiceRaw[] = await getServices()

  let services: Service[] = servicesResponse.map((service: ServiceRaw) => ({
    name: service.metadata?.name,
    namespace: service.metadata?.namespace,
    type: service.spec?.type,
    clusterIP: service.spec?.clusterIP, 
    ports: service.spec?.ports.map((p:any) => p.port)
  }))

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ServicesClient data={services as Service[] | undefined} />
      </div>
    </PageContainer>
  );
}
