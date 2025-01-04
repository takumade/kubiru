'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Cluster } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';


export const NodeColumns: ColumnDef<any>[] = [
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
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'version',
    header: 'VERSION'
  },
//   {
//     id: 'actions',
//     cell: ({ row }) => <CellAction data={row.original} />
//   }
];
