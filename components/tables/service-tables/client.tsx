'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';;
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Service } from '@/types';
import { columns } from './columns';


interface ProductsClientProps {
  data: Service[] | undefined
}

export const ServicesClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Services (${data?.length})`}
          description="Manage services (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/resources/services/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Services
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data as Service[]} />
    </>
  );
};
