import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {Button} from '../Button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Input from '../input';
import React, { use, useState } from 'react';
import { Tables } from '@/types_db';

const certificateFormSchema = z.object({
    certificate_hash: z.string(),
    id: z.string(),
    issue_date: z.date(),
    metadata: z.object({}).nullable(),
    user_id: z.string(),
});

export default function AddCertificateForm({user}: {user: Tables<'users'>}) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof certificateFormSchema>>({
        resolver: zodResolver(certificateFormSchema),
        defaultValues: {
            certificate_hash: '',
            issue_date: new Date(),
            metadata: null,
            user_id: user.id,
        },
    });

    async function onSubmit(values: z.infer<typeof certificateFormSchema>) {
        try {
            setLoading(true);
            // Your logic to handle form submission for certificate
            console.log('Certificate Form Values:', values);
        } catch (error) {
            console.error('Error submitting certificate form:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lg:px-16 px-4 py-24 pb-48 flex justify-center items-center gap-16">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 rounded-2xl lg:p-12 p-6 shadow-2xl shadow-foreground/5"
                >
                    {/* Add your form fields based on the certificate schema */}
                    <FormField
                        control={form.control}
                        name="certificate_hash"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="lg:text-lg text-base">
                                    Certificate Hash
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Certificate Hash" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Repeat the above pattern for other fields in the certificate schema */}

                    <Button
                        variant={'secondary'}
                        className="lg:text-lg text-base py-6 w-full"
                        type="submit"
                        disabled={loading}
                    >
                        Create Certificate
                    </Button>
                </form>
            </Form>
        </div>
    );
}
