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
import { useToast } from '../ui/use-toast';
import { createCluster, updateCluster } from '@/repositories/clusterRepository';

import { Textarea } from '../ui/textarea';


export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Resource must be at least 3 characters' }),
  manifest: z
    .string()
    .min(3, { message: 'Resource Manifest must be at least 3 characters' }),
});

type ResourceFormValues = z.infer<typeof formSchema>;

interface ResourceFormProps {
  initialData: {
    resourceId:  string
  } | null;
}

export const ResourceForm: React.FC<ResourceFormProps> = ({
  initialData
}: ResourceFormProps) => {



  console.log("Intial Data: ", initialData)
  const defaultValues = initialData
    ? initialData
    : {};

  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit resource' : 'Create resource';
  const description = initialData ? 'Edit a resource.' : 'Add a new resource';
  const toastMessage = initialData ? 'Resource updated.' : 'Resource created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ResourceFormValues) => {

    try {

    

      setLoading(true);
    //   if (initialData?.resourceId === "new") {
    //     let res = await createCluster(data)      
    //   } else {
    //     let res = await updateCluster(initialData?.resourceId as number, data)
    //   }


      router.refresh();
      router.push(`/dashboard/clusters`);
      toast({
        variant: 'success',
        title: 'Success',
        description: initialData?.resourceId == "new" ? 
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
              name="manifest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manifest</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Resource Manifest"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
};
