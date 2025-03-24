import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  message: string;
}

export default function Support() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Support - DrivEdify</title>
        <meta name="description" content="Contact DrivEdify Support" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-12 px-4"
      >
        <h1 className="text-4xl font-bold mb-8">Contact Support</h1>
        {/* Support form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register('email', { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <span className="text-red-400 text-sm">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              {...register('message', { required: true })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
            {errors.message && <span className="text-red-400 text-sm">Required</span>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </Layout>
  );
}
