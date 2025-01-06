'use client';
import { ColumnDef } from '@tanstack/react-table';

import { Cluster } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
// import { CellAction } from './cell-action';

export const NamespaceColumns: ColumnDef<any>[] = [
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
    accessorKey: 'uid',
    header: 'UID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED AT'
  },
//   {
//     id: 'actions',
//     cell: ({ row }) => <CellAction data={row.original} />
//   }
];
