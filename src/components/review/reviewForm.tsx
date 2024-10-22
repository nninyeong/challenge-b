'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/utils/supabase/client';
const reviewInputSchema = z.object({});
const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(reviewInputSchema),
  });

  const browserClient = createClient();

  const handleReviewFormSubmit = async () => {};
  return <form onSubmit={handleSubmit(handleReviewFormSubmit)}></form>;
};

export default ReviewForm;
