'use client';
import * as z from 'zod';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
import { createCluster, updateCluster } from '@/repositories/clusterRepository';


import { useSelector } from 'react-redux';
import { Textarea } from '../ui/textarea';


export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Cluster Name must be at least 3 characters' }),
  api: z
    .string()
    .min(3, { message: 'API must be at least 3 characters' }),
  token: z
    .string()
    .min(3, { message: 'API Token must be at least 3 characters' }),    
  description: z
    .string()
    .min(3, { message: 'Cluster description must be at least 3 characters' }),
});

type ClusterFormValues = z.infer<typeof formSchema>;

interface ClusterFormProps {
  initialData: {
    clusterId: number | string
  } | null;
}

export const ClusterForm: React.FC<ClusterFormProps> = ({
  initialData
}: ClusterFormProps) => {




  const clusters = useSelector((state: any) => state.cluster.clusters);
  const currentCluster = clusters.find((cluster: any) => cluster.id == initialData?.clusterId)


  console.log("Current Cluster: ", currentCluster)
  console.log("Intial Data: ", initialData)
  const defaultValues = initialData
    ? {
        name: currentCluster?.name || '',
        api: currentCluster?.api || '',
        token: currentCluster?.token || '',
        description: currentCluster?.description || '',
      }
    : {
        name: 'mooo',
        api: '',
        token: '',
        description: '',
      };

  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit cluster' : 'Create cluster';
  const description = initialData ? 'Edit a cluster.' : 'Add a new cluster';
  const toastMessage = initialData ? 'Cluster updated.' : 'Cluster created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ClusterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ClusterFormValues) => {

    try {

    

      setLoading(true);
      if (initialData?.clusterId === "new") {
        let res = await createCluster(data)      
      } else {
        let res = await updateCluster(initialData?.clusterId as number, data)
      }


      router.refresh();
      router.push(`/dashboard/clusters`);
      toast({
        variant: 'success',
        title: 'Success',
        description: initialData?.clusterId == "new" ? 
                  'Item was created successfully':
                  'Item was updated successfully'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params}/clusters`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <React.Fragment>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                  console.log("Field: ", field)
                return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cluster name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}}
            />
            <FormField
              control={form.control}
              name="api"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cluster API"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cluster description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </div>

          <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Cluster token"
                      {...field}
                      rows={9}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
};
