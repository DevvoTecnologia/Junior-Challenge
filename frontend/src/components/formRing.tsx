
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompleteRing } from '@/models/Ring';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './ui/form';


const FormSchema = z.object({
  ring_name: z.string({
    message: 'Ring name should be a string',
  }).min(2, { message: "Ring name must have 2 characters" }),
  ring_image: z.string({
    message: 'Ring image should be a url',
  }).url({message: "Ring image shoud be a valid url"}),
  ring_power: z.string({
    message: 'Ring power should be a string',
  }),
  forger_id: z.string({
    message: 'You should select a forger',
  }),
  carrier_id: z
    .string({ message: 'You can select a carrier' })
    .nullable()
});


const FormRing = ({ring}: {ring: CompleteRing}) => {
  console.log(ring)
  const {handleSubmit, register, formState: { errors, isSubmitting }, ...form} = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: ring ? {
      ring_name: ring.ring_name,
      ring_image: ring.ring_image,
      ring_power: ring.ring_power,
      forger_id: 1,
      carrier_id: "",
    } : undefined,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="flex-col flex gap-3">
          <FormItem>
            <Label htmlFor="ring_name">Ring Name</Label>
            <Input type="text" placeholder="Ring Name" id="ring_name" {...register("ring_name")} />
            <FormMessage className="text-gray-700">{errors.ring_name && errors.ring_name?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <Label htmlFor="ring_image">Ring Image</Label>
            <Input type="text" placeholder="https://some-image.url.com" id="ring_image" {...register("ring_image")} />
            <FormMessage className="text-gray-700">{errors.ring_image && errors.ring_image?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <Label htmlFor="ring_power">Ring Power</Label>
            <Input type="text" placeholder="This ring permit you teleport" id="ring_power" {...register("ring_power")} />
            <FormMessage className="text-gray-700">{errors.ring_power && errors.ring_power?.message}</FormMessage>
          </FormItem>
        </div>
        <div className="flex-col flex gap-3">
          <FormField
            control={form.control}
            name="forger_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ring Forger</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Forger" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">m@example.com</SelectItem>
                    <SelectItem value="2">m@google.com</SelectItem>
                    <SelectItem value="3">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="carrier_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ring Carrier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Carrier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300">CREATE</Button>
    </form>
  </Form>
  )
}

export default FormRing