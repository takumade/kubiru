'use client';
import { ColumnDef } from '@tanstack/react-table';

import { Cluster } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from '../cell-action';
// import { CellAction } from './cell-action';

export const DeploymentColumns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'namespace',
    header: 'NAMESPACE',
    // cell: (props) => (
    //   //@ts-ignore
    //   <span>{props.getValue().substr(0, 20)}...</span>
    // )

  },
  {
    accessorKey: 'labels',
    header: 'LABELS'
  },
  {
    accessorKey: 'replicas',
    header: 'REPLICAS'
  },
  {
    accessorKey: 'strategy',
    header: 'STRATEGY'
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED AT'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
